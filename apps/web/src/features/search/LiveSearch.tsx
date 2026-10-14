'use client';

import type { IconGlyph } from '@medlearn/ui';
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
import { useEffect, useState } from 'react';

import type { SearchKind, SearchResult } from '@/content/search';
import { useProgress } from '@/features/progress/store';

import { SearchBox, type SearchGroup as Group, type SearchOption as Option } from './SearchBox';

/** What the box needs to know about each topic for its suggestions. */
export interface SearchTopic {
  slug: string;
  title: string;
  questionIds: string[];
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
  const [query, setQuery] = useState(defaultValue);
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
  const options = groups.flatMap((group) => group.options);
  let status: string | null = null;
  if (typed && found?.query !== query) status = 'Searching…';
  else if (typed && options.length === 1) {
    status = 'Nothing matches yet. Try fewer letters, or a nerve, muscle or sign.';
  }

  return (
    <SearchBox
      label="Search topics, structures and notes"
      placeholder="Search topics, structures, notes"
      query={query}
      onQuery={setQuery}
      groups={groups}
      status={status}
      action="/search"
      className={className}
      footer={
        typed ? null : (
          <div className="flex flex-col gap-2 px-3 pt-1 pb-2">
            <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
              Try searching
            </span>
            <ul aria-label="Try searching" className="flex flex-wrap gap-2">
              {POPULAR.map((word) => (
                <li key={word}>
                  <button
                    type="button"
                    onClick={() => setQuery(word)}
                    className="min-h-8 rounded-full border border-border-strong px-3 py-1 text-xs font-semibold text-ink hover:border-gold"
                  >
                    {word}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    />
  );
}
