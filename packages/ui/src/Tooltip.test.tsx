import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { IconButton } from './IconButton';
import { FileText } from './icons';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('appears when its trigger receives keyboard focus', async () => {
    render(
      <Tooltip content="Where this fact comes from">
        <IconButton icon={FileText} label="Source" />
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Source' })).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Where this fact comes from');
  });
});
