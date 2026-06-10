"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reactive media-query hook. Returns whether `query` currently matches and
 * re-renders on change (e.g. the user toggles reduced motion, or rotates a
 * device across a breakpoint).
 *
 * `serverFallback` is what SSR + the hydration pass report before the
 * browser value is known. Pass `true` for queries like
 * `(prefers-reduced-motion: reduce)` where the conservative default is
 * "treat it as matching until proven otherwise".
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}
