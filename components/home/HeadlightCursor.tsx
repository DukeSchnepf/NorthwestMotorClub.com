"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Moss "headlight" beam + custom cursor ring that follow the mouse over the
 * parent element. Designed for the Hero section — mounts inside it, listens
 * to the parent's pointer events, and disables itself on touch devices or
 * when prefers-reduced-motion is set.
 *
 * Positioning: both elements are absolutely positioned relative to the
 * parent. The parent should be `position: relative`.
 *
 * On enter/leave we hide the native cursor on the parent so the moss ring
 * is the only visible pointer; on leave we restore it so other sections
 * behave normally.
 */
export default function HeadlightCursor() {
  const beamRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const touch = useMediaQuery("(hover: none)", true);
  const enabled = !reducedMotion && !touch;

  // Runs once `enabled` flips true — by then the beam/ring divs are in the
  // DOM, so the parent lookup below resolves.
  useEffect(() => {
    if (!enabled) return;

    // The parent element controls our coordinate space.
    const parent = beamRef.current?.parentElement;
    if (!parent) return;

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let rafId = 0;
    let visible = false;

    const setVisibility = (v: boolean) => {
      visible = v;
      if (beamRef.current) beamRef.current.style.opacity = v ? "1" : "0";
      if (ringRef.current) ringRef.current.style.opacity = v ? "1" : "0";
    };

    function onEnter() {
      parent!.style.cursor = "none";
      setVisibility(true);
      if (!rafId) tick();
    }
    function onLeave() {
      parent!.style.cursor = "";
      setVisibility(false);
    }
    function onMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    }
    function tick() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (beamRef.current) {
        beamRef.current.style.left = `${cx}px`;
        beamRef.current.style.top = `${cy}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${mx}px`;
        ringRef.current.style.top = `${my}px`;
      }
      if (visible) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    }

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    parent.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      parent.removeEventListener("mousemove", onMove);
      parent.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={beamRef}
        aria-hidden
        className="pointer-events-none absolute z-[6] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen transition-opacity duration-200"
        style={{
          background:
            "radial-gradient(circle at center, rgba(167,201,87,0.22) 0%, rgba(167,201,87,0.08) 30%, transparent 65%)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none absolute z-[30] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-moss opacity-0 shadow-[0_0_14px_rgba(167,201,87,0.4)] transition-opacity duration-150"
      >
        <div className="absolute inset-[11px] rounded-full bg-moss" />
      </div>
    </>
  );
}
