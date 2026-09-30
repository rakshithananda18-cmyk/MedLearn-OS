import type { Stroke } from '@medlearn/visuals/viewer3d';

// A student's drawings and best quiz streaks, kept on this phone only. Storage can be missing or
// full (private windows, blocked site data), so every read and write is allowed to fail quietly.
const DRAWINGS_KEY = 'ml-drawings-v1';
const BEST_KEY = 'ml-find-it-best-v1';
const SETTINGS_KEY = 'ml-studio-settings-v1';

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

export type Quality = 'auto' | 'sharp' | 'saver';

/** How the student likes the 3D view, on this phone. */
export interface StudioSettings {
  /** Names on the model: region counts on the body, the picked structure on a topic. */
  labels: boolean;
  /** Eased camera moves between views, or null to follow the device's reduced motion setting. */
  smooth: boolean | null;
  /**
   * How sharp the picture is: matched to the device (auto), as sharp as the screen allows, or
   * lighter to save battery.
   */
  quality: Quality;
  /** Guided tours read aloud as well as captioned. */
  narrate: boolean;
  /** The open topic as its flat labelled diagram instead of the 3D model. */
  flat: boolean;
}

export const DEFAULT_SETTINGS: StudioSettings = {
  labels: true,
  smooth: null,
  quality: 'auto',
  narrate: false,
  flat: false,
};

const QUALITIES = new Set<unknown>(['auto', 'sharp', 'saver']);

export function loadSettings(): StudioSettings {
  const saved = read<unknown>(SETTINGS_KEY);
  if (saved.sharp === false && saved.quality === undefined) saved.quality = 'saver';
  const pick = <K extends keyof StudioSettings>(key: K, valid: (value: unknown) => boolean) =>
    valid(saved[key]) ? (saved[key] as StudioSettings[K]) : DEFAULT_SETTINGS[key];
  const isBoolean = (value: unknown) => typeof value === 'boolean';
  return {
    labels: pick('labels', isBoolean),
    smooth: pick('smooth', (value) => value === null || isBoolean(value)),
    // Saved before there were three qualities, "not sharp" becomes the battery saver.
    quality: pick('quality', (value) => QUALITIES.has(value)),
    narrate: pick('narrate', isBoolean),
    flat: pick('flat', isBoolean),
  };
}

export function saveSettings(settings: StudioSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Not saved; the settings still apply until the page closes.
  }
}
