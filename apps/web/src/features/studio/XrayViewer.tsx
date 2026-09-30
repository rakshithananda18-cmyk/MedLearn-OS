'use client';

import { cx, Icon, IconButton } from '@medlearn/ui';
import { Check, Contrast, ExternalLink, X } from '@medlearn/ui/icons';
import { useState } from 'react';

import { XRAY_CREDIT, type XrayFilm } from '@/content/xrays';

/**
 * A topic's radiographs, one at a time: the film with its structures numbered (when names are on),
 * a key to the numbers, what to look for, the other views to switch to, and who made it. The film
 * can be inverted, as radiologists do to see edges better. Drawn in SVG, so the numbers stay on
 * their structures however the film is scaled.
 */
export function XrayViewer({
  films,
  index,
  labels,
  onIndex,
  onClose,
}: Readonly<{
  films: XrayFilm[];
  index: number;
  /** Numbered marks on the film (the studio's "names on the model" setting). */
  labels: boolean;
  onIndex: (index: number) => void;
  onClose: () => void;
}>) {
  const [inverted, setInverted] = useState(false);
  const [lit, setLit] = useState<number | null>(null);
  const film = films[index];
  if (!film) return null;
  const size = Math.min(film.width, film.height) * 0.03;

  return (
    <section
      aria-label={`X-ray: ${film.title}`}
      className="pointer-events-auto flex min-h-0 flex-1 animate-rise flex-col gap-3 rounded-xl bg-ink p-3 text-canvas shadow-overlay"
    >
      <header className="flex items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="truncate font-semibold">{film.title}</h2>
          <span className="text-xs opacity-75">Normal film · not yet medically reviewed</span>
        </div>
        <IconButton
          icon={Contrast}
          label="Invert the film"
          title="Invert the film"
          size="sm"
          aria-pressed={inverted}
          className={cx('text-canvas hover:bg-canvas/10', inverted && 'bg-canvas/20')}
          onClick={() => setInverted(!inverted)}
        />
        <IconButton
          icon={X}
          label="Close the X-rays"
          size="sm"
          className="text-canvas hover:bg-canvas/10"
          onClick={onClose}
        />
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
        <svg
          viewBox={`0 0 ${film.width} ${film.height}`}
          role="img"
          aria-label={`${film.title} radiograph`}
          className="min-h-0 w-full flex-1 md:h-full"
        >
          <image
            href={`/xrays/${film.id}.webp`}
            width={film.width}
            height={film.height}
            className={cx(inverted && 'invert')}
          />
          {labels
            ? film.marks.map((mark, number) => (
                <g
                  key={mark.label}
                  aria-hidden="true"
                  transform={`translate(${mark.x * film.width} ${mark.y * film.height})`}
                >
                  <circle
                    r={size}
                    className={cx(
                      'stroke-2',
                      lit === number ? 'fill-gold stroke-canvas' : 'fill-primary stroke-canvas',
                    )}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={size * 1.1}
                    className="fill-canvas font-semibold"
                  >
                    {number + 1}
                  </text>
                </g>
              ))
            : null}
        </svg>

        <div className="flex max-h-full min-h-0 flex-col gap-3 overflow-y-auto md:w-2/5">
          {labels && film.marks.length > 0 ? (
            <ol aria-label="Marked on the film" className="flex flex-col gap-1 text-sm">
              {film.marks.map((mark, number) => (
                <li key={mark.label}>
                  <button
                    type="button"
                    aria-pressed={lit === number}
                    onClick={() => setLit(lit === number ? null : number)}
                    onMouseEnter={() => setLit(number)}
                    onMouseLeave={() => setLit(null)}
                    className={cx(
                      'flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-colors duration-150',
                      lit === number ? 'bg-canvas/15' : 'hover:bg-canvas/10',
                    )}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold">
                      {number + 1}
                    </span>
                    {mark.label}
                  </button>
                </li>
              ))}
            </ol>
          ) : null}
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-gold">Look for</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {film.lookFor.map((point) => (
                <li key={point} className="flex gap-2">
                  <Icon icon={Check} size="sm" className="mt-px shrink-0 text-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {films.length > 1 ? (
        <ul aria-label="Views" className="scroll-row flex gap-2 pb-1">
          {films.map((other, position) => (
            <li key={other.id} className="shrink-0">
              <button
                type="button"
                aria-pressed={position === index}
                onClick={() => onIndex(position)}
                className={cx(
                  'h-8 rounded-full px-3 text-xs font-semibold whitespace-nowrap transition-colors duration-150',
                  position === index ? 'bg-canvas text-ink' : 'bg-canvas/10 hover:bg-canvas/20',
                )}
              >
                {other.title}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="flex flex-wrap items-center gap-1 text-xs opacity-75">
        {XRAY_CREDIT}
        <a
          href={film.source}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
        >
          original
          <Icon icon={ExternalLink} size="sm" label="opens in a new tab" />
        </a>
      </p>
    </section>
  );
}
