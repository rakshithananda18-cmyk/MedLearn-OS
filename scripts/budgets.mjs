// Performance budgets (Engineering Plan, Section 11) against the production build. Run after
// `pnpm build`: pnpm test:budgets
//  - JavaScript per route: the scripts each page's HTML loads, gzipped. Chunks fetched later (the
//    3D viewer, the schema library, links prefetched in the background) are not first load.
//  - Largest Contentful Paint, layout shift and total blocking time: Lighthouse on its phone
//    profile with real throttling (slow 4G and a slowed CPU), median of three runs. Blocking time
//    stands in for Interaction to Next Paint, which needs a real tap.
//  - The CPU slowdown is calibrated for slow machines, so a slow CI runner still emulates the
//    same phone as a fast one (a fixed 4x made blocking time double on a slow runner).
import { spawn } from 'node:child_process';
import { gzipSync } from 'node:zlib';

import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { throttling } from 'lighthouse/core/config/constants.js';

const PORT = 3300;
const DEBUG_PORT = 9223;
const ORIGIN = `http://localhost:${PORT}`;
const RUNS = 3;

// Lighthouse's standard 4x CPU slowdown assumes a host at least as fast as its regular target, a
// benchmark index of about 2000 (it warns below 1000, "about 2x weaker"). A slower host gets a
// proportionally smaller slowdown so it emulates the same phone; a faster one keeps 4x, as
// Lighthouse advises (scaling fast hosts up overshot: 8x on an index of 3751).
// ponytail: calibration knob; revisit once the app is measured on a real phone.
const TARGET_BENCHMARK_INDEX = 2000;
const STANDARD_SLOWDOWN = throttling.mobileSlow4G.cpuSlowdownMultiplier;

const SCRIPT_BUDGET_KB = 200;
const ROUTES = [
  '/',
  '/welcome',
  '/today',
  '/subjects',
  '/practice',
  '/revise',
  '/progress',
  '/account',
  '/learn/brachial-plexus',
  '/learn/brachial-plexus/lesson',
  '/learn/brachial-plexus/draw',
  '/learn/oxygen-haemoglobin-curve/lesson',
  '/studio',
  '/studio?topic=axilla',
];

// Three screens that stand for the rest: the landing page, Today and a lesson.
const LIGHTHOUSE_ROUTES = ['/', '/today', '/learn/brachial-plexus/lesson'];
const LIGHTHOUSE_BUDGETS = {
  'largest-contentful-paint': 2500,
  'cumulative-layout-shift': 0.1,
  'total-blocking-time': 200,
};

let failed = false;
function report(ok, route, metric, value, budget) {
  failed ||= !ok;
  console.log(
    `${ok ? 'ok  ' : 'OVER'} ${route.padEnd(40)} ${metric.padEnd(26)} ${value} / ${budget}`,
  );
}

async function firstLoadScriptKb(route) {
  const html = await (await fetch(`${ORIGIN}${route}`)).text();
  // Every <script src> except the legacy polyfill that modern browsers skip (nomodule).
  const sources = [...html.matchAll(/<script\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter((tag) => !/\bnomodule\b/i.test(tag))
    .map((tag) => /\bsrc="([^"]+)"/.exec(tag)?.[1])
    .filter(Boolean);
  let bytes = 0;
  for (const source of new Set(sources)) {
    const body = Buffer.from(await (await fetch(new URL(source, ORIGIN))).arrayBuffer());
    bytes += gzipSync(body).length;
  }
  return bytes / 1024;
}

const median = (values) => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)];

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch(`${ORIGIN}/api/health`)).ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`The app did not start on ${ORIGIN}. Did you run pnpm build?`);
}

const server = spawn(
  process.execPath,
  ['apps/web/node_modules/next/dist/bin/next', 'start', 'apps/web', '--port', String(PORT)],
  { stdio: 'ignore' },
);
// Lighthouse drives a Chrome that is already running, so it never launches or cleans up its own.
// Installed Google Chrome, as Lighthouse expects (Playwright's headless shell times differently).
// CI machines have it; on a laptop, install Chrome if this fails.
const browser = await chromium.launch({
  channel: 'chrome',
  args: [`--remote-debugging-port=${DEBUG_PORT}`],
});

try {
  await waitForServer();

  for (const route of ROUTES) {
    const kb = await firstLoadScriptKb(route);
    report(
      kb <= SCRIPT_BUDGET_KB,
      route,
      'first-load JavaScript KB',
      Math.round(kb),
      SCRIPT_BUDGET_KB,
    );
  }

  // One run to measure how fast this machine is; its results are thrown away.
  const probe = await lighthouse(`${ORIGIN}/`, {
    port: DEBUG_PORT,
    logLevel: 'error',
    onlyCategories: ['performance'],
  });
  const benchmarkIndex = probe.lhr.environment.benchmarkIndex;
  const slowdown = Math.max(
    1,
    Math.round(STANDARD_SLOWDOWN * Math.min(1, benchmarkIndex / TARGET_BENCHMARK_INDEX) * 10) / 10,
  );
  console.log(`CPU slowdown ${slowdown}x (benchmark index ${Math.round(benchmarkIndex)})`);

  for (const route of LIGHTHOUSE_ROUTES) {
    const runs = [];
    for (let run = 0; run < RUNS; run++) {
      const result = await lighthouse(`${ORIGIN}${route}`, {
        port: DEBUG_PORT,
        logLevel: 'error',
        onlyCategories: ['performance'],
        throttlingMethod: 'devtools',
        throttling: { ...throttling.mobileSlow4G, cpuSlowdownMultiplier: slowdown },
      });
      runs.push(result.lhr);
    }
    for (const [metric, budget] of Object.entries(LIGHTHOUSE_BUDGETS)) {
      const value = median(runs.map((lhr) => lhr.audits[metric].numericValue));
      const shown = metric === 'cumulative-layout-shift' ? value.toFixed(3) : Math.round(value);
      report(value <= budget, route, metric, shown, budget);
    }
  }
} finally {
  await browser.close();
  server.kill();
}

if (failed) {
  console.error('\nA performance budget is broken (Engineering Plan, Section 11).');
  process.exit(1);
}
