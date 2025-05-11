'use client';
import { ModalIds } from '@/constants/modal-ids';
import { Locale } from '@/i18n/config';
import {
  Button,
  createOverlay,
  Drawer,
  IconButton,
  Menu,
  Portal,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LuGlobe } from 'react-icons/lu';
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
        <LocaleSwitcher />
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
  const { t } = useTranslation('header');

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
                  {t('header:home')}
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

function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createHref = (nextLocale: string) => {
    return {
      pathname: pathname.replace(params.locale as string, nextLocale),
      search: searchParams.toString(),
    };
  };
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="ghost">
          <LuGlobe />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content data-testid="user-info-menu">
            <Menu.Item asChild value={Locale.enUS}>
              <Link href={createHref(Locale.enUS)}>English</Link>
            </Menu.Item>
            <Menu.Item asChild value={Locale.zhCN}>
              <Link href={createHref(Locale.zhCN)}>简体中文</Link>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
