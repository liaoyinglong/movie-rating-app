import Header from '@/components/header';
import { UserInfo } from '@/components/header/header-user-info';
import EmotionSetup from '@/components/ui/emotion-setup';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import { I18nClientProvider } from '@/i18n/client-provider';
import type { Locale } from '@/i18n/config';
import { getUserInfo } from '@/server-actions/get-user-info';
import { Skeleton } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie Rating',
  description: 'Movie Rating App',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <EmotionSetup>
          <I18nClientProvider>
            <Provider>
              <Header
                userInfo={
                  <Suspense fallback={<Skeleton className={'h-8 w-15'} />}>
                    <UserInfo userInfoPromise={getUserInfo()} />
                  </Suspense>
                }
              />
              {children}
              <Toaster />
            </Provider>
          </I18nClientProvider>
        </EmotionSetup>
      </body>
    </html>
  );
}
