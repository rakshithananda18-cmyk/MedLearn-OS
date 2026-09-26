import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { resetProgress } from '@/features/progress/store';

import { FacilitatorView } from './FacilitatorView';

afterEach(() => act(() => resetProgress()));

describe('FacilitatorView', () => {
  it('applies a scenario to this device and says so', async () => {
    const { container } = render(<FacilitatorView />);
    expect(screen.getByText('Plan: not set up')).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.click(screen.getByRole('button', { name: 'Apply: Exam in 12 days' }));

    expect(screen.getByRole('status')).toHaveTextContent('Exam in 12 days is set.');
    expect(screen.getByText(/Plan: 20 min a day, exam on/)).toBeInTheDocument();
    expect(screen.getByText(/Lessons finished: 1/)).toBeInTheDocument();
  });
});
