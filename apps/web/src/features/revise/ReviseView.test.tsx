import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { completeLesson, resetProgress } from '@/features/progress/store';

import { ReviseView } from './ReviseView';

afterEach(() => act(() => resetProgress()));

describe('ReviseView', () => {
  it('has nothing due before a lesson is finished', () => {
    render(<ReviseView />);
    expect(screen.getByText('No reviews due')).toBeInTheDocument();
  });

  it('shows due cards one at a time and reschedules each rating', async () => {
    act(() => completeLesson('brachial-plexus'));
    render(<ReviseView />);
    expect(
      screen.getByText(
        `${brachialPlexus.cards.length} cards due. Answer in your head, then check.`,
      ),
    ).toBeInTheDocument();

    for (const card of brachialPlexus.cards) {
      expect(screen.getByText(card.front)).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
      await userEvent.click(screen.getByRole('button', { name: 'Easy: Instant' }));
    }
    expect(screen.getByText('No reviews due')).toBeInTheDocument();
  });
});
