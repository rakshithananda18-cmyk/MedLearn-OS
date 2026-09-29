import { useSyncExternalStore } from 'react';

/** A hook for one media query: false on the server, then the browser's answer, kept current. */
export function mediaQuery(query: string) {
  const subscribe = (listener: () => void) => {
    const list = matchMedia(query);
    list.addEventListener('change', listener);
    return () => list.removeEventListener('change', listener);
  };
  const matches = () => matchMedia(query).matches;
  return function useQuery(): boolean {
    return useSyncExternalStore(subscribe, matches, () => false);
  };
}

/** Tablets held sideways and laptops (the xl breakpoint): room for side-by-side panels. */
export const useWide = mediaQuery('(min-width: 64rem)');

const noSubscription = () => () => {};

/** False during the server render and hydration, then true: for what only the browser knows. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
}
