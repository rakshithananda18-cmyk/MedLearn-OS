import { Banner } from '@medlearn/ui';

/** Required on every screen that shows content a medical reviewer has not approved yet. */
export function SampleContentBanner({ reviewed }: { reviewed: boolean }) {
  if (reviewed) return null;
  return (
    <Banner tone="warning" title="Sample content, not medically reviewed">
      Shown for the prototype only.
    </Banner>
  );
}
