'use client';

import { type TopicMastery, topicMastery } from '@medlearn/core';
import {
  buttonClasses,
  Card,
  Display,
  Eyebrow,
  Icon,
  Medallion,
  Pill,
  ProgressRing,
  Text,
} from '@medlearn/ui';
import { BookOpen, ChevronRight, RotateCcw, Target } from '@medlearn/ui/icons';
import Link from 'next/link';

import type { TopicSummary } from '@/content/topics';
import { AccountCard } from '@/features/account/AccountCard';
import { useProgress } from '@/features/progress/store';

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

function describe(mastery: TopicMastery): string {
  if (!mastery.lessonDone) return 'Not started';
  return [
    'Lesson done',
    `${mastery.questionsCorrect} of ${mastery.questionsTotal} questions`,
    `${mastery.cardsReviewed} of ${mastery.cardsTotal} cards`,
  ].join(' · ');
}

/** Mastery by topic, weak spots to fix and the review backlog. Calm numbers, no streaks. */
export function ProgressView({ topics }: Readonly<{ topics: TopicSummary[] }>) {
  const progress = useProgress();
  const now = new Date();
  const mastery = topics.map((topic) => topicMastery(topic, progress, now));
  const lessonsDone = mastery.filter((item) => item.lessonDone).length;
  const due = mastery.reduce((total, item) => total + item.dueCards, 0);
  const weak = mastery.filter((item) => item.weakSpots > 0);
  const subjects = [...new Set(topics.map((topic) => topic.subjectSlug))];

  return (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow>Progress</Eyebrow>
        <Display>
          How it is <em>going</em>
        </Display>
        <Text tone="muted">Mastery counts the lesson, practice and recall equally.</Text>
        <div className="flex flex-wrap gap-2">
          <Pill icon={BookOpen}>
            {lessonsDone} of {mastery.length} lessons
          </Pill>
          <Pill icon={RotateCcw}>{plural(due, 'review')} due</Pill>
        </div>
      </div>

      <AccountCard />

      {weak.length > 0 ? (
        <Card tone="glass" as="section" aria-labelledby="weak-spots" className="flex gap-4">
          <Medallion icon={Target} />
          <div className="flex flex-1 flex-col gap-2">
            <h2 id="weak-spots" className="font-semibold text-ink">
              Weak spots
            </h2>
            <ul className="flex flex-col gap-1">
              {weak.map((item) => (
                <li key={item.slug}>
                  <Text size="sm" tone="muted">
                    {item.title}: {plural(item.weakSpots, 'missed question')} to recall
                  </Text>
                </li>
              ))}
            </ul>
            <div>
              <Link href="/revise" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                Revise them
              </Link>
            </div>
          </div>
        </Card>
      ) : null}

      {subjects.map((subject) => (
        <section
          key={subject}
          aria-labelledby={`progress-${subject}`}
          className="flex flex-col gap-3"
        >
          <h2
            id={`progress-${subject}`}
            className="font-display text-2xl tracking-display text-ink capitalize"
          >
            {subject}
          </h2>
          <ul className="flex flex-col gap-2">
            {topics
              .filter((topic) => topic.subjectSlug === subject)
              .map((topic) => {
                const item = mastery.find((entry) => entry.slug === topic.slug);
                if (!item) return null;
                return (
                  <li key={topic.slug}>
                    <Link
                      href={`/learn/${topic.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-glass-border bg-glass p-4 shadow-glass transition-colors duration-150 hover:border-gold"
                    >
                      <ProgressRing value={item.percent} label={`${topic.title} mastery`} />
                      <span className="flex flex-1 flex-col">
                        <span className="font-semibold text-ink">{topic.title}</span>
                        <span className="text-sm text-fg-muted">{describe(item)}</span>
                      </span>
                      <Icon icon={ChevronRight} className="text-fg-muted" />
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </>
  );
}
