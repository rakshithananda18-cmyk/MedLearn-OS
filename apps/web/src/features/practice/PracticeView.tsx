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
  topic?: Pick<TopicSummary, 'slug' | 'title'>;
}

interface PracticeIntroProps {
  topic?: PracticeViewProps['topic'];
  showing?: PracticeQuestion;
  backHref: string;
  backLabel: string;
}

function PracticeIntro({ topic, showing, backHref, backLabel }: Readonly<PracticeIntroProps>) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow>Practice{topic ? ` · ${topic.title}` : ''}</Eyebrow>
        <Display size="lg">
          Test <em>yourself</em>
        </Display>
        <Text tone="muted">
          {topic
            ? `Questions for ${topic.title}.`
            : 'Questions from the lessons you have finished.'}
        </Text>
        {topic ? (
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

function practiceEmptyDetails(
  finishedAnyLesson: boolean,
  topic: PracticeViewProps['topic'],
  backHref: string,
  backLabel: string,
) {
  if (finishedAnyLesson) {
    return {
      icon: CircleCheck,
      title: 'All questions done',
      description: 'Questions you got wrong will come back in your next session.',
      actionHref: backHref,
      actionLabel: backLabel,
    };
  }
  if (topic) {
    return {
      icon: ClipboardCheck,
      title: 'Nothing to practise yet',
      description: `Finish the ${topic.title} lesson to unlock its questions.`,
      actionHref: `/learn/${topic.slug}/lesson`,
      actionLabel: 'Start this lesson',
    };
  }
  return {
    icon: ClipboardCheck,
    title: 'Nothing to practise yet',
    description: 'Finish a lesson first; its questions will appear here.',
    actionHref: backHref,
    actionLabel: backLabel,
  };
}

interface PracticeEmptyProps {
  finishedAnyLesson: boolean;
  topic?: PracticeViewProps['topic'];
  backHref: string;
  backLabel: string;
}

function PracticeEmpty({
  finishedAnyLesson,
  topic,
  backHref,
  backLabel,
}: Readonly<PracticeEmptyProps>) {
  const details = practiceEmptyDetails(finishedAnyLesson, topic, backHref, backLabel);
  return (
    <Card tone="glass">
      <EmptyState
        icon={details.icon}
        title={details.title}
        description={details.description}
        action={
          <Link href={details.actionHref} className={buttonClasses({ variant: 'secondary' })}>
            {details.actionLabel}
          </Link>
        }
      />
    </Card>
  );
}

export function PracticeView({ topics, questions, topic }: Readonly<PracticeViewProps>) {
  const progress = useProgress();
  const [current, setCurrent] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const nextOpen = topics
    .flatMap((item) => openQuestionIds(item, progress))
    .find((id) => !done.includes(id));
  const showingId = current ?? nextOpen;
  const showing = questions.find(({ question }) => question.id === showingId);
  const finishedAnyLesson = topics.some((item) => progress.completedLessons.includes(item.slug));
  const backHref = topic ? `/learn/${topic.slug}` : '/today';
  const backLabel = topic ? `Back to ${topic.title}` : 'Back to Today';

  return (
    <TaskColumns
      intro={
        <PracticeIntro topic={topic} showing={showing} backHref={backHref} backLabel={backLabel} />
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
        <PracticeEmpty
          finishedAnyLesson={finishedAnyLesson}
          topic={topic}
          backHref={backHref}
          backLabel={backLabel}
        />
      )}
    </TaskColumns>
  );
}
