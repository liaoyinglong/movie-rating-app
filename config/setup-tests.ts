import { vi } from 'vitest';

vi.mock('server-only', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('client-only', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock(import('react'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    unstable_ViewTransition: actual.Fragment as never,
  };
});

vi.mock('next/image', () => {
  return {
    default: 'img',
  };
});

vi.mock('next/navigation', () => {
  return {
    usePathname: vi.fn(),
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('react-i18next', () => {
  return {
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (i18nKey: string) => i18nKey,
        // or with TypeScript:
        //t: (i18nKey: string) => i18nKey,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
  };
});
