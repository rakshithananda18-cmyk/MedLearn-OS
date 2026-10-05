import { describe, expect, it } from 'vitest';

import { plainName, toBodyParts3D } from './build-z-anatomy.mjs';

describe('Z-Anatomy names', () => {
  const names = new Set([
    'Median_nervel',
    'Median_nerver',
    'Central_canal',
    "Central_canal'",
    'Femoral_nervel',
    'Cross_Section_X',
  ]);

  it('reads a trailing l or r as the side when the other side is there, or after a whole word', () => {
    expect(plainName('Median_nervel', names)).toBe('Left median nerve');
    expect(plainName('Median_nerver', names)).toBe('Right median nerve');
    // "canal" ends in l, but there is no "canar": it is not a side.
    expect(plainName('Central_canal', names)).toBe('Central canal');
    // Drawn on one side only, but the letter follows a whole word.
    expect(plainName('Femoral_nervel', names)).toBe('Left femoral nerve');
  });

  it('joins a primed piece to its structure, and leaves out section planes', () => {
    expect(plainName("Central_canal'", names)).toBe('Central canal');
    expect(plainName('Cross_Section_X', names)).toBeNull();
  });
});

describe('the Z-Anatomy frame', () => {
  it('puts a structure where BodyParts3D has it (centimetres, Y up, to millimetres, Z up)', () => {
    // Z-Anatomy's left kidney centre lands on BodyParts3D's (62, -80, 1037) within a few mm.
    const [x, y, z] = toBodyParts3D([6.2, 111.2, -1.8]);
    expect(x).toBeCloseTo(62, 0);
    expect(Math.abs(y - -80)).toBeLessThan(5);
    expect(Math.abs(z - 1037)).toBeLessThan(5);
  });
});
