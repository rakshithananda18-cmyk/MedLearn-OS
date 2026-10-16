import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { forgetStatuses } from '@/features/review/state';

import { ContentTrust } from './ContentTrust';

const contentDigest = 'a'.repeat(64);
const topic = { ...brachialPlexus, contentDigest };

afterEach(() => {
  vi.unstubAllGlobals();
  forgetStatuses();
});

async function openDrawer() {
  render(<ContentTrust topic={topic} />);
  await userEvent.click(screen.getByRole('button', { name: 'Sources and report' }));
  return screen.getByRole('dialog', { name: 'Sources' });
}

describe('ContentTrust', () => {
  it('labels sample content and lists its sources with the version', async () => {
    const dialog = await openDrawer();
    expect(screen.getByText('Sample content, not medically reviewed')).toBeInTheDocument();
    expect(dialog).toHaveTextContent('version 0.1.0');
    expect(dialog).toHaveTextContent('A current review-team approval could not be confirmed');
    expect(
      screen.getByRole('link', { name: /OpenStax Anatomy and Physiology 2e/ }),
    ).toHaveAttribute('target', '_blank');
    await expectNoA11yViolations(dialog);
  });

  it('sends a report with the topic and version, then thanks the student', async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ data: { received: true } }, { status: 201 }),
    );
    vi.stubGlobal('fetch', fetchMock);
    await openDrawer();

    expect(screen.getByRole('button', { name: 'Send report' })).toBeDisabled();
    await userEvent.click(screen.getByRole('radio', { name: 'Hard to understand' }));
    await userEvent.type(screen.getByLabelText('Details (optional)'), 'Step 3 is confusing');
    await userEvent.click(screen.getByRole('button', { name: 'Send report' }));

    expect(await screen.findByText('Thank you')).toBeInTheDocument();
    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
    const [, init] = calls.find(([url]) => url === '/api/reports') ?? [];
    if (!init) throw new Error('No report was sent');
    expect(JSON.parse(String(init.body))).toEqual({
      topicSlug: 'brachial-plexus',
      contentVersion: '0.1.0',
      kind: 'unclear',
      note: 'Step 3 is confusing',
    });
  });

  it('drops the sample label once the review team approves the version shown', async () => {
    const approved = {
      topicSlug: 'brachial-plexus',
      contentVersion: brachialPlexus.version,
      contentDigest,
      currentContent: true,
      decision: 'approved',
      decidedAt: '2026-10-16T09:00:00.000Z',
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ data: { statuses: [approved] } })),
    );
    render(<ContentTrust topic={topic} />);
    await waitFor(() =>
      expect(screen.queryByText('Sample content, not medically reviewed')).toBeNull(),
    );
  });

  it('refreshes revocations on focus and retries a failed status request', async () => {
    const approved = {
      topicSlug: topic.slug,
      contentVersion: topic.version,
      contentDigest,
      currentContent: true,
      decision: 'approved',
      decidedAt: '2026-10-16T09:00:00.000Z',
    };
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ data: { statuses: [approved] } }))
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce(
        Response.json({ data: { statuses: [{ ...approved, decision: 'changes-requested' }] } }),
      );
    vi.stubGlobal('fetch', fetch);
    render(<ContentTrust topic={topic} />);
    await waitFor(() =>
      expect(screen.queryByText('Sample content, not medically reviewed')).toBeNull(),
    );
    window.dispatchEvent(new Event('focus'));
    expect(await screen.findByText('Sample content, not medically reviewed')).toBeInTheDocument();
    window.dispatchEvent(new Event('focus'));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    expect(screen.getByText('Sample content, not medically reviewed')).toBeInTheDocument();
  });

  it('does not treat an old open snapshot or bundled flag as the current approval', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json({
          data: {
            statuses: [
              {
                topicSlug: topic.slug,
                contentVersion: topic.version,
                contentDigest: 'b'.repeat(64),
                currentContent: true,
                decision: 'approved',
                decidedAt: '2026-10-16T09:00:00.000Z',
              },
            ],
          },
        }),
      ),
    );
    render(<ContentTrust topic={{ ...topic, reviewed: true }} />);
    await userEvent.click(screen.getByRole('button', { name: 'Sources and report' }));
    expect(screen.getByText('Sample content, not medically reviewed')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('approval could not be confirmed');
  });

  it('says so when the report could not be sent', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Promise.reject(new Error('offline'))),
    );
    await openDrawer();
    await userEvent.click(screen.getByRole('radio', { name: 'Spelling or wording' }));
    await userEvent.click(screen.getByRole('button', { name: 'Send report' }));
    expect(await screen.findByText('Not sent')).toBeInTheDocument();
  });
});
