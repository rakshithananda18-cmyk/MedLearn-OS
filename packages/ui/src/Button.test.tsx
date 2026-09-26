import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button, buttonClasses } from './Button';
import { ArrowRight } from './icons';

describe('Button', () => {
  it('is a type="button" by default so it never submits forms by accident', () => {
    render(<Button>Start</Button>);
    expect(screen.getByRole('button', { name: 'Start' })).toHaveAttribute('type', 'button');
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Start</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('while loading: disabled, marked busy, and announces progress', () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole('button', { name: /Save/ });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('keeps icons decorative so the label is the accessible name', () => {
    render(<Button iconEnd={ArrowRight}>Next topic</Button>);
    expect(screen.getByRole('button', { name: 'Next topic' })).toBeInTheDocument();
  });

  it('shares its styles with links through buttonClasses', () => {
    expect(buttonClasses({ variant: 'danger', fullWidth: true })).toContain('bg-danger');
    expect(buttonClasses({ fullWidth: true })).toContain('w-full');
  });

  it('has no accessibility violations in any variant', async () => {
    const { container } = render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Delete</Button>
        <Button disabled>Disabled</Button>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
