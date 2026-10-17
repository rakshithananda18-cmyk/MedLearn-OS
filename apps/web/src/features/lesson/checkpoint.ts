import { useSyncExternalStore } from 'react';

// Where a student stopped in each unfinished lesson, on this device only: a lesson interrupted on
// a phone picks up at the same step. Finishing a lesson clears its step.
// ponytail: device-only, not in synced progress; add it there if students resume across devices.
const STORAGE_KEY = 'ml-lesson-steps-v1';
/** Lessons remembered at most; the oldest are forgotten first. */
export const MAX_CHECKPOINTS = 50;

type Checkpoints = Record<string, { step: number; at: number }>;

const listeners = new Set<() => void>();
const NONE: Checkpoints = {};
let cachedRaw: string | null | undefined;
let cached: Checkpoints = NONE;
// After a failed write the stored copy is stale, so this visit keeps to the one in memory.
let memoryOnly = false;

function read(): Checkpoints {
  if (memoryOnly) return cached;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return cached;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const value: unknown = raw ? JSON.parse(raw) : {};
    cached =
      value && typeof value === 'object' && !Array.isArray(value)
        ? Object.fromEntries(
            Object.entries(value).filter(
              ([, entry]) =>
                Number.isInteger((entry as { step?: unknown })?.step) &&
                (entry as { step: number }).step > 0 &&
                typeof (entry as { at?: unknown }).at === 'number',
            ),
          )
        : {};
  } catch {
    cached = {};
  }
  return cached;
}

function write(next: Checkpoints): void {
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cached = next;
  try {
    localStorage.setItem(STORAGE_KEY, raw);
    memoryOnly = false;
  } catch {
    // Blocked or full storage: the step is kept for this visit only.
    memoryOnly = true;
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

/** The step (0-based) a student stopped at in this lesson, or null when there is none. */
export function lessonStepOf(checkpoints: Checkpoints, slug: string | null): number | null {
  return slug ? (checkpoints[slug]?.step ?? null) : null;
}

/** The saved step of a lesson, live; null on the server and when the lesson has not been left. */
export function useLessonStep(slug: string | null): number | null {
  const checkpoints = useSyncExternalStore(subscribe, read, () => NONE);
  return lessonStepOf(checkpoints, slug);
}

/** Remembers the step a student has reached; the first step needs no checkpoint. */
export function saveLessonStep(slug: string, step: number, now = Date.now()): void {
  const others = Object.entries(read()).filter(([key]) => key !== slug);
  if (step <= 0) {
    write(Object.fromEntries(others));
    return;
  }
  const kept = others.toSorted(([, a], [, b]) => b.at - a.at).slice(0, MAX_CHECKPOINTS - 1);
  write({ ...Object.fromEntries(kept), [slug]: { step, at: now } });
}

/** Forgets a lesson's step, when it is finished. */
export function clearLessonStep(slug: string): void {
  saveLessonStep(slug, 0);
}

/** Forgets every lesson's step on this device, at sign-out; false when storage refused. */
export function clearLessonSteps(): boolean {
  write({});
  return !memoryOnly;
}

/** What a lesson's main action says: carry on from a saved step, go over a finished one, or start. */
export function lessonAction(done: boolean, step: number | null): string {
  if (step !== null && step > 0) return 'Continue lesson';
  return done ? 'Go over the lesson' : 'Start lesson';
}
