import { createHash } from 'node:crypto';

import type { Topic } from '@medlearn/schemas';

import { getBook } from '@/content/books';
import { movementsFor } from '@/content/joint-movements';
import assetDigests from '@/content/review-assets.json';
import { videosOf } from '@/content/videos';
import { filmsFor, XRAY_CREDIT } from '@/content/xrays';

/** Stable JSON independent of object insertion order; arrays retain their teaching order. */
export function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .filter(([, child]) => child !== undefined)
      .sort(([a], [b]) => a.localeCompare(b, 'en'))
      .map(([key, child]) => `${JSON.stringify(key)}:${canonical(child)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}

/** The exact teaching record and referenced visual files a decision covers. */
export function topicReviewDigest(
  topic: Topic,
  assets: Record<string, string> = assetDigests,
): string {
  const films = filmsFor(topic.slug);
  const model = topic.visual.kind === 'path' ? topic.visual.model3d?.src : null;
  const paths = [
    model,
    model ? `/posters/${topic.slug}.webp` : null,
    ...films.map((film) => `/xrays/${film.id}.webp`),
  ]
    .filter((path): path is string => Boolean(path))
    .map((path) => path.split('?')[0] ?? path);
  const evidence = {
    format: 1,
    topic,
    books: topic.readIn.map(({ bookId }) => getBook(bookId) ?? null),
    films,
    filmCredit: films.length ? XRAY_CREDIT : null,
    movements: movementsFor(topic.slug),
    lectures: videosOf(topic.slug),
    assets: Object.fromEntries(
      paths.map((path) => {
        const digest = assets[path];
        if (!digest) throw new Error(`Review asset is missing: ${path}`);
        return [path, digest];
      }),
    ),
  };
  return createHash('sha256').update(canonical(evidence)).digest('hex');
}
