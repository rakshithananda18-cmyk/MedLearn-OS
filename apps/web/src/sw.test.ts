import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

// The service worker is a plain script; its trimming rule is read out of it with a stand-in `self`.
const source = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
const toTrim = new Function('self', `${source}; return toTrim;`)({
  addEventListener: () => undefined,
}) as (urls: string[], added: string, max: number) => string[];

const at = (path: string) => `https://medlearn.test${path}`;

describe('service worker cache trimming', () => {
  it('drops an older version of a model once the new one is stored', () => {
    const urls = [at('/models/heart.glb?v=1'), at('/icons/a.png'), at('/models/heart.glb?v=2')];
    expect(toTrim(urls, at('/models/heart.glb?v=2'), 400)).toEqual([at('/models/heart.glb?v=1')]);
  });

  it('drops the oldest files beyond the cap, never the one just stored', () => {
    const urls = ['/a.js', '/b.js', '/c.js', '/d.js'].map((path) => at(`/_next/static${path}`));
    expect(toTrim(urls, urls[3] ?? '', 2)).toEqual(urls.slice(0, 2));
    expect(toTrim(urls, urls[3] ?? '', 10)).toEqual([]);
  });
});
