'use server';

import { CookieIds } from '@/constants/cookie-ids';
import { cookies } from 'next/headers';
import 'server-only';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(CookieIds.Token);
}
