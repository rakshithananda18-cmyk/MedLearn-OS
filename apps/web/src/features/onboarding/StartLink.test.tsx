import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { resetProgress, saveProfile } from '@/features/progress/store';

import { StartLink } from './StartLink';

afterEach(() => act(() => resetProgress()));

describe('StartLink', () => {
  it('sends new students to the setup questions and returning ones to Today', () => {
    render(<StartLink />);
    expect(screen.getByRole('link', { name: 'Start in 3 steps' })).toHaveAttribute(
      'href',
      '/welcome',
    );
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20 }));
    expect(screen.getByRole('link', { name: 'Open today’s plan' })).toHaveAttribute(
      'href',
      '/today',
    );
  });
});
