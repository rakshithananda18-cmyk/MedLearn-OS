'use client';

import { dueCardIds, mistakeCardId } from '@medlearn/core';
import type { Topic } from '@medlearn/schemas';
import { buttonClasses, Card, Display, EmptyState, Eyebrow, RecallCard, Text } from '@medlearn/ui';
import { CircleCheck } from '@medlearn/ui/icons';
import Link from 'next/link';

import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import { ContentTrust } from '@/features/content/ContentTrust';
import { rateCard, useProgress } from '@/features/progress/store';

interface DeckCard {
  topic: Topic;
  id: string;
  front: string;
  back: string;
  fromMistake: boolean;
}

/** Every recall card: the topic's own cards plus one for each question the student missed. */
function allCards(): DeckCard[] {
  return TOPICS.flatMap((topic) => [
    ...topic.cards.map((card) => ({ topic, ...card, fromMistake: false })),
    ...topic.questions.map((question) => {
      const answer = question.options.find((option) => option.id === question.answerId);
      return {
        topic,
        id: mistakeCardId(question.id),
        front: question.prompt,
        back: `${answer?.text ?? ''}. ${question.explanation}`,
        fromMistake: true,
      };
    }),
  ]);
}

/** Spaced recall: due cards one at a time; each rating reschedules the card. */
export function ReviseView() {
  const progress = useProgress();
  const due = dueCardIds(PLANNABLE_TOPICS, progress, new Date());
  const showing = allCards().find((card) => card.id === due[0]);

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
          <ContentTrust topic={showing.topic} />
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
    </>
  );
}
