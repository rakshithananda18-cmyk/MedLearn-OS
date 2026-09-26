import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Written by `pnpm bootstrap` from the running local Supabase stack. */
export const TEST_ENV_FILE = fileURLToPath(new URL('../../../.env.test.local', import.meta.url));

export function loadTestEnv(file = TEST_ENV_FILE): void {
  if (!existsSync(file)) {
    throw new Error(
      `Missing ${file}. Start Docker, then run \`pnpm bootstrap\` to create the local test environment.`,
    );
  }
  process.loadEnvFile(file);
}
