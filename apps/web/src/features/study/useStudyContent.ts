'use client';

import { useEffect, useMemo, useState } from 'react';

import type { DeckCard, PracticeQuestion } from '@/content/topics';

interface Content {
  practice: PracticeQuestion;
  recall: DeckCard;
}
type Kind = keyof Content;

function itemId(kind: Kind, item: unknown): string | null {
  if (!item || typeof item !== 'object') return null;
  const value = item as {
    id?: unknown;
    front?: unknown;
    back?: unknown;
    question?: { id?: unknown; prompt?: unknown; options?: unknown };
    topic?: { slug?: unknown };
  };
  if (typeof value.topic?.slug !== 'string') return null;
  if (kind === 'practice') {
    return typeof value.question?.id === 'string' &&
      typeof value.question.prompt === 'string' &&
      Array.isArray(value.question.options)
      ? value.question.id
      : null;
  }
  return typeof value.id === 'string' &&
    typeof value.front === 'string' &&
    typeof value.back === 'string'
    ? value.id
    : null;
}

async function load<K extends Kind>(
  kind: K,
  ids: string[],
  signal: AbortSignal,
): Promise<Content[K][]> {
  const query = new URLSearchParams({ kind });
  // Canonical order lets an opened session be found again in the offline content cache.
  [...ids].sort((a, b) => a.localeCompare(b)).forEach((id) => query.append('id', id));
  const response = await fetch(`/api/study-content?${query}`, { signal });
  if (!response.ok) throw new Error('Session unavailable');
  const body: unknown = await response.json();
  const items = (body as { data?: { items?: unknown } } | null)?.data?.items;
  if (!Array.isArray(items) || items.length !== ids.length) throw new Error('Incomplete session');
  const returned = items.map((item) => itemId(kind, item));
  if (
    new Set(returned).size !== ids.length ||
    returned.some((id) => id === null || !ids.includes(id))
  )
    throw new Error('Invalid session');
  return items as Content[K][];
}

/** Keep loaded content for the visit; load at most one session rather than every answer. */
export function useStudyContent<K extends Kind>(kind: K, ids: string[], initial: Content[K][]) {
  const serialized = JSON.stringify(ids);
  const wanted = useMemo(() => JSON.parse(serialized) as string[], [serialized]);
  const [items, setItems] = useState(
    () => new Map(initial.map((item) => [itemId(kind, item) ?? '', item])),
  );
  const [attempt, setAttempt] = useState(0);
  const [failure, setFailure] = useState<string | null>(null);
  const key = `${kind}:${serialized}:${attempt}`;
  const needed =
    kind === 'recall' ? !!wanted[0] && !items.has(wanted[0]) : wanted.some((id) => !items.has(id));
  useEffect(() => {
    if (!needed) return;
    const missing = [...new Set(wanted)].filter((id) => !items.has(id)).slice(0, 20);
    const controller = new AbortController();
    const deadline = setTimeout(() => {
      controller.abort();
      setFailure(key);
    }, 10_000);
    load(kind, missing, controller.signal)
      .then((loaded) => {
        if (controller.signal.aborted) return;
        setItems(
          (previous) =>
            new Map([
              ...previous,
              ...loaded.map((item): [string, Content[K]] => [itemId(kind, item) ?? '', item]),
            ]),
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailure(key);
      })
      .finally(() => clearTimeout(deadline));
    return () => {
      controller.abort();
      clearTimeout(deadline);
    };
  }, [key, kind, wanted, items, needed]);
  return {
    items,
    loading: needed && failure !== key,
    error: needed && failure === key,
    retry: () => setAttempt((value) => value + 1),
  };
}
