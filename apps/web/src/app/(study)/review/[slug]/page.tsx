import { createReviewsRepository } from '@medlearn/db';
import { Badge, buttonClasses, Display, Eyebrow, Text } from '@medlearn/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import { getTopic } from '@/content/topics';
import { ReportList } from '@/features/review/ReportList';
import { ReviewersOnly } from '@/features/review/ReviewersOnly';
import { ReviewForm } from '@/features/review/ReviewForm';
import { reviewState, STATE } from '@/features/review/state';
import { TopicSheet } from '@/features/review/TopicSheet';
import { Screen, TaskColumns } from '@/features/shell/Screen';
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
  const state = reviewState(topic.version, history[0]);
  return (
    <Screen width="wide">
      <TaskColumns
        intro={
          <>
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
            {/* The visuals are checked where students see them. */}
            <nav aria-label="See it as students do" className="flex flex-wrap gap-2">
              {[
                { href: `/learn/${topic.slug}`, label: 'Topic page' },
                { href: `/learn/${topic.slug}/lesson`, label: 'Lesson' },
                { href: `/learn/${topic.slug}/draw`, label: 'Diagram' },
                { href: `/studio?topic=${topic.slug}`, label: '3D' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className={buttonClasses({ variant: 'secondary', size: 'sm' })}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ReviewForm slug={topic.slug} version={topic.version} />
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
          </>
        }
      >
        <TopicSheet topic={topic} />
      </TaskColumns>
    </Screen>
  );
}
