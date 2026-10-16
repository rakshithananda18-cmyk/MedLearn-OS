'use client';

import { Badge, cx, Display, Eyebrow, Text, ToggleChip } from '@medlearn/ui';
import Link from 'next/link';
import { useState } from 'react';

import { type ReviewState, STATE } from './state';

/** One topic as the review team sees it on the board. */
export interface BoardTopic {
  slug: string;
  title: string;
  version: string;
  /** The book chapter it is checked against, for grouping. */
  chapter: string;
  state: ReviewState;
  openReports: number;
}

const FILTERS = {
  'to-do': {
    label: 'To review',
    keep: (topic: BoardTopic) => topic.state === 'not-reviewed' || topic.state === 'needs-recheck',
  },
  changes: {
    label: 'Changes asked',
    keep: (topic: BoardTopic) => topic.state === 'changes-requested',
  },
  reports: { label: 'Open reports', keep: (topic: BoardTopic) => topic.openReports > 0 },
  approved: { label: 'Approved', keep: (topic: BoardTopic) => topic.state === 'approved' },
  all: { label: 'All', keep: () => true },
} as const;
type Filter = keyof typeof FILTERS;

/**
 * Every topic with where it stands, filtered to what needs doing first and grouped by the book
 * chapter a reviewer would have open beside it.
 */
export function ReviewBoard({ topics }: Readonly<{ topics: BoardTopic[] }>) {
  const [filter, setFilter] = useState<Filter>('to-do');
  const shown = topics.filter((topic) => FILTERS[filter].keep(topic));
  const chapters = [...new Set(shown.map((topic) => topic.chapter))];
  const approved = topics.filter((topic) => topic.state === 'approved').length;
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <Eyebrow>Review</Eyebrow>
        <Display size="md">Check the topics</Display>
        <Text tone="muted">
          {approved} of {topics.length} approved. Open a topic, check it against the book, then
          approve it or say what needs changing. Students see an approval at once.
        </Text>
      </header>
      <fieldset aria-label="Show" className="flex flex-wrap gap-2">
        {(Object.keys(FILTERS) as Filter[]).map((key) => (
          <ToggleChip key={key} pressed={filter === key} onClick={() => setFilter(key)}>
            {FILTERS[key].label} {topics.filter((topic) => FILTERS[key].keep(topic)).length}
          </ToggleChip>
        ))}
      </fieldset>
      {shown.length === 0 ? <Text tone="muted">Nothing here.</Text> : null}
      {chapters.map((chapter) => (
        <section
          key={chapter}
          aria-label={chapter}
          className="flex flex-col rounded-xl border border-glass-border bg-glass p-2 shadow-glass"
        >
          <h2 className="px-2 pt-1 text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
            {chapter}
          </h2>
          <ul className="flex flex-col">
            {shown
              .filter((topic) => topic.chapter === chapter)
              .map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/review/${topic.slug}`}
                    className={cx(
                      'flex min-h-12 items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-surface',
                    )}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-semibold text-ink">{topic.title}</span>
                      <span className="text-xs text-fg-muted">
                        Version {topic.version}
                        {topic.openReports > 0 &&
                          ` · ${topic.openReports} open ${topic.openReports === 1 ? 'report' : 'reports'}`}
                      </span>
                    </span>
                    <Badge tone={STATE[topic.state].tone}>{STATE[topic.state].label}</Badge>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
