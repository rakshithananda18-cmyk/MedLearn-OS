import type { Stroke } from '@medlearn/visuals/viewer3d';

// A student's drawings and best quiz streaks, kept on this phone only. Storage can be missing or
// full (private windows, blocked site data), so every read and write is allowed to fail quietly.
const DRAWINGS_KEY = 'ml-drawings-v1';
const BEST_KEY = 'ml-find-it-best-v1';

function read<T>(key: string): Record<string, T> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '{}');
    return value && typeof value === 'object' ? (value as Record<string, T>) : {};
  } catch {
    return {};
  }
}

function write<T>(key: string, id: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ ...read<T>(key), [id]: value }));
  } catch {
    // Not saved; the drawing still shows until the page closes.
  }
}

/** Drawings on one model (a topic, or the whole body). */
export function loadStrokes(modelKey: string): Stroke[] {
  const strokes = read<Stroke[]>(DRAWINGS_KEY)[modelKey];
  return Array.isArray(strokes) ? strokes : [];
}

export function saveStrokes(modelKey: string, strokes: Stroke[]) {
  write(DRAWINGS_KEY, modelKey, strokes);
}

/** Best "Find it" streak on one topic. */
export function loadBest(topicSlug: string): number {
  const best = read<number>(BEST_KEY)[topicSlug];
  return typeof best === 'number' ? best : 0;
}

export function saveBest(topicSlug: string, best: number) {
  write(BEST_KEY, topicSlug, best);
}
