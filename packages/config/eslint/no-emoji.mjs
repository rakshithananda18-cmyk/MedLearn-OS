import { findEmoji } from '../emoji.mjs';

/** @type {import('eslint').Rule.RuleModule} */
export const noEmoji = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow emoji characters; use outlined SVG icons instead.' },
    messages: {
      emoji: 'Emoji "{{char}}" is not allowed. Use an outlined SVG icon instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      Program() {
        const { sourceCode } = context;
        for (const { char, index } of findEmoji(sourceCode.text)) {
          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'emoji',
            data: { char },
          });
        }
      },
    };
  },
};
