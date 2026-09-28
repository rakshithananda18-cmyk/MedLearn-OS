'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, IconButton, Skeleton, Text } from '@medlearn/ui';
import { Layers, Menu } from '@medlearn/ui/icons';
import { PathTracer } from '@medlearn/visuals';
import type { Stroke } from '@medlearn/visuals/viewer3d';
import type { ReactNode } from 'react';

import type { BodyRegionInfo } from '@/content/body';

import { BodyOutline } from './BodyOutline';
import type { StudioTopic } from './knowledge';
import type { Panel } from './session';
import { Viewer3D } from './viewer';

export interface ModelViewProps {
  /** Whether this device can show 3D: null until known. */
  capable: boolean | null;
  model: Model3D;
  topic: StudioTopic | null;
  regions: BodyRegionInfo[];
  region: BodyRegion;
  selected: string | null;
  lit: ReadonlySet<string>;
  stopId: string;
  hiddenKinds: ReadonlySet<PartKind>;
  hidden: ReadonlySet<string>;
  xray: boolean;
  reducedMotion: boolean;
  /** The pen's colour while drawing, else null. */
  pen: string | null;
  strokes: Stroke[];
  onPick: (id: string | null) => void;
  onRegion: (id: BodyRegion) => void;
  onStroke: (stroke: Stroke) => void;
}

/** The model itself, or the flat diagram or body outline on a phone that cannot show 3D. */
export function ModelView(props: Readonly<ModelViewProps>) {
  const { capable, model, topic } = props;
  if (capable === null) return <Skeleton className="size-full" />;
  if (capable) {
    return (
      <Viewer3D
        model={model}
        highlight={props.lit}
        onSelect={props.onPick}
        stopId={props.stopId}
        hiddenKinds={props.hiddenKinds}
        hiddenIds={props.hidden}
        xray={props.xray}
        reducedMotion={props.reducedMotion}
        markers={topic ? [] : props.regions.map((item) => ({ id: item.id, position: item.marker }))}
        maxDistance={topic ? 1.5 : 5}
        pen={props.pen ? { colour: props.pen, onStroke: props.onStroke } : null}
        strokes={props.strokes}
      />
    );
  }
  if (topic?.diagram) {
    return (
      <div className="size-full overflow-auto px-4 pt-20 pb-24">
        <PathTracer
          diagram={topic.diagram}
          title={topic.title}
          selectedId={props.selected}
          onSelect={props.onPick}
        />
      </div>
    );
  }
  return (
    <div className="size-full px-8 pt-20 pb-24">
      <BodyOutline selected={props.region} onSelect={props.onRegion} />
    </div>
  );
}

const GLASS = 'rounded-xl border border-glass-border bg-glass shadow-glass backdrop-blur-md';

/**
 * The bottom of the studio: the picked structure's card (unless it is docked), the mode switch
 * and the mode's own bar in one glass card, and the model's credit.
 */
export function StudioFooter({
  docked,
  info,
  switcher,
  credit,
  children,
}: Readonly<{
  docked: boolean;
  info: ReactNode;
  switcher: ReactNode;
  credit: string | null;
  children: ReactNode;
}>) {
  return (
    <footer className="flex flex-col gap-2">
      {docked ? null : info}
      <div
        className={cx(
          GLASS,
          'pointer-events-auto flex flex-col gap-2 p-2 md:mx-auto md:w-full md:max-w-2xl',
        )}
      >
        {docked ? null : switcher}
        {children}
      </div>
      {credit ? (
        <Text size="xs" tone="muted" className="pointer-events-auto line-clamp-1 px-2">
          {credit}
        </Text>
      ) : null}
    </footer>
  );
}

/**
 * The right-hand panel on tablets held sideways and laptops: the mode switch, the picked
 * structure (or how to pick one) and the layers. Nothing while the whole body is open.
 */
export function DockedSide({
  switcher,
  info,
  hint,
  children,
}: Readonly<{ switcher: ReactNode; info: ReactNode; hint: boolean; children: ReactNode }>) {
  if (!children) return null;
  return (
    <aside
      aria-label="About the model"
      className={cx(
        GLASS,
        'pointer-events-auto flex w-sheet shrink-0 flex-col gap-6 overflow-y-auto p-4',
      )}
    >
      {switcher}
      {info}
      {!info && hint ? (
        <Text size="sm" tone="muted">
          Tap a structure on the model to see what it is.
        </Text>
      ) : null}
      {children}
    </aside>
  );
}

const tool = (active: boolean) => cx('shadow-glass', active && 'border-gold bg-primary-subtle');

/**
 * The top of the studio. On phones and tablets held upright: the topics button, the title and
 * the layers button. Where the panels are docked, only the title, in gold.
 */
export function StudioHeader({
  title,
  panel,
  docked,
  tools,
  onPanel,
}: Readonly<{
  title: string;
  panel: Panel;
  docked: boolean;
  /** Layers belong to a topic, not the whole body. */
  tools: boolean;
  onPanel: (panel: Panel) => void;
}>) {
  if (docked) {
    return (
      <header className="px-2">
        <h1 className="truncate font-display text-4xl tracking-display text-gold">{title}</h1>
      </header>
    );
  }
  const togglePanel = (next: Exclude<Panel, null>) => onPanel(panel === next ? null : next);
  return (
    <header className="flex items-center gap-2">
      <IconButton
        icon={Menu}
        label="Topics"
        variant="secondary"
        aria-pressed={panel === 'topics'}
        className={cx('pointer-events-auto', tool(panel === 'topics'))}
        onClick={() => togglePanel('topics')}
      />
      <h1 className="pointer-events-auto min-w-0 truncate rounded-full border border-glass-border bg-glass px-4 py-3 text-sm font-semibold text-ink shadow-glass backdrop-blur-md">
        {title}
      </h1>
      {tools ? (
        <IconButton
          icon={Layers}
          label="Layers"
          variant="secondary"
          aria-pressed={panel === 'layers'}
          className={cx('pointer-events-auto ml-auto', tool(panel === 'layers'))}
          onClick={() => togglePanel('layers')}
        />
      ) : null}
    </header>
  );
}
