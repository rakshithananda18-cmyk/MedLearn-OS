import { emailedCode } from '@medlearn/test-utils/mail';
import { describe, expect, it, vi } from 'vitest';

import { POST as confirm } from './account/confirm/route';
import { GET as account } from './account/route';
import { POST as signIn } from './account/sign-in/route';
import { POST as signUp } from './account/sign-up/route';
import { DELETE as remove, PATCH as update } from './admin/reviewers/[email]/route';
import { POST as add } from './admin/reviewers/route';
import { POST as startSession } from './session/route';

// Route handlers against the local Supabase stack, with the browser's cookies kept in memory.
const jar = vi.hoisted(() => new Map<string, string>());
vi.mock('next/headers', () => ({
  cookies: async () => ({
    getAll: () => [...jar].map(([name, value]) => ({ name, value })),
    set: (name: string, value: string) => (value ? jar.set(name, value) : jar.delete(name)),
  }),
}));

const request = (method: string, body?: unknown) =>
  new Request('http://localhost/api', {
    method,
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? null : JSON.stringify(body),
  });
const params = (email: string) => ({
  params: Promise.resolve({ email: encodeURIComponent(email) }),
});

// Seeded (supabase/seed.sql); the accounts are made on the first run.
const ADMIN = 'admin@example.com';
const REVIEWER = 'reviewer@example.com';
const PASSWORD = 'review-pass-9';

async function signInAs(email: string) {
  jar.clear();
  if ((await signIn(request('POST', { email, password: PASSWORD }))).status === 200) return;
  await startSession(request('POST'));
  const sent = new Date();
  expect((await signUp(request('POST', { email, password: PASSWORD }))).status).toBe(201);
  const code = await emailedCode(email, sent);
  expect((await confirm(request('POST', { email, code }))).status).toBe(200);
}

describe('admin API', () => {
  const newcomer = `reviewer-${Date.now()}@example.com`;

  it('turns away a visitor and a reviewer', async () => {
    jar.clear();
    await startSession(request('POST'));
    const visitor = await add(request('POST', { email: newcomer, qualification: 'MBBS' }));
    expect(visitor.status).toBe(403);

    await signInAs(REVIEWER);
    const reviewer = await add(request('POST', { email: newcomer, qualification: 'MBBS' }));
    expect(reviewer.status).toBe(403);
    expect((await account(request('GET'))).status).toBe(200);
  });

  it('lets an admin add, update and remove a reviewer', async () => {
    await signInAs(ADMIN);
    expect((await (await account(request('GET'))).json()).data).toMatchObject({ admin: true });

    const added = await add(
      request('POST', { email: newcomer.toUpperCase(), qualification: 'MD Anatomy, faculty' }),
    );
    expect(added.status).toBe(201);
    const again = await add(request('POST', { email: newcomer, qualification: 'MD Anatomy' }));
    expect(again.status).toBe(409);
    const unqualified = await add(request('POST', { email: 'x@example.com', qualification: '' }));
    expect(unqualified.status).toBe(400);

    const changed = await update(
      request('PATCH', { qualification: 'MD Anatomy, professor' }),
      params(newcomer),
    );
    expect(changed.status).toBe(200);
    const unknown = await update(
      request('PATCH', { qualification: 'MBBS' }),
      params('nobody@example.com'),
    );
    expect(unknown.status).toBe(404);

    expect((await remove(request('DELETE'), params(newcomer))).status).toBe(204);
    expect((await remove(request('DELETE'), params(newcomer))).status).toBe(404);
  });
});
