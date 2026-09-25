import { RuleTester } from 'eslint';
import { describe, expect, it } from 'vitest';

import { findEmoji } from '../emoji.mjs';
import { noEmoji } from './no-emoji.mjs';

// Built from code points so this file contains no emoji itself.
const GRINNING_FACE = String.fromCodePoint(0x1f600);
const HEART_AS_EMOJI = String.fromCodePoint(0x2764, 0xfe0f);

RuleTester.describe = describe;
RuleTester.it = it;

new RuleTester().run('no-emoji', noEmoji, {
  valid: [
    { code: 'const label = "Start today";' },
    { code: 'const arrow = "Anatomy → Physiology";' },
    { code: 'const legal = "© MedLearn OS™";' },
  ],
  invalid: [
    {
      code: `const label = "Done ${GRINNING_FACE}";`,
      errors: [{ messageId: 'emoji', line: 1, column: 21 }],
    },
    {
      code: `// ${HEART_AS_EMOJI}\nconst x = 1;`,
      errors: [{ messageId: 'emoji' }],
    },
  ],
});

describe('findEmoji', () => {
  it('returns the index of each emoji', () => {
    expect(findEmoji(`a${GRINNING_FACE}b`)).toEqual([{ char: GRINNING_FACE, index: 1 }]);
  });

  it('ignores plain text symbols', () => {
    expect(findEmoji('→ © ™ ❤')).toEqual([]);
  });
});
