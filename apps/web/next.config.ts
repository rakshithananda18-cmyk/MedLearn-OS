import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Workspace packages ship TypeScript source.
  transpilePackages: [
    '@medlearn/core',
    '@medlearn/db',
    '@medlearn/logger',
    '@medlearn/schemas',
    '@medlearn/ui',
    '@medlearn/visuals',
  ],
  serverExternalPackages: ['pino', 'pino-pretty'],
  // The service worker must never be cached, or phones would keep an old one.
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

export default config;
