import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PLANNABLE_TOPICS } from '@/content/topics';

import { MasteryCard } from './MasteryCard';
import { completeLesson, recordAnswer, resetProgress } from './store';

afterEach(() => act(() => resetProgress()));

describe('MasteryCard', () => {
  it('fills as the lesson, practice and recall are done', () => {
    const topic = PLANNABLE_TOPICS.find((item) => item.slug === 'axilla');
    if (!topic) throw new Error('axilla is missing');
    render(<MasteryCard topic={topic} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('to do')).toBeInTheDocument();

    act(() => {
      completeLesson('axilla');
      recordAnswer(topic.questionIds[0] ?? '', true);
    });
    expect(screen.getByText('done')).toBeInTheDocument();
    expect(screen.getByText(`1/${topic.questionIds.length}`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mastery' })).toBeInTheDocument();
  });
});
