import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles from its label and reports a boolean', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Remind me daily" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox', { name: 'Remind me daily' });

    await userEvent.click(screen.getByText('Remind me daily'));
    expect(box).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);

    await userEvent.click(box);
    expect(box).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it('toggles with the keyboard', async () => {
    render(<Checkbox label="Hindi explanations" />);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('checkbox', { name: 'Hindi explanations' })).toBeChecked();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Remind me daily" defaultChecked />);
    await expectNoA11yViolations(container);
  });
});
