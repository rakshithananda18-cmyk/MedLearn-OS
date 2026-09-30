'use client';

import { topicMastery } from '@medlearn/core';
import type { BodyRegion, PartKind } from '@medlearn/schemas';
import { cx, Icon, IconButton, Switch, Text } from '@medlearn/ui';
import { Eye, PersonStanding, Search, X } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import type { BodyRegionInfo } from '@/content/body';
import { type LibraryNode, topicsUnder } from '@/content/library';
import { Chevron } from '@/features/library/SubjectTopics';
import { useProgress } from '@/features/progress/store';

import type { StructureInfo, StudioTopic } from './knowledge';
import type { Quality, StudioSettings } from './saved';
import type { Detail } from './session';

export const GLASS = 'rounded-xl border border-glass-border bg-glass shadow-glass backdrop-blur-md';
export const LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';

/**
 * Where a panel sits: floating over the model (phones, tablets held upright), docked beside it
 * (tablets held sideways, laptops), or inline inside another docked panel.
 */
export type Place = 'float' | 'dock' | 'inline';

function Sheet({
  label,
  side,
  place,
  compact = false,
  action,
  onClose,
  children,
}: Readonly<{
  label: string;
  side: 'left' | 'right';
  place: Place;
  /** A floating sheet only as tall as its content, rather than down to the bottom bar. */
  compact?: boolean;
  /** A button beside the title where docked, such as folding the panel away. */
  action?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}>) {
  return (
    <section
      aria-label={label}
      className={cx(
        'pointer-events-auto flex flex-col gap-4',
        place === 'float' &&
          cx(
            GLASS,
            'absolute top-20 z-20 w-sheet animate-rise overflow-y-auto p-4',
            compact ? 'max-h-sheet' : 'bottom-24',
            side === 'left' ? 'left-3' : 'right-3',
          ),
        place === 'dock' && cx(GLASS, 'w-dock shrink-0 overflow-x-hidden overflow-y-auto p-4'),
      )}
    >
      <div className="flex min-h-8 items-center justify-between gap-2">
        <h2 className={LABEL}>{label}</h2>
        {place === 'float' ? (
          <IconButton icon={X} label={`Close ${label.toLowerCase()}`} size="sm" onClick={onClose} />
        ) : (
          action
        )}
      </div>
      {children}
    </section>
  );
}

interface CardNote {
  text: string;
  tone: string;
  border: string;
}

/** What each topic's card says: open now, up next, how well it is learnt, or how long it takes. */
function useCardNotes(topics: StudioTopic[], current: string | null) {
  const progress = useProgress();
  const now = new Date();
  const next = topics.find((topic) => !progress.completedLessons.includes(topic.slug));
  return (topic: StudioTopic): CardNote => {
    if (topic.slug === current) {
      return { text: 'Open', tone: 'text-gold-ink', border: 'border-gold' };
    }
    if (topic === next) {
      return {
        text: `Up next · ${topic.estimatedMinutes} min`,
        tone: 'text-primary-strong',
        border: 'border-primary',
      };
    }
    const mastery = topicMastery(topic, progress, now);
    return mastery.lessonDone
      ? {
          text: `Learnt · ${mastery.percent}%`,
          tone: 'text-primary-strong',
          border: 'border-glass-border',
        }
      : {
          text: `${topic.estimatedMinutes} min`,
          tone: 'text-fg-muted',
          border: 'border-glass-border',
        };
  };
}

/**
 * A topic as a card with a still of its model: a button that opens it in the studio, or a link to
 * the lesson for a topic with nothing to show in 3D.
 */
function TopicCard({
  topic,
  note,
  current,
  onOpen,
}: Readonly<{
  topic: StudioTopic;
  note: CardNote;
  current: boolean;
  onOpen: (slug: string) => void;
}>) {
  const card = cx(
    'flex h-24 w-full gap-3 rounded-lg border bg-glass p-2 text-left shadow-glass backdrop-blur-md',
    note.border,
  );
  const body = (
    <>
      <span className="relative size-20 shrink-0 overflow-hidden rounded-md bg-surface-muted">
        {topic.poster ? (
          <Image
            src={topic.poster}
            alt=""
            width={96}
            height={96}
            unoptimized
            className="size-full object-contain"
          />
        ) : null}
      </span>
      <span className="flex min-w-0 flex-col justify-between py-1">
        <span className="line-clamp-2 text-sm font-semibold text-ink">{topic.title}</span>
        <span className={cx('text-xs font-semibold', note.tone)}>{note.text}</span>
      </span>
    </>
  );
  return topic.model ? (
    <button
      type="button"
      aria-current={current ? 'true' : undefined}
      onClick={() => onOpen(topic.slug)}
      className={card}
    >
      {body}
    </button>
  ) : (
    <Link href={`/learn/${topic.slug}`} className={card}>
      {body}
    </Link>
  );
}

