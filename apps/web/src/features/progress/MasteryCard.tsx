'use client';

import { topicMastery } from '@medlearn/core';

import type { TopicSummary } from '@/content/topics';

import { useProgress } from './store';

/** A topic's mastery at a glance: the percentage, and a bar each for lesson, practice and recall. */
export function MasteryCard({ topic }: Readonly<{ topic: TopicSummary }>) {
  const mastery = topicMastery(topic, useProgress(), new Date());
  const share = (part: number, whole: number) => (whole === 0 ? 0 : part / whole);
  const parts = [
    { label: 'Lesson', detail: mastery.lessonDone ? 'done' : 'to do', share: +mastery.lessonDone },
    {
      label: 'Practice',
      detail: `${mastery.questionsCorrect}/${mastery.questionsTotal}`,
      share: share(mastery.questionsCorrect, mastery.questionsTotal),
    },
    {
      label: 'Recall',
      detail: `${mastery.cardsReviewed}/${mastery.cardsTotal}`,
      share: share(mastery.cardsReviewed, mastery.cardsTotal),
    },
  ];
  return (
    <section
      aria-labelledby="mastery-title"
      className="flex flex-col gap-2 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="mastery-title"
          className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
        >
          Mastery
        </h2>
        <span className="text-gold font-display text-3xl" suppressHydrationWarning>
          {mastery.percent}%
        </span>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {parts.map((part) => (
          <li key={part.label} className="flex flex-col gap-1">
            <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-border">
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${Math.round(part.share * 100)}%` }}
              />
            </span>
            <span className="text-xs font-semibold text-fg-muted" suppressHydrationWarning>
              {part.label} <span className="font-normal">{part.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
