'use client';

import { openQuestionIds } from '@medlearn/core';
import {
  Button,
  buttonClasses,
  Card,
  Display,
  EmptyState,
  Eyebrow,
  QuestionCard,
  Text,
} from '@medlearn/ui';
import { ArrowRight, CircleCheck, ClipboardCheck } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import type { PracticeQuestion, TopicSummary } from '@/content/topics';
import { ContentTrust } from '@/features/content/ContentTrust';
import { recordAnswer, useProgress } from '@/features/progress/store';
import { TaskColumns } from '@/features/shell/Screen';

/** One question at a time from finished lessons; answered ones stay on screen until "Next". */
interface PracticeViewProps {
  topics: TopicSummary[];
  questions: PracticeQuestion[];
}

export function PracticeView({ topics, questions }: Readonly<PracticeViewProps>) {
  const progress = useProgress();
  const [current, setCurrent] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const nextOpen = topics
    .flatMap((topic) => openQuestionIds(topic, progress))
    .find((id) => !done.includes(id));
  const showingId = current ?? nextOpen;
  const showing = questions.find(({ question }) => question.id === showingId);
  const finishedAnyLesson = progress.completedLessons.length > 0;

  return (
    <TaskColumns
      intro={
        <>
          <div className="flex flex-col gap-3">
            <Eyebrow>Practice</Eyebrow>
            <Display size="lg">
              Test <em>yourself</em>
            </Display>
            <Text tone="muted">Questions from the lessons you have finished.</Text>
          </div>
          {showing ? <ContentTrust topic={showing.topic} /> : null}
        </>
      }
    >
      {showing ? (
        <>
          <Card tone="glass">
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
          </Card>
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
        <Card tone="glass">
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
        </Card>
      )}
    </TaskColumns>
  );
}
