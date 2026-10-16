import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RecallCard } from './RecallCard';

describe('RecallCard', () => {
  it('hides the answer until asked, then collects a rating', async () => {
    const onRate = vi.fn();
    render(<RecallCard front="Roots of the upper trunk?" back="C5 and C6." onRate={onRate} />);

    expect(screen.queryByText('C5 and C6.')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    expect(screen.getByText('C5 and C6.')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Good: Recalled' }));
    expect(onRate).toHaveBeenCalledWith('good');
  });

  it('offers all four ratings', async () => {
    render(<RecallCard front="Q" back="A" onRate={() => undefined} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    for (const name of ['Again: Forgot', 'Hard: Struggled', 'Good: Recalled', 'Easy: Instant']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
  });

  it('keeps keyboard focus on the answer and the next prompt as controls are replaced', async () => {
    const onRate = vi.fn();
    const { rerender } = render(
      <RecallCard front="First prompt" back="First answer" onRate={onRate} />,
    );
    expect(screen.getByText('First prompt')).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Show answer' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('First answer')).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Again: Forgot' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onRate).toHaveBeenCalledWith('again');
    expect(screen.getByText('First prompt')).toHaveFocus();

    rerender(
      <RecallCard key="second" front="Second prompt" back="Second answer" onRate={onRate} />,
    );
    expect(screen.getByText('Second prompt')).toHaveFocus();
  });

  it('has no accessibility violations when revealed', async () => {
    const { container } = render(<RecallCard front="Q" back="A" onRate={() => undefined} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    await expectNoA11yViolations(container);
  });
});
