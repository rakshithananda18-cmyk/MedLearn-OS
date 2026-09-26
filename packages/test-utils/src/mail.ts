/** The local stack's test mailbox (Mailpit), started by `pnpm db:start`. */
const MAILPIT_URL = process.env.MAILPIT_URL ?? 'http://127.0.0.1:54324';

interface MailList {
  messages: { ID: string; Created: string }[];
}

/**
 * The 6-digit code in the newest email sent to `to` after `since`; waits for it to arrive.
 * Every MedLearn email carries its code as the only 6-digit number.
 */
export async function emailedCode(to: string, since: Date, timeoutMs = 10_000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  const query = encodeURIComponent(`to:"${to}"`);
  while (Date.now() < deadline) {
    const search = await fetch(`${MAILPIT_URL}/api/v1/search?query=${query}`);
    const { messages } = (await search.json()) as MailList;
    const newest = messages.find(
      (message) => Date.parse(message.Created) >= since.getTime() - 1000,
    );
    if (newest) {
      const message = (await (
        await fetch(`${MAILPIT_URL}/api/v1/message/${newest.ID}`)
      ).json()) as {
        Text: string;
      };
      const code = /\b\d{6}\b/.exec(message.Text)?.[0];
      if (code) return code;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`No code emailed to ${to} within ${timeoutMs} ms. Is Mailpit running?`);
}
