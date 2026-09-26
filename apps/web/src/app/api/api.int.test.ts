import { apiDataBody, ApiErrorBody, Subject } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import { REQUEST_ID_HEADER } from '@/server/request-id';

import { GET as health } from './health/route';
import { POST as log } from './log/route';
import { GET as subjects } from './subjects/route';

// Route handlers called directly against the local Supabase stack (`pnpm bootstrap`).
const url = (path: string) => `http://localhost${path}`;

describe('GET /api/health', () => {
  it('reports ok when the database answers', async () => {
    const response = await health(new Request(url('/api/health')));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ data: { status: 'ok' } });
    expect(response.headers.get(REQUEST_ID_HEADER)).toBeTruthy();
  });
});

describe('GET /api/subjects', () => {
  it('returns seeded subjects in the standard data shape', async () => {
    const response = await subjects(new Request(url('/api/subjects')));
    const body = apiDataBody(Subject.array()).parse(await response.json());
    expect(response.status).toBe(200);
    expect(body.data.map((subject) => subject.slug)).toEqual([
      'anatomy',
      'physiology',
      'biochemistry',
    ]);
  });
});

describe('POST /api/log', () => {
  const post = (body: unknown, headers: Record<string, string> = {}) =>
    log(
      new Request(url('/api/log'), {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body: typeof body === 'string' ? body : JSON.stringify(body),
      }),
    );

  it('accepts a valid batch', async () => {
    const response = await post({
      entries: [{ level: 'error', message: 'Lesson failed', time: new Date().toISOString() }],
    });
    expect(response.status).toBe(204);
  });

  it('rejects an invalid batch with VALIDATION_FAILED', async () => {
    const response = await post({ entries: [] });
    expect(response.status).toBe(400);
    expect(ApiErrorBody.parse(await response.json()).error.code).toBe('VALIDATION_FAILED');
  });

  it('rejects oversized batches before parsing', async () => {
    const response = await post('{}', { 'content-length': '100000' });
    expect(response.status).toBe(400);
  });
});
