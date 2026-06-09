"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { useMediaQuery } from "@/lib/useMediaQuery";
import HeroMarquee from "./HeroMarquee";
import HeadlightCursor from "./HeadlightCursor";
import NextBriefing from "./NextBriefing";
import AudioToggle from "./AudioToggle";

/**
 * Hero — Section 01 of the home page.
 *
 * Composition (front-to-back, increasing z-index):
 *   1  hero-poster.jpg (Next Image, priority — the LCP candidate)
 *   1  hero-loop.{webm,mp4} (autoplay/muted/loop, swapped in after mount)
 *   2  vignette gradient
 *   3  film grain (SVG fractal noise, mix-blend-overlay)
 *   4  CRT scan lines (very subtle)
 *   6  headlight beam (HeadlightCursor — follows mouse)
 *   7  main content (eyebrow + wordmark + tagline + CTAs + dispatch card)
 *   8  letterbox bars (top + bottom)
 *   9  marquee (top, just below the letterbox), audio toggle, scroll affordance
 *  30  custom cursor ring (HeadlightCursor)
 *
 * Reduced motion: the global `prefers-reduced-motion` rule in globals.css
 * already kills CSS animations + transitions. This component additionally
 * suppresses video autoplay so the user sees the static poster instead.
 * HeadlightCursor self-disables on reduced-motion + touch.
 */
export default function Hero() {
  // Treated as reduced until the browser says otherwise, so SSR + the
  // hydration pass render only the poster and the video mounts after.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const showVideo = !reducedMotion;
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* LCP poster — also the reduced-motion fallback */}
      <Image
        src="/media/hero/hero-poster.jpg"
        alt="The Northwest Motor Club fleet arced across a Bellevue parking-garage rooftop under Pacific Northwest overcast"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero/hero-poster.jpg"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 z-[1] size-full object-cover transition-opacity duration-700 ease-entrance ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/media/hero/hero-loop.webm" type="video/webm" />
          <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Vignette — top + bottom + soft radial darkening */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(10,14,12,0.55) 100%), linear-gradient(180deg, rgba(10,14,12,0.7) 0%, transparent 35%, transparent 60%, rgba(10,14,12,0.95) 100%)",
        }}
      />

      {/* Film grain (SVG fractal noise, mix-blend-overlay) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      {/* Subtle CRT scan lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Letterbox bars — cinema framing */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-[38px] bg-base"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[38px] bg-base"
      />

      {/* Top marquee — data crawl from lib/site.ts */}
      <HeroMarquee />

      {/* Headlight cursor — disabled on reduced-motion & touch */}
      <HeadlightCursor />

      {/* Main content grid */}
      <div className="relative z-[7] mx-auto grid w-full max-w-content grid-cols-1 items-center gap-10 px-6 pb-20 pt-[100px] md:grid-cols-[1fr_360px] md:px-12 lg:gap-12 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-moss">
            {site.region} · Est. {site.establishedYear}
          </p>
          <img
            src={site.logo.wordmark}
            alt={site.name}
            className="block h-auto w-full max-w-[880px] mix-blend-screen drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          />
          <p className="mt-6 font-display text-xl italic text-fog md:text-2xl">
            {site.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="rounded-full bg-moss px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
            >
              Join the Club
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-fog/60 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.18em] text-fg transition-colors duration-200 ease-exit hover:border-moss hover:text-moss"
            >
              Upcoming Drives
            </Link>
          </div>
        </div>

        {/* Dispatch card */}
        <NextBriefing />
      </div>

      {/* Audio toggle — bottom-left */}
      <div className="absolute bottom-14 left-6 z-[9] md:left-12 lg:left-16">
        <AudioToggle />
      </div>

      {/* Scroll affordance — bottom-center */}
      <div className="absolute bottom-14 left-1/2 z-[9] flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="hero-scroll-line h-12 w-px bg-gradient-to-b from-moss to-transparent" />
      </div>
    </section>
  );
}
