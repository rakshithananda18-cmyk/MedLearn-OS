import { addDays, dayKey } from '@medlearn/core';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import {
  addGoal,
  completeLesson,
  readProgress,
  resetProgress,
  saveProfile,
} from '@/features/progress/store';

import { PlanBuilder } from './PlanBuilder';
import { PlanCalendar } from './PlanCalendar';
import { PlanView } from './PlanView';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  act(() => resetProgress());
  push.mockClear();
  vi.unstubAllGlobals();
});

const today = dayKey(new Date());
const tree = libraryTree(TOPICS);

function profile(change: object = {}) {
  saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true, ...change });
}

describe('PlanView', () => {
  it('shows each plan with its progress and week, and the share of them due today', async () => {
    act(() => {
      profile();
      completeLesson('axilla');
      addGoal({
        kind: 'learn',
        title: 'Upper limb',
        topics: ['axilla', 'brachial-plexus', 'axillary-vessels', 'arm-front'],
        date: addDays(today, 1),
      });
    });
    const { container } = render(<PlanView topics={PLANNABLE_TOPICS} />);
    const card = screen.getByRole('article', { name: 'Upper limb' });
    expect(within(card).getByText('25%')).toBeInTheDocument();
    expect(within(card).getByText('1 / 4')).toBeInTheDocument();
    expect(within(card).getByRole('link', { name: 'Open calendar' })).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/plan\/goal-/),
    );
    expect(within(card).getByRole('link', { name: /Continue: Brachial plexus/ })).toHaveAttribute(
      'href',
      '/learn/brachial-plexus/lesson',
    );

    // Two of the three topics left fall today, with more minutes than the day has.
    const todays = screen.getByRole('region', { name: 'Today from your plans' });
    expect(within(todays).getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('Today looks heavy')).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.click(screen.getByRole('button', { name: 'Finished (0)' }));
    expect(screen.getByText('No finished plans yet')).toBeInTheDocument();
  });
});

describe('PlanBuilder', () => {
  it('makes a plan from choices: what, which topics, when and on which days', async () => {
    act(() => profile({ dailyMinutes: 60 }));
    render(<PlanBuilder topics={PLANNABLE_TOPICS} tree={tree} />);
    await userEvent.click(screen.getByRole('radio', { name: /Learn new topics/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    await userEvent.click(screen.getByRole('button', { name: 'All of Upper limb' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    await userEvent.click(screen.getByRole('button', { name: '1 month' }));
    await userEvent.click(screen.getByRole('button', { name: 'Sat' }));
    await userEvent.click(screen.getByRole('button', { name: 'Sun' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByRole('heading', { name: 'Check and add' })).toBeInTheDocument();
    expect(screen.getAllByText(/^Week of /).length).toBeGreaterThan(3);
    await userEvent.click(screen.getByRole('button', { name: 'Add plan' }));

    const [goal] = readProgress().goals;
    expect(goal).toMatchObject({
      kind: 'learn',
      title: 'Upper limb',
      date: addDays(today, 30),
      days: [1, 2, 3, 4, 5],
    });
    expect(goal?.topics).toContain('brachial-plexus');
    expect(push).toHaveBeenCalledWith('/plan');
  });

  it('asks the AI from the exam date alone, and adds what it suggests', async () => {
    act(() => profile({ examDate: addDays(today, 120) }));
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      Response.json({
        data: {
          reply: 'Upper limb first.',
          goals: [
            {
              kind: 'learn',
              title: 'Upper limb',
              topics: ['brachial-plexus'],
              date: addDays(today, 30),
              from: null,
              minutesPerDay: 15,
            },
          ],
          dailyMinutes: null,
          examDate: null,
          tier: 'complex',
        },
      }),
    );
    vi.stubGlobal('fetch', fetch);
    render(<PlanBuilder topics={PLANNABLE_TOPICS} tree={tree} />);
    await userEvent.click(screen.getByRole('radio', { name: /Let AI suggest a plan/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await userEvent.click(screen.getByRole('button', { name: 'Suggest a plan' }));

    const sent = JSON.parse(String(fetch.mock.calls[0]?.[1]?.body)) as { request: string };
    expect(sent.request).toContain(`before my exam on ${addDays(today, 120)}`);
    const plan = await screen.findByRole('region', { name: 'Suggested plan' });
    await userEvent.click(within(plan).getByRole('button', { name: 'Add to my plans' }));
    expect(readProgress().goals).toMatchObject([{ title: 'Upper limb' }]);
    expect(push).toHaveBeenCalledWith('/plan');
  });
});

describe('PlanCalendar', () => {
  it('takes a day off, changes the study days, and opens topics in the library', async () => {
    let id = '';
    act(() => {
      profile();
      id = addGoal({
        kind: 'learn',
        title: 'Thorax',
        topics: ['pleura', 'lungs'],
        date: addDays(today, 6),
      }).id;
    });
    render(<PlanCalendar id={id} topics={PLANNABLE_TOPICS} tree={tree} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Thorax' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Pleura/ })[0]).toHaveAttribute(
      'href',
      '/learn/pleura',
    );

    await userEvent.click(screen.getAllByRole('button', { name: /^Take off / })[0] as HTMLElement);
    expect(readProgress().goals[0]?.off).toEqual([today]);
    expect(screen.getByRole('button', { name: /^Study on / })).toHaveTextContent('Study this day');

    await userEvent.click(screen.getByRole('button', { name: 'Sun' }));
    expect(readProgress().goals[0]?.days).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('says so when the plan is not on this device', () => {
    render(<PlanCalendar id="goal-gone" topics={PLANNABLE_TOPICS} tree={tree} />);
    expect(screen.getByRole('heading', { name: 'Plan not found' })).toBeInTheDocument();
  });
});
