'use client';
import { useParams } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { getI18n } from './client';

export function I18nClientProvider({ children }: PropsWithChildren) {
  const { locale } = useParams();
  return (
    <I18nextProvider i18n={getI18n(locale as string)}>
      {children}
    </I18nextProvider>
  );
}
