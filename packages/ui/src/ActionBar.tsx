import type { ReactNode } from 'react';

import { cx } from './cx';

export interface ActionBarProps {
  children: ReactNode;
  /** Screens with the phone tab bar keep the bar above it; full-screen flows sit at the edge. */
  placement?: 'above-tabbar' | 'edge';
  /**
   * Pins the bar to the bottom of the phone screen even while the content above it is scrolled
   * out of view (a spacer keeps the end of the page reachable). From tablet width it sits in the
   * page flow either way.
   */
  floating?: boolean;
  className?: string | undefined;
}

/** The screen's next step, kept within thumb reach at the bottom of the screen on phones. */
export function ActionBar({
  children,
  placement = 'above-tabbar',
  floating = false,
  className,
}: ActionBarProps) {
  return (
    <>
      {floating ? <div aria-hidden="true" className="h-20 md:hidden" /> : null}
      <div
        className={cx(
          'z-20 md:sticky md:bottom-4',
          floating ? 'fixed inset-x-4 md:inset-x-auto' : 'sticky',
          placement === 'above-tabbar' ? 'bottom-tabbar' : 'bottom-safe',
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3 rounded-xl border border-glass-border bg-glass p-2 shadow-float backdrop-blur-md">
          {children}
        </div>
      </div>
    </>
  );
}
