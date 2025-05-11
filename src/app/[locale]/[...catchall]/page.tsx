import { getServerI18n } from '@/i18n/server';
import { Button, EmptyState, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { LuSearch } from 'react-icons/lu';

export default async function NotFound() {
  const { t, locale } = await getServerI18n('404');
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <EmptyState.Root className="w-full max-w-md">
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuSearch className="text-5xl text-gray-400 dark:text-gray-500" />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('404:title')}
            </EmptyState.Title>
            <EmptyState.Description className="text-gray-600 dark:text-gray-400">
              {t('404:description')}
            </EmptyState.Description>
            <Button className="mt-4 w-full" asChild>
              <Link href={`/${locale}`}>{t('404:back-to-home')}</Link>
            </Button>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </div>
  );
}
