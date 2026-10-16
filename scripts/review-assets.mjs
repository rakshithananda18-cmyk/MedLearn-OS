import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'apps/web/public');
const output = join(root, 'apps/web/src/content/review-assets.json');

/** Content assets are hashed before Next loads content, including replacements at the same URL. */
export function reviewAssets() {
  const entries = ['models', 'posters', 'xrays'].flatMap((folder) =>
    readdirSync(join(publicDir, folder), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const path = join(entry.parentPath, entry.name);
        return [
          `/${relative(publicDir, path).replaceAll('\\', '/')}`,
          createHash('sha256').update(readFileSync(path)).digest('hex'),
        ];
      }),
  );
  return Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b, 'en')));
}

export function writeReviewAssets() {
  const json = `${JSON.stringify(reviewAssets(), null, 2)}\n`;
  if (!existsSync(output) || readFileSync(output, 'utf8') !== json) writeFileSync(output, json);
}
