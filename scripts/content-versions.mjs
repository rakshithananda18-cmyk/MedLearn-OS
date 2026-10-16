// `pnpm content:versions`: records every topic's version and content fingerprint in
// apps/web/src/content/content-versions.json. Run it after bumping the versions of changed topics;
// the test beside that file fails when content changes under an old version.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const vitest = join(
  dirname(createRequire(import.meta.url).resolve('vitest/package.json')),
  'vitest.mjs',
);
const result = spawnSync(
  process.execPath,
  [vitest, 'run', '--project', 'unit', 'apps/web/src/content/content-versions.test.ts'],
  { stdio: 'inherit', env: { ...process.env, UPDATE_CONTENT_VERSIONS: '1' } },
);
process.exit(result.status ?? 1);
