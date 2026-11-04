import { capture, fail } from './cli.mjs';
import { upsertEnvFile } from './env-file.mjs';

/** Refresh local connection settings without resetting the database or revealing its keys. */
export function configureLocalEnv() {
  const output = capture('pnpm', ['exec', 'supabase', 'status', '-o', 'json']);
  const status = JSON.parse(output.slice(output.indexOf('{')));
  const key = status.PUBLISHABLE_KEY ?? status.ANON_KEY;
  if (!status.API_URL || !key) {
    fail('Could not read the running local Supabase URL and public key.');
  }
  const values = { SUPABASE_URL: status.API_URL, SUPABASE_ANON_KEY: key };
  upsertEnvFile('apps/web/.env.local', values);
  const mailUrl = status.MAILPIT_URL ?? status.INBUCKET_URL;
  upsertEnvFile('.env.test.local', {
    ...values,
    LOG_LEVEL: 'warn',
    ...(mailUrl ? { MAILPIT_URL: mailUrl } : {}),
  });
  return { url: status.API_URL };
}
