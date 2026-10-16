import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { practiceQuestions, recallDeck } from '@/content/topics';

import { useStudyContent } from './useStudyContent';

afterEach(() => vi.unstubAllGlobals());

describe('session content loading', () => {
  it('does not fetch teaching content already rendered for a topic', () => {
    const initial = practiceQuestions().slice(0, 4);
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    const { result } = renderHook(() =>
      useStudyContent(
        'practice',
        initial.map((item) => item.question.id),
        initial,
      ),
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.items.size).toBe(4);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('loads only selected IDs, and retries an unavailable session without finishing it', async () => {
    const initial = practiceQuestions().slice(0, 2);
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ error: {} }, { status: 503 }))
      .mockResolvedValueOnce(Response.json({ data: { items: initial } }));
    vi.stubGlobal('fetch', fetcher);
    const ids = initial.map((item) => item.question.id);
    const { result } = renderHook(() => useStudyContent('practice', ids, []));
    await waitFor(() => expect(result.current.error).toBe(true));
    expect(result.current.items.size).toBe(0);
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.items.size).toBe(2));
    expect(result.current.error).toBe(false);
    expect(
      new URL(fetcher.mock.calls[1]?.[0] as string, 'http://localhost').searchParams.getAll('id'),
    ).toEqual([...ids].sort((a, b) => a.localeCompare(b)));
  });
  it('rejects a partial successful response instead of skipping missing questions', async () => {
    const initial = practiceQuestions().slice(0, 2);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(Response.json({ data: { items: initial.slice(0, 1) } })),
    );
    const { result } = renderHook(() =>
      useStudyContent(
        'practice',
        initial.map((item) => item.question.id),
        [],
      ),
    );
    await waitFor(() => expect(result.current.error).toBe(true));
    expect(result.current.items.size).toBe(0);
  });
  it('loads recall in batches rather than making a request after each rating', async () => {
    const deck = recallDeck().slice(0, 22);
    const fetcher = vi.fn((url: string) => {
      const ids = new Set(new URL(url, 'http://localhost').searchParams.getAll('id'));
      return Promise.resolve(
        Response.json({ data: { items: deck.filter((item) => ids.has(item.id)) } }),
      );
    });
    vi.stubGlobal('fetch', fetcher);
    const { result, rerender } = renderHook(({ ids }) => useStudyContent('recall', ids, []), {
      initialProps: { ids: deck.slice(0, 20).map((item) => item.id) },
    });
    await waitFor(() => expect(result.current.items.size).toBe(20));
    rerender({ ids: deck.slice(1, 21).map((item) => item.id) });
    expect(result.current.loading).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(1);
    rerender({ ids: deck.slice(20).map((item) => item.id) });
    await waitFor(() => expect(result.current.items.size).toBe(22));
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
