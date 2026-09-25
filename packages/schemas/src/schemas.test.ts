import { describe, expect, it } from 'vitest';

import { apiDataBody, ApiErrorBody, ClientLogBatch, Subject } from './index';

const validEntry = {
  level: 'error',
  message: 'Lesson failed to load',
  time: '2026-09-25T10:00:00.000Z',
} as const;

describe('ClientLogBatch', () => {
  it('accepts a well-formed batch', () => {
    expect(ClientLogBatch.safeParse({ entries: [validEntry] }).success).toBe(true);
  });

  it('rejects an empty batch', () => {
    expect(ClientLogBatch.safeParse({ entries: [] }).success).toBe(false);
  });

  it('rejects more than 50 entries', () => {
    const entries = Array.from({ length: 51 }, () => validEntry);
    expect(ClientLogBatch.safeParse({ entries }).success).toBe(false);
  });

  it('rejects unknown levels and non-ISO times', () => {
    expect(ClientLogBatch.safeParse({ entries: [{ ...validEntry, level: 'fatal' }] }).success).toBe(
      false,
    );
    expect(
      ClientLogBatch.safeParse({ entries: [{ ...validEntry, time: 'yesterday' }] }).success,
    ).toBe(false);
  });
});

describe('Subject', () => {
  const subject = {
    id: '0b6f6c1e-3f7a-4d8e-9a55-2f1d8f0c9b11',
    slug: 'anatomy',
    name: 'Anatomy',
    sortOrder: 1,
  };

  it('accepts a valid subject', () => {
    expect(Subject.parse(subject)).toEqual(subject);
  });

  it('rejects slugs that are not lowercase kebab-case', () => {
    expect(Subject.safeParse({ ...subject, slug: 'Gross Anatomy' }).success).toBe(false);
  });
});

describe('API bodies', () => {
  it('describes error bodies', () => {
    const body = { error: { code: 'NOT_FOUND', message: 'Topic not found', requestId: 'r1' } };
    expect(ApiErrorBody.parse(body)).toEqual(body);
  });

  it('wraps data bodies', () => {
    const body = apiDataBody(Subject.array());
    expect(body.safeParse({ data: [] }).success).toBe(true);
    expect(body.safeParse({ items: [] }).success).toBe(false);
  });
});
