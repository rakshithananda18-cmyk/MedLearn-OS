import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { resetProgress } from '@/features/progress/store';

import { OnboardingView } from './OnboardingView';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  act(() => resetProgress());
  push.mockClear();
});

const savedProfile = () => JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}').profile;

describe('OnboardingView', () => {
  it('asks year, exam date and daily minutes, then opens Today', async () => {
    const { container } = render(<OnboardingView />);
    expect(screen.getByRole('img', { name: 'Step 1 of 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await expectNoA11yViolations(container);

    await userEvent.click(screen.getByRole('radio', { name: /First year/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    fireEvent.change(screen.getByLabelText('Exam date'), { target: { value: '2026-12-01' } });
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await userEvent.click(screen.getByRole('radio', { name: /30 minutes/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Create my plan' }));

    expect(savedProfile()).toEqual({ year: 1, examDate: '2026-12-01', dailyMinutes: 30 });
    expect(push).toHaveBeenCalledWith('/today');
  });

  it('accepts "not sure yet" for the exam and can go back a step', async () => {
    render(<OnboardingView />);
    await userEvent.click(screen.getByRole('radio', { name: /Second year/ }));
    expect(screen.getByText(/first-year topics only/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));
    await userEvent.click(screen.getByRole('button', { name: 'Previous question' }));
    expect(screen.getByRole('radio', { name: /Second year/ })).toBeChecked();
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));
    await userEvent.click(screen.getByRole('button', { name: 'Not sure yet' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create my plan' }));
    expect(savedProfile()).toEqual({ year: 2, examDate: null, dailyMinutes: 20 });
  });

  it('can be skipped with sensible defaults', async () => {
    render(<OnboardingView />);
    await userEvent.click(screen.getByRole('button', { name: 'Skip' }));
    expect(savedProfile()).toEqual({ year: 1, examDate: null, dailyMinutes: 20 });
    expect(push).toHaveBeenCalledWith('/today');
  });
});
