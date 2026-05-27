"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nwmc:audio";

/**
 * Audio toggle for the hero ambient bed.
 *
 * Phase B (now): visual + state only. Persists user choice in localStorage
 * so refreshes don't reset preference, and exposes a clear UI affordance.
 *
 * Phase E (later): swap the no-op `play()` / `stop()` for Howler.js loading
 * a license-cleared engine-hum + rain ambient loop. The UI contract here
 * won't change — only the body of the play/stop handlers.
 *
 * Default state is MUTED. We do NOT autoplay sound; users explicitly opt in.
 */
export default function AudioToggle() {
  // null until hydrated from localStorage to avoid an SSR / client flash.
  const [playing, setPlaying] = useState<boolean | null>(null);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    setPlaying(saved === "on");
  }, []);

  function toggle() {
    setPlaying((p) => {
      const next = !p;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        // localStorage can throw in private windows — non-critical.
      }
      // PHASE E TODO: when audio source is added, call howlerInstance.play() /
      // howlerInstance.stop() here based on `next`.
      return next;
    });
  }

  // Pre-hydration: render an invisible placeholder so layout doesn't shift.
  if (playing === null) {
    return (
      <span
        aria-hidden
        className="inline-flex h-6 items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-transparent"
      >
        — — — — — —
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute ambient audio" : "Play ambient audio"}
      className="group flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted transition-colors duration-200 hover:text-lime"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current font-sans text-[0.75rem] leading-none">
        {playing ? "♪" : "◯"}
      </span>
      <span>Engine + Rain · {playing ? "Playing" : "Muted"}</span>
    </button>
  );
}
