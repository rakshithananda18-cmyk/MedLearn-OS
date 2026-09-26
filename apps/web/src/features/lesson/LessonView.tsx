'use client';

import type { LessonStep, PathVisual, Topic } from '@medlearn/schemas';
import { ActionBar, Button, Heading, StepDots, Text, ToggleChip } from '@medlearn/ui';
import { ArrowRight, ChevronLeft, CircleCheck } from '@medlearn/ui/icons';
import {
  type BloodConditions,
  DissociationCurve,
  NORMAL_BLOOD,
  PathTracer,
} from '@medlearn/visuals';
import { useState } from 'react';

import { completeLesson } from '@/features/progress/store';

import { LessonWrapUp } from './LessonWrapUp';

interface VisualProps {
  topic: Topic;
  step: LessonStep;
  /** The last step lets the student explore freely. */
  explore: boolean;
}

/** Nerve-pathway lesson visual: highlights the step's nodes; the last step adds tracing and lesions. */
function PathLesson({ topic, visual, step, explore }: VisualProps & { visual: PathVisual }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [lesionId, setLesionId] = useState<string | null>(null);
  const lesion = visual.lesions.find((item) => item.id === lesionId);

  return (
    <div className="flex flex-col gap-4">
      <PathTracer
        diagram={visual.diagram}
        title={`${topic.title} diagram`}
        focus={step.focus}
        selectedId={explore ? selected : null}
        onSelect={
          explore
            ? (id) => {
                setSelected(id);
                setLesionId(null);
              }
            : undefined
        }
        lesion={lesion?.nodeIds ?? []}
      />
      {explore && visual.lesions.length > 0 ? (
        <div className="flex flex-col gap-2">
          <Text size="sm" weight="semibold">
            Clinical correlation
          </Text>
          <div role="group" aria-label="Show a lesion" className="flex flex-wrap gap-2">
            {visual.lesions.map((item) => (
              <ToggleChip
                key={item.id}
                tone="danger"
                pressed={lesionId === item.id}
                onClick={() => {
                  setLesionId(lesionId === item.id ? null : item.id);
                  setSelected(null);
                }}
              >
                {item.label}
              </ToggleChip>
            ))}
          </div>
          {lesion ? <Text size="sm">{lesion.explanation}</Text> : null}
        </div>
      ) : null}
    </div>
  );
}

/** Curve lesson visual: each step sets the conditions; the last step hands over the sliders. */
function CurveLesson({ step, explore }: VisualProps) {
  const [explored, setExplored] = useState<BloodConditions>(NORMAL_BLOOD);
  return (
    <DissociationCurve
      title="Oxygen–haemoglobin dissociation curve"
      conditions={explore ? explored : { ...NORMAL_BLOOD, ...step.conditions }}
      onChange={explore ? setExplored : undefined}
    />
  );
}

/** A visual lesson: short steps over one interactive visual, ending with free exploration. */
export function LessonView({ topic }: { topic: Topic }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const step = topic.lesson[stepIndex] ?? topic.lesson[0];
  if (!step) return null;
  if (finished) return <LessonWrapUp topic={topic} />;
  const isLast = stepIndex === topic.lesson.length - 1;
  const { visual } = topic;

  // Finishing unlocks the topic's recall cards and practice, then shows the wrap-up.
  const finish = () => {
    completeLesson(topic.slug);
    setFinished(true);
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
        <div className="lg:sticky lg:top-12 lg:col-span-3 lg:self-start">
          {visual.kind === 'path' ? (
            <PathLesson key={step.id} topic={topic} visual={visual} step={step} explore={isLast} />
          ) : (
            <CurveLesson key={step.id} topic={topic} step={step} explore={isLast} />
          )}
        </div>

        <div className="order-first flex flex-col gap-6 lg:order-last lg:col-span-2">
          <StepDots count={topic.lesson.length} current={stepIndex} />
          <div key={step.id} className="flex animate-rise flex-col gap-2">
            <Heading level={2}>{step.title}</Heading>
            <Text>{step.body}</Text>
          </div>
        </div>
      </div>
      <ActionBar floating>
        <Button
          variant="ghost"
          iconStart={ChevronLeft}
          disabled={stepIndex === 0}
          onClick={() => setStepIndex(stepIndex - 1)}
        >
          Back
        </Button>
        {isLast ? (
          <Button iconEnd={CircleCheck} onClick={finish}>
            Finish lesson
          </Button>
        ) : (
          <Button iconEnd={ArrowRight} onClick={() => setStepIndex(stepIndex + 1)}>
            Next
          </Button>
        )}
      </ActionBar>
    </>
  );
}
