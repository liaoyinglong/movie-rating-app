import { render } from '@/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './pagination';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

describe('Pagination', () => {
  it('正确渲染', () => {
    const { getByTestId, getAllByTestId } = render(
      <Pagination total={100} pageSize={10} page={2} />,
    );

    expect((getByTestId('pagination-prev') as HTMLLinkElement).href).contains(
      '/?pageIndex=1',
    );

    expect((getByTestId('pagination-next') as HTMLLinkElement).href).contains(
      '/?pageIndex=3',
    );

    expect(getAllByTestId('pagination-item').length).toBeGreaterThan(0);
  });
});
