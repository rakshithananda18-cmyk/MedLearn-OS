// Components must take colours, spacing and sizes from the design tokens. This flags the two
// ways raw values sneak in through strings: hex colours and Tailwind arbitrary values such as
// `p-[13px]`, `bg-[#fff]` or `[color:red]`.
const HEX_COLOUR = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![0-9a-z])/i;
// A bracket followed by `:` is a state selector (e.g. `data-[state=checked]:`), not a value.
const ARBITRARY_VALUE = /(?:^|[\s:"'`])!?-?[a-z][\w-]*-\[[^\]\s]+\](?!:)/i;
const ARBITRARY_PROPERTY = /(?:^|[\s:"'`])\[[a-z-]+:[^\]\s]+\]/i;

// Tailwind silently generates nothing for a step that is not in tokens.css (`p-5`,
// `rounded-2xl`), so the element quietly loses its spacing or corners. Keep in step with the
// --spacing-* and --radius-* tokens.
const SPACING_STEPS = new Set(['0', '1', '2', '3', '4', '6', '8', '12', '16', '20', '24']);
const RADIUS_STEPS = new Set(['none', 'sm', 'md', 'lg', 'xl', 'full']);
const SPACING_UTILITIES = new Set(
  [
    'p px py pt pr pb pl m mx my mt mr mb ml gap gap-x gap-y space-x space-y',
    'size w h min-w min-h max-h inset inset-x inset-y top right bottom left',
    'translate-x translate-y',
  ]
    .join(' ')
    .split(' '),
);
// A utility and its step: `min-h-12` is ['min-h', '12'], `rounded-t-lg` is ['rounded-t', 'lg'].
const UTILITY_STEP = /^-?([a-z]+(?:-[a-z]+)?)-([\w.]+)$/;

function offScale(token) {
  // The utility itself, without variants (`md:`, `hover:`) or the important mark.
  const utility = token.slice(token.lastIndexOf(':') + 1).replace(/^!/, '');
  const [, name = '', step = ''] = UTILITY_STEP.exec(utility) ?? [];
  if (SPACING_UTILITIES.has(name) && /^[\d.]+$/.test(step)) return !SPACING_STEPS.has(step);
  if (name === 'rounded' || name.startsWith('rounded-')) return !RADIUS_STEPS.has(step);
  return false;
}

export function findRawDesignValue(text) {
  if (HEX_COLOUR.test(text)) return 'a hex colour';
  if (ARBITRARY_VALUE.test(text) || ARBITRARY_PROPERTY.test(text)) {
    return 'a Tailwind arbitrary value';
  }
  if (text.split(/\s+/).some(offScale)) return 'a spacing or radius step not in the tokens';
  return null;
}

/** @type {import('eslint').Rule.RuleModule} */
export const noRawDesignValues = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow hex colours and Tailwind arbitrary values; use design tokens.' },
    messages: {
      raw: 'Found {{kind}}. Use a design token (a Tailwind class from tokens.css) instead.',
    },
    schema: [],
  },
  create(context) {
    function check(node, text) {
      const kind = typeof text === 'string' ? findRawDesignValue(text) : null;
      if (kind) context.report({ node, messageId: 'raw', data: { kind } });
    }
    return {
      Literal: (node) => check(node, node.value),
      JSXText: (node) => check(node, node.value),
      // Checked whole, with a stand-in for each `${...}`, so `w-[${n}px]` is still caught.
      TemplateLiteral: (node) => check(node, node.quasis.map((q) => q.value.cooked).join('0')),
    };
  },
};
