import {
  DEFAULT_DAILY_MINUTES,
  type LearnerProgress,
  mergeProgress,
  type StudyProfile,
} from '@medlearn/core';
import type { SavedProgress } from '@medlearn/schemas';

import {
  progressGeneration,
  readProgress,
  replaceProgress,
  subscribeToProgress,
} from '@/features/progress/store';
import { clientLogger } from '@/lib/client-logger';

/** The most recently changed profile wins; study records themselves are merged. */
export function newerCopy(
  local: LearnerProgress,
  server: LearnerProgress | null,
): 'local' | 'server' | 'same' {
  if (!server) return local.updatedAt ? 'local' : 'same';
  if (!local.updatedAt) return 'server';
  const difference = Date.parse(local.updatedAt) - Date.parse(server.updatedAt ?? '');
  return difference > 0 ? 'local' : difference < 0 ? 'server' : 'same';
}

const SAVE_DELAY_MS = 1000;
const MAX_ATTEMPTS = 3;
let lifecycle = 0;
let pauseDepth = 0;

interface SyncSession {
  flush: () => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}
let activeSync: SyncSession | undefined;

async function loadServerCopy(
  signal?: AbortSignal,
  allowMissingSession = false,
): Promise<SavedProgress | null> {
  const response = await fetch('/api/progress', { signal, cache: 'no-store' });
  if (response.status === 401 && allowMissingSession) return null;
  if (!response.ok) throw new Error(`Loading progress failed with ${response.status}`);
  const body = (await response.json()) as { data: unknown };
  if (body.data === null) return null;
  const { SavedProgress } = await import('@medlearn/schemas');
  // Invalid server data must not be treated as an empty account and overwritten.
  return SavedProgress.parse(body.data);
}

const ADULT_PROFILE: StudyProfile = {
  year: 1,
  examDate: null,
  dailyMinutes: DEFAULT_DAILY_MINUTES,
  adult: true,
};

const report = (error: unknown) => {
  if (error instanceof Error && error.name === 'AbortError') return;
  clientLogger.warn('Progress sync failed; will retry with the next change or connection', {
    message: error instanceof Error ? error.message : String(error),
  });
};

/** Ignores snapshot timestamps and collection order when deciding whether a save is needed. */
function contentKey(progress: LearnerProgress): string {
  return JSON.stringify(
    {
      ...progress,
      updatedAt: null,
      completedLessons: [...progress.completedLessons].sort(),
      completedDrills: [...progress.completedDrills].sort(),
      correctAnswers: [...progress.correctAnswers].sort(),
      mistakes: [...progress.mistakes].sort(),
      activity: Object.fromEntries(
        Object.entries(progress.activity).map(([day, activity]) => [
          day,
          {
            ...activity,
            lessons: [...activity.lessons].sort(),
            drills: [...activity.drills].sort(),
          },
        ]),
      ),
    },
    (_key, value: unknown) =>
      value && typeof value === 'object' && !Array.isArray(value)
        ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)))
        : value,
  );
}

function mergedCopy(local: LearnerProgress, saved: SavedProgress | null): LearnerProgress {
  if (!saved) return local;
  const server = { ...saved.progress, updatedAt: saved.updatedAt };
  const now = new Date(
    Math.max(Date.now(), Date.parse(local.updatedAt ?? '') || 0, Date.parse(saved.updatedAt)) + 1,
  );
  const merged =
    newerCopy(local, server) === 'local'
      ? mergeProgress(server, local, now)
      : mergeProgress(local, server, now);
  return contentKey(merged) === contentKey(server) ? server : merged;
}

/**
 * Reads before writing and compares the database version atomically. On a conflict, joins the
 * competing change before trying again. Retries are bounded, so an unavailable/busy server
 * never spins or discards the local copy.
 */
async function synchronize(signal: AbortSignal, current: () => boolean): Promise<string | null> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const saved = await loadServerCopy(signal);
    if (!current()) return null;
    const local = readProgress();
    if (local.profile?.adult !== true) return null;
    const merged = mergedCopy(local, saved);
    if (JSON.stringify(local) !== JSON.stringify(merged)) replaceProgress(merged);
    if (saved && contentKey(merged) === contentKey(saved.progress)) return merged.updatedAt;
    const response = await fetch('/api/progress', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      signal,
      body: JSON.stringify({ progress: merged, expectedUpdatedAt: saved?.updatedAt ?? null }),
    });
    if (!current()) return null;
    if (response.status === 409) continue;
    if (!response.ok) throw new Error(`Saving progress failed with ${response.status}`);
    return merged.updatedAt;
  }
  throw new Error('Progress changed on another device. Please try again.');
}

/** Pauses background work across an account change; the returned function resumes it. */
export function pauseProgressSync(): () => void {
  pauseDepth += 1;
  lifecycle += 1;
  activeSync?.pause();
  let resumed = false;
  return () => {
    if (resumed) return;
    resumed = true;
    pauseDepth -= 1;
    if (pauseDepth === 0) activeSync?.resume();
  };
}

