import { checkUserIsRated } from '@/server-actions/check-user-is-rated';
import { getMovieDetail } from '@/server-actions/movie-detail';
import { render } from '@/utils/test-utils';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MoviePage from './page';

vi.mock('next/navigation');
vi.mock('@/server-actions/movie-detail');
vi.mock('@/server-actions/check-user-is-rated');
describe('MoviePage', () => {
  it('找不到电影', async () => {
    await MoviePage({
      params: Promise.resolve({ id: '1' }),
      searchParams: Promise.resolve({
        pageIndex: 1,
        pageSize: 10,
        id: '1',
      }),
    });

    expect(vi.mocked(redirect)).toHaveBeenCalledWith('/404');
  });

  describe('电影存在, ', async () => {
    beforeEach(() => {
      vi.mocked(getMovieDetail).mockResolvedValue({
        id: 'm2',
        title: '教父',
        description:
          '一个有组织犯罪家族的老大将他的帝国秘密交给他不情愿的儿子。',
        genre: ['剧情', '犯罪'],
        releaseDate: 73526400000,
        ratingCount: 3,
        totalRating: 10,
        averageRating: 3,
        ratings: ['64-m2', '92-m2', '10-m2'],
      });
    });

    it('用户未评价', async () => {
      vi.mocked(checkUserIsRated).mockResolvedValue(false);

      const el = await MoviePage({
        params: Promise.resolve({ id: 'm2' }),
        searchParams: Promise.resolve({
          pageIndex: 1,
          pageSize: 10,
          id: 'm2',
        }),
      });

      const { getByTestId, queryByTestId } = render(el);

      expect(getByTestId('movie-title').textContent?.length).toBeGreaterThan(1);
      expect(queryByTestId('user-rated-button')).toBeNull();
    });
  });

  it('用户已评价', async () => {
    vi.mocked(checkUserIsRated).mockResolvedValue(true);

    const el = await MoviePage({
      params: Promise.resolve({ id: 'm2' }),
      searchParams: Promise.resolve({
        pageIndex: 1,
        pageSize: 10,
        id: 'm2',
      }),
    });

    const { getByTestId } = render(el);

    expect(getByTestId('movie-title').textContent?.length).toBeGreaterThan(1);
    expect(getByTestId('user-rated-button')).toBeDefined();
  });
});
