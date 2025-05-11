'use server';

import { CookieIds } from '@/constants/cookie-ids';
import { database } from '@/database/data';
import { getServerI18n } from '@/i18n/server';
import { errorResponse, successResponse } from '@/utils/response';
import { cookies } from 'next/headers';
import 'server-only';
import { z } from 'zod';

const t = (v: string) => v;

const loginSchema = z.object({
  username: z.string().min(1, {
    message: t('actions:login.username-empty'),
  }),
  password: z
    .string()
    .min(1, {
      error: t('actions:login.password-empty'),
    })
    .max(10, {
      error: t('actions:login.password-too-long'),
    }),
});

export async function login(loginInfo: z.infer<typeof loginSchema>) {
  const { t } = await getServerI18n('actions');

  const result = loginSchema.safeParse(loginInfo);
  if (!result.success) {
    return errorResponse(t(result.error.issues[0].message));
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
    return errorResponse(t('actions:login.username-or-password-error'));
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
