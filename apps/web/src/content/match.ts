// Matching words the way students type them: any case or accent, while still typing, or with a
// letter wrong. Shared by the full search and the 3D studio's search of its own structures.

/** Words this long or longer may be misspelt by one letter and still match. */
const TYPO_FROM = 5;

/** Lower case without accents, so “haemoglobin” and “Haemoglobin” match alike. */
export const fold = (text: string) => text.normalize('NFD').replaceAll(/\p{M}/gu, '').toLowerCase();

export const wordsOf = (text: string) =>
  fold(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

/** The searched words (two letters or more), folded. */
export const searchTerms = (query: string) =>
  wordsOf(query.slice(0, 100)).filter((term) => term.length >= 2);

/** Whether two words differ by at most one letter added, dropped, changed or swapped with the next. */
function oneEditApart(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (a.length === b.length && a[i] === b[j + 1] && a[i + 1] === b[j]) {
      // Two letters typed the wrong way round ("poplitael").
      i += 2;
      j += 2;
    } else if (a.length > b.length) i += 1;
    else if (b.length > a.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/**
 * How well one searched word matches a text's words: 3 for the whole word, 2 for the start of a
 * word (typing is under way), 1 for inside a word or a word one letter off; 0 for no match.
 */
export function termScore(term: string, words: string[]): number {
  let best = 0;
  for (const word of words) {
    if (word === term) return 3;
    if (word.startsWith(term)) best = Math.max(best, 2);
    else if (word.includes(term)) best = Math.max(best, 1);
    else if (best === 0 && term.length >= TYPO_FROM && oneEditApart(term, word)) best = 1;
  }
  return best;
}

/** How well a name matches every word searched for (0 when one is missing), higher is better. */
export function nameScore(terms: string[], name: string): number {
  const words = wordsOf(name);
  let score = 0;
  for (const term of terms) {
    const match = termScore(term, words);
    if (match === 0) return 0;
    score += match;
  }
  return score;
}

/** The things whose names match the search, best first, at most `limit` of them. */
export function bestMatches<T>(
  items: T[],
  nameOf: (item: T) => string,
  query: string,
  limit: number,
): T[] {
  const terms = searchTerms(query);
  if (terms.length === 0) return [];
  return items
    .map((item) => ({ item, score: nameScore(terms, nameOf(item)) }))
    .filter((found) => found.score > 0)
    .toSorted((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((found) => found.item);
}
