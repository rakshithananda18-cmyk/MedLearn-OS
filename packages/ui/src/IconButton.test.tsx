import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { IconButton } from './IconButton';
import { Search } from './icons';

describe('IconButton', () => {
  it('uses the label as its accessible name', () => {
    render(<IconButton icon={Search} label="Search topics" />);
    expect(screen.getByRole('button', { name: 'Search topics' })).toBeInTheDocument();
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<IconButton icon={Search} label="Search" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('meets the 48px touch target at the default size', () => {
    render(<IconButton icon={Search} label="Search" />);
    expect(screen.getByRole('button')).toHaveClass('size-12');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<IconButton icon={Search} label="Search" variant="secondary" />);
    await expectNoA11yViolations(container);
  });
});
