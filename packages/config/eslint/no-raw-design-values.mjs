// Components must take colours, spacing and sizes from the design tokens. This flags the two
// ways raw values sneak in through strings: hex colours and Tailwind arbitrary values such as
// `p-[13px]`, `bg-[#fff]` or `[color:red]`.
const HEX_COLOUR = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![0-9a-z])/i;
// A bracket followed by `:` is a state selector (e.g. `data-[state=checked]:`), not a value.
const ARBITRARY_VALUE = /(?:^|[\s:"'`])!?-?[a-z][\w-]*-\[[^\]\s]+\](?!:)/i;
const ARBITRARY_PROPERTY = /(?:^|[\s:"'`])\[[a-z-]+:[^\]\s]+\]/i;

export function findRawDesignValue(text) {
  if (HEX_COLOUR.test(text)) return 'a hex colour';
  if (ARBITRARY_VALUE.test(text) || ARBITRARY_PROPERTY.test(text)) {
    return 'a Tailwind arbitrary value';
  }
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
