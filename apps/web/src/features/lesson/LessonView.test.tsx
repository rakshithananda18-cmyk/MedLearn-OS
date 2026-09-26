import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { oxygenCurve } from '@/content/oxygen-curve';
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
    expect(screen.getAllByRole('region')).toHaveLength(2);
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
