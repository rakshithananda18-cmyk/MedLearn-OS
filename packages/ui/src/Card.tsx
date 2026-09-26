import type { HTMLAttributes } from 'react';

import { cx } from './cx';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'li';
}

/** A raised surface for grouping related content. */
export function Card({ as: Tag = 'div', className, ...rest }: CardProps) {
  return (
    <Tag
      className={cx(
        'rounded-md border border-border bg-surface p-4 shadow-raised md:p-6',
        className,
      )}
      {...rest}
    />
  );
}
