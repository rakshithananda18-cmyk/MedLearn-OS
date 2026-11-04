'use client';

import { topicMastery } from '@medlearn/core';
import type { BodyRegion } from '@medlearn/schemas';
import { cx, Icon, IconButton, Switch, Text } from '@medlearn/ui';
import { Eye, Pause, PersonStanding, Play, X } from '@medlearn/ui/icons';
import type { LayerKind, SectionPlane, Viewer3DSection } from '@medlearn/visuals/viewer3d';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

import type { BodyRegionInfo } from '@/content/body';
import { type LibraryNode, toggledTrail, topicsUnder, trailTo } from '@/content/library';
import { type MovementId, type MovementPhase, phaseAt } from '@/content/movements';
import { Chevron } from '@/features/library/SubjectTopics';
import { useProgress } from '@/features/progress/store';
import { FoldBody } from '@/features/shell/FoldBody';

import type { StructureInfo, StudioTopic } from './knowledge';
import type { Quality, StudioSettings } from './saved';
import type { Detail } from './session';

export const GLASS =
  'rounded-xl border border-border/80 bg-surface/98 shadow-raised backdrop-blur-md';
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
  /**
   * A floating sheet only as tall as its content, rather than down to the bottom bar; on 'phone'
   * only there, so the model keeps half the small screen.
   */
  compact?: boolean | 'phone';
  /** A button beside the title where docked, such as folding the panel away. */
  action?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}>) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (place !== 'float') return;
    const element = panel.current;
    const opener = document.activeElement;
    element?.focus({ preventScroll: true });
    return () => {
      // Switching tools already puts focus on the next trigger. Only restore it when focus was
      // in the closing panel, or its focused control has just been removed from the document.
      if (
        opener instanceof HTMLElement &&
        opener.isConnected &&
        (document.activeElement === document.body || element?.contains(document.activeElement))
      ) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [place, label]);
  return (
    <section
      ref={panel}
      role={place === 'float' ? 'dialog' : undefined}
      aria-label={label}
      aria-modal={place === 'float' ? false : undefined}
      tabIndex={place === 'float' ? -1 : undefined}
      onKeyDown={(event) => {
        if (place === 'float' && event.key === 'Escape' && !event.defaultPrevented) {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }
      }}
      className={cx(
        'pointer-events-auto flex flex-col gap-4',
        place === 'float' &&
          cx(
            GLASS,
            'absolute top-20 z-20 w-sheet animate-rise overflow-y-auto overscroll-contain p-4 max-sm:inset-x-3 max-sm:w-auto',
            compact === true && 'max-h-sheet',
            compact === 'phone' && 'max-md:max-h-sheet md:bottom-24',
            !compact && 'bottom-24',
            side === 'left' ? 'left-3' : 'right-3',
          ),
        // Docked, the panel is only as tall as what is unfolded in it (its list scrolls past the
        // screen), and it stands above the model so the search's suggestions can hang over it.
        place === 'dock' && cx(GLASS, 'relative z-10 max-h-full w-dock shrink-0 self-start p-4'),
      )}
    >
      <div className="flex min-h-8 items-center justify-between gap-2">
        {/* Docked, the title lines up with the names in the list below it. */}
        <h2 className={cx(LABEL, place === 'dock' && 'px-2')}>{label}</h2>
        {place === 'float' ? (
          <IconButton icon={X} label={`Close ${label.toLowerCase()}`} onClick={onClose} />
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
  row = false,
  onOpen,
}: Readonly<{
  topic: StudioTopic;
  note: CardNote;
  current: boolean;
  /** A plain row, as in the library's list, rather than a card with a still. */
  row?: boolean;
  onOpen: (slug: string) => void;
}>) {
  const card = row
    ? cx(
        'flex min-h-12 w-full items-center gap-3 rounded-md px-2 text-left text-sm transition-colors duration-150',
        current
          ? 'bg-primary-subtle font-semibold text-primary-strong'
          : 'text-ink hover:bg-surface-muted',
      )
    : cx(
        'flex h-24 w-full gap-3 rounded-lg border bg-glass p-2 text-left shadow-glass backdrop-blur-md',
        note.border,
      );
  const body = row ? (
    <>
      <span className="min-w-0 flex-1">{topic.title}</span>
      <span className={cx('shrink-0 text-xs font-semibold', note.tone)}>{note.text}</span>
    </>
  ) : (
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
            top ? 'font-display text-xl text-ink' : 'text-sm font-semibold text-ink',
          )}
        >
          {label}
        </span>
        <span className="shrink-0 text-xs text-fg-muted" suppressHydrationWarning>
          {learnt}/{total}
        </span>
        <Chevron open={open} />
      </button>
      <FoldBody open={open}>{children}</FoldBody>
    </li>
  );
}

