import { describe, expect, it } from 'vitest';

import { greeting, partOfDay } from './greeting';

describe('greeting', () => {
  it('splits the day at 5, 12, 17 and 22 hours', () => {
    expect([4, 5, 11, 12, 16, 17, 21, 22].map(partOfDay)).toEqual([
      'night',
      'morning',
      'morning',
      'afternoon',
      'afternoon',
      'evening',
      'evening',
      'night',
    ]);
  });

  it('uses the first name, and none until there is one', () => {
    expect(greeting('evening', '  Asha Rao ')).toBe('Good evening, Asha');
    expect(greeting('morning', undefined)).toBe('Good morning');
    expect(greeting('night', '')).toBe('Still up');
  });
});
