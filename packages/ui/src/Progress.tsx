function percentOf(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / max) * 100)));
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  /** Show the percentage next to the label. */
  showValue?: boolean;
}

export function ProgressBar({ value, max = 100, label, showValue = false }: ProgressBarProps) {
  const percent = percentOf(value, max);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between gap-2 text-sm">
        <span className="text-fg">{label}</span>
        {showValue ? <span className="text-fg-muted">{percent}%</span> : null}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-250 ease-standard"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

const RING = {
  sm: { box: 28, stroke: 3 },
  md: { box: 48, stroke: 4 },
  lg: { box: 64, stroke: 6 },
} as const;

export interface ProgressRingProps {
  value: number;
  max?: number;
  label: string;
  size?: keyof typeof RING;
}

/**
 * Circular progress (e.g. topic mastery). The percentage is shown in the centre, except on the
 * small ring, which sits beside its own label.
 */
export function ProgressRing({ value, max = 100, label, size = 'md' }: ProgressRingProps) {
  const percent = percentOf(value, max);
  const { box, stroke } = RING[size];
  const radius = (box - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="relative inline-flex items-center justify-center"
    >
      <svg
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        aria-hidden="true"
        className="-rotate-90"
      >
        <circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-muted"
        />
        <circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
          className="stroke-primary transition-all duration-250 ease-standard"
        />
      </svg>
      {size === 'sm' ? null : (
        <span className="absolute text-xs font-semibold text-fg">{percent}%</span>
      )}
    </div>
  );
}
