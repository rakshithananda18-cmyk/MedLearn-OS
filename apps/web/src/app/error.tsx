'use client';

import { ErrorState } from '@medlearn/ui';
import { useEffect } from 'react';

import { clientLogger } from '@/lib/client-logger';

export default function RouteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    clientLogger.error('Route failed to render', { digest: error.digest, message: error.message });
  }, [error]);

  return (
    <main>
      <ErrorState
        title="This page could not load"
        description="Your progress is safe. Check your connection and try again."
        reference={error.digest}
        onRetry={retry}
      />
    </main>
  );
}
