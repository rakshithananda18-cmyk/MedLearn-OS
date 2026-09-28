'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, IconButton, Skeleton } from '@medlearn/ui';
import { Layers, Menu } from '@medlearn/ui/icons';
import { PathTracer } from '@medlearn/visuals';
import type { Stroke } from '@medlearn/visuals/viewer3d';

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
