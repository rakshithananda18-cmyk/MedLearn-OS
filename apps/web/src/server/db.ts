import { createDbClient, createSubjectsRepository, type DbClient } from '@medlearn/db';

import { getDbConfig } from './env';

let client: DbClient | undefined;

/** One database client per server process, created on first use. */
export function getDb(): DbClient {
  client ??= createDbClient(getDbConfig());
  return client;
}

export function getSubjectsRepository() {
  return createSubjectsRepository(getDb());
}
