import manifest from './review-assets.json';

/** Server-side content boundary: the bytes of a replaced file always give it a new cache key. */
export function assetUrl(src: string, digests: Record<string, string> = manifest): string {
  if (!src.startsWith('/') || src.startsWith('//')) return src;
  const url = new URL(src, 'https://assets.medlearn.invalid');
  const digest = digests[url.pathname];
  if (!digest) throw new Error(`Content asset is missing from the manifest: ${url.pathname}`);
  url.searchParams.set('h', digest);
  return `${url.pathname}${url.search}${url.hash}`;
}