/** The branches of the tree that lead to a topic, by id: its region and its book section. */
function trailTo(nodes: LibraryNode[], slug: string | null): string[] {
  for (const node of nodes) {
    if (node.kind === 'topic') continue;
    if (topicsUnder(node).some((topic) => topic.slug === slug)) {
      return [node.id, ...trailTo(node.children, slug)];
    }
  }
  return [];
}

/** A branch of the topic tree: its name and count, folding open onto what it holds. */
function Branch({
  label,
  learnt,
  total,
  top,
  open,
  onToggle,
  children,
}: Readonly<{
  label: string;
  learnt: number;
  total: number;
  /** A body region, set larger than the book sections inside it. */
  top: boolean;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}>) {
  return (
    <li className="flex flex-col">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex min-h-12 w-full items-center gap-2 rounded-md px-2 text-left transition-colors duration-150 hover:bg-surface-muted"
      >
        <span
          className={cx(
            'min-w-0 flex-1',
            top ? 'font-display text-2xl text-ink' : 'text-sm font-semibold text-ink',
          )}
        >
          {label}
        </span>
        <span className="shrink-0 text-xs text-fg-muted" suppressHydrationWarning>
          {learnt}/{total}
        </span>
        <Chevron open={open} />
      </button>
      <div className={cx('fold', open && 'fold-open')}>
        <div className="min-h-0 overflow-hidden" inert={!open}>
          {children}
        </div>
      </div>
    </li>
  );
}

/**
 * The topics as the library's tree: body regions, then book sections, then a card for each
 * topic. Every branch folds; the ones leading to the open (or next) topic start open.
 */
function TopicTree({
  tree,
  topics,
  current,
  onRegion,
  onTopic,
}: Readonly<{
  tree: LibraryNode[];
  topics: StudioTopic[];
  current: string | null;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string) => void;
}>) {
  const learnt = new Set(useProgress().completedLessons);
  const noteOf = useCardNotes(topics, current);
  const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const focus = current ?? topics.find((topic) => !learnt.has(topic.slug))?.slug ?? null;
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(trailTo(tree, focus)));
  // Opening another topic unfolds the branches that lead to it.
  const [seen, setSeen] = useState(current);
  if (seen !== current) {
    setSeen(current);
    setOpen(new Set([...open, ...trailTo(tree, current)]));
  }

  const render = (node: LibraryNode, top: boolean): ReactNode => {
    if (node.kind === 'topic') {
      const topic = bySlug.get(node.slug);
      return topic ? (
        <li key={node.slug}>
          <TopicCard
            topic={topic}
            note={noteOf(topic)}
            current={node.slug === current}
            onOpen={onTopic}
          />
        </li>
      ) : null;
    }
    const under = topicsUnder(node);
    const isOpen = open.has(node.id);
    return (
      <Branch
        key={node.id}
        label={node.label}
        learnt={under.filter((topic) => learnt.has(topic.slug)).length}
        total={under.length}
        top={top}
        open={isOpen}
        onToggle={() => {
          const next = new Set(open);
          if (isOpen) next.delete(node.id);
          else next.add(node.id);
          setOpen(next);
          // A region opening also turns the body towards it.
          if (top && !isOpen) onRegion(node.id as BodyRegion);
        }}
      >
        <ul className="flex flex-col gap-2 pt-1 pb-2 pl-2">
          {node.children.map((child) => render(child, false))}
        </ul>
      </Branch>
    );
  };

  return (
    <ul aria-label="Regions and topics" className="flex flex-col gap-1">
      {tree.map((node) => render(node, true))}
    </ul>
  );
}

