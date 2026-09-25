import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

/** Replaces or appends `KEY=value` lines, keeping every other line as it was. */
export function upsertEnvText(text, values) {
  let result = text;
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, 'm');
    result = pattern.test(result)
      ? result.replace(pattern, () => line)
      : `${result.trimEnd()}\n${line}\n`;
  }
  return result;
}

/** Updates an env file in place, creating it from `.env.example` first if missing. */
export function upsertEnvFile(file, values) {
  if (!existsSync(file)) copyFileSync('.env.example', file);
  writeFileSync(file, upsertEnvText(readFileSync(file, 'utf8'), values));
}
