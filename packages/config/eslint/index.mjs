import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { noEmoji } from './no-emoji.mjs';
import { noRawDesignValues } from './no-raw-design-values.mjs';

export const ignores = {
  ignores: [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/coverage/**',
    '**/playwright-report/**',
    '**/test-results/**',
    '**/next-env.d.ts',
    'packages/db/src/database.types.ts',
  ],
};

/** Rules shared by every package and app. */
export const base = tseslint.config(ignores, js.configs.recommended, tseslint.configs.strict, {
  languageOptions: { globals: { ...globals.node } },
  plugins: {
    medlearn: { rules: { 'no-emoji': noEmoji, 'no-raw-design-values': noRawDesignValues } },
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'medlearn/no-emoji': 'error',
    'no-console': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
});

/**
 * Design-system rules for UI code: values come from tokens, icons come from the curated set.
 * `files` are the app and UI component sources; tests may use example values.
 */
export function designSystem(files) {
  return [
    {
      files,
      ignores: ['**/*.test.*'],
      rules: {
        'medlearn/no-raw-design-values': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'lucide-react',
                message: "Import icons from '@medlearn/ui/icons' and render them with <Icon>.",
              },
            ],
          },
        ],
      },
    },
    {
      // The icon set and the Icon wrapper are the only places that touch lucide-react.
      files: ['packages/ui/src/icons.ts', 'packages/ui/src/Icon.tsx'],
      rules: { 'no-restricted-imports': 'off' },
    },
  ];
}

/** A service worker runs in its own global scope, with self and caches. */
export const serviceWorker = {
  files: ['**/public/sw.js'],
  languageOptions: { globals: { ...globals.serviceworker } },
};

/** Command-line scripts may print to the terminal. */
export const scripts = {
  files: ['scripts/**/*.mjs'],
  rules: { 'no-console': 'off' },
};
