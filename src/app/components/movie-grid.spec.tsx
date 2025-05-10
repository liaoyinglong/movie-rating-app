import { pageSearchMovies } from '@/server-actions/page-search-movies';
import { render, screen } from '@/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { MovieGrid } from './movie-grid';

vi.mock('@/server-actions/page-search-movies');

describe('MovieGrid', () => {
  it('有数据时候正确渲染', async () => {
    vi.mocked(pageSearchMovies).mockResolvedValue({
      code: 200,
      data: {
        movies: [
          {
            description: 'test',
            genre: ['test'],
            id: '1',
            ratings: [],
            releaseDate: 1715222400,
            title: 'test',
          },
          {
            description: 'test2',
            genre: ['test2'],
            id: '2',
            ratings: [],
            releaseDate: 1715222400,
            title: 'test2',
            averageRating: 2,
            ratingCount: 2,
          },
        ],
        pageIndex: 1,
        pageSize: 10,
        total: 2,
      },
      success: true,
    });

    const el = await MovieGrid({
      pageIndex: 1,
      pageSize: 10,
      q: '',
    });

    render(el);

    expect(screen.getByTestId('movie-grid').childNodes.length).toBe(2);
    expect(screen.queryByTestId('empty-state')).toBeNull();
    expect(screen.getByTestId('pagination')).toBeDefined();
  });

  it('无数据时渲染空状态', async () => {
    vi.mocked(pageSearchMovies).mockResolvedValue({
      code: 200,
      data: {
        movies: [],
        total: 0,
        pageSize: 10,
        pageIndex: 1,
      },
      success: true,
    });

    const el = await MovieGrid({
      pageIndex: 1,
      pageSize: 10,
      q: '',
    });

    render(el);

    expect(screen.getByTestId('empty-state')).toBeDefined();
  });
});
