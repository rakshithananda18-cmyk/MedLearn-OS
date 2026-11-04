import { useSyncExternalStore } from 'react';

import { clearLessonSteps } from '@/features/lesson/checkpoint';
import { readProgress, resetProgress } from '@/features/progress/store';
import { clearStudioData } from '@/features/studio/saved';

const MODE_KEY = 'ml-fixture-mode-v1';
const PROGRESS_KEY = 'ml-progress-v1';
const ACTIVE = 'local-test-session';
const listeners = new Set<() => void>();
let cached = false;

/** Read synchronously at every cloud boundary, including before React handles a storage event. */
export function isFixtureMode(): boolean {
  try {
    cached = localStorage.getItem(MODE_KEY) !== null;
  } catch {
    // A session already known to be isolated stays isolated if storage becomes unavailable.
  }
  return cached;
}

export function subscribeFixtureMode(listener: () => void): () => void {
  listeners.add(listener);
  const changed = (event: StorageEvent) => {
    if (event.key === MODE_KEY || event.key === null) listener();
  };
  window.addEventListener('storage', changed);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', changed);
  };
}

const notify = () => {
  for (const listener of listeners) listener();
};

/** Fixtures may replace device progress only after their isolation survives a reload. */
export function beginFixtureMode(): boolean {
  try {
    localStorage.setItem(MODE_KEY, ACTIVE);
    if (localStorage.getItem(MODE_KEY) !== ACTIVE) return false;
    cached = true;
    notify();
    return true;
  } catch {
    return false;
  }
}

/** Clear persisted fixtures first; only then may normal account restoration or sync resume. */
export function endFixtureMode(): boolean {
  if (!isFixtureMode()) return true;
  resetProgress();
  const lessonsCleared = clearLessonSteps();
  const studioCleared = clearStudioData();
  try {
    const progressCleared = localStorage.getItem(PROGRESS_KEY) === JSON.stringify(readProgress());
    if (!progressCleared || !lessonsCleared || !studioCleared) return false;
    localStorage.removeItem(MODE_KEY);
    if (localStorage.getItem(MODE_KEY) !== null) return false;
    cached = false;
    notify();
    return true;
  } catch {
    return false;
  }
}

/** All tabs show the same local test-session state. The server never starts one. */
export function useFixtureMode(): boolean {
  return useSyncExternalStore(subscribeFixtureMode, isFixtureMode, () => false);
}
