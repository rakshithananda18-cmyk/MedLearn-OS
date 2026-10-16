import { cx } from '@medlearn/ui';
import { type ReactNode, useState } from 'react';

/**
 * The part of a fold that opens and shuts (the fold utility's slide). Its contents are rendered
 * only once it has first been opened, so a long list of closed folds (every region and book
 * section) costs the page nothing; after that they stay, so closing still slides smoothly.
 */
export function FoldBody({
  open,
  id,
  children,
}: Readonly<{ open: boolean; id?: string; children: ReactNode }>) {
  const [opened, setOpened] = useState(open);
  if (open && !opened) setOpened(true);
  return (
    <div id={id} className={cx('fold motion-reduce:transition-none', open && 'fold-open')}>
      <div className="min-h-0 overflow-hidden" inert={!open}>
        {opened ? children : null}
      </div>
    </div>
  );
}
