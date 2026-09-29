import { cx } from '@medlearn/ui';
import type { ReactNode } from 'react';

import { BackLink } from './BackLink';

// The pieces of a study flow (a lesson, an exam drill): how far along it is, the steps as a
// numbered list, and one layout that stacks on phones and splits into stage and panel on wide
// screens.

const GLASS = 'xl:rounded-xl xl:border xl:border-glass-border xl:bg-glass xl:shadow-glass';

/** The top of a flow: the way back, and how far along it is as words and a bar. */
export function FlowProgress({
  back,
  backLabel,
  label,
  done,
  total,
}: Readonly<{ back: string; backLabel: string; label: string; done: number; total: number }>) {
  return (
    <div className="flex items-center gap-3">
      <BackLink href={back} label={backLabel} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-xs font-semibold text-fg-muted">{label}</span>
        <progress
          value={done}
          max={Math.max(total, 1)}
          aria-label={label}
          className="progress-bar"
        />
      </div>
    </div>
  );
}

/** Steps as a numbered list: the current one filled, the rest as rings; tappable when it helps. */
export function StepList({
  label,
  steps,
  index,
  onIndex,
}: Readonly<{
  label: string;
  steps: ReadonlyArray<{ id: string; title: string }>;
  index: number;
  /** Jumps to a step; without it the list only shows where the student is. */
  onIndex?: (index: number) => void;
}>) {
  const row = 'flex min-h-12 w-full items-center gap-3 rounded-md px-2 text-left text-sm';
  return (
    <ol aria-label={label} className="flex flex-col gap-1">
      {steps.map((step, position) => {
        const body = (
          <>
            <span
              className={cx(
                'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                position === index
                  ? 'bg-ink text-canvas'
                  : 'border-2 border-border-strong text-fg-muted',
              )}
            >
              {position + 1}
            </span>
            <span className={cx(position === index ? 'font-semibold text-ink' : 'text-fg-muted')}>
              {step.title}
            </span>
          </>
        );
        return (
          <li key={step.id}>
            {onIndex ? (
              <button
                type="button"
                aria-current={position === index ? 'step' : undefined}
                onClick={() => onIndex(position)}
                className={cx(row, 'transition-colors duration-150 hover:bg-surface-muted')}
              >
                {body}
              </button>
            ) : (
              <span aria-current={position === index ? 'step' : undefined} className={row}>
                {body}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A flow's layout. Phones and upright tablets stack the header, the step, the visual and the
 * controls. Tablets held sideways and laptops fill the window: the visual on a glass stage on
 * the left, the step in a glass panel on the right, the controls under it.
 */
export function FlowLayout({
  label,
  stageLabel,
  header,
  panel,
  stage,
  controls,
  framed = true,
}: Readonly<{
  /** Names the step panel for screen readers. */
  label: string;
  /** Names the visual's stage. */
  stageLabel: string;
  header: ReactNode;
  panel: ReactNode;
  stage: ReactNode;
  /** The ActionBar; it takes the grid's bar area itself, so it stays sticky on tablets. */
  controls: ReactNode;
  /** A glass stage around the visual; off when the stage holds cards of its own. */
  framed?: boolean;
}>) {
  return (
    <div className="flex flex-col gap-4 xl:grid xl:h-stage xl:grid-study xl:gap-x-6 xl:gap-y-4">
      <div className="area-head flex flex-col gap-3">{header}</div>
      {/* Both panes scroll on their own on wide screens, so the keyboard can reach them too. */}
      <section
        aria-label={label}
        tabIndex={0} // NOSONAR: a scrolling pane must take focus so the keyboard can scroll it
        className={cx('area-panel flex flex-col gap-4 xl:overflow-y-auto xl:p-6', GLASS)}
      >
        {panel}
      </section>
      <section
        aria-label={stageLabel}
        tabIndex={0} // NOSONAR: a scrolling pane must take focus so the keyboard can scroll it
        className={cx(
          'area-stage flex flex-col gap-4 xl:min-h-0 xl:overflow-y-auto',
          framed && cx(GLASS, 'xl:p-4'),
        )}
      >
        {stage}
      </section>
      {controls}
    </div>
  );
}

export const STEP_LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';
