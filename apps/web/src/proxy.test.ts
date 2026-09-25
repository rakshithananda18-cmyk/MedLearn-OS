import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { proxy } from './proxy';
import { REQUEST_ID_HEADER } from './server/request-id';

describe('proxy', () => {
  it('adds a request id to the response and forwards it to the route', () => {
    const response = proxy(new NextRequest('http://localhost/today'));
    const requestId = response.headers.get(REQUEST_ID_HEADER);
    expect(requestId).toMatch(/^[0-9a-f-]{36}$/);
    expect(response.headers.get(`x-middleware-request-${REQUEST_ID_HEADER}`)).toBe(requestId);
  });

  it('keeps a well-formed incoming request id', () => {
    const request = new NextRequest('http://localhost/today', {
      headers: { [REQUEST_ID_HEADER]: 'edge-12345678' },
    });
    expect(proxy(request).headers.get(REQUEST_ID_HEADER)).toBe('edge-12345678');
  });
});
