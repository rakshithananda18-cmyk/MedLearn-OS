import { describe, expect, it } from 'vitest';

import { assetUrl } from './asset-url';
import { studioAssets, studioTopics } from './studio';
import { PLANNABLE_TOPICS } from './topics';

const base = 'https://medlearn.test';
const hashed = (src: string) =>
  expect(new URL(src, base).searchParams.get('h')).toMatch(/^[a-f0-9]{64}$/);

describe('content asset addresses', () => {
  it('changes the request URL when the bytes change without a manual version bump', () => {
    const src = '/models/heart.glb?v=1';
    const first = assetUrl(src, { '/models/heart.glb': 'a'.repeat(64) });
    const replacement = assetUrl(src, { '/models/heart.glb': 'b'.repeat(64) });
    expect(replacement).not.toBe(first);
    expect(new URL(replacement, base).searchParams.get('v')).toBe('1');
    expect(new URL(replacement, base).searchParams.get('h')).toBe('b'.repeat(64));
    expect(assetUrl(first, { '/models/heart.glb': 'b'.repeat(64) })).toBe(replacement);
  });

  it('versions every topic model and poster, whole-body system, index and radiograph', () => {
    for (const topic of PLANNABLE_TOPICS) if (topic.poster) hashed(topic.poster);
    for (const topic of studioTopics()) if (topic.model) hashed(topic.model.src);
    const assets = studioAssets();
    hashed(assets.body.src);
    hashed(assets.bodyIndexSrc);
    for (const system of assets.systems) if (system.src) hashed(system.src);
    for (const film of assets.films) hashed(film.src);
  });

  it('preserves external addresses and refuses an untracked local content file', () => {
    expect(assetUrl('https://example.test/model.glb')).toBe('https://example.test/model.glb');
    expect(assetUrl('//example.test/model.glb')).toBe('//example.test/model.glb');
    expect(() => assetUrl('/models/no-such-file.glb')).toThrow(/missing from the manifest/);
  });
});
