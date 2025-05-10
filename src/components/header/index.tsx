'use client';
import { ModalIds } from '@/constants/modal-ids';
import {
  Button,
  createOverlay,
  Drawer,
  IconButton,
  Portal,
} from '@chakra-ui/react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { MdHome, MdMenu } from 'react-icons/md';
import { LoginDialog } from '../login-dialog';
import { ColorModeButton } from '../ui/color-mode';

export default function Header(props: { userInfo: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between gap-2 border-b bg-(--chakra-colors-bg) px-2 py-3 md:px-6">
      <div className="text-lg font-bold">
        <Link href="/">Movie Rating</Link>
      </div>

      {/* 右侧：主题切换 + 用户信息/登录按钮（桌面端和移动端都显示） */}
      <div className="flex items-center gap-0.5 md:gap-1">
        {props.userInfo}
        <ColorModeButton className={'hidden md:flex'} />

        <IconButton
          variant={'ghost'}
          className={'md:hidden'}
          onClick={() => {
            MobileMenu.open(ModalIds.MobileMenu, {});
          }}
        >
          <MdMenu size={24} />
        </IconButton>
      </div>

      <LoginDialog.Viewport></LoginDialog.Viewport>
      <MobileMenu.Viewport></MobileMenu.Viewport>
    </header>
  );
}

const MobileMenu = createOverlay((props) => {
  const close = () => {
    MobileMenu.close(ModalIds.MobileMenu);
  };

  return (
    <Drawer.Root {...props}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content className="relative">
            <Drawer.Header>
              <Drawer.Title>Movie Rating</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className={'flex flex-col gap-2'}>
              <Button
                variant={'ghost'}
                asChild
                size={'sm'}
                fontSize={'md'}
                justifyContent={'flex-start'}
                px={0}
                onClick={close}
              >
                <Link href="/" className="flex items-center gap-2">
                  <MdHome size={18} />
                  首页
                </Link>
              </Button>
            </Drawer.Body>
            <div className="absolute bottom-4 left-0 flex w-full justify-center">
              <ColorModeButton />
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});
