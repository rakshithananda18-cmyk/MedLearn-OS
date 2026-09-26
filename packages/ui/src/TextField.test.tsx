import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { TextField } from './TextField';

describe('TextField', () => {
  it('is labelled and accepts input', async () => {
    render(<TextField label="College" />);
    const input = screen.getByRole('textbox', { name: 'College' });
    await userEvent.type(input, 'KMC Manipal');
    expect(input).toHaveValue('KMC Manipal');
  });

  it('reads out the hint with the field', () => {
    render(<TextField label="Daily study time" hint="Minutes you can study on a normal day" />);
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      'Minutes you can study on a normal day',
    );
  });

  it('marks the field invalid and reads out the error', () => {
    render(<TextField label="Exam date" hint="DD/MM/YYYY" error="Enter a future date" />);
    const input = screen.getByRole('textbox', { name: 'Exam date' });
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('DD/MM/YYYY Enter a future date');
  });

  it('shows a visual required marker without changing the accessible name', () => {
    render(<TextField label="Name" required />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired();
  });

  it('has no accessibility violations, including in the error state', async () => {
    const { container } = render(
      <>
        <TextField label="College" hint="As on your ID card" />
        <TextField label="Exam date" error="Enter a future date" />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});
