import type { ReactNode } from 'react';

import { Icon, type IconGlyph } from './Icon';

export interface PillProps {
  icon?: IconGlyph | undefined;
  children: ReactNode;
}

/** A glass chip for time, counts and status in hero areas, such as "15 min" or "Exam in 12 days". */
export function Pill({ icon, children }: PillProps) {
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full border border-glass-border bg-glass px-3 text-sm font-semibold text-ink shadow-glass">
      {icon ? <Icon icon={icon} size="sm" className="text-gold-ink" /> : null}
      {children}
    </span>
  );
}
