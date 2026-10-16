import type { NextConfig } from 'next';

import { securityHeaders } from './src/server/security-headers';

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
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders(process.env.NODE_ENV === 'development') },
      // The service worker must never be cached, or phones would keep an old one. Listed last so
      // its own policy wins over the one above.
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
