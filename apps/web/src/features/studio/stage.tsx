'use client';

import type { BodyRegion, CameraStop, Model3D, PartKind } from '@medlearn/schemas';
import { cx, Icon, IconButton, Skeleton } from '@medlearn/ui';
import {
  ArrowLeft,
  BicepsFlexed,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  FileImage,
  Hand,
  Layers,
  Pause,
  Play,
  RotateCcw,
  ScanEye,
  Search,
  Settings,
  Slice,
  Target,
} from '@medlearn/ui/icons';
import { PathTracer } from '@medlearn/visuals';
import type {
  Stroke,
  Viewer3DFocus,
  Viewer3DLabel,
  Viewer3DLayer,
  Viewer3DPose,
  Viewer3DSection,
} from '@medlearn/visuals/viewer3d';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

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
  /** Pixels drawn per screen pixel, or a range the viewer picks within. */
  dpr: number | [number, number];
  /** The body's systems switched on (whole body only). */
  layers: Viewer3DLayer[];
  /** The picked region's detailed model, opened inside the body, or null. */
  detail: Model3D | null;
  /** Parts shown only as a faint outline that taps pass through. */
  ghosts: ReadonlySet<string>;
  /** A cut through the model, or null. */
  section: Viewer3DSection | null;
  /** A structure to turn the camera to, or null. */
  focus: Viewer3DFocus | null;
  /** A structure to turn the camera to by its id, or null. */
  focusId: string | null;
  /** A joint movement shown on the body, or null. */
  pose: Viewer3DPose | null;
  /** The topic's flat diagram in place of the model, when it has one. */
  flat: boolean;
  /** How much of the view's right edge a panel covers, in pixels: the model keeps beside it. */
  insetRight: number;
  /** How much of the view's bottom edge a sheet covers, in pixels (phones). */
  insetBottom: number;
  /** How much of the view's top edge the header covers, in pixels (phones). */
  insetTop: number;
  /** A plain drag moves the model instead of turning it. */
  pan: boolean;
  onPick: (id: string | null) => void;
  onRegion: (id: BodyRegion) => void;
  onStroke: (stroke: Stroke) => void;
}

