import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';

import { ContentTrust } from './ContentTrust';

afterEach(() => vi.unstubAllGlobals());

async function openDrawer() {
  render(<ContentTrust topic={brachialPlexus} />);
  await userEvent.click(screen.getByRole('button', { name: 'Sources and report' }));
  return screen.getByRole('dialog', { name: 'Sources' });
}

describe('ContentTrust', () => {
  it('labels sample content and lists its sources with the version', async () => {
    const dialog = await openDrawer();
    expect(screen.getByText('Sample content, not medically reviewed')).toBeInTheDocument();
    expect(dialog).toHaveTextContent('version 0.1.0');
    expect(dialog).toHaveTextContent('Not yet reviewed by a medical reviewer');
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
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({
      topicSlug: 'brachial-plexus',
      contentVersion: '0.1.0',
      kind: 'unclear',
      note: 'Step 3 is confusing',
    });
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
