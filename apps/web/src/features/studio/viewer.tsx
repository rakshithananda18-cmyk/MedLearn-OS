'use client';

import { Skeleton } from '@medlearn/ui';
import { supports3D } from '@medlearn/visuals';
import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

// three.js loads only here, and only on devices that can show 3D.
export const Viewer3D = dynamic(() => import('@medlearn/visuals/viewer3d'), {
  ssr: false,
  loading: () => <Skeleton className="aspect-square w-full" />,
});

const noSubscription = () => () => {};
// Checked once: each check opens a WebGL context, and browsers allow only a few.
let capability: boolean | undefined;
const canShow3D = () => (capability ??= supports3D());
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotion(listener: () => void) {
  const query = matchMedia(REDUCED_MOTION);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}

/** Whether this device can show 3D: null until known (during the server render). */
export function useCan3D(): boolean | null {
  return useSyncExternalStore(noSubscription, canShow3D, () => null);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotion,
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}
