'use client';

import { useEffect } from 'react';

import { useProgress } from '@/features/progress/store';
import { clientLogger } from '@/lib/client-logger';

import { restoreProgress, startProgressSync } from './sync';

// Supabase keeps the session in cookies named sb-<project>-auth-token.
const hasSession = () => document.cookie.includes('-auth-token');

/**
 * Syncs progress with the server while the learner is a confirmed adult, and restores it on a
 * phone that has a session but no local progress. Renders nothing.
 */
export function ProgressSync() {
  const progress = useProgress();
  const adult = progress.profile?.adult === true;
  const fresh = progress.updatedAt === null;

  useEffect(() => {
    if (adult) return startProgressSync();
    if (fresh && hasSession()) {
      const controller = new AbortController();
      restoreProgress(controller.signal).catch((error: unknown) =>
        error instanceof Error && error.name === 'AbortError'
          ? undefined
          : clientLogger.warn('Restoring progress failed', {
              message: error instanceof Error ? error.message : String(error),
            }),
      );
      return () => controller.abort();
    }
    return undefined;
  }, [adult, fresh]);
  return null;
}
