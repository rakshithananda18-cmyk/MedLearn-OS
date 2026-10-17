import { addDays, dayKey } from '@medlearn/core';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PLANNABLE_TOPICS } from '@/content/topics';
import {
  completeLesson,
  readProgress,
  resetProgress,
  saveProfile,
} from '@/features/progress/store';

import { PlanView } from './PlanView';

afterEach(() => {
  act(() => resetProgress());
  vi.unstubAllGlobals();
});

const today = dayKey(new Date());

function answer(status: number, body: unknown) {
  const fetch = vi.fn(async () => Response.json(body, { status }));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

describe('PlanView', () => {
  it('sends the request with only what a plan needs, and adds the plan as changed', async () => {
    act(() => {
      saveProfile({ year: 1, examDate: null, dailyMinutes: 30, adult: true, name: 'Asha Rao' });
      completeLesson('axilla');
    });
    const fetch = answer(200, {
      data: {
        reply: 'Upper limb first, then the thorax.',
        goals: [
          {
            kind: 'learn',
            title: 'Upper limb',
            topics: ['brachial-plexus', 'axillary-vessels'],
            date: addDays(today, 6),
            from: null,
            minutesPerDay: 15,
          },
          {
            kind: 'test',
            title: 'Thorax test',
            topics: ['pleura'],
            date: addDays(today, 9),
            from: null,
            minutesPerDay: 5,
          },
        ],
        dailyMinutes: 45,
        examDate: null,
        tier: 'complex',
      },
    });
    const { container } = render(<PlanView topics={PLANNABLE_TOPICS} />);
    await userEvent.click(
      screen.getByRole('button', { name: 'The whole upper limb in three weeks, then the thorax' }),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Make a plan' }));

    const sent = JSON.parse(String(fetch.mock.calls[0]?.at(1)?.body)) as Record<string, unknown>;
    expect(sent).toEqual({
      request: 'The whole upper limb in three weeks, then the thorax',
      today,
      learnt: ['axilla'],
      dailyMinutes: 30,
      examDate: null,
    });
    // Nothing that names the student goes out.
    expect(JSON.stringify(sent)).not.toContain('Asha');

    const plan = await screen.findByRole('region', { name: 'Proposed plan' });
    expect(within(plan).getByText('Upper limb first, then the thorax.')).toBeInTheDocument();
    await userEvent.click(within(plan).getByRole('button', { name: 'Leave out Axillary vessels' }));
    await userEvent.click(within(plan).getByRole('button', { name: 'Leave out Thorax test' }));
    await userEvent.click(within(plan).getByRole('checkbox', { name: /daily study time to 45/ }));
    await expectNoA11yViolations(container);
    await userEvent.click(screen.getByRole('button', { name: 'Add to my plan' }));

    expect(screen.getByText('Added to your plan')).toBeInTheDocument();
    const saved = readProgress();
    expect(saved.goals).toMatchObject([
      { kind: 'learn', title: 'Upper limb', topics: ['brachial-plexus'] },
    ]);
    // The daily time was left as it was.
    expect(saved.profile?.dailyMinutes).toBe(30);
    expect(screen.getByRole('button', { name: 'Remove Upper limb' })).toBeInTheDocument();
  });

  it('points to planning by hand when the AI is off', async () => {
    answer(503, { error: { code: 'UNAVAILABLE', message: 'Something went wrong' } });
    render(<PlanView topics={PLANNABLE_TOPICS} />);
    await userEvent.type(screen.getByLabelText('What should the plan cover?'), 'Test on Friday');
    await userEvent.click(screen.getByRole('button', { name: 'Make a plan' }));
    expect(
      await screen.findByText('The AI planner is not available right now'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Plan by hand' })).toHaveAttribute('href', '/practice');
  });
});
