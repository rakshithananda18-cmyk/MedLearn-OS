'use client';

import type { LessonStep, PathVisual, Topic } from '@medlearn/schemas';
import { ActionBar, Button, Display, Eyebrow, Heading, Text, ToggleChip } from '@medlearn/ui';
import { ArrowRight, ChevronLeft, CircleCheck } from '@medlearn/ui/icons';
import {
  AngleExplorer,
  ANGLES,
  type BloodConditions,
  DissociationCurve,
  NORMAL_BLOOD,
  PathTracer,
} from '@medlearn/visuals';
import { useEffect, useId, useRef, useState } from 'react';

import { ContentTrust } from '@/features/content/ContentTrust';
import { completeLesson } from '@/features/progress/store';
import { FlowLayout, FlowProgress, STEP_LABEL, StepList } from '@/features/shell/Flow';

import { clearLessonStep, saveLessonStep, useLessonStep } from './checkpoint';
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
export function LessonView({ topic, digest }: Readonly<{ topic: Topic; digest?: string }>) {
  const total = topic.lesson.length;
  // A lesson left part way opens where the student stopped, until they move or start over.
  const saved = useLessonStep(topic.slug);
  const resumeAt = saved === null ? null : Math.min(saved, total - 1);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const stepIndex = picked ?? resumeAt ?? 0;
  // After Next, Back or a step tap, the new explanation is brought into view and focused, so it
  // never changes out of sight above a stacked visual. Other renders leave the scroll alone.
  const moved = useRef(false);
  const headingId = `${useId()}-step`;
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    const heading = document.getElementById(headingId);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: 'nearest' });
  }, [stepIndex, headingId]);
  const step = topic.lesson[stepIndex] ?? topic.lesson[0];
  if (!step) return null;
  if (finished) return <LessonWrapUp topic={topic} />;
  const isLast = stepIndex === total - 1;
  const { visual } = topic;
  const resumed = picked === null && resumeAt !== null && resumeAt > 0;

  const go = (index: number) => {
    moved.current = true;
    setPicked(index);
    saveLessonStep(topic.slug, index);
  };
  // Finishing unlocks the topic's recall cards and practice, then shows the wrap-up.
  const finish = () => {
    clearLessonStep(topic.slug);
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
          <ContentTrust topic={{ ...topic, contentDigest: digest }} />
        </>
      }
      panel={
        <>
          <div className="flex flex-col gap-2">
            <Eyebrow>Visual lesson</Eyebrow>
            <Display size="lg">{topic.title}</Display>
          </div>
          {resumed ? (
            <p className="flex flex-wrap items-center gap-x-2 text-sm text-fg-muted">
              Picked up where you left off.
              <Button variant="ghost" size="sm" onClick={() => go(0)}>
                Start over
              </Button>
            </p>
          ) : null}
          <div key={step.id} className="flex animate-rise flex-col gap-2">
            <Heading level={2} id={headingId} tabIndex={-1} className="scroll-mt-4">
              {step.title}
            </Heading>
            <Text>{step.body}</Text>
          </div>
          {/* Where this step sits in the lesson, on screens with room beside the visual. */}
          <div className="hidden flex-col gap-1 xl:flex">
            <h3 className={STEP_LABEL}>Steps</h3>
            <StepList label="Lesson steps" steps={topic.lesson} index={stepIndex} onIndex={go} />
          </div>
        </>
      }
      stage={
        // A step that names an angle hands the student its slider in place of the diagram.
        step.interactive ? (
          <AngleExplorer key={step.id} spec={ANGLES[step.interactive]} />
        ) : visual.kind === 'path' ? (
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
            onClick={() => go(stepIndex - 1)}
          >
            Back
          </Button>
          {isLast ? (
            <Button iconEnd={CircleCheck} onClick={finish}>
              Finish lesson
            </Button>
          ) : (
            <Button iconEnd={ArrowRight} onClick={() => go(stepIndex + 1)}>
              Next
            </Button>
          )}
        </ActionBar>
      }
    />
  );
}
