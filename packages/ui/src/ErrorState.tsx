'use client';

import { useId } from 'react';

import { Button } from './Button';
import { Icon } from './Icon';
import { CircleAlert, RefreshCw } from './icons';

export interface ErrorStateProps {
  title: string;
  description: string;
  /** Reference the student can quote when reporting the problem. */
  reference?: string | undefined;
  onRetry?: (() => void) | undefined;
  retryLabel?: string;
}

/** Friendly, accessible error message with an optional retry action. */
export function ErrorState({
  title,
  description,
  reference,
  onRetry,
  retryLabel = 'Try again',
}: ErrorStateProps) {
  const titleId = useId();

  return (
    <section
      role="alert"
      aria-labelledby={titleId}
      className="flex flex-col items-center gap-3 px-4 py-8 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-danger-subtle text-danger">
        <Icon icon={CircleAlert} size="lg" />
      </span>
      <h2 id={titleId} className="text-xl font-semibold text-ink">
        {title}
      </h2>
      <p className="max-w-prose text-base text-fg-muted">{description}</p>
      {reference ? (
        <p className="text-sm text-fg-muted">
          Reference: <code className="font-mono text-fg">{reference}</code>
        </p>
      ) : null}
      {onRetry ? (
        <Button variant="secondary" iconStart={RefreshCw} onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </section>
  );
}
