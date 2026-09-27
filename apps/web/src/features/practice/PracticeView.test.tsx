import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { PLANNABLE_TOPICS, practiceQuestions } from '@/content/topics';
import { completeLesson, resetProgress } from '@/features/progress/store';

import { PracticeView } from './PracticeView';

afterEach(() => act(() => resetProgress()));

const correctText = (index: number) => {
  const question = brachialPlexus.questions[index];
  return question?.options.find((option) => option.id === question.answerId)?.text ?? '';
};

describe('PracticeView', () => {
  it('asks the student to finish a lesson first', () => {
    render(<PracticeView topics={PLANNABLE_TOPICS} questions={practiceQuestions()} />);
    expect(screen.getByText('Nothing to practise yet')).toBeInTheDocument();
  });

  it('keeps an answered question on screen until "Next question"', async () => {
    act(() => completeLesson('brachial-plexus'));
    render(<PracticeView topics={PLANNABLE_TOPICS} questions={practiceQuestions()} />);
    await userEvent.click(screen.getByRole('button', { name: correctText(0) }));
    expect(screen.getByText('Correct', { exact: true })).toBeInTheDocument();
    expect(screen.getByText(brachialPlexus.questions[0]?.prompt ?? '')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Next question' }));
    expect(screen.getByText(brachialPlexus.questions[1]?.prompt ?? '')).toBeInTheDocument();
  });

  it('brings a wrongly answered question back next session, and finishes when all are done', async () => {
    act(() => completeLesson('brachial-plexus'));
    const { unmount } = render(
      <PracticeView topics={PLANNABLE_TOPICS} questions={practiceQuestions()} />,
    );
    const firstPrompt = brachialPlexus.questions[0]?.prompt ?? '';
    const wrong = brachialPlexus.questions[0]?.options.find(
      (option) => option.id !== brachialPlexus.questions[0]?.answerId,
    );
    await userEvent.click(screen.getByRole('button', { name: wrong?.text ?? '' }));
    expect(screen.getByText('Not quite', { exact: true })).toBeInTheDocument();
    unmount();

    render(<PracticeView topics={PLANNABLE_TOPICS} questions={practiceQuestions()} />);
    expect(screen.getByText(firstPrompt)).toBeInTheDocument();
    for (let index = 0; index < brachialPlexus.questions.length; index += 1) {
      await userEvent.click(screen.getByRole('button', { name: correctText(index) }));
      await userEvent.click(screen.getByRole('button', { name: 'Next question' }));
    }
    expect(screen.getByText('All questions done')).toBeInTheDocument();
  });
});
