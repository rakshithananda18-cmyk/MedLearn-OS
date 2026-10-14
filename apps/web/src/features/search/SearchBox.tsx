'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { Search } from '@medlearn/ui/icons';
import Link from 'next/link';
import { type KeyboardEvent, type ReactNode, useId, useState } from 'react';

/** One suggestion: a page to go to, or something to do on the spot (turn the model to it). */
export interface SearchOption {
  id: string;
  label: string;
  meta: string;
  icon: IconGlyph;
  href?: string;
  onSelect?: () => void;
}

export interface SearchGroup {
  title: string;
  options: SearchOption[];
}

/**
 * The search box the app shares: suggestions in groups as the student types, arrow keys to move
 * through them and Enter to open one. With an action, Enter on its own goes to the full results
 * there; without one, it opens the first suggestion. The suggestions hang below the box, or sit
 * in place under it where the box has a sheet of its own.
 */
export function SearchBox({
  label,
  placeholder,
  query,
  onQuery,
  groups,
  status = null,
  footer = null,
  action,
  inline = false,
  autoFocus = false,
  className,
}: Readonly<{
  /** The box's name for screen readers. */
  label: string;
  placeholder: string;
  query: string;
  onQuery: (query: string) => void;
  groups: SearchGroup[];
  /** A line on how the search is going: still searching, or nothing found. */
  status?: string | null;
  /** Under the suggestions, such as searches to try. */
  footer?: ReactNode;
  /** Where Enter on its own sends the search (as `q`), for the full results. */
  action?: string;
  /** Suggestions listed in place under the box, always showing. */
  inline?: boolean;
  autoFocus?: boolean;
  className?: string;
}>) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  // A new search starts from the box again.
  const [seen, setSeen] = useState(query);
  if (seen !== query) {
    setSeen(query);
    setActive(-1);
  }
  const shown = groups.filter((group) => group.options.length > 0);
  const options = shown.flatMap((group) => group.options);
  const current = options[active];
  const expanded = inline || open;

  const choose = (option: SearchOption) => {
    if (!inline) setOpen(false);
    option.onSelect?.();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      // Round the list and back to the box itself (-1).
      const next = active + (event.key === 'ArrowDown' ? 1 : -1);
      if (next >= options.length) setActive(-1);
      else if (next < -1) setActive(options.length - 1);
      else setActive(next);
    } else if (event.key === 'Enter' && expanded) {
      // The highlighted suggestion, or with nowhere to send the search, the first one.
      const target = current ?? (action ? undefined : options[0]);
      if (!target) return;
      event.preventDefault();
      // Opens it exactly as a click does.
      document.getElementById(`${listId}-${target.id}`)?.click();
    }
  };

  return (
    <form
      action={action}
      role="search"
      // On phones the suggestions hang from the row the box sits in (the caller makes it
      // relative), so they use the screen's width; from tablets, from the box itself.
      className={cx('md:relative', className)}
      onSubmit={(event) => {
        if (!action) event.preventDefault();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <label className="flex h-12 items-center gap-2 rounded-full bg-gloss px-4 text-fg-muted shadow-glass focus-within:ring-2 focus-within:ring-focus">
        <Icon icon={Search} size="sm" />
        <span className="sr-only">{label}</span>
        <input
          type="search"
          name={action ? 'q' : undefined}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-activedescendant={expanded && current ? `${listId}-${current.id}` : undefined}
          autoComplete="off"
          maxLength={100}
          value={query}
          placeholder={placeholder}
          // Opened on purpose by a search button, so the keyboard should come up.
          autoFocus={autoFocus} // NOSONAR: the student asked for search by tapping its button
          onChange={(event) => {
            onQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-fg-muted"
        />
      </label>
      <div
        hidden={!expanded}
        // Focusable, so a press anywhere in the panel keeps the focus inside the search (and the
        // panel open) until the click lands, in every browser.
        tabIndex={-1}
        className={cx(
          'flex flex-col gap-2',
          inline
            ? 'pt-2'
            : 'absolute inset-x-0 top-full z-40 mt-2 max-h-dialog min-w-full overflow-y-auto rounded-xl border border-glass-border bg-surface p-2 shadow-overlay md:min-w-sm',
        )}
      >
        <output aria-live="polite" className="px-3 text-sm text-fg-muted empty:hidden">
          {status}
        </output>
        <div id={listId} role="listbox" aria-label="Suggestions" className="flex flex-col gap-2">
          {shown.map((group) => (
            <div key={group.title} role="group" aria-label={group.title} className="flex flex-col">
              <span
                aria-hidden="true"
                className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
              >
                {group.title}
              </span>
              {group.options.map((option) => {
                const look = cx(
                  'flex min-h-12 w-full items-center gap-3 rounded-md px-3 py-2 text-left',
                  option === current ? 'bg-primary-subtle' : 'hover:bg-surface-muted',
                );
                const body = (
                  <>
                    <Icon icon={option.icon} size="sm" className="shrink-0 text-gold-ink" />
                    <span className="flex min-w-0 flex-col">
                      <span className="line-clamp-2 text-sm font-semibold text-ink">
                        {option.label}
                      </span>
                      <span className="truncate text-xs text-fg-muted">{option.meta}</span>
                    </span>
                  </>
                );
                const shared = {
                  id: `${listId}-${option.id}`,
                  role: 'option',
                  'aria-selected': option === current,
                  onClick: () => choose(option),
                  className: look,
                } as const;
                return option.href ? (
                  <Link key={option.id} href={option.href} {...shared}>
                    {body}
                  </Link>
                ) : (
                  <button key={option.id} type="button" {...shared}>
                    {body}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {footer}
      </div>
    </form>
  );
}
