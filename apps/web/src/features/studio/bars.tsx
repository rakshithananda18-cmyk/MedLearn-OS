'use client';

import type { CameraStop } from '@medlearn/schemas';
import { Button, cx, Icon, IconButton, Text } from '@medlearn/ui';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Lightbulb,
  Star,
  Trash2,
  Undo2,
  X,
} from '@medlearn/ui/icons';
import type { ReactNode } from 'react';

import {
  MAX_HINTS,
  milestone,
  MILESTONES,
  points,
  type QuizResult,
  type QuizState,
  REVEAL_AFTER,
  ROUND,
  roundOver,
  starsFor,
  toRevisit,
} from './quiz';
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
  className = 'rounded-md bg-surface-muted',
}: Readonly<{
  mode: Mode;
  onMode: (mode: Mode) => void;
  /** The switch's own surface: a tray in a sheet, or glass over the model. */
  className?: string;
}>) {
  return (
    <fieldset className={cx('grid grid-cols-3 gap-1 p-1', className)}>
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
            'h-12 rounded-sm px-4 text-sm font-semibold transition-colors duration-150',
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

/** The streak, as a flame that bursts gold at each milestone. */
function StreakFlame({ quiz }: Readonly<{ quiz: QuizState }>) {
  const hot = quiz.streak >= Math.min(...MILESTONES);
  return (
    <span
      // A new key replays the burst each time a milestone is reached.
      key={milestone(quiz) ?? 'steady'}
      className={cx(
        'inline-flex h-8 shrink-0 items-center gap-1 rounded-full px-3 text-sm font-semibold shadow-glass',
        hot ? 'bg-gold text-canvas' : 'bg-gloss text-gold-ink',
        milestone(quiz) !== null && 'animate-glow motion-reduce:animate-none',
      )}
    >
      <Icon icon={Flame} size="sm" />
      <span className="sr-only">Streak</span>
      {quiz.streak}
    </span>
  );
}

/** The round's questions, numbered from one. */
const QUESTIONS = Array.from({ length: ROUND }, (_, index) => index + 1);

const DOT: Record<QuizResult['how'], string> = {
  clean: 'bg-primary',
  helped: 'bg-gold',
  skipped: 'bg-border-strong',
};

/**
 * What to find, at the top of the model: the name in gold, the round as ten dots (teal found
 * first time, gold found with help, grey skipped, the current one pulsing), the streak, and a
 * way out.
 */
export function QuestionCard({
  quiz,
  name,
  onEnd,
}: Readonly<{ quiz: QuizState; name: string; onEnd: () => void }>) {
  const over = roundOver(quiz);
  return (
    <section
      aria-label="Find it"
      className="pointer-events-auto flex w-full max-w-md flex-col gap-2 rounded-xl border border-glass-border bg-glass px-4 py-3 shadow-glass backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
          Find it on the model
        </span>
        <StreakFlame quiz={quiz} />
        <IconButton icon={X} label="End the game" size="sm" onClick={onEnd} />
      </div>
      <p className="text-gold font-display text-2xl tracking-display">
        {over ? 'Round over' : name}
      </p>
      <div className="flex items-center gap-3">
        <ol aria-hidden="true" className="flex flex-1 gap-1">
          {QUESTIONS.map((question) => {
            const result = quiz.results[question - 1];
            return (
              <li
                key={question}
                className={cx(
                  'h-2 flex-1 rounded-full',
                  result ? DOT[result.how] : 'bg-border-strong/30',
                  !result &&
                    question === quiz.asked + 1 &&
                    'animate-pulse bg-primary/60 motion-reduce:animate-none',
                )}
              />
            );
          })}
        </ol>
        <span className="shrink-0 text-xs font-semibold text-fg-muted">
          {over
            ? `${ROUND} of ${ROUND}`
            : `Question ${Math.min(quiz.asked + 1, ROUND)} of ${ROUND}`}
        </span>
      </div>
    </section>
  );
}

/** The hint button as hints are taken: none yet, one, both. */
const HINT_LABELS = ['Hint', 'Hint 2', 'No hints'];

const CHEERS: Record<number, string> = {
  3: 'Three in a row!',
  5: 'Five in a row: you are on fire!',
  10: 'Ten in a row: a perfect round!',
};

/** What to say after the last move: a cheer, a find, a near miss, a hint, or how to begin. */
function feedback(quiz: QuizState, pickedName: string): { text: string; tone: string } {
  const cheer = milestone(quiz);
  if (cheer !== null && CHEERS[cheer]) {
    return { text: CHEERS[cheer], tone: 'bg-gold text-canvas' };
  }
  if (quiz.last === 'right') {
    return {
      text: quiz.gained === 1 ? 'Right! Next one.' : 'Found it, for half a point. Next one.',
      tone: 'bg-primary-subtle text-primary-strong',
    };
  }
  if (quiz.last === 'wrong') {
    return {
      text:
        quiz.misses >= REVEAL_AFTER
          ? `You tapped ${pickedName}. It is glowing now: tap it to go on.`
          : `You tapped ${pickedName}. Try again, or turn the model.`,
      tone: 'bg-surface text-ink',
    };
  }
  if (quiz.hints >= MAX_HINTS) {
    return { text: 'Hint: the camera has turned to it.', tone: 'bg-gloss text-gold-ink' };
  }
  if (quiz.hints > 0) {
    return {
      text: 'Hint: it is among the ones still bright.',
      tone: 'bg-gloss text-gold-ink',
    };
  }
  return {
    text: 'Tap it on the model. Turn the model to look around.',
    tone: 'bg-surface text-fg',
  };
}

/** Score, streak and best, as three tiles. */
function Tallies({ quiz }: Readonly<{ quiz: QuizState }>) {
  const tiles = [
    { label: 'Score', value: points(quiz.score), gold: false },
    { label: 'Streak', value: String(quiz.streak), gold: true },
    { label: 'Best', value: String(quiz.best), gold: false },
  ];
  return (
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
  );
}

/** The end of a round: stars, how many were found, and what is worth another look. */
function RoundOver({
  quiz,
  nameOf,
  onLearn,
  onAgain,
  onEnd,
}: Readonly<{
  quiz: QuizState;
  nameOf: (id: string) => string;
  onLearn: (id: string) => void;
  onAgain: () => void;
  onEnd: () => void;
}>) {
  const found = quiz.results.filter((result) => result.how !== 'skipped').length;
  const stars = starsFor(quiz.score);
  const again = toRevisit(quiz);
  return (
    <div className="flex animate-rise flex-col gap-4 motion-reduce:animate-none">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="flex gap-1" role="img" aria-label={`${stars} of 3 stars`}>
          {[1, 2, 3].map((star) => (
            <Icon
              key={star}
              icon={Star}
              size="lg"
              className={star <= stars ? 'fill-current text-gold-ink' : 'text-border-strong'}
            />
          ))}
        </p>
        <p aria-live="polite" className="font-semibold text-ink">
          Round over: you found {found} of {ROUND}.
        </p>
      </div>
      <Tallies quiz={quiz} />
      {again.length > 0 ? (
        <section aria-label="Worth another look" className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
            Worth another look
          </h3>
          <ul className="flex flex-col">
            {again.map((id) => (
              <li key={id} className="flex min-h-12 items-center gap-3">
                <span className="min-w-0 flex-1 text-sm text-ink">{nameOf(id)}</span>
                <Button variant="secondary" size="sm" onClick={() => onLearn(id)}>
                  Learn it
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={onEnd}>
          Done
        </Button>
        <Button onClick={onAgain}>Play again</Button>
      </div>
    </div>
  );
}

/**
 * "Find it" beside the model: how the last tap went, the score, and a hint (what kind of thing it
 * is, then the camera turns to it; a hinted find counts half) or a skip. At the end of the round,
 * the stars, and the structures to learn again.
 */
export function Scoreboard({
  quiz,
  nameOf,
  onHint,
  onSkip,
  onLearn,
  onAgain,
  onEnd,
}: Readonly<{
  quiz: QuizState;
  nameOf: (id: string) => string;
  onHint: () => void;
  onSkip: () => void;
  onLearn: (id: string) => void;
  onAgain: () => void;
  onEnd: () => void;
}>) {
  if (roundOver(quiz)) {
    return (
      <RoundOver quiz={quiz} nameOf={nameOf} onLearn={onLearn} onAgain={onAgain} onEnd={onEnd} />
    );
  }
  const said = feedback(quiz, nameOf(quiz.picked ?? ''));
  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <p
        // A new key replays the find's glow or the miss's shake.
        key={`${quiz.asked}-${quiz.misses}-${quiz.hints}`}
        aria-live="polite"
        className={cx(
          'rounded-md border border-glass-border px-4 py-3 text-sm font-semibold motion-reduce:animate-none',
          said.tone,
          quiz.last === 'right' && 'animate-glow',
          quiz.last === 'wrong' && 'animate-shake',
        )}
      >
        {said.text}
      </p>
      <Tallies quiz={quiz} />
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          iconStart={Lightbulb}
          disabled={quiz.hints >= MAX_HINTS}
          onClick={onHint}
        >
          {HINT_LABELS[quiz.hints]}
        </Button>
        <Button onClick={onSkip}>Skip</Button>
      </div>
      <Text size="xs" tone="muted">
        Found first time: a point. With a hint, or once it glows: half.
      </Text>
    </div>
  );
}
