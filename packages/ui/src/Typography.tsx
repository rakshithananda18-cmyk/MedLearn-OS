import type { HTMLAttributes } from 'react';

import { cx } from './cx';

const HEADING = {
  1: 'text-3xl font-bold text-ink',
  2: 'text-2xl font-semibold text-ink',
  3: 'text-xl font-semibold text-ink',
} as const;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3;
}

/** Page and section titles from the type scale. The level sets both the tag and the size. */
export function Heading({ level, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cx(HEADING[level], className)} {...rest} />;
}

const DISPLAY_SIZE = {
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-5xl',
} as const;

export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'p';
  size?: keyof typeof DISPLAY_SIZE;
}

/**
 * The serif hero line in gold, for page titles only. Wrap the one word that carries the meaning
 * in <em> so it is set in italic: <Display>Small steps, <em>every day</em></Display>.
 */
export function Display({ as: Tag = 'h1', size = 'xl', className, ...rest }: DisplayProps) {
  return (
    <Tag
      className={cx(
        'text-gold font-display font-normal tracking-display text-balance',
        DISPLAY_SIZE[size],
        className,
      )}
      {...rest}
    />
  );
}

/** A small, widely spaced uppercase label above a display line, such as today's date. */
export function Eyebrow({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cx('text-xs font-semibold uppercase tracking-eyebrow text-gold-ink', className)}
      {...rest}
    />
  );
}

const TEXT_SIZE = { base: 'text-base', sm: 'text-sm', xs: 'text-xs' } as const;
const TEXT_TONE = {
  default: 'text-fg',
  muted: 'text-fg-muted',
  danger: 'text-danger',
  success: 'text-success',
} as const;
const TEXT_WEIGHT = { normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold' };

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div';
  size?: keyof typeof TEXT_SIZE;
  tone?: keyof typeof TEXT_TONE;
  weight?: keyof typeof TEXT_WEIGHT;
}

/** Body text from the type scale. */
export function Text({
  as: Tag = 'p',
  size = 'base',
  tone = 'default',
  weight = 'normal',
  className,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={cx(TEXT_SIZE[size], TEXT_TONE[tone], TEXT_WEIGHT[weight], className)}
      {...rest}
    />
  );
}
