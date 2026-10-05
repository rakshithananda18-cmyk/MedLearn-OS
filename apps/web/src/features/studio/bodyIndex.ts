import type { Point3 } from '@medlearn/schemas';
import { useEffect, useState } from 'react';

/** Where a structure of the body sits: its middle and its radius, in BodyParts3D millimetres. */
export interface BodyIndexEntry {
  /** "skeleton/left-femur" */
  id: string;
  centre: Point3;
  radius: number;
}

// A new version in the address whenever the index is rebuilt, so phones fetch it again.
const INDEX_FILE = '/models/body-index.json?v=1';
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
