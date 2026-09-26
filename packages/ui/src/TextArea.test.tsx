import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('is labelled, described by its hint and accepts text', async () => {
    render(<TextArea label="Details" hint="Which step?" />);
    const field = screen.getByRole('textbox', { name: 'Details' });
    expect(field).toHaveAccessibleDescription('Which step?');
    await userEvent.type(field, 'Step 3');
    expect(field).toHaveValue('Step 3');
  });
});
