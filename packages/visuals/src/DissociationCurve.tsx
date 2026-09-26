'use client';

import { useId } from 'react';

import {
  ARTERIAL_PO2,
  type BloodConditions,
  curveShift,
  NORMAL_BLOOD,
  oxygenUnloaded,
  p50,
  saturation,
  VENOUS_PO2,
} from './oxygen';

export interface CurvePreset {
  id: string;
  label: string;
  conditions: BloodConditions;
}

/** Classic teaching situations for the curve (sample content, not medically reviewed). */
export const CURVE_PRESETS: CurvePreset[] = [
  { id: 'normal', label: 'Normal', conditions: NORMAL_BLOOD },
  {
    id: 'exercise',
    label: 'Exercising muscle',
    conditions: { pco2: 55, ph: 7.3, temperature: 39, bpg: 5 },
  },
  {
    id: 'altitude',
    label: 'High altitude',
    conditions: { pco2: 35, ph: 7.42, temperature: 37, bpg: 7 },
  },
  {
    id: 'stored',
    label: 'Stored blood',
    conditions: { pco2: 40, ph: 7.4, temperature: 37, bpg: 1.5 },
  },
];

interface Slider {
  key: keyof BloodConditions;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  digits: number;
}

const SLIDERS: Slider[] = [
  { key: 'pco2', label: 'PCO₂', unit: 'mmHg', min: 20, max: 80, step: 1, digits: 0 },
  { key: 'ph', label: 'pH', unit: '', min: 7, max: 7.7, step: 0.01, digits: 2 },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°C',
    min: 34,
    max: 42,
    step: 0.5,
    digits: 1,
  },
  { key: 'bpg', label: '2,3-BPG', unit: 'mmol/L', min: 1, max: 8, step: 0.5, digits: 1 },
];

// Chart geometry in SVG units: PO2 0–100 mmHg across, saturation 0–100 % up.
const LEFT = 44;
const RIGHT = 344;
const TOP = 16;
const BOTTOM = 216;
const x = (po2: number) => LEFT + ((RIGHT - LEFT) * po2) / 100;
const y = (percent: number) => BOTTOM - ((BOTTOM - TOP) * percent) / 100;

function curvePath(conditions: BloodConditions): string {
  const points: string[] = [];
  for (let po2 = 0; po2 <= 100; po2 += 2) {
    points.push(`${x(po2).toFixed(1)},${y(saturation(po2, conditions)).toFixed(1)}`);
  }
  return `M${points.join('L')}`;
}

const sameConditions = (a: BloodConditions, b: BloodConditions) =>
  SLIDERS.every(({ key }) => Math.abs(a[key] - b[key]) < 1e-9);

const SHIFT_TEXT = {
  right: 'shifted right: haemoglobin lets go of oxygen more easily',
  left: 'shifted left: haemoglobin holds on to oxygen',
  none: 'the normal curve',
} as const;

export interface DissociationCurveProps {
  conditions: BloodConditions;
  /** Accessible name of the chart. */
  title: string;
  /** When given, presets and sliders let the student change the conditions. */
  onChange?: ((conditions: BloodConditions) => void) | undefined;
}

