import type { Logger } from '@medlearn/logger/server';
import { describe, expect, it, vi } from 'vitest';

import { askJson } from './groq';
import { type CatalogueTopic, checkPlan, makePlan, pickTier, planPrompt } from './plan';
import { takeAiRequest } from './quota';

const log = { info: vi.fn(), warn: vi.fn() } as unknown as Logger;

const catalogue: CatalogueTopic[] = [
  { slug: 'axilla', title: 'Axilla', group: 'upper-limb', learnMinutes: 12, reviseMinutes: 5 },
  { slug: 'arm', title: 'Arm', group: 'upper-limb', learnMinutes: 15, reviseMinutes: 6 },
  { slug: 'hand', title: 'Hand', group: 'upper-limb', learnMinutes: 20, reviseMinutes: 8 },
  { slug: 'heart', title: 'Heart', group: 'thorax', learnMinutes: 18, reviseMinutes: 7 },
];

const input = {
  request: 'Class test on the axilla on Friday',
  today: '2026-10-18',
  learnt: ['axilla'],
  dailyMinutes: 30,
  examDate: null,
};

describe('pickTier', () => {
  it('keeps one-off requests on the quick model and courses on the larger one', () => {
    expect(pickTier('Class test on the brachial plexus on Friday')).toBe('simple');
    expect(pickTier('Make tomorrow light')).toBe('simple');
    expect(pickTier('Plan the whole upper limb')).toBe('complex');
    expect(pickTier('Upper limb in three weeks, weekends off')).toBe('complex');
    expect(pickTier('x'.repeat(161))).toBe('complex');
  });
});

describe('planPrompt', () => {
  it('writes out the calendar and the topics by part, and nothing about who the student is', () => {
    const prompt = planPrompt(input, catalogue);
    expect(prompt).toContain('Today: Sun 2026-10-18');
    expect(prompt).toContain('Fri 2026-10-23');
    expect(prompt).toContain('upper-limb: axilla, arm, hand');
    expect(prompt).toContain('thorax: heart');
    expect(prompt).toContain('Already learnt (1): axilla');
  });
});

describe('checkPlan', () => {
  it('keeps known topics in the book order, and works out the load of each day', () => {
    const plan = checkPlan(
      {
        reply: ' A test plan. ',
        goals: [
          {
            kind: 'test',
            title: 'Axilla test',
            topics: ['hand', 'ghost', 'axilla', 'hand'],
            date: '2026-10-23',
          },
        ],
        dailyMinutes: null,
        examDate: null,
      },
      input,
      catalogue,
    );
    expect(plan.reply).toBe('A test plan.');
    expect(plan.goals).toEqual([
      {
        kind: 'test',
        title: 'Axilla test',
        topics: ['axilla', 'hand'],
        date: '2026-10-23',
        from: null,
        // Five days before the test: one topic a day at most.
        minutesPerDay: 8,
      },
    ]);
  });

  it('drops learnt topics from a goal to learn, unlearnt ones from a revisit, and past dates', () => {
    const plan = checkPlan(
      {
        reply: '',
        goals: [
          { kind: 'learn', title: '', topics: ['axilla', 'arm'], date: '2026-10-25' },
          { kind: 'revisit', title: 'Again', topics: ['arm'], date: '2026-10-25' },
          { kind: 'test', title: 'Old', topics: ['axilla'], date: '2026-10-01' },
          { kind: 'test', title: 'Broken', topics: ['axilla'], date: 'Friday' },
        ],
        dailyMinutes: 30,
        examDate: '2026-01-01',
      },
      input,
      catalogue,
    );
    expect(plan.goals).toMatchObject([{ kind: 'learn', title: 'Learn', topics: ['arm'] }]);
    // Unchanged or past settings are not proposed.
    expect(plan).toMatchObject({
      dailyMinutes: null,
      examDate: null,
      reply: 'Here is a plan for that.',
    });
  });

  it('runs the parts of a course one after another, and survives an answer that is not a plan', () => {
    const plan = checkPlan(
      {
        reply: 'Upper limb, then thorax.',
        goals: [
          { kind: 'learn', title: 'Thorax', topics: ['heart'], date: '2026-11-30' },
          { kind: 'learn', title: 'Upper limb', topics: ['arm', 'hand'], date: '2026-11-08' },
        ],
        dailyMinutes: 45,
        examDate: '2027-03-10',
      },
      input,
      catalogue,
    );
    expect(plan.goals.map((goal) => [goal.title, goal.from])).toEqual([
      ['Thorax', '2026-11-09'],
      ['Upper limb', null],
    ]);
    expect(plan).toMatchObject({ dailyMinutes: 45, examDate: '2027-03-10' });
    expect(checkPlan('nonsense', input, catalogue).goals).toEqual([]);
  });
});

