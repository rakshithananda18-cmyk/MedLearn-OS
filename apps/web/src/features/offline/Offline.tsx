'use client';

import { Banner } from '@medlearn/ui';
import { useEffect } from 'react';

import { clientLogger } from '@/lib/client-logger';

import { useOnline } from './useOnline';

/** Says plainly what still works while the phone has no network. */
export function OfflineBanner() {
  if (useOnline()) return null;
  return (
    <Banner tone="info" title="You are offline">
      Pages you have opened still work, and everything you do is kept on this phone.
    </Banner>
  );
}

/** Installs the service worker that keeps opened pages available offline. Renders nothing. */
export function ServiceWorker() {
  useEffect(() => {
    // In development a cached page would hide code changes.
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch((error: unknown) =>
      clientLogger.warn('Service worker registration failed', {
        message: error instanceof Error ? error.message : String(error),
      }),
    );
  }, []);
  return null;
}
