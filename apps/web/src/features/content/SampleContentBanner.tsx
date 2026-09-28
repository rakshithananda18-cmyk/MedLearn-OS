import { Icon } from '@medlearn/ui';
import { TriangleAlert } from '@medlearn/ui/icons';

/** Required on every screen that shows content a medical reviewer has not approved yet. */
export function SampleContentBanner({ reviewed }: { reviewed: boolean }) {
  if (reviewed) return null;
  return (
    <p
      role="status"
      className="inline-flex min-h-8 items-center gap-2 rounded-full bg-warning-subtle px-3 text-sm font-semibold text-warning"
    >
      <Icon icon={TriangleAlert} size="sm" />
      Sample content, not medically reviewed
    </p>
  );
}
