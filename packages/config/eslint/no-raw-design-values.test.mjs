import { RuleTester } from 'eslint';
import { describe, expect, it } from 'vitest';

import { findRawDesignValue, noRawDesignValues } from './no-raw-design-values.mjs';

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

tester.run('no-raw-design-values', noRawDesignValues, {
  valid: [
    { code: 'const c = "bg-primary text-fg p-4 rounded-md md:flex";' },
    { code: 'const link = "#main-content";' },
    { code: 'const selector = "[data-theme=dark]";' },
    { code: 'const size = "h-12 w-full";' },
    { code: 'const el = <div className="gap-6">Topic #12</div>;' },
    { code: 'const c = "data-[state=checked]:bg-primary aria-[sort=ascending]:font-bold";' },
    { code: 'const c = "md:px-6 -mt-24 size-12 w-1/2 rounded-t-lg rounded-full grid-cols-3";' },
    { code: 'const id = "axillary-artery-1";' },
  ],
  invalid: [
    { code: 'const c = "p-[13px]";', errors: [{ messageId: 'raw' }] },
    { code: 'const c = "hover:bg-[#ffffff]";', errors: [{ messageId: 'raw' }] },
    { code: 'const c = "[color:red]";', errors: [{ messageId: 'raw' }] },
    { code: 'const style = { color: "#0e7c86" };', errors: [{ messageId: 'raw' }] },
    { code: 'const c = `w-[${n}px]`;', errors: [{ messageId: 'raw' }] },
    { code: 'const el = <div className="text-[18px]" />;', errors: [{ messageId: 'raw' }] },
    {
      code: 'const c = "data-[state=checked]:bg-[#0e7c86]";',
      errors: [{ messageId: 'raw' }],
    },
  ],
});

describe('findRawDesignValue', () => {
  it('names what it found', () => {
    expect(findRawDesignValue('#fff')).toBe('a hex colour');
    expect(findRawDesignValue('mt-[3px]')).toBe('a Tailwind arbitrary value');
    expect(findRawDesignValue('mt-4')).toBeNull();
    expect(findRawDesignValue('flex md:p-5')).toBe('a spacing or radius step not in the tokens');
    expect(findRawDesignValue('hover:rounded-2xl')).toBe(
      'a spacing or radius step not in the tokens',
    );
    expect(findRawDesignValue('h-8 w-14')).toBe('a spacing or radius step not in the tokens');
    expect(findRawDesignValue('-mx-0.5')).toBe('a spacing or radius step not in the tokens');
    expect(findRawDesignValue('min-h-dvh h-studio rounded-t-lg')).toBeNull();
  });
});
