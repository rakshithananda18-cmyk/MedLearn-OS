import {
  DEFAULT_DAILY_MINUTES,
  type LearnerProgress,
  mergeProgress,
  type StudyProfile,
} from '@medlearn/core';

import { readProgress, replaceProgress, subscribeToProgress } from '@/features/progress/store';
import { clientLogger } from '@/lib/client-logger';

/** Which copy wins: the newer one. A device that has changed nothing yet takes the server's. */
export function newerCopy(
  local: LearnerProgress,
  server: LearnerProgress | null,
): 'local' | 'server' | 'same' {
  if (!server) return local.updatedAt ? 'local' : 'same';
  if (!local.updatedAt) return 'server';
  const localTime = Date.parse(local.updatedAt);
  const serverTime = Date.parse(server.updatedAt ?? '');
  if (serverTime > localTime) return 'server';
  return localTime > serverTime ? 'local' : 'same';
}

const SAVE_DELAY_MS = 1000;

/** The server's copy, validated; null when there is none or no session. */
async function loadServerCopy(): Promise<LearnerProgress | null> {
  const response = await fetch('/api/progress');
  if (response.status === 401) return null;
  if (!response.ok) throw new Error(`Loading progress failed with ${response.status}`);
  const body = (await response.json()) as { data: { progress: unknown } | null };
  if (!body.data) return null;
  // Loaded only when a server copy arrives, so the schema library is not in every page's download.
  const { LearnerProgressInput } = await import('@medlearn/schemas');
  const parsed = LearnerProgressInput.safeParse(body.data.progress);
  return parsed.success ? (parsed.data as LearnerProgress) : null;
}

const ADULT_PROFILE: StudyProfile = {
  year: 1,
  examDate: null,
  dailyMinutes: DEFAULT_DAILY_MINUTES,
  adult: true,
};

/**
 * After signing in or creating an account: joins this phone's progress with the account's so
 * nothing learned on either side is lost. Only adults hold accounts, so the profile says so.
 * Returns whether the student already had a study plan (answered the setup questions).
 */
export async function adoptAccountProgress(now = new Date()): Promise<boolean> {
  const server = await loadServerCopy();
  const local = readProgress();
  const merged = server
    ? mergeProgress(local, server, now)
    : { ...local, updatedAt: now.toISOString() };
  replaceProgress({ ...merged, profile: { ...(merged.profile ?? ADULT_PROFILE), adult: true } });
  return merged.profile !== null;
}

/**
 * A phone that lost its local copy but still has a session (cookies survive clearing site
 * storage less often than people expect) gets its progress back. Only adults ever have a session.
 */
export async function restoreProgress(): Promise<void> {
  const server = await loadServerCopy();
  if (server && newerCopy(readProgress(), server) === 'server') replaceProgress(server);
}

/**
 * Keeps this device and the server in step for an adult learner: starts an anonymous session,
 * takes the newer copy, then saves every change a second after it happens. The phone stays the
 * source of truth offline; a failed save is retried with the next change or when the phone is back
 * online. Returns a stop function.
 */
export function startProgressSync(): () => void {
  let lastSynced: string | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const push = async (): Promise<void> => {
    const progress = readProgress();
    const response = await fetch('/api/progress', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ progress }),
    });
    if (response.status === 409) return pull();
    if (!response.ok) throw new Error(`Saving progress failed with ${response.status}`);
    lastSynced = progress.updatedAt;
  };

  const pull = async (): Promise<void> => {
    const server = await loadServerCopy();
    const winner = newerCopy(readProgress(), server);
    if (winner === 'server' && server) {
      lastSynced = server.updatedAt;
      replaceProgress(server);
    } else if (winner === 'local') {
      await push();
    }
  };

  const report = (error: unknown) =>
    clientLogger.warn('Progress sync failed; will retry with the next change', {
      message: error instanceof Error ? error.message : String(error),
    });

  // After sign-out the phone is cleared; that empty copy is never sent anywhere.
  const unsaved = () => {
    const progress = readProgress();
    return progress.profile?.adult === true && progress.updatedAt !== lastSynced;
  };

  fetch('/api/session', { method: 'POST' }).then(pull).catch(report);

  const unsubscribe = subscribeToProgress(() => {
    if (!unsaved()) return;
    clearTimeout(timer);
    timer = setTimeout(() => push().catch(report), SAVE_DELAY_MS);
  });

  const onOnline = () => {
    if (unsaved()) push().catch(report);
  };
  globalThis.addEventListener('online', onOnline);

  return () => {
    clearTimeout(timer);
    unsubscribe();
    globalThis.removeEventListener('online', onOnline);
  };
}
