import Header from '@/components/header';
import { UserInfo } from '@/components/header/header-user-info';
import EmotionSetup from '@/components/ui/emotion-setup';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <EmotionSetup>
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
        </EmotionSetup>
      </body>
    </html>
  );
}
