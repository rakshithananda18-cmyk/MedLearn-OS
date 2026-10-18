'use client';

import { goalLoad, goalSchedule } from '@medlearn/core';
import type { ProposedGoal } from '@medlearn/schemas';
import { Icon, IconButton, Text, TextField } from '@medlearn/ui';
import { Trash2, X } from '@medlearn/ui/icons';

import type { TopicSummary } from '@/content/topics';

import { dayName, KIND_NAME, topicMinutes } from './words';

/**
 * One goal of a proposed plan, to change before it is added: its name, its date, its topics, and
 * how it falls day by day at the pace Today keeps.
 */
export function GoalDraft({
  goal,
  today,
  topics,
  dailyMinutes,
  onChange,
  onDrop,
}: Readonly<{
  goal: ProposedGoal;
  today: string;
  topics: Map<string, TopicSummary>;
  dailyMinutes: number;
  onChange: (goal: ProposedGoal) => void;
  onDrop: () => void;
}>) {
  const titleOf = (slug: string) => topics.get(slug)?.title ?? slug;
  const paced = { ...goal, from: goal.from ?? undefined };
  const load = goalLoad(paced, today, (slug) => topicMinutes(goal, topics.get(slug)));
  const days = goalSchedule({ ...paced, id: '', done: [], createdAt: '' }, today);
  const change = (next: Partial<ProposedGoal>) => onChange({ ...goal, ...next });
  return (
    <li className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
            {KIND_NAME[goal.kind]}
            {goal.from ? ` from ${dayName(goal.from)}` : ''}
          </span>
          <Text size="sm" tone="muted">
            {goal.topics.length} {goal.topics.length === 1 ? 'topic' : 'topics'} · about {load} min
            on the busiest day
          </Text>
        </div>
        <IconButton icon={Trash2} label={`Leave out ${goal.title}`} size="sm" onClick={onDrop} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <TextField
          label="Name"
          maxLength={80}
          value={goal.title}
          onChange={(event) => change({ title: event.target.value })}
        />
        <TextField
          label={goal.kind === 'test' ? 'Test date' : 'Done by'}
          type="date"
          min={goal.from ?? today}
          value={goal.date}
          onChange={(event) => {
            const date = event.target.value;
            if (date >= (goal.from ?? today)) change({ date });
          }}
        />
      </div>
      {load > dailyMinutes ? (
        <Text size="sm" className="text-warning">
          Some days need more than your {dailyMinutes} minutes. Give it a later date, or leave some
          topics out.
        </Text>
      ) : null}
      <ul aria-label={`Topics in ${goal.title}`} className="flex flex-wrap gap-2">
        {goal.topics.map((slug) => (
          <li
            key={slug}
            className="flex min-h-8 items-center gap-1 rounded-full border border-border-strong py-1 pr-1 pl-3 text-sm text-ink"
          >
            {titleOf(slug)}
            <button
              type="button"
              aria-label={`Leave out ${titleOf(slug)}`}
              disabled={goal.topics.length === 1}
              onClick={() => change({ topics: goal.topics.filter((item) => item !== slug) })}
              className="flex size-6 items-center justify-center rounded-full text-fg-muted hover:bg-surface-muted hover:text-fg disabled:opacity-40"
            >
              <Icon icon={X} size="sm" />
            </button>
          </li>
        ))}
      </ul>
      <details className="text-sm">
        <summary className="cursor-pointer font-semibold text-primary-strong">
          Day by day ({days.length} {days.length === 1 ? 'day' : 'days'})
        </summary>
        <ol className="mt-2 flex flex-col gap-1">
          {days.map((day) => (
            <li key={day.date} className="flex gap-3">
              <span className="w-24 shrink-0 text-fg-muted">{dayName(day.date)}</span>
              <span className="text-fg">{day.topics.map(titleOf).join(', ')}</span>
            </li>
          ))}
        </ol>
      </details>
    </li>
  );
}
