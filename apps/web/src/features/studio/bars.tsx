'use client';

import type { CameraStop } from '@medlearn/schemas';
import { Button, cx, IconButton, Text } from '@medlearn/ui';
import { ChevronLeft, ChevronRight, Trash2, Undo2 } from '@medlearn/ui/icons';

import type { QuizState } from './quiz';
import type { Mode } from './session';

// The bar along the bottom of the 3D studio: one per mode.

/** Pen colours stay clear of the anatomical ones (red arteries, blue veins, yellow nerves...). */
export const PENS = [
  { colour: '--color-pen-ink', name: 'Ink', swatch: 'bg-pen-ink' },
  { colour: '--color-pen-violet', name: 'Violet', swatch: 'bg-pen-violet' },
  { colour: '--color-pen-orange', name: 'Orange', swatch: 'bg-pen-orange' },
];

const MODES: Array<{ mode: Mode; label: string }> = [
  { mode: 'explore', label: 'Explore' },
  { mode: 'quiz', label: 'Find it' },
  { mode: 'draw', label: 'Draw' },
];

/** Explore, "Find it" or draw: one segmented switch, the way into each. */
export function ModeSwitch({
  mode,
  onMode,
}: Readonly<{ mode: Mode; onMode: (mode: Mode) => void }>) {
  return (
    <div
      role="group"
      aria-label="Mode"
      className="grid grid-cols-3 gap-1 rounded-md bg-surface-muted p-1"
    >
      {MODES.map((item) => (
        <button
          key={item.mode}
          type="button"
          aria-pressed={mode === item.mode}
          onClick={() => {
            if (mode !== item.mode) onMode(item.mode);
          }}
          className={cx(
            'h-12 rounded-sm text-sm font-semibold transition-colors duration-150',
            mode === item.mode
              ? 'bg-surface text-ink shadow-raised'
              : 'text-fg-muted hover:text-fg',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function BodyBar({
  region,
  count,
  onTopics,
}: Readonly<{ region: string; count: number; onTopics?: (() => void) | undefined }>) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 px-2">
      <Text size="sm">
        <strong>{region}</strong>: {count} {count === 1 ? 'topic' : 'topics'}. Tap a marker to pick
        a region.
      </Text>
      {onTopics ? (
        <Button variant="secondary" onClick={onTopics}>
          Topics
        </Button>
      ) : null}
    </div>
  );
}

export function TourBar({
  stops,
  index,
  onIndex,
}: Readonly<{ stops: CameraStop[]; index: number; onIndex: (index: number) => void }>) {
  const stop = stops[index];
  return (
    <div className="flex items-center gap-2">
      <IconButton
        icon={ChevronLeft}
        label="Previous view"
        disabled={index === 0}
        onClick={() => onIndex(index - 1)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-sm font-semibold text-ink">
          {stop?.title}{' '}
          <span className="font-normal text-fg-muted">
            {index + 1} of {stops.length}
          </span>
        </p>
        <p className="line-clamp-2 text-sm text-fg">{stop?.description}</p>
      </div>
      <IconButton
        icon={ChevronRight}
        label="Next view"
        disabled={index >= stops.length - 1}
        onClick={() => onIndex(index + 1)}
      />
    </div>
  );
}

export function DrawBar({
  pen,
  strokes,
  onPen,
  onUndo,
  onClear,
  onDone,
}: Readonly<{
  pen: string;
  strokes: number;
  onPen: (colour: string) => void;
  onUndo: () => void;
  onClear: () => void;
  onDone: () => void;
}>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <fieldset className="flex gap-2">
        <legend className="sr-only">Pen colour</legend>
        {PENS.map((item) => (
          <button
            key={item.colour}
            type="button"
            aria-label={`${item.name} pen`}
            aria-pressed={pen === item.colour}
            onClick={() => onPen(item.colour)}
            className={cx(
              'size-12 rounded-full border-4 transition-transform duration-150',
              item.swatch,
              pen === item.colour ? 'scale-110 border-gold' : 'border-surface',
            )}
          />
        ))}
      </fieldset>
      <IconButton
        icon={Undo2}
        label="Undo"
        variant="secondary"
        disabled={strokes === 0}
        onClick={onUndo}
      />
      <IconButton
        icon={Trash2}
        label="Clear drawing"
        variant="secondary"
        disabled={strokes === 0}
        onClick={onClear}
      />
      <Text size="xs" tone="muted" className="min-w-0 flex-1">
        Drag on the model to draw. Saved on this phone.
      </Text>
      <Button onClick={onDone}>Done</Button>
    </div>
  );
}

function feedback(quiz: QuizState, pickedName: string): string {
  if (quiz.last === 'right') return 'Right! Next one.';
  if (quiz.last === 'wrong') return `You tapped ${pickedName}. Try again, or turn the model.`;
  return 'Tap it on the model.';
}

export function QuizBar({
  quiz,
  targetName,
  pickedName,
  onSkip,
  onEnd,
}: Readonly<{
  quiz: QuizState;
  targetName: string;
  pickedName: string;
  onSkip: () => void;
  onEnd: () => void;
}>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xl tracking-display text-ink">
          Find: <em>{targetName}</em>
        </p>
        <Text size="sm" tone="muted">
          Score {quiz.score} · Streak {quiz.streak} · Best {quiz.best}
        </Text>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-fg">
          {feedback(quiz, pickedName)}
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onSkip}>
            Skip
          </Button>
          <Button onClick={onEnd}>End</Button>
        </div>
      </div>
    </div>
  );
}
