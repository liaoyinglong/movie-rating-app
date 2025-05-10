import { ModalIds } from '@/constants/modal-ids';
import { login } from '@/server-actions/login';
import {
  Button,
  CloseButton,
  createOverlay,
  Dialog,
  Field,
  Input,
  Portal,
} from '@chakra-ui/react';
import { useActionState, useState } from 'react';
import { toaster } from './ui/toaster';

export const LoginDialog = createOverlay((props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [, formAction, isPending] = useActionState(
    async () => {
      const result = await login({
        username,
        password,
      });
      if (result?.success) {
        toaster.create({
          description: '登录成功',
          type: 'success',
        });
        LoginDialog.close(ModalIds.LoginDialog);
      } else {
        toaster.create({
          description: result?.errorMessage ?? '登录失败',
          type: 'error',
        });
      }
    },
    void 0,
  );

  return (
    <Dialog.Root {...props} placement={'center'}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            className={'mx-2 md:mx-auto'}
            data-testid="login-dialog"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" data-testid="login-dialog-close-button" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>登录</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              <Dialog.Description>
                无需注册，首次登录即自动注册。
              </Dialog.Description>
              <form className="flex flex-col gap-2" action={formAction}>
                <Field.Root required>
                  <Field.Label>
                    用户名 <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="123"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-testid="login-dialog-username-input"
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    密码 <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type={'password'}
                    placeholder={'123'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="login-dialog-password-input"
                  />
                </Field.Root>

                <Button
                  type="submit"
                  loading={isPending}
                  className={'mt-4'}
                  data-testid="login-dialog-submit-button"
                >
                  登录
                </Button>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
