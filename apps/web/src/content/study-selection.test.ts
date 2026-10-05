import { describe, expect, it } from 'vitest';

import { reviewLimit, studyTopic } from './study-selection';

describe('study session query parameters', () => {
  it('keeps an omitted topic global and resolves a known topic', () => {
    expect(studyTopic(undefined)).toBeUndefined();
    expect(studyTopic('oxygen-haemoglobin-curve')?.slug).toBe('oxygen-haemoglobin-curve');
  });

  it.each([
    'missing-topic',
    '',
    '../practice',
    ['brachial-plexus'],
    ['brachial-plexus', 'oxygen-haemoglobin-curve'],
  ])('rejects an invalid topic filter without widening to every topic: %s', (value) => {
    expect(studyTopic(value)).toBeNull();
  });

  it('accepts the planned card count', () => {
    expect(reviewLimit('1')).toBe(1);
    expect(reviewLimit('240')).toBe(240);
  });

  it.each([undefined, '', '0', '-1', '1.5', '01', '2cards', 'Infinity', '1000', ['2', '3']])(
    'ignores a malformed review limit: %s',
    (value) => {
      expect(reviewLimit(value)).toBeUndefined();
    },
  );
});
