import { database } from '@/database/data';
import type { Movie } from '@/database/types';
import { describe, expect, it, vi } from 'vitest';
import { getMovieDetail } from './movie-detail';

vi.mock('@/database/data');

describe('getMovieDetail', () => {
  it('可以获取电影详情', async () => {
    const movieMockData: Movie = {
      id: '1',
      title: 'test',
      description: 'test',
      genre: ['test'],
      releaseDate: 1715222400,
      ratings: [],
    };
    vi.mocked(database.movies.get).mockResolvedValue(movieMockData);
    const movie = await getMovieDetail('1');
    expect(movie).toEqual(movieMockData);
  });
});
