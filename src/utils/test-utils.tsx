import { Provider } from '@/components/ui/provider';
import { cleanup, render, RenderOptions } from '@testing-library/react';
import { ReactElement, type PropsWithChildren } from 'react';
import { afterEach } from 'vitest';

const AllTheProviders = (props: PropsWithChildren) => {
  return <Provider>{props.children}</Provider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

afterEach(() => {
  cleanup();
});
