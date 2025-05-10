import { describe, expect, it, vi } from 'vitest';
import { checkUserIsRated } from './check-user-is-rated';

import { database } from '@/database/data';
import { getUserInfo } from './get-user-info';

vi.mock('./get-user-info');
vi.mock('@/database/data');

describe('checkUserIsRated', () => {
  it('用户未登录', async () => {
    vi.mocked(getUserInfo).mockResolvedValueOnce(void 0);
    const result = await checkUserIsRated('1');
    expect(result).toBe(false);
  });
  it('没有对应电影', async () => {
    vi.mocked(getUserInfo).mockResolvedValueOnce({
      id: '1',
      username: 'test',
      password: 'test',
    });
    const result = await checkUserIsRated('1');
    expect(result).toBe(false);
  });

  it('用户未评分', async () => {
    vi.mocked(getUserInfo).mockResolvedValueOnce({
      id: '1',
      username: 'test',
      password: 'test',
    });
    vi.mocked(database.movies.get).mockResolvedValue({
      id: '1',
      title: 'test',
      ratings: [],
      description: 'test',
      genre: [],
      releaseDate: 1715222400,
    });
    const result = await checkUserIsRated('1');
    expect(result).toBe(false);
  });

  it('用户已评分', async () => {
    vi.mocked(getUserInfo).mockResolvedValueOnce({
      id: 'user1',
      username: 'test',
      password: 'test',
    });
    vi.mocked(database.movies.get).mockResolvedValue({
      id: 'movie1',
      title: 'test',
      ratings: [`user1-movie1`],
      description: 'test',
      genre: [],
      releaseDate: 1715222400,
    });
    const result = await checkUserIsRated('movie1');
    expect(result).toBe(true);
  });
});
