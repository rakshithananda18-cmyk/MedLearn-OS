import { AppError } from '@medlearn/core';
import { type LearnerProgressInput, SavedProgress } from '@medlearn/schemas';

import type { DbClient } from './client';

export type SaveResult = 'saved' | 'stale';

/** Each learner's synced progress. Row-level security limits every call to the signed-in user. */
export function createProgressRepository(db: DbClient) {
  return {
    async load(userId: string): Promise<SavedProgress | null> {
      const { data, error } = await db
        .from('learner_progress')
        .select('progress, updated_at')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) throw new AppError('INTERNAL', 'Failed to load progress', { cause: error });
      if (!data) return null;
      return SavedProgress.parse({
        progress: data.progress,
        // Keep the database precision: this is also the next compare-and-swap token.
        updatedAt: data.updated_at,
      });
    },

    /**
     * Saves atomically. An expected version protects a read/merge/write cycle across devices;
     * null means the caller saw no saved copy. Older clients keep the timestamp-only guard.
     */
    async save(
      userId: string,
      progress: LearnerProgressInput,
      expectedUpdatedAt?: string | null,
    ): Promise<SaveResult> {
      const updatedAt = progress.updatedAt ?? new Date().toISOString();
      const { data, error } = await db.rpc('save_learner_progress', {
        p_user_id: userId,
        p_progress: { ...progress, updatedAt },
        p_updated_at: updatedAt,
        p_check_version: expectedUpdatedAt !== undefined,
        ...(expectedUpdatedAt != null ? { p_expected_updated_at: expectedUpdatedAt } : {}),
      });
      if (error) throw new AppError('INTERNAL', 'Failed to save progress', { cause: error });
      return data ? 'saved' : 'stale';
    },
  };
}

export type ProgressRepository = ReturnType<typeof createProgressRepository>;
