'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { STATUS_TTL_MS } from './state';

/** Refresh server-rendered queue/history after another tab makes a decision. */
export function ReviewRefresh() {
  const router = useRouter();
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') router.refresh();
    };
    const timer = setInterval(refresh, STATUS_TTL_MS);
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [router]);
  return null;
}
