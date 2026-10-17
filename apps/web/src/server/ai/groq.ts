import { AppError } from '@medlearn/core';
import type { Logger } from '@medlearn/logger/server';

// The one way the server talks to an AI model: Groq's OpenAI-compatible API. The key stays on the
// server; logs keep timings, models and token counts, never what was asked or answered.

export type Tier = 'simple' | 'complex';

const URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Models for each kind of request, first choice first. Each model has its own per-minute limit on
 * the free tier, so a busy or failing model hands over to the next.
 */
export const MODELS: Record<Tier, readonly string[]> = {
  simple: ['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3.8-27b'],
  complex: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'],
};

const SETTINGS: Record<Tier, { effort: string; maxTokens: number; timeoutMs: number }> = {
  simple: { effort: 'low', maxTokens: 2500, timeoutMs: 20_000 },
  complex: { effort: 'medium', maxTokens: 5000, timeoutMs: 45_000 },
};

export interface AskOptions {
  tier: Tier;
  system: string;
  user: string;
  /** The answer's JSON schema, held to strictly by the models that can. */
  schema: { name: string; schema: Record<string, unknown> };
  log: Logger;
  apiKey?: string | undefined;
  fetcher?: typeof fetch;
}

/** Whether the AI can be used at all: it is off until the server has a key. */
export const aiEnabled = (env: Record<string, string | undefined> = process.env) =>
  Boolean(env.GROQ_API_KEY);

/**
 * Asks for a JSON answer and returns it parsed, with the model that gave it. Tries each model of
 * the tier in turn; throws UNAVAILABLE when there is no key or none of them answers.
 */
export async function askJson({
  tier,
  system,
  user,
  schema,
  log,
  apiKey = process.env.GROQ_API_KEY,
  fetcher = fetch,
}: AskOptions): Promise<{ content: unknown; model: string }> {
  if (!apiKey) throw new AppError('UNAVAILABLE', 'The AI is switched off on this server');
  const { effort, maxTokens, timeoutMs } = SETTINGS[tier];
  for (const model of MODELS[tier]) {
    const reasoning = model.startsWith('openai/')
      ? { reasoning_effort: effort }
      : { reasoning_format: 'hidden' };
    const started = performance.now();
    try {
      const response = await fetcher(URL, {
        method: 'POST',
        headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
          temperature: 0.3,
          // Counted against the per-minute limit before the model starts, so keep it tight.
          max_completion_tokens: maxTokens,
          response_format: { type: 'json_schema', json_schema: { ...schema, strict: true } },
          ...reasoning,
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const durationMs = Math.round(performance.now() - started);
      if (!response.ok) {
        log.warn({ model, tier, status: response.status, durationMs }, 'ai model declined');
        continue;
      }
      const body = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };
      const content = JSON.parse(body.choices?.[0]?.message?.content ?? '') as unknown;
      log.info(
        {
          model,
          tier,
          durationMs,
          promptTokens: body.usage?.prompt_tokens,
          completionTokens: body.usage?.completion_tokens,
        },
        'ai answered',
      );
      return { content, model };
    } catch (error) {
      // A timeout, a dropped connection or an answer that is not JSON: try the next model.
      const durationMs = Math.round(performance.now() - started);
      log.warn({ model, tier, durationMs, reason: (error as Error).name }, 'ai model failed');
    }
  }
  throw new AppError('UNAVAILABLE', 'No AI model answered');
}
