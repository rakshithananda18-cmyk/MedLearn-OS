'use client';

import { useEffect, useState } from 'react';

import { loadStatuses, reviewState } from './state';

/**
 * Whether a topic counts as checked: bundled as reviewed, or approved by the review team for the
 * version shown, which the page learns from the server after it loads.
 */
export function useReviewed(topic: Readonly<{ slug: string; version: string; reviewed: boolean }>) {
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    let live = true;
    void loadStatuses().then((statuses) => {
      if (live) setApproved(reviewState(topic.version, statuses.get(topic.slug)) === 'approved');
    });
    return () => {
      live = false;
    };
  }, [topic.slug, topic.version]);
  return topic.reviewed || approved;
}
