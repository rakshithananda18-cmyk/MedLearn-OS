import type { HTMLAttributes } from 'react';

import { cx } from './cx';

// Full class names (not built from strings) so Tailwind can find them when scanning.
const GAP = { 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' } as const;
const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;
const JUSTIFY = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'ul' | 'ol' | 'nav' | 'header' | 'footer';
  direction?: 'column' | 'row';
  gap?: keyof typeof GAP;
  align?: keyof typeof ALIGN;
  justify?: keyof typeof JUSTIFY;
  wrap?: boolean;
}

/** Lays children out in a row or column with a gap from the spacing scale. */
export function Stack({
  as: Tag = 'div',
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...rest
}: StackProps) {
  return (
    <Tag
      className={cx(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        GAP[gap],
        ALIGN[align],
        JUSTIFY[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...rest}
    />
  );
}
