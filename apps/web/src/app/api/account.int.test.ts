import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET as account } from './account/route';
import { POST as signIn } from './account/sign-in/route';
import { POST as signOut } from './account/sign-out/route';
import { POST as signUp } from './account/sign-up/route';
import { GET as getProgress, PUT as putProgress } from './progress/route';
import { POST as startSession } from './session/route';

// Route handlers against the local Supabase stack, with the browser's cookies kept in memory.
const jar = vi.hoisted(() => new Map<string, string>());
vi.mock('next/headers', () => ({
  cookies: async () => ({
    getAll: () => [...jar].map(([name, value]) => ({ name, value })),
    set: (name: string, value: string) => (value ? jar.set(name, value) : jar.delete(name)),
  }),
}));

const url = (path: string) => `http://localhost${path}`;
const post = (body?: unknown) =>
  new Request(url('/api'), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? null : JSON.stringify(body),
  });
const get = () => new Request(url('/api'));
const now = new Date().toISOString();
const progress = {
  profile: { year: 1, examDate: null, dailyMinutes: 20, adult: true },
  completedLessons: ['brachial-plexus'],
  completedDrills: [],
  correctAnswers: [],
  mistakes: [],
  reviews: {},
  lastActiveAt: now,
  catchUpAcceptedOn: null,
  updatedAt: now,
};
const password = 'correct-horse-9';

describe('email accounts', () => {
  const email = `student${Date.now()}@example.com`;

  beforeEach(() => jar.clear());

  it('upgrades an anonymous learner to an email account and keeps their progress', async () => {
    expect(await (await account(get())).json()).toEqual({ data: null });

    await startSession(post());
    await putProgress(
      new Request(url('/api/progress'), {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ progress }),
      }),
    );
    expect((await (await account(get())).json()).data).toEqual({ email: null, anonymous: true });

    const created = await signUp(post({ email, password }));
    expect(created.status).toBe(201);
    expect(await created.json()).toEqual({ data: { email, confirmEmail: false } });
    expect((await (await account(get())).json()).data).toEqual({ email, anonymous: false });

    const again = await signUp(post({ email: `other${email}`, password }));
    expect(again.status).toBe(409);

    expect((await signOut(post())).status).toBe(204);
    expect(await (await account(get())).json()).toEqual({ data: null });
  });

  it('signs in on another phone and finds the saved progress', async () => {
    const wrong = await signIn(post({ email, password: 'wrong-pass-9' }));
    expect(wrong.status).toBe(401);
    expect((await wrong.json()).error.message).toBe('Email or password is wrong.');

    expect((await signIn(post({ email, password }))).status).toBe(200);
    const saved = await (await getProgress(get())).json();
    expect(saved.data.progress.completedLessons).toEqual(['brachial-plexus']);
  });

  it('refuses a second account for the same email and a short password', async () => {
    const duplicate = await signUp(post({ email, password }));
    expect(duplicate.status).toBe(409);
    expect((await signUp(post({ email: `x${email}`, password: 'short' }))).status).toBe(400);
  });
});
