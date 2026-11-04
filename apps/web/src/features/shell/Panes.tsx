'use client';

import { cx, Icon, IconButton } from '@medlearn/ui';
import { ChevronDown, PanelRightClose, PanelRightOpen } from '@medlearn/ui/icons';
import { type ReactNode, useId, useSyncExternalStore } from 'react';

// The two-panel screen used across the app: the page's work in the main panel, what supports it
// (progress, plans, settings) in a side panel the student can fold away. Each page remembers
// whether its side panel is folded, on this device.

const listeners = new Set<() => void>();
/** Folded panels, kept in memory too, so folding works even where storage is blocked. */
const folded = new Map<string, boolean>();

function isFolded(key: string): boolean {
  const known = folded.get(key);
  if (known !== undefined) return known;
  try {
    return localStorage.getItem(key) === 'folded';
  } catch {
    return false;
  }
}

function setFolded(key: string, value: boolean) {
  folded.set(key, value);
  try {
    localStorage.setItem(key, value ? 'folded' : 'open');
  } catch {
    // Private windows: the choice lasts until the page is closed.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * A main panel and a side panel. On laptops they sit side by side, the side panel a third wide
 * and staying in view as the page scrolls; folded, it shrinks to a button and the main panel
 * takes the width. On phones and tablets the side panel stacks below the main one (or above it,
 * with `asideFirst`) and folds to its title.
 */
export function Panes({
  id,
  label,
  main,
  aside,
  asideFirst = false,
  className,
}: Readonly<{
  /** Names the page, so each page remembers its own choice. */
  id: string;
  /** The side panel's name, shown above it and read out with it. */
  label: string;
  main: ReactNode;
  aside: ReactNode;
  /** Phones show the side panel first: it holds the next task. */
  asideFirst?: boolean;
  className?: string;
}>) {
  const key = `ml-panel-${id}`;
  const closed = useSyncExternalStore(
    subscribe,
    () => isFolded(key),
    () => false,
  );
  const contentId = useId();
  const toggle = () => setFolded(key, !closed);

  return (
    <div className={cx('flex flex-col gap-4 xl:flex-row xl:items-start', className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-4">{main}</div>
      <aside
        aria-label={label}
        className={cx(
          'flex min-w-0 flex-col gap-4 xl:sticky xl:top-8 xl:shrink-0',
          closed ? 'xl:w-auto' : 'xl:w-1/3',
          asideFirst && 'order-first xl:order-none',
        )}
      >
        <div className={cx('flex items-center gap-2', closed && 'xl:flex-col')}>
          {/* Phones and tablets: the title folds and unfolds the panel. */}
          <button
            type="button"
            aria-expanded={!closed}
            aria-controls={contentId}
            onClick={toggle}
            className="flex min-h-12 flex-1 items-center gap-2 rounded-md px-2 text-left text-xs font-semibold tracking-eyebrow text-gold-ink uppercase hover:bg-surface-muted xl:hidden"
          >
            <span className="flex-1">{label}</span>
            <Icon
              icon={ChevronDown}
              size="sm"
              className={cx('transition-transform', closed && '-rotate-90')}
            />
          </button>
          {/* Laptops: the panel's title, and a button to fold it to the side. */}
          <span
            className={cx(
              'hidden flex-1 px-2 text-xs font-semibold tracking-eyebrow text-gold-ink uppercase',
              !closed && 'xl:block',
            )}
          >
            {label}
          </span>
          <span className="hidden xl:inline-flex">
            <IconButton
              icon={closed ? PanelRightOpen : PanelRightClose}
              label={closed ? `Show ${label.toLowerCase()}` : `Hide ${label.toLowerCase()}`}
              aria-expanded={!closed}
              aria-controls={contentId}
              size="sm"
              onClick={toggle}
            />
          </span>
        </div>
        <div id={contentId} hidden={closed} className="flex flex-col gap-4">
          {aside}
        </div>
      </aside>
    </div>
  );
}
