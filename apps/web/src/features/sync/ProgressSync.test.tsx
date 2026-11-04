import { EMPTY_PROGRESS } from '@medlearn/core';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ProgressSync } from './ProgressSync';

const fixture = vi.hoisted(() => ({ pathname: '/today' }));
const stop = vi.hoisted(() => vi.fn());
const start = vi.hoisted(() => vi.fn(() => stop));
vi.mock('next/navigation', () => ({ usePathname: () => fixture.pathname }));
vi.mock('@/features/progress/store', () => ({
  useProgress: () => ({ ...EMPTY_PROGRESS, profile: { adult: true }, updatedAt: '2026-11-04' }),
}));
vi.mock('./sync', () => ({ startProgressSync: start, restoreProgress: vi.fn() }));
afterEach(() => vi.clearAllMocks());

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
});
