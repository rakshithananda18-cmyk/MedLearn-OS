'use client';

import { Button, Text } from '@medlearn/ui';

export function StudyLoadState({
  error,
  onRetry,
  onExit,
}: Readonly<{ error: boolean; onRetry: () => void; onExit?: () => void }>) {
  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-xl border border-glass-border bg-glass p-6 shadow-glass"
    >
      <Text>
        {error
          ? 'This session could not be loaded. Check your connection and try again.'
          : 'Loading this session…'}
      </Text>
      <div className="flex flex-wrap gap-2">
        {error ? <Button onClick={onRetry}>Retry session</Button> : null}
        {onExit ? (
          <Button variant="secondary" onClick={onExit}>
            Back to practice
          </Button>
        ) : null}
      </div>
    </div>
  );
}
