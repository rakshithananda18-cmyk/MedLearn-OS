'use client';

import { type InputHTMLAttributes, useId } from 'react';

import { cx } from './cx';
import { Icon } from './Icon';
import { CircleAlert } from './icons';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  /** Guidance shown under the label and read out with the field. */
  hint?: string | undefined;
  /** Validation message; marks the field invalid. */
  error?: string | undefined;
}

export function TextField({
  label,
  hint,
  error,
  id,
  required,
  className,
  ...input
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-fg">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            {' *'}
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-fg-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(
          'h-12 rounded-sm border bg-surface px-3 text-base text-fg placeholder:text-fg-muted',
          error ? 'border-danger' : 'border-border-strong',
        )}
        {...input}
      />
      {error ? (
        <p id={errorId} className="flex items-center gap-1 text-sm text-danger">
          <Icon icon={CircleAlert} size="sm" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
