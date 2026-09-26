import { useId } from 'react';

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
    <section role="alert" aria-labelledby={titleId}>
      <h2 id={titleId}>{title}</h2>
      <p>{description}</p>
      {reference ? (
        <p>
          Reference: <code>{reference}</code>
        </p>
      ) : null}
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </section>
  );
}
