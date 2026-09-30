import { defineConfig, devices } from '@playwright/test';

// Separate local checkouts can run browser tests without reusing another server.
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? '3100');

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  // A laptop runs the app, the database and six browsers at once, so a navigation can take longer
  // than the default 5 s; CI runs one screen size per machine and keeps the default.
  expect: { timeout: process.env.CI ? 5_000 : 10_000 },
  // Hard stop for the whole run, so a hang fails in minutes instead of hours.
  globalTimeout: process.env.CI ? 10 * 60_000 : 0,
  // `list` prints each test as it runs, so CI logs show where anything stops.
  reporter: process.env.CI ? [['list'], ['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'] } },
    // iPad size and touch, in Chromium (the only browser CI installs).
    { name: 'tablet', use: { ...devices['iPad (gen 7)'], defaultBrowserType: 'chromium' } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  // Tests run against a production build (`pnpm test:e2e` builds first), as students will use it.
  // Next is started directly with Node, not through pnpm: pnpm puts its children in their own
  // process group on Linux, so Playwright could not stop the server and CI hung after the tests.
  webServer: {
    command: `node node_modules/next/dist/bin/next start --port ${PORT}`,
    cwd: 'apps/web',
    url: `http://localhost:${PORT}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
  },
});
