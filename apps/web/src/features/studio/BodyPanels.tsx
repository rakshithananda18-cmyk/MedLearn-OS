'use client';

import { cx, IconButton, Text } from '@medlearn/ui';
import { X } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { bodyStructure } from '@/content/body';
import type { SearchResult } from '@/content/search';
import { fetchSearch, searchFailedMessage, wasCancelled } from '@/features/search/fetchSearch';

import { LAYER_DOT } from './panels';

const LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';

/**
 * A structure picked on the body: its name and system, and the topics that teach it, found by
 * searching the content for its name.
 */
export function BodyPartCard({ id, onClose }: Readonly<{ id: string; onClose: () => void }>) {
  const { system, name, search } = bodyStructure(id);
  const [found, setFound] = useState<{
    id: string;
    topics: SearchResult[];
    failed: boolean;
  } | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchSearch(search, controller.signal)
      .then((results) => {
        // One link per topic: its own title first, then where the structure is drawn.
        const topics = results.filter(
          (result, index) =>
            (result.kind === 'Topic' || result.kind === 'Structure') &&
            results.findIndex((other) => other.topicSlug === result.topicSlug) === index,
        );
        setFound({ id, topics: topics.slice(0, 6), failed: false });
      })
      .catch((error: unknown) => {
        if (!wasCancelled(error)) setFound({ id, topics: [], failed: true });
      });
    return () => controller.abort();
  }, [id, search, attempt]);

  const failed = found?.id === id && found.failed;
  const topics = found?.id === id && !found.failed ? found.topics : null;
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
        {topics === null && !failed ? (
          <Text size="sm" tone="muted">
            Looking…
          </Text>
        ) : null}
        {failed ? (
          <div className="flex flex-wrap items-center gap-2">
            <Text size="sm" tone="muted">
              {searchFailedMessage()}
            </Text>
            <button
              type="button"
              onClick={() => setAttempt((current) => current + 1)}
              className="inline-flex h-8 items-center rounded-full border border-border-strong px-3 text-xs font-semibold text-ink hover:border-gold"
            >
              Try again
            </button>
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
