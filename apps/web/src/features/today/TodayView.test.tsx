import { dayKey } from '@medlearn/core';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import {
  addGoal,
  chooseBooks,
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
  it('asks a student with a plan which books they follow, until they choose', () => {
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true }));
    const { unmount } = render(<TodayView topics={PLANNABLE_TOPICS} />);
    expect(screen.getByRole('link', { name: 'Choose my books' })).toHaveAttribute('href', '/books');
    unmount();

    act(() => chooseBooks(['guyton-hall']));
    render(<TodayView topics={PLANNABLE_TOPICS} />);
    expect(screen.queryByRole('link', { name: 'Choose my books' })).not.toBeInTheDocument();
  });

  it('offers a new student the first lesson and the three setup questions', async () => {
    const { container } = render(<TodayView topics={PLANNABLE_TOPICS} />);
    // The date is built by hand for speed; it must read as Intl would write it.
    const today = { weekday: 'long', day: 'numeric', month: 'long' } as const;
    expect(
      screen.getByText(new Intl.DateTimeFormat('en-IN', today).format(new Date())),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Learn: Pectoral region and breast/ })).toHaveAttribute(
      'href',
      '/learn/pectoral-region',
    );
    expect(screen.getByRole('link', { name: 'Set up my plan' })).toHaveAttribute(
      'href',
      '/welcome',
    );
    expect(screen.getByRole('link', { name: 'Start lesson' })).toHaveAttribute(
      'href',
      '/learn/pectoral-region',
    );
    await expectNoA11yViolations(container);
  });

  it('adds reviews and practice once the lesson is done, within the daily minutes', () => {
    render(<TodayView topics={PLANNABLE_TOPICS} />);
    act(() => completeLesson('pectoral-region'));
    expect(screen.getByRole('link', { name: /Review 5 cards/ })).toHaveAttribute('href', '/revise');
    expect(screen.getByRole('link', { name: /Learn: Axilla/ })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Practice: Pectoral region and breast/ }),
    ).toBeInTheDocument();
    expect(screen.getByText('19 of 20 min')).toBeInTheDocument();
  });

  it('switches to exam mode with a countdown and the diagram drill first', () => {
    render(<TodayView topics={PLANNABLE_TOPICS} />);
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
    expect(screen.getByText(/^Two weeks out: diagrams, revisits and recall/)).toBeInTheDocument();
    // The drill leads: it is the hero and the first step of the plan.
    expect(screen.getByRole('heading', { name: 'Draw: Brachial plexus' })).toBeInTheDocument();
    const plan = screen.getByRole('list', { name: "Today's plan" });
    expect(within(plan).getAllByRole('link')[0]).toHaveTextContent('Draw: Brachial plexus');
    expect(screen.queryByRole('link', { name: 'Set up my plan' })).not.toBeInTheDocument();
  });

  it('welcomes a student back after missed days with a capped plan to accept', async () => {
    seed({
      completedLessons: ['brachial-plexus'],
      lastActiveAt: new Date(Date.now() - 5 * DAY_MS).toISOString(),
    });
    render(<TodayView topics={PLANNABLE_TOPICS} />);
    expect(screen.getByRole('heading', { name: 'You were away for 4 days' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Accept plan' }));
    expect(screen.getByText('Plan accepted. Start with the first step below.')).toBeInTheDocument();
  });

  it('ticks off what is done today, and counts the streak and the minutes', () => {
    seed({
      activity: {
        [dayKey(new Date(Date.now() - DAY_MS))]: {
          minutes: 20,
          lessons: [],
          drills: [],
          answered: 0,
          reviewed: 0,
        },
      },
    });
    render(<TodayView topics={PLANNABLE_TOPICS} />);
    act(() => completeLesson('pectoral-region', 15));
    const plan = screen.getByRole('list', { name: "Today's plan" });
    expect(within(plan).getByText('Learned: Pectoral region and breast')).toBeInTheDocument();
    const streak = screen.getByRole('region', { name: 'day streak' });
    expect(within(streak).getByText('2')).toBeInTheDocument();
    const time = screen.getByRole('region', { name: 'Studied today' });
    expect(within(time).getByText('15')).toBeInTheDocument();
  });

  it('shows the all-done state when nothing is left', () => {
    render(<TodayView topics={PLANNABLE_TOPICS} />);
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

  it('fits a planned class test into the plan, and counts it down', () => {
    render(<TodayView topics={PLANNABLE_TOPICS} />);
    const goal = { kind: 'test' as const, title: 'Axilla test', topics: ['axilla'] };
    act(() => {
      addGoal({ ...goal, date: dayKey(new Date(Date.now() + 3 * DAY_MS)) });
    });
    const plan = screen.getByRole('list', { name: "Today's plan" });
    expect(
      within(plan).getByRole('link', { name: /Revise: Axilla: walls and contents/ }),
    ).toHaveAttribute('href', expect.stringMatching(/^\/practice\?goal=goal-\w+&topic=axilla$/));
    const goals = screen.getByRole('region', { name: 'Tests and revisits' });
    expect(within(goals).getByText('Axilla test')).toBeInTheDocument();
    expect(within(goals).getByText(/Test in 3 days/)).toBeInTheDocument();
  });

  it('brings a learnt topic back as a spaced revisit the next day', () => {
    const yesterday = new Date(Date.now() - DAY_MS);
    act(() => completeLesson('brachial-plexus', 15, yesterday));
    render(<TodayView topics={PLANNABLE_TOPICS} />);
    const plan = screen.getByRole('list', { name: "Today's plan" });
    expect(
      within(plan).getByRole('link', { name: /Revisit: Brachial plexus.*next-day revisit/ }),
    ).toHaveAttribute('href', '/practice?revisit=brachial-plexus');
  });
});
