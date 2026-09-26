import type { ReactNode } from 'react';

import { Icon, type IconGlyph } from './Icon';
import { Inbox } from './icons';

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** Outlined icon standing in for an illustration. */
  icon?: IconGlyph;
  action?: ReactNode;
}

/** Shown when there is nothing to display yet, with the next useful step. */
export function EmptyState({ title, description, icon = Inbox, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-fg-muted">
        <Icon icon={icon} size="lg" />
      </span>
      <p className="text-lg font-semibold text-ink">{title}</p>
      {description ? <p className="max-w-prose text-sm text-fg-muted">{description}</p> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
