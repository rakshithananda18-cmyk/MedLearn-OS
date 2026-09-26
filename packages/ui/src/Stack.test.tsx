import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stack } from './Stack';

describe('Stack', () => {
  it('stacks in a column with the default gap', () => {
    const { container } = render(<Stack>content</Stack>);
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'gap-4');
  });

  it('supports rows, alignment, wrapping and semantic elements', () => {
    const { container } = render(
      <Stack as="ul" direction="row" gap={2} align="center" justify="between" wrap>
        <li>a</li>
      </Stack>,
    );
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('UL');
    expect(element).toHaveClass(
      'flex-row',
      'gap-2',
      'items-center',
      'justify-between',
      'flex-wrap',
    );
  });
});