/**
 * The topics as the library's tree, folded to the body regions: one region open at a time, and in
 * it one book section, then a row for each topic. The next topic to learn waits in a Continue row
 * at the top, unless it is the one open.
 */
function TopicTree({
  tree,
  topics,
  current,
  region,
  onRegion,
  onTopic,
}: Readonly<{
  tree: LibraryNode[];
  topics: StudioTopic[];
  current: string | null;
  /** The region to open on when no topic is open. */
  region?: BodyRegion;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string) => void;
}>) {
  const learnt = new Set(useProgress().completedLessons);
  const noteOf = useCardNotes(topics, current);
  const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const next = topics.find((topic) => !learnt.has(topic.slug));
  const continueId = useId();
  // Unfolded to the topic that is open, so the student sees where they are; on the whole body,
  // to the region they chose.
  const [trail, setTrail] = useState<string[]>(() =>
    current === null && region ? [region] : trailTo(tree, current),
  );
  // A region picked on the body later unfolds the list to it, as the label on the body does.
  const [shownRegion, setShownRegion] = useState(region);
  if (current === null && region !== shownRegion) {
    setShownRegion(region);
    setTrail(region ? [region] : []);
  }
  // Opened for a region, that region comes to the top of the list rather than below the others.
  const regionList = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (current !== null || !region) return;
    const index = tree.findIndex((node) => node.kind === 'branch' && node.id === region);
    const item = regionList.current?.children[index] as HTMLElement | undefined;
    item?.scrollIntoView?.({ block: 'start' });
  }, [current, region, tree]);

  const render = (node: LibraryNode, depth: number): ReactNode => {
    if (node.kind === 'topic') {
      const topic = bySlug.get(node.slug);
      return topic ? (
        <li key={node.slug}>
          <TopicCard
            topic={topic}
            note={noteOf(topic)}
            current={node.slug === current}
            row
            onOpen={onTopic}
          />
        </li>
      ) : null;
    }
    const under = topicsUnder(node);
    const isOpen = trail[depth] === node.id;
    return (
      <Branch
        key={node.id}
        label={node.label}
        learnt={under.filter((topic) => learnt.has(topic.slug)).length}
        total={under.length}
        top={depth === 0}
        open={isOpen}
        onToggle={() => {
          setTrail(toggledTrail(trail, depth, node.id));
          // A region opening also turns the body towards it.
          if (depth === 0 && !isOpen) onRegion(node.id as BodyRegion);
        }}
      >
        <ul className={cx('flex flex-col pt-1 pb-2 pl-2', depth === 0 ? 'gap-1' : 'gap-px')}>
          {node.children.map((child) => render(child, depth + 1))}
        </ul>
      </Branch>
    );
  };

  return (
    <>
      {next && next.slug !== current ? (
        <section aria-labelledby={continueId} className="flex flex-col gap-1">
          <h3 id={continueId} className={cx(LABEL, 'px-2')}>
            Continue
          </h3>
          <TopicCard topic={next} note={noteOf(next)} current={false} row onOpen={onTopic} />
        </section>
      ) : null}
      <ul ref={regionList} aria-label="Regions and topics" className="flex flex-col gap-1">
        {tree.map((node) => render(node, 0))}
      </ul>
    </>
  );
}

