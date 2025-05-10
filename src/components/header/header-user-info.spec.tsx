import { act, render } from '@/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UserInfo } from './header-user-info';

import userEvent from '@testing-library/user-event';
import { LoginDialog } from '../login-dialog';

vi.mock('../login-dialog');

describe('UserInfo', () => {
  it('未登录时显示登录按钮，点击后弹出登录框', async () => {
    const user = userEvent.setup();
    const { getByTestId } = await act(() => {
      return render(<UserInfo userInfoPromise={Promise.resolve(undefined)} />);
    });
    const loginBtn = getByTestId('login-button');
    expect(loginBtn).toBeDefined();
    await user.click(loginBtn);
    expect(vi.mocked(LoginDialog).open).toHaveBeenCalled();
  });

  it('已登录时显示用户名，点击后弹出菜单', async () => {
    const user = userEvent.setup();
    const { getByTestId } = await act(() => {
      return render(
        <UserInfo
          userInfoPromise={Promise.resolve({
            id: 'u1',
            username: '测试用户',
            password: '123',
          })}
        />,
      );
    });
    const userBtn = getByTestId('user-info-button');
    expect(userBtn).toBeDefined();
    await user.click(userBtn);
    // 菜单内容异步渲染
    const menu = getByTestId('user-info-menu');
    expect(menu).toBeDefined();
  });
});
