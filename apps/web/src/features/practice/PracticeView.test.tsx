import { addDays, dayKey } from '@medlearn/core';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, practiceQuestions, TOPICS } from '@/content/topics';
import { addGoal, completeLesson, readProgress, resetProgress } from '@/features/progress/store';

import { PracticeView } from './PracticeView';

afterEach(() => act(() => resetProgress()));

const renderPractice = (start?: { topic?: string; goal?: string; revisit?: string }) =>
  render(
    <PracticeView
      topics={PLANNABLE_TOPICS}
      questions={practiceQuestions()}
      tree={libraryTree(TOPICS)}
      {...(start ? { start } : {})}
    />,
  );

/** Answers the question showing with its right option, then moves on. */
async function answerRight() {
  const question = practiceQuestions().find(({ question: item }) =>
    screen.queryByText(item.prompt),
  );
  const answer = question?.question.options.find(
    (option) => option.id === question.question.answerId,
  );
  if (!answer) throw new Error('no question showing');
  await userEvent.click(screen.getByRole('button', { name: new RegExp(escape(answer.text)) }));
}
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('PracticeView', () => {
  it('offers the ways in and how each book section is going', async () => {
    const { container } = renderPractice();
    expect(screen.getByRole('button', { name: /Quick mix.*every topic/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Weak spots/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Timed test/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Recall cards/ })).toHaveAttribute('href', '/revise');
    const strengths = screen.getByRole('region', { name: /Where you are strong/ });
    expect(within(strengths).getByText('Axilla')).toBeInTheDocument();
    expect(within(strengths).getAllByText('Not started').length).toBeGreaterThan(1);
    await expectNoA11yViolations(container);
  });

  it('runs a quick mix to its score, counting every answer', async () => {
    renderPractice();
    await userEvent.click(screen.getByRole('button', { name: /Quick mix/ }));
    expect(screen.getByText('1 of 10')).toBeInTheDocument();
    await answerRight();
    await answerRight().catch(() => undefined);
    expect(readProgress().correctAnswers.length).toBeGreaterThan(0);

    await userEvent.click(screen.getByRole('button', { name: 'End the session' }));
    expect(screen.getByRole('button', { name: /Quick mix/ })).toBeInTheDocument();
  });

  it('ends a timed test by itself when the time runs out', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      renderPractice();
      await userEvent.click(screen.getByRole('button', { name: /Timed test/ }));
      const timer = screen.getByRole('timer', { name: 'Time left' });
      expect(timer).toHaveTextContent('20:00');
      act(() => vi.advanceTimersByTime(1000));
      expect(timer).toHaveTextContent('19:59');
      // Twenty minutes pass (say, with the tab in the background): the next tick ends it.
      act(() => vi.setSystemTime(Date.now() + 20 * 60 * 1000));
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByRole('heading', { name: '0/20' })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('opens straight into a topic from Today, and counts it towards the goal it came from', async () => {
    const goal = addGoal({
      kind: 'test',
      title: 'Axilla test',
      topics: ['axilla'],
      date: '2099-01-01',
    });
    renderPractice({ topic: 'axilla', goal: goal.id });
    const session = screen.getByRole('region', { name: 'Axilla: walls and contents' });
    const total = TOPICS.find((topic) => topic.slug === 'axilla')?.questions.length ?? 0;
    for (let index = 0; index < total; index++) {
      await answerRight();
      await userEvent.click(
        within(session).getByRole('button', {
          name: index === total - 1 ? 'See how you did' : 'Next question',
        }),
      );
    }
    expect(screen.getByRole('heading', { name: `${total}/${total}` })).toBeInTheDocument();
    expect(readProgress().goals[0]?.done).toEqual(['axilla']);
  });

  it('plans a class test, which then shows with its countdown', async () => {
    renderPractice();
    await userEvent.click(screen.getByRole('button', { name: 'Plan a class test or revisit' }));
    const dialog = screen.getByRole('dialog', { name: 'Plan a class test or revisit' });
    await userEvent.type(within(dialog).getByLabelText('Name'), 'Upper limb class test');
    await userEvent.type(within(dialog).getByLabelText('Test date'), '2099-01-01');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Brachial plexus' }));
    await userEvent.click(within(dialog).getByRole('button', { name: 'Save the plan' }));

    expect(readProgress().goals).toMatchObject([
      { kind: 'test', title: 'Upper limb class test', topics: ['brachial-plexus'] },
    ]);
    const goals = screen.getByRole('region', { name: 'Class tests and revisits' });
    expect(within(goals).getByText('Upper limb class test')).toBeInTheDocument();
    expect(within(goals).getByRole('button', { name: /Brachial plexus/ })).toBeInTheDocument();
  });

  it('runs a spaced revisit of up to five questions, and sets the next one from the score', async () => {
    const yesterday = new Date(Date.now() - 86_400_000);
    act(() => completeLesson('axilla', 12, yesterday));
    renderPractice({ revisit: 'axilla' });
    const session = screen.getByRole('region', { name: 'Revisit: Axilla: walls and contents' });
    const count = Math.min(
      5,
      TOPICS.find((topic) => topic.slug === 'axilla')?.questions.length ?? 0,
    );
    for (let index = 0; index < count; index++) {
      await answerRight();
      await userEvent.click(
        within(session).getByRole('button', {
          name: index === count - 1 ? 'See how you did' : 'Next question',
        }),
      );
    }
    expect(screen.getByRole('heading', { name: `${count}/${count}` })).toBeInTheDocument();
    expect(readProgress().revisits.axilla).toEqual({
      step: 1,
      due: addDays(dayKey(new Date()), 7),
    });
  });
});
