import { createBrowserLogger } from '@medlearn/logger/browser';

/** The browser logger for client components. Development prints to the console. */
export const clientLogger = createBrowserLogger({
  endpoint: '/api/log',
  toConsole: process.env.NODE_ENV === 'development',
});

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => clientLogger.flush());
}
