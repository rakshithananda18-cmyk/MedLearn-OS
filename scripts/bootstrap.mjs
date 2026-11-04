// One-time (and repeatable) local setup: checks prerequisites, starts the local
// Supabase stack, writes env files from it, rebuilds the database with seed data, and
// installs the browser used by end-to-end tests. Re-running resets local data only.
import { isPortFree, requireNode, run, step, waitFor } from './lib/cli.mjs';
import { ensureDocker } from './lib/docker.mjs';
import { configureLocalEnv } from './lib/local-env.mjs';

step('Checking prerequisites');
requireNode(24);
await ensureDocker();

// `pnpm db:start` starts only the services the app uses so far (Postgres, auth, REST API, gateway
// and the Mailpit test mailbox). Auth stays on: `supabase status` only reports the API keys while
// it runs. Add others back there when a milestone needs them (storage for media, studio for a GUI).
step('Starting the local Supabase stack (first run downloads images; this can take a while)');
if (run('pnpm', ['db:start'], { allowFailure: true }) !== 0) {
  // Postgres's port 54322 sits in the range the system hands out for outgoing connections, so an
  // image download can hold it ("address already in use"), and a closed connection keeps it for
  // about a minute. CI reserves the ports (see ci.yml); here, show what holds it, wait, retry once.
  step('The database did not start; waiting for its port 54322, then trying once more');
  if (process.platform === 'linux') run('ss', ['-tan', 'sport = :54322'], { allowFailure: true });
  run('pnpm', ['exec', 'supabase', 'stop'], { allowFailure: true });
  await waitFor(() => isPortFree(54322), { timeoutMs: 120_000, intervalMs: 2000 });
  run('pnpm', ['db:start']);
}

step('Writing environment files');
configureLocalEnv();
console.log('  apps/web/.env.local\n  .env.test.local');

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
