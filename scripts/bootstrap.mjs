// One-time (and repeatable) local setup: checks prerequisites, starts the local
// Supabase stack, writes env files from it, rebuilds the database with seed data, and
// installs the browser used by end-to-end tests. Re-running resets local data only.
import { capture, fail, requireNode, run, step } from './lib/cli.mjs';
import { ensureDocker } from './lib/docker.mjs';
import { upsertEnvFile } from './lib/env-file.mjs';

const WEB_ENV = 'apps/web/.env.local';
const TEST_ENV = '.env.test.local';

function readSupabaseStatus() {
  const output = capture('pnpm', ['exec', 'supabase', 'status', '-o', 'json']);
  return JSON.parse(output.slice(output.indexOf('{')));
}

step('Checking prerequisites');
requireNode(24);
await ensureDocker();

// `pnpm db:start` starts only the services the app uses so far (Postgres, auth, REST API, gateway
// and the Mailpit test mailbox). Auth stays on: `supabase status` only reports the API keys while
// it runs. Add others back there when a milestone needs them (storage for media, studio for a GUI).
step('Starting the local Supabase stack (first run downloads images; this can take a while)');
if (run('pnpm', ['db:start'], { allowFailure: true }) !== 0) {
  // Postgres's port 54322 sits in Linux's range for outgoing connections, so on a CI runner a
  // download can briefly hold it ("address already in use"). A clean stop and one more try gets
  // through.
  step('The database did not start; stopping it and trying once more');
  run('pnpm', ['exec', 'supabase', 'stop'], { allowFailure: true });
  run('pnpm', ['db:start']);
}

step('Writing environment files');
const status = readSupabaseStatus();
const anonKey = status.PUBLISHABLE_KEY ?? status.ANON_KEY;
if (!status.API_URL || !anonKey) {
  fail('Could not read API_URL and the public key from `supabase status`.');
}
const values = { SUPABASE_URL: status.API_URL, SUPABASE_ANON_KEY: anonKey };
upsertEnvFile(WEB_ENV, values);
upsertEnvFile(TEST_ENV, { ...values, LOG_LEVEL: 'warn' });
console.log(`  ${WEB_ENV}\n  ${TEST_ENV}`);

step('Rebuilding the local database from migrations and seed data');
run('pnpm', ['exec', 'supabase', 'db', 'reset']);

step('Installing the Chromium browser for end-to-end tests');
// CI runners also need the browser's system libraries.
run('pnpm', [
  'exec',
  'playwright',
  'install',
  ...(process.env.CI ? ['--with-deps'] : []),
  'chromium',
]);

console.log('\nReady. Next: `pnpm start` (opens the app) or `pnpm test:all`.');