export function TopicsPanel({
  place,
  tree,
  topics,
  regions,
  current,
  region,
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
  /** The region to open on when no topic is open. */
  region?: BodyRegion;
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
      {/* The list scrolls under the search, so the search's suggestions can hang over it. */}
      <div className="-mr-2 flex min-h-0 flex-col gap-4 overflow-x-hidden overflow-y-auto pr-2">
        <TopicTree
          tree={tree}
          topics={topics}
          current={current}
          region={region}
          onRegion={onRegion}
          onTopic={onTopic}
        />
        {soon.length > 0 ? (
          <Text size="xs" tone="muted" className="px-2">
            Coming soon: {soon.map((region) => region.name).join(' · ')}
          </Text>
        ) : null}
      </div>
    </Sheet>
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

const PLANES: Record<SectionPlane, { name: string; hint: string; along: string }> = {
  transverse: { name: 'Transverse', hint: 'Across the body, as a CT slice', along: 'Feet to head' },
  coronal: { name: 'Coronal', hint: 'Front from back', along: 'Back to front' },
  sagittal: { name: 'Sagittal', hint: 'One side from the other', along: 'Side to side' },
};
const PLANE_ORDER: SectionPlane[] = ['transverse', 'coronal', 'sagittal'];

/** A joint movement as the studio holds it: which, at what angle in degrees, and whether playing. */
export interface MovementState {
  id: MovementId;
  angle: number;
  playing: boolean;
}

/**
 * A joint movement on the body, from the view tools: which joint, how far it turns, or played
 * there and back.
 */
export function MovementPanel({
  movements,
  movement,
  onChange,
  onClose,
}: Readonly<{
  movements: Array<{
    id: MovementId;
    name: string;
    joint: string;
    range: number;
    /** In a joint topic: what the joint does along the way, and its ligaments taut at each end. */
    phases?: MovementPhase[];
    taut?: { start: string[]; end: string[] };
    ends?: [string, string];
  }>;
  movement: MovementState | null;
  onChange: (movement: MovementState | null) => void;
  onClose: () => void;
}>) {
  // A movement left on from elsewhere (the whole body) does not belong to this list.
  const current = movements.some((item) => item.id === movement?.id) ? movement : null;
  const shown = movements.find((item) => item.id === current?.id) ?? movements[0];
  if (!shown) return null;
  const ligaments = shown.taut && shown.ends ? shown : null;
  const halfway = (range: number) => Math.round(range / 2);
  return (
    // With a joint's ligaments to list, the sheet takes the height down to the bottom bar, except
    // on a phone, where the joint has to stay in sight.
    <Sheet
      label="Movement"
      side="right"
      place="float"
      compact={ligaments ? 'phone' : true}
      onClose={onClose}
    >
      <Switch
        label="Move a joint"
        checked={current !== null}
        onCheckedChange={(on) =>
          onChange(on ? { id: shown.id, angle: halfway(shown.range), playing: false } : null)
        }
      />
      {current ? (
        <>
          <fieldset className="grid grid-cols-2 gap-1 rounded-md bg-surface-muted p-1">
            <legend className="sr-only">Joint</legend>
            {movements.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === current.id}
                onClick={() => onChange({ ...current, id: item.id, angle: halfway(item.range) })}
                className={cx(
                  'flex min-h-12 flex-col justify-center rounded-sm px-2 text-left text-sm font-semibold leading-tight transition-colors duration-150',
                  item.id === current.id
                    ? 'bg-surface text-ink shadow-raised'
                    : 'text-fg-muted hover:text-fg',
                )}
              >
                {item.name}
                <span className="text-xs font-normal text-fg-muted">{item.joint}</span>
              </button>
            ))}
          </fieldset>
          <label className="flex flex-col gap-1">
            <span className="flex justify-between text-sm">
              <span className="font-semibold text-ink">Angle</span>
              <span className="text-fg-muted">
                {current.playing ? 'Playing' : `${current.angle}°`} of {shown.range}°
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={shown.range}
              value={current.angle}
              disabled={current.playing}
              onChange={(event) => onChange({ ...current, angle: Number(event.target.value) })}
              className="h-12 w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>
          <button
            type="button"
            aria-pressed={current.playing}
            onClick={() => onChange({ ...current, playing: !current.playing })}
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-md border border-border-strong text-sm font-semibold text-ink hover:bg-surface-muted"
          >
            <Icon icon={current.playing ? Pause : Play} size="sm" />
            {current.playing ? 'Pause' : 'Play the movement'}
          </button>
          {ligaments ? (
            <JointReadout movement={ligaments} state={current} />
          ) : (
            <Text size="xs" tone="muted">
              The bones turn as rigid parts: muscles that cross the joint stay where they are.
            </Text>
          )}
        </>
      ) : (
        <Text size="sm" tone="muted">
          {ligaments
            ? 'Move the joint and watch its ligaments: they stretch with it, and warm as they tighten.'
            : 'See a joint move: bend the elbow, turn the forearm over, lift the arm out to the side or bend the knee.'}
        </Text>
      )}
    </Sheet>
  );
}

