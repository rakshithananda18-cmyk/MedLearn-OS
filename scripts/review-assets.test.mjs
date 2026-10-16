import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { reviewAssets } from './review-assets.mjs';

describe('review asset manifest', () => {
  it('matches the bytes of every shipped model, poster and X-ray', () => {
    const committed = JSON.parse(
      readFileSync(new URL('../apps/web/src/content/review-assets.json', import.meta.url), 'utf8'),
    );
    expect(reviewAssets()).toEqual(committed);
  });
});
