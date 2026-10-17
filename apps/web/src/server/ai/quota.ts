import { AppError } from '@medlearn/core';

/** AI requests one student may make in a day: plenty for planning, and it keeps the free tier for everyone. */
export const AI_REQUESTS_PER_DAY = 25;

// ponytail: kept in this server's memory, so a restart or a second instance starts the count
// afresh; move it to the database when the app runs on more than one server.
const used = new Map<string, { day: string; count: number }>();

/** Counts one AI request for the student today, or refuses once the day's allowance is used. */
export function takeAiRequest(userId: string, day: string, limit = AI_REQUESTS_PER_DAY): void {
  const current = used.get(userId);
  const count = current?.day === day ? current.count : 0;
  if (count >= limit) {
    throw new AppError('RATE_LIMITED', 'That is all the AI plans for today. Try again tomorrow.');
  }
  used.set(userId, { day, count: count + 1 });
}
