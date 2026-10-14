'use client';

import type { TopicMastery } from '@medlearn/core';
import { cx, Icon, ProgressRing, Text } from '@medlearn/ui';
import { Check, ChevronDown } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useId, useState } from 'react';

import {
  type LibraryBranch,
  type LibraryNode,
  type LibraryTopic,
  toggledTrail,
  topicsUnder,
  trailTo,
} from '@/content/library';

/** A subject with its topics, as the library tree for it. */
export interface LibrarySubject {
  slug: string;
  name: string;
  nodes: LibraryNode[];
}

/** What every row needs to know about the student and the selection. */
export interface TopicsState {
  learnt: ReadonlySet<string>;
  next: string | null;
  /** The topic shown in the preview, highlighted. */
  selected: string | null;
  /** How each topic is going, by slug. */
  mastery: ReadonlyMap<string, TopicMastery>;
  /** Where a preview sits beside the list, picking a topic shows it there; else topics are links. */
  onSelect?: (slug: string) => void;
}

/** The first topic in teaching order that the student has not learnt yet. */
export function nextTopic(subjects: LibrarySubject[], learnt: ReadonlySet<string>): string | null {
  const order = subjects.flatMap((subject) => subject.nodes.flatMap(topicsUnder));
  return order.find((topic) => !learnt.has(topic.slug))?.slug ?? null;
}

// A rail down the side of each list of topics, with a rounded elbow into every row; the last
// row's rail stops at its elbow, as in a file tree.
const RAIL =
  'relative pl-4 before:absolute before:top-0 before:bottom-0 before:left-0 before:border-l before:border-border-strong last:before:bottom-auto last:before:h-6 after:absolute after:top-0 after:left-0 after:h-6 after:w-3 after:rounded-bl-md after:border-b after:border-l after:border-border-strong';