describe('makePlan', () => {
  const answer = (content: unknown) =>
    vi.fn<typeof askJson>(async () => ({ content, model: 'test-model' }));

  it('asks the quick model for a simple request', async () => {
    const ask = answer({
      reply: 'Done.',
      goals: [{ kind: 'test', title: 'Test', topics: ['axilla'], date: '2026-10-23' }],
      dailyMinutes: null,
      examDate: null,
    });
    const plan = await makePlan(input, catalogue, log, ask);
    expect(plan.tier).toBe('simple');
    expect(ask).toHaveBeenCalledOnce();
    expect(ask.mock.calls[0]?.[0].user).toContain('Request: "Class test on the axilla on Friday"');
  });

  it('asks the larger model again when the quick one makes nothing usable', async () => {
    const ask = answer({ reply: 'Nothing.', goals: [], dailyMinutes: null, examDate: null });
    const plan = await makePlan(input, catalogue, log, ask);
    expect(ask.mock.calls.map(([options]) => options.tier)).toEqual(['simple', 'complex']);
    expect(plan.tier).toBe('complex');
  });
});

describe('askJson', () => {
  const options = {
    tier: 'simple' as const,
    system: 'system',
    user: 'user',
    schema: { name: 'x', schema: {} },
    log,
    apiKey: 'test-key',
  };

  it('hands over to the next model when one is busy, and returns the parsed answer', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('busy', { status: 429 }))
      .mockResolvedValueOnce(
        Response.json({ choices: [{ message: { content: '{"ok":true}' } }], usage: {} }),
      );
    const result = await askJson({ ...options, fetcher });
    expect(result).toEqual({ content: { ok: true }, model: 'openai/gpt-oss-120b' });
    const sent = JSON.parse(String(fetcher.mock.calls[0]?.[1]?.body)) as Record<string, unknown>;
    expect(sent).toMatchObject({ model: 'openai/gpt-oss-20b', reasoning_effort: 'low' });
    // Logs say how it went, never what was asked.
    expect(JSON.stringify(vi.mocked(log.warn).mock.calls)).not.toContain('user');
  });

  it('is unavailable without a key, or when no model answers', async () => {
    await expect(askJson({ ...options, apiKey: '' })).rejects.toMatchObject({
      code: 'UNAVAILABLE',
    });
    const fetcher = vi.fn<typeof fetch>(async () => new Response('down', { status: 503 }));
    await expect(askJson({ ...options, fetcher })).rejects.toMatchObject({ code: 'UNAVAILABLE' });
    expect(fetcher).toHaveBeenCalledTimes(3);
  });
});

describe('takeAiRequest', () => {
  it('allows a number of requests a day for each student, and starts again the next day', () => {
    takeAiRequest('student-a', '2026-10-18', 2);
    takeAiRequest('student-a', '2026-10-18', 2);
    expect(() => takeAiRequest('student-a', '2026-10-18', 2)).toThrow(/Try again tomorrow/);
    expect(() => takeAiRequest('student-b', '2026-10-18', 2)).not.toThrow();
    expect(() => takeAiRequest('student-a', '2026-10-19', 2)).not.toThrow();
  });
});
