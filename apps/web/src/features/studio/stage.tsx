'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, Icon, IconButton, Skeleton } from '@medlearn/ui';
import {
  ArrowLeft,
  ChevronDown,
  Crosshair,
  Layers,
  RotateCcw,
  ScanEye,
  Search,
} from '@medlearn/ui/icons';
import { PathTracer } from '@medlearn/visuals';
import type { Stroke, Viewer3DLabel } from '@medlearn/visuals/viewer3d';
import type { ReactNode } from 'react';

import type { BodyRegionInfo } from '@/content/body';

import { BodyOutline } from './BodyOutline';
import type { StudioTopic } from './knowledge';
import { GLASS } from './panels';
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
  labels: Viewer3DLabel[];
  resetToken: number;
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
        labels={props.labels}
        resetToken={props.resetToken}
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
    <div className="h-3/5 w-full px-8 pt-20">
      <BodyOutline selected={props.region} onSelect={props.onRegion} />
    </div>
  );
}

const pressed = (on: boolean) =>
  cx('pointer-events-auto', on && 'bg-primary-subtle text-primary-strong');

/**
 * Round buttons for the view: layers (on phones), x-ray, only the picked structure, and back to
 * the guided view. A column down the left on phones, a row beside the title where docked.
 */
export function ViewTools({
  row,
  layers,
  xray,
  isolate,
  canIsolate,
  onLayers,
  onXray,
  onIsolate,
  onReset,
}: Readonly<{
  row: boolean;
  /** Whether the layers sheet is open, or null where the layers are docked. */
  layers: boolean | null;
  xray: boolean | null;
  isolate: boolean;
  canIsolate: boolean;
  onLayers: () => void;
  onXray: () => void;
  onIsolate: () => void;
  onReset: () => void;
}>) {
  return (
    <div
      role="toolbar"
      aria-label="View"
      aria-orientation={row ? 'horizontal' : 'vertical'}
      className={cx(
        GLASS,
        'pointer-events-auto flex gap-1 rounded-full p-1',
        row ? 'flex-row' : 'flex-col',
      )}
    >
      {layers === null ? null : (
        <IconButton
          icon={Layers}
          label="Layers"
          aria-pressed={layers}
          className={pressed(layers)}
          onClick={onLayers}
        />
      )}
      {xray === null ? null : (
        <>
          <IconButton
            icon={ScanEye}
            label="X-ray"
            aria-pressed={xray}
            className={pressed(xray)}
            onClick={onXray}
          />
          <IconButton
            icon={Crosshair}
            label="Only the picked structure"
            aria-pressed={isolate}
            disabled={!canIsolate}
            className={pressed(isolate)}
            onClick={onIsolate}
          />
        </>
      )}
      <IconButton
        icon={RotateCcw}
        label="Reset the view"
        className={pressed(false)}
        onClick={onReset}
      />
    </div>
  );
}

/**
 * The top of the studio on phones and tablets held upright. On a topic: back, the topic (tap to
 * change it) and search. On the whole body: a search field and the view reset.
 */
export function PhoneHeader({
  title,
  topicOpen,
  tools,
  onBack,
  onTopics,
  onSearch,
}: Readonly<{
  title: string;
  topicOpen: boolean;
  /** Shown beside the search on the whole body. */
  tools: ReactNode;
  onBack: () => void;
  onTopics: () => void;
  onSearch: () => void;
}>) {
  if (!topicOpen) {
    return (
      <header className="flex items-center gap-2">
        <h1 className="sr-only">{title}</h1>
        <button
          type="button"
          onClick={onSearch}
          className={cx(
            GLASS,
            'pointer-events-auto flex h-12 min-w-0 flex-1 items-center gap-2 rounded-md px-4 text-sm text-fg-muted',
          )}
        >
          <Icon icon={Search} size="sm" />
          Find a structure or topic
        </button>
        {tools}
      </header>
    );
  }
  return (
    <header className="flex items-center gap-2">
      <IconButton
        icon={ArrowLeft}
        label="Go back"
        variant="secondary"
        className="pointer-events-auto shadow-glass"
        onClick={onBack}
      />
      <h1 className="min-w-0 flex-1">
        <button
          type="button"
          onClick={onTopics}
          className={cx(
            GLASS,
            'pointer-events-auto flex h-12 w-full items-center justify-between gap-2 rounded-full px-4 text-sm font-semibold text-ink',
          )}
        >
          <span className="truncate">{title}</span>
          <Icon icon={ChevronDown} size="sm" />
        </button>
      </h1>
      <IconButton
        icon={Search}
        label="Search structures"
        variant="secondary"
        className="pointer-events-auto shadow-glass"
        onClick={onSearch}
      />
    </header>
  );
}

/** The top of the studio where the panels are docked: the title in gold, the view tools. */
export function DockedHeader({ title, tools }: Readonly<{ title: string; tools: ReactNode }>) {
  return (
    <header className="flex items-center justify-between gap-4 px-2">
      <h1 className="text-gold truncate font-display text-4xl tracking-display">{title}</h1>
      {tools}
    </header>
  );
}

/** The sheet along the bottom of a phone: a grip, then the mode switch and what the mode shows. */
export function BottomSheet({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="pointer-events-auto flex max-h-sheet flex-col gap-3 overflow-y-auto *:shrink-0 rounded-t-xl border-t border-glass-border bg-surface/95 px-4 pt-2 pb-4 shadow-overlay backdrop-blur-md md:mx-auto md:mb-3 md:w-full md:max-w-2xl md:rounded-xl md:border short:absolute short:top-20 short:right-3 short:bottom-3 short:m-0 short:max-h-none short:w-sheet short:max-w-none">
      <span
        aria-hidden="true"
        className="h-1 w-12 shrink-0 self-center rounded-full bg-border-strong"
      />
      {children}
    </div>
  );
}
