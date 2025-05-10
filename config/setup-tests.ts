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
