import { AppError } from '@medlearn/core';
import type { ReportRecord, ReviewInput, ReviewRecord, ReviewStatus } from '@medlearn/schemas';

import type { DbClient } from './client';

const REVIEW_COLUMNS =
  'id, topic_slug, content_version, content_digest, decision, pages_checked, facts_checked, questions_checked, visuals_checked, note, reviewer_email, reviewer_qualification, created_at';

/**
 * Reviews of topics by the review team, and the students' reports they work through. Row-level
 * security decides who may do what: anyone reads the latest outcomes; only reviewers write
 * reviews and read or resolve reports.
 */
export function createReviewsRepository(db: DbClient) {
  return {
    /** Whether the signed-in person is on the review team. */
    async isReviewer(): Promise<boolean> {
      const { data, error } = await db.rpc('is_reviewer');
      // Visitors without a session may not even ask; they are simply not reviewers.
      if (error) return false;
      return data === true;
    },

    /** Every topic's latest decision, for showing what has been checked. */
    async statuses(): Promise<ReviewStatus[]> {
      const { data, error } = await db.rpc('topic_review_status');
      if (error) throw new AppError('INTERNAL', 'Failed to load review status', { cause: error });
      return data.map((row) => ({
        topicSlug: row.topic_slug,
        contentVersion: row.content_version,
        contentDigest: row.content_digest,
        decision: row.decision as ReviewStatus['decision'],
        decidedAt: row.decided_at,
      }));
    },

    async create(review: ReviewInput, reviewerId: string): Promise<void> {
      const { error } = await db.from('topic_reviews').insert({
        topic_slug: review.topicSlug,
        content_version: review.contentVersion,
        content_digest: review.contentDigest,
        decision: review.decision,
        pages_checked: review.checks.pages,
        facts_checked: review.checks.facts,
        questions_checked: review.checks.questions,
        visuals_checked: review.checks.visuals,
        note: review.note ? review.note : null,
        reviewer_id: reviewerId,
      });
      if (error?.code === '42501') throw new AppError('FORBIDDEN', 'Only reviewers can review');
      if (error) throw new AppError('INTERNAL', 'Failed to save the review', { cause: error });
    },

    /** One topic's reviews, newest first (reviewers only). */
    async history(topicSlug: string): Promise<ReviewRecord[]> {
      const { data, error } = await db
        .from('topic_reviews')
        .select(REVIEW_COLUMNS)
        .eq('topic_slug', topicSlug)
        .order('id', { ascending: false });
      if (error) throw new AppError('INTERNAL', 'Failed to load reviews', { cause: error });
      return data.map((row) => ({
        id: row.id,
        topicSlug: row.topic_slug,
        contentVersion: row.content_version,
        contentDigest: row.content_digest,
        decision: row.decision as ReviewRecord['decision'],
        decidedAt: row.created_at,
        checks: {
          pages: row.pages_checked,
          facts: row.facts_checked,
          questions: row.questions_checked,
          visuals: row.visuals_checked,
        },
        note: row.note,
        reviewerEmail: row.reviewer_email,
        reviewerQualification: row.reviewer_qualification,
      }));
    },

    /** Students' reports, newest first, all or for one topic (reviewers only). */
    async reports(topicSlug?: string): Promise<ReportRecord[]> {
      let query = db
        .from('content_reports')
        .select('id, topic_slug, content_version, kind, note, created_at, resolved_at')
        .order('created_at', { ascending: false });
      if (topicSlug) query = query.eq('topic_slug', topicSlug);
      const { data, error } = await query;
      if (error) throw new AppError('INTERNAL', 'Failed to load reports', { cause: error });
      return data.map((row) => ({
        id: row.id,
        topicSlug: row.topic_slug,
        contentVersion: row.content_version,
        kind: row.kind as ReportRecord['kind'],
        note: row.note,
        createdAt: row.created_at,
        resolvedAt: row.resolved_at,
      }));
    },

    /** Marks a report dealt with (reviewers only); false when there was no such report to them. */
    async resolveReport(id: number, reviewerId: string): Promise<boolean> {
      const { data, error } = await db
        .from('content_reports')
        .update({ resolved_at: new Date().toISOString(), resolved_by: reviewerId })
        .eq('id', id)
        .select('id');
      if (error) throw new AppError('INTERNAL', 'Failed to resolve the report', { cause: error });
      return data.length > 0;
    },
  };
}

export type ReviewsRepository = ReturnType<typeof createReviewsRepository>;
