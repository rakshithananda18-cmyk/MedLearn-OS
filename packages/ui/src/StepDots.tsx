import { cx } from './cx';

export interface StepDotsProps {
  count: number;
  /** Zero-based index of the current step. */
  current: number;
}

/** Progress dots with the current dot ringed. Screen readers hear "Step 2 of 3". */
export function StepDots({ count, current }: StepDotsProps) {
  return (
    <div
      role="img"
      aria-label={`Step ${current + 1} of ${count}`}
      className="flex items-center gap-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cx(
            'rounded-full transition-colors duration-150',
            index === current
              ? 'size-3 bg-gold-ink ring-2 ring-gold ring-offset-4 ring-offset-transparent'
              : index < current
                ? 'size-2 bg-gold-ink'
                : 'size-2 bg-border-strong',
          )}
        />
      ))}
    </div>
  );
}
