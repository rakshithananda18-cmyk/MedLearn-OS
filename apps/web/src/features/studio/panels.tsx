'use client';

import { topicMastery } from '@medlearn/core';
import type { BodyRegion, PartKind } from '@medlearn/schemas';
import { cx, Icon, IconButton, Text, ToggleChip } from '@medlearn/ui';
import { Eye, Search, X } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import type { BodyRegionInfo } from '@/content/body';
import { useProgress } from '@/features/progress/store';

import type { StructureInfo, StudioTopic } from './knowledge';
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
  onClose,
  children,
}: Readonly<{
  label: string;
  side: 'left' | 'right';
  place: Place;
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
            'absolute top-20 bottom-24 z-20 w-sheet animate-rise overflow-y-auto p-4',
            side === 'left' ? 'left-3' : 'right-3',
          ),
        place === 'dock' && cx(GLASS, 'w-dock shrink-0 overflow-y-auto p-4'),
      )}
    >
      <div className="flex min-h-8 items-center justify-between gap-2">
        <h2 className={LABEL}>{label}</h2>
        {place === 'float' ? (
          <IconButton icon={X} label={`Close ${label.toLowerCase()}`} size="sm" onClick={onClose} />
        ) : null}
      </div>
      {children}
    </section>
  );
}

/** How far along each topic is: open now, a mastery percentage once learnt, or new. */
function useTopicStatus(current: string | null) {
  const progress = useProgress();
  const now = new Date();
  return (topic: StudioTopic): { text: string; tone: string } => {
    if (topic.slug === current) return { text: 'Open', tone: 'text-gold-ink' };
    const mastery = topicMastery(topic, progress, now);
    return mastery.lessonDone
      ? { text: `${mastery.percent}%`, tone: 'text-primary-strong' }
      : { text: 'New', tone: 'text-fg-muted' };
  };
}

export function TopicsPanel({
  place,
  topics,
  regions,
  region,
  current,
  search,
  guide,
  best,
  onRegion,
  onTopic,
  onClose,
}: Readonly<{
  place: Place;
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  region: BodyRegion;
  current: string | null;
  /** The structure search, where the topics are docked. */
  search?: ReactNode;
  /** The open model's guided views. */
  guide: ReactNode;
  /** Best "Find it" streak on the open topic, or null on the whole body. */
  best: number | null;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string | null) => void;
  onClose: () => void;
}>) {
  const status = useTopicStatus(current);
  const inRegion = topics.filter((topic) => topic.regions.includes(region));
  const regionName = regions.find((item) => item.id === region)?.name ?? 'Topics';
  const row =
    'flex min-h-12 w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm font-semibold text-ink transition-colors duration-150';
  const now = 'border-gold bg-surface shadow-raised';
  const other = 'border-transparent hover:border-border-strong';
  return (
    <Sheet label="Topics" side="left" place={place} onClose={onClose}>
      {search}
      <button
        type="button"
        aria-current={current === null ? 'true' : undefined}
        onClick={() => onTopic(null)}
        className={cx(row, current === null ? now : other)}
      >
        Whole body
        <span className="text-xs font-semibold text-fg-muted">Regions</span>
      </button>
      {/* Docked beside an open topic, the list stays on that topic's region. */}
      {place === 'dock' && current !== null ? null : (
        <fieldset className="flex flex-wrap gap-2">
          <legend className={cx(LABEL, 'pb-2')}>Regions</legend>
          {regions.map((item) => (
            <ToggleChip
              key={item.id}
              pressed={item.id === region}
              onClick={() => onRegion(item.id)}
            >
              {item.name}
            </ToggleChip>
          ))}
        </fieldset>
      )}
      <div className="flex flex-col gap-1">
        <h3 className={LABEL}>{regionName}</h3>
        {inRegion.length === 0 ? (
          <Text size="sm" tone="muted">
            Topics coming soon.
          </Text>
        ) : (
          <ul aria-label="Topics in this region" className="flex flex-col gap-1">
            {inRegion.map((topic) => (
              <li key={topic.slug}>
                {topic.model ? (
                  <button
                    type="button"
                    aria-current={topic.slug === current ? 'true' : undefined}
                    onClick={() => onTopic(topic.slug)}
                    className={cx(row, topic.slug === current ? now : other)}
                  >
                    {topic.title}
                    <span className={cx('shrink-0 text-xs', status(topic).tone)}>
                      {status(topic).text}
                    </span>
                  </button>
                ) : (
                  // Topics with no body structures to show (a physiology graph) open their lesson.
                  <Link href={`/learn/${topic.slug}`} className={cx(row, other)}>
                    {topic.title}
                    <span className="shrink-0 text-xs text-fg-muted">Lesson</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={LABEL}>Guided views</h3>
        {guide}
      </div>
      {best === null ? null : (
        <div className="mt-auto flex items-center gap-3 rounded-lg border border-border bg-surface-muted p-3">
          <span className="text-gold font-display text-4xl">{best}</span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-ink">Best “Find it” streak</span>
            <span className="text-xs text-fg-muted">Play to beat it</span>
          </span>
        </div>
      )}
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
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-fg-muted">Also in</span>
      {info.alsoIn.map((topic) => (
        <ToggleChip key={topic.slug} pressed={false} onClick={() => onTopic(topic.slug)}>
          {topic.title}
        </ToggleChip>
      ))}
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
      className="pointer-events-auto flex animate-rise flex-col gap-3"
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

function cardNote(topic: StudioTopic, next: boolean, learnt: boolean): string {
  if (next) return `Up next · ${topic.estimatedMinutes} min`;
  return learnt ? 'Learnt' : `${topic.estimatedMinutes} min`;
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
  const next = inRegion.find((topic) => !progress.completedLessons.includes(topic.slug));
  const name = regions.find((item) => item.id === region)?.name ?? '';
  const card =
    'flex h-24 w-full gap-3 rounded-lg border bg-glass p-2 text-left shadow-glass backdrop-blur-md';
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
          {inRegion.map((topic) => {
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
                  <span
                    className={cx(
                      'text-xs font-semibold',
                      topic === next ? 'text-primary-strong' : 'text-fg-muted',
                    )}
                  >
                    {cardNote(topic, topic === next, learnt.includes(topic))}
                  </span>
                </span>
              </>
            );
            return (
              <li key={topic.slug} className="w-card shrink-0">
                {topic.model ? (
                  <button
                    type="button"
                    onClick={() => onTopic(topic.slug)}
                    className={cx(card, topic === next ? 'border-primary' : 'border-glass-border')}
                  >
                    {body}
                  </button>
                ) : (
                  <Link href={`/learn/${topic.slug}`} className={cx(card, 'border-glass-border')}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
