import { CookieIds } from '@/constants/cookie-ids';
import { database } from '@/database/data';
import { errorResponse, successResponse } from '@/utils/response';
import { cookies } from 'next/headers';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { login } from './login';

vi.mock('@/database/data');
vi.mock('next/headers');

const cookiesMock = {
  get: vi.fn(),
  set: vi.fn(),
};
vi.mocked(cookies).mockResolvedValue(cookiesMock as never);

afterEach(() => {
  cookiesMock.set.mockReset();
  cookiesMock.get.mockReset();
});

describe('login', () => {
  it('参数不正确', async () => {
    {
      const result = await login({
        username: '',
        password: '',
      });
      expect(result).toEqual(errorResponse('用户名不能为空'));
    }
    {
      const result = await login({
        username: 'test',
        password: '',
      });
      expect(result).toEqual(errorResponse('密码不能为空'));
    }
    {
      const result = await login({
        username: 'test',
        password: '12345678901',
      });
      expect(result).toEqual(errorResponse('密码不能超过10个字符'));
    }
  });

  it('用户首次登录，创建并登录', async () => {
    vi.mocked(database.users.get).mockResolvedValueOnce(null);
    const result = await login({
      username: 'test',
      password: '1234567890',
    });
    expect(result).toEqual(successResponse(void 0));

    expect(vi.mocked(database.users.set)).toHaveBeenCalledWith('test', {
      id: 'test',
      username: 'test',
      password: '1234567890',
    });
    expect(cookiesMock.set).toHaveBeenCalledTimes(1);
    expect(cookiesMock.set).toHaveBeenCalledWith(CookieIds.Token, 'test', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 一周
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
  });

  it('密码错误', async () => {
    vi.mocked(database.users.get).mockResolvedValueOnce({
      id: 'test',
      username: 'test',
      password: '1234567890',
    });
    const result = await login({
      username: 'test',
      password: '1234567891',
    });
    expect(result).toEqual(errorResponse('用户名或密码错误'));
  });

  it('老用户登录', async () => {
    vi.mocked(database.users.get).mockResolvedValueOnce({
      id: 'test',
      username: 'test',
      password: '1234567890',
    });
    const result = await login({
      username: 'test',
      password: '1234567890',
    });
    expect(result).toEqual(successResponse(void 0));
    expect(cookiesMock.set).toHaveBeenCalledTimes(1);
    expect(cookiesMock.set).toHaveBeenCalledWith(CookieIds.Token, 'test', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 一周
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
  });
});
