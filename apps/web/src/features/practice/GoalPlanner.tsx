'use client';

import { dayKey, type StudyGoal } from '@medlearn/core';
import { Button, ChoiceGroup, Dialog, ModalClose, TextField } from '@medlearn/ui';
import { CalendarDays } from '@medlearn/ui/icons';
import { useState } from 'react';

import { addGoal } from '@/features/progress/store';

import type { SectionStrength } from './sessions';

const KINDS = [
  {
    value: 'test' as const,
    label: 'A class test',
    description: 'Revise the topics on the days before it.',
  },
  {
    value: 'revisit' as const,
    label: 'Revisit topics',
    description: 'Go over them again by a date you choose.',
  },
];

const DEFAULT_TITLE: Record<StudyGoal['kind'], string> = {
  test: 'Class test',
  revisit: 'Revisit',
};

/**
 * Plans a class test or a revisit between the daily plans: what it is, when, and which topics
 * (by book section). Today then spreads the topics over the days left.
 */
export function GoalPlanner({
  sections,
  titles,
}: Readonly<{
  sections: SectionStrength[];
  /** Topic titles by slug. */
  titles: Record<string, string>;
}>) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<StudyGoal['kind']>('test');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [chosen, setChosen] = useState<string[]>([]);
  const today = dayKey(new Date());
  const order = sections.flatMap((section) => section.slugs);
  const toggle = (slugs: string[], on: boolean) =>
    setChosen(order.filter((slug) => (slugs.includes(slug) ? on : chosen.includes(slug))));
  const ready = chosen.length > 0 && date >= today;

  return (
    <Dialog
      title="Plan a class test or revisit"
      description="Today will share the topics out over the days until then."
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setChosen([]);
          setTitle('');
          setDate('');
        }
      }}
      trigger={
        <Button variant="secondary" iconStart={CalendarDays} fullWidth>
          Plan a class test or revisit
        </Button>
      }
      footer={
        <>
          <ModalClose asChild>
            <Button variant="ghost">Cancel</Button>
          </ModalClose>
          <Button
            disabled={!ready}
            onClick={() => {
              addGoal({ kind, title: title.trim() || DEFAULT_TITLE[kind], topics: chosen, date });
              setOpen(false);
              setChosen([]);
              setTitle('');
              setDate('');
            }}
          >
            Save the plan
          </Button>
        </>
      }
    >
      <div className="flex max-h-dialog flex-col gap-4 overflow-y-auto">
        <ChoiceGroup
          legend="What is it?"
          name="goal-kind"
          options={KINDS}
          value={kind}
          onChange={setKind}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <TextField
            label="Name"
            placeholder={DEFAULT_TITLE[kind]}
            maxLength={80}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label={kind === 'test' ? 'Test date' : 'Revisit by'}
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <fieldset className="flex flex-col gap-3">
          <legend className="pb-2 text-sm font-medium text-fg">
            Topics <span className="text-fg-muted">({chosen.length} chosen)</span>
          </legend>
          {sections.map((section) => {
            const all = section.slugs.every((slug) => chosen.includes(slug));
            return (
              <div key={section.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">{section.label}</span>
                  <Button size="sm" variant="ghost" onClick={() => toggle(section.slugs, !all)}>
                    {all ? 'None' : 'All'}
                  </Button>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {section.slugs.map((slug) => {
                    const on = chosen.includes(slug);
                    return (
                      <li key={slug}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle([slug], !on)}
                          className={
                            on
                              ? 'min-h-8 rounded-full bg-ink px-3 py-1 text-sm font-semibold text-canvas'
                              : 'min-h-8 rounded-full border border-border-strong px-3 py-1 text-sm text-ink hover:bg-surface-muted'
                          }
                        >
                          {titles[slug] ?? slug}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </fieldset>
      </div>
    </Dialog>
  );
}
