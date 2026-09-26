import type { ReactNode } from 'react';

import { cx } from './cx';
import { Icon, type IconGlyph } from './Icon';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-fg',
  primary: 'bg-primary-subtle text-primary-strong',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
  danger: 'bg-danger-subtle text-danger',
};

export interface BadgeProps {
  tone?: BadgeTone;
  icon?: IconGlyph;
  children: ReactNode;
}

/** A short status label, such as a priority or a due count. */
export function Badge({ tone = 'neutral', icon, children }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
        TONE[tone],
      )}
    >
      {icon ? <Icon icon={icon} size="sm" /> : null}
      {children}
    </span>
  );
}
