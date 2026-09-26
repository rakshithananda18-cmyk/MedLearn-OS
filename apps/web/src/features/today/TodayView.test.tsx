import { dayKey } from '@medlearn/core';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { TOPICS } from '@/content/topics';
import {
  completeDrill,
  completeLesson,
  rateCard,
  recordAnswer,
  resetProgress,
  saveProfile,
} from '@/features/progress/store';

import { TodayView } from './TodayView';

afterEach(() => act(() => resetProgress()));

const DAY_MS = 86_400_000;

function seed(state: object) {
  localStorage.setItem('ml-progress-v1', JSON.stringify(state));
}

describe('TodayView', () => {
  it('offers a new student the first lesson and the three setup questions', async () => {
    const { container } = render(<TodayView />);
    expect(screen.getByRole('link', { name: /Learn: Brachial plexus/ })).toHaveAttribute(
      'href',
      '/learn/brachial-plexus',
    );
    expect(screen.getByRole('link', { name: 'Set up my plan' })).toHaveAttribute(
      'href',
      '/welcome',
    );
    expect(screen.getByRole('link', { name: 'Start now' })).toHaveAttribute(
      'href',
      '/learn/brachial-plexus',
    );
    await expectNoA11yViolations(container);
  });

  it('adds reviews and practice once the lesson is done, within the daily minutes', () => {
    render(<TodayView />);
    act(() => completeLesson('brachial-plexus'));
    expect(screen.getByRole('link', { name: /Review 4 cards/ })).toHaveAttribute('href', '/revise');
    expect(screen.getByRole('link', { name: /Practice: Brachial plexus/ })).toBeInTheDocument();
    expect(screen.getByText('18 of 20 min')).toBeInTheDocument();
  });

  it('switches to exam mode with a countdown and the diagram drill first', () => {
    render(<TodayView />);
    act(() => {
      saveProfile({
        year: 1,
        examDate: dayKey(new Date(Date.now() + 12 * DAY_MS)),
        dailyMinutes: 20,
        adult: true,
      });
      completeLesson('brachial-plexus');
    });
    expect(screen.getByText('Exam in 12 days')).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Draw: Brachial plexus');
    expect(screen.queryByRole('link', { name: 'Set up my plan' })).not.toBeInTheDocument();
  });

  it('welcomes a student back after missed days with a capped plan to accept', async () => {
    seed({
      completedLessons: ['brachial-plexus'],
      lastActiveAt: new Date(Date.now() - 5 * DAY_MS).toISOString(),
    });
    render(<TodayView />);
    expect(screen.getByRole('heading', { name: 'You were away for 4 days' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Accept plan' }));
    expect(screen.getByText('Plan accepted. Start with the first step below.')).toBeInTheDocument();
  });

  it('shows the all-done state when nothing is left', () => {
    render(<TodayView />);
    act(() => {
      for (const topic of TOPICS) {
        completeLesson(topic.slug);
        completeDrill(topic.slug);
        topic.questions.forEach((question) => recordAnswer(question.id, true));
        topic.cards.forEach((card) => rateCard(card.id, 'easy'));
      }
    });
    expect(screen.getByText('All done for today')).toBeInTheDocument();
  });
});
