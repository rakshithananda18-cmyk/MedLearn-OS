'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ReactNode } from 'react';

import { cx } from './cx';

export interface DrawerProps {
  /** Named for screen readers; show your own heading inside. */
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

/**
 * A panel that slides up from the bottom over a scrim, for a closer look without leaving the
 * page: focus stays inside, Escape or a tap on the scrim closes it, and the page behind does not
 * scroll. On tablets it floats as a card near the bottom.
 */
export function Drawer({ title, open, onOpenChange, children, className }: Readonly<DrawerProps>) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="drawer-scrim fixed inset-0 z-40 bg-scrim" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cx(
            'drawer fixed inset-x-0 bottom-0 z-50 max-h-dvh overflow-y-auto rounded-t-xl bg-surface shadow-overlay md:inset-x-6 md:bottom-6 md:mx-auto md:max-w-2xl md:rounded-xl',
            className,
          )}
        >
          {/* Names the drawer without being a heading: its content shows its own. */}
          <DialogPrimitive.Title asChild>
            <span className="sr-only">{title}</span>
          </DialogPrimitive.Title>
          <span
            aria-hidden="true"
            className="mx-auto mt-2 block h-1 w-12 rounded-full bg-border-strong md:hidden"
          />
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
