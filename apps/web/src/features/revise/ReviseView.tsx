'use client';

import { dueCardIds } from '@medlearn/core';
import { buttonClasses, Card, Display, EmptyState, Eyebrow, RecallCard, Text } from '@medlearn/ui';
import { CircleCheck } from '@medlearn/ui/icons';
import Link from 'next/link';

import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import { SampleContentBanner } from '@/features/content/SampleContentBanner';
import { rateCard, useProgress } from '@/features/progress/store';

/** Spaced recall: due cards one at a time; each rating reschedules the card. */
export function ReviseView() {
  const progress = useProgress();
  const due = dueCardIds(PLANNABLE_TOPICS, progress, new Date());
  const cards = TOPICS.flatMap((topic) => topic.cards.map((card) => ({ topic, card })));
  const showing = cards.find(({ card }) => card.id === due[0]);

  return (
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
      {showing ? (
        <>
          <SampleContentBanner reviewed={showing.topic.reviewed} />
          <Card tone="glass">
            <RecallCard
              key={showing.card.id}
              front={showing.card.front}
              back={showing.card.back}
              onRate={(rating) => rateCard(showing.card.id, rating)}
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
    </>
  );
}
