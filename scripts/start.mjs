// `pnpm start`: runs everything needed for local development and stops it again on exit.
// Starts Docker Desktop (if needed), the local database and the web app, then opens the
// browser. Ctrl+C (or the app exiting) stops the web app, and the database too if this
// script started it. Database data is kept between runs.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

import {
  fail,
  isWindows,
  killTree,
  openBrowser,
  requireNode,
  run,
  step,
  succeeds,
  waitFor,
} from './lib/cli.mjs';
import { ensureDocker } from './lib/docker.mjs';

const PORT = 3000;
const APP_URL = `http://localhost:${PORT}`;
const WEB_DIR = 'apps/web';
// `pnpm start --no-open` skips the browser (useful for scripted checks).
const OPEN_BROWSER = !process.argv.includes('--no-open');

requireNode(24);
if (!existsSync(`${WEB_DIR}/.env.local`)) {
  fail('Local setup is missing. Run `pnpm bootstrap` once, then `pnpm start`.');
}

await ensureDocker();

const databaseWasRunning = succeeds('pnpm', ['exec', 'supabase', 'status']);
if (databaseWasRunning) {
  step('Local database already running; leaving it as it is');
} else {
  step('Starting the local database');
  run('pnpm', ['db:start']);
}

step(`Starting the web app on ${APP_URL}`);
// Next is started with Node directly (not through a shell) so Ctrl+C and cleanup are reliable.
const nextBin = createRequire(`${process.cwd()}/${WEB_DIR}/package.json`).resolve(
  'next/dist/bin/next',
);
const web = spawn(process.execPath, [nextBin, 'dev', '--port', String(PORT)], {
  cwd: WEB_DIR,
  stdio: 'inherit',
  detached: !isWindows,
});

let stopping = false;
function shutdown(code) {
  if (stopping) return;
  stopping = true;
  step('Stopping');
  killTree(web);
  if (databaseWasRunning) {
    console.log('  Local database was running before `pnpm start`; leaving it on.');
  } else {
    run('pnpm', ['db:stop'], { allowFailure: true });
  }
  console.log('Stopped.');
  process.exit(code);
}

// SIGHUP covers closing the terminal window (Windows allows a few seconds to clean up).
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(signal, () => shutdown(0));
web.on('exit', (code) => shutdown(code ?? 0));

const responding = await waitFor(
  () =>
    fetch(APP_URL, { method: 'HEAD' }).then(
      () => true,
      () => false,
    ),
  { timeoutMs: 120_000, intervalMs: 1000 },
);
if (!responding) {
  console.error(
    `\nThe web app did not respond at ${APP_URL} within 2 minutes; see the output above.`,
  );
  shutdown(1);
} else {
  const health = await fetch(`${APP_URL}/api/health`).catch(() => undefined);
  if (!health?.ok) {
    console.warn('\nWarning: /api/health is not ok; the database may be unreachable.');
  }
  if (OPEN_BROWSER) openBrowser(APP_URL);
  console.log(`\nMedLearn OS is running at ${APP_URL}. Press Ctrl+C to stop everything.\n`);
}
