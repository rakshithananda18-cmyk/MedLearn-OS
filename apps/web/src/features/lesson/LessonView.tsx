'use client';

import type { LessonStep, PathVisual, Topic } from '@medlearn/schemas';
import { ActionBar, Button, Display, Eyebrow, Heading, Text, ToggleChip } from '@medlearn/ui';
import { ArrowRight, ChevronLeft, CircleCheck } from '@medlearn/ui/icons';
import {
  type BloodConditions,
  DissociationCurve,
  NORMAL_BLOOD,
  PathTracer,
} from '@medlearn/visuals';
import { useState } from 'react';

import { ContentTrust } from '@/features/content/ContentTrust';
import { completeLesson } from '@/features/progress/store';
import { FlowLayout, FlowProgress, STEP_LABEL, StepList } from '@/features/shell/Flow';

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
    <div className="flex h-full flex-col gap-4">
      <div className="min-h-0 flex-1">
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
      </div>
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

/**
 * A visual lesson: short steps over one interactive visual, ending with free exploration. The
 * step reads on the right and the visual fills a stage on the left on wide screens; on phones
 * the step comes first, the visual under it.
 */
export function LessonView({ topic }: Readonly<{ topic: Topic }>) {
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const step = topic.lesson[stepIndex] ?? topic.lesson[0];
  if (!step) return null;
  if (finished) return <LessonWrapUp topic={topic} />;
  const isLast = stepIndex === topic.lesson.length - 1;
  const { visual } = topic;
  const total = topic.lesson.length;

  // Finishing unlocks the topic's recall cards and practice, then shows the wrap-up.
  const finish = () => {
    completeLesson(topic.slug, topic.estimatedMinutes);
    setFinished(true);
  };

  return (
    <FlowLayout
      label="Lesson step"
      stageLabel="Lesson visual"
      header={
        <>
          <FlowProgress
            back={`/learn/${topic.slug}`}
            backLabel="Back to the topic"
            label={`Step ${stepIndex + 1} of ${total}`}
            done={stepIndex + 1}
            total={total}
          />
          <ContentTrust topic={topic} />
        </>
      }
      panel={
        <>
          <div className="flex flex-col gap-2">
            <Eyebrow>Visual lesson</Eyebrow>
            <Display size="lg">{topic.title}</Display>
          </div>
          <div key={step.id} className="flex animate-rise flex-col gap-2">
            <Heading level={2}>{step.title}</Heading>
            <Text>{step.body}</Text>
          </div>
          {/* Where this step sits in the lesson, on screens with room beside the visual. */}
          <div className="hidden flex-col gap-1 xl:flex">
            <h3 className={STEP_LABEL}>Steps</h3>
            <StepList
              label="Lesson steps"
              steps={topic.lesson}
              index={stepIndex}
              onIndex={setStepIndex}
            />
          </div>
        </>
      }
      stage={
        visual.kind === 'path' ? (
          <PathLesson key={step.id} topic={topic} visual={visual} step={step} explore={isLast} />
        ) : (
          <CurveLesson key={step.id} topic={topic} step={step} explore={isLast} />
        )
      }
      controls={
        <ActionBar floating className="area-bar">
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
      }
    />
  );
}
