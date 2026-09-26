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
