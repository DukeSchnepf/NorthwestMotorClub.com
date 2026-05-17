"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Grain from "@/components/ui/Grain";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShowVideo(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* Poster — LCP image + reduced-motion fallback */}
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
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero/hero-poster.jpg"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/media/hero/hero-loop.webm" type="video/webm" />
          <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Vignette — top + bottom for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-b from-base/55 via-base/25 to-base"
      />
      <Grain opacity={0.08} />

      {/* Content */}
      <div className="relative z-20 mx-auto flex max-w-content flex-col items-center px-6 text-center">
        <p className="mb-6 font-mono text-sm uppercase tracking-[0.35em] text-lime">
          {site.region} · Est. {site.establishedYear}
        </p>
        <h1 className="font-display text-5xl leading-[0.95] text-fg max-md:text-4xl max-sm:text-3xl">
          Northwest
          <br />
          Motor Club
        </h1>
        <p className="mt-5 text-xl text-muted max-sm:text-lg">
          {site.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#join"
            className="rounded-full bg-lime px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
          >
            Join the Club
          </Link>
          <Link
            href="/#events"
            className="rounded-full border border-fog/60 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.15em] text-fg transition-colors duration-200 ease-exit hover:border-lime hover:text-lime"
          >
            Upcoming Drives
          </Link>
        </div>
      </div>

      {/* Scroll affordance */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="hero-scroll-line h-12 w-px bg-gradient-to-b from-lime to-transparent" />
      </div>
    </section>
  );
}
