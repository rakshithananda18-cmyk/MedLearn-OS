import type { HTMLAttributes } from 'react';

import { cx } from './cx';

const TONE = {
  solid: 'rounded-xl border-border bg-surface shadow-raised',
  /** Calm Sky: a translucent card floating over the sky backdrop. */
  glass: 'rounded-xl border-glass-border bg-glass shadow-glass',
} as const;

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'li';
  tone?: keyof typeof TONE;
}

/** A raised surface for grouping related content. */
export function Card({ as: Tag = 'div', tone = 'solid', className, ...rest }: CardProps) {
  return <Tag className={cx('border p-4', TONE[tone], className)} {...rest} />;
}
