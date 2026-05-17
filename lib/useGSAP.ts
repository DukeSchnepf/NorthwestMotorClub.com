"use client";

import { useEffect, type RefObject, type DependencyList } from "react";
import gsap from "gsap";

/**
 * Runs a GSAP setup callback inside a scoped gsap.context (auto-cleanup on
 * unmount, incl. ScrollTriggers created within). The callback receives
 * whether prefers-reduced-motion is active so it can opt out of animation.
 */
export function useGSAP(
  scope: RefObject<HTMLElement | null>,
  cb: (reduced: boolean) => void,
  deps: DependencyList,
) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = gsap.context(() => cb(reduced), scope.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
