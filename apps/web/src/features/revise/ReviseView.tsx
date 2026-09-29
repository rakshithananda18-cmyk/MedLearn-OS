'use client';

import { dueCardIds } from '@medlearn/core';
import { buttonClasses, Card, Display, EmptyState, Eyebrow, RecallCard, Text } from '@medlearn/ui';
import { CircleCheck } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import type { DeckCard, TopicSummary } from '@/content/topics';
import { ContentTrust } from '@/features/content/ContentTrust';
import { rateCard, useProgress } from '@/features/progress/store';
import { TaskColumns } from '@/features/shell/Screen';

interface ReviseViewProps {
  topics: TopicSummary[];
  /** Every recall card, including the ones missed questions become. */
  cards: DeckCard[];
  topic?: Pick<TopicSummary, 'slug' | 'title'>;
  /** Today supplies its planned count; direct review keeps the global due queue. */
  limit?: number;
}

interface ReviseIntroProps {
  topic?: ReviseViewProps['topic'];
  showing?: DeckCard;
  remainingCount: number;
  limit?: number;
  backHref: string;
  backLabel: string;
}

function reviewStatus(remainingCount: number, limit?: number) {
  if (remainingCount === 0) {
    return 'Cards come back here just before you would forget them.';
  }
  const count = `${remainingCount} ${remainingCount === 1 ? 'card' : 'cards'}`;
  if (limit === undefined) {
    return `${count} due. Answer in your head, then check.`;
  }
  return `${count} left in this session. Answer in your head, then check.`;
}

function ReviseIntro({
  topic,
  showing,
  remainingCount,
  limit,
  backHref,
  backLabel,
}: Readonly<ReviseIntroProps>) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow>Revise{topic ? ` · ${topic.title}` : ''}</Eyebrow>
        <Display size="lg">
          Recall, <em>then check</em>
        </Display>
        <Text tone="muted">{reviewStatus(remainingCount, limit)}</Text>
        {topic || limit !== undefined ? (
          <div>
            <Link href={backHref} className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
              {backLabel}
            </Link>
          </div>
        ) : null}
      </div>
      {showing ? <ContentTrust topic={showing.topic} /> : null}
    </>
  );
}

interface ReviseEmptyProps {
  sessionComplete: boolean;
  reviewed: number;
  dueCount: number;
  lessonDone: boolean;
  topic?: ReviseViewProps['topic'];
  backHref: string;
  backLabel: string;
}

function reviewEmptyDescription({
  sessionComplete,
  reviewed,
  dueCount,
  lessonDone,
  topic,
}: Readonly<ReviseEmptyProps>) {
  if (sessionComplete) {
    const count = `${reviewed} ${reviewed === 1 ? 'card' : 'cards'}`;
    if (dueCount > 0) {
      return `You reviewed ${count}. Your remaining reviews are saved for another session.`;
    }
    return `You reviewed ${count}. Your next reviews will appear when they are due.`;
  }
  if (topic && !lessonDone) {
    return `Finish the ${topic.title} lesson to unlock its recall cards.`;
  }
  if (lessonDone) {
    return 'You are up to date. Your next reviews will appear when they are due.';
  }
  return 'Finish lessons to unlock their recall cards.';
}

function ReviseEmpty(props: Readonly<ReviseEmptyProps>) {
  const { sessionComplete, lessonDone, topic, backHref, backLabel } = props;
  const needsLesson = topic && !lessonDone;
  const actionHref = needsLesson ? `/learn/${topic.slug}/lesson` : backHref;
  const actionLabel = needsLesson ? 'Start this lesson' : backLabel;
  return (
    <Card tone="glass">
      <EmptyState
        icon={CircleCheck}
        title={sessionComplete ? 'Review session complete' : 'No reviews due'}
        description={reviewEmptyDescription(props)}
        action={
          <Link href={actionHref} className={buttonClasses({ variant: 'secondary' })}>
            {actionLabel}
          </Link>
        }
      />
    </Card>
  );
}

/** Spaced recall: a Today session has a fixed queue once the student rates the first card. */
export function ReviseView({ topics, cards, topic, limit }: Readonly<ReviseViewProps>) {
  const progress = useProgress();
  // Wait for the first rating to capture the queue: server rendering has no saved progress yet.
  const [session, setSession] = useState<string[] | null>(null);
  const [reviewed, setReviewed] = useState(0);
  const due = dueCardIds(topics, progress, new Date());
  const queue = limit === undefined ? due : (session ?? due.slice(0, limit));
  const remaining = queue.filter((id) => due.includes(id));
  const showing = cards.find((card) => card.id === remaining[0]);
  const sessionComplete = limit !== undefined && session !== null && !showing;
  const lessonDone = topics.some((item) => progress.completedLessons.includes(item.slug));
  const backHref = topic ? `/learn/${topic.slug}` : '/today';
  const backLabel = topic ? `Back to ${topic.title}` : 'Back to Today';

  return (
    <TaskColumns
      intro={
        <ReviseIntro
          topic={topic}
          showing={showing}
          remainingCount={remaining.length}
          limit={limit}
          backHref={backHref}
          backLabel={backLabel}
        />
      }
    >
      {showing ? (
        <Card tone="glass" className="flex flex-col gap-3">
          {showing.fromMistake ? <Eyebrow>From a question you missed</Eyebrow> : null}
          <RecallCard
            key={showing.id}
            front={showing.front}
            back={showing.back}
            onRate={(rating) => {
              if (limit !== undefined) {
                setSession(remaining.filter((id) => id !== showing.id));
                setReviewed((count) => count + 1);
              }
              rateCard(showing.id, rating);
            }}
          />
        </Card>
      ) : (
        <ReviseEmpty
          sessionComplete={sessionComplete}
          reviewed={reviewed}
          dueCount={due.length}
          lessonDone={lessonDone}
          topic={topic}
          backHref={backHref}
          backLabel={backLabel}
        />
      )}
    </TaskColumns>
  );
}
