import { createReviewsRepository } from '@medlearn/db';
import { emailedCode } from '@medlearn/test-utils/mail';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { getTopic } from '@/content/topics';
import { topicReviewDigest } from '@/server/review-digest';
import { getSessionDb } from '@/server/session';

import { POST as confirm } from './account/confirm/route';
import { GET as account } from './account/route';
import { POST as signIn } from './account/sign-in/route';
import { POST as signUp } from './account/sign-up/route';
import { POST as resolve } from './reports/[id]/resolve/route';
import { POST as report } from './reports/route';
import { GET as statuses, POST as review } from './reviews/route';
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
const params = (id: number | string) => ({ params: Promise.resolve({ id: String(id) }) });

// Seeded as a reviewer (supabase/seed.sql); the account is made on the first run.
const REVIEWER = 'reviewer@example.com';
const PASSWORD = 'review-pass-9';
const topic = getTopic('brachial-plexus');
const version = topic?.version ?? '0.0.0';
const allChecks = { pages: true, facts: true, questions: true, visuals: true };
const approval = {
  topicSlug: 'brachial-plexus',
  contentVersion: version,
  contentDigest: topic ? topicReviewDigest(topic) : '',
  decision: 'approved',
  checks: allChecks,
};

async function signInAsReviewer() {
  jar.clear();
  if ((await signIn(post({ email: REVIEWER, password: PASSWORD }))).status === 200) return;
  await startSession(post());
  const sent = new Date();
  expect((await signUp(post({ email: REVIEWER, password: PASSWORD }))).status).toBe(201);
  const code = await emailedCode(REVIEWER, sent);
  expect((await confirm(post({ email: REVIEWER, code }))).status).toBe(200);
}

describe('reviews API', () => {
  it('tells anyone the latest outcomes', async () => {
    jar.clear();
    const response = await statuses(new Request(url('/api/reviews')));
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(Array.isArray((await response.json()).data.statuses)).toBe(true);
  });

  it('turns away a student', async () => {
    jar.clear();
    await startSession(post());
    expect((await review(post(approval))).status).toBe(403);
  });

  describe('as a reviewer', () => {
    beforeAll(signInAsReviewer, 30_000);

    it('says so on the account', async () => {
      const body = await (await account(new Request(url('/api/account')))).json();
      expect(body.data).toMatchObject({ email: REVIEWER, reviewer: true });
    });

    it('approves the version students see, which everyone then sees', async () => {
      expect((await review(post(approval))).status).toBe(201);
      const body = await (await statuses(new Request(url('/api/reviews')))).json();
      expect(body.data.statuses).toContainEqual(
        expect.objectContaining({
          topicSlug: 'brachial-plexus',
          contentVersion: version,
          contentDigest: approval.contentDigest,
          currentContent: true,
          decision: 'approved',
        }),
      );
    });

    it('refuses an old version, an unknown topic and an approval without every check', async () => {
      expect((await review(post({ ...approval, contentVersion: '9.9.9' }))).status).toBe(409);
      expect((await review(post({ ...approval, contentDigest: '0'.repeat(64) }))).status).toBe(409);
      expect((await review(post({ ...approval, topicSlug: 'no-such-topic' }))).status).toBe(404);
      const partial = { ...approval, checks: { ...allChecks, visuals: false } };
      expect((await review(post(partial))).status).toBe(400);
    });

    it('resolves a student report, once', async () => {
      await report(post({ topicSlug: 'brachial-plexus', contentVersion: version, kind: 'typo' }));
      const reports = await createReviewsRepository(await getSessionDb()).reports(
        'brachial-plexus',
      );
      const open = reports.find((item) => !item.resolvedAt);
      if (!open) throw new Error('The report was not stored');
      expect((await resolve(post(), params(open.id))).status).toBe(204);
      expect((await resolve(post(), params(999_999_999))).status).toBe(404);
      expect((await resolve(post(), params('abc'))).status).toBe(400);
    });
  });
});
