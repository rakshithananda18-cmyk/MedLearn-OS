import { AppError, toAppError } from '@medlearn/core';
import type { Logger } from '@medlearn/logger/server';
import type { z } from 'zod';

import { logger as defaultLogger } from './logger';
import { REQUEST_ID_HEADER, resolveRequestId } from './request-id';

export interface RouteContext {
  log: Logger;
  requestId: string;
}

type Handler<Params> = (
  request: Request,
  context: RouteContext,
  params: Params,
) => Promise<Response>;
type Segment<Params> = { params: Promise<Params> };

/**
 * The one wrapper every API route uses: request id, child logger, timing,
 * and mapping of thrown errors to the standard `{ error }` body.
 */
export function createRouteWrapper(logger: Logger) {
  return function withRoute<Params = Record<string, never>>(
    route: string,
    handler: Handler<Params>,
  ) {
    return async (request: Request, segment?: Segment<Params>): Promise<Response> => {
      const requestId = resolveRequestId(request.headers.get(REQUEST_ID_HEADER));
      const log = logger.child({ requestId, route, method: request.method });
      const started = performance.now();

      let response: Response;
      try {
        response = await handler(request, { log, requestId }, (await segment?.params) as Params);
      } catch (error) {
        const appError = toAppError(error);
        const level = appError.isServerError ? 'error' : 'warn';
        log[level](
          { err: error, code: appError.code, details: appError.details },
          appError.message,
        );
        response = Response.json(appError.toBody(requestId), { status: appError.status });
      }

      response.headers.set(REQUEST_ID_HEADER, requestId);
      const durationMs = Math.round(performance.now() - started);
      log.info({ status: response.status, durationMs }, 'request completed');
      return response;
    };
  };
}

export const withRoute = createRouteWrapper(defaultLogger);

/** Successful response in the standard `{ data }` shape. */
export function ok<T>(data: T, init?: ResponseInit): Response {
  return Response.json({ data }, init);
}

export function noContent(): Response {
  return new Response(null, { status: 204 });
}

/** Parses and validates a JSON body, throwing VALIDATION_FAILED with field paths on failure. */
export async function parseJson<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new AppError('VALIDATION_FAILED', 'Request body must be valid JSON');
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    throw new AppError('VALIDATION_FAILED', 'Request body is invalid', { details: { issues } });
  }
  return result.data;
}
