import type { BodyRegion, Point3 } from '@medlearn/schemas';
import { useEffect, useState } from 'react';

import { bodyStructure } from '@/content/body';

/** Where a structure of the body sits: its middle and its radius, in BodyParts3D millimetres. */
export interface BodyIndexEntry {
  /** "skeleton/left-femur" */
  id: string;
  centre: Point3;
  radius: number;
}

// A new version in the address whenever the index is rebuilt, so phones fetch it again.
const INDEX_FILE = '/models/body-index.json?v=3';
let request: Promise<BodyIndexEntry[]> | null = null;

/** Every structure of the body, fetched once per page, the first time it is needed. */
export function loadBodyIndex(): Promise<BodyIndexEntry[]> {
  request ??= fetch(INDEX_FILE)
    .then(
      (response) =>
        response.json() as Promise<{ structures: Array<[string, number, number, number, number]> }>,
    )
    .then(({ structures }) =>
      structures.map(([id, x, y, z, radius]) => ({ id, centre: [x, y, z] as Point3, radius })),
    )
    .catch(() => {
      // Search still finds topics; the next search tries again.
      request = null;
      return [];
    });
  return request;
}

/** The body's structures while `active` (on the whole body), or null until they arrive. */
export function useBodyIndex(active: boolean): BodyIndexEntry[] | null {
  const [entries, setEntries] = useState<BodyIndexEntry[] | null>(null);
  useEffect(() => {
    if (!active) return;
    let live = true;
    void loadBodyIndex().then((list) => {
      if (live) setEntries(list);
    });
    return () => {
      live = false;
    };
  }, [active]);
  return entries;
}

// "Find it" asks for structures big enough to tap and named plainly ("Left femur", not "Insular
// part of right middle cerebral artery").
const QUIZ_MIN_RADIUS = 15;
const QUIZ_MAX_WORDS = 4;

// The arms hang out to the side: every arm bone lies at least 190 mm from the midline, every leg
// bone at most 165 mm.
const ARM_FROM_MIDLINE = 178;

/**
 * The region a structure belongs to: the upper limb when it lies out beside the body, otherwise
 * the nearest other region's marker, measured with left and right alike.
 */
export function regionOf(
  centre: Point3,
  regions: ReadonlyArray<{ id: BodyRegion; marker: Point3 }>,
): BodyRegion | undefined {
  const arm = Math.abs(centre[0]) >= ARM_FROM_MIDLINE;
  if (arm && regions.some((region) => region.id === 'upper-limb')) return 'upper-limb';
  let nearest: BodyRegion | undefined;
  let shortest = Infinity;
  for (const { id, marker } of regions) {
    if (id === 'upper-limb') continue;
    const distance = Math.hypot(
      Math.abs(centre[0]) - Math.abs(marker[0]),
      centre[1] - marker[1],
      centre[2] - marker[2],
    );
    if (distance < shortest) {
      nearest = id;
      shortest = distance;
    }
  }
  return nearest;
}

/** "Find it" on the whole body: the region's structures in the systems switched on. */
export function bodyQuizPool(
  index: BodyIndexEntry[],
  systems: ReadonlySet<string>,
  region: BodyRegion,
  regions: ReadonlyArray<{ id: BodyRegion; marker: Point3 }>,
): string[] {
  return index
    .filter(
      (entry) =>
        systems.has(entry.id.split('/')[0] ?? '') &&
        entry.radius >= QUIZ_MIN_RADIUS &&
        bodyStructure(entry.id).name.split(' ').length <= QUIZ_MAX_WORDS &&
        regionOf(entry.centre, regions) === region,
    )
    .map((entry) => entry.id);
}

/**
 * Where to turn the camera for several structures together: the middle of their centres, far
 * enough back to take them all in.
 */
export function focusOn(
  ids: string[],
  index: BodyIndexEntry[],
): { point: Point3; radius: number } | null {
  const found = index.filter((entry) => ids.includes(entry.id));
  if (found.length === 0) return null;
  const point = [0, 1, 2].map(
    (axis) => found.reduce((sum, entry) => sum + (entry.centre[axis] ?? 0), 0) / found.length,
  ) as Point3;
  const spread = Math.max(
    ...found.map((entry) =>
      Math.hypot(...entry.centre.map((value, axis) => value - (point[axis] ?? 0))),
    ),
  );
  return { point, radius: Math.max(60, spread) };
}
