// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

import { readProgress, replaceProgress, resetProgress } from '@/features/progress/store';

import { beginFixtureMode, endFixtureMode, isFixtureMode, subscribeFixtureMode } from './mode';
import { SCENARIOS } from './scenarios';

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  resetProgress();
  isFixtureMode();
});

describe('local fixture isolation', () => {
  it('persists isolation before fixture progress, and clears fixtures before releasing it', () => {
    expect(beginFixtureMode()).toBe(true);
    const scenario = SCENARIOS[1];
    if (!scenario) throw new Error('Missing fixture');
    replaceProgress(scenario.build(new Date()));
    expect(isFixtureMode()).toBe(true);
    expect(readProgress().profile).not.toBeNull();
    const whenReleased = vi.fn(() => {
      if (!isFixtureMode()) expect(readProgress().profile).toBeNull();
    });
    const stop = subscribeFixtureMode(whenReleased);
    expect(endFixtureMode()).toBe(true);
    expect(whenReleased).toHaveBeenCalledOnce();
    expect(isFixtureMode()).toBe(false);
    expect(JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}').profile).toBeNull();
    stop();
  });

  it('cannot start a fixture session when its marker cannot be persisted', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(beginFixtureMode()).toBe(false);
    expect(isFixtureMode()).toBe(false);
  });

  it('keeps the persisted isolation when clearing fixture progress fails', () => {
    beginFixtureMode();
    const scenario = SCENARIOS[1];
    if (!scenario) throw new Error('Missing fixture');
    replaceProgress(scenario.build(new Date()));
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(endFixtureMode()).toBe(false);
    expect(isFixtureMode()).toBe(true);
    expect(localStorage.getItem('ml-fixture-mode-v1')).not.toBeNull();
  });

  it('notifies another tab and retains known isolation when storage becomes unreadable', () => {
    const changed = vi.fn();
    const stop = subscribeFixtureMode(changed);
    localStorage.setItem('ml-fixture-mode-v1', 'local-test-session');
    window.dispatchEvent(new StorageEvent('storage', { key: 'ml-fixture-mode-v1' }));
    expect(changed).toHaveBeenCalledOnce();
    expect(isFixtureMode()).toBe(true);
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(isFixtureMode()).toBe(true);
    stop();
  });
});
