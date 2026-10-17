import { AppError } from '@medlearn/core';
import type { ReviewerInput, ReviewerRecord, RoleChange } from '@medlearn/schemas';

import type { DbClient } from './client';

/**
 * The review team as admins manage it. Row-level security decides who may: only admins read or
 * change the team and its log, and the database stamps who made each change.
 */
export function createAdminRepository(db: DbClient) {
  const failed = (message: string, error: { code?: string }) =>
    error.code === '42501'
      ? new AppError('FORBIDDEN', 'Only admins can manage the review team')
      : new AppError('INTERNAL', message, { cause: error });

  return {
    /** Whether the signed-in person is an admin. */
    async isAdmin(): Promise<boolean> {
      const { data, error } = await db.rpc('is_admin');
      // Visitors without a session may not even ask; they are simply not admins.
      if (error) return false;
      return data === true;
    },

    /** The review team, in the order they joined. */
    async reviewers(): Promise<ReviewerRecord[]> {
      const { data, error } = await db
        .from('content_reviewers')
        .select('email, qualification, added_at, added_by')
        .order('added_at', { ascending: true });
      if (error) throw failed('Failed to load the review team', error);
      return data.map((row) => ({
        email: row.email,
        qualification: row.qualification,
        addedAt: row.added_at,
        addedBy: row.added_by,
      }));
    },

    /** Adds a reviewer; an email already on the team is a conflict. */
    async addReviewer({ email, qualification }: ReviewerInput): Promise<void> {
      const { error } = await db.from('content_reviewers').insert({ email, qualification });
      if (error?.code === '23505') throw new AppError('CONFLICT', 'Already on the review team');
      if (error) throw failed('Failed to add the reviewer', error);
    },

    /** Changes a reviewer's qualification; false when the email is not on the team. */
    async updateReviewer(email: string, qualification: string): Promise<boolean> {
      const { data, error } = await db
        .from('content_reviewers')
        .update({ qualification })
        .eq('email', email.toLowerCase())
        .select('email');
      if (error) throw failed('Failed to update the reviewer', error);
      return data.length > 0;
    },

    /** Takes a reviewer off the team; false when the email was not on it. */
    async removeReviewer(email: string): Promise<boolean> {
      const { data, error } = await db
        .from('content_reviewers')
        .delete()
        .eq('email', email.toLowerCase())
        .select('email');
      if (error) throw failed('Failed to remove the reviewer', error);
      return data.length > 0;
    },

    /** The latest changes to the team, newest first. */
    async changes(limit = 50): Promise<RoleChange[]> {
      const { data, error } = await db
        .from('role_changes')
        .select('id, role, email, action, qualification, changed_by, changed_at')
        .order('id', { ascending: false })
        .limit(limit);
      if (error) throw failed('Failed to load the change log', error);
      return data.map((row) => ({
        id: row.id,
        role: 'reviewer' as const,
        email: row.email,
        action: row.action as RoleChange['action'],
        qualification: row.qualification,
        changedBy: row.changed_by,
        changedAt: row.changed_at,
      }));
    },
  };
}

export type AdminRepository = ReturnType<typeof createAdminRepository>;
