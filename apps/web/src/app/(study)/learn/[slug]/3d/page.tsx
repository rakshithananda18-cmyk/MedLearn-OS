import { redirect } from 'next/navigation';

interface Props {
  readonly params: Promise<{ slug: string }>;
}

/** Every topic's 3D view lives in the 3D studio now. */
export default async function Explore3DPage({ params }: Props) {
  redirect(`/studio?topic=${encodeURIComponent((await params).slug)}`);
}
