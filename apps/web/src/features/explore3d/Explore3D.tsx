'use client';

import type { Model3D, PathDiagram } from '@medlearn/schemas';
import { Card, Skeleton, Text, ToggleChip } from '@medlearn/ui';
import { pathThrough, PathTracer, supports3D } from '@medlearn/visuals';
import dynamic from 'next/dynamic';
import { useState, useSyncExternalStore } from 'react';

// three.js loads only here, and only on devices that can show 3D.
const Viewer3D = dynamic(() => import('@medlearn/visuals/viewer3d'), {
  ssr: false,
  loading: () => <Skeleton className="aspect-square w-full" />,
});

const noSubscription = () => () => {};
// Checked once: each check opens a WebGL context, and browsers allow only a few.
let capability: boolean | undefined;
const canShow3D = () => (capability ??= supports3D());
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotion(listener: () => void) {
  const query = matchMedia(REDUCED_MOTION);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}

/** Nerve groups in teaching order, by 2D diagram node id. */
const NERVE_GROUPS: Array<{ title: string; ids: string[] }> = [
  { title: 'Roots', ids: ['c5', 'c6', 'c7', 'c8', 't1'] },
  { title: 'Trunks', ids: ['upper', 'middle', 'lower'] },
  { title: 'Cords', ids: ['lateral', 'posterior', 'medial'] },
  { title: 'Branches', ids: ['musculocutaneous', 'axillary', 'radial', 'median', 'ulnar'] },
];

export interface Explore3DProps {
  /** What the model shows, for screen readers. */
  title: string;
  model: Model3D;
  /** The topic's 2D diagram: node names, the paths between them, and the fallback view. */
  diagram: PathDiagram;
}

/**
 * Explore a topic in 3D: guided views, tap or list selection that lights a nerve's whole path,
 * and layer switches. Phones without WebGL2 or with little memory get the 2D diagram instead.
 */
export function Explore3D({ title, model, diagram }: Readonly<Explore3DProps>) {
  const capable = useSyncExternalStore(noSubscription, canShow3D, () => null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [stopId, setStopId] = useState(model.stops[0]?.id ?? '');
  const [showBones, setShowBones] = useState(true);
  const [showArteries, setShowArteries] = useState(true);

  const nameOf = (id: string) =>
    diagram.nodes.find((node) => node.id === id)?.name ??
    model.parts.find((part) => part.id === id)?.name ??
    id;
  const isNerve = (id: string) => model.nerves.some((nerve) => nerve.id === id);
  const highlight: ReadonlySet<string> = selected
    ? isNerve(selected)
      ? pathThrough(diagram.edges, selected)
      : new Set([selected])
    : new Set();
  const stop = model.stops.find((item) => item.id === stopId) ?? model.stops[0];

  const description = selected
    ? isNerve(selected)
      ? `${nameOf(selected)}. Path: ${diagram.nodes
          .filter((node) => highlight.has(node.id))
          .map((node) => node.name)
          .join(', ')}.`
      : `${nameOf(selected)}.`
    : (stop?.description ?? '');

  const toggle = (id: string) => setSelected(selected === id ? null : id);

  if (capable === false) {
    return (
      <div className="flex flex-col gap-4">
        <Card tone="glass">
          <Text>This phone cannot show the 3D view, so here is the same diagram in 2D.</Text>
        </Card>
        <PathTracer diagram={diagram} title={title} selectedId={selected} onSelect={setSelected} />
      </div>
    );
  }

  return (
    // Grid children directly, so the view can stay pinned on phones while the list scrolls under it.
    <div className="grid gap-4 lg:grid-cols-5 lg:gap-x-12">
      <fieldset className="flex flex-wrap gap-2 lg:col-span-3">
        <legend className="sr-only">Views</legend>
        {model.stops.map((item) => (
          <ToggleChip key={item.id} pressed={item.id === stopId} onClick={() => setStopId(item.id)}>
            {item.title}
          </ToggleChip>
        ))}
      </fieldset>
      <div className="z-10 flex flex-col gap-2 self-start max-md:sticky max-md:top-2 max-md:rounded-xl max-md:bg-glass max-md:p-2 max-md:shadow-glass max-md:backdrop-blur-md lg:col-span-3">
        <div
          role="img"
          aria-label={title}
          className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface"
        >
          {capable === null ? (
            <Skeleton className="aspect-square w-full" />
          ) : (
            <Viewer3D
              model={model}
              highlight={highlight}
              onSelect={setSelected}
              stopId={stopId}
              showBones={showBones}
              showArteries={showArteries}
              reducedMotion={reducedMotion}
            />
          )}
        </div>
        <output className="block text-sm text-fg">{description}</output>
      </div>
      <Text size="xs" tone="muted" className="lg:col-span-3">
        Drag to turn, pinch or scroll to zoom. {model.credit}
      </Text>

      <div className="flex flex-col gap-4 lg:col-span-2 lg:col-start-4 lg:row-span-3 lg:row-start-1">
        <fieldset className="flex flex-wrap gap-2">
          <legend className="pb-2 text-sm font-semibold text-ink">Show</legend>
          <ToggleChip pressed={showBones} onClick={() => setShowBones(!showBones)}>
            Bones
          </ToggleChip>
          <ToggleChip pressed={showArteries} onClick={() => setShowArteries(!showArteries)}>
            Arteries
          </ToggleChip>
        </fieldset>
        {NERVE_GROUPS.map((group) => (
          <fieldset key={group.title} className="flex flex-wrap gap-2">
            <legend className="pb-2 text-sm font-semibold text-ink">{group.title}</legend>
            {group.ids.filter(isNerve).map((id) => (
              <ToggleChip key={id} pressed={selected === id} onClick={() => toggle(id)}>
                {nameOf(id)}
              </ToggleChip>
            ))}
          </fieldset>
        ))}
        <fieldset className="flex flex-wrap gap-2">
          <legend className="pb-2 text-sm font-semibold text-ink">Arteries</legend>
          {model.parts
            .filter((part) => part.kind === 'artery')
            .map((part) => (
              <ToggleChip
                key={part.id}
                pressed={selected === part.id}
                onClick={() => toggle(part.id)}
              >
                {part.name}
              </ToggleChip>
            ))}
        </fieldset>
      </div>
    </div>
  );
}
