import { database } from '@/database/data';
import { successResponse } from '@/utils/response';
import { describe, expect, it, vi } from 'vitest';
import { pageSearchMovies } from './page-search-movies';

vi.mock('@/database/data');
vi.mocked(database.movies.getAll).mockResolvedValue([
  {
    id: '1',
    title: 'test',
    description: 'test',
    genre: ['test'],
    releaseDate: 1715222400,
    ratings: [],
  },
  {
    id: '2',
    title: 'test2',
    description: 'test2',
    genre: ['test2'],
    releaseDate: 1715222400,
    ratings: [],
  },
]);

const emptyResponse = successResponse({
  movies: [],
  total: 0,
  pageSize: 10,
  pageIndex: 1,
});

describe('pageSearchMovies', () => {
  it('搜索全部', async () => {
    const result = await pageSearchMovies({
      pageIndex: 1,
      pageSize: 10,
      q: '',
    });
    expect(result).toMatchInlineSnapshot(`
      {
        "code": 200,
        "data": {
          "movies": [
            {
              "description": "test",
              "genre": [
                "test",
              ],
              "id": "1",
              "ratings": [],
              "releaseDate": 1715222400,
              "title": "test",
            },
            {
              "description": "test2",
              "genre": [
                "test2",
              ],
              "id": "2",
              "ratings": [],
              "releaseDate": 1715222400,
              "title": "test2",
            },
          ],
          "pageIndex": 1,
          "pageSize": 10,
          "total": 2,
        },
        "success": true,
      }
    `);
  });

  it('关键字搜索 有内容', async () => {
    const result = await pageSearchMovies({
      pageIndex: 1,
      pageSize: 10,
      q: 'test2',
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "code": 200,
        "data": {
          "movies": [
            {
              "description": "test2",
              "genre": [
                "test2",
              ],
              "id": "2",
              "ratings": [],
              "releaseDate": 1715222400,
              "title": "test2",
            },
          ],
          "pageIndex": 1,
          "pageSize": 10,
          "total": 1,
        },
        "success": true,
      }
    `);
  });

  it('关键字搜索 无内容', async () => {
    const result = await pageSearchMovies({
      pageIndex: 1,
      pageSize: 10,
      q: 'test3',
    });
    expect(result).toEqual(emptyResponse);
  });
});
