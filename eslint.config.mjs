import { base, scripts } from '@medlearn/config/eslint';
import nextVitals from 'eslint-config-next/core-web-vitals';

const REACT_FILES = ['apps/web/**/*.{ts,tsx}', 'packages/ui/**/*.{ts,tsx}'];

// Next's rules (React, hooks, jsx-a11y, Next) apply to React code only.
// Ignore-only entries are global and stay untouched.
const next = nextVitals.map((config) =>
  Object.keys(config).every((key) => key === 'ignores' || key === 'name')
    ? config
    : {
        ...config,
        files: REACT_FILES,
        settings: { ...config.settings, next: { rootDir: 'apps/web/' } },
      },
);

export default [...base, ...next, scripts];
