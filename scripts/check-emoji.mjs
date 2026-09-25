// Fails when any tracked text file contains emoji. ESLint covers code; this covers
// Markdown, JSON, YAML, CSS and SQL too. Uses the same detector as the ESLint rule.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

import { findEmoji } from '@medlearn/config/emoji';

const TEXT_FILE = /\.(md|mdx|json|ya?ml|css|sql|html|txt|toml|ts|tsx|mjs|js)$/i;

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
  encoding: 'utf8',
})
  .split('\n')
  .filter((file) => TEXT_FILE.test(file) && file !== 'pnpm-lock.yaml');

const problems = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const { char, index } of findEmoji(text)) {
    const line = text.slice(0, index).split('\n').length;
    problems.push(`${file}:${line}  emoji "${char}" is not allowed; use an outlined SVG icon`);
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} emoji found.`);
  process.exit(1);
}
console.log(`No emoji found in ${files.length} files.`);
