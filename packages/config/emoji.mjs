// Characters that render as emoji by default, plus the variation selector that turns
// ordinary symbols (for example a heart) into emoji. Symbols such as arrows, the
// copyright sign and the trademark sign stay allowed.
const VARIATION_SELECTOR_16 = String.fromCodePoint(0xfe0f);

const SOURCE = String.raw`\p{Emoji_Presentation}|` + VARIATION_SELECTOR_16;

/** Returns every emoji match in `text` with its index. */
export function findEmoji(text) {
  return [...text.matchAll(new RegExp(SOURCE, 'gu'))].map((match) => ({
    char: match[0],
    index: match.index,
  }));
}
