import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './database.types';

export type DbClient = SupabaseClient<Database>;

export interface DbConfig {
  url: string;
  /** Public (anon / publishable) key; row-level security applies. */
  key: string;
}

/** Server-side client: no session storage, no token refresh timers. */
export function createDbClient({ url, key }: DbConfig): DbClient {
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
