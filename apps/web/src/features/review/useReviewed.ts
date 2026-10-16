'use client';

import { useEffect, useState } from 'react';

import { loadStatuses, reviewState } from './state';

/**
 * Whether a topic counts as checked: bundled as reviewed, or approved by the review team for the
 * version shown. The page asks the server after it loads, and again when the student comes back
 * to it, so a decision made meanwhile shows without a reload.
 */
export function useReviewed(topic: Readonly<{ slug: string; version: string; reviewed: boolean }>) {
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    let live = true;
    const check = () =>
      void loadStatuses().then((statuses) => {
        if (live) setApproved(reviewState(topic.version, statuses.get(topic.slug)) === 'approved');
      });
    const onVisible = () => {
      if (document.visibilityState === 'visible') check();
    };
    check();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);
    return () => {
      live = false;
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
    };
  }, [topic.slug, topic.version]);
  return topic.reviewed || approved;
}
