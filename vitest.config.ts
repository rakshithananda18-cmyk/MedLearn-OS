import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const webSrc = fileURLToPath(new URL('./apps/web/src', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': webSrc } },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: [
            'packages/*/src/**/*.test.ts',
            'packages/config/**/*.test.mjs',
            'apps/web/src/**/*.test.ts',
            'scripts/**/*.test.mjs',
          ],
          exclude: ['**/node_modules/**', '**/*.int.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'component',
          environment: 'jsdom',
          // Accessibility scans in jsdom are slow, more so under coverage on a busy laptop.
          testTimeout: 15_000,
          include: ['packages/*/src/**/*.test.tsx', 'apps/web/src/**/*.test.tsx'],
          setupFiles: ['packages/test-utils/src/setup-dom.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'node',
          include: ['packages/*/src/**/*.int.test.ts', 'apps/web/src/**/*.int.test.ts'],
          setupFiles: ['packages/test-utils/src/setup-integration.ts'],
          fileParallelism: false,
        },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**', 'apps/web/src/**'],
      exclude: [
        '**/*.test.*',
        '**/*.d.ts',
        '**/database.types.ts',
        'packages/test-utils/**',
        // Next.js entry files and browser wiring run only in a real browser; Playwright covers them.
        'apps/web/src/app/**/{page,layout}.tsx',
        'apps/web/src/lib/client-logger.ts',
        // The 3D view needs WebGL, which jsdom lacks; the studio journeys in Playwright drive it.
        'packages/visuals/src/viewer3d/Viewer3D.tsx',
      ],
      thresholds: {
        'packages/core/src/**': { lines: 90 },
        'packages/{schemas,logger,db,ui,visuals}/src/**': { lines: 80 },
        'apps/web/src/**': { lines: 70 },
      },
    },
  },
});
