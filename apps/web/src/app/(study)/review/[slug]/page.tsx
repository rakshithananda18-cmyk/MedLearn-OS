import { createReviewsRepository } from '@medlearn/db';
import { Badge, Display, Eyebrow, Text } from '@medlearn/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import { getTopic } from '@/content/topics';
import { ReportList } from '@/features/review/ReportList';
import { ReviewersOnly } from '@/features/review/ReviewersOnly';
import { ReviewForm } from '@/features/review/ReviewForm';
import { ReviewRefresh } from '@/features/review/ReviewRefresh';
import { reviewState, STATE } from '@/features/review/state';
import { TopicSheet } from '@/features/review/TopicSheet';
import { Screen } from '@/features/shell/Screen';
import { topicReviewDigest } from '@/server/review-digest';
import { getSessionDb } from '@/server/session';

export const metadata: Metadata = { title: 'Review a topic | MedLearn OS' };

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

/** One topic laid out for checking, with the decision form, its history and its reports. */
export default async function ReviewTopicPage({ params }: PageProps<'/review/[slug]'>) {
  await connection();
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const reviews = createReviewsRepository(await getSessionDb());
  if (!(await reviews.isReviewer())) {
    return (
      <Screen>
        <ReviewersOnly />
      </Screen>
    );
  }
  const [history, reports] = await Promise.all([reviews.history(slug), reviews.reports(slug)]);
  const digest = topicReviewDigest(topic);
  const state = reviewState(topic.version, history[0], digest);
  return (
    <Screen width="wide">
      <ReviewRefresh />
      <div className="grid gap-4 xl:grid-cols-5 xl:items-start">
        <div className="flex flex-col gap-4 xl:col-span-5">
          <Link
            href="/review"
            className="self-start text-sm font-semibold text-primary-strong underline-offset-4 hover:underline"
          >
            All topics
          </Link>
          <header className="flex flex-col gap-2">
            <Eyebrow>Review · version {topic.version}</Eyebrow>
            <Display size="md">{topic.title}</Display>
            <Badge tone={STATE[state].tone}>{STATE[state].label}</Badge>
            <Text tone="muted">{topic.summary}</Text>
          </header>
          <nav aria-label="Review evidence" className="flex flex-wrap gap-2">
            {[
              ['Open lesson', `/learn/${topic.slug}/lesson`],
              ...(topic.visual.kind === 'path' && topic.visual.drill.length
                ? [['Open diagram', `/learn/${topic.slug}/draw`]]
                : []),
              ...(topic.visual.kind === 'path' && topic.visual.model3d
                ? [['Open 3D', `/studio?topic=${topic.slug}`]]
                : []),
            ].map(([label, href]) => (
              <Link
                key={label}
                href={`${href}${href?.includes('?') ? '&' : '?'}review=${digest}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-lg border border-border px-3 text-sm font-semibold text-primary-strong underline-offset-4 hover:underline"
              >
                {label} <span className="sr-only">(opens in a new tab)</span>
              </Link>
            ))}
          </nav>
          <Text size="sm" tone="muted">
            Evidence {digest.slice(0, 12)}. Links open the current version. If content changes while
            you check it, reload this page before deciding.
          </Text>
        </div>
        <div className="flex flex-col gap-4 xl:col-span-3">
          <TopicSheet topic={topic} />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-2">
          <ReviewForm key={digest} slug={topic.slug} version={topic.version} digest={digest} />
          <section
            aria-label="Review history"
            className="flex flex-col gap-2 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
          >
            <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
              History
            </h2>
            {history.length === 0 ? <Text tone="muted">Not reviewed yet.</Text> : null}
            <ul className="flex flex-col gap-2">
              {history.map((review) => (
                <li key={review.id} className="flex flex-col text-sm">
                  <span className="font-semibold text-ink">
                    {review.decision === 'approved' ? 'Approved' : 'Changes asked for'} · version{' '}
                    {review.contentVersion}
                  </span>
                  <span className="text-xs text-fg-muted">
                    {review.reviewerEmail} · {day(review.decidedAt)}
                  </span>
                  {review.note ? <span className="text-fg">{review.note}</span> : null}
                </li>
              ))}
            </ul>
          </section>
          <ReportList reports={reports} />
        </div>
      </div>
    </Screen>
  );
}
