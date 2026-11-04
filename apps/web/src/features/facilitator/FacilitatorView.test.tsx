import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { readProgress, resetProgress, saveProfile } from '@/features/progress/store';

import { FacilitatorView } from './FacilitatorView';
import { isFixtureMode } from './mode';

beforeAll(() => import('@medlearn/schemas'));

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => Response.json({ data: null })),
  );
});

afterEach(() => {
  act(() => resetProgress());
  vi.unstubAllGlobals();
});

describe('FacilitatorView', () => {
  it('applies a scenario to this device and says so', async () => {
    const { container } = render(<FacilitatorView />);
    expect(screen.getByText('Plan: not set up')).toBeInTheDocument();
    await expectNoA11yViolations(container);

    const preview = screen.getByRole('button', { name: 'Preview: Exam in 12 days' });
    await waitFor(() => expect(preview).toBeEnabled());
    await userEvent.click(preview);
    expect(readProgress().profile).toBeNull();
    expect(screen.getByText(/replaces all locally saved study progress/)).toHaveTextContent(
      'Exam in 12 days',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Replace device progress' }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Exam in 12 days is set.'),
    );
    expect(isFixtureMode()).toBe(true);
    expect(screen.getByText(/Plan: 20 min a day, exam on/)).toBeInTheDocument();
    expect(screen.getByText(/Lessons finished: 1/)).toBeInTheDocument();
  });

  it('keeps existing progress when a replacement preview is cancelled', async () => {
    act(() => saveProfile({ year: 2, examDate: null, dailyMinutes: 30, adult: true }));
    render(<FacilitatorView />);
    const preview = screen.getByRole('button', { name: 'Preview: New student' });
    await waitFor(() => expect(preview).toBeEnabled());
    await userEvent.click(preview);
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(readProgress().profile?.dailyMinutes).toBe(30);
    expect(
      screen.queryByRole('button', { name: 'Replace device progress' }),
    ).not.toBeInTheDocument();
  });

  it('blocks scenario replacement for an authenticated account', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json({ data: { email: 'student@example.com', anonymous: false } }),
      ),
    );
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 45, adult: true }));
    render(<FacilitatorView />);
    expect(await screen.findByText(/Sign out through Account/)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Preview: New student' })).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Open Account' })).toHaveAttribute('href', '/account');
    expect(readProgress().profile?.dailyMinutes).toBe(45);
  });

  it('keeps replacement disabled when account verification fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(null, { status: 503 })),
    );
    render(<FacilitatorView />);
    expect(screen.getByRole('button', { name: 'Preview: New student' })).toBeDisabled();
    expect(await screen.findByText(/Could not verify this device/)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Preview: Exam in 12 days' })).toBeDisabled();
  });

  it('rechecks the account after preview and refuses replacement if another tab signed in', async () => {
    const account = vi.fn(async () => Response.json({ data: null }));
    vi.stubGlobal('fetch', account);
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 45, adult: true }));
    render(<FacilitatorView />);
    const preview = screen.getByRole('button', { name: 'Preview: New student' });
    await waitFor(() => expect(preview).toBeEnabled());
    await userEvent.click(preview);
    account.mockImplementation(async () =>
      Response.json({ data: { email: 'student@example.com', anonymous: false } }),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Replace device progress' }));
    await screen.findByText(/An account is now signed in/);
    expect(readProgress().profile?.dailyMinutes).toBe(45);
    expect(isFixtureMode()).toBe(false);
  });

  it('does not apply a fixture if isolation cannot survive a reload', async () => {
    render(<FacilitatorView />);
    const preview = screen.getByRole('button', { name: 'Preview: New student' });
    await waitFor(() => expect(preview).toBeEnabled());
    await userEvent.click(preview);
    const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    await userEvent.click(screen.getByRole('button', { name: 'Replace device progress' }));
    await screen.findByText(/Test setup could not be saved/);
    expect(readProgress().profile).toBeNull();
    write.mockRestore();
  });
});
