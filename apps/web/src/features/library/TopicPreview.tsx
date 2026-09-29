'use client';

import { buttonClasses, cx, Eyebrow, Icon, IconButton, Text } from '@medlearn/ui';
import { BookOpen, Check, ClipboardCheck, Play, Rotate3d, RotateCcw, X } from '@medlearn/ui/icons';
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

/** How much of one kind the topic holds, as a small chip: "6 lesson steps". */
function Tally({
  icon,
  value,
  label,
}: Readonly<{ icon: typeof Play; value: number; label: string }>) {
  return (
    <li className="flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs text-fg-muted">
      <Icon icon={icon} size="sm" className="text-gold-ink" />
      <span className="font-semibold text-ink">{value}</span> {label}
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
      className="flex flex-col rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
    >
      {/* A new key per topic replays the rise, so each pick arrives rather than swaps. */}
      <div key={topic.slug} className="flex animate-rise flex-col gap-4">
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
            size="sm"
            className="absolute top-3 right-3 shadow-raised"
            onClick={onClose}
          />
          {preview.hasModel ? (
            <Link
              href={`/studio?topic=${topic.slug}`}
              className="absolute right-3 bottom-3 flex h-8 items-center gap-2 rounded-full bg-ink px-3 text-xs font-semibold text-canvas shadow-float transition-transform duration-150 hover:-translate-y-px"
            >
              <Icon icon={Rotate3d} size="sm" />
              Turn it in 3D
            </Link>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <Eyebrow>
            {where} · {topic.estimatedMinutes} min
          </Eyebrow>
          <h2 id="preview-title" className="text-gold font-display text-3xl tracking-display">
            {topic.title}
          </h2>
          <Text size="sm" tone="muted">
            {topic.summary}
          </Text>
        </div>

        <ul aria-label="In this topic" className="flex flex-wrap gap-2">
          <Tally icon={Play} value={preview.lessonSteps} label="lesson steps" />
          <Tally icon={ClipboardCheck} value={topic.questionIds.length} label="questions" />
          <Tally icon={RotateCcw} value={topic.cardIds.length} label="recall cards" />
        </ul>

        <div className="flex items-center gap-2">
          <Link href={`/learn/${topic.slug}/lesson`} className={buttonClasses({ fullWidth: true })}>
            <Icon icon={Play} size="sm" />
            {status === 'learnt' ? 'Go over the lesson' : 'Start lesson'}
          </Link>
          <Link
            href={`/learn/${topic.slug}`}
            className={buttonClasses({ variant: 'secondary', fullWidth: true })}
          >
            Open topic
          </Link>
          <WhereToRead readings={preview.readings} />
        </div>

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
      </div>
    </article>
  );
}
