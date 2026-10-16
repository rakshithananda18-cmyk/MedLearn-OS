import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { useSearchResults } from './useSearchResults';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it.each(['fetch', 'body'])('ends a hung search %s with a retryable error', async (hung) => {
  vi.useFakeTimers();
  const pending = new Promise<Response>(() => {});
  const fetcher = vi
    .fn()
    .mockImplementationOnce(() =>
      hung === 'fetch'
        ? pending
        : Promise.resolve({
            ok: true,
            json: () => new Promise(() => {}),
          }),
    )
    .mockResolvedValue(Response.json({ data: { results: [] } }));
  vi.stubGlobal('fetch', fetcher);
  const { result } = renderHook(() => useSearchResults('axilla', true, 100));
  await act(async () => vi.advanceTimersByTimeAsync(10_100));
  expect(result.current.error).toBe(true);
  expect(result.current.loading).toBe(false);
  act(() => result.current.retry());
  await act(async () => vi.advanceTimersByTimeAsync(100));
  expect(result.current.error).toBe(false);
  expect(result.current.results).toEqual([]);
  await act(async () => vi.advanceTimersByTimeAsync(10_000));
  expect(result.current.error).toBe(false);
});
