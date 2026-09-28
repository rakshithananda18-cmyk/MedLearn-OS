'use client';

import { dueCardIds } from '@medlearn/core';
import { buttonClasses, Card, Display, EmptyState, Eyebrow, RecallCard, Text } from '@medlearn/ui';
import { CircleCheck } from '@medlearn/ui/icons';
import Link from 'next/link';

import type { DeckCard, TopicSummary } from '@/content/topics';
import { ContentTrust } from '@/features/content/ContentTrust';
import { rateCard, useProgress } from '@/features/progress/store';
import { TaskColumns } from '@/features/shell/Screen';

interface ReviseViewProps {
  topics: TopicSummary[];
  /** Every recall card, including the ones missed questions become. */
  cards: DeckCard[];
}

/** Spaced recall: due cards one at a time; each rating reschedules the card. */
export function ReviseView({ topics, cards }: Readonly<ReviseViewProps>) {
  const progress = useProgress();
  const due = dueCardIds(topics, progress, new Date());
  const showing = cards.find((card) => card.id === due[0]);

  return (
    <TaskColumns
      intro={
        <>
          <div className="flex flex-col gap-3">
            <Eyebrow>Revise</Eyebrow>
            <Display size="lg">
              Recall, <em>then check</em>
            </Display>
            <Text tone="muted">
              {due.length > 0
                ? `${due.length} ${due.length === 1 ? 'card' : 'cards'} due. Answer in your head, then check.`
                : 'Cards come back here just before you would forget them.'}
            </Text>
          </div>
          {showing ? <ContentTrust topic={showing.topic} /> : null}
        </>
      }
    >
      {showing ? (
        <>
          <Card tone="glass" className="flex flex-col gap-3">
            {showing.fromMistake ? <Eyebrow>From a question you missed</Eyebrow> : null}
            <RecallCard
              key={showing.id}
              front={showing.front}
              back={showing.back}
              onRate={(rating) => rateCard(showing.id, rating)}
            />
          </Card>
        </>
      ) : (
        <Card tone="glass">
          <EmptyState
            icon={CircleCheck}
            title="No reviews due"
            description="Finish lessons to unlock their recall cards."
            action={
              <Link href="/today" className={buttonClasses({ variant: 'secondary' })}>
                Back to Today
              </Link>
            }
          />
        </Card>
      )}
    </TaskColumns>
  );
}