export function TopicsPanel({
  place,
  tree,
  topics,
  regions,
  current,
  search,
  action,
  onRegion,
  onTopic,
  onClose,
}: Readonly<{
  place: Place;
  /** The anatomy topics as the library's tree. */
  tree: LibraryNode[];
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  current: string | null;
  /** The structure search, where the topics are docked. */
  search?: ReactNode;
  /** Folds the docked panel away. */
  action?: ReactNode;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string | null) => void;
  onClose: () => void;
}>) {
  const soon = regions.filter(
    (region) => !tree.some((node) => node.kind === 'branch' && node.id === region.id),
  );
  return (
    <Sheet label="Topics" side="left" place={place} action={action} onClose={onClose}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">{search}</div>
        <IconButton
          icon={PersonStanding}
          label="Whole body"
          title="Whole body"
          variant="secondary"
          aria-pressed={current === null}
          className={cx(current === null && 'border-gold bg-primary-subtle text-primary-strong')}
          onClick={() => onTopic(null)}
        />
      </div>
      <TopicTree
        tree={tree}
        topics={topics}
        current={current}
        onRegion={onRegion}
        onTopic={onTopic}
      />
      {soon.length > 0 ? (
        <Text size="xs" tone="muted" className="px-2">
          Coming soon: {soon.map((region) => region.name).join(' · ')}
        </Text>
      ) : null}
    </Sheet>
  );
}

