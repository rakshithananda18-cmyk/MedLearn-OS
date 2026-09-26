// Small helpers shared by the developer scripts (bootstrap, start).
import { spawn, spawnSync } from 'node:child_process';
import { networkInterfaces } from 'node:os';

export const isWindows = process.platform === 'win32';

export function step(message) {
  console.log(`\n> ${message}`);
}

export function fail(message) {
  console.error(`\nStopped: ${message}`);
  process.exit(1);
}

/**
 * Joins a command and its arguments into one shell string, quoting parts with spaces or
 * special characters. Double quotes cannot be escaped portably in cmd.exe, so they are refused.
 */
export function toShellCommand(command, args) {
  return [command, ...args]
    .map((part) => {
      if (part.includes('"')) throw new Error(`Argument contains a double quote: ${part}`);
      return /^[\w@+=:,./-]+$/.test(part) ? part : `"${part}"`;
    })
    .join(' ');
}

// Windows needs a shell to run `.cmd` shims such as pnpm; the command is passed as one quoted
// string because Node deprecates combining `shell: true` with an argument list.
function spawnCommand(command, args, options) {
  return isWindows
    ? spawnSync(toShellCommand(command, args), { ...options, shell: true })
    : spawnSync(command, args, options);
}

/** Runs a command to completion with its output shown; exits the script on failure unless allowed. */
export function run(command, args, { allowFailure = false } = {}) {
  const code = spawnCommand(command, args, { stdio: 'inherit' }).status ?? 1;
  if (code !== 0 && !allowFailure) fail(`\`${command} ${args.join(' ')}\` exited with ${code}.`);
  return code;
}

/** True when the command exits with 0 (output hidden). */
export function succeeds(command, args) {
  return spawnCommand(command, args, { stdio: 'ignore' }).status === 0;
}

/** Runs a command and returns its standard output; exits the script on failure. */
export function capture(command, args) {
  const result = spawnCommand(command, args, { encoding: 'utf8' });
  if (result.status !== 0) fail(`\`${command} ${args.join(' ')}\` exited with ${result.status}.`);
  return result.stdout;
}

export function requireNode(major) {
  const current = Number(process.versions.node.split('.')[0]);
  if (current < major) fail(`Node.js ${major}+ is required; this is ${process.versions.node}.`);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Polls `check` until it returns true or the timeout passes. Resolves to whether it succeeded. */
export async function waitFor(check, { timeoutMs, intervalMs = 1000 }) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (await check()) return true;
    if (Date.now() + intervalMs > deadline) return false;
    await sleep(intervalMs);
  }
}

/** Stops a spawned process and everything it started. */
export function killTree(child) {
  if (child.pid === undefined || child.exitCode !== null) return;
  if (isWindows) {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    // Children are spawned `detached`, so the negative pid addresses the whole group.
    process.kill(-child.pid, 'SIGTERM');
  }
}

/** Opens `url` in the default browser. On Windows the shell (explorer.exe) launches it. */
export function openBrowser(url) {
  const [command, args] = isWindows
    ? ['explorer.exe', [url]]
    : process.platform === 'darwin'
      ? ['open', [url]]
      : ['xdg-open', [url]];
  spawn(command, args, { detached: true, stdio: 'ignore' }).unref();
}

/** This computer's addresses on the local network, for opening the app on a phone. */
export function lanAddresses(interfaces = networkInterfaces()) {
  return Object.values(interfaces)
    .flat()
    .filter((entry) => entry && entry.family === 'IPv4' && !entry.internal)
    .map((entry) => entry.address);
}
