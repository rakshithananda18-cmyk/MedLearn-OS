'use client';

import { Skeleton } from '@medlearn/ui';
import { supports3D } from '@medlearn/visuals';
import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

import { mediaQuery, useWide } from '@/features/shell/media';

// three.js loads only here, and only on devices that can show 3D.
export const Viewer3D = dynamic(() => import('@medlearn/visuals/viewer3d'), {
  ssr: false,
  loading: () => <Skeleton className="aspect-square w-full" />,
});

const noSubscription = () => () => {};
// Checked once: each check opens a WebGL context, and browsers allow only a few.
let capability: boolean | undefined;
const canShow3D = () => (capability ??= supports3D());

/** Whether this device can show 3D: null until known (during the server render). */
export function useCan3D(): boolean | null {
  return useSyncExternalStore(noSubscription, canShow3D, () => null);
}

export const useReducedMotion = mediaQuery('(prefers-reduced-motion: reduce)');

/** Tablets held sideways and laptops (the xl breakpoint): the side panels stay open. */
export const useDocked = useWide;
