import { spawn } from 'node:child_process';

import { fail, step, succeeds, waitFor } from './cli.mjs';

const DESKTOP_LAUNCH = {
  // Launched through explorer.exe so Windows' shell starts it. A direct child of a packaged
  // (sandboxed) app, such as a terminal inside a desktop app, would inherit that sandbox and
  // Docker's socket files would be redirected into the app's private storage and break.
  win32: ['explorer.exe', ['C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe']],
  darwin: ['open', ['-a', 'Docker']],
};

export function isDockerRunning() {
  return succeeds('docker', ['info']);
}

/** Starts Docker Desktop when it is installed but not running, then waits for the engine. */
export async function ensureDocker() {
  if (isDockerRunning()) return;

  const launch = DESKTOP_LAUNCH[process.platform];
  if (!launch) fail('Docker is not running. Start the Docker service, then re-run.');

  step('Starting Docker Desktop (waits up to 3 minutes for the engine)');
  const [command, args] = launch;
  spawn(command, args, { detached: true, stdio: 'ignore' }).unref();

  const ready = await waitFor(isDockerRunning, { timeoutMs: 180_000, intervalMs: 3000 });
  if (!ready) {
    fail(
      'Docker did not start in time. Open Docker Desktop, wait for "Engine running", then re-run.',
    );
  }
}
