import type { BodyRegion } from '@medlearn/schemas';
import { cx } from '@medlearn/ui';
import type { KeyboardEvent } from 'react';

// A simple front view for phones that cannot show 3D. The back has no shape here; it is picked
// from the list of regions.
const SHAPES: Array<{ id: BodyRegion; name: string; paths: string[] }> = [
  {
    id: 'head-neck',
    name: 'Head and neck',
    paths: ['M100 11a24 24 0 1 1 0 48a24 24 0 1 1 0-48Z', 'M90 58h20v18H90Z'],
  },
  { id: 'thorax', name: 'Thorax', paths: ['M62 78h76l-6 82H68Z'] },
  { id: 'abdomen', name: 'Abdomen', paths: ['M68 162h64v62H68Z'] },
  { id: 'pelvis', name: 'Pelvis', paths: ['M68 226h64l8 36H60Z'] },
  {
    id: 'upper-limb',
    name: 'Upper limb',
    paths: ['M60 80l-16 4-16 146 14 2 20-112Z', 'M140 80l16 4 16 146-14 2-20-112Z'],
  },
  {
    id: 'lower-limb',
    name: 'Lower limb',
    paths: ['M62 264h36l-4 126H72Z', 'M102 264h36l-10 126h-22Z'],
  },
];

export interface BodyOutlineProps {
  selected: BodyRegion;
  onSelect: (id: BodyRegion) => void;
}

/** A flat body outline with tappable regions: the 2D fallback of the body map. */
export function BodyOutline({ selected, onSelect }: Readonly<BodyOutlineProps>) {
  const onKeyDown = (event: KeyboardEvent, id: BodyRegion) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onSelect(id);
  };
  return (
    <fieldset className="size-full">
      <legend className="sr-only">Body outline</legend>
      <svg viewBox="0 0 200 400" className="h-full w-full">
        {SHAPES.map((shape) => (
          <g
            key={shape.id}
            role="button"
            tabIndex={0}
            aria-label={shape.name}
            aria-pressed={shape.id === selected}
            onClick={() => onSelect(shape.id)}
            onKeyDown={(event) => onKeyDown(event, shape.id)}
            className={cx(
              'cursor-pointer focus:outline-none [&:focus-visible>path]:stroke-focus',
              shape.id === selected
                ? 'fill-primary stroke-primary'
                : 'fill-surface stroke-border-strong',
            )}
          >
            {shape.paths.map((path) => (
              <path key={path} d={path} strokeWidth={1.5} />
            ))}
          </g>
        ))}
      </svg>
    </fieldset>
  );
}
