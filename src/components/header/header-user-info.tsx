'use client';
import { ModalIds } from '@/constants/modal-ids';
import type { User } from '@/database/types';
import { logout } from '@/server-actions/logout';
import { Button, Menu, Portal } from '@chakra-ui/react';
import { startTransition, use, useOptimistic } from 'react';
import { LoginDialog } from '../login-dialog';
import { toaster } from '../ui/toaster';
export function UserInfo(props: {
  userInfoPromise: Promise<User | undefined | null>;
}) {
  const userInfo = use(props.userInfoPromise);
  const isLoggedIn = !!userInfo;
  const userName = userInfo?.username;

  const [isPending, setIsPending] = useOptimistic(false);

  return isLoggedIn ? (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          loading={isPending}
          px={2}
          data-testid="user-info-button"
        >
          你好，{userName}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content data-testid="user-info-menu">
            <Menu.Item
              value="logout"
              onClick={() => {
                setIsPending(true);
                startTransition(async () => {
                  await logout();
                  toaster.create({
                    description: '退出登录成功',
                    type: 'success',
                  });
                });
              }}
            >
              退出登录
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  ) : (
    <Button
      variant={'ghost'}
      size={'sm'}
      fontSize={'md'}
      onClick={() => {
        LoginDialog.open(ModalIds.LoginDialog, {});
      }}
      data-testid="login-button"
    >
      登录
    </Button>
  );
}
