import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { PLANNABLE_TOPICS, recallDeck } from '@/content/topics';
import {
  completeLesson,
  rateCard,
  readProgress,
  recordAnswer,
  resetProgress,
} from '@/features/progress/store';

const rateCardEasy = (id: string) => rateCard(id, 'easy');

import { ReviseView } from './ReviseView';

afterEach(() => act(() => resetProgress()));

describe('ReviseView', () => {
  it('has nothing due before a lesson is finished', () => {
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} />);
    expect(screen.getByText('No reviews due')).toBeInTheDocument();
  });

  it('shows due cards one at a time and reschedules each rating', async () => {
    act(() => completeLesson('brachial-plexus'));
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} />);
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

  it('brings a missed question back as a recall card with the answer', async () => {
    act(() => {
      completeLesson('brachial-plexus');
      for (const card of brachialPlexus.cards) {
        rateCardEasy(card.id);
      }
      recordAnswer('erb-roots', false);
    });
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} />);
    const question = brachialPlexus.questions.find((item) => item.id === 'erb-roots');
    expect(screen.getByText('From a question you missed')).toBeInTheDocument();
    expect(screen.getByText(question?.prompt ?? '')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    expect(
      screen.getByText(new RegExp(question?.explanation.slice(0, 20) ?? '')),
    ).toBeInTheDocument();
  });
});

describe('bounded Today review sessions', () => {
  it('stops at the planned count, leaving other cards and new mistakes for later', async () => {
    act(() => {
      completeLesson('brachial-plexus');
      completeLesson('oxygen-haemoglobin-curve');
    });
    const { unmount } = render(
      <ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} limit={2} />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    await userEvent.click(screen.getByRole('button', { name: 'Easy: Instant' }));
    // A sync or another view can add due cards after the session starts.
    act(() => recordAnswer('erb-roots', false));
    expect(
      screen.getByText('1 card left in this session. Answer in your head, then check.'),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    await userEvent.click(screen.getByRole('button', { name: 'Easy: Instant' }));
    expect(screen.getByText('Review session complete')).toBeInTheDocument();
    expect(screen.getByText(/You reviewed 2 cards/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show answer' })).not.toBeInTheDocument();
    expect(Object.keys(readProgress().reviews)).toHaveLength(2);

    // Direct navigation still opens the remaining global queue.
    unmount();
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} />);
    expect(screen.getByText('7 cards due. Answer in your head, then check.')).toBeInTheDocument();
  });

  it('does not refill a short session with newly unlocked cards', async () => {
    act(() => {
      completeLesson('brachial-plexus');
      for (const card of brachialPlexus.cards.slice(1)) rateCardEasy(card.id);
    });
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} limit={5} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    await userEvent.click(screen.getByRole('button', { name: 'Easy: Instant' }));
    act(() => completeLesson('oxygen-haemoglobin-curve'));
    expect(screen.getByText('Review session complete')).toBeInTheDocument();
    expect(screen.getByText(/You reviewed 1 card/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show answer' })).not.toBeInTheDocument();
  });

  it('does not replace a queued card already reviewed on another device', async () => {
    act(() => completeLesson('brachial-plexus'));
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} limit={2} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show answer' }));
    await userEvent.click(screen.getByRole('button', { name: 'Easy: Instant' }));
    act(() => rateCardEasy(brachialPlexus.cards[1]?.id ?? ''));
    expect(screen.getByText('Review session complete')).toBeInTheDocument();
    expect(screen.getByText(/You reviewed 1 card/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show answer' })).not.toBeInTheDocument();
  });

  it('shows an empty queue before lessons are complete without claiming a completed session', () => {
    render(<ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} limit={2} />);
    expect(screen.getByText('No reviews due')).toBeInTheDocument();
    expect(screen.queryByText('Review session complete')).not.toBeInTheDocument();
  });
});
