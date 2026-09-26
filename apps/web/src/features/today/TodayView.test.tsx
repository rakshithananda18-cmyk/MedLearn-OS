import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TOPICS } from '@/content/topics';
import { completeLesson, rateCard, recordAnswer, resetProgress } from '@/features/progress/store';

import { TodayView } from './TodayView';

afterEach(() => act(() => resetProgress()));

describe('TodayView', () => {
  it('offers a new student the first lesson', async () => {
    const { container } = render(<TodayView />);
    expect(screen.getByRole('link', { name: /Learn: Brachial plexus/ })).toHaveAttribute(
      'href',
      '/learn/brachial-plexus',
    );
    await expectNoA11yViolations(container);
  });

  it('adds reviews and practice once the lesson is done', () => {
    render(<TodayView />);
    act(() => completeLesson('brachial-plexus'));
    expect(screen.getByRole('link', { name: /Review 4 cards/ })).toHaveAttribute('href', '/revise');
    expect(screen.getByRole('link', { name: /Practice: Brachial plexus/ })).toBeInTheDocument();
  });

  it('shows the all-done state when nothing is left', () => {
    render(<TodayView />);
    act(() => {
      completeLesson('brachial-plexus');
      for (const topic of TOPICS) {
        topic.questions.forEach((question) => recordAnswer(question.id, true));
        topic.cards.forEach((card) => rateCard(card.id, 'easy'));
      }
    });
    expect(screen.getByText('All done for today')).toBeInTheDocument();
  });
});
