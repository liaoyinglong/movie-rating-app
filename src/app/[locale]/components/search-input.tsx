'use client';
import { Button, Input } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation('home');
  const handleSubmit = (formData: FormData) => {
    const q = formData.get('q');
    const href = q ? `${pathname}?q=${q}` : pathname;
    router.push(href);
  };

  return (
    <form className="mb-8 flex justify-center gap-2" action={handleSubmit}>
      <Input
        placeholder={t('search')}
        className="max-w-md"
        name="q"
        defaultValue={searchParams.get('q') ?? void 0}
        data-testid="search-input"
      />
      <Button type="submit" data-testid="search-input-submit">
        {t('home:submit')}
      </Button>
    </form>
  );
}
