import { cx } from './cx';

export interface SkeletonProps {
  /** Size and shape from tokens, e.g. "h-4 w-full" or "size-12 rounded-full". */
  className?: string;
}

/** A placeholder shown while content loads. Hidden from screen readers. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cx('animate-pulse rounded-sm bg-surface-muted', className)}
    />
  );
}
