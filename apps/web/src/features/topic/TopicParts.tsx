import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { Rotate3d } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * The topic's 3D model standing on its pedestal, with the way back in its top corner and the way
 * into the studio in the bottom one.
 */
export function TopicHero({
  slug,
  poster,
  back,
}: Readonly<{ slug: string; poster: string; back: ReactNode }>) {
  return (
    <div className="relative flex h-hero animate-rise items-end justify-center xl:h-stage-topic xl:rounded-xl xl:border xl:border-glass-border xl:bg-glass xl:p-8 xl:shadow-glass">
      <div className="absolute top-0 left-0 z-10 xl:top-4 xl:left-4">{back}</div>
      <span
        aria-hidden="true"
        className="pedestal absolute bottom-2 left-1/2 h-12 w-3/5 -translate-x-1/2 xl:bottom-8"
      />
      <Image
        src={poster}
        alt=""
        width={560}
        height={600}
        unoptimized
        // The largest thing on the page: fetched from the <head>.
        preload
        className="relative h-full w-auto object-contain"
      />
      <Link
        href={`/studio?topic=${slug}`}
        className="absolute right-0 bottom-4 inline-flex xl:right-6 xl:bottom-6 h-12 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-canvas shadow-float transition-transform duration-150 hover:-translate-y-px"
      >
        <Icon icon={Rotate3d} />
        Turn it in 3D
      </Link>
    </div>
  );
}

export interface ModeTileProps {
  href: string;
  icon: IconGlyph;
  title: string;
  meta: string;
  /** The first thing to do: filled, where the rest are glass. */
  primary?: boolean;
  wide?: boolean;
}

/** One way to study the topic, as a tile: the icon, then its name over a line of detail. */
export function ModeTile({
  href,
  icon,
  title,
  meta,
  primary = false,
  wide = false,
}: Readonly<ModeTileProps>) {
  return (
    <li className={cx(wide && 'col-span-2')}>
      <Link
        href={href}
        className={cx(
          'flex h-full min-h-16 items-center gap-3 rounded-lg border px-4 py-3 transition-colors duration-150',
          primary
            ? 'border-primary bg-primary text-on-primary hover:bg-primary-hover'
            : 'border-glass-border bg-glass text-ink shadow-glass hover:border-gold',
        )}
      >
        <Icon icon={icon} className={cx('shrink-0', !primary && 'text-gold-ink')} />
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold">{title}</span>
          <span className={cx('text-sm', !primary && 'text-fg-muted')}>{meta}</span>
        </span>
      </Link>
    </li>
  );
}
