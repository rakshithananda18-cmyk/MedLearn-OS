import type { SearchResult } from '@/content/search';

/**
 * Asks the server's search. Throws when it does not answer properly, so a caller can say so
 * rather than wait forever or claim nothing matches.
 */
export async function fetchSearch(query: string, signal: AbortSignal): Promise<SearchResult[]> {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
  if (!response.ok) throw new Error(`Search answered ${response.status}`);
  const body = (await response.json()) as { data?: { results?: SearchResult[] } };
  return body.data?.results ?? [];
}

/** A request given up on purpose (newer typing, a closed card): nothing to report. */
export const wasCancelled = (error: unknown) =>
  error instanceof DOMException && error.name === 'AbortError';

/** What to tell the student when search could not answer. */
export const searchFailedMessage = () =>
  typeof navigator !== 'undefined' && navigator.onLine === false
    ? 'You are offline: search needs the internet. It will try again when you are back.'
    : 'Search did not answer. Try again in a moment, or open the full results.';