/** Saves every pending local change before sign-out removes this device's copy. */
export async function flushProgressSync(): Promise<void> {
  if (activeSync) return activeSync.flush();
  if (readProgress().profile?.adult !== true) return;
  const generation = progressGeneration();
  const currentLifecycle = lifecycle;
  const controller = new AbortController();
  const current = () => generation === progressGeneration() && currentLifecycle === lifecycle;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const synced = await synchronize(controller.signal, current);
    if (!current()) throw new Error('The account changed. Try again.');
    if (readProgress().updatedAt === synced) return;
  }
  throw new Error('Progress is still changing. Please try signing out again.');
}

/** Joins device progress with the account after sign-in, preserving both learning histories. */
export async function adoptAccountProgress(now = new Date()): Promise<boolean> {
  const resume = pauseProgressSync();
  const generation = progressGeneration();
  const currentLifecycle = lifecycle;
  try {
    const saved = await loadServerCopy();
    if (generation !== progressGeneration() || currentLifecycle !== lifecycle) {
      throw new Error('The account changed. Try again.');
    }
    const local = readProgress();
    const merged = saved
      ? mergeProgress(local, saved.progress, now)
      : { ...local, updatedAt: now.toISOString() };
    replaceProgress({ ...merged, profile: { ...(merged.profile ?? ADULT_PROFILE), adult: true } });
    return merged.profile !== null;
  } finally {
    resume();
  }
}

/** Restores a lost device copy only while the original account and request are still active. */
export async function restoreProgress(signal?: AbortSignal): Promise<void> {
  const generation = progressGeneration();
  const currentLifecycle = lifecycle;
  const saved = await loadServerCopy(signal, true);
  if (
    !saved ||
    signal?.aborted ||
    generation !== progressGeneration() ||
    currentLifecycle !== lifecycle
  ) {
    return;
  }
  // A learner may have started setup while the request was pending. Keep that local work.
  if (readProgress().updatedAt === null) replaceProgress(saved.progress);
}

/** Serializes saves and cancels pending work when the effect ends or the account changes. */
export function startProgressSync(): () => void {
  activeSync?.stop();
  const generation = progressGeneration();
  let stopped = false;
  let controller = new AbortController();
  let sessionStarted = false;
  let lastSynced: string | null | undefined;
  let running: Promise<void> | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const available = () => !stopped && pauseDepth === 0 && generation === progressGeneration();
  const unsaved = () =>
    readProgress().profile?.adult === true && readProgress().updatedAt !== lastSynced;

  const run = (): Promise<void> => {
    if (running) return running;
    if (!available()) return Promise.resolve();
    const signal = controller.signal;
    const currentLifecycle = lifecycle;
    const current = () => available() && !signal.aborted && lifecycle === currentLifecycle;
    running = (async () => {
      if (!sessionStarted) {
        const response = await fetch('/api/session', { method: 'POST', signal });
        if (!current()) return;
        if (!response.ok) throw new Error(`Starting session failed with ${response.status}`);
        sessionStarted = true;
      }
      const synced = await synchronize(signal, current);
      if (current()) lastSynced = synced;
    })().finally(() => {
      running = undefined;
    });
    return running;
  };

  const schedule = () => {
    if (!available() || !unsaved()) return;
    clearTimeout(timer);
    timer = setTimeout(() => run().then(scheduleIfChanged).catch(report), SAVE_DELAY_MS);
  };
  const scheduleIfChanged = () => {
    if (unsaved()) schedule();
  };

  const session: SyncSession = {
    async flush() {
      clearTimeout(timer);
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
        await run();
        if (!available()) throw new Error('The account changed. Try again.');
        if (!unsaved()) return;
      }
      throw new Error('Progress is still changing. Please try signing out again.');
    },
    pause() {
      controller.abort();
      clearTimeout(timer);
    },
    resume() {
      if (stopped) return;
      controller = new AbortController();
      sessionStarted = false;
      lastSynced = undefined;
      // Wait for a cancelled request to settle before starting the next account's requests.
      void (running ?? Promise.resolve())
        .catch(() => undefined)
        .then(() => {
          if (available()) void run().then(scheduleIfChanged).catch(report);
        });
    },
    stop() {
      if (stopped) return;
      stopped = true;
      lifecycle += 1;
      controller.abort();
      clearTimeout(timer);
      unsubscribe();
      globalThis.removeEventListener('online', onOnline);
      if (activeSync === session) activeSync = undefined;
    },
  };

  const unsubscribe = subscribeToProgress(() => {
    // Changes during a request are saved by its completion handler, never in parallel.
    if (!running) schedule();
  });
  const onOnline = () => {
    if (available()) void run().then(scheduleIfChanged).catch(report);
  };
  globalThis.addEventListener('online', onOnline);
  activeSync = session;
  void run().then(scheduleIfChanged).catch(report);
  return session.stop;
}
