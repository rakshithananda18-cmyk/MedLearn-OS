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
        <>
          <div className="flex flex-col gap-3">
            <Eyebrow>Revise{topic ? ` · ${topic.title}` : ''}</Eyebrow>
            <Display size="lg">
              Recall, <em>then check</em>
            </Display>
            <Text tone="muted">
              {remaining.length > 0
                ? limit === undefined
                  ? `${remaining.length} ${remaining.length === 1 ? 'card' : 'cards'} due. Answer in your head, then check.`
                  : `${remaining.length} ${remaining.length === 1 ? 'card' : 'cards'} left in this session. Answer in your head, then check.`
                : 'Cards come back here just before you would forget them.'}
            </Text>
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
        <Card tone="glass">
          <EmptyState
            icon={CircleCheck}
            title={sessionComplete ? 'Review session complete' : 'No reviews due'}
            description={
              sessionComplete
                ? `You reviewed ${reviewed} ${reviewed === 1 ? 'card' : 'cards'}. ${due.length > 0 ? 'Your remaining reviews are saved for another session.' : 'Your next reviews will appear when they are due.'}`
                : topic && !lessonDone
                  ? `Finish the ${topic.title} lesson to unlock its recall cards.`
                  : lessonDone
                    ? 'You are up to date. Your next reviews will appear when they are due.'
                    : 'Finish lessons to unlock their recall cards.'
            }
            action={
              <Link
                href={topic && !lessonDone ? `/learn/${topic.slug}/lesson` : backHref}
                className={buttonClasses({ variant: 'secondary' })}
              >
                {topic && !lessonDone ? 'Start this lesson' : backLabel}
              </Link>
            }
          />
        </Card>
      )}
    </TaskColumns>
  );
}
