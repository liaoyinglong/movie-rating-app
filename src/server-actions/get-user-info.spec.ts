import { database } from '@/database/data';
import { cookies } from 'next/headers';
import { describe, expect, it, vi } from 'vitest';
import { getUserInfo } from './get-user-info';

vi.mock('@/database/data');
vi.mock('next/headers');

const cookieGetMock = vi.fn();

vi.mocked(cookies).mockResolvedValue({
  get: cookieGetMock,
} as never);

describe('getUserInfo', () => {
  it('token 不存在', async () => {
    cookieGetMock.mockReturnValueOnce(void 0);
    const result = await getUserInfo();
    expect(result).toBeUndefined();
  });
  it('token 存在，但是没有对应用户', async () => {
    cookieGetMock.mockReturnValueOnce('1');
    vi.mocked(database.users.get).mockResolvedValue(null);
    const result = await getUserInfo();
    expect(result).toBeFalsy();
  });

  it('token 存在，有对应用户', async () => {
    cookieGetMock.mockReturnValueOnce('1');

    vi.mocked(database.users.get).mockResolvedValue({
      id: '1',
      username: 'test',
      password: 'test',
    });
    const result = await getUserInfo();
    expect(result).toEqual({
      id: '1',
      username: 'test',
      password: 'test',
    });
  });
});
