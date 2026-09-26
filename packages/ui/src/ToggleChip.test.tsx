import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ToggleChip } from './ToggleChip';

describe('ToggleChip', () => {
  it('announces whether it is on and reports taps', async () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <ToggleChip pressed={false} onClick={onClick}>
        Bones
      </ToggleChip>,
    );
    const chip = screen.getByRole('button', { name: 'Bones' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <ToggleChip pressed tone="danger">
        Bones
      </ToggleChip>,
    );
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(chip).toHaveClass('text-danger');
  });
});
