'use client';

import { buttonClasses, cx, Eyebrow, Icon, IconButton, Text } from '@medlearn/ui';
import { BookOpen, Check, Play, Rotate3d, X } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';

import type { TopicSummary } from '@/content/topics';
import { type Reading, WhereToRead } from '@/features/books/WhereToRead';
import { MasteryCard } from '@/features/progress/MasteryCard';

/** What the library shows about a topic before the student opens it. */
export interface TopicPreviewData {
  topic: TopicSummary;
  /** The subject's name, for the eyebrow when the topic has no region. */
  subject: string;
  /** The first few key facts. */
  keyFacts: string[];
  lessonSteps: number;
  hasModel: boolean;
  readings: Reading[];
}

export type PreviewStatus = 'next' | 'learnt' | 'new';

const STATUS: Record<PreviewStatus, { label: string; tone: string }> = {
  next: { label: 'Up next', tone: 'bg-primary text-on-primary' },
  learnt: { label: 'Learnt', tone: 'bg-surface text-primary-strong' },
  new: { label: 'Not started', tone: 'bg-surface text-fg-muted' },
};

/** A number in gold with what it counts, like the tallies on Today. */
function Tally({ value, label }: Readonly<{ value: number; label: string }>) {
  return (
    <li className="flex flex-col gap-1 rounded-lg bg-surface-muted p-3">
      <span className="text-gold font-display text-4xl">{value}</span>
      <span className="text-xs font-semibold text-fg-muted">{label}</span>
    </li>
  );
}

/**
 * A topic at a glance beside the library: its model on a pedestal, where it sits in the book,
 * the ways in, how much there is, how far along the student is, and where to read it.
 */
export function TopicPreview({
  preview,
  trail,
  status,
  onClose,
}: Readonly<{
  preview: TopicPreviewData;
  /** Its region and book section. */
  trail: string[];
  status: PreviewStatus;
  onClose: () => void;
}>) {
  const { topic } = preview;
  const where = trail.at(-1) ?? preview.subject;
  return (
    <article
      aria-labelledby="preview-title"
      className="flex flex-col gap-6 rounded-xl border border-glass-border bg-glass p-6 shadow-glass backdrop-blur-md"
    >
      {/* A new key per topic replays the rise, so each pick arrives rather than swaps. */}
      <div key={topic.slug} className="flex animate-rise flex-col gap-6">
        <div className="relative flex h-preview items-end justify-center rounded-lg bg-gloss">
          <span
            aria-hidden="true"
            className="pedestal absolute bottom-3 left-1/2 h-8 w-1/2 -translate-x-1/2"
          />
          {topic.poster ? (
            <Image
              src={topic.poster}
              alt=""
              width={420}
              height={450}
              unoptimized
              className="relative h-full w-auto object-contain py-3"
            />
          ) : (
            <Icon icon={BookOpen} className="relative mb-12 text-gold-ink" />
          )}
          <span
            className={cx(
              'absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-raised',
              STATUS[status].tone,
            )}
          >
            {STATUS[status].label}
          </span>
          <IconButton
            icon={X}
            label="Close the preview"
            variant="secondary"
            className="absolute top-3 right-3 shadow-raised"
            onClick={onClose}
          />
          {preview.hasModel ? (
            <Link
              href={`/studio?topic=${topic.slug}`}
              className="absolute right-3 bottom-3 flex h-12 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-canvas shadow-float transition-transform duration-150 hover:-translate-y-px"
            >
              <Icon icon={Rotate3d} size="sm" />
              Turn it in 3D
            </Link>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Eyebrow>
            {where} · {topic.estimatedMinutes} min
          </Eyebrow>
          <h2 id="preview-title" className="text-gold font-display text-4xl tracking-display">
            {topic.title}
          </h2>
          <Text tone="muted">{topic.summary}</Text>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link href={`/learn/${topic.slug}/lesson`} className={buttonClasses()}>
            <Icon icon={Play} size="sm" />
            {status === 'learnt' ? 'Go over the lesson' : 'Start lesson'}
          </Link>
          <Link href={`/learn/${topic.slug}`} className={buttonClasses({ variant: 'secondary' })}>
            Open topic
          </Link>
        </div>

        <ul aria-label="In this topic" className="grid grid-cols-3 gap-2">
          <Tally value={preview.lessonSteps} label="lesson steps" />
          <Tally value={topic.questionIds.length} label="questions" />
          <Tally value={topic.cardIds.length} label="recall cards" />
        </ul>

        <MasteryCard topic={topic} />

        {preview.keyFacts.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
              Key facts
            </h3>
            <ul className="flex flex-col gap-2">
              {preview.keyFacts.map((fact) => (
                <li key={fact} className="flex gap-2 text-sm text-fg">
                  <Icon icon={Check} size="sm" className="mt-px shrink-0 text-primary" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <WhereToRead readings={preview.readings} />
      </div>
    </article>
  );
}
