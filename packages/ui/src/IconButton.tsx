import type { ButtonHTMLAttributes } from 'react';

import { cx } from './cx';
import { Icon, type IconGlyph } from './Icon';

export type IconButtonVariant = 'ghost' | 'secondary' | 'primary';

const VARIANT: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-fg hover:bg-surface-muted',
  secondary: 'border border-border-strong bg-surface text-fg hover:bg-surface-muted',
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
};

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> {
  icon: IconGlyph;
  /** Required: an icon-only button needs an accessible name. */
  label: string;
  variant?: IconButtonVariant;
  size?: 'md' | 'sm';
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150 ease-standard disabled:cursor-not-allowed disabled:opacity-50',
        size === 'md' ? 'size-12' : 'size-8',
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      <Icon icon={icon} size={size === 'md' ? 'md' : 'sm'} />
    </button>
  );
}
