'use client';

import { useEffect, useState } from 'react';

import { loadStatuses, reviewState, STATUS_TTL_MS, subscribeStatuses } from './state';

/**
 * A current team approval must match both the displayed content snapshot and deployed evidence.
 * Revalidate while the screen stays open and whenever a student returns to it.
 */
export function useReviewed(
  topic: Readonly<{ slug: string; version: string; contentDigest?: string }>,
) {
  const key = `${topic.slug}:${topic.version}:${topic.contentDigest ?? ''}`;
  const [status, setStatus] = useState({ key: '', approved: false });
  useEffect(() => {
    let live = true;
    const update = (statuses: Awaited<ReturnType<typeof loadStatuses>>) => {
      if (live)
        setStatus({
          key,
          approved:
            Boolean(topic.contentDigest) &&
            reviewState(topic.version, statuses.get(topic.slug), topic.contentDigest) ===
              'approved' &&
            statuses.get(topic.slug)?.currentContent === true,
        });
    };
    const refresh = () => {
      void loadStatuses(true).then(update);
    };
    const visible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const unsubscribe = subscribeStatuses(update);
    refresh();
    const timer = setInterval(refresh, STATUS_TTL_MS);
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    document.addEventListener('visibilitychange', visible);
    return () => {
      live = false;
      unsubscribe();
      clearInterval(timer);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
      document.removeEventListener('visibilitychange', visible);
    };
  }, [key, topic.slug, topic.version, topic.contentDigest]);
  // A bundled flag cannot override a revoked decision or an unavailable review service.
  return status.key === key && status.approved;
}
