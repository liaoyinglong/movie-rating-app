import { render } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from './search-input';

describe('SearchInput', () => {
  it('正常渲染', () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);

    const { getByTestId } = render(<SearchInput />);

    expect(getByTestId('search-input')).toBeDefined();
    expect(getByTestId('search-input-submit')).toBeDefined();
  });

  it('带有搜索参数', () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('q=test') as never,
    );

    const { getByTestId } = render(<SearchInput />);

    expect((getByTestId('search-input') as HTMLInputElement).value).toBe(
      'test',
    );
  });

  it('提交表单', async () => {
    const mockedPush = vi.fn();

    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
    vi.mocked(usePathname).mockReturnValue('/');
    vi.mocked(useRouter).mockReturnValue({
      push: mockedPush,
    } as never);

    const user = userEvent.setup();
    const { getByTestId } = render(<SearchInput />);

    // 不输入的情况提交
    await user.click(getByTestId('search-input-submit'));
    expect(mockedPush).toBeCalledWith('/');

    // 输入的情况提交
    await user.type(getByTestId('search-input'), 'test');

    expect((getByTestId('search-input') as HTMLInputElement).value).toBe(
      'test',
    );

    await user.click(getByTestId('search-input-submit'));
    expect(mockedPush).toHaveBeenCalledWith('/?q=test');
  });
});
