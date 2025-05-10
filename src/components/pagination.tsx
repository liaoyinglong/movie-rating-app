'use client';
import {
  ButtonGroup,
  Pagination as ChakraPagination,
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export function Pagination(props: {
  total: number;
  pageSize: number;
  page: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ChakraPagination.Root
      count={props.total}
      pageSize={props.pageSize}
      page={props.page}
      className={'flex justify-center pt-4'}
      data-testid="pagination"
    >
      <ButtonGroup variant="ghost" size="sm">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('pageIndex', page.value.toString());
            const search = newSearchParams.toString();
            return (
              <IconButton
                variant={{ base: 'ghost', _selected: 'outline' }}
                asChild
              >
                <Link
                  href={{
                    pathname,
                    search,
                  }}
                >
                  {page.value}
                </Link>
              </IconButton>
            );
          }}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
