import { AppError } from '@medlearn/core';
import type { Database, DbClient } from '@medlearn/db';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { getDbConfig } from './env';

/**
 * A database client acting as the visitor, with their session kept in cookies. The browser only
 * ever talks to this server, so phones on the same Wi-Fi work without reaching the database.
 */
export async function getSessionDb(): Promise<DbClient> {
  const { url, key } = getDbConfig();
  const store = await cookies();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        for (const { name, value, options } of list) store.set(name, value, options);
      },
    },
  });
}

/** The signed-in learner's id, or null for a visitor without a session. */
export async function getUserId(db: DbClient): Promise<string | null> {
  const { data } = await db.auth.getUser();
  return data.user?.id ?? null;
}

export async function requireUserId(db: DbClient): Promise<string> {
  const userId = await getUserId(db);
  if (!userId) throw new AppError('UNAUTHORIZED', 'Start a session first');
  return userId;
}
