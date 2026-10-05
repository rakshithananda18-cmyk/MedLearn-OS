import { createDbClient, createSubjectsRepository, type DbClient } from '@medlearn/db';
import type { Subject } from '@medlearn/schemas';

import { getDbConfig } from './env';
import { logger } from './logger';

let client: DbClient | undefined;

/** One database client per server process, created on first use. */
export function getDb(): DbClient {
  client ??= createDbClient(getDbConfig());
  return client;
}

export function getSubjectsRepository() {
  return createSubjectsRepository(getDb());
}

// The first-year subjects in teaching order, as the database is seeded: what the pages show when
// the database is out of reach.
const FIRST_YEAR_SUBJECTS: Array<Pick<Subject, 'slug' | 'name'>> = [
  { slug: 'anatomy', name: 'Anatomy' },
  { slug: 'physiology', name: 'Physiology' },
  { slug: 'biochemistry', name: 'Biochemistry' },
];

/**
 * The subjects in teaching order, from the database. The topics and books ship with the app, so
 * when the database cannot be reached (the local stack not started, a network fault) the library
 * and the books still open with the first-year subjects, and the fault is logged.
 */
export async function listSubjects(): Promise<Array<Pick<Subject, 'slug' | 'name'>>> {
  try {
    return await getSubjectsRepository().list();
  } catch (error) {
    logger.warn({ err: error }, 'subjects unavailable; showing the first-year subjects');
    return FIRST_YEAR_SUBJECTS;
  }
}
