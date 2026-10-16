import { z } from 'zod';

import { ReportKind } from './progress';

const Slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
const Version = z.string().regex(/^\d+\.\d+\.\d+$/);

export const ReviewDecision = z.enum(['approved', 'changes-requested']);
export type ReviewDecision = z.infer<typeof ReviewDecision>;

/** What a reviewer checks against the book before approving a topic. */
export const ReviewChecks = z.object({
  /** The book and page references match what the topic says. */
  pages: z.boolean(),
  /** Key facts, lesson and cases are correct. */
  facts: z.boolean(),
  /** Questions, their answers and the recall cards are correct. */
  questions: z.boolean(),
  /** The diagram and the 3D labels and views show the right structures. */
  visuals: z.boolean(),
});
export type ReviewChecks = z.infer<typeof ReviewChecks>;

/** A reviewer's decision on one version of a topic. */
export const ReviewInput = z
  .object({
    topicSlug: Slug,
    contentVersion: Version,
    decision: ReviewDecision,
    checks: ReviewChecks,
    note: z.string().trim().max(2000).optional(),
  })
  .superRefine((review, ctx) => {
    if (review.decision === 'approved' && !Object.values(review.checks).every(Boolean)) {
      ctx.addIssue({ code: 'custom', path: ['checks'], message: 'Tick every check to approve' });
    }
    if (review.decision === 'changes-requested' && !review.note) {
      ctx.addIssue({ code: 'custom', path: ['note'], message: 'Say what needs changing' });
    }
  });
export type ReviewInput = z.infer<typeof ReviewInput>;

/** A topic's latest review outcome, as every student may see it. */
export const ReviewStatus = z.object({
  topicSlug: Slug,
  contentVersion: Version,
  decision: ReviewDecision,
  decidedAt: z.string(),
});
export type ReviewStatus = z.infer<typeof ReviewStatus>;

/** A past review, as the review team sees it. */
export const ReviewRecord = ReviewStatus.extend({
  id: z.number(),
  checks: ReviewChecks,
  note: z.string().nullable(),
  reviewerEmail: z.string(),
});
export type ReviewRecord = z.infer<typeof ReviewRecord>;

/** A student's report, as the review team sees it. */
export const ReportRecord = z.object({
  id: z.number(),
  topicSlug: Slug,
  contentVersion: Version,
  kind: ReportKind,
  note: z.string().nullable(),
  createdAt: z.string(),
  resolvedAt: z.string().nullable(),
});
export type ReportRecord = z.infer<typeof ReportRecord>;
