import { describe, expect, it } from 'vitest';

import { toSubject } from './subjects';

describe('toSubject', () => {
  const row = {
    id: '0b6f6c1e-3f7a-4d8e-9a55-2f1d8f0c9b11',
    slug: 'anatomy',
    name: 'Anatomy',
    sort_order: 1,
  };

  it('maps a database row to the domain shape', () => {
    expect(toSubject(row)).toEqual({
      id: row.id,
      slug: 'anatomy',
      name: 'Anatomy',
      sortOrder: 1,
    });
  });

  it('rejects rows that violate the schema', () => {
    expect(() => toSubject({ ...row, slug: 'Not A Slug' })).toThrow();
  });
});
