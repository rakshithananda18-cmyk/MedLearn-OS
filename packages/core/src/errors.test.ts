import { describe, expect, it } from 'vitest';

import { AppError, isAppError, toAppError } from './errors';

describe('AppError', () => {
  it('maps each code to its HTTP status', () => {
    expect(new AppError('VALIDATION_FAILED', 'x').status).toBe(400);
    expect(new AppError('NOT_FOUND', 'x').status).toBe(404);
    expect(new AppError('RATE_LIMITED', 'x').status).toBe(429);
    expect(new AppError('INTERNAL', 'x').status).toBe(500);
  });

  it('exposes client-safe messages for 4xx errors', () => {
    const body = new AppError('NOT_FOUND', 'Topic not found').toBody('req-1');
    expect(body).toEqual({
      error: { code: 'NOT_FOUND', message: 'Topic not found', requestId: 'req-1' },
    });
  });

  it('hides internal messages for 5xx errors', () => {
    const body = new AppError('INTERNAL', 'connection refused on 10.0.0.4').toBody();
    expect(body.error.message).not.toContain('10.0.0.4');
    expect(body.error).not.toHaveProperty('requestId');
  });

  it('keeps cause and details for logging', () => {
    const cause = new Error('db down');
    const error = new AppError('INTERNAL', 'Query failed', {
      cause,
      details: { table: 'subjects' },
    });
    expect(error.cause).toBe(cause);
    expect(error.details).toEqual({ table: 'subjects' });
  });
});

describe('toAppError', () => {
  it('returns AppErrors unchanged', () => {
    const error = new AppError('FORBIDDEN', 'No access');
    expect(toAppError(error)).toBe(error);
  });

  it('wraps other errors as INTERNAL with the original as cause', () => {
    const original = new TypeError('boom');
    const wrapped = toAppError(original);
    expect(isAppError(wrapped)).toBe(true);
    expect(wrapped.code).toBe('INTERNAL');
    expect(wrapped.cause).toBe(original);
  });

  it('handles non-Error values', () => {
    expect(toAppError('text').message).toBe('Unknown error');
  });
});
