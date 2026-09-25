import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { noEmoji } from './no-emoji.mjs';

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
    medlearn: { rules: { 'no-emoji': noEmoji } },
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

/** Command-line scripts may print to the terminal. */
export const scripts = {
  files: ['scripts/**/*.mjs'],
  rules: { 'no-console': 'off' },
};
