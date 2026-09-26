import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { resetProgress } from '@/features/progress/store';

import { LessonView } from './LessonView';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  act(() => resetProgress());
  push.mockClear();
});

async function goToLastStep() {
  for (let step = 1; step < brachialPlexus.lesson.length; step += 1) {
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
  }
}

describe('LessonView', () => {
  it('walks forwards and backwards through the steps', async () => {
    render(<LessonView topic={brachialPlexus} />);
    expect(screen.getByRole('heading', { name: 'Five roots' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'Three trunks' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByRole('heading', { name: 'Five roots' })).toBeInTheDocument();
  });

  it('lets the student trace a nerve and show a lesion on the last step', async () => {
    render(<LessonView topic={brachialPlexus} />);
    await goToLastStep();

    await userEvent.click(screen.getByRole('button', { name: 'Median nerve' }));
    expect(screen.getByText(/Median nerve\. Path:/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Klumpke's palsy/ }));
    expect(screen.getByRole('button', { name: /Klumpke's palsy/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText(/claw hand/)).toBeInTheDocument();
  });

  it('records the lesson as finished and returns to Today', async () => {
    const { container } = render(<LessonView topic={brachialPlexus} />);
    await goToLastStep();
    await expectNoA11yViolations(container);
    await userEvent.click(screen.getByRole('button', { name: 'Finish lesson' }));
    expect(push).toHaveBeenCalledWith('/today');
    expect(JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}').completedLessons).toEqual([
      'brachial-plexus',
    ]);
  });
});
