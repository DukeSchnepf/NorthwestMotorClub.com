"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import timeline from "@/content/timeline.json";

type Milestone = {
  year: string;
  chapter: string;
  title: string;
  blurb: string;
  image?: string;
  imageTag?: string;
  placeholder?: boolean;
  restart?: boolean;
};

/**
 * Story Timeline — middle of Section 02 / Our Story.
 *
 * Horizontal "drive down a road" filmstrip of the club's milestones.
 * Renders one panel per entry in content/timeline.json, with a continuous
 * dashed road line at the bottom and a mile-marker dot beneath each panel.
 *
 * Motion: GSAP ScrollTrigger pins the section and converts the user's
 * vertical scroll into a horizontal translate of the track. Falls back to
 * native horizontal scroll when prefers-reduced-motion is set or on touch
 * devices (where the scroll-lock UX feels foreign).
 *
 * Editing content: add/remove/reorder entries in content/timeline.json.
 * Mark a year as `placeholder: true` to render the dashed "confirm copy"
 * style, or `restart: true` for the rust accent + pulsing marker.
 */
export default function StoryTimeline() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    root,
    (reduced) => {
      if (reduced) return;
      if (typeof window !== "undefined") {
        if (window.matchMedia("(hover: none)").matches) return; // touch
      }
      if (!root.current || !trackRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth;

      if (distance() <= 0) return;

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        animation: gsap.to(track, { x: () => -distance(), ease: "none" }),
        invalidateOnRefresh: true,
      });
    },
    [],
  );

  const milestones = timeline.milestones as Milestone[];

  return (
    <section
      ref={root}
      aria-label="Club timeline"
      className="relative h-screen overflow-hidden border-t border-line bg-base"
    >
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-end justify-between gap-4 px-6 pt-12 md:px-12 lg:px-16">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-lime">
            <span aria-hidden className="inline-block h-px w-7 bg-lime" />
            Timeline — drive through it
          </p>
          <h3 className="mt-3 font-display text-3xl font-normal leading-[1] tracking-[-0.02em] text-fg md:text-4xl lg:text-5xl">
            From the <span className="italic text-lime">first lot</span> to
            today&apos;s roster.
          </h3>
        </div>
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
          <span className="hidden md:inline">Scroll </span>↓ to drive →
        </div>
      </header>

      {/* The road — dashed lime line across the section. Sits in front of the
          panels but behind the mile markers. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-24 z-[3] h-[2px] bg-dim"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0, transparent 16px, var(--color-lime) 16px, var(--color-lime) 28px)",
          opacity: 0.4,
        }}
      />

      {/* Filmstrip track */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center pt-28 pb-16">
        <div
          ref={trackRef}
          className="flex h-full items-end gap-0 overflow-x-auto pb-10 md:overflow-visible"
          style={{ touchAction: "pan-y" }}
        >
          {milestones.map((m) => (
            <YearPanel key={m.year} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function YearPanel({ m }: { m: Milestone }) {
  const isRestart = !!m.restart;
  const isPlaceholder = !!m.placeholder;

  return (
    <article
      className="relative flex h-[clamp(420px,68vh,640px)] w-[78vw] min-w-[460px] max-w-[720px] shrink-0 flex-col px-5 first:pl-6 last:pr-6 md:px-7 lg:first:pl-16 lg:last:pr-16"
      aria-labelledby={`year-${m.year}`}
    >
      <div
        className={`flex h-full flex-col overflow-hidden rounded-md border ${
          isRestart
            ? "border-rust bg-gradient-to-b from-rust/[0.06] via-raised to-raised"
            : isPlaceholder
              ? "border-dashed border-line bg-transparent"
              : "border-line bg-raised"
        }`}
      >
        {/* Photo or placeholder */}
        {m.image && !isPlaceholder ? (
          <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
            <Image
              src={m.image}
              alt={`${m.year} — ${m.title}`}
              fill
              sizes="(max-width: 768px) 78vw, 720px"
              className="object-cover"
              style={{ filter: "saturate(0.9) contrast(1.05)" }}
            />
            {m.imageTag && (
              <span
                aria-hidden
                className={`absolute top-3 left-3 font-display italic text-base ${
                  isRestart ? "text-rust" : "text-lime"
                } drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] -rotate-[3deg]`}
              >
                — {m.imageTag}
              </span>
            )}
          </div>
        ) : (
          <div
            className="flex aspect-[16/9] items-center justify-center border-b border-line text-dim font-mono text-[0.65rem] uppercase tracking-[0.25em]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--color-surface) 0, var(--color-surface) 8px, transparent 8px, transparent 16px), linear-gradient(var(--color-raised), var(--color-raised))",
            }}
          >
            — photo TBA —
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-7">
          <div
            className={`font-mono text-[0.6rem] uppercase tracking-[0.3em] ${
              isRestart ? "text-rust" : isPlaceholder ? "text-dim" : "text-lime"
            }`}
          >
            — Chapter {m.chapter}
          </div>
          <div
            id={`year-${m.year}`}
            className={`font-display text-6xl font-normal leading-[0.85] tracking-[-0.06em] md:text-7xl ${
              isRestart
                ? "italic text-rust"
                : isPlaceholder
                  ? "text-dim"
                  : "text-fg"
            }`}
          >
            {m.year}
          </div>
          <h4
            className={`font-display text-2xl leading-tight tracking-[-0.02em] ${
              isPlaceholder ? "italic text-muted" : "text-fg"
            }`}
          >
            {m.title}
          </h4>
          <p
            className={`max-w-[50ch] font-display text-base leading-relaxed ${
              isPlaceholder ? "italic text-dim" : "text-fog"
            }`}
          >
            {m.blurb}
          </p>
          {isPlaceholder && (
            <span className="mt-1 inline-flex w-fit border border-dashed border-rust bg-rust/10 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-rust">
              ◯ Confirm copy
            </span>
          )}
          {isRestart && (
            <span className="mt-1 inline-flex w-fit border border-dashed border-lime bg-lime/10 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-lime">
              ◯ NOW · We&apos;re here
            </span>
          )}
        </div>
      </div>

      {/* Mile marker — sits on the road */}
      <span
        aria-hidden
        className={`absolute left-1/2 z-[4] -translate-x-1/2 rounded-full border-[3px] border-base ${
          isRestart
            ? "h-[18px] w-[18px] bg-rust shadow-[0_0_24px_rgba(255,122,26,0.7)]"
            : isPlaceholder
              ? "h-[14px] w-[14px] bg-surface border-line"
              : "h-[14px] w-[14px] bg-dim"
        }`}
        style={{ bottom: "calc(6rem - 7px)" }}
      />
    </article>
  );
}
