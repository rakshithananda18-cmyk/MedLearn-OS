'use client';

import type { PathDiagram } from '@medlearn/schemas';
import { type KeyboardEvent, useId } from 'react';

import { affectedBy, edgeInSet, pathThrough } from './graph';
import { HIT_HEIGHT, LINE_HEIGHT, pillSize } from './pill';

export interface PathTracerProps {
  diagram: PathDiagram;
  /** Accessible name of the whole diagram. */
  title: string;
  /** Nodes emphasised by the current lesson step. */
  focus?: string[];
  /** Selected node; its whole path is highlighted. */
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  /** Lesioned nodes; they and everything downstream are marked as affected. */
  lesion?: string[];
}

/**
 * A pathway diagram you can trace: select a node to highlight everything upstream and
 * downstream of it. Every state is also described in text below the drawing.
 */
export function PathTracer({
  diagram,
  title,
  focus = [],
  selectedId = null,
  onSelect,
  lesion = [],
}: PathTracerProps) {
  const descriptionId = useId();
  const onPath = selectedId ? pathThrough(diagram.edges, selectedId) : new Set(focus);
  const affected = affectedBy(diagram.edges, lesion);
  const nameOf = (id: string) => diagram.nodes.find((node) => node.id === id)?.name ?? id;

  const toggle = (id: string) => onSelect?.(selectedId === id ? null : id);
  const onKeyDown = (event: KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle(id);
    }
  };

  const description = selectedId
    ? `${nameOf(selectedId)}. Path: ${diagram.nodes
        .filter((node) => onPath.has(node.id))
        .map((node) => node.name)
        .join(', ')}.`
    : lesion.length > 0
      ? `Affected by the lesion: ${diagram.nodes
          .filter((node) => affected.has(node.id))
          .map((node) => node.name)
          .join(', ')}.`
      : 'Select a root or nerve to trace its path.';

  return (
    // Fills the height it is given (a lesson's stage), or sizes from its width in a column.
    <figure className="flex h-full flex-col gap-3">
      <div className="min-h-0 flex-1 rounded-lg border border-border bg-surface p-2">
        <svg
          role="group"
          aria-label={title}
          aria-describedby={descriptionId}
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="size-full"
        >
          {diagram.edges.map((edge) => {
            const from = diagram.nodes.find((node) => node.id === edge.from);
            const to = diagram.nodes.find((node) => node.id === edge.to);
            if (!from || !to) return null;
            const highlighted = edgeInSet(edge, onPath);
            const hurt = edgeInSet(edge, affected);
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth={highlighted ? 3 : 1.5}
                strokeDasharray={hurt ? '6 4' : undefined}
                className={
                  hurt ? 'stroke-danger' : highlighted ? 'stroke-primary' : 'stroke-border-strong'
                }
              />
            );
          })}
          {diagram.nodes.map((node) => {
            const { lines, width, height } = pillSize(node.label);
            const highlighted = onPath.has(node.id);
            const hurt = affected.has(node.id);
            const selected = node.id === selectedId;
            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={node.name}
                aria-pressed={selected}
                onClick={() => toggle(node.id)}
                onKeyDown={(event) => onKeyDown(event, node.id)}
                className="cursor-pointer focus:outline-none [&:focus-visible>rect:nth-child(2)]:stroke-focus"
              >
                <rect
                  x={node.x - Math.max(width, HIT_HEIGHT) / 2}
                  y={node.y - HIT_HEIGHT / 2}
                  width={Math.max(width, HIT_HEIGHT)}
                  height={HIT_HEIGHT}
                  className="fill-transparent"
                />
                <rect
                  x={node.x - width / 2}
                  y={node.y - height / 2}
                  width={width}
                  height={height}
                  rx={height / 2}
                  strokeWidth={selected ? 3 : 1.5}
                  className={
                    hurt
                      ? 'fill-danger-subtle stroke-danger'
                      : highlighted
                        ? 'fill-primary stroke-primary'
                        : 'fill-surface stroke-border-strong'
                  }
                />
                <text
                  x={node.x}
                  y={node.y - ((lines.length - 1) * LINE_HEIGHT) / 2 + 4}
                  textAnchor="middle"
                  className={`pointer-events-none text-xs font-semibold ${
                    highlighted && !hurt ? 'fill-on-primary' : 'fill-fg'
                  }`}
                >
                  {lines.map((line, index) => (
                    <tspan key={line} x={node.x} dy={index === 0 ? 0 : LINE_HEIGHT}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption id={descriptionId} aria-live="polite" className="text-sm text-fg-muted">
        {description}
      </figcaption>
    </figure>
  );
}
