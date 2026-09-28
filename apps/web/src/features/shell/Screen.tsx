import { cx } from '@medlearn/ui';
import { type ReactNode, ViewTransition } from 'react';

export interface ScreenProps {
  children: ReactNode;
  /** Narrow for reading and single tasks; wide for two-pane screens on tablets and desktops. */
  width?: 'narrow' | 'wide';
}

/**
 * A single-task screen (a question, a recall card): on tablets held sideways and laptops the
 * title sits on the left and the task on the right; on phones they stack.
 */
export function TaskColumns({
  intro,
  children,
}: Readonly<{ intro: ReactNode; children: ReactNode }>) {
  return (
    <div className="grid gap-4 md:gap-6 xl:grid-cols-5 xl:items-start xl:gap-8">
      <div className="flex flex-col gap-4 xl:sticky xl:top-8 xl:col-span-2">{intro}</div>
      <div className="flex flex-col gap-4 xl:col-span-3">{children}</div>
    </div>
  );
}

/** Every study screen: one content column that animates in and out on navigation. */
export function Screen({ children, width = 'narrow' }: ScreenProps) {
  return (
    <ViewTransition enter="screen-enter" exit="screen-exit" default="none">
      <div
        className={cx(
          'mx-auto flex w-full flex-col gap-4 px-4 pt-6 pb-8 md:gap-6 md:px-6 md:pt-8 xl:px-8',
          width === 'narrow' ? 'max-w-3xl' : 'max-w-7xl',
        )}
      >
        {children}
      </div>
    </ViewTransition>
  );
}