/** The oxygen–haemoglobin dissociation curve against the normal curve, with a text summary. */
export function DissociationCurve({ conditions, title, onChange }: DissociationCurveProps) {
  const descriptionId = useId();
  const half = p50(conditions);
  const lungs = Math.round(saturation(ARTERIAL_PO2, conditions));
  const tissues = Math.round(saturation(VENOUS_PO2, conditions));
  const released = Math.round(oxygenUnloaded(conditions));
  const midY = (TOP + BOTTOM) / 2;

  return (
    <figure className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-surface p-2">
        <svg
          role="img"
          aria-label={title}
          aria-describedby={descriptionId}
          viewBox="0 0 360 250"
          className="h-auto w-full"
        >
          {[0, 25, 50, 75, 100].map((percent) => (
            <g key={`y${percent}`}>
              <line
                x1={LEFT}
                x2={RIGHT}
                y1={y(percent)}
                y2={y(percent)}
                className="stroke-border"
              />
              <text
                x={LEFT - 6}
                y={y(percent) + 4}
                textAnchor="end"
                className="fill-fg-muted text-xs"
              >
                {percent}
              </text>
            </g>
          ))}
          {[0, 20, 40, 60, 80, 100].map((po2) => (
            <text
              key={`x${po2}`}
              x={x(po2)}
              y={BOTTOM + 16}
              textAnchor="middle"
              className="fill-fg-muted text-xs"
            >
              {po2}
            </text>
          ))}
          <text
            x={(LEFT + RIGHT) / 2}
            y={BOTTOM + 32}
            textAnchor="middle"
            className="fill-fg text-xs font-semibold"
          >
            PO{'₂'} (mmHg)
          </text>
          <text
            x={12}
            y={midY}
            textAnchor="middle"
            transform={`rotate(-90 12 ${midY})`}
            className="fill-fg text-xs font-semibold"
          >
            Saturation (%)
          </text>
          {[
            { po2: VENOUS_PO2, label: 'Tissues', anchor: 'start' as const, dx: 4 },
            { po2: ARTERIAL_PO2, label: 'Lungs', anchor: 'end' as const, dx: -4 },
          ].map(({ po2, label, anchor, dx }) => (
            <g key={label}>
              <line
                x1={x(po2)}
                x2={x(po2)}
                y1={TOP}
                y2={BOTTOM}
                strokeDasharray="2 4"
                className="stroke-border-strong"
              />
              <text
                x={x(po2) + dx}
                y={BOTTOM - 6}
                textAnchor={anchor}
                className="fill-fg-muted text-xs"
              >
                {label}
              </text>
            </g>
          ))}
          <path
            d={curvePath(NORMAL_BLOOD)}
            fill="none"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            className="stroke-fg-muted"
          />
          <path
            d={curvePath(conditions)}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            className="stroke-primary"
          />
          {half <= 100 ? (
            <g>
              <line
                x1={LEFT}
                x2={x(half)}
                y1={y(50)}
                y2={y(50)}
                strokeDasharray="3 3"
                className="stroke-gold"
              />
              <line
                x1={x(half)}
                x2={x(half)}
                y1={y(50)}
                y2={BOTTOM}
                strokeDasharray="3 3"
                className="stroke-gold"
              />
              <circle
                cx={x(half)}
                cy={y(50)}
                r={5}
                strokeWidth={2}
                className="fill-surface stroke-gold"
              />
              <text x={x(half) + 8} y={y(50) + 16} className="fill-fg text-xs font-semibold">
                P50 {half.toFixed(1)}
              </text>
            </g>
          ) : null}
        </svg>
      </div>
      <figcaption id={descriptionId} aria-live="polite" className="text-sm text-fg-muted">
        P50 {half.toFixed(1)} mmHg, {SHIFT_TEXT[curveShift(conditions)]}. Saturation is {lungs}% in
        the lungs and {tissues}% in the tissues, so {released}% of the oxygen is released.
      </figcaption>
      {onChange ? (
        <div className="flex flex-col gap-4">
          <div role="group" aria-label="Situations" className="flex flex-wrap gap-2">
            {CURVE_PRESETS.map((preset) => {
              const active = sameConditions(preset.conditions, conditions);
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange(preset.conditions)}
                  className={
                    active
                      ? 'min-h-12 rounded-full border border-gold bg-glass px-4 text-sm font-semibold text-ink'
                      : 'min-h-12 rounded-full border border-border-strong bg-surface px-4 text-sm font-medium text-fg hover:bg-surface-muted'
                  }
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
            {SLIDERS.map((slider) => (
              <label key={slider.key} className="flex flex-col gap-1">
                <span className="flex justify-between text-sm">
                  <span className="font-semibold text-ink">{slider.label}</span>
                  <span className="text-fg-muted">
                    {conditions[slider.key].toFixed(slider.digits)} {slider.unit}
                  </span>
                </span>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={conditions[slider.key]}
                  onChange={(event) =>
                    onChange({ ...conditions, [slider.key]: Number(event.target.value) })
                  }
                  className="h-12 w-full cursor-pointer accent-primary"
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </figure>
  );
}
