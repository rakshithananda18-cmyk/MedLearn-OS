import { AppError } from '@medlearn/core';
import { ClientLogBatch } from '@medlearn/schemas';

import { noContent, parseJson, withRoute } from '@/server/route';

// ponytail: size cap only; add per-client rate limiting before public launch.
const MAX_BODY_BYTES = 64_000;

/** Receives batched warnings and errors from the browser logger. */
export const POST = withRoute('POST /api/log', async (request, { log }) => {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    throw new AppError('VALIDATION_FAILED', 'Log batch is too large');
  }
  const { entries } = await parseJson(request, ClientLogBatch);
  for (const entry of entries) {
    log[entry.level](
      {
        source: 'browser',
        path: entry.path,
        clientTime: entry.time,
        clientRequestId: entry.requestId,
        context: entry.context,
      },
      entry.message,
    );
  }
  return noContent();
});
