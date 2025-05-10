import { database } from '@/database/data';
import type { Movie, Rating } from '@/database/types';
import { errorResponse, ResponseCode, successResponse } from '@/utils/response';
import { describe, expect, it, vi } from 'vitest';
import { getUserInfo } from './get-user-info';
import { rateMovie } from './rate-movie';

vi.mock('@/database/data');
vi.mock('next/cache');
vi.mock('./get-user-info');
vi.mocked(getUserInfo).mockResolvedValue({
  id: '1',
  username: 'test',
  password: 'test',
});

const movieMockData: Movie = {
  id: '1',
  title: 'test',
  ratings: ['1'],
  description: 'test',
  genre: [],
  releaseDate: 1715222400,
};

const ratingMockData: Rating = {
  id: '1',
  userId: '1',
  movieId: '1',
  score: 5,
  comment: 'test',
  timestamp: 1715222400,
};

describe('rateMovie', () => {
  it('用户未登录', async () => {
    vi.mocked(getUserInfo).mockResolvedValueOnce(void 0);
    const result = await rateMovie({
      movieId: '1',
      score: 5,
      comment: 'test',
    });
    expect(result).toEqual(
      errorResponse('请登录后再试', ResponseCode.Unauthorized),
    );
  });

  it('参数错误', async () => {
    {
      const result = await rateMovie({
        movieId: null as never,
        score: 5,
        comment: 'test',
      });
      expect(result).toEqual(errorResponse('电影ID不能为空'));
    }

    {
      const result1 = await rateMovie({
        movieId: '1',
        score: null as never,
        comment: 'test',
      });
      expect(result1).toEqual(errorResponse('评分不能为空'));
      const result2 = await rateMovie({
        movieId: '1',
        score: 0,
        comment: 'test',
      });
      expect(result2).toEqual(errorResponse('评分不能小于1'));
      const result3 = await rateMovie({
        movieId: '1',
        score: 6,
        comment: 'test',
      });
      expect(result3).toEqual(errorResponse('评分不能大于5'));
    }

    {
      const result = await rateMovie({
        movieId: '1',
        score: 5,
        comment: null as never,
      });
      expect(result).toEqual(errorResponse('评论不能为空'));

      const result2 = await rateMovie({
        movieId: '1',
        score: 5,
        comment: '',
      });
      expect(result2).toEqual(errorResponse('评论不能少于1个字符'));

      const result3 = await rateMovie({
        movieId: '1',
        score: 5,
        comment: 'a'.repeat(101),
      });
      expect(result3).toEqual(errorResponse('评论不能超过100个字符'));
    }
  });

  it('电影不存在', async () => {
    vi.mocked(database.movies.get).mockResolvedValueOnce(null);
    const result = await rateMovie({
      movieId: '1',
      score: 5,
      comment: 'test',
    });
    expect(result).toEqual(errorResponse('电影不存在'));
  });

  it('已经评价过', async () => {
    vi.mocked(database.movies.get).mockResolvedValueOnce(movieMockData);
    vi.mocked(database.ratings.get).mockResolvedValueOnce(ratingMockData);
    const result = await rateMovie({
      movieId: '1',
      score: 5,
      comment: 'test',
    });
    expect(result).toEqual(errorResponse('您已经评价过这部电影'));
  });

  it('评价成功', async () => {
    vi.mocked(database.movies.get).mockResolvedValueOnce(movieMockData);
    vi.mocked(database.ratings.get).mockResolvedValueOnce(null);
    const result = await rateMovie({
      movieId: '1',
      score: 5,
      comment: 'test',
    });
    expect(result).toEqual(successResponse('评价成功'));
    expect(vi.mocked(database.ratings.set)).toHaveBeenCalledWith(
      '1-1',
      expect.objectContaining({
        score: 5,
        comment: 'test',
      }),
    );
  });
});
