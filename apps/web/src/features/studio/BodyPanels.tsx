'use client';

import { cx, IconButton, Switch, Text } from '@medlearn/ui';
import { X } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { BODY_SYSTEMS, bodyStructure, type BodySystemId } from '@/content/body';
import type { SearchResult } from '@/content/search';

const SYSTEM_DOT: Record<BodySystemId, string> = {
  skin: 'bg-anat-skin',
  skeleton: 'bg-anat-bone',
  muscles: 'bg-anat-muscle',
  arteries: 'bg-anat-artery',
  veins: 'bg-anat-vein',
  nerves: 'bg-anat-nerve',
  organs: 'bg-anat-organ',
};

const LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';

/**
 * The one body's systems, from the surface in, each a switch: turn the skin off to see the
 * muscles, the muscles off to see the skeleton, the vessels, nerves and organs on to add them.
 */
export function SystemsList({
  systems,
  onToggle,
}: Readonly<{ systems: ReadonlySet<BodySystemId>; onToggle: (id: BodySystemId) => void }>) {
  return (
    <section aria-labelledby="systems-title" className="flex flex-col gap-2">
      <h2 id="systems-title" className={LABEL}>
        Systems
      </h2>
      <ul className="flex flex-col gap-1">
        {BODY_SYSTEMS.map((system) => (
          <li key={system.id} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cx('size-3 shrink-0 rounded-full', SYSTEM_DOT[system.id])}
            />
            <div className="min-w-0 flex-1">
              <Switch
                label={system.name}
                checked={systems.has(system.id)}
                onCheckedChange={() => onToggle(system.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * A structure picked on the body: its name and system, and the topics that teach it, found by
 * searching the content for its name.
 */
export function BodyPartCard({ id, onClose }: Readonly<{ id: string; onClose: () => void }>) {
  const { system, name, search } = bodyStructure(id);
  const [found, setFound] = useState<{ id: string; topics: SearchResult[] } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/search?q=${encodeURIComponent(search)}`, { signal: controller.signal })
      .then((response) => response.json() as Promise<{ data?: { results: SearchResult[] } }>)
      .then((body) => {
        const results = body.data?.results ?? [];
        // One link per topic: its own title first, then where the structure is drawn.
        const topics = results.filter(
          (result, index) =>
            (result.kind === 'Topic' || result.kind === 'Structure') &&
            results.findIndex((other) => other.topicSlug === result.topicSlug) === index,
        );
        setFound({ id, topics: topics.slice(0, 6) });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [id, search]);

  const topics = found?.id === id ? found.topics : null;
  return (
    <section aria-label={name} className="pointer-events-auto flex animate-rise flex-col gap-3">
      <div className="flex items-start gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {system ? (
            <span className={cx(LABEL, 'flex items-center gap-2')}>
              <span
                aria-hidden="true"
                className={cx('size-2 rounded-full', SYSTEM_DOT[system.id])}
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
        {topics === null ? (
          <Text size="sm" tone="muted">
            Looking…
          </Text>
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
