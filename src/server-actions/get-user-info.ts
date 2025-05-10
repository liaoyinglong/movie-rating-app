'use server';

import { CookieIds } from '@/constants/cookie-ids';
import { database } from '@/database/data';
import { cookies } from 'next/headers';
import 'server-only';

export async function getUserInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CookieIds.Token);
  if (!token) {
    return;
  }
  const user = await database.users.get(token.value);
  return user;
}
