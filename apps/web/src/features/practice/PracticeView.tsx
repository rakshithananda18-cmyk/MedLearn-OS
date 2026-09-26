'use client';

import { openQuestionIds } from '@medlearn/core';
import { Button, buttonClasses, EmptyState, Heading, QuestionCard, Text } from '@medlearn/ui';
import { ArrowRight, CircleCheck, ClipboardCheck } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import { SampleContentBanner } from '@/features/content/SampleContentBanner';
import { recordAnswer, useProgress } from '@/features/progress/store';

/** One question at a time from finished lessons; answered ones stay on screen until "Next". */
export function PracticeView() {
  const progress = useProgress();
  const [current, setCurrent] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const questions = TOPICS.flatMap((topic) =>
    topic.questions.map((question) => ({ topic, question })),
  );
  const open = PLANNABLE_TOPICS.flatMap((topic) => openQuestionIds(topic, progress)).filter(
    (id) => !done.includes(id),
  );
  const showingId = current ?? open[0];
  const showing = questions.find(({ question }) => question.id === showingId);
  const finishedAnyLesson = progress.completedLessons.length > 0;

  return (
    <>
      <div className="flex flex-col gap-1">
        <Heading level={1}>Practice</Heading>
        <Text tone="muted">Questions from the lessons you have finished.</Text>
      </div>
      {showing ? (
        <>
          <SampleContentBanner reviewed={showing.topic.reviewed} />
          <QuestionCard
            key={showing.question.id}
            prompt={showing.question.prompt}
            options={showing.question.options}
            answerId={showing.question.answerId}
            explanation={showing.question.explanation}
            onAnswered={(correct) => {
              setCurrent(showing.question.id);
              recordAnswer(showing.question.id, correct);
            }}
          />
          {current ? (
            <Button
              iconEnd={ArrowRight}
              onClick={() => {
                setDone([...done, current]);
                setCurrent(null);
              }}
            >
              Next question
            </Button>
          ) : null}
        </>
      ) : (
        <EmptyState
          icon={finishedAnyLesson ? CircleCheck : ClipboardCheck}
          title={finishedAnyLesson ? 'All questions done' : 'Nothing to practise yet'}
          description={
            finishedAnyLesson
              ? 'Questions you got wrong will come back in your next session.'
              : 'Finish a lesson first; its questions will appear here.'
          }
          action={
            <Link href="/today" className={buttonClasses({ variant: 'secondary' })}>
              Back to Today
            </Link>
          }
        />
      )}
    </>
  );
}
