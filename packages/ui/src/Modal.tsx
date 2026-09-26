'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ReactElement, ReactNode } from 'react';

import { cx } from './cx';
import { IconButton } from './IconButton';
import { X } from './icons';

export interface ModalProps {
  title: string;
  description?: string | undefined;
  /** Element that opens the modal (rendered as-is, e.g. a Button). */
  trigger?: ReactElement | undefined;
  children?: ReactNode;
  /** Actions shown at the bottom, e.g. Cancel / Confirm buttons. */
  footer?: ReactNode;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  closeLabel?: string;
}

const PANEL = 'z-50 flex flex-col gap-4 bg-surface p-6 text-fg shadow-overlay';

const PLACEMENT = {
  // Centred dialog on every screen size.
  center: 'fixed inset-x-4 top-1/2 mx-auto max-w-md -translate-y-1/2 rounded-lg',
  // Sheet from the bottom on phones; becomes a centred dialog from tablet width.
  bottom:
    'fixed inset-x-0 bottom-0 max-h-dvh overflow-y-auto rounded-t-lg md:inset-x-4 md:top-1/2 md:bottom-auto md:mx-auto md:max-w-md md:-translate-y-1/2 md:rounded-lg',
} as const;

function Modal({
  placement,
  title,
  description,
  trigger,
  children,
  footer,
  open,
  onOpenChange,
  closeLabel = 'Close',
}: ModalProps & { placement: keyof typeof PLACEMENT }) {
  // Radix expects either a description or an explicit "none" for screen readers.
  const describedBy = description ? {} : { 'aria-describedby': undefined };

  return (
    <DialogPrimitive.Root
      {...(open === undefined ? {} : { open })}
      {...(onOpenChange ? { onOpenChange } : {})}
    >
      {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-scrim" />
        <DialogPrimitive.Content className={cx(PANEL, PLACEMENT[placement])} {...describedBy}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <DialogPrimitive.Title className="text-xl font-semibold text-ink">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="text-sm text-fg-muted">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton icon={X} label={closeLabel} size="sm" />
            </DialogPrimitive.Close>
          </div>
          {children}
          {footer ? <div className="flex flex-wrap justify-end gap-3">{footer}</div> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** A focused task or confirmation in a centred window. */
export function Dialog(props: ModalProps) {
  return <Modal placement="center" {...props} />;
}

/** Contextual detail from the bottom of the screen (source drawer, report issue). */
export function BottomSheet(props: ModalProps) {
  return <Modal placement="bottom" {...props} />;
}

/** Wrap a footer button to close the modal when it is pressed. */
export const ModalClose = DialogPrimitive.Close;
