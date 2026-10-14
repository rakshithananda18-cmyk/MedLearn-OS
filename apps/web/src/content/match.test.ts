import { describe, expect, it } from 'vitest';

import { bestMatches, nameScore, searchTerms } from './match';

const score = (query: string, name: string) => nameScore(searchTerms(query), name);

describe('matching names as students type them', () => {
  it('takes whole words, the start of a word, and any case or accent', () => {
    expect(score('popliteal', 'Popliteal artery')).toBe(3);
    expect(score('poplit', 'Popliteal artery')).toBe(2);
    expect(score('haemoglobin', 'Haémoglobin')).toBe(3);
  });

  it('forgives one letter wrong, missing, extra or swapped in a longer word', () => {
    for (const typo of ['poplitael', 'poplital', 'popliteall', 'popliteel']) {
      expect(score(typo, 'Popliteal artery'), typo).toBeGreaterThan(0);
    }
    // Two mistakes, or a short word, are not a match.
    expect(score('poplitaol', 'Popliteal artery')).toBe(0);
    expect(score('rta', 'Popliteal artery')).toBe(0);
  });

  it('needs every word, and lists the best first', () => {
    expect(score('popliteal vein', 'Popliteal artery')).toBe(0);
    const names = ['Popliteal artery', 'Femoral artery', 'Popliteal vein'];
    expect(bestMatches(names, (name) => name, 'popliteal ve', 5)).toEqual(['Popliteal vein']);
    expect(bestMatches(names, (name) => name, 'artery', 1)).toHaveLength(1);
    expect(bestMatches(names, (name) => name, '', 5)).toEqual([]);
  });
});
