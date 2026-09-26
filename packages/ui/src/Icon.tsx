import type { LucideIcon } from 'lucide-react';

import { cx } from './cx';

const SIZE = { sm: 16, md: 20, lg: 24 } as const;

export type IconGlyph = LucideIcon;
export type IconSize = keyof typeof SIZE;

export interface IconProps {
  icon: IconGlyph;
  /** Accessible name. Omit only when visible text next to the icon already says the same. */
  label?: string | undefined;
  size?: IconSize;
  className?: string | undefined;
}

/** The only way to render an icon: outlined, a constant 1.5px stroke, inherits the text colour. */
export function Icon({ icon: Glyph, label, size = 'md', className }: IconProps) {
  return (
    <Glyph
      size={SIZE[size]}
      strokeWidth={1.5}
      absoluteStrokeWidth
      focusable="false"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      className={cx('shrink-0', className)}
    />
  );
}
