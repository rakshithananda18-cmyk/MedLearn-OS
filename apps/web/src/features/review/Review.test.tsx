import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type BoardTopic, ReviewBoard } from './ReviewBoard';
import { ReviewForm } from './ReviewForm';

const router = vi.hoisted(() => ({ refresh: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => router }));

afterEach(() => vi.unstubAllGlobals());

const topic = (slug: string, state: BoardTopic['state'], openReports = 0): BoardTopic => ({
  slug,
  title: slug,
  version: '0.1.0',
  chapter: 'Volume 1, Chapter 3 Pectoral Region',
  state,
  openReports,
});

describe('ReviewBoard', () => {
  it('opens on what needs reviewing, and filters by where topics stand', async () => {
    const { container } = render(
      <ReviewBoard
        topics={[
          topic('axilla', 'not-reviewed', 2),
          topic('pectoral-region', 'approved'),
          topic('brachial-plexus', 'needs-recheck'),
          topic('arm-front', 'changes-requested'),
        ]}
      />,
    );
    expect(screen.getByText(/1 of 4 approved/)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /axilla.*2 open reports.*Not reviewed/ }),
    ).toHaveAttribute('href', '/review/axilla');
    expect(
      screen.getByRole('link', { name: /brachial-plexus.*Changed, check again/ }),
    ).toBeVisible();
    expect(screen.queryByRole('link', { name: /pectoral-region/ })).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'Approved 1' }));
    expect(screen.getByRole('link', { name: /pectoral-region/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /axilla/ })).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Open reports 1' }));
    expect(screen.getByRole('link', { name: /axilla/ })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });
});

describe('ReviewForm', () => {
  it('approves only once every check is ticked, and saves the decision', async () => {
    const fetch = vi.fn(async () => Response.json({ data: { saved: true } }, { status: 201 }));
    vi.stubGlobal('fetch', fetch);
    render(<ReviewForm slug="axilla" version="0.1.0" />);
    const form = screen.getByRole('region', { name: 'Your review' });
    const approve = within(form).getByRole('button', { name: 'Approve' });
    expect(approve).toBeDisabled();
    expect(within(form).getByRole('button', { name: 'Ask for changes' })).toBeDisabled();

    for (const box of within(form).getAllByRole('checkbox')) await userEvent.click(box);
    await userEvent.click(approve);
    expect(await within(form).findByText(/Approved\. Students see it now/)).toBeInTheDocument();
    const [, init] = (fetch.mock.calls as unknown as [string, RequestInit][])[0] ?? [];
    expect(JSON.parse(String(init?.body))).toEqual({
      topicSlug: 'axilla',
      contentVersion: '0.1.0',
      decision: 'approved',
      checks: { pages: true, facts: true, questions: true, visuals: true },
    });
    expect(router.refresh).toHaveBeenCalled();
  });

  it('asks for changes with a note, and shows why a save failed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json(
          { error: { code: 'CONFLICT', message: 'This topic has changed since you opened it.' } },
          { status: 409 },
        ),
      ),
    );
    render(<ReviewForm slug="axilla" version="0.1.0" />);
    await userEvent.type(screen.getByLabelText(/Notes/), 'Step 2 misses the lateral wall');
    await userEvent.click(screen.getByRole('button', { name: 'Ask for changes' }));
    expect(await screen.findByText(/has changed since you opened it/)).toBeInTheDocument();
  });
});
