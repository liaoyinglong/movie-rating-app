'use client';

import type { Locale } from '@/i18n/config';
import { useParams } from 'next/navigation';

export function useLocale() {
  const { locale } = useParams();
  return locale as Locale;
}
