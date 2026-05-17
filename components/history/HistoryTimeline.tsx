"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  blurb: string;
  image: string;
};

const FuelPumpScene = dynamic(
  () => import("@/components/history/FuelPumpScene"),
  { ssr: false },
);

export default function HistoryTimeline({
  milestones,
}: {
  milestones: Milestone[];
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  // Mount the 3D scene only while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll progress → 3D rotation + active milestone (rAF-throttled).
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, -r.top / (r.height - window.innerHeight || 1)),
        );
        progress.current = p;
        setActive(
          Math.min(milestones.length - 1, Math.floor(p * milestones.length)),
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce, milestones.length]);

  const show3D = !reduce && inView;

  return (
    <div
      ref={sectionRef}
      className="mx-auto grid max-w-content gap-12 px-6 md:grid-cols-2 md:px-16"
    >
      {/* Left — scrolling milestones */}
      <ol className="flex flex-col">
        {milestones.map((m, i) => (
          <li
            key={m.year}
            className="flex min-h-[70vh] flex-col justify-center border-b border-line py-16"
          >
            <p
              className={`font-display text-5xl transition-colors duration-300 max-md:text-4xl ${
                i === active ? "text-lime" : "text-dim"
              }`}
            >
              {m.year}
            </p>
            <h3 className="mt-3 font-display text-2xl text-fg">{m.title}</h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {m.blurb}
            </p>
            {/* Mobile-only inline photo (no pinning on small screens) */}
            <div className="relative mt-6 aspect-[4/3] overflow-hidden border border-line md:hidden">
              <Image
                src={m.image}
                alt={`${m.year} — ${m.title}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ol>

      {/* Right — pinned panel (sticky), desktop only */}
      <div className="hidden md:block">
        <div className="relative sticky top-32 h-[70vh] overflow-hidden border border-line bg-raised">
          {show3D ? (
            <FuelPumpScene progress={progress} />
          ) : (
            <Image
              src={milestones[active]?.image ?? milestones[0].image}
              alt={`${milestones[active]?.year} — ${milestones[active]?.title}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          )}
          <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.2em] text-lime">
            {milestones[active]?.year} · {milestones[active]?.title}
          </p>
        </div>
      </div>
    </div>
  );
}
