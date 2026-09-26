import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('is a labelled switch that toggles', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Download lessons for offline" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch', { name: 'Download lessons for offline' });

    expect(control).not.toBeChecked();
    await userEvent.click(control);
    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch label="Download lessons for offline" defaultChecked />);
    await expectNoA11yViolations(container);
  });
});
