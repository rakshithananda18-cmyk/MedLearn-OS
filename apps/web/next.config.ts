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
};

export default config;
