import type { NextConfig } from 'next';

import { writeReviewAssets } from '../../scripts/review-assets.mjs';

writeReviewAssets();

/** Origins the browser may load from besides this app: lecture players and their thumbnails. */
const YOUTUBE_PLAYER = 'https://www.youtube-nocookie.com';
const YOUTUBE_THUMBNAILS = 'https://i.ytimg.com';

/**
 * The content security policy for every page. Inline scripts stay allowed (Next.js writes some, and
 * nonces would make every page render per request); WebAssembly is allowed for the 3D model
 * decoder. Development adds eval and the reload socket that the dev server needs.
 */
export function contentSecurityPolicy(dev: boolean): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${dev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${YOUTUBE_THUMBNAILS}`,
    "font-src 'self'",
    `connect-src 'self'${dev ? ' ws:' : ''}`,
    `frame-src ${YOUTUBE_PLAYER}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

/** Headers sent with every response. */
export function securityHeaders(dev: boolean): { key: string; value: string }[] {
  return [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy(dev) },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    },
    ...(dev
      ? []
      : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]),
  ];
}

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
