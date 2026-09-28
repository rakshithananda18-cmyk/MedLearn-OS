import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { compile } from 'tailwindcss';
import { beforeAll, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const tailwindDir = path.dirname(require.resolve('tailwindcss/package.json'));
const tokensFile = fileURLToPath(new URL('./tokens.css', import.meta.url));

async function loadStylesheet(id: string, base: string) {
  const file = id === 'tailwindcss' ? path.join(tailwindDir, 'index.css') : path.resolve(base, id);
  return { content: readFileSync(file, 'utf8'), base: path.dirname(file), path: file };
}

let generates: (className: string) => boolean;

beforeAll(async () => {
  const css = `@import "tailwindcss";\n${readFileSync(tokensFile, 'utf8')}`;
  const compiler = await compile(css, { base: path.dirname(tokensFile), loadStylesheet });
  generates = (className) => {
    const selector = `.${className.replaceAll(':', '\\:')}`;
    return compiler.build([className]).includes(selector);
  };
});

describe('design tokens', () => {
  it.each([
    'p-4',
    'gap-6',
    'bg-primary',
    'text-fg-muted',
    'border-border-strong',
    'rounded-md',
    'shadow-raised',
    'text-sm',
    'font-semibold',
    'ease-standard',
    'md:flex',
    'lg:grid',
    'dark:bg-surface',
    'xl:grid',
    'bg-sky',
    'bg-glass',
    'text-gold',
    'font-display',
    'rounded-xl',
    'shadow-glass',
    'animate-rise',
    'pb-tabbar',
    'w-dock',
    'h-hero',
    'h-stage',
  ])('provides %s', (className) => {
    expect(generates(className)).toBe(true);
  });

  it.each([
    ['p-5', 'spacing off the 4px scale'],
    ['m-7', 'spacing off the 4px scale'],
    ['w-72', 'spacing off the 4px scale'],
    ['text-red-500', "Tailwind's default palette"],
    ['bg-white', "Tailwind's default palette"],
    ['text-black', "Tailwind's default palette"],
    ['rounded-2xl', 'radius outside the five tokens'],
    ['shadow-lg', 'shadow outside the elevation tokens'],
    ['text-6xl', 'type size outside the scale'],
    ['sm:flex', 'breakpoint outside 600 / 840 / 1024'],
    ['ease-in', 'easing other than the standard curve'],
  ])('does not provide %s (%s)', (className) => {
    expect(generates(className)).toBe(false);
  });

  it('keeps anatomical colours available for diagrams', () => {
    expect(generates('fill-anat-artery')).toBe(true);
    expect(generates('stroke-anat-nerve')).toBe(true);
  });
});
