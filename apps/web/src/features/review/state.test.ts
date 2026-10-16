import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  forgetStatuses,
  invalidateStatuses,
  loadStatuses,
  reviewState,
  STATUS_TTL_MS,
} from './state';

const digest = 'a'.repeat(64);
const approved = {
  topicSlug: 'brachial-plexus',
  contentVersion: '0.1.0',
  contentDigest: digest,
  currentContent: true,
  decision: 'approved' as const,
  decidedAt: '2026-10-16T09:00:00.000Z',
};
const response = (statuses: unknown[] = [approved]) => Response.json({ data: { statuses } });

afterEach(() => {
  forgetStatuses();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('review state', () => {
  it('requires the displayed content digest, and sends legacy or changed records for recheck', () => {
    expect(reviewState('0.1.0', undefined, digest)).toBe('not-reviewed');
    expect(reviewState('0.1.0', approved, digest)).toBe('approved');
    expect(reviewState('0.2.0', approved, digest)).toBe('needs-recheck');
    expect(reviewState('0.1.0', approved, 'b'.repeat(64))).toBe('needs-recheck');
    expect(reviewState('0.1.0', { ...approved, contentDigest: null }, digest)).toBe(
      'needs-recheck',
    );
    expect(reviewState('0.1.0', { ...approved, currentContent: false })).toBe('needs-recheck');
    expect(reviewState('0.1.0', { ...approved, decision: 'changes-requested' }, digest)).toBe(
      'changes-requested',
    );
  });

  it('deduplicates requests but revalidates after a short TTL', async () => {
    vi.useFakeTimers();
    const fetch = vi.fn(async () => response());
    vi.stubGlobal('fetch', fetch);
    expect((await loadStatuses()).get(approved.topicSlug)?.decision).toBe('approved');
    await loadStatuses();
    expect(fetch).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(STATUS_TTL_MS + 1);
    await loadStatuses();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('does not remember a failure, and removes stale approval on a failed refresh', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 503 }))
      .mockResolvedValueOnce(response())
      .mockRejectedValueOnce(new TypeError('offline'))
      .mockResolvedValueOnce(response());
    vi.stubGlobal('fetch', fetch);
    expect((await loadStatuses()).size).toBe(0);
    expect((await loadStatuses()).size).toBe(1);
    expect((await loadStatuses(true)).size).toBe(0);
    expect((await loadStatuses()).size).toBe(1);
  });

  it('does not restore an in-flight old approval after a decision invalidates it', async () => {
    let complete: ((value: Response) => void) | undefined;
    const fetch = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            complete = resolve;
          }),
      )
      .mockResolvedValue(response([{ ...approved, decision: 'changes-requested' }]));
    vi.stubGlobal('fetch', fetch);
    const old = loadStatuses();
    invalidateStatuses();
    await loadStatuses();
    complete?.(response());
    expect((await old).get(approved.topicSlug)?.decision).toBe('changes-requested');
    expect((await loadStatuses()).get(approved.topicSlug)?.decision).toBe('changes-requested');
  });
});
