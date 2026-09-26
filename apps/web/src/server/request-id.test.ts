import { describe, expect, it } from 'vitest';

import { resolveRequestId } from './request-id';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('resolveRequestId', () => {
  it('keeps a well-formed incoming id', () => {
    expect(resolveRequestId('abc-12345678')).toBe('abc-12345678');
  });

  it.each([null, undefined, '', 'short', 'has spaces in it', 'x'.repeat(65), 'drop;table'])(
    'replaces %j with a new UUID',
    (incoming) => {
      expect(resolveRequestId(incoming)).toMatch(UUID);
    },
  );
});
