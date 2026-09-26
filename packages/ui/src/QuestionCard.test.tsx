import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { QuestionCard } from './QuestionCard';

const question = {
  prompt: 'The ulnar nerve arises from which cord?',
  options: [
    { id: 'lateral', text: 'Lateral cord' },
    { id: 'medial', text: 'Medial cord' },
  ],
  answerId: 'medial',
  explanation: 'It continues from the medial cord.',
};

describe('QuestionCard', () => {
  it('reports a correct answer and shows the explanation', async () => {
    const onAnswered = vi.fn();
    render(<QuestionCard {...question} onAnswered={onAnswered} />);
    await userEvent.click(screen.getByRole('button', { name: 'Medial cord' }));
    expect(onAnswered).toHaveBeenCalledWith(true);
    expect(screen.getByRole('status')).toHaveTextContent('Correct');
    expect(screen.getByRole('status')).toHaveTextContent('It continues from the medial cord.');
  });

  it('marks a wrong answer without relying on colour alone, and reveals the right one', async () => {
    const onAnswered = vi.fn();
    render(<QuestionCard {...question} onAnswered={onAnswered} />);
    await userEvent.click(screen.getByRole('button', { name: 'Lateral cord' }));
    expect(onAnswered).toHaveBeenCalledWith(false);
    expect(screen.getByRole('status')).toHaveTextContent('Not quite');
    expect(screen.getByRole('img', { name: 'Your answer' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Correct answer' })).toBeInTheDocument();
  });

  it('accepts only one answer', async () => {
    const onAnswered = vi.fn();
    render(<QuestionCard {...question} onAnswered={onAnswered} />);
    await userEvent.click(screen.getByRole('button', { name: 'Lateral cord' }));
    await userEvent.click(screen.getByRole('button', { name: /Medial cord/ }));
    expect(onAnswered).toHaveBeenCalledOnce();
  });

  it('has no accessibility violations after answering', async () => {
    const { container } = render(<QuestionCard {...question} />);
    await userEvent.click(screen.getByRole('button', { name: 'Lateral cord' }));
    await expectNoA11yViolations(container);
  });
});
