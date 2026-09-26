'use client';

import type { Topic } from '@medlearn/schemas';
import { Button, cx, Heading, ProgressBar, Stack, Text } from '@medlearn/ui';
import { ArrowRight, ChevronLeft, CircleCheck } from '@medlearn/ui/icons';
import { PathTracer } from '@medlearn/visuals';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { completeLesson } from '@/features/progress/store';

/** A visual lesson: short steps over one interactive diagram, ending with free exploration. */
export function LessonView({ topic }: { topic: Topic }) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [lesionId, setLesionId] = useState<string | null>(null);

  const step = topic.lesson[stepIndex] ?? topic.lesson[0];
  if (!step) return null;
  const isLast = stepIndex === topic.lesson.length - 1;
  const lesion = topic.lesions.find((item) => item.id === lesionId);

  const goTo = (index: number) => {
    setStepIndex(index);
    setSelected(null);
    setLesionId(null);
  };

  const finish = () => {
    completeLesson(topic.slug);
    router.push('/today');
  };

  return (
    <Stack gap={4}>
      <ProgressBar
        label={`Step ${stepIndex + 1} of ${topic.lesson.length}`}
        value={stepIndex + 1}
        max={topic.lesson.length}
      />
      <Stack gap={2}>
        <Heading level={2}>{step.title}</Heading>
        <Text>{step.body}</Text>
      </Stack>

      <PathTracer
        diagram={topic.diagram}
        title={`${topic.title} diagram`}
        focus={step.focus}
        selectedId={isLast ? selected : null}
        onSelect={
          isLast
            ? (id) => {
                setSelected(id);
                setLesionId(null);
              }
            : undefined
        }
        lesion={lesion?.nodeIds ?? []}
      />

      {isLast && topic.lesions.length > 0 ? (
        <Stack gap={2}>
          <Text size="sm" weight="semibold">
            Clinical correlation
          </Text>
          <div role="group" aria-label="Show a lesion" className="flex flex-wrap gap-2">
            {topic.lesions.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={lesionId === item.id}
                onClick={() => {
                  setLesionId(lesionId === item.id ? null : item.id);
                  setSelected(null);
                }}
                className={cx(
                  'min-h-12 rounded-full border px-4 text-sm font-medium transition-colors duration-150',
                  lesionId === item.id
                    ? 'border-danger bg-danger-subtle text-danger'
                    : 'border-border-strong bg-surface text-fg hover:bg-surface-muted',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          {lesion ? <Text size="sm">{lesion.explanation}</Text> : null}
        </Stack>
      ) : null}

      <div className="flex justify-between gap-3">
        <Button
          variant="ghost"
          iconStart={ChevronLeft}
          disabled={stepIndex === 0}
          onClick={() => goTo(stepIndex - 1)}
        >
          Back
        </Button>
        {isLast ? (
          <Button iconEnd={CircleCheck} onClick={finish}>
            Finish lesson
          </Button>
        ) : (
          <Button iconEnd={ArrowRight} onClick={() => goTo(stepIndex + 1)}>
            Next
          </Button>
        )}
      </div>
    </Stack>
  );
}
