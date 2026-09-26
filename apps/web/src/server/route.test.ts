import { AppError } from '@medlearn/core';
import { createLogger } from '@medlearn/logger/server';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { REQUEST_ID_HEADER } from './request-id';
import { createRouteWrapper, noContent, ok, parseJson } from './route';

function setup() {
  const lines: Record<string, unknown>[] = [];
  const logger = createLogger({
    service: 'test',
    level: 'debug',
    destination: { write: (line: string) => void lines.push(JSON.parse(line)) },
  });
  return { lines, withRoute: createRouteWrapper(logger) };
}

const request = (init?: RequestInit) => new Request('http://localhost/api/test', init);

describe('withRoute', () => {
  it('returns the handler response with a request id and logs completion', async () => {
    const { lines, withRoute } = setup();
    const handler = withRoute('GET /api/test', async () => ok({ value: 1 }));

    const response = await handler(request());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ data: { value: 1 } });
    const requestId = response.headers.get(REQUEST_ID_HEADER);
    expect(requestId).toBeTruthy();
    expect(lines.at(-1)).toMatchObject({
      msg: 'request completed',
      route: 'GET /api/test',
      requestId,
      status: 200,
    });
  });

  it('reuses a well-formed incoming request id', async () => {
    const { withRoute } = setup();
    const handler = withRoute('GET /api/test', async (_request, { requestId }) => ok(requestId));
    const response = await handler(request({ headers: { [REQUEST_ID_HEADER]: 'req-12345678' } }));
    expect(await response.json()).toEqual({ data: 'req-12345678' });
  });

  it('maps a thrown AppError to its status and body, logged as a warning', async () => {
    const { lines, withRoute } = setup();
    const handler = withRoute('GET /api/test', async () => {
      throw new AppError('NOT_FOUND', 'Topic not found');
    });

    const response = await handler(request());
    const requestId = response.headers.get(REQUEST_ID_HEADER);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: { code: 'NOT_FOUND', message: 'Topic not found', requestId },
    });
    expect(lines.find((line) => line.level === 'warn')).toMatchObject({ code: 'NOT_FOUND' });
  });

  it('hides unexpected errors behind a generic 500 and logs them as errors', async () => {
    const { lines, withRoute } = setup();
    const handler = withRoute('GET /api/test', async () => {
      throw new Error('password=hunter2 leaked in message');
    });

    const response = await handler(request());
    const body = (await response.json()) as { error: { code: string; message: string } };

    expect(response.status).toBe(500);
    expect(body.error.code).toBe('INTERNAL');
    expect(body.error.message).not.toContain('hunter2');
    expect(lines.find((line) => line.level === 'error')).toMatchObject({ code: 'INTERNAL' });
  });

  it('passes resolved route params to the handler', async () => {
    const { withRoute } = setup();
    const handler = withRoute<{ slug: string }>('GET /api/topics/[slug]', async (_r, _c, params) =>
      ok(params.slug),
    );
    const response = await handler(request(), { params: Promise.resolve({ slug: 'jaundice' }) });
    expect(await response.json()).toEqual({ data: 'jaundice' });
  });
});

describe('response helpers', () => {
  it('noContent returns 204 with an empty body', async () => {
    const response = noContent();
    expect(response.status).toBe(204);
    expect(await response.text()).toBe('');
  });
});

describe('parseJson', () => {
  const Body = z.object({ name: z.string().min(1) });
  const post = (body: string) => request({ method: 'POST', body });

  it('returns validated data', async () => {
    await expect(parseJson(post('{"name":"Anatomy"}'), Body)).resolves.toEqual({ name: 'Anatomy' });
  });

  it('rejects malformed JSON', async () => {
    await expect(parseJson(post('{oops'), Body)).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
      message: 'Request body must be valid JSON',
    });
  });

  it('rejects invalid shapes with field paths', async () => {
    await expect(parseJson(post('{"name":""}'), Body)).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
      details: { issues: [{ path: 'name' }] },
    });
  });
});
