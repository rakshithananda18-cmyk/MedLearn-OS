import { z } from 'zod';

/** An admin adds a reviewer, or changes what qualifies them. */
export const ReviewerInput = z.object({
  email: z
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),
  /** What qualifies them to check content: degree, year, department. */
  qualification: z.string().trim().min(2, 'Say what qualifies them').max(200),
});
export type ReviewerInput = z.infer<typeof ReviewerInput>;

/** Only the qualification changes in place; an email is removed and added again. */
export const ReviewerUpdate = ReviewerInput.pick({ qualification: true });
export type ReviewerUpdate = z.infer<typeof ReviewerUpdate>;

/** A member of the review team, as admins see them. */
export const ReviewerRecord = z.object({
  email: z.string(),
  qualification: z.string(),
  addedAt: z.string(),
  addedBy: z.string().nullable(),
});
export type ReviewerRecord = z.infer<typeof ReviewerRecord>;

/** One change to the review team, from the append-only log. */
export const RoleChange = z.object({
  id: z.number(),
  role: z.literal('reviewer'),
  email: z.string(),
  action: z.enum(['added', 'updated', 'removed']),
  qualification: z.string().nullable(),
  changedBy: z.string(),
  changedAt: z.string(),
});
export type RoleChange = z.infer<typeof RoleChange>;
