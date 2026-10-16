'use client';

import { Button, cx, IconButton, Text } from '@medlearn/ui';
import { X } from '@medlearn/ui/icons';
import Link from 'next/link';

import { bodyStructure } from '@/content/body';
import { SEARCH_UNAVAILABLE, useSearchResults } from '@/features/search/useSearchResults';

import { LAYER_DOT } from './panels';

const LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';

/**
 * A structure picked on the body: its name and system, and the topics that teach it, found by
 * searching the content for its name.
 */
export function BodyPartCard({ id, onClose }: Readonly<{ id: string; onClose: () => void }>) {
  const { system, name, search } = bodyStructure(id);
  const found = useSearchResults(search);
  const topics = found.results
    ?.filter(
      (result, index, results) =>
        (result.kind === 'Topic' || result.kind === 'Structure') &&
        results.findIndex((other) => other.topicSlug === result.topicSlug) === index,
    )
    .slice(0, 6);
  return (
    <section aria-label={name} className="pointer-events-auto flex animate-rise flex-col gap-3">
      <div className="flex items-start gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {system ? (
            <span className={cx(LABEL, 'flex items-center gap-2')}>
              <span
                aria-hidden="true"
                className={cx('size-2 rounded-full', LAYER_DOT[system.kind])}
              />
              {system.name}
            </span>
          ) : null}
          <h2 className="text-gold font-display text-3xl tracking-display">{name}</h2>
        </div>
        <IconButton icon={X} label="Close" size="sm" onClick={onClose} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={LABEL}>In your topics</h3>
        {found.loading ? (
          <Text size="sm" tone="muted">
            Looking…
          </Text>
        ) : null}
        {found.error ? (
          <div role="status" className="flex flex-col gap-2">
            <Text size="sm" tone="muted">
              {SEARCH_UNAVAILABLE}
            </Text>
            <Button variant="secondary" className="self-start" onClick={found.retry}>
              Retry search
            </Button>
          </div>
        ) : null}
        {topics?.length === 0 ? (
          <Text size="sm" tone="muted">
            Not in a topic yet: its region is still to come.
          </Text>
        ) : null}
        {topics && topics.length > 0 ? (
          <ul className="flex flex-wrap gap-1">
            {topics.map((topic) => (
              <li key={topic.topicSlug}>
                <Link
                  href={`/learn/${topic.topicSlug}`}
                  className="inline-flex h-8 items-center rounded-full border border-border-strong px-3 text-xs font-semibold text-ink hover:border-gold"
                >
                  {topic.topicTitle}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
