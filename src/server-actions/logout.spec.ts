import { CookieIds } from '@/constants/cookie-ids';
import { cookies } from 'next/headers';
import { describe, expect, it, vi } from 'vitest';
import { logout } from './logout';

vi.mock('next/headers');

const cookieStoreMock = {
  delete: vi.fn(),
};

vi.mocked(cookies).mockResolvedValue(cookieStoreMock as never);

describe('logout', () => {
  it('should logout', async () => {
    await logout();

    expect(cookieStoreMock.delete).toHaveBeenCalledWith(CookieIds.Token);
  });
});
