import { cx } from '@medlearn/ui';
import Image from 'next/image';
import Link from 'next/link';

/** The way into the 3D body: pick a region and see what is left to learn there. */
export function BodyCard({
  learnt,
  total,
  className,
}: Readonly<{ learnt: number; total: number; className?: string }>) {
  return (
    <Link
      href="/studio"
      className={cx(
        'relative flex min-h-24 flex-col justify-between gap-3 overflow-hidden rounded-xl bg-ink p-4 text-canvas shadow-glass md:p-6',
        className,
      )}
    >
      <Image
        src="/posters/body.webp"
        alt=""
        width={560}
        height={600}
        unoptimized
        className="pointer-events-none absolute -top-2 right-0 h-full w-2/5 object-contain"
      />
      <span className="relative text-xs font-semibold uppercase tracking-eyebrow">
        Pick from the body
      </span>
      <span className="relative w-3/5 font-display text-2xl md:text-3xl" suppressHydrationWarning>
        {learnt} of {total} <em>topics learnt</em>
      </span>
    </Link>
  );
}
