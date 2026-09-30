'use client';

import { Skeleton } from '@medlearn/ui';
import { supports3D } from '@medlearn/visuals';
import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

import { mediaQuery } from '@/features/shell/media';

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

/**
 * Whether this device can draw the sharpest picture without strain: 4 GB of memory and 4 cores or
 * more (browsers that do not say are taken to have them).
 */
export function strongDevice(): boolean {
  const device = navigator as Navigator & { deviceMemory?: number };
  return (device.deviceMemory ?? 4) >= 4 && (navigator.hardwareConcurrency || 4) >= 4;
}

/** Pixels drawn per screen pixel for a quality: up to double where sharp, one to save battery. */
export function pixelRatio(quality: 'auto' | 'sharp' | 'saver'): number | [number, number] {
  if (quality === 'saver') return 1;
  if (quality === 'sharp') return [1, 2];
  return strongDevice() ? [1, 2] : [1, 1.5];
}

/** Tablets held sideways and laptops (the xl breakpoint): the side panels stay open. */
export { useWide as useDocked } from '@/features/shell/media';
