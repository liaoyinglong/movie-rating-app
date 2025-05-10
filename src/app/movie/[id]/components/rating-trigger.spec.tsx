import { render, screen } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RatingTrigger } from './rating-trigger';

import { rateMovie } from '@/server-actions/rate-movie';

vi.mock('@/server-actions/rate-movie');

describe('RatingTrigger', () => {
  it('正确渲染', async () => {
    const user = userEvent.setup();

    render(<RatingTrigger movieId="1" />);
    const trigger = screen.getByTestId('rating-trigger');
    expect(trigger).toBeDefined();
    expect(trigger.tagName).toBe('BUTTON');

    await user.click(trigger);

    const dialog = screen.getByTestId('rating-dialog');
    expect(dialog).toBeDefined();

    const cancel = screen.getByTestId('rating-dialog-cancel');
    expect(cancel).toBeDefined();
    expect(cancel.tagName).toBe('BUTTON');

    const submit = screen.getByTestId('rating-dialog-submit');
    expect(submit).toBeDefined();
    expect(submit.tagName).toBe('BUTTON');
  });

  it('提交评分', async () => {
    const user = userEvent.setup();

    render(<RatingTrigger movieId="1" />);
    const trigger = screen.getByTestId('rating-trigger');
    expect(trigger).toBeDefined();

    await user.click(trigger);

    await user.type(screen.getByTestId('rating-dialog-comment'), 'test');
    const submit = screen.getByTestId('rating-dialog-submit');
    await user.click(submit);

    expect(vi.mocked(rateMovie)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(rateMovie)).toHaveBeenCalledWith({
      comment: 'test',
      movieId: '1',
      score: 5,
    });
  });
});
