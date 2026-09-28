'use client';

import type { DrillStep, PathDiagram } from '@medlearn/schemas';
import { type KeyboardEvent, useId } from 'react';

import { HIT_HEIGHT, LINE_HEIGHT, pillSize } from './pill';
import { blanks, type DrillState } from './trainer';

export interface DiagramTrainerProps {
  diagram: PathDiagram;
  steps: DrillStep[];
  state: DrillState;
  /** Accessible name of the drawing. */
  title: string;
  onSelectBlank: (id: string) => void;
}

/**
 * The exam diagram, built layer by layer. Labelled nodes and the lines between them appear as the
 * student places each label; the current layer shows blanks to fill.
 */
export function DiagramTrainer({
  diagram,
  steps,
  state,
  title,
  onSelectBlank,
}: DiagramTrainerProps) {
  const descriptionId = useId();
  const step = steps[state.stepIndex];
  const current = step?.nodeIds ?? [];
  const open = blanks(steps, state);
  const placed = new Set(state.placed);
  const visible = new Set([...state.placed, ...current]);

  const onKeyDown = (event: KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectBlank(id);
    }
  };

  return (
    // Fills the height it is given (a drill's stage), or sizes from its width in a column.
    <figure className="flex h-full flex-col gap-3">
      <div className="min-h-0 flex-1 rounded-lg border border-border bg-surface p-2">
        <svg
          role="group"
          aria-label={title}
          aria-describedby={descriptionId}
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="size-full"
        >
          {diagram.edges
            .filter((edge) => placed.has(edge.from) && placed.has(edge.to))
            .map((edge) => {
              const from = diagram.nodes.find((node) => node.id === edge.from);
              const to = diagram.nodes.find((node) => node.id === edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeWidth={2}
                  className="animate-draw stroke-primary"
                />
              );
            })}
          {diagram.nodes
            .filter((node) => visible.has(node.id))
            .map((node) => {
              const isBlank = !placed.has(node.id);
              const { lines, width, height } = pillSize(isBlank ? '?' : node.label);
              const pillWidth = isBlank ? Math.max(width, 40) : width;
              const selected = node.id === state.selectedId;
              const pill = (
                <>
                  <rect
                    x={node.x - pillWidth / 2}
                    y={node.y - height / 2}
                    width={pillWidth}
                    height={height}
                    rx={height / 2}
                    strokeWidth={selected ? 3 : 1.5}
                    strokeDasharray={isBlank && !selected ? '4 3' : undefined}
                    className={
                      isBlank
                        ? selected
                          ? 'fill-primary-subtle stroke-primary'
                          : 'fill-surface stroke-border-strong'
                        : current.includes(node.id)
                          ? 'fill-surface stroke-gold'
                          : 'fill-surface stroke-border-strong'
                    }
                  />
                  <text
                    x={node.x}
                    y={node.y - ((lines.length - 1) * LINE_HEIGHT) / 2 + 4}
                    textAnchor="middle"
                    className="pointer-events-none fill-fg text-xs font-semibold"
                  >
                    {lines.map((line, index) => (
                      <tspan key={line} x={node.x} dy={index === 0 ? 0 : LINE_HEIGHT}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </>
              );
              if (!isBlank) {
                return (
                  <g key={node.id} role="img" aria-label={node.name}>
                    {pill}
                  </g>
                );
              }
              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Blank ${current.indexOf(node.id) + 1} of ${current.length}`}
                  aria-pressed={selected}
                  onClick={() => onSelectBlank(node.id)}
                  onKeyDown={(event) => onKeyDown(event, node.id)}
                  className="cursor-pointer focus:outline-none [&:focus-visible>rect:nth-child(2)]:stroke-focus"
                >
                  <rect
                    x={node.x - Math.max(pillWidth, HIT_HEIGHT) / 2}
                    y={node.y - HIT_HEIGHT / 2}
                    width={Math.max(pillWidth, HIT_HEIGHT)}
                    height={HIT_HEIGHT}
                    className="fill-transparent"
                  />
                  {pill}
                </g>
              );
            })}
        </svg>
      </div>
      <figcaption id={descriptionId} aria-live="polite" className="text-sm text-fg-muted">
        {step
          ? `${step.title}: ${current.length - open.length} of ${current.length} labelled.`
          : ''}
      </figcaption>
    </figure>
  );
}
