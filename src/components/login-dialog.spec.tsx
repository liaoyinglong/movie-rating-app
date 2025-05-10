import { ModalIds } from '@/constants/modal-ids';
import { login } from '@/server-actions/login';
import { act, render } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LoginDialog } from './login-dialog';

vi.mock('@/server-actions/login');
describe('LoginDialog', () => {
  it('正常显示', async () => {
    const { getByTestId } = render(
      <LoginDialog.Viewport></LoginDialog.Viewport>,
    );

    act(() => {
      LoginDialog.open(ModalIds.LoginDialog, {});
    });

    const dialog = getByTestId('login-dialog');
    expect(dialog).toBeDefined();
  });

  it('正常关闭', async () => {
    const user = userEvent.setup();
    const { getByTestId, queryByTestId } = render(
      <LoginDialog.Viewport></LoginDialog.Viewport>,
    );

    act(() => {
      LoginDialog.open(ModalIds.LoginDialog, {});
    });

    const dialog = getByTestId('login-dialog');
    expect(dialog).toBeDefined();

    await user.click(getByTestId('login-dialog-close-button'));

    expect(queryByTestId('login-dialog')).toBeNull();
  });

  it('可以提交', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <LoginDialog.Viewport></LoginDialog.Viewport>,
    );

    act(() => {
      LoginDialog.open(ModalIds.LoginDialog, {});
    });

    await user.type(getByTestId('login-dialog-username-input'), 'test');
    await user.type(getByTestId('login-dialog-password-input'), 'test');

    await user.click(getByTestId('login-dialog-submit-button'));

    expect(vi.mocked(login).mock.calls[0][0]).toEqual({
      username: 'test',
      password: 'test',
    });
  });
});