function TopicRow({ topic, state }: Readonly<{ topic: LibraryTopic; state: TopicsState }>) {
  const next = topic.slug === state.next;
  const selected = topic.slug === state.selected;
  const learnt = state.learnt.has(topic.slug);
  const mastery = state.mastery.get(topic.slug);
  const weak = mastery?.weakSpots ?? 0;
  const className = cx(
    'flex min-h-12 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition-colors duration-150',
    selected
      ? 'bg-primary-subtle font-semibold text-primary-strong'
      : 'text-fg hover:bg-surface-muted',
  );
  const content = (
    <>
      <span className="min-w-0 flex-1">{topic.title}</span>
      {weak > 0 ? (
        <span className="shrink-0 rounded-full bg-gloss px-2 py-1 text-xs font-semibold text-gold-ink">
          {weak} to recall
        </span>
      ) : null}
      {learnt ? (
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary-strong">
          <Icon icon={Check} size="sm" />
          Learnt{mastery ? ` · ${mastery.percent}%` : ''}
        </span>
      ) : (
        <span className={cx('shrink-0 text-xs', next ? 'text-primary-strong' : 'text-fg-muted')}>
          {next ? 'Up next' : `${topic.minutes} min`}
        </span>
      )}
    </>
  );
  const { onSelect } = state;
  return onSelect ? (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(topic.slug)}
      className={className}
    >
      {content}
    </button>
  ) : (
    <Link
      href={`/learn/${topic.slug}`}
      aria-current={next ? 'step' : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}

/** One chevron for every fold: down when shut, up when open. */
export function Chevron({ open }: Readonly<{ open: boolean }>) {
  return (
    <Icon
      icon={ChevronDown}
      size="sm"
      className={cx(
        'shrink-0 text-fg-muted transition-transform duration-150 motion-reduce:transition-none',
        open && 'rotate-180',
      )}
    />
  );
}

/** The open trail (a region, then a book section in it) and how to fold one open or shut. */
interface Folds {
  trail: readonly string[];
  onToggle: (depth: number, id: string) => void;
}

/** A book section: a ring for how much is learnt, and its topics folding open underneath. */
function Section({
  section,
  state,
  folds,
}: Readonly<{ section: LibraryBranch; state: TopicsState; folds: Folds }>) {
  const id = useId();
  const topics = topicsUnder(section);
  const done = topics.filter((topic) => state.learnt.has(topic.slug)).length;
  const holdsNext = topics.some((topic) => topic.slug === state.next);
  const open = folds.trail[1] === section.id;
  const minutes = topics.reduce((total, topic) => total + topic.minutes, 0);
  return (
    <div
      className={cx(
        'rounded-lg border bg-glass transition-shadow duration-150',
        open ? 'border-glass-border shadow-glass' : 'border-transparent hover:shadow-glass',
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => folds.onToggle(1, section.id)}
        className="flex min-h-12 w-full items-center gap-3 rounded-lg px-4 py-3 text-left"
      >
        <span aria-hidden="true" className="flex shrink-0">
          <ProgressRing value={done} max={topics.length} label={section.label} size="sm" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-semibold text-ink">{section.label}</span>
          <span className="text-xs text-fg-muted">
            {topics.length} {topics.length === 1 ? 'topic' : 'topics'} · {minutes} min
            <span className="sr-only">
              , {done} of {topics.length} learnt
            </span>
          </span>
        </span>
        {holdsNext ? (
          <span className="shrink-0 rounded-full bg-primary-subtle px-2 py-1 text-xs font-semibold text-primary-strong">
            Up next
          </span>
        ) : null}
        <Chevron open={open} />
      </button>
      <div
        id={id}
        inert={!open}
        className={cx('fold motion-reduce:transition-none', open && 'fold-open')}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="ml-6 flex flex-col pr-3 pb-3">
            {topics.map((topic) => (
              <li key={topic.slug} className={RAIL}>
                <TopicRow topic={topic} state={state} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** A body region: its name and how far through it the student is, folding onto its sections. */
function Region({
  region,
  state,
  folds,
}: Readonly<{ region: LibraryBranch; state: TopicsState; folds: Folds }>) {
  const id = useId();
  const topics = topicsUnder(region);
  const sections = region.children.filter((node) => node.kind === 'branch');
  const open = folds.trail[0] === region.id;
  const done = topics.filter((topic) => state.learnt.has(topic.slug)).length;
  return (
    <section aria-labelledby={`${id}-name`} className="flex flex-col gap-2">
      <h2 id={`${id}-name`} className="font-display text-2xl tracking-display text-ink">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => folds.onToggle(0, region.id)}
          className="flex min-h-12 w-full items-end justify-between gap-3 text-left"
        >
          {region.label}
          <span className="flex items-center gap-2 pb-1 font-sans text-sm font-semibold tracking-normal text-fg-muted">
            {done} of {topics.length} learnt
            <Chevron open={open} />
          </span>
        </button>
      </h2>
      <progress
        className="progress-bar"
        value={done}
        max={topics.length}
        aria-label={`${region.label}: ${done} of ${topics.length} learnt`}
      />
      <div
        id={id}
        inert={!open}
        className={cx('fold motion-reduce:transition-none', open && 'fold-open')}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-2 pt-1">
            {sections.map((section) => (
              <li key={section.id}>
                <Section section={section} state={state} folds={folds} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * One subject's topics, folded to the body regions: one region open at a time, and in it one book
 * section, so the list stays short. Only the trail to a topic picked on arrival starts open; the
 * next topic to learn waits in a Continue row at the top. Topics outside a region are listed on
 * their own.
 */
export function SubjectTopics({
  subject,
  state,
}: Readonly<{ subject: LibrarySubject; state: TopicsState }>) {
  const regions = subject.nodes.filter((node) => node.kind === 'branch');
  const loose = subject.nodes.filter((node) => node.kind === 'topic');
  const continueId = useId();
  const [trail, setTrail] = useState(() => trailTo(subject.nodes, state.selected));
  const folds: Folds = {
    trail,
    onToggle: (depth, id) => setTrail((current) => toggledTrail(current, depth, id)),
  };
  const upNext = subject.nodes.flatMap(topicsUnder).find((topic) => topic.slug === state.next);
  if (subject.nodes.length === 0) {
    return (
      <div className="rounded-lg border border-glass-border bg-glass p-6 shadow-glass">
        <Text tone="muted">{subject.name} topics are coming soon.</Text>
      </div>
    );
  }
  return (
    <div className="flex animate-rise flex-col gap-6">
      {upNext ? (
        <section
          aria-labelledby={continueId}
          className="flex flex-col gap-1 rounded-lg border border-glass-border bg-glass p-2 shadow-glass"
        >
          <h2
            id={continueId}
            className="px-3 pt-1 text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
          >
            Continue
          </h2>
          <TopicRow topic={upNext} state={state} />
        </section>
      ) : null}
      {regions.map((region) => (
        <Region key={region.id} region={region} state={state} folds={folds} />
      ))}
      {loose.length > 0 ? (
        <section aria-label={`${subject.name} topics`} className="flex flex-col gap-3">
          <ul className="flex flex-col gap-1 rounded-lg border border-glass-border bg-glass p-2 shadow-glass">
            {loose.map((topic) => (
              <li key={topic.slug}>
                <TopicRow topic={topic} state={state} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
