'use client';

import { type TextareaHTMLAttributes, useId } from 'react';

import { cx } from './cx';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  /** Guidance shown under the label and read out with the field. */
  hint?: string;
}

/** Multi-line text input with a visible label, styled like TextField. */
export function TextArea({
  label,
  hint,
  id,
  className,
  rows = 3,
  ...rest
}: Readonly<TextAreaProps>) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;

  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-fg">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-fg-muted">
          {hint}
        </p>
      ) : null}
      <textarea
        id={inputId}
        rows={rows}
        aria-describedby={hint ? hintId : undefined}
        className="min-h-24 w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-base text-fg placeholder:text-fg-muted"
        {...rest}
      />
    </div>
  );
}
