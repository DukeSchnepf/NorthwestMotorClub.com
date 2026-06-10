"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "nwmc:audio";
const CHANGE_EVENT = "nwmc:audio-change";

// In-memory mirror so the toggle still works when localStorage is
// unavailable (private windows); persistence is best-effort.
let memoryValue: boolean | null = null;

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): boolean {
  if (memoryValue !== null) return memoryValue;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function setStored(next: boolean) {
  memoryValue = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // localStorage can throw in private windows — non-critical.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Audio toggle for the hero ambient bed.
 *
 * Phase B (now): visual + state only. Persists user choice in localStorage
 * so refreshes don't reset preference, and exposes a clear UI affordance.
 *
 * Phase E (later): swap the no-op in `toggle()` for Howler.js loading a
 * license-cleared engine-hum + rain ambient loop. The UI contract here
 * won't change — only the body of the toggle handler.
 *
 * Default state is MUTED. We do NOT autoplay sound; users explicitly opt in.
 */
export default function AudioToggle() {
  // SSR/hydration renders "muted"; flips post-hydration for opted-in users.
  const playing = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggle() {
    setStored(!playing);
    // PHASE E TODO: when audio source is added, call howlerInstance.play() /
    // howlerInstance.stop() here based on the new value.
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute ambient audio" : "Play ambient audio"}
      className="group flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted transition-colors duration-200 hover:text-moss"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current font-sans text-[0.75rem] leading-none">
        {playing ? "♪" : "◯"}
      </span>
      <span>Engine + Rain · {playing ? "Playing" : "Muted"}</span>
    </button>
  );
}
