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
        updatedAt: new Date(data.updated_at).toISOString(),
      });
    },

    /**
     * Saves progress unless the server already holds a newer copy (another device), in which
     * case nothing changes and the caller should load that copy instead.
     */
    async save(userId: string, progress: LearnerProgressInput): Promise<SaveResult> {
      const updatedAt = progress.updatedAt ?? new Date().toISOString();
      const current = await this.load(userId);
      if (current && Date.parse(current.updatedAt) > Date.parse(updatedAt)) return 'stale';
      const { error } = await db
        .from('learner_progress')
        .upsert({ user_id: userId, progress, updated_at: updatedAt });
      if (error) throw new AppError('INTERNAL', 'Failed to save progress', { cause: error });
      return 'saved';
    },
  };
}

export type ProgressRepository = ReturnType<typeof createProgressRepository>;
