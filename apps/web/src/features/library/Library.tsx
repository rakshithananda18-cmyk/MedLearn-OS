'use client';

import { cx, Display, Drawer, Eyebrow, Icon, type IconGlyph } from '@medlearn/ui';
import { Activity, BookMarked, BookOpen, Droplet, PersonStanding } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import { topicsUnder, topicTrails } from '@/content/library';
import { useProgress } from '@/features/progress/store';
import { BodyCard } from '@/features/shell/BodyCard';
import { useHydrated, useWide } from '@/features/shell/media';
import { SearchPill } from '@/features/shell/SearchPill';

import { type LibrarySubject, nextTopic, SubjectTopics } from './SubjectTopics';
import { type PreviewStatus, TopicPreview, type TopicPreviewData } from './TopicPreview';

const SUBJECT_ICON: Record<string, IconGlyph> = {
  anatomy: PersonStanding,
  physiology: Activity,
  biochemistry: Droplet,
};

/** The student's books by short title, or a nudge to choose them. */
function BooksCard({ books }: Readonly<{ books: string[] }>) {
  return (
    <Link
      href="/books"
      className="relative flex min-h-24 flex-col justify-between gap-3 overflow-hidden rounded-xl border border-glass-border bg-glass p-4 shadow-glass backdrop-blur-md transition-transform duration-150 hover:-translate-y-px md:p-6"
    >
      <span className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
        Your books
        <Icon icon={BookMarked} className="text-gold-ink" />
      </span>
      <span className="font-display text-2xl text-ink md:text-3xl" suppressHydrationWarning>
        {books.length > 0 ? (
          books.join(' · ')
        ) : (
          <>
            Choose the books <em>you follow</em>
          </>
        )}
      </span>
    </Link>
  );
}

/** A row of pills, one per subject, with how many topics each holds. */
function SubjectTabs({
  subjects,
  current,
  onPick,
}: Readonly<{ subjects: LibrarySubject[]; current: string; onPick: (slug: string) => void }>) {
  return (
    <div role="group" aria-label="Subjects" className="flex gap-2 overflow-x-auto pb-1">
      {subjects.map((subject) => {
        const on = subject.slug === current;
        const count = subject.nodes.flatMap(topicsUnder).length;
        return (
          <button
            key={subject.slug}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(subject.slug)}
            className={cx(
              'flex h-12 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-150',
              on
                ? 'bg-ink text-canvas shadow-raised'
                : 'border border-glass-border bg-glass text-ink hover:bg-surface',
            )}
          >
            <Icon icon={SUBJECT_ICON[subject.slug] ?? BookOpen} size="sm" />
            {subject.name}
            <span className={cx('text-xs font-normal', on ? 'text-canvas' : 'text-fg-muted')}>
              {count > 0 ? count : 'Soon'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * The library: search, the ways in (the body, the books), the subjects as tabs and each one's
 * regions and book sections, across the whole page. Picking a topic previews it: beside the
 * list on laptops (closing it gives the list the page back), in a drawer from the bottom on
 * phones and tablets. The pick is kept in the address, so coming back shows it again.
 */
export function Library({
  subjects,
  previews,
  books,
  initialTopic,
}: Readonly<{
  subjects: LibrarySubject[];
  previews: Record<string, TopicPreviewData>;
  /** Short titles of the books in the catalogue, by id. */
  books: Record<string, string>;
  /** The topic picked when the page opened (from the address), if any. */
  initialTopic: string | null;
}>) {
  const progress = useProgress();
  const wide = useWide();
  // The screen size is known only in the browser: until then neither preview opens.
  const hydrated = useHydrated();
  const [chosen, setChosen] = useState<string | null>(initialTopic);
  // The last topic shown stays in the drawer while it slides shut.
  const [shown, setShown] = useState<string | null>(initialTopic);
  const [tab, setTab] = useState<string | null>(null);
  const pick = (slug: string | null) => {
    setChosen(slug);
    if (slug) setShown(slug);
    window.history.replaceState(null, '', slug ? `/subjects?topic=${slug}` : '/subjects');
  };

  const learnt = new Set(progress.completedLessons);
  const next = nextTopic(subjects, learnt);
  const all = subjects.flatMap((subject) => subject.nodes.flatMap(topicsUnder));
  const holding = (slug: string | null) =>
    subjects.find((subject) =>
      subject.nodes.flatMap(topicsUnder).some((topic) => topic.slug === slug),
    );
  const current =
    subjects.find((subject) => subject.slug === tab) ??
    holding(chosen) ??
    holding(next) ??
    subjects[0];
  const trails = topicTrails(subjects.flatMap((subject) => subject.nodes));
  const preview = shown ? previews[shown] : undefined;
  let status: PreviewStatus = 'new';
  if (shown && learnt.has(shown)) status = 'learnt';
  else if (shown === next) status = 'next';
  const view =
    preview && shown ? (
      <TopicPreview
        preview={preview}
        trail={trails[shown] ?? []}
        status={status}
        onClose={() => pick(null)}
      />
    ) : null;
  const myBooks = (progress.profile?.books ?? []).flatMap((id) => {
    const title = books[id];
    return title ? [title] : [];
  });

  return (
    <div className="flex items-start">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-col gap-2">
            <Eyebrow>First year · {all.length} topics</Eyebrow>
            <Display>
              Your <em>library</em>
            </Display>
          </div>
          <SearchPill className="xl:w-full xl:max-w-sm" />
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          <BodyCard
            learnt={all.filter((topic) => learnt.has(topic.slug)).length}
            total={all.length}
            className="transition-transform duration-150 hover:-translate-y-px"
          />
          <BooksCard books={myBooks} />
        </div>
        {current ? (
          <>
            <SubjectTabs subjects={subjects} current={current.slug} onPick={setTab} />
            <SubjectTopics
              key={current.slug}
              subject={current}
              state={{ learnt, next, selected: chosen, onSelect: pick }}
            />
          </>
        ) : null}
      </div>
      {/* Laptops: the preview slides in beside the list (transform and opacity only, so it
          stays smooth), and its sticky column keeps it in view while the list scrolls. */}
      {hydrated && wide && chosen !== null ? (
        <aside
          aria-label="Topic preview"
          className="sticky top-8 ml-8 w-preview shrink-0 animate-slide-in motion-reduce:animate-none"
        >
          {view}
        </aside>
      ) : null}
      {/* Phones and tablets: the same preview in a drawer from the bottom. */}
      {wide ? null : (
        <Drawer
          title={preview?.topic.title ?? 'Topic preview'}
          open={hydrated && chosen !== null}
          onOpenChange={(open) => {
            if (!open) pick(null);
          }}
        >
          {view}
        </Drawer>
      )}
    </div>
  );
}
