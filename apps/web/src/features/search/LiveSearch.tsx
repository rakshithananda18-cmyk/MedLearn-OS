'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import {
  BookOpen,
  Box,
  ClipboardCheck,
  FileText,
  Layers,
  Play,
  RotateCcw,
  Search,
  Target,
} from '@medlearn/ui/icons';
import Link from 'next/link';
import { type KeyboardEvent, useEffect, useId, useState } from 'react';

import type { SearchKind, SearchResult } from '@/content/search';
import { useProgress } from '@/features/progress/store';

/** What the box needs to know about each topic for its suggestions. */
export interface SearchTopic {
  slug: string;
  title: string;
  questionIds: string[];
}

interface Option {
  id: string;
  label: string;
  meta: string;
  href: string;
  icon: IconGlyph;
}

interface Group {
  title: string;
  options: Option[];
}

const KIND_ICON: Record<SearchKind, IconGlyph> = {
  Topic: BookOpen,
  Structure: Box,
  'Key fact': Target,
  Lesson: Layers,
  Question: ClipboardCheck,
  'Recall card': RotateCcw,
};

/** Searches students often start with, offered while the box is empty. */
const POPULAR = ['Erb palsy', 'Claw hand', 'Carpal tunnel', 'Rotator cuff', 'Snuffbox'];
const PER_GROUP = 4;
const DEBOUNCE_MS = 120;

/** Lower case without accents, as the server search compares. */
const fold = (text: string) => text.normalize('NFD').replaceAll(/\p{M}/gu, '').toLowerCase();

const words = (query: string) =>
  fold(query)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word.length >= 2);

/** The server's results in groups: topics, structures (each name once), then everything else. */
function resultGroups(results: SearchResult[]): Group[] {
  const option = (result: SearchResult, index: number, meta: string): Option => ({
    id: `result-${index}`,
    label: result.excerpt,
    meta,
    href: result.href,
    icon: KIND_ICON[result.kind],
  });
  const topics = results
    .filter((result) => result.kind === 'Topic')
    .slice(0, PER_GROUP)
    .map((result, index) => ({
      ...option(result, index, 'Topic'),
      label: result.topicTitle,
    }));

  const byName = new Map<string, SearchResult[]>();
  for (const result of results.filter((item) => item.kind === 'Structure')) {
    byName.set(result.excerpt, [...(byName.get(result.excerpt) ?? []), result]);
  }
  const structures = [...byName.values()].slice(0, PER_GROUP).map((found, index) => {
    const [first] = found as [SearchResult, ...SearchResult[]];
    const also = found.length > 1 ? ` and ${found.length - 1} more` : '';
    return option(first, 100 + index, `In ${first.topicTitle}${also}`);
  });

  const inside = results
    .filter((result) => result.kind !== 'Topic' && result.kind !== 'Structure')
    .slice(0, PER_GROUP)
    .map((result, index) => option(result, 200 + index, `${result.kind} · ${result.topicTitle}`));

  return [
    { title: 'Topics', options: topics },
    { title: 'Structures', options: structures },
    { title: 'In lessons, facts and questions', options: inside },
  ];
}

/**
 * The search box across the app: results appear as the student types (topics, structures from
 * the diagrams and models, their own notes, then lessons, facts and questions), a typo or two
 * forgiven. Empty, it suggests the next topic, weak spots, recent notes and common searches.
 * Arrow keys move through the suggestions and Enter opens one; Enter on its own (or with no
 * script) goes to the full results page.
 */
