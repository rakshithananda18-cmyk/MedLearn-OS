import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { readProgress, resetProgress, saveProfile } from '@/features/progress/store';

import { AccountCard } from './AccountCard';
import { AccountView } from './AccountView';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

type Reply = { status?: number; body?: unknown };

/** A fake server: each path answers with the next queued reply (or the last one again). */
function server(routes: Record<string, Reply[]>) {
  const fetchMock = vi.fn(async (path: string) => {
    const queue = routes[path] ?? [{ status: 404, body: { error: { message: 'Not found' } } }];
    const reply = queue.length > 1 ? (queue.shift() as Reply) : (queue[0] as Reply);
    if (reply.status === 204) return new Response(null, { status: 204 });
    return Response.json(reply.body ?? {}, { status: reply.status ?? 200 });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const adult = () => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true });
const signedIn = { data: { email: 'asha@example.com', anonymous: false } };

afterEach(() => {
  act(() => resetProgress());
  vi.unstubAllGlobals();
  push.mockClear();
});

describe('AccountView', () => {
  it('lets an adult create an account, then shows it', async () => {
    act(adult);
    const fetchMock = server({
      '/api/account': [{ body: { data: { email: null, anonymous: true } } }, { body: signedIn }],
      '/api/account/sign-up': [
        { status: 201, body: { data: { email: 'asha@example.com', confirmEmail: false } } },
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

    expect(await screen.findByText('Signed in as asha@example.com')).toBeInTheDocument();
    const signUp = fetchMock.mock.calls.find(
      ([path]) => path === '/api/account/sign-up',
    ) as unknown as [string, RequestInit] | undefined;
    expect(JSON.parse(String(signUp?.[1].body))).toEqual({
      email: 'asha@example.com',
      password: 'correct-horse-9',
    });
  });

  it('shows the server message when signing in fails, then signs in and opens Today', async () => {
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
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith('/today'));
    expect(readProgress().profile?.adult).toBe(true);
  });

  it('asks students under 18 to wait for parental consent', async () => {
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: false }));
    server({ '/api/account': [{ body: { data: null } }] });
    render(<AccountView />);
    expect(await screen.findByText(/need a parent’s agreement/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/^Email/)).not.toBeInTheDocument();
  });

  it('signs out and clears this phone', async () => {
    act(adult);
    server({
      '/api/account': [{ body: signedIn }],
      '/api/account/sign-out': [{ status: 204 }],
    });
    render(<AccountView />);
    await userEvent.click(await screen.findByRole('button', { name: 'Sign out' }));
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    expect(readProgress().profile).toBeNull();
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
