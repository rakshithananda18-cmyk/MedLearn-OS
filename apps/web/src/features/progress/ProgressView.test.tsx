import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PLANNABLE_TOPICS } from '@/content/topics';
import { completeLesson, recordAnswer, resetProgress } from '@/features/progress/store';

import { ProgressView } from './ProgressView';

afterEach(() => act(() => resetProgress()));

describe('ProgressView', () => {
  it('shows every topic as not started for a new student', async () => {
    const { container } = render(<ProgressView topics={PLANNABLE_TOPICS} />);
    expect(screen.getByText('0 of 6 lessons')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Brachial plexus mastery' })).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
    expect(screen.getAllByText('Not started')).toHaveLength(6);
    expect(screen.queryByRole('heading', { name: 'Weak spots' })).not.toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('moves mastery with the lesson and practice, and lists missed questions as weak spots', () => {
    render(<ProgressView topics={PLANNABLE_TOPICS} />);
    act(() => {
      completeLesson('brachial-plexus');
      recordAnswer('ulnar-cord', true);
      recordAnswer('erb-roots', false);
    });
    expect(screen.getByText('1 of 6 lessons')).toBeInTheDocument();
    expect(screen.getByText(/Lesson done · 1 of 4 questions · 0 of 5 cards/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Weak spots' })).toBeInTheDocument();
    expect(screen.getByText('Brachial plexus: 1 missed question to recall')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Revise them' })).toHaveAttribute('href', '/revise');
  });
});