export function LiveSearch({
  topics,
  defaultValue = '',
  className,
}: Readonly<{ topics: SearchTopic[]; defaultValue?: string; className?: string }>) {
  const progress = useProgress();
  const listId = useId();
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [found, setFound] = useState<{ query: string; results: SearchResult[] } | null>(null);
  const terms = words(query);
  const typed = terms.length > 0;

  // Results arrive a moment after typing stops; an older request never overwrites a newer one.
  useEffect(() => {
    if (!typed) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((response) => response.json() as Promise<{ data?: { results: SearchResult[] } }>)
        .then((body) => setFound({ query, results: body.data?.results ?? [] }))
        .catch(() => undefined);
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, typed]);

  const titleOf = new Map(topics.map((topic) => [topic.slug, topic.title]));
  const notes = Object.entries(progress.notes)
    .filter(([slug, note]) => titleOf.has(slug) && note.text.trim())
    .toSorted(([, a], [, b]) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  let groups: Group[];
  if (typed) {
    const mine = notes
      .filter(([, note]) => terms.every((term) => fold(note.text).includes(term)))
      .slice(0, 3)
      .map(([slug, note], index) => ({
        id: `note-${index}`,
        label: note.text.trim().split('\n')[0]?.slice(0, 80) ?? '',
        meta: `Your note · ${titleOf.get(slug) ?? slug}`,
        href: `/learn/${slug}`,
        icon: FileText,
      }));
    const results = found?.query === query ? found.results : [];
    const [topicGroup, structureGroup, insideGroup] = resultGroups(results) as [
      Group,
      Group,
      Group,
    ];
    groups = [
      topicGroup,
      structureGroup,
      { title: 'Your notes', options: mine },
      insideGroup,
      {
        title: 'Everything',
        options: [
          {
            id: 'all',
            label: `See all results for “${query.trim()}”`,
            meta: 'Full search',
            href: `/search?q=${encodeURIComponent(query.trim())}`,
            icon: Search,
          },
        ],
      },
    ];
  } else {
    const learnt = new Set(progress.completedLessons);
    const next = topics.find((topic) => !learnt.has(topic.slug));
    const missed = new Set(progress.mistakes.filter((id) => !progress.correctAnswers.includes(id)));
    const weak = topics.filter((topic) => topic.questionIds.some((id) => missed.has(id)));
    groups = [
      {
        title: 'Suggested for you',
        options: [
          ...(next
            ? [
                {
                  id: 'next',
                  label: next.title,
                  meta: 'Up next to learn',
                  href: `/learn/${next.slug}`,
                  icon: Play,
                },
              ]
            : []),
          ...weak.slice(0, 2).map((topic) => ({
            id: `weak-${topic.slug}`,
            label: topic.title,
            meta: 'Weak spot: questions to put right',
            href: `/practice?topic=${topic.slug}`,
            icon: Target,
          })),
          ...notes.slice(0, 2).map(([slug]) => ({
            id: `recent-${slug}`,
            label: titleOf.get(slug) ?? slug,
            meta: 'Your latest notes',
            href: `/learn/${slug}`,
            icon: FileText,
          })),
        ],
      },
    ];
  }
  const shown = groups.filter((group) => group.options.length > 0);
  const options = shown.flatMap((group) => group.options);
  const current = options[active];

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
    } else if (event.key === 'Enter' && open && current) {
      // Opens the highlighted suggestion exactly as a click on its link does.
      event.preventDefault();
      document.getElementById(`${listId}-${current.id}`)?.click();
    }
  };

  return (
    <form
      action="/search"
      role="search"
      // On phones the suggestions hang from the row the box sits in (the caller makes it
      // relative), so they use the screen's width; from tablets, from the box itself.
      className={cx('md:relative', className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <label className="flex h-12 items-center gap-2 rounded-full bg-gloss px-4 text-fg-muted shadow-glass focus-within:ring-2 focus-within:ring-focus">
        <Icon icon={Search} size="sm" />
        <span className="sr-only">Search topics, structures and notes</span>
        <input
          type="search"
          name="q"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && current ? `${listId}-${current.id}` : undefined}
          autoComplete="off"
          maxLength={100}
          value={query}
          placeholder="Search topics, structures, notes"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-fg-muted"
        />
      </label>
      <div
        hidden={!open}
        // Keeps the focus in the box while a suggestion is pressed.
        onMouseDown={(event) => event.preventDefault()}
        className="absolute inset-x-0 top-full z-40 mt-2 flex max-h-dialog min-w-full flex-col gap-2 overflow-y-auto rounded-xl border border-glass-border bg-surface p-2 shadow-overlay md:min-w-sm"
      >
        <p role="status" className="px-3 text-sm text-fg-muted empty:hidden">
          {typed && found?.query !== query ? 'Searching…' : null}
          {typed && found?.query === query && options.length === 1
            ? 'Nothing matches yet. Try fewer letters, or a nerve, muscle or sign.'
            : null}
        </p>
        <div id={listId} role="listbox" aria-label="Suggestions" className="flex flex-col gap-2">
          {shown.map((group) => (
            <div key={group.title} role="group" aria-label={group.title} className="flex flex-col">
              <span
                aria-hidden="true"
                className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
              >
                {group.title}
              </span>
              {group.options.map((option) => (
                <Link
                  key={option.id}
                  id={`${listId}-${option.id}`}
                  role="option"
                  aria-selected={option === current}
                  href={option.href}
                  onClick={() => setOpen(false)}
                  className={cx(
                    'flex min-h-12 items-center gap-3 rounded-md px-3 py-2 text-left',
                    option === current ? 'bg-primary-subtle' : 'hover:bg-surface-muted',
                  )}
                >
                  <Icon icon={option.icon} size="sm" className="shrink-0 text-gold-ink" />
                  <span className="flex min-w-0 flex-col">
                    <span className="line-clamp-2 text-sm font-semibold text-ink">
                      {option.label}
                    </span>
                    <span className="truncate text-xs text-fg-muted">{option.meta}</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
        {typed ? null : (
          <div className="flex flex-col gap-2 px-3 pt-1 pb-2">
            <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
              Try searching
            </span>
            <ul aria-label="Try searching" className="flex flex-wrap gap-2">
              {POPULAR.map((word) => (
                <li key={word}>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery(word);
                      setActive(-1);
                    }}
                    className="min-h-8 rounded-full border border-border-strong px-3 py-1 text-xs font-semibold text-ink hover:border-gold"
                  >
                    {word}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
}