/** The model itself, or the flat diagram or body outline on a phone that cannot show 3D. */
export function ModelView(props: Readonly<ModelViewProps>) {
  const { capable, model, topic } = props;
  if (capable === null) return <Skeleton className="size-full" />;
  if (capable && !(props.flat && topic?.diagram)) {
    return (
      <Viewer3D
        model={model}
        detail={props.detail}
        ghostIds={props.ghosts}
        highlight={props.lit}
        onSelect={props.onPick}
        stopId={props.stopId}
        hiddenKinds={props.hiddenKinds}
        hiddenIds={props.hidden}
        xray={props.xray}
        reducedMotion={props.reducedMotion}
        // Region markers are for choosing a region; they step aside while a structure is picked.
        markers={
          topic || props.selected?.includes('/')
            ? []
            : props.regions.map((item) => ({ id: item.id, position: item.marker }))
        }
        maxDistance={topic ? 1.5 : 5}
        pen={props.pen ? { colour: props.pen, onStroke: props.onStroke } : null}
        strokes={props.strokes}
        labels={props.labels}
        resetToken={props.resetToken}
        dpr={props.dpr}
        layers={props.layers}
        section={props.section}
        focus={props.focus}
        focusId={props.focusId}
        pose={props.pose}
        insetRight={props.insetRight}
        insetBottom={props.insetBottom}
        insetTop={props.insetTop}
        pan={props.pan}
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
  cx('pointer-events-auto', on && 'bg-primary-subtle text-primary-strong ring-1 ring-primary/40');

/**
 * Round buttons for the view: see-through, only the picked structure, a section through the
 * model, the topic's X-ray films, moving the model (a plain drag moves it instead of turning it),
 * back to the guided view, then the layers beside the settings.
 * A column down the model's left edge.
 */
export function ViewTools({
  layers,
  xray,
  films,
  isolate,
  canIsolate,
  pan,
  section,
  movement,
  settings,
  onLayers,
  onXray,
  onFilms,
  onIsolate,
  onPan,
  onSection,
  onMovement,
  onReset,
  onSettings,
}: Readonly<{
  /** Whether the layers sheet is open. */
  layers: boolean;
  xray: boolean | null;
  /** Whether the topic's X-ray films are showing, or null when it has none. */
  films: boolean | null;
  isolate: boolean;
  canIsolate: boolean;
  /** Whether a plain drag moves the model. */
  pan: boolean;
  /** Whether the model is cut, or the section sheet open. */
  section: boolean;
  /** Whether a joint is moving or the movement sheet open, or null where there are none. */
  movement: boolean | null;
  /** Whether the settings sheet is open. */
  settings: boolean;
  onLayers: () => void;
  onXray: () => void;
  onFilms: () => void;
  onIsolate: () => void;
  onPan: () => void;
  onSection: () => void;
  onMovement: () => void;
  onReset: () => void;
  onSettings: () => void;
}>) {
  const instructions = useId();
  // On a short screen the column scrolls; a labelled button at its foot says there is more and
  // brings it into view, so the last tools (Layers, Settings) are found without guessing.
  const column = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const element = column.current;
    if (!element) return;
    const check = () =>
      setMore(element.scrollTop + element.clientHeight < element.scrollHeight - 4);
    check();
    element.addEventListener('scroll', check, { passive: true });
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(check);
    resize?.observe(element);
    return () => {
      element.removeEventListener('scroll', check);
      resize?.disconnect();
    };
  }, []);
  return (
    <div
      ref={column}
      role="toolbar"
      aria-label="View"
      aria-orientation="vertical"
      aria-describedby={instructions}
      onKeyDown={(event) => {
        const controls = Array.from(event.currentTarget.querySelectorAll('button:not(:disabled)'));
        const index = controls.indexOf(document.activeElement as HTMLButtonElement);
        const last = controls.length - 1;
        let next: number;
        if (event.key === 'ArrowDown') next = index >= last ? 0 : index + 1;
        else if (event.key === 'ArrowUp') next = index <= 0 ? last : index - 1;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = last;
        else return;
        event.preventDefault();
        (controls[next] as HTMLButtonElement | undefined)?.focus();
      }}
      className={cx(
        GLASS,
        'pointer-events-auto flex max-h-full min-h-0 scrollbar-none flex-col gap-1 overflow-y-auto overscroll-contain rounded-full p-1',
      )}
    >
      <span id={instructions} className="sr-only">
        Scroll for more tools, or use the Up and Down arrow keys.
      </span>
      {xray === null ? null : (
        <>
          <IconButton
            icon={ScanEye}
            label="See-through"
            title="See-through"
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
          <IconButton
            icon={Slice}
            label="Section"
            title="Section"
            aria-pressed={section}
            className={pressed(section)}
            onClick={onSection}
          />
        </>
      )}
      {movement === null ? null : (
        <IconButton
          icon={BicepsFlexed}
          label="Movement"
          title="Movement"
          aria-pressed={movement}
          className={pressed(movement)}
          onClick={onMovement}
        />
      )}
      {films === null ? null : (
        <IconButton
          icon={FileImage}
          label="X-ray images"
          title="X-ray images"
          aria-pressed={films}
          className={pressed(films)}
          onClick={onFilms}
        />
      )}
      <IconButton
        icon={Hand}
        label="Move the model"
        title="Move the model"
        aria-pressed={pan}
        className={pressed(pan)}
        onClick={onPan}
      />
      <IconButton
        icon={RotateCcw}
        label="Reset the view"
        className={pressed(false)}
        onClick={onReset}
      />
      <IconButton
        icon={Layers}
        label="Layers"
        title="Layers"
        aria-pressed={layers}
        className={pressed(layers)}
        onClick={onLayers}
      />
      <IconButton
        icon={Settings}
        label="Settings"
        aria-pressed={settings}
        className={pressed(settings)}
        onClick={onSettings}
      />
      {more ? (
        // A fade under the cue hides whichever tool is half scrolled behind it.
        <div className="sticky -bottom-1 -mx-1 -mb-1 flex shrink-0 justify-center rounded-b-full bg-linear-to-t from-surface from-60% to-transparent px-1 pt-6 pb-1">
          <IconButton
            icon={ChevronDown}
            label="More tools"
            title="More tools"
            className="bg-surface shadow-glass"
            onClick={() =>
              column.current?.scrollBy({ top: column.current.clientHeight, behavior: 'smooth' })
            }
          />
        </div>
      ) : null}
    </div>
  );
}

/**
 * The top of the studio on phones and tablets held upright. On a topic: back, the topic (tap to
 * change it) and search. On the whole body: a search field.
 */
export function PhoneHeader({
  title,
  topicOpen,
  onBack,
  onTopics,
  onSearch,
}: Readonly<{
  title: string;
  topicOpen: boolean;
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

/** Plays the guided views as a tour, or pauses it. */
export function TourButton({
  touring,
  onTour,
  size = 'sm',
}: Readonly<{ touring: boolean; onTour: () => void; size?: 'sm' | 'md' }>) {
  return (
    <IconButton
      icon={touring ? Pause : Play}
      label={touring ? 'Pause the tour' : 'Play the tour'}
      title={touring ? 'Pause the tour' : 'Play the tour'}
      size={size}
      aria-pressed={touring}
      className={cx(touring && 'bg-primary-subtle text-primary-strong')}
      onClick={onTour}
    />
  );
}

/** While a tour plays: the view's title and what to see there, as a caption over the model. */
export function TourCaption({
  stops,
  index,
  onPause,
}: Readonly<{ stops: CameraStop[]; index: number; onPause: () => void }>) {
  const stop = stops[index];
  if (!stop) return null;
  return (
    <section
      aria-label="Tour caption"
      aria-live="polite"
      className={cx(
        GLASS,
        'pointer-events-auto mx-auto flex w-full max-w-2xl animate-rise items-start gap-3 p-4',
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
          Tour · {index + 1} of {stops.length}
        </span>
        <h2 className="text-gold font-display text-2xl tracking-display">{stop.title}</h2>
        <p className="text-sm text-fg">{stop.description}</p>
      </div>
      <TourButton touring onTour={onPause} />
    </section>
  );
}

/** The model's guided views as a card by the tools: back, where it is, on, and the tour. */
export function GuideCard({
  stops,
  index,
  touring,
  onIndex,
  onTour,
}: Readonly<{
  stops: CameraStop[];
  index: number;
  touring: boolean;
  onIndex: (index: number) => void;
  onTour: () => void;
}>) {
  const stop = stops[index];
  if (!stop) return null;
  return (
    <fieldset
      aria-label="Guided views"
      title={stop.description}
      className={cx(GLASS, 'pointer-events-auto flex min-w-0 items-center gap-1 rounded-full p-1')}
    >
      <IconButton
        icon={ChevronLeft}
        label="Previous view"
        size="sm"
        disabled={index === 0}
        onClick={() => onIndex(index - 1)}
      />
      <span className="flex min-w-0 flex-col px-1 text-center leading-tight">
        <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
          Guided view
        </span>
        <span className="truncate text-sm font-semibold text-ink">
          {stop.title}{' '}
          <span className="font-normal text-fg-muted">
            {index + 1}/{stops.length}
          </span>
        </span>
      </span>
      <IconButton
        icon={ChevronRight}
        label="Next view"
        size="sm"
        disabled={index >= stops.length - 1}
        onClick={() => onIndex(index + 1)}
      />
      <TourButton touring={touring} onTour={onTour} />
    </fieldset>
  );
}

/** Starts "Find it" on the whole body, in the region chosen, with the systems switched on. */
export function FindItButton({
  region,
  best,
  disabled,
  onStart,
}: Readonly<{ region: string; best: number; disabled: boolean; onStart: () => void }>) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={disabled ? 'Switch on a system with structures in this region' : undefined}
      onClick={onStart}
      className={cx(
        GLASS,
        'pointer-events-auto flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50',
      )}
    >
      <Icon icon={Target} size="sm" />
      <span className="flex flex-col text-left leading-tight">
        <span>Find it: {region}</span>
        <span className="text-xs font-normal text-fg-muted">Best streak {best}</span>
      </span>
    </button>
  );
}

/** The sheet along the bottom of a phone: a grip, then the mode switch and what the mode shows. */
export function BottomSheet({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="pointer-events-auto flex max-h-sheet flex-col gap-3 overflow-y-auto *:shrink-0 rounded-t-xl border-t border-border/80 bg-surface/98 px-4 pt-2 pb-4 shadow-overlay backdrop-blur-md md:mx-auto md:mb-3 md:w-full md:max-w-2xl md:rounded-xl md:border short:absolute short:top-20 short:right-3 short:bottom-3 short:m-0 short:max-h-none short:w-sheet short:max-w-none">
      <span
        aria-hidden="true"
        className="h-1 w-12 shrink-0 self-center rounded-full bg-border-strong/80"
      />
      {children}
    </div>
  );
}
