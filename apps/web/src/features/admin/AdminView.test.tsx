import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AdminView } from './AdminView';

const refresh = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh }) }));

const reviewers = [
  {
    email: 'tutor@example.com',
    qualification: 'MBBS, anatomy tutor',
    addedAt: '2026-10-17T09:00:00.000Z',
    addedBy: 'admin@example.com',
  },
];
const changes = [
  {
    id: 1,
    role: 'reviewer' as const,
    email: 'tutor@example.com',
    action: 'added' as const,
    qualification: 'MBBS, anatomy tutor',
    changedBy: 'admin@example.com',
    changedAt: '2026-10-17T09:00:00.000Z',
  },
];
const progress = { approved: 3, changesAsked: 1, recheck: 2, notReviewed: 129 };

afterEach(() => {
  vi.unstubAllGlobals();
  refresh.mockClear();
});

describe('AdminView', () => {
  it('shows the progress, the team with qualifications, and the change log', async () => {
    const { container } = render(
      <AdminView reviewers={reviewers} changes={changes} progress={progress} />,
    );
    expect(
      screen.getByRole('heading', { name: 'Review progress · 135 topics' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Not reviewed')).toBeInTheDocument();
    const team = screen.getByRole('region', { name: 'Review team · 1' });
    expect(within(team).getByText('tutor@example.com')).toBeInTheDocument();
    expect(within(team).getByText('MBBS, anatomy tutor')).toBeInTheDocument();
    const log = screen.getByRole('region', { name: 'Changes to the team' });
    expect(within(log).getByText(/by admin@example.com/)).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('adds a reviewer with a qualification, then reloads the page data', async () => {
    const fetch = vi.fn(async () => Response.json({ data: { saved: true } }, { status: 201 }));
    vi.stubGlobal('fetch', fetch);
    render(<AdminView reviewers={[]} changes={[]} progress={progress} />);
    await userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'New@Example.com');
    await userEvent.type(screen.getByRole('textbox', { name: 'Qualification' }), 'MD Anatomy');
    await userEvent.click(screen.getByRole('button', { name: 'Add reviewer' }));
    expect(fetch).toHaveBeenCalledWith(
      '/api/admin/reviewers',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'New@Example.com', qualification: 'MD Anatomy' }),
      }),
    );
    expect(await screen.findByText('new@example.com can now review topics.')).toBeInTheDocument();
    expect(refresh).toHaveBeenCalled();
  });

  it('asks before removing a reviewer, and shows why a change failed', async () => {
    const fetch = vi.fn(async () =>
      Response.json(
        { error: { message: 'Only admins can manage the review team' } },
        { status: 403 },
      ),
    );
    vi.stubGlobal('fetch', fetch);
    render(<AdminView reviewers={reviewers} changes={changes} progress={progress} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(fetch).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Yes, remove' }));
    expect(fetch).toHaveBeenCalledWith(
      '/api/admin/reviewers/tutor%40example.com',
      expect.objectContaining({ method: 'DELETE' }),
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Only admins can manage the review team',
    );
    expect(refresh).not.toHaveBeenCalled();
  });
});
