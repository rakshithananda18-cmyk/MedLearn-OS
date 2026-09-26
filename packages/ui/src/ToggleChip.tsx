import type { ButtonHTMLAttributes } from 'react';

import { cx } from './cx';

export interface ToggleChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  pressed: boolean;
  /** Danger marks a pathology choice, such as showing a lesion. */
  tone?: 'default' | 'danger';
}

/** A rounded on/off chip for choosing a view, a layer or a structure; announces its state. */
export function ToggleChip({
  pressed,
  tone = 'default',
  className,
  ...rest
}: Readonly<ToggleChipProps>) {
  const on =
    tone === 'danger'
      ? 'border-danger bg-danger-subtle font-semibold text-danger'
      : 'border-gold bg-glass font-semibold text-ink';
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cx(
        'min-h-12 rounded-full border px-4 text-sm transition-colors duration-150',
        pressed ? on : 'border-border-strong bg-surface font-medium text-fg hover:bg-surface-muted',
        className,
      )}
      {...rest}
    />
  );
}
