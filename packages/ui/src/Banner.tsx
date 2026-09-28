import type { ReactNode } from 'react';

import { cx } from './cx';
import { Icon, type IconGlyph } from './Icon';
import { CircleAlert, CircleCheck, Info, TriangleAlert, WifiOff } from './icons';

export type BannerTone = 'info' | 'success' | 'warning' | 'danger' | 'offline';

const TONE: Record<BannerTone, { icon: IconGlyph; classes: string; role: 'status' | 'alert' }> = {
  info: { icon: Info, classes: 'bg-primary-subtle text-primary-strong', role: 'status' },
  success: { icon: CircleCheck, classes: 'bg-success-subtle text-success', role: 'status' },
  warning: { icon: TriangleAlert, classes: 'bg-warning-subtle text-warning', role: 'status' },
  danger: { icon: CircleAlert, classes: 'bg-danger-subtle text-danger', role: 'alert' },
  offline: { icon: WifiOff, classes: 'bg-surface-muted text-fg', role: 'status' },
};

export interface BannerProps {
  tone?: BannerTone;
  title: string;
  children?: ReactNode;
  /** Optional action, e.g. a small button. */
  action?: ReactNode;
}

/** A message about the page or app state (offline, saved, needs attention). */
export function Banner({ tone = 'info', title, children, action }: BannerProps) {
  const { icon, classes, role } = TONE[tone];
  return (
    <div role={role} className={cx('flex items-start gap-3 rounded-lg px-4 py-3', classes)}>
      <Icon icon={icon} className="mt-px" />
      <div className="flex flex-1 flex-col gap-1">
        <p className="font-semibold">{title}</p>
        {children ? <div className="text-sm">{children}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