/** Find a structure on the open model, or a topic on the whole body, by name. */
export function StructureSearch({
  items,
  label,
  autoFocus = false,
  onPick,
}: Readonly<{
  items: Array<{ id: string; name: string }>;
  label: string;
  autoFocus?: boolean;
  onPick: (id: string) => void;
}>) {
  const [query, setQuery] = useState('');
  const words = query.trim().toLowerCase();
  const found = words
    ? items.filter((item) => item.name.toLowerCase().includes(words)).slice(0, 8)
    : [];
  return (
    <div className="flex flex-col gap-2">
      <label className="flex h-12 items-center gap-2 rounded-md border border-border-strong bg-surface px-3 text-fg-muted focus-within:border-primary">
        <Icon icon={Search} size="sm" />
        <span className="sr-only">{label}</span>
        <input
          type="search"
          value={query}
          placeholder={label}
          // Opened on purpose by the search button, so the keyboard should come up.
          autoFocus={autoFocus} // NOSONAR: the student asked for search by tapping its button
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
        />
      </label>
      {words ? (
        <ul aria-label="Search results" className="flex flex-col gap-1">
          {found.length === 0 ? (
            <li>
              <Text size="sm" tone="muted">
                Nothing by that name here.
              </Text>
            </li>
          ) : null}
          {found.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  onPick(item.id);
                }}
                className="min-h-12 w-full rounded-md px-3 text-left text-sm text-ink hover:bg-surface-muted"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** A floating sheet holding the search, on phones and tablets held upright. */
export function SearchSheet({
  label,
  onClose,
  children,
}: Readonly<{ label: string; onClose: () => void; children: ReactNode }>) {
  return (
    <Sheet label={label} side="left" place="float" onClose={onClose}>
      {children}
    </Sheet>
  );
}

const LAYERS: Array<{ kind: PartKind; title: string }> = [
  { kind: 'bone', title: 'Bones' },
  { kind: 'muscle', title: 'Muscles' },
  { kind: 'artery', title: 'Arteries' },
  { kind: 'vein', title: 'Veins' },
];

/** Layers on and off, two by two, and the structures the student has hidden one by one. */
export function LayersPanel({
  place,
  kinds,
  hiddenKinds,
  hidden,
  onKind,
  onShow,
  onClose,
}: Readonly<{
  place: Place;
  kinds: PartKind[];
  hiddenKinds: ReadonlySet<PartKind>;
  /** Structures hidden one by one, to show again. */
  hidden: Array<{ id: string; name: string }>;
  onKind: (kind: PartKind) => void;
  onShow: (id: string) => void;
  onClose: () => void;
}>) {
  return (
    <Sheet label="Layers" side="right" place={place} onClose={onClose}>
      <div className="grid grid-cols-2 gap-2">
        {LAYERS.filter((layer) => kinds.includes(layer.kind)).map((layer) => {
          const on = !hiddenKinds.has(layer.kind);
          return (
            <button
              key={layer.kind}
              type="button"
              aria-pressed={on}
              onClick={() => onKind(layer.kind)}
              className={cx(
                'h-12 rounded-md text-sm font-semibold transition-colors duration-150',
                on
                  ? 'bg-ink text-canvas'
                  : 'border border-border-strong text-ink hover:bg-surface-muted',
              )}
            >
              {layer.title}
            </button>
          );
        })}
      </div>
      {hidden.length > 0 ? (
        <div className="flex flex-col gap-1">
          <h3 className={LABEL}>Hidden</h3>
          <ul className="flex flex-col">
            {hidden.map((structure) => (
              <li key={structure.id} className="flex items-center justify-between gap-2">
                <span className="text-sm text-fg-muted line-through">{structure.name}</span>
                <IconButton
                  icon={Eye}
                  label={`Show ${structure.name}`}
                  size="sm"
                  onClick={() => onShow(structure.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Sheet>
  );
}

const KIND_LABEL: Record<NonNullable<StructureInfo['kind']>, string> = {
  bone: 'Bone',
  muscle: 'Muscle',
  artery: 'Artery',
  vein: 'Vein',
  skin: 'Surface',
  nerve: 'Nerve',
  lymph: 'Lymph nodes',
  outline: 'Outline',
};

const KIND_DOT: Record<NonNullable<StructureInfo['kind']>, string> = {
  bone: 'bg-anat-bone',
  muscle: 'bg-anat-muscle',
  artery: 'bg-anat-artery',
  vein: 'bg-anat-vein',
  skin: 'bg-anat-skin',
  nerve: 'bg-anat-nerve',
  lymph: 'bg-anat-lymph',
  outline: 'bg-fg-muted',
};

/** On a phone, a long path shows only its last steps, up to the structure itself. */
const PHONE_PATH = 4;

function PathChips({ info, docked }: Readonly<{ info: StructureInfo; docked: boolean }>) {
  if (info.path.length === 0) return null;
  const cut = !docked && info.path.length > PHONE_PATH + 1;
  const steps = cut ? info.path.slice(-PHONE_PATH) : info.path;
  return (
    <ol aria-label="Path" className="flex flex-wrap gap-1 text-xs font-semibold">
      {cut ? (
        <li aria-label={`${info.path.length - PHONE_PATH} earlier steps`} className="px-1 py-1">
          …
        </li>
      ) : null}
      {steps.map((step) => (
        <li
          key={step}
          className={cx(
            'rounded-sm px-2 py-1',
            step === info.name
              ? 'bg-primary-subtle text-primary-strong'
              : 'bg-surface-muted text-fg',
          )}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}

function Notes({
  title,
  tone,
  notes,
}: Readonly<{ title: string; tone: string; notes: Array<{ label: string; text: string }> }>) {
  return (
    <div className={cx('flex flex-col gap-1 rounded-md p-3', tone)}>
      <h3 className="text-xs font-semibold uppercase tracking-eyebrow">{title}</h3>
      {notes.map((note) => (
        <Text key={note.label} size="sm">
          <strong>{note.label}.</strong> {note.text}
        </Text>
      ))}
    </div>
  );
}

function AlsoIn({
  info,
  onTopic,
}: Readonly<{ info: StructureInfo; onTopic: (slug: string) => void }>) {
  if (info.alsoIn.length === 0) return null;
  return (
    <div className="flex w-full min-w-0 items-center gap-2">
      <span className="shrink-0 text-xs text-fg-muted">
        Also in <span className="font-semibold">{info.alsoIn.length}</span>
      </span>
      {/* One row of tags that scrolls sideways, however many topics share the structure; only
          the row moves, and a mouse wheel over it scrolls it along. */}
      <ul
        aria-label="Also in"
        onWheel={(event) => {
          const row = event.currentTarget;
          if (
            row.scrollWidth > row.clientWidth &&
            Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ) {
            row.scrollLeft += event.deltaY;
          }
        }}
        className="scroll-row flex min-w-0 flex-1 gap-1 overscroll-x-contain pb-1"
      >
        {info.alsoIn.map((topic) => (
          <li key={topic.slug} className="shrink-0">
            <button
              type="button"
              onClick={() => onTopic(topic.slug)}
              className="h-8 rounded-full border border-border-strong bg-surface px-3 text-xs font-semibold whitespace-nowrap text-ink transition-colors duration-150 hover:border-gold"
            >
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const clinicalOf = (info: StructureInfo) =>
  info.clinical.map((lesion) => ({ label: lesion.label, text: lesion.explanation }));
const lessonOf = (info: StructureInfo) =>
  info.lesson.map((step) => ({ label: step.title, text: step.body }));

/**
 * What a picked structure is. Docked beside the model it shows everything; on a phone it is
 * short, with a button each for the clinical note and the lesson, and one to hide the part.
 */
export function InfoCard({
  docked,
  info,
  detail,
  onDetail,
  onHide,
  onTopic,
  onClose,
}: Readonly<{
  docked: boolean;
  info: StructureInfo;
  detail: Detail;
  onDetail: (detail: Detail) => void;
  onHide: () => void;
  onTopic: (slug: string) => void;
  onClose: () => void;
}>) {
  const kind = info.kind ? KIND_LABEL[info.kind] : null;
  const toggle = (next: Exclude<Detail, null>) => onDetail(detail === next ? null : next);
  const button = (on: boolean) =>
    cx(
      'h-12 rounded-md text-sm font-semibold transition-colors duration-150 disabled:opacity-50',
      on
        ? 'bg-primary text-on-primary'
        : 'border border-border-strong text-ink hover:bg-surface-muted',
    );
  return (
    <section
      aria-label={info.name}
      className="pointer-events-auto flex min-w-0 animate-rise flex-col gap-3"
    >
      <div className="flex items-start gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {kind ? (
            <span className={cx(LABEL, 'flex items-center gap-2')}>
              <span
                aria-hidden="true"
                className={cx('size-2 rounded-full', info.kind && KIND_DOT[info.kind])}
              />
              {kind}
            </span>
          ) : null}
          <h2
            className={cx(
              'text-gold font-display tracking-display',
              docked ? 'text-4xl' : 'text-3xl',
            )}
          >
            {info.name}
          </h2>
        </div>
        <IconButton icon={X} label="Close" size="sm" onClick={onClose} />
      </div>
      {info.about ? (
        <Text size="sm" className={docked ? undefined : 'line-clamp-3'}>
          {info.about}
        </Text>
      ) : null}
      <PathChips info={info} docked={docked} />
      {docked ? null : (
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            aria-pressed={detail === 'clinical'}
            disabled={info.clinical.length === 0}
            onClick={() => toggle('clinical')}
            className={button(detail === 'clinical')}
          >
            Clinical note
          </button>
          <button
            type="button"
            aria-pressed={detail === 'lesson'}
            disabled={info.lesson.length === 0}
            onClick={() => toggle('lesson')}
            className={button(detail === 'lesson')}
          >
            In the lesson
          </button>
          <button type="button" onClick={onHide} className={button(false)}>
            Hide it
          </button>
        </div>
      )}
      {(docked || detail === 'clinical') && info.clinical.length > 0 ? (
        <Notes title="Clinical" tone="bg-warning-subtle text-warning" notes={clinicalOf(info)} />
      ) : null}
      {(docked || detail === 'lesson') && info.lesson.length > 0 ? (
        <Notes title="In the lesson" tone="bg-surface-muted text-ink" notes={lessonOf(info)} />
      ) : null}
      {docked || detail !== null ? <AlsoIn info={info} onTopic={onTopic} /> : null}
    </section>
  );
}

/**
 * The whole body on a phone: a chip for each region, then that region's topics as cards with
 * their model, the next one to learn marked.
 */
export function BodyBrowser({
  topics,
  regions,
  region,
  onRegion,
  onTopic,
}: Readonly<{
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  region: BodyRegion;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string) => void;
}>) {
  const progress = useProgress();
  const inRegion = topics.filter((topic) => topic.regions.includes(region));
  const learnt = inRegion.filter((topic) => progress.completedLessons.includes(topic.slug));
  const noteOf = useCardNotes(inRegion, null);
  const name = regions.find((item) => item.id === region)?.name ?? '';
  return (
    <section aria-label="Regions and topics" className="pointer-events-auto flex flex-col gap-3">
      <fieldset className="flex gap-2 overflow-x-auto pb-1">
        <legend className="sr-only">Regions</legend>
        {regions.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === region}
            onClick={() => onRegion(item.id)}
            className={cx(
              'h-12 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-150',
              item.id === region
                ? 'bg-ink text-canvas'
                : 'border border-glass-border bg-glass text-ink backdrop-blur-md',
            )}
          >
            {item.name}
          </button>
        ))}
      </fieldset>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-gold font-display text-3xl tracking-display">{name}</h2>
        <span className="text-xs font-semibold text-fg-muted">
          {learnt.length} of {inRegion.length} learnt
        </span>
      </div>
      {inRegion.length === 0 ? (
        <Text size="sm" tone="muted">
          Topics coming soon.
        </Text>
      ) : (
        <ul aria-label="Topics in this region" className="flex gap-2 overflow-x-auto pb-1">
          {inRegion.map((topic) => (
            <li key={topic.slug} className="w-card shrink-0">
              <TopicCard topic={topic} note={noteOf(topic)} current={false} onOpen={onTopic} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const QUALITY_CHOICES: Array<[Quality, string]> = [
  ['auto', 'Auto'],
  ['saver', 'Battery saver'],
  ['sharp', 'Sharp'],
];

const QUALITY_HINT: Record<Quality, string> = {
  auto: 'Matched to this device: sharp where it has the power, lighter where it does not.',
  saver: 'Fewer pixels: smoother on older phones and easier on the battery.',
  sharp: 'Full screen resolution, whatever the device.',
};

/** One setting: its switch, and a line on what it does. */
function Setting({
  label,
  hint,
  checked,
  onChange,
}: Readonly<{ label: string; hint: string; checked: boolean; onChange: (on: boolean) => void }>) {
  return (
    <div className="flex flex-col gap-1">
      <Switch label={label} checked={checked} onCheckedChange={onChange} />
      <Text size="sm" tone="muted">
        {hint}
      </Text>
    </div>
  );
}

/** How the 3D view looks and moves, kept on this device. */
export function SettingsPanel({
  settings,
  reducedMotion,
  canFlat,
  onChange,
  onClose,
}: Readonly<{
  settings: StudioSettings;
  /** The device asks for less motion; smooth moves follow it until the student chooses. */
  reducedMotion: boolean;
  /** The open topic has a labelled diagram to show instead of the model. */
  canFlat: boolean;
  onChange: (settings: StudioSettings) => void;
  onClose: () => void;
}>) {
  return (
    <Sheet label="Settings" side="right" place="float" compact onClose={onClose}>
      {canFlat ? (
        <Setting
          label="Flat diagram (2D)"
          hint="The topic as a labelled diagram to trace, in place of the 3D model."
          checked={settings.flat}
          onChange={(flat) => onChange({ ...settings, flat })}
        />
      ) : null}
      <Setting
        label="Names on the model"
        hint="Region counts on the body, and the picked structure with its path on a topic."
        checked={settings.labels}
        onChange={(labels) => onChange({ ...settings, labels })}
      />
      <Setting
        label="Smooth camera moves"
        hint="Glide between guided views. Off jumps straight there."
        checked={settings.smooth ?? !reducedMotion}
        onChange={(smooth) => onChange({ ...settings, smooth })}
      />
      <Setting
        label="Read tours aloud"
        hint="The guided tour speaks each view as well as showing it."
        checked={settings.narrate}
        onChange={(narrate) => onChange({ ...settings, narrate })}
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="pb-1 text-sm font-medium text-fg">Picture</legend>
        <div className="grid grid-cols-3 gap-1 rounded-full bg-surface-muted p-1">
          {QUALITY_CHOICES.map(([quality, label]) => (
            <button
              key={quality}
              type="button"
              aria-pressed={settings.quality === quality}
              onClick={() => onChange({ ...settings, quality })}
              className={cx(
                'h-8 rounded-full text-sm font-semibold transition-colors duration-150',
                settings.quality === quality ? 'bg-ink text-canvas' : 'text-ink hover:bg-surface',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <Text size="sm" tone="muted">
          {QUALITY_HINT[settings.quality]}
        </Text>
      </fieldset>
    </Sheet>
  );
}
