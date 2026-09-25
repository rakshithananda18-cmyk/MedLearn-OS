import { createLogger } from '@medlearn/logger/server';

import { getLogLevel } from './env';

export const logger = createLogger({
  service: 'web',
  level: getLogLevel(),
  pretty: process.env.NODE_ENV === 'development',
});
