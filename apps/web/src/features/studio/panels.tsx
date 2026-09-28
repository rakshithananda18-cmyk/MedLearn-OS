'use client';

import type { BodyRegion, PartKind } from '@medlearn/schemas';
import { Badge, cx, IconButton, Switch, Text, ToggleChip } from '@medlearn/ui';
import { Eye, EyeOff, X } from '@medlearn/ui/icons';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { BodyRegionInfo } from '@/content/body';

import type { StructureInfo, StudioTopic } from './knowledge';

/** A glass sheet floating over the model; panels stay inside the studio. */
function Sheet({
  label,
  side,
  onClose,
  children,
}: Readonly<{ label: string; side: 'left' | 'right'; onClose: () => void; children: ReactNode }>) {
  return (
    <section
      aria-label={label}
      className={cx(
        'absolute top-20 bottom-24 z-10 flex w-sheet animate-rise flex-col gap-4 overflow-y-auto rounded-2xl border border-glass-border bg-glass p-4 shadow-glass backdrop-blur-md',
        side === 'left' ? 'left-3' : 'right-3',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-xl tracking-display text-ink">{label}</h2>
        <IconButton icon={X} label={`Close ${label.toLowerCase()}`} size="sm" onClick={onClose} />
      </div>
      {children}
    </section>
  );
}

export function TopicsPanel({
  topics,
  regions,
  region,
  current,
  onRegion,
  onTopic,
  onClose,
}: Readonly<{
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  region: BodyRegion;
  current: string | null;
  onRegion: (region: BodyRegion) => void;
  onTopic: (slug: string | null) => void;
  onClose: () => void;
}>) {
  const inRegion = topics.filter((topic) => topic.regions.includes(region));
  const item =
    'flex min-h-12 w-full flex-col justify-center rounded-xl border px-3 py-2 text-left transition-colors duration-150';
  return (
    <Sheet label="Topics" side="left" onClose={onClose}>
      <button
        type="button"
        aria-current={current === null ? 'true' : undefined}
        onClick={() => onTopic(null)}
        className={cx(
          item,
          current === null ? 'border-gold' : 'border-glass-border hover:border-border-strong',
        )}
      >
        <span className="font-semibold text-ink">Whole body</span>
        <span className="text-sm text-fg-muted">Pick a region on the body</span>
      </button>
      <fieldset className="flex flex-wrap gap-2">
        <legend className="pb-2 text-sm font-semibold text-ink">Regions</legend>
        {regions.map((item) => (
          <ToggleChip key={item.id} pressed={item.id === region} onClick={() => onRegion(item.id)}>
            {item.name}
          </ToggleChip>
        ))}
      </fieldset>
      {inRegion.length === 0 ? (
        <Text size="sm" tone="muted">
          Topics coming soon.
        </Text>
      ) : (
        <ul aria-label="Topics in this region" className="flex flex-col gap-2">
          {inRegion.map((topic) => (
            <li key={topic.slug}>
              {topic.model ? (
                <button
                  type="button"
                  aria-current={topic.slug === current ? 'true' : undefined}
                  onClick={() => onTopic(topic.slug)}
                  className={cx(
                    item,
                    topic.slug === current
                      ? 'border-gold'
                      : 'border-glass-border hover:border-border-strong',
                  )}
                >
                  <span className="font-semibold text-ink">{topic.title}</span>
                  <span className="text-sm text-fg-muted">
                    3D · {topic.estimatedMinutes} min lesson
                  </span>
                </button>
              ) : (
                // Topics with no body structures to show (a physiology graph) open their lesson.
                <Link
                  href={`/learn/${topic.slug}`}
                  className={cx(item, 'border-glass-border hover:border-border-strong')}
                >
                  <span className="font-semibold text-ink">{topic.title}</span>
                  <span className="text-sm text-fg-muted">Interactive lesson, no 3D</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  );
}

const LAYERS: Array<{ kind: PartKind; title: string }> = [
  { kind: 'bone', title: 'Bones' },
  { kind: 'muscle', title: 'Muscles' },
  { kind: 'artery', title: 'Arteries' },
  { kind: 'vein', title: 'Veins' },
];

export function LayersPanel({
  kinds,
  structures,
  showStructures,
  hiddenKinds,
  hiddenIds,
  xray,
  isolate,
  selected,
  onKind,
  onStructure,
  onHide,
  onXray,
  onIsolate,
  onClose,
}: Readonly<{
  kinds: PartKind[];
  structures: Array<{ id: string; name: string }>;
  /** Off during "Find it", where the names would give the answers away. */
  showStructures: boolean;
  hiddenKinds: ReadonlySet<PartKind>;
  hiddenIds: ReadonlySet<string>;
  xray: boolean;
  isolate: boolean;
  selected: string | null;
  onKind: (kind: PartKind) => void;
  onStructure: (id: string) => void;
  onHide: (id: string) => void;
  onXray: (on: boolean) => void;
  onIsolate: (on: boolean) => void;
  onClose: () => void;
}>) {
  return (
    <Sheet label="Layers" side="right" onClose={onClose}>
      <div className="flex flex-col gap-3">
        {LAYERS.filter((layer) => kinds.includes(layer.kind)).map((layer) => (
          <Switch
            key={layer.kind}
            label={layer.title}
            checked={!hiddenKinds.has(layer.kind)}
            onCheckedChange={() => onKind(layer.kind)}
          />
        ))}
        <Switch label="X-ray" checked={xray} onCheckedChange={onXray} />
        <Switch
          label="Only the picked structure"
          checked={isolate}
          onCheckedChange={onIsolate}
          disabled={selected === null}
        />
      </div>
      {showStructures ? (
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-ink">Structures</h3>
          <ul className="flex flex-col">
            {structures.map((structure) => {
              const hidden = hiddenIds.has(structure.id);
              return (
                <li key={structure.id} className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-pressed={selected === structure.id}
                    onClick={() => onStructure(structure.id)}
                    className={cx(
                      'min-h-12 flex-1 rounded-md px-2 text-left text-sm transition-colors duration-150 hover:bg-surface-muted',
                      selected === structure.id ? 'font-semibold text-ink' : 'text-fg',
                      hidden && 'text-fg-muted line-through',
                    )}
                  >
                    {structure.name}
                  </button>
                  <IconButton
                    icon={hidden ? EyeOff : Eye}
                    label={`${hidden ? 'Show' : 'Hide'} ${structure.name}`}
                    size="sm"
                    onClick={() => onHide(structure.id)}
                  />
                </li>
              );
            })}
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

function InfoDetails({
  info,
  onTopic,
}: Readonly<{ info: StructureInfo; onTopic: (slug: string) => void }>) {
  return (
    <>
      {info.lesson.length > 0 ? (
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-ink">In the lesson</h3>
          {info.lesson.map((step) => (
            <Text key={step.title} size="sm">
              <strong>{step.title}.</strong> {step.body}
            </Text>
          ))}
        </div>
      ) : null}
      {info.clinical.length > 0 ? (
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-ink">Clinical</h3>
          {info.clinical.map((lesion) => (
            <Text key={lesion.label} size="sm">
              <strong>{lesion.label}.</strong> {lesion.explanation}
            </Text>
          ))}
        </div>
      ) : null}
      {info.alsoIn.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-ink">Also in</h3>
          {info.alsoIn.map((topic) => (
            <ToggleChip key={topic.slug} pressed={false} onClick={() => onTopic(topic.slug)}>
              {topic.title}
            </ToggleChip>
          ))}
        </div>
      ) : null}
    </>
  );
}

/** What a picked structure is: short at first, with the lesson, clinical notes and links on demand. */
export function InfoCard({
  info,
  expanded,
  onExpand,
  onTopic,
  onClose,
}: Readonly<{
  info: StructureInfo;
  expanded: boolean;
  onExpand: () => void;
  onTopic: (slug: string) => void;
  onClose: () => void;
}>) {
  const more = info.lesson.length + info.clinical.length + info.alsoIn.length > 0;
  return (
    <section
      aria-label={info.name}
      className="pointer-events-auto flex max-h-sheet animate-rise flex-col gap-2 overflow-y-auto rounded-2xl border border-glass-border bg-glass p-4 shadow-glass backdrop-blur-md md:max-w-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          {info.kind ? <Badge>{KIND_LABEL[info.kind]}</Badge> : null}
          <h2 className="font-display text-xl tracking-display text-ink">{info.name}</h2>
        </div>
        <IconButton icon={X} label="Close" size="sm" onClick={onClose} />
      </div>
      {info.about ? (
        <Text size="sm" className={expanded ? undefined : 'line-clamp-2'}>
          {info.about}
        </Text>
      ) : null}
      {info.path.length > 0 ? (
        <Text size="sm" tone="muted">
          Path: {info.path.join(', ')}
        </Text>
      ) : null}
      {expanded ? <InfoDetails info={info} onTopic={onTopic} /> : null}
      {!expanded && more ? (
        <button
          type="button"
          onClick={onExpand}
          className="self-start text-sm font-semibold text-primary-strong underline-offset-4 hover:underline"
        >
          More about it
        </button>
      ) : null}
    </section>
  );
}
