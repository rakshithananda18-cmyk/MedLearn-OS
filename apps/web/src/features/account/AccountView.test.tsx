import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { readProgress, resetProgress, saveNote, saveProfile } from '@/features/progress/store';

import { AccountCard } from './AccountCard';
import { AccountView } from './AccountView';

const push = vi.fn();
const refresh = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push, refresh }) }));

type Reply = { status?: number; body?: unknown };

/** A fake server: each path answers with the next queued reply (or the last one again). */
function server(routes: Record<string, Reply[]>) {
  const fetchMock = vi.fn(async (path: string, init?: RequestInit) => {
    const queue = routes[(init?.method ?? 'GET') + ' ' + path] ??
      routes[path] ?? [{ status: 404, body: { error: { message: 'Not found' } } }];
    const reply = queue.length > 1 ? (queue.shift() as Reply) : (queue[0] as Reply);
    if (reply.status === 204) return new Response(null, { status: 204 });
    return Response.json(reply.body ?? {}, { status: reply.status ?? 200 });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const adult = () => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true });
const signedIn = { data: { email: 'asha@example.com', anonymous: false } };

// The app loads the schema library on demand; load it once up front so the waits below time the
// screen, not the first import.
beforeAll(() => import('@medlearn/schemas'));

afterEach(() => {
  act(() => resetProgress());
  vi.unstubAllGlobals();
  push.mockClear();
  refresh.mockClear();
  localStorage.clear();
});

describe('AccountView', () => {
  it('lets an adult create an account with the emailed code, then shows it', async () => {
    act(adult);
    const fetchMock = server({
      '/api/account': [{ body: { data: { email: null, anonymous: true } } }, { body: signedIn }],
      '/api/account/sign-up': [
        { status: 201, body: { data: { email: 'asha@example.com', confirmEmail: true } } },
      ],
      '/api/account/confirm': [
        { status: 400, body: { error: { message: 'That code is wrong or has expired.' } } },
        { body: { data: { email: 'asha@example.com' } } },
      ],
      '/api/progress': [{ body: { data: null } }],
    });
    const { container } = render(<AccountView />);
    expect(
      await screen.findByRole('heading', { name: 'Keep your progress safe' }),
    ).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.type(screen.getByLabelText(/^Email/), 'asha@example.com');
    await userEvent.type(screen.getByLabelText(/^Password/), 'correct-horse-9');
    await userEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText(/We sent a 6-digit code to/)).toBeInTheDocument();
    await expectNoA11yViolations(container);
    await userEvent.type(screen.getByLabelText(/^Code from the email/), '000000');
    const confirm = screen.getByRole('button', { name: 'Confirm email' });
    await userEvent.click(confirm);
    expect(await screen.findByText('That code is wrong or has expired.')).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/^Code from the email/));
    await userEvent.type(screen.getByLabelText(/^Code from the email/), '042917');
    await userEvent.click(confirm);
    expect(await screen.findByText('Signed in as asha@example.com')).toBeInTheDocument();
    const signUp = fetchMock.mock.calls.find(
      ([path]) => path === '/api/account/sign-up',
    ) as unknown as [string, RequestInit] | undefined;
    expect(JSON.parse(String(signUp?.[1].body))).toEqual({
      email: 'asha@example.com',
      password: 'correct-horse-9',
    });
  });

  it('shows the server message when signing in fails, then sends a student without a plan to the setup questions', async () => {
    server({
      '/api/account': [{ body: { data: null } }],
      '/api/account/sign-in': [
        { status: 401, body: { error: { message: 'Email or password is wrong.' } } },
        { body: { data: { email: 'asha@example.com' } } },
      ],
      '/api/progress': [{ body: { data: null } }],
    });
    render(<AccountView />);
    await userEvent.click(await screen.findByRole('button', { name: 'Existing account' }));
    await userEvent.type(screen.getByLabelText(/^Email/), 'asha@example.com');
    await userEvent.type(screen.getByLabelText(/^Password/), 'wrong-pass-9');
    const submit = screen.getByRole('button', { name: 'Sign in' });
    await userEvent.click(submit);
    expect(await screen.findByText('Email or password is wrong.')).toBeInTheDocument();

    await userEvent.click(submit);
    // No study plan on this phone or in the account: the setup questions come first.
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith('/welcome'));
    expect(readProgress().profile?.adult).toBe(true);
  });

  it('resets a forgotten password with an emailed code and opens Today', async () => {
    act(adult);
    const fetchMock = server({
      '/api/account': [{ body: { data: null } }],
      '/api/account/reset': [{ status: 204 }],
      '/api/account/new-password': [{ body: { data: { email: 'asha@example.com' } } }],
      '/api/progress': [{ body: { data: null } }],
    });
    const { container } = render(<AccountView />);
    await userEvent.click(await screen.findByRole('button', { name: 'Existing account' }));
    await userEvent.type(screen.getByLabelText(/^Email/), 'asha@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Forgot your password?' }));

    // The email typed so far carries over.
    expect(screen.getByLabelText(/^Email/)).toHaveValue('asha@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Send code' }));
    expect(await screen.findByText(/a 6-digit code is on its way/)).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.type(screen.getByLabelText(/^Code from the email/), '042917');
    await userEvent.type(screen.getByLabelText(/^New password/), 'new-horse-99');
    await userEvent.click(screen.getByRole('button', { name: 'Set new password' }));
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith('/today'));
    const call = fetchMock.mock.calls.find(([path]) => path === '/api/account/new-password') as
      [string, RequestInit] | undefined;
    expect(JSON.parse(String(call?.[1].body))).toEqual({
      email: 'asha@example.com',
      code: '042917',
      password: 'new-horse-99',
    });
  });

  it('in a private app, opens on sign-in and lets an invited person create an account without a plan', async () => {
    server({ '/api/account': [{ body: { data: null } }] });
    const { container } = render(<AccountView inviteOnly />);
    expect(await screen.findByText(/MedLearn OS is private for now/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.click(screen.getByRole('button', { name: 'New account' }));
    expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument();
    expect(screen.queryByText(/Answer the setup questions first/)).not.toBeInTheDocument();
  });

  it('asks students under 18 to wait for parental consent', async () => {
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: false }));
    server({ '/api/account': [{ body: { data: null } }] });
    render(<AccountView />);
    expect(await screen.findByText(/need a parent’s agreement/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/^Email/)).not.toBeInTheDocument();
  });

  it('saves the latest note before signing out and clearing this phone', async () => {
    act(adult);
    act(() => saveNote('topic', 'Just written'));
    localStorage.setItem('ml-drawings-v1', '{"axilla":[{"points":[]}]}');
    localStorage.setItem('ml-find-it-best-v1', '{"axilla":4}');
    localStorage.setItem('ml-theme', 'dark');
    const fetchMock = server({
      '/api/account': [{ body: signedIn }],
      '/api/account/sign-out': [{ status: 204 }],
      '/api/progress': [{ body: { data: null } }],
    });
    render(<AccountView />);
    await userEvent.click(await screen.findByRole('button', { name: 'Sign out' }));
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    expect(readProgress().profile).toBeNull();
    const saveIndex = fetchMock.mock.calls.findIndex(
      ([path, init]) => path === '/api/progress' && init?.method === 'PUT',
    );
    const signOutIndex = fetchMock.mock.calls.findIndex(
      ([path]) => path === '/api/account/sign-out',
    );
    expect(saveIndex).toBeGreaterThan(-1);
    expect(saveIndex).toBeLessThan(signOutIndex);
    expect(
      JSON.parse(String(fetchMock.mock.calls[saveIndex]?.[1]?.body)).progress.notes.topic.text,
    ).toBe('Just written');
    expect(refresh).toHaveBeenCalledOnce();
    expect(localStorage.getItem('ml-drawings-v1')).toBeNull();
    expect(localStorage.getItem('ml-find-it-best-v1')).toBeNull();
    expect(localStorage.getItem('ml-theme')).toBe('dark');
  });

  it('keeps progress, account UI and offline pages when sign-out fails', async () => {
    act(adult);
    act(() => saveNote('topic', 'Do not lose this'));
    localStorage.setItem('ml-drawings-v1', '{"axilla":[{"points":[]}]}');
    localStorage.setItem('ml-find-it-best-v1', '{"axilla":4}');
    const deleteCache = vi.fn();
    vi.stubGlobal('caches', { keys: vi.fn(async () => ['pages-v1']), delete: deleteCache });
    server({
      '/api/account': [{ body: signedIn }],
      '/api/progress': [{ body: { data: null } }],
      '/api/account/sign-out': [{ status: 503, body: { error: { message: 'Please try again.' } } }],
    });
    render(<AccountView />);
    await userEvent.click(await screen.findByRole('button', { name: 'Sign out' }));
    expect(await screen.findByText('Please try again.')).toBeInTheDocument();
    expect(screen.getByText('Signed in as asha@example.com')).toBeInTheDocument();
    expect(readProgress().notes.topic?.text).toBe('Do not lose this');
    expect(localStorage.getItem('ml-drawings-v1')).not.toBeNull();
    expect(localStorage.getItem('ml-find-it-best-v1')).toBe('{"axilla":4}');
    expect(push).not.toHaveBeenCalled();
    expect(deleteCache).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeEnabled();
  });

  it('keeps unsaved progress when the final save fails and does not sign out', async () => {
    act(adult);
    act(() => saveNote('topic', 'Offline note'));
    localStorage.setItem('ml-drawings-v1', '{"axilla":[{"points":[]}]}');
    localStorage.setItem('ml-find-it-best-v1', '{"axilla":4}');
    const fetchMock = server({
      '/api/account': [{ body: signedIn }],
      '/api/progress': [{ status: 503 }],
    });
    render(<AccountView />);
    await userEvent.click(await screen.findByRole('button', { name: 'Sign out' }));
    expect(await screen.findByText(/Your latest progress could not be saved/)).toBeInTheDocument();
    expect(readProgress().notes.topic?.text).toBe('Offline note');
    expect(localStorage.getItem('ml-drawings-v1')).not.toBeNull();
    expect(localStorage.getItem('ml-find-it-best-v1')).toBe('{"axilla":4}');
    expect(fetchMock.mock.calls.some(([path]) => path === '/api/account/sign-out')).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });
});

describe('AccountCard', () => {
  it('nudges a signed-out adult and stays quiet once signed in', async () => {
    act(adult);
    server({ '/api/account': [{ body: { data: null } }] });
    const { unmount } = render(<AccountCard />);
    expect(await screen.findByRole('link', { name: 'Create account or sign in' })).toHaveAttribute(
      'href',
      '/account',
    );
    unmount();

    server({ '/api/account': [{ body: signedIn }] });
    render(<AccountCard />);
    expect(await screen.findByText(/Signed in as asha@example.com/)).toBeInTheDocument();
  });
});
