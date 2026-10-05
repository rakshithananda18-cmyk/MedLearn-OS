import { describe, expect, it } from 'vitest';

import { BODY_REGIONS } from '@/content/body';

import { bodyQuizPool, regionOf } from './bodyIndex';

const entry = (id: string, centre: [number, number, number], radius = 100) => ({
  id,
  centre,
  radius,
});

describe('the body quiz pool', () => {
  it('places a structure in its region, either side alike', () => {
    expect(regionOf([180, -80, 1150], BODY_REGIONS)).toBe('upper-limb');
    expect(regionOf([-180, -80, 1150], BODY_REGIONS)).toBe('upper-limb');
    expect(regionOf([91, -81, 601], BODY_REGIONS)).toBe('lower-limb');
    expect(regionOf([28, -130, 1220], BODY_REGIONS)).toBe('thorax');
    // A hand hangs by the hip, but out beside the body: it is the upper limb's.
    expect(regionOf([249, -60, 669], BODY_REGIONS)).toBe('upper-limb');
    expect(regionOf([122, -50, -50], BODY_REGIONS)).toBe('lower-limb');
  });

  it('asks for the region’s structures of the systems switched on, tappable and plainly named', () => {
    const index = [
      entry('skeleton/left-humerus', [180, -80, 1150]),
      entry('muscles/left-biceps-brachii', [190, -110, 1100]),
      entry('skeleton/left-femur', [91, -81, 601]),
      entry('skeleton/left-trapezoid', [200, -90, 820], 8),
      entry('arteries/insular-part-of-left-middle-cerebral-artery', [180, -80, 1150]),
    ];
    const pool = bodyQuizPool(
      index,
      new Set(['skin', 'skeleton', 'arteries']),
      'upper-limb',
      BODY_REGIONS,
    );
    expect(pool).toEqual(['skeleton/left-humerus']);
  });
});