/** What a moving joint is doing, and which of its ligaments are taut at either end. */
function JointReadout({
  movement,
  state,
}: Readonly<{
  movement: {
    phases?: MovementPhase[];
    taut?: { start: string[]; end: string[] };
    ends?: [string, string];
    range: number;
  };
  state: MovementState;
}>) {
  const { taut, ends, phases = [], range } = movement;
  if (!taut || !ends) return null;
  // Past halfway the ligaments taut at the end are the ones tightening.
  const late = state.angle > range / 2;
  const groups = [
    { names: taut.start, end: ends[0], now: !state.playing && !late },
    { names: taut.end, end: ends[1], now: !state.playing && late },
  ].filter((group) => group.names.length > 0);
  return (
    <div className="flex flex-col gap-3">
      <p aria-live="polite" className="text-sm text-fg">
        {state.playing
          ? 'Watch the ligaments warm as they tighten and cool as they slacken.'
          : phaseAt({ phases }, state.angle)}
      </p>
      <dl className="flex flex-col gap-2 text-sm">
        {groups.map((group) => (
          <div
            key={group.end}
            className={cx(
              'rounded-md px-3 py-2 transition-colors duration-200',
              group.now ? 'bg-anat-taut/15' : 'bg-surface-muted',
            )}
          >
            <dt className="flex items-center gap-2 text-xs font-semibold text-fg-muted">
              <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-anat-taut" />
              Taut {group.end}
            </dt>
            <dd className="text-ink">{group.names.join(', ')}</dd>
          </div>
        ))}
      </dl>
      <Text size="xs" tone="muted">
        Ligaments that cross the joint stretch with it; the warmer one is the tighter.
      </Text>
    </div>
  );
}

/**
 * A section through the model, from the view tools: on or off, along which anatomical plane, and
 * where along it.
 */
export function SectionPanel({
  section,
  onChange,
  onClose,
}: Readonly<{
  section: Viewer3DSection | null;
  onChange: (section: Viewer3DSection | null) => void;
  onClose: () => void;
}>) {
  const plane = section?.plane ?? 'transverse';
  return (
    <Sheet label="Section" side="right" place="float" compact onClose={onClose}>
      <Switch
        label="Cut through the model"
        checked={section !== null}
        onCheckedChange={(on) => onChange(on ? { plane, at: 0.5 } : null)}
      />
      {section ? (
        <>
          <fieldset className="grid grid-cols-3 gap-1 rounded-md bg-surface-muted p-1">
            <legend className="sr-only">Plane</legend>
            {PLANE_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                title={PLANES[id].hint}
                aria-pressed={id === plane}
                onClick={() => onChange({ ...section, plane: id })}
                className={cx(
                  'h-12 rounded-sm text-sm font-semibold transition-colors duration-150',
                  id === plane
                    ? 'bg-surface text-ink shadow-raised'
                    : 'text-fg-muted hover:text-fg',
                )}
              >
                {PLANES[id].name}
              </button>
            ))}
          </fieldset>
          <label className="flex flex-col gap-1">
            <span className="flex justify-between text-sm">
              <span className="font-semibold text-ink">Where to cut</span>
              <span className="text-fg-muted">{PLANES[plane].along}</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(section.at * 100)}
              onChange={(event) => onChange({ ...section, at: Number(event.target.value) / 100 })}
              className="h-12 w-full cursor-pointer accent-primary"
            />
          </label>
        </>
      ) : (
        <Text size="sm" tone="muted">
          Slice the model across, front from back, or side to side to see what lies inside.
        </Text>
      )}
    </Sheet>
  );
}

