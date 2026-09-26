import { cx } from '@medlearn/ui';
import { type ReactNode, ViewTransition } from 'react';

export interface ScreenProps {
  children: ReactNode;
  /** Narrow for reading and single tasks; wide for two-pane screens on tablets and desktops. */
  width?: 'narrow' | 'wide';
}

/** Every study screen: one content column that animates in and out on navigation. */
export function Screen({ children, width = 'narrow' }: ScreenProps) {
  return (
    <ViewTransition enter="screen-enter" exit="screen-exit" default="none">
      <div
        className={cx(
          'mx-auto flex w-full flex-col gap-6',
          width === 'narrow' ? 'max-w-2xl' : 'max-w-6xl',
        )}
      >
        {children}
      </div>
    </ViewTransition>
  );
}
