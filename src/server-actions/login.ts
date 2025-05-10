'use server';

import { CookieIds } from '@/constants/cookie-ids';
import { database } from '@/database/data';
import { errorResponse, successResponse } from '@/utils/response';
import { cookies } from 'next/headers';
import 'server-only';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, {
    error: '用户名不能为空',
  }),
  password: z
    .string()
    .min(1, {
      error: '密码不能为空',
    })
    .max(10, {
      error: '密码不能超过10个字符',
    }),
});

export async function login(loginInfo: z.infer<typeof loginSchema>) {
  const result = loginSchema.safeParse(loginInfo);
  if (!result.success) {
    return errorResponse(result.error);
  }
  const { username, password } = result.data;
  let user = await database.users.get(username);
  if (!user) {
    user = {
      id: username,
      username,
      password,
    };
    await database.users.set(username, user);
  } else if (user.password !== password) {
    return errorResponse('用户名或密码错误');
  }

  const cookieStore = await cookies();

  // faker token generate
  cookieStore.set(CookieIds.Token, username, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 一周
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return successResponse(void 0);
}
