import { afterEach, describe, expect, it, vi } from 'vitest';

import { forgetStatuses, loadStatuses, reviewState, STATUS_TTL_MS } from './state';

const approved = {
  topicSlug: 'brachial-plexus',
  contentVersion: '0.1.0',
  decision: 'approved' as const,
  decidedAt: '2026-10-16T09:00:00.000Z',
};

afterEach(() => {
  forgetStatuses();
  vi.unstubAllGlobals();
});

describe('review state', () => {
  it('counts a decision only for the version students see now', () => {
    expect(reviewState('0.1.0', undefined)).toBe('not-reviewed');
    expect(reviewState('0.1.0', approved)).toBe('approved');
    expect(reviewState('0.2.0', approved)).toBe('needs-recheck');
    expect(reviewState('0.1.0', { ...approved, decision: 'changes-requested' })).toBe(
      'changes-requested',
    );
  });

  it('asks the server once, and stays empty when it cannot', async () => {
    const fetch = vi.fn(async () => Response.json({ data: { statuses: [approved] } }));
    vi.stubGlobal('fetch', fetch);
    expect((await loadStatuses()).get('brachial-plexus')?.decision).toBe('approved');
    await loadStatuses();
    expect(fetch).toHaveBeenCalledTimes(1);

    forgetStatuses();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline');
      }),
    );
    expect((await loadStatuses()).size).toBe(0);
  });

  it('drops entries without the fields it reads', async () => {
    const odd = [approved, { topicSlug: 'axilla', decision: 'approved' }, null, 'approved'];
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ data: { statuses: odd } })),
    );
    expect([...(await loadStatuses()).keys()]).toEqual(['brachial-plexus']);
  });

  it('asks again once what it has is a minute old, so an open app catches up', async () => {
    const fetch = vi.fn(async () => Response.json({ data: { statuses: [approved] } }));
    vi.stubGlobal('fetch', fetch);
    await loadStatuses(1_000);
    await loadStatuses(1_000 + STATUS_TTL_MS - 1);
    expect(fetch).toHaveBeenCalledTimes(1);
    await loadStatuses(1_000 + STATUS_TTL_MS);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
