'use client';

import type { Topic } from '@medlearn/schemas';
import {
  ActionBar,
  Button,
  Card,
  Display,
  Eyebrow,
  Heading,
  Medallion,
  QuestionCard,
  Text,
} from '@medlearn/ui';
import { ArrowRight, CircleCheck } from '@medlearn/ui/icons';
import { useRouter } from 'next/navigation';

import { recordAnswer } from '@/features/progress/store';
import { FlowLayout, FlowProgress, STEP_LABEL } from '@/features/shell/Flow';

const CHECK_QUESTIONS = 2;

/**
 * The end of a lesson: the facts to remember, then two check questions. Missed ones come back
 * as recall cards, so the student leaves knowing what stuck.
 */
export function LessonWrapUp({ topic }: Readonly<{ topic: Topic }>) {
  const router = useRouter();
  const checks = topic.questions.slice(0, CHECK_QUESTIONS);
  const total = topic.lesson.length;

  return (
    <FlowLayout
      label="Lesson complete"
      stageLabel="Check questions"
      framed={false}
      header={
        <FlowProgress
          back={`/learn/${topic.slug}`}
          backLabel="Back to the topic"
          label="Lesson complete"
          done={total}
          total={total}
        />
      }
      panel={
        <div className="flex animate-rise flex-col items-start gap-4">
          <Medallion icon={CircleCheck} size="lg" />
          <div className="flex flex-col gap-2">
            <Eyebrow>{topic.title}</Eyebrow>
            <Display size="lg" as="h2">
              Lesson <em>complete</em>
            </Display>
          </div>
          <h3 className={STEP_LABEL}>Key facts</h3>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            {topic.keyFacts.map((fact) => (
              <li key={fact}>
                <Text>{fact}</Text>
              </li>
            ))}
          </ul>
        </div>
      }
      stage={
        checks.length > 0 ? (
          <>
            <Heading level={2}>Check yourself</Heading>
            {checks.map((question) => (
              <Card key={question.id} tone="glass">
                <QuestionCard
                  prompt={question.prompt}
                  options={question.options}
                  answerId={question.answerId}
                  explanation={question.explanation}
                  onAnswered={(correct) => recordAnswer(question.id, correct)}
                />
              </Card>
            ))}
          </>
        ) : null
      }
      controls={
        <ActionBar floating className="area-bar">
          <Text size="sm" tone="muted" className="pl-2">
            Your recall cards are ready
          </Text>
          <Button iconEnd={ArrowRight} onClick={() => router.push('/today')}>
            Continue to Today
          </Button>
        </ActionBar>
      }
    />
  );
}