/** One layer of the model: a system of the body, or a kind of structure in a topic. */
export interface LayerItem<Id extends string> {
  id: Id;
  name: string;
  kind: LayerKind;
  on: boolean;
}

/** Each layer's colour, as on the model. */
export const LAYER_DOT: Record<LayerKind, string> = {
  skin: 'bg-anat-skin',
  bone: 'bg-anat-bone',
  muscle: 'bg-anat-muscle',
  artery: 'bg-anat-artery',
  vein: 'bg-anat-vein',
  nerve: 'bg-anat-nerve',
  lymph: 'bg-anat-lymph',
  organ: 'bg-anat-organ',
  airway: 'bg-anat-airway',
  membrane: 'bg-anat-membrane',
  valve: 'bg-anat-valve',
  ligament: 'bg-anat-ligament',
  capsule: 'bg-anat-capsule',
  cartilage: 'bg-anat-cartilage',
};

/**
 * The layers, from the view tools: a switch for each (the body's systems, or a topic's muscles,
 * vessels and bones), and the structures the student has hidden one by one.
 */
export function LayersPanel<Id extends string>({
  layers,
  hidden = [],
  onToggle,
  onShow,
  onClose,
}: Readonly<{
  layers: Array<LayerItem<Id>>;
  /** Structures hidden one by one, to show again. */
  hidden?: Array<{ id: string; name: string }>;
  onToggle: (id: Id) => void;
  onShow?: (id: string) => void;
  onClose: () => void;
}>) {
  return (
    <Sheet label="Layers" side="right" place="float" compact onClose={onClose}>
      <ul className="flex flex-col gap-1">
        {layers.map((layer) => (
          <li key={layer.id} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cx('size-3 shrink-0 rounded-full', LAYER_DOT[layer.kind])}
            />
            <div className="min-w-0 flex-1">
              <Switch
                label={layer.name}
                checked={layer.on}
                onCheckedChange={() => onToggle(layer.id)}
              />
            </div>
          </li>
        ))}
      </ul>
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
                  onClick={() => onShow?.(structure.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Sheet>
  );
}

export const KIND_LABEL: Record<NonNullable<StructureInfo['kind']>, string> = {
  bone: 'Bone',
  muscle: 'Muscle',
  artery: 'Artery',
  vein: 'Vein',
  skin: 'Surface',
  nerve: 'Nerve',
  lymph: 'Lymph nodes',
  outline: 'Outline',
  organ: 'Organ',
  airway: 'Airway',
  membrane: 'Membrane',
  valve: 'Valve',
  ligament: 'Ligament',
  capsule: 'Joint capsule',
  cartilage: 'Cartilage',
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
  organ: 'bg-anat-organ',
  airway: 'bg-anat-airway',
  membrane: 'bg-anat-membrane',
  valve: 'bg-anat-valve',
  ligament: 'bg-anat-ligament',
  capsule: 'bg-anat-capsule',
  cartilage: 'bg-anat-cartilage',
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
  compact = false,
}: Readonly<{
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  region: BodyRegion;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string) => void;
  /** Regions only, for a short screen: a region's topics open in their own panel. */
  compact?: boolean;
}>) {
  const progress = useProgress();
  const inRegion = topics.filter((topic) => topic.regions.includes(region));
  const learnt = inRegion.filter((topic) => progress.completedLessons.includes(topic.slug));
  const noteOf = useCardNotes(inRegion, null);
  const name = regions.find((item) => item.id === region)?.name ?? '';
  return (
    <section aria-label="Regions and topics" className="pointer-events-auto flex flex-col gap-3">
      <fieldset className="flex min-w-0 gap-2 overflow-x-auto pb-1">
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
      {compact ? null : (
        <>
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
        </>
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
