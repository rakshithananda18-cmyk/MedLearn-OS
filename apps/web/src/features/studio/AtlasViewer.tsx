'use client';

import { cx, Icon, IconButton } from '@medlearn/ui';
import { ExternalLink, Pause, Play, X, ZoomIn, ZoomOut } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ATLAS, type AtlasBody, platesFor } from '@/content/atlas';

/** How long each system stays up while the atlas plays through them. */
const PLAY_MS = 4000;

const chip = (on: boolean) =>
  cx(
    'h-8 shrink-0 rounded-full px-3 text-xs font-semibold whitespace-nowrap transition-colors duration-150',
    on ? 'bg-ink text-canvas' : 'bg-surface-muted text-ink hover:bg-border',
  );

/**
 * The body atlas: labelled plates of the whole body, one system at a time (skeleton, muscles,
 * circulation, nerves, lymph, digestion, reproductive), male or female where a plate exists.
 * Play fades through the systems one after another, like peeling the body layer by layer; a tap
 * on the plate zooms in, and the page scrolls to move around it. Each system links to the topics
 * that study it.
 */
export function AtlasViewer({
  titles,
  onClose,
}: Readonly<{
  /** Topic titles by slug, for the links to topics. */
  titles: Record<string, string>;
  onClose: () => void;
}>) {
  const [systemIndex, setSystemIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const [body, setBody] = useState<AtlasBody>('male');
  const [playing, setPlaying] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const system = ATLAS[systemIndex] ?? ATLAS[0];

  useEffect(() => {
    if (!playing) return;
    const next = setTimeout(() => {
      setSystemIndex((index) => (index + 1) % ATLAS.length);
      setViewIndex(0);
    }, PLAY_MS);
    return () => clearTimeout(next);
  }, [playing, systemIndex]);

  if (!system) return null;
  const { plates, missing } = platesFor(system, body);
  const plate = plates[viewIndex] ?? plates[0];
  if (!plate) return null;
  const choose = (index: number) => {
    setSystemIndex(index);
    setViewIndex(0);
    setZoomed(false);
  };
  const topics = system.topics.flatMap((slug) => {
    const title = titles[slug];
    return title ? [{ slug, title }] : [];
  });

  return (
    <section
      aria-label="Body atlas"
      className="pointer-events-auto flex min-h-0 flex-1 animate-rise flex-col gap-3 rounded-xl border border-glass-border bg-surface p-3 shadow-overlay"
    >
      <header className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="text-gold font-display text-2xl tracking-display">Body atlas</h2>
          <span className="text-xs text-fg-muted">Whole-body plates by system</span>
        </div>
        <fieldset aria-label="Body" className="flex gap-1 rounded-full bg-surface-muted p-1">
          {(['male', 'female'] as const).map((choice) => (
            <button
              key={choice}
              type="button"
              aria-pressed={body === choice}
              onClick={() => {
                setBody(choice);
                setViewIndex(0);
              }}
              className={cx(
                'h-8 rounded-full px-3 text-xs font-semibold capitalize',
                body === choice ? 'bg-ink text-canvas' : 'text-ink hover:bg-surface',
              )}
            >
              {choice}
            </button>
          ))}
        </fieldset>
        <IconButton
          icon={playing ? Pause : Play}
          label={playing ? 'Pause' : 'Play through the systems'}
          title={playing ? 'Pause' : 'Play through the systems'}
          size="sm"
          variant="secondary"
          aria-pressed={playing}
          onClick={() => setPlaying(!playing)}
        />
        <IconButton icon={X} label="Close the atlas" size="sm" onClick={onClose} />
      </header>

      <ul aria-label="Systems" className="scroll-row flex gap-1 pb-1">
        {ATLAS.map((item, index) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              aria-pressed={index === systemIndex}
              onClick={() => {
                setPlaying(false);
                choose(index);
              }}
              className={chip(index === systemIndex)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
        <div className="relative min-h-0 flex-1 overflow-auto rounded-lg bg-canvas">
          <button
            type="button"
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            onClick={() => setZoomed(!zoomed)}
            className={cx('block', zoomed ? 'cursor-zoom-out' : 'mx-auto h-full cursor-zoom-in')}
            style={zoomed ? { width: '200%' } : undefined}
          >
            <Image
              // A new key per plate fades each one in, so the systems peel one into the next.
              key={plate.id}
              src={`/atlas/${plate.id}.webp`}
              alt={`${system.name}, ${plate.view.toLowerCase()}: a labelled plate of the whole body`}
              width={plate.width}
              height={plate.height}
              unoptimized
              className={cx(
                'animate-rise object-contain',
                zoomed ? 'h-auto w-full' : 'h-full w-auto',
              )}
            />
          </button>
          <span className="pointer-events-none absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-surface text-ink shadow-raised">
            <Icon icon={zoomed ? ZoomOut : ZoomIn} size="sm" />
          </span>
        </div>

        <div className="flex max-h-full min-h-0 flex-col gap-3 overflow-y-auto md:w-2/5">
          {plates.length > 1 ? (
            <fieldset aria-label="Views" className="flex gap-1">
              {plates.map((other, index) => (
                <button
                  key={other.id}
                  type="button"
                  aria-pressed={index === viewIndex}
                  onClick={() => setViewIndex(index)}
                  className={chip(index === viewIndex)}
                >
                  {other.view}
                </button>
              ))}
            </fieldset>
          ) : null}
          <p className="text-sm text-fg">{system.about}</p>
          {missing ? (
            <p className="rounded-md bg-surface-muted px-3 py-2 text-xs text-fg-muted">
              A {body} plate for this system is still to come; this one shows the{' '}
              {plate.body === 'either' ? 'body' : plate.body} body.
            </p>
          ) : null}
          {topics.length > 0 ? (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
                Study it in the upper limb
              </h3>
              <ul className="flex flex-wrap gap-1">
                {topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/learn/${topic.slug}`}
                      className="inline-flex h-8 items-center rounded-full border border-border-strong px-3 text-xs font-semibold text-ink hover:border-gold"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-auto flex flex-wrap items-center gap-1 text-xs text-fg-muted">
            Plate: {plate.credit}, via Wikimedia Commons
            <a
              href={plate.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              original
              <Icon icon={ExternalLink} size="sm" label="opens in a new tab" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
