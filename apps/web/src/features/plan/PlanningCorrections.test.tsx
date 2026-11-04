import { addDays, dayKey } from '@medlearn/core';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
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

import { AiPlan } from './AiPlan';
import { PlanBuilder } from './PlanBuilder';
import { PlanCalendar } from './PlanCalendar';
import { PlanView } from './PlanView';
import { dayName } from './words';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

const today = dayKey(new Date());
const topics = PLANNABLE_TOPICS.filter((topic) => ['pleura', 'lungs'].includes(topic.slug));
const tree = libraryTree(TOPICS.filter((topic) => topics.some((item) => item.slug === topic.slug)));
const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));
const earlier = new Date(Date.now() - 7 * 86_400_000);

function profile() {
  saveProfile({ year: 1, examDate: addDays(today, 90), dailyMinutes: 20, adult: false });
}

afterEach(() => {
  act(() => resetProgress());
  push.mockClear();
  vi.unstubAllGlobals();
});

describe('plan outcomes and study destinations', () => {
  it('keeps completed plans separate from expired unfinished work', async () => {
    act(() => {
      profile();
      addGoal(
        { kind: 'learn', title: 'Finished pleura', topics: ['pleura'], date: addDays(today, -1) },
        earlier,
      );
      addGoal(
        { kind: 'learn', title: 'Unfinished lungs', topics: ['lungs'], date: addDays(today, -1) },
        earlier,
      );
      completeLesson('pleura');
    });
    render(<PlanView topics={topics} />);
    await userEvent.click(screen.getByRole('button', { name: 'Completed (1)' }));
    const complete = screen.getByRole('article', { name: 'Finished pleura' });
    expect(within(complete).getByText('Plan complete. Every topic is done.')).toBeInTheDocument();
    expect(screen.queryByRole('article', { name: 'Unfinished lungs' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Deadline passed (1)' }));
    const unfinished = screen.getByRole('article', { name: 'Unfinished lungs' });
    expect(within(unfinished).getByText(/Deadline passed · 1 topic left/)).toBeInTheDocument();
    expect(within(unfinished).queryByText(/Every topic is done/)).not.toBeInTheDocument();
    expect(within(unfinished).getByRole('link', { name: 'Adjust dates' })).toHaveAttribute(
      'href',
      expect.stringMatching(/#adjust-plan$/),
    );
  });

  it('does not call an expired incomplete calendar complete, and recovers after extending it', async () => {
    let id = '';
    act(() => {
      profile();
      id = addGoal(
        {
          kind: 'learn',
          title: 'Missed thorax deadline',
          topics: ['pleura', 'lungs'],
          date: addDays(today, -1),
        },
        earlier,
      ).id;
    });
    render(<PlanCalendar id={id} topics={topics} tree={tree} />);
    expect(screen.getByText('Deadline passed · 2 topics left')).toBeInTheDocument();
    expect(screen.queryByText(/Every topic is done/)).not.toBeInTheDocument();
    expect(screen.getByText('Estimated work completed')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Final week' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Done by'), { target: { value: addDays(today, 3) } });
    expect(screen.getByRole('link', { name: /^Continue: Pleura/ })).toHaveAttribute(
      'href',
      '/learn/pleura/lesson',
    );
    expect(screen.queryByText('Deadline passed · 2 topics left')).not.toBeInTheDocument();
  });

  it('gives future starts and no-available-day plans their own explanations', () => {
    let id = '';
    act(() => {
      profile();
      id = addGoal({
        kind: 'learn',
        title: 'Future thorax',
        topics: ['pleura'],
        from: addDays(today, 2),
        date: addDays(today, 5),
      }).id;
    });
    const future = render(<PlanCalendar id={id} topics={topics} tree={tree} />);
    expect(
      screen.getByText(`Nothing from this plan today. Next on ${dayName(addDays(today, 2))}.`),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Every topic is done/)).not.toBeInTheDocument();
    future.unmount();
    act(() => {
      id = addGoal({
        kind: 'learn',
        title: 'No study day',
        topics: ['lungs'],
        date: today,
        days: [(new Date().getDay() + 1) % 7],
      }).id;
    });
    render(<PlanCalendar id={id} topics={topics} tree={tree} />);
    expect(screen.getByText('No study days left before the deadline')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Adjust dates' })).toBeInTheDocument();
  });

  it('keeps a test plan ID in both the leading action and its calendar study links', () => {
    let id = '';
    act(() => {
      profile();
      id = addGoal({
        kind: 'test',
        title: 'Pleura test',
        topics: ['pleura'],
        date: addDays(today, 2),
      }).id;
    });
    render(<PlanCalendar id={id} topics={topics} tree={tree} />);
    const next = screen.getByRole('link', { name: /^Continue: Pleura/ });
    const study = screen.getByRole('link', { name: /^Practise: Pleura/ });
    expect(next).toHaveAttribute('href', `/practice?goal=${id}&topic=pleura`);
    expect(study).toHaveAttribute('href', next.getAttribute('href'));
    expect(screen.getByRole('link', { name: /^Overview: Pleura/ })).toHaveAttribute(
      'href',
      '/learn/pleura',
    );
    expect(
      next.compareDocumentPosition(screen.getByRole('region', { name: 'Plan in figures' })) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

describe('the four-step builder', () => {
  it('focuses named steps and preserves topics and dates when going back', async () => {
    act(profile);
    render(<PlanBuilder topics={topics} tree={tree} />);
    await userEvent.click(screen.getByRole('radio', { name: /Learn new topics/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'Which topics?' })).toHaveFocus();
    expect(screen.getByText('Step 2 of 4 · Topics')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'All of Thorax' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'When?' })).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: '1 week' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'Check and add' })).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByLabelText('Done by')).toHaveValue(addDays(today, 7));
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByRole('button', { name: 'None of Thorax' })).toBeInTheDocument();
  });
});

describe('AI draft review', () => {
  const proposal = {
    reply: 'Learn the pleura and lungs.',
    goals: [
      {
        kind: 'learn',
        title: 'Pleura',
        topics: ['pleura'],
        date: addDays(today, 3),
        from: null,
        minutesPerDay: 12,
      },
    ],
    dailyMinutes: 45,
    examDate: addDays(today, 100),
    tier: 'complex',
  };

  it('previews the returned exam date and applies only the profile changes kept selected', async () => {
    act(profile);
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ data: proposal })),
    );
    render(<AiPlan topics={bySlug} today={today} onAdded={push} onManual={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Suggest a plan' }));
    const draft = await screen.findByRole('region', { name: 'Suggested plan' });
    expect(within(draft).getByText(/Review your draft · not saved yet/)).toBeInTheDocument();
    expect(within(draft).getByText(/These drafts use every day/)).toBeInTheDocument();
    const exam = screen.getByRole('checkbox', {
      name: `Set my exam date to ${dayName(proposal.examDate)}`,
    });
    await userEvent.click(exam);
    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Change my daily study time to 45 minutes' }),
    );
    expect(screen.getByText(/against your 20 minutes a day/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Add to my plans' }));
    expect(readProgress().goals).toMatchObject([{ title: 'Pleura' }]);
    expect(readProgress().profile).toMatchObject({
      dailyMinutes: 20,
      examDate: addDays(today, 90),
    });
  });

  it('offers a manual route after AI failure without submitting a plan', async () => {
    act(profile);
    const manual = vi.fn();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ error: { code: 'UNAVAILABLE' } }, { status: 503 })),
    );
    render(<AiPlan topics={bySlug} today={today} onAdded={push} onManual={manual} />);
    expect(screen.queryByText(/weekends off/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Suggest a plan' }));
    await screen.findByText('The AI planner is not available right now');
    await userEvent.click(screen.getByRole('button', { name: 'Choose topics myself' }));
    expect(manual).toHaveBeenCalledOnce();
    expect(readProgress().goals).toEqual([]);
  });
});
