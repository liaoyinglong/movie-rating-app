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

  const createHref = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pageIndex', page.toString());
    return {
      pathname,
      search: newSearchParams.toString(),
    };
  };

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
          <IconButton asChild>
            <Link
              href={createHref(props.page - 1)}
              data-testid="pagination-prev"
            >
              <LuChevronLeft />
            </Link>
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => {
            return (
              <IconButton
                variant={{ base: 'ghost', _selected: 'outline' }}
                asChild
              >
                <Link
                  href={createHref(page.value)}
                  data-testid={`pagination-item`}
                >
                  {page.value}
                </Link>
              </IconButton>
            );
          }}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton asChild>
            <Link
              href={createHref(props.page + 1)}
              data-testid="pagination-next"
            >
              <LuChevronRight />
            </Link>
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
