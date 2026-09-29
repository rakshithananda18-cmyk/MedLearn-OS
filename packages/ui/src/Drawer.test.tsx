import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { Drawer } from './Drawer';

function Harness() {
  const [open, setOpen] = useState(true);
  return (
    <Drawer title="Brachial plexus" open={open} onOpenChange={setOpen}>
      <p>Roots, trunks, divisions, cords and branches.</p>
    </Drawer>
  );
}

describe('Drawer', () => {
  it('opens as a named dialog and closes on Escape', async () => {
    render(<Harness />);
    const drawer = screen.getByRole('dialog', { name: 'Brachial plexus' });
    expect(drawer).toHaveTextContent('Roots, trunks');
    await expectNoA11yViolations(document.body);

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
