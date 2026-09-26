import type { ButtonHTMLAttributes } from 'react';

import { cx } from './cx';
import { Icon, type IconGlyph } from './Icon';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'sm';

const BASE =
  'inline-flex select-none items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 ease-standard disabled:cursor-not-allowed disabled:opacity-50';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'border border-border-strong bg-surface text-primary-strong hover:bg-surface-muted',
  ghost: 'bg-transparent text-fg hover:bg-surface-muted',
  danger: 'bg-danger text-on-danger hover:bg-danger-hover',
};

// md is the 48px touch target from the design plan; sm is for dense desktop layouts.
const SIZE: Record<ButtonSize, string> = {
  md: 'h-12 px-4 text-base',
  sm: 'h-8 px-3 text-sm',
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/** Button styles for elements that must look like a button, such as a Next.js <Link>. */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: ButtonStyleOptions = {}): string {
  return cx(BASE, VARIANT[variant], SIZE[size], fullWidth && 'w-full');
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleOptions {
  iconStart?: IconGlyph | undefined;
  iconEnd?: IconGlyph | undefined;
  /** Shows a spinner, disables the button and marks it busy. */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  fullWidth,
  iconStart,
  iconEnd,
  loading = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === 'sm' ? 'sm' : 'md';
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(buttonClasses({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {loading ? (
        <Spinner size={iconSize} />
      ) : iconStart ? (
        <Icon icon={iconStart} size={iconSize} />
      ) : null}
      {children}
      {iconEnd && !loading ? <Icon icon={iconEnd} size={iconSize} /> : null}
    </button>
  );
}
