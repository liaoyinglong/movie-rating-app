'use client';
import { Button, Input } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (formData: FormData) => {
    const q = formData.get('q');
    const href = q ? `${pathname}?q=${q}` : pathname;
    router.push(href);
  };

  return (
    <form className="mb-8 flex justify-center gap-2" action={handleSubmit}>
      <Input
        placeholder="搜索电影..."
        className="max-w-md"
        name="q"
        defaultValue={searchParams.get('q') ?? void 0}
      />
      <Button type="submit">确定</Button>
    </form>
  );
}
