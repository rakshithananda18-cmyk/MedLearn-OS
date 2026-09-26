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
const next = () => userEvent.click(screen.getByRole('button', { name: 'Continue' }));

describe('OnboardingView', () => {
  it('asks age, year, exam date and daily minutes, then opens Today', async () => {
    const { container } = render(<OnboardingView />);
    expect(screen.getByRole('img', { name: 'Step 1 of 4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await expectNoA11yViolations(container);

    await userEvent.click(screen.getByRole('radio', { name: /18 or older/ }));
    await next();
    await userEvent.click(screen.getByRole('radio', { name: /First year/ }));
    await next();
    fireEvent.change(screen.getByLabelText('Exam date'), { target: { value: '2026-12-01' } });
    await next();
    await userEvent.click(screen.getByRole('radio', { name: /30 minutes/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Create my plan' }));

    expect(savedProfile()).toEqual({
      year: 1,
      examDate: '2026-12-01',
      dailyMinutes: 30,
      adult: true,
    });
    expect(push).toHaveBeenCalledWith('/today');
  });

  it('keeps an under-18 student on the phone, accepts "not sure yet" and can go back', async () => {
    render(<OnboardingView />);
    await userEvent.click(screen.getByRole('radio', { name: /Under 18/ }));
    await next();
    await userEvent.click(screen.getByRole('radio', { name: /Second year/ }));
    expect(screen.getByText(/first-year topics only/)).toBeInTheDocument();
    await next();
    await userEvent.click(screen.getByRole('button', { name: 'Previous question' }));
    expect(screen.getByRole('radio', { name: /Second year/ })).toBeChecked();
    await next();
    await userEvent.click(screen.getByRole('button', { name: 'Not sure yet' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create my plan' }));
    expect(savedProfile()).toEqual({ year: 2, examDate: null, dailyMinutes: 20, adult: false });
  });

  it('can be skipped with safe defaults: nothing leaves the phone', async () => {
    render(<OnboardingView />);
    await userEvent.click(screen.getByRole('button', { name: 'Skip' }));
    expect(savedProfile()).toEqual({ year: 1, examDate: null, dailyMinutes: 20, adult: false });
    expect(push).toHaveBeenCalledWith('/today');
  });
});
