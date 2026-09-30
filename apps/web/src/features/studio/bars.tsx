'use client';

import type { CameraStop } from '@medlearn/schemas';
import { Badge, Button, cx, Icon, IconButton, Text } from '@medlearn/ui';
import { ChevronLeft, ChevronRight, Flame, Trash2, Undo2, X } from '@medlearn/ui/icons';
import type { ReactNode } from 'react';

import { type QuizState, ROUND, roundOver } from './quiz';
import type { Mode } from './session';

// The controls along the bottom of the 3D studio, one set per mode, and the "Find it" pieces.

const TILE = 'rounded-md border border-glass-border bg-glass shadow-glass backdrop-blur-md';

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
    <fieldset className="grid grid-cols-3 gap-1 rounded-md bg-surface-muted p-1">
      <legend className="sr-only">Mode</legend>
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
    </fieldset>
  );
}

/** The guided views one at a time, with a line on what each shows. */
export function TourBar({
  stops,
  index,
  onIndex,
  tour,
}: Readonly<{
  stops: CameraStop[];
  index: number;
  onIndex: (index: number) => void;
  /** The play or pause button for the guided tour. */
  tour?: ReactNode;
}>) {
  const stop = stops[index];
  return (
    <div className="flex items-center gap-2">
      {tour}
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
        Drag on the model to draw. Saved on this device.
      </Text>
      <Button onClick={onDone}>Done</Button>
    </div>
  );
}

/** The top of "Find it": end the game, how far through the round, and the streak. */
export function QuizProgress({ quiz, onEnd }: Readonly<{ quiz: QuizState; onEnd: () => void }>) {
  const question = Math.min(quiz.asked + 1, ROUND);
  return (
    <div className="flex items-center gap-3">
      <IconButton
        icon={X}
        label="End the game"
        variant="secondary"
        className="pointer-events-auto shadow-glass"
        onClick={onEnd}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-xs font-semibold text-fg-muted">
          Question {question} of {ROUND}
        </span>
        <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-surface">
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${(Math.min(quiz.asked, ROUND) / ROUND) * 100}%` }}
          />
        </span>
      </div>
      <span className="inline-flex h-8 items-center gap-1 rounded-full bg-gloss px-3 text-sm font-semibold text-gold-ink shadow-glass">
        <Icon icon={Flame} size="sm" />
        <span className="sr-only">Streak</span>
        {quiz.streak}
      </span>
    </div>
  );
}

/** What to find, as a card at the top of the model. */
export function QuizTarget({ name }: Readonly<{ name: string }>) {
  return (
    <div className="pointer-events-auto flex flex-col gap-1 rounded-lg border border-glass-border bg-glass p-4 shadow-glass backdrop-blur-md">
      <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
        Find it on the model
      </span>
      <p className="text-gold font-display text-4xl tracking-display">{name}</p>
    </div>
  );
}

function feedback(quiz: QuizState, pickedName: string): string | null {
  if (quiz.last === 'right') return 'Right! Next one.';
  if (quiz.last === 'wrong') return `You tapped ${pickedName}. Try again, or turn the model.`;
  return null;
}

/** "Find it" along the bottom: how the last tap went, the score, and hint and skip. */
export function QuizBar({
  quiz,
  pickedName,
  onSkip,
  onAgain,
  onEnd,
}: Readonly<{
  quiz: QuizState;
  pickedName: string;
  onSkip: () => void;
  onAgain: () => void;
  onEnd: () => void;
}>) {
  const over = roundOver(quiz);
  const said = over
    ? `Round over: you found ${quiz.score} of ${ROUND}.`
    : feedback(quiz, pickedName);
  const tiles = [
    { label: 'Score', value: quiz.score, gold: false },
    { label: 'Streak', value: quiz.streak, gold: true },
    { label: 'Best', value: quiz.best, gold: false },
  ];
  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <p
        aria-live="polite"
        className={cx(
          'text-sm font-semibold text-ink',
          said &&
            'rounded-md border border-glass-border bg-glass px-4 py-3 shadow-glass backdrop-blur-md',
        )}
      >
        {said}
      </p>
      <dl className="grid grid-cols-3 gap-2 text-center">
        {tiles.map((tile) => (
          <div key={tile.label} className={cx(TILE, 'flex flex-col-reverse py-2')}>
            <dt className="text-xs font-semibold text-fg-muted">{tile.label}</dt>
            <dd className={cx('text-xl font-semibold', tile.gold ? 'text-gold-ink' : 'text-ink')}>
              {tile.value}
            </dd>
          </div>
        ))}
      </dl>
      {over ? (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={onEnd}>
            Done
          </Button>
          <Button onClick={onAgain}>Play again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" disabled>
            Hint <Badge>Soon</Badge>
          </Button>
          <Button onClick={onSkip}>Skip</Button>
        </div>
      )}
    </div>
  );
}
