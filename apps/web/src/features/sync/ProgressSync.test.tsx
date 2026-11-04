import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { beginFixtureMode, isFixtureMode } from '@/features/facilitator/mode';
import { readProgress, resetProgress, saveProfile } from '@/features/progress/store';

import { ProgressSync } from './ProgressSync';

const fixture = vi.hoisted(() => ({ pathname: '/today' }));
const stop = vi.hoisted(() => vi.fn());
const start = vi.hoisted(() => vi.fn(() => stop));
vi.mock('next/navigation', () => ({ usePathname: () => fixture.pathname }));
vi.mock('./sync', () => ({ startProgressSync: start, restoreProgress: vi.fn() }));
beforeEach(() => {
  fixture.pathname = '/today';
  act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true }));
});
afterEach(() => {
  act(() => resetProgress());
  vi.clearAllMocks();
});

describe('facilitator sync boundary', () => {
  it('does not start syncing while viewing test setup', () => {
    fixture.pathname = '/facilitator';
    render(<ProgressSync />);
    expect(start).not.toHaveBeenCalled();
  });

  it('stops an active sync when entering test setup', () => {
    fixture.pathname = '/today';
    const { rerender } = render(<ProgressSync />);
    expect(start).toHaveBeenCalledTimes(1);
    fixture.pathname = '/facilitator';
    rerender(<ProgressSync />);
    expect(stop).toHaveBeenCalledTimes(1);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('keeps an adult fixture isolated after opening Today and other study pages', () => {
    act(() => {
      beginFixtureMode();
    });
    fixture.pathname = '/facilitator';
    const { rerender } = render(<ProgressSync />);
    fixture.pathname = '/today';
    rerender(<ProgressSync />);
    fixture.pathname = '/subjects';
    rerender(<ProgressSync />);
    expect(start).not.toHaveBeenCalled();
    expect(screen.getByRole('complementary', { name: 'Local test session' })).toBeVisible();
  });

  it('discards fixture progress before normal operation is enabled again', async () => {
    act(() => {
      beginFixtureMode();
    });
    render(<ProgressSync />);
    await userEvent.click(screen.getByRole('button', { name: 'End and discard test progress' }));
    expect(readProgress().profile).toBeNull();
    expect(isFixtureMode()).toBe(false);
    expect(start).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('complementary', { name: 'Local test session' }),
    ).not.toBeInTheDocument();
  });
});
