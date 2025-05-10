import { database } from '@/database/data';
import { successResponse } from '@/utils/response';
import { describe, expect, it, vi } from 'vitest';
import { pageSearchMovieComments } from './page-search-movie-comments';

vi.mock('@/database/data');

const emptyResponse = successResponse({
  ratings: [],
  total: 0,
  pageSize: 10,
  pageIndex: 1,
});

describe('pageSearchMovieComments', () => {
  it('参数错误', async () => {
    const result = await pageSearchMovieComments({
      id: null as never,
      pageSize: 10,
      pageIndex: 1,
    });
    expect(result).toEqual(emptyResponse);
  });

  it('没有对应电影', async () => {
    vi.mocked(database.movies.get).mockResolvedValueOnce(null);
    const result = await pageSearchMovieComments({
      id: '1',
      pageSize: 10,
      pageIndex: 1,
    });
    expect(result).toEqual(emptyResponse);
  });

  it('没有评分', async () => {
    vi.mocked(database.movies.get).mockResolvedValueOnce({
      id: '1',
      title: 'test',
      ratings: [],
      description: 'test',
      genre: [],
      releaseDate: 1715222400,
    });
    const result = await pageSearchMovieComments({
      id: '1',
      pageSize: 10,
      pageIndex: 1,
    });
    expect(result).toEqual(emptyResponse);
  });

  it('有评分', async () => {
    vi.mocked(database.movies.get).mockResolvedValue({
      id: '1',
      title: 'test',
      ratings: ['1', '2', '3'],
      description: 'test',
      genre: [],
      releaseDate: 1715222400,
    });
    vi.mocked(database.ratings.get).mockImplementation(async (id: string) => {
      return {
        id,
        userId: '1',
        movieId: '1',
        score: 5,
        comment: `test ${id}`,
        timestamp: 1715222400,
      };
    });

    vi.mocked(database.users.get).mockResolvedValue({
      id: '1',
      username: 'test',
      password: 'test',
    });
    const result = await pageSearchMovieComments({
      id: '1',
      pageSize: 10,
      pageIndex: 1,
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "code": 200,
        "data": {
          "pageIndex": 1,
          "pageSize": 10,
          "ratings": [
            {
              "comment": "test 1",
              "id": "1",
              "movieId": "1",
              "score": 5,
              "timestamp": 1715222400,
              "userId": "1",
              "username": "test",
            },
            {
              "comment": "test 2",
              "id": "2",
              "movieId": "1",
              "score": 5,
              "timestamp": 1715222400,
              "userId": "1",
              "username": "test",
            },
            {
              "comment": "test 3",
              "id": "3",
              "movieId": "1",
              "score": 5,
              "timestamp": 1715222400,
              "userId": "1",
              "username": "test",
            },
          ],
          "total": 3,
        },
        "success": true,
      }
    `);
  });
});
