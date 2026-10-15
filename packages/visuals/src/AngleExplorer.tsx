'use client';

import { useId, useState } from 'react';

import { type AngleSpec, boneEnd, zoneAt } from './angles';

export interface AngleExplorerProps {
  spec: AngleSpec;
}

// Drawing geometry in SVG units.
const WIDTH = 320;
const HEIGHT = 340;
const BONE = 'stroke-anat-bone';
const OUTLINE = 'stroke-border-strong';

type Point = [number, number];

/** An angle as written, with a true minus sign. */
const degrees = (angle: number) => `${angle < 0 ? '−' : ''}${Math.abs(angle)}°`;

const line = (from: Point, to: Point) => ({ x1: from[0], y1: from[1], x2: to[0], y2: to[1] });

/** A thick bone with a darker edge, as two strokes. */
function Bone({ from, to, width }: Readonly<{ from: Point; to: Point; width: number }>) {
  return (
    <>
      <line {...line(from, to)} strokeWidth={width + 3} strokeLinecap="round" className={OUTLINE} />
      <line {...line(from, to)} strokeWidth={width} strokeLinecap="round" className={BONE} />
    </>
  );
}

/** The arc between two directions out of `centre`, and the angle written beside it. */
function AngleArc({
  centre,
  start,
  end,
  label,
  labelAt,
}: Readonly<{ centre: Point; start: Point; end: Point; label: string; labelAt?: Point }>) {
  const radius = 60;
  const towards = (point: Point): Point => {
    const dx = point[0] - centre[0];
    const dy = point[1] - centre[1];
    const length = Math.hypot(dx, dy) || 1;
    return [centre[0] + (dx / length) * radius, centre[1] + (dy / length) * radius];
  };
  const a = towards(start);
  const b = towards(end);
  // The short way round from one direction to the other.
  const cross = (a[0] - centre[0]) * (b[1] - centre[1]) - (a[1] - centre[1]) * (b[0] - centre[0]);
  const middle = towards([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
  const text: Point = labelAt ?? [
    centre[0] + (middle[0] - centre[0]) * 1.6,
    centre[1] + (middle[1] - centre[1]) * 1.6,
  ];
  return (
    <>
      <path
        d={`M${a[0]},${a[1]} A${radius},${radius} 0 0 ${cross > 0 ? 1 : 0} ${b[0]},${b[1]}`}
        fill="none"
        strokeWidth={2.5}
        className="stroke-gold"
      />
      <text
        x={text[0]}
        y={text[1]}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-ink text-sm font-semibold"
      >
        {label}
      </text>
    </>
  );
}

/** The upper femur from the front: shaft, neck at the angle, head, and greater trochanter. */
function Femur({ angle }: Readonly<{ angle: number }>) {
  const base: Point = [196, 150];
  const foot: Point = [196, HEIGHT - 16];
  const head = boneEnd(base, 92, angle);
  const axis = boneEnd(base, 120, 180);
  return (
    <>
      <line {...line(base, axis)} strokeDasharray="5 6" strokeWidth={1.5} className={OUTLINE} />
      <Bone from={base} to={foot} width={34} />
      <Bone from={base} to={head} width={26} />
      <circle
        cx={head[0]}
        cy={head[1]}
        r={31}
        strokeWidth={3}
        className={`fill-anat-bone ${OUTLINE}`}
      />
      <rect
        x={base[0] + 4}
        y={base[1] - 34}
        width={30}
        height={46}
        rx={14}
        strokeWidth={3}
        className={`fill-anat-bone ${OUTLINE}`}
      />
      <AngleArc centre={base} start={foot} end={head} label={degrees(angle)} />
      <text x={head[0]} y={head[1] - 44} textAnchor="middle" className="fill-fg-muted text-xs">
        Head
      </text>
      <text x={base[0] + 6} y={base[1] - 44} className="fill-fg-muted text-xs">
        Greater trochanter
      </text>
      <text x={base[0] + 26} y={foot[1] - 20} className="fill-fg-muted text-xs">
        Shaft
      </text>
    </>
  );
}

/** The arm and forearm from the front, the body to the left. */
function Elbow({ angle }: Readonly<{ angle: number }>) {
  const shoulder: Point = [150, 20];
  const elbow: Point = [150, 160];
  const wrist = boneEnd(elbow, 160, angle, -1);
  const axis = boneEnd(elbow, 160, 0);
  return (
    <>
      <line {...line(elbow, axis)} strokeDasharray="5 6" strokeWidth={1.5} className={OUTLINE} />
      <Bone from={shoulder} to={elbow} width={26} />
      <Bone from={elbow} to={wrist} width={22} />
      <circle
        cx={elbow[0]}
        cy={elbow[1]}
        r={17}
        strokeWidth={3}
        className={`fill-anat-bone ${OUTLINE}`}
      />
      <AngleArc
        centre={elbow}
        start={axis}
        end={wrist}
        label={degrees(angle)}
        labelAt={[elbow[0] + 92, elbow[1] + 56]}
      />
      <text x={16} y={HEIGHT / 2} className="fill-fg-muted text-xs">
        ← Body
      </text>
      <text x={shoulder[0] + 22} y={shoulder[1] + 40} className="fill-fg-muted text-xs">
        Arm
      </text>
      <text
        x={wrist[0] + (angle < 0 ? -18 : 18)}
        y={wrist[1] - 8}
        textAnchor={angle < 0 ? 'end' : 'start'}
        className="fill-fg-muted text-xs"
      >
        Forearm
      </text>
    </>
  );
}

/**
 * An angle of the skeleton the student sets with a slider: the bones redrawn at that angle, and
 * what the angle means there, normal or not.
 */
export function AngleExplorer({ spec }: Readonly<AngleExplorerProps>) {
  const [angle, setAngle] = useState(spec.start);
  const zone = zoneAt(spec, angle);
  const descriptionId = useId();
  const span = spec.max - spec.min;
  return (
    <figure className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-surface p-2">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={`${spec.title}: ${angle} degrees, ${zone.name}`}
          aria-describedby={descriptionId}
          className="mx-auto h-auto max-h-figure w-full"
        >
          {spec.shape === 'femur' ? <Femur angle={angle} /> : <Elbow angle={angle} />}
        </svg>
      </div>
      <figcaption id={descriptionId} aria-live="polite" className="flex flex-col gap-1">
        <span
          className={
            zone.normal
              ? 'text-sm font-semibold text-primary-strong'
              : 'text-sm font-semibold text-danger'
          }
        >
          {zone.name}
        </span>
        <span className="text-sm text-fg">{zone.note}</span>
      </figcaption>
      <label className="flex flex-col gap-1">
        <span className="flex justify-between text-sm">
          <span className="font-semibold text-ink">{spec.title}</span>
          <span className="text-fg-muted">{angle}°</span>
        </span>
        <input
          type="range"
          min={spec.min}
          max={spec.max}
          value={angle}
          onChange={(event) => setAngle(Number(event.target.value))}
          className="h-12 w-full cursor-pointer accent-primary"
        />
      </label>
      {/* Values worth knowing, placed under the slider where they fall. */}
      <div aria-hidden="true" className="relative h-6 text-xs text-fg-muted">
        {spec.marks.map((mark) => (
          <span
            key={mark.at}
            className="absolute -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${((mark.at - spec.min) / span) * 100}%` }}
          >
            {mark.label} {mark.at}°
          </span>
        ))}
      </div>
    </figure>
  );
}
