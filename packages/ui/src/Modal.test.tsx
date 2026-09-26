import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';
import { BottomSheet, Dialog, ModalClose } from './Modal';

describe.each([
  ['Dialog', Dialog],
  ['BottomSheet', BottomSheet],
])('%s', (_name, Component) => {
  function renderModal() {
    return render(
      <Component
        title="Report an issue"
        description="Tell us what looks wrong."
        trigger={<Button>Report</Button>}
        footer={
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
        }
      >
        <p>Form goes here</p>
      </Component>,
    );
  }

  it('opens from its trigger as a labelled, described dialog', async () => {
    renderModal();
    await userEvent.click(screen.getByRole('button', { name: 'Report' }));
    const dialog = screen.getByRole('dialog', { name: 'Report an issue' });
    expect(dialog).toHaveAccessibleDescription('Tell us what looks wrong.');
    expect(screen.getByText('Form goes here')).toBeInTheDocument();
  });

  it('closes with the close button, a footer action, or Escape', async () => {
    renderModal();
    const trigger = screen.getByRole('button', { name: 'Report' });

    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no accessibility violations when open', async () => {
    renderModal();
    await userEvent.click(screen.getByRole('button', { name: 'Report' }));
    await expectNoA11yViolations(document.body);
  });
});
