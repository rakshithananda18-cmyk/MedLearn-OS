import { describe, expect, it } from 'vitest';

import {
  ARTERIAL_PO2,
  curveShift,
  NORMAL_BLOOD,
  NORMAL_P50,
  oxygenUnloaded,
  p50,
  saturation,
  VENOUS_PO2,
} from './oxygen';

describe('oxygen–haemoglobin teaching model', () => {
  it('matches textbook values under normal conditions', () => {
    expect(p50(NORMAL_BLOOD)).toBeCloseTo(NORMAL_P50, 5);
    expect(saturation(NORMAL_P50, NORMAL_BLOOD)).toBeCloseTo(50, 5);
    expect(saturation(ARTERIAL_PO2, NORMAL_BLOOD)).toBeGreaterThan(97);
    expect(saturation(VENOUS_PO2, NORMAL_BLOOD)).toBeCloseTo(75, 0);
    expect(saturation(0, NORMAL_BLOOD)).toBe(0);
  });

  it('shifts right with acid, CO2, heat and 2,3-BPG, and left with their opposites', () => {
    expect(curveShift({ ...NORMAL_BLOOD, ph: 7.2 })).toBe('right');
    expect(curveShift({ ...NORMAL_BLOOD, pco2: 60 })).toBe('right');
    expect(curveShift({ ...NORMAL_BLOOD, temperature: 40 })).toBe('right');
    expect(curveShift({ ...NORMAL_BLOOD, bpg: 7 })).toBe('right');
    expect(curveShift({ ...NORMAL_BLOOD, ph: 7.6, temperature: 34, bpg: 2 })).toBe('left');
    expect(curveShift({ ...NORMAL_BLOOD, temperature: 37.1 })).toBe('none');
  });

  it('releases more oxygen to the tissues when the curve shifts right', () => {
    const exercising = { pco2: 55, ph: 7.3, temperature: 39, bpg: 5 };
    expect(oxygenUnloaded(exercising)).toBeGreaterThan(oxygenUnloaded(NORMAL_BLOOD));
    expect(p50({ ...NORMAL_BLOOD, bpg: 1.5 })).toBeLessThan(21);
  });

  it('rises monotonically with PO2', () => {
    const points = [10, 20, 40, 60, 80, 100].map((po2) => saturation(po2, NORMAL_BLOOD));
    expect(points).toEqual([...points].sort((a, b) => a - b));
  });
});
