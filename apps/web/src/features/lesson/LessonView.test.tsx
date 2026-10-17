import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { hipJoint } from '@/content/hip-joint';
import { oxygenCurve } from '@/content/oxygen-curve';
import { resetProgress } from '@/features/progress/store';

import { LessonView } from './LessonView';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  act(() => resetProgress());
  localStorage.removeItem('ml-lesson-steps-v1');
  push.mockClear();
});

async function goToLastStep() {
  for (let step = 1; step < brachialPlexus.lesson.length; step += 1) {
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
  }
}

describe('LessonView', () => {
  it('picks up an interrupted lesson at the step it was left, and can start over', async () => {
    const first = render(<LessonView topic={brachialPlexus} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    const third = brachialPlexus.lesson[2]?.title ?? '';
    expect(screen.getByRole('heading', { name: third })).toBeInTheDocument();
    first.unmount();

    // Coming back, as after a reload or leaving for Today.
    render(<LessonView topic={brachialPlexus} />);
    expect(screen.getByRole('heading', { name: third })).toBeInTheDocument();
    expect(screen.getByText(/Step 3 of/)).toBeInTheDocument();
    expect(screen.getByText('Picked up where you left off.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Start over' }));
    expect(screen.getByRole('heading', { name: 'Five roots' })).toBeInTheDocument();
    expect(screen.queryByText('Picked up where you left off.')).not.toBeInTheDocument();
  });

  it('forgets the step once the lesson is finished', async () => {
    render(<LessonView topic={brachialPlexus} />);
    await goToLastStep();
    expect(localStorage.getItem('ml-lesson-steps-v1')).toContain('brachial-plexus');
    await userEvent.click(screen.getByRole('button', { name: 'Finish lesson' }));
    expect(localStorage.getItem('ml-lesson-steps-v1')).not.toContain('brachial-plexus');
  });

  it('walks forwards and backwards, focusing each new step so it is never out of sight', async () => {
    render(<LessonView topic={brachialPlexus} />);
    expect(screen.getByRole('heading', { name: 'Five roots' })).not.toHaveFocus();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'Three trunks' })).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByRole('heading', { name: 'Five roots' })).toHaveFocus();
  });

  it('hands over a slider for a step that names an angle, then goes back to the diagram', async () => {
    render(<LessonView topic={hipJoint} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'The neck-shaft angle' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /Neck-shaft angle/ })).toHaveValue('125');
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
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

  it('ends with key facts and two check questions; misses become recall cards', async () => {
    const { container } = render(<LessonView topic={brachialPlexus} />);
    await goToLastStep();
    await expectNoA11yViolations(container);
    await userEvent.click(screen.getByRole('button', { name: 'Finish lesson' }));

    const stored = () => JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}');
    expect(stored().completedLessons).toEqual(['brachial-plexus']);
    expect(screen.getByRole('heading', { name: 'Lesson complete' })).toBeInTheDocument();
    for (const fact of brachialPlexus.keyFacts) {
      expect(screen.getByText(fact)).toBeInTheDocument();
    }
    // The key facts, then the two check questions.
    expect(screen.getByRole('region', { name: 'Lesson complete' })).toBeInTheDocument();
    const checks = screen.getByRole('region', { name: 'Check questions' });
    expect(within(checks).getAllByRole('region')).toHaveLength(2);
    await expectNoA11yViolations(container);

    const [first] = brachialPlexus.questions;
    const wrong = first?.options.find((option) => option.id !== first.answerId);
    await userEvent.click(screen.getByRole('button', { name: wrong?.text ?? '' }));
    expect(stored().mistakes).toEqual([first?.id]);

    await userEvent.click(screen.getByRole('button', { name: 'Continue to Today' }));
    expect(push).toHaveBeenCalledWith('/today');
  });

  it('teaches the oxygen curve step by step, then hands over the sliders', async () => {
    render(<LessonView topic={oxygenCurve} />);
    expect(screen.getByText(/P50 26\.8 mmHg, the normal curve/)).toBeInTheDocument();
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(
      screen.getByRole('heading', { name: 'Acid and CO₂ shift it right' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/shifted right/)).toBeInTheDocument();
    for (let step = 3; step < oxygenCurve.lesson.length; step += 1) {
      await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    }
    expect(screen.getAllByRole('slider')).toHaveLength(4);
    await userEvent.click(screen.getByRole('button', { name: 'Stored blood' }));
    expect(screen.getByText(/shifted left/)).toBeInTheDocument();
  });
});
