'use client';

import { useEffect, useState } from 'react';

import type { SearchResult } from '@/content/search';

const KINDS = new Set(['Topic', 'Structure', 'Key fact', 'Lesson', 'Question', 'Recall card']);

function isResult(value: unknown): value is SearchResult {
  if (!value || typeof value !== 'object') return false;
  const result = value as Record<string, unknown>;
  return (
    typeof result.kind === 'string' &&
    KINDS.has(result.kind) &&
    ['topicSlug', 'topicTitle', 'excerpt', 'href'].every((key) => typeof result[key] === 'string')
  );
}

/** HTTP failures and invalid responses are failures, never an empty search. */
async function search(query: string, signal: AbortSignal): Promise<SearchResult[]> {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
  if (!response.ok) throw new Error('Search unavailable');
  const body: unknown = await response.json();
  const results = (body as { data?: { results?: unknown } } | null)?.data?.results;
  if (!Array.isArray(results) || !results.every(isResult))
    throw new Error('Invalid search response');
  return results;
}

/** Shared cancellable search for the live box and the whole-body topic links. */
export function useSearchResults(query: string, enabled = true, delay = 0) {
  const [attempt, setAttempt] = useState(0);
  const [settled, setSettled] = useState<{
    query: string;
    attempt: number;
    results: SearchResult[] | null;
  } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      search(query, controller.signal)
        .then((results) => {
          if (!controller.signal.aborted) setSettled({ query, attempt, results });
        })
        .catch(() => {
          if (!controller.signal.aborted) setSettled({ query, attempt, results: null });
        });
    }, delay);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, attempt, enabled, delay]);
  const current =
    enabled && settled?.query === query && settled.attempt === attempt ? settled : null;
  return {
    results: current?.results ?? null,
    error: current !== null && current.results === null,
    loading: enabled && current === null,
    retry: () => setAttempt((value) => value + 1),
  };
}

export const SEARCH_UNAVAILABLE = 'Search is unavailable. Check your connection and try again.';
