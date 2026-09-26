'use client';

import type { DrillStep, PathDiagram } from '@medlearn/schemas';
import { ActionBar, Button, Card, cx, Heading, Medallion, StepDots, Text } from '@medlearn/ui';
import { ArrowRight, CircleCheck, PenLine } from '@medlearn/ui/icons';
import {
  DiagramTrainer,
  isDrillDone,
  isStepDone,
  labelBank,
  nextStep,
  placeLabel,
  selectBlank,
  startDrill,
} from '@medlearn/visuals';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { completeDrill } from '@/features/progress/store';

export interface DrillViewProps {
  topicSlug: string;
  title: string;
  diagram: PathDiagram;
  steps: DrillStep[];
}

/** Exam diagram trainer: label each layer from a bank of labels, then draw it on paper. */
export function DrillView({ topicSlug, title, diagram, steps }: DrillViewProps) {
  const router = useRouter();
  const [state, setState] = useState(() => startDrill(steps));
  const [wrong, setWrong] = useState<string | null>(null);
  const step = steps[state.stepIndex];
  if (!step) return null;
  const stepDone = isStepDone(steps, state);
  const drillDone = isDrillDone(steps, state);
  const next = steps[state.stepIndex + 1];

  const choose = (label: string) => {
    const result = placeLabel(diagram, steps, state, label);
    setState(result.state);
    setWrong(result.correct ? null : label);
  };

  const finish = () => {
    completeDrill(topicSlug);
    router.push('/today');
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
        <div className="lg:sticky lg:top-12 lg:col-span-3 lg:self-start">
          <DiagramTrainer
            diagram={diagram}
            steps={steps}
            state={state}
            title={`${title} exam diagram`}
            onSelectBlank={(id) => setState(selectBlank(steps, state, id))}
          />
        </div>

        <div className="order-first flex flex-col gap-6 lg:order-last lg:col-span-2">
          <StepDots count={steps.length} current={state.stepIndex} />
          {drillDone ? (
            <Card tone="glass" className="flex animate-rise flex-col items-start gap-4">
              <Medallion icon={PenLine} size="lg" />
              <Heading level={2}>Diagram built</Heading>
              <Text>
                {state.mistakes === 0
                  ? 'Every label right first time.'
                  : `Built with ${state.mistakes} ${state.mistakes === 1 ? 'correction' : 'corrections'}.`}{' '}
                Now draw it on paper from memory, then compare it with the screen.
              </Text>
            </Card>
          ) : (
            <div key={step.id} className="flex animate-rise flex-col gap-2">
              <Heading level={2}>{step.title}</Heading>
              <Text tone="muted">{step.hint}</Text>
              <Text size="sm" weight="semibold">
                Tap the label for the highlighted blank.
              </Text>
            </div>
          )}
        </div>
      </div>
      <ActionBar floating>
        <div className="flex w-full flex-col gap-2 p-1">
          <div role="status" className="text-sm text-fg empty:hidden">
            {wrong ? `Not ${wrong}. Look at where the blank sits, then try again.` : ''}
          </div>
          {stepDone ? (
            <div className="flex items-center justify-between gap-3">
              <Text size="sm" tone="muted" className="pl-1">
                {drillDone ? 'All layers done' : `${step.title} done`}
              </Text>
              {drillDone ? (
                <Button iconEnd={CircleCheck} onClick={finish}>
                  Finish
                </Button>
              ) : (
                <Button
                  iconEnd={ArrowRight}
                  onClick={() => {
                    setState(nextStep(steps, state));
                    setWrong(null);
                  }}
                >
                  Next: {next?.title}
                </Button>
              )}
            </div>
          ) : (
            <div role="group" aria-label="Labels" className="flex flex-wrap gap-2">
              {labelBank(diagram, steps, state).map((label) => (
                <Button
                  key={label}
                  variant="secondary"
                  onClick={() => choose(label)}
                  className={cx(wrong === label && 'animate-shake')}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </ActionBar>
    </>
  );
}
