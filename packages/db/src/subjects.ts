import { AppError } from '@medlearn/core';
import { Subject } from '@medlearn/schemas';

import type { DbClient } from './client';
import type { Database } from './database.types';

type SubjectRow = Pick<
  Database['public']['Tables']['subjects']['Row'],
  'id' | 'slug' | 'name' | 'sort_order'
>;

export function toSubject(row: SubjectRow): Subject {
  return Subject.parse({ id: row.id, slug: row.slug, name: row.name, sortOrder: row.sort_order });
}

export function createSubjectsRepository(db: DbClient) {
  return {
    /** All subjects in teaching order. */
    async list(): Promise<Subject[]> {
      const { data, error } = await db
        .from('subjects')
        .select('id, slug, name, sort_order')
        .order('sort_order');
      if (error) throw new AppError('INTERNAL', 'Failed to load subjects', { cause: error });
      return data.map(toSubject);
    },
  };
}

export type SubjectsRepository = ReturnType<typeof createSubjectsRepository>;
