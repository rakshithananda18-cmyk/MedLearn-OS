'use client';

import { Button, Text } from '@medlearn/ui';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { endFixtureMode, useFixtureMode } from '@/features/facilitator/mode';
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
  const pathname = usePathname();
  const fixtureMode = useFixtureMode();
  const [endError, setEndError] = useState(false);
  const progress = useProgress();
  const adult = progress.profile?.adult === true;
  const fresh = progress.updatedAt === null;

  useEffect(() => {
    if (pathname === '/facilitator' || fixtureMode) return undefined;
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
  }, [adult, fresh, pathname, fixtureMode]);
  return fixtureMode && pathname !== '/account' ? (
    <aside
      aria-label="Local test session"
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <Text size="sm" weight="semibold">
          Local test session · progress stays on this device
        </Text>
        {endError ? (
          <Text size="sm" role="alert">
            Could not clear all test data. Test mode stays on; check browser storage and try again.
          </Text>
        ) : null}
      </div>
      <Button variant="secondary" size="sm" onClick={() => setEndError(!endFixtureMode())}>
        End and discard test progress
      </Button>
    </aside>
  ) : null;
}
