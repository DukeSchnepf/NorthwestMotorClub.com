"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { manifestoLines, manifestoBody } from "@/lib/site";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    root,
    (reduced) => {
      if (reduced) return; // lines are visible by default
      gsap.registerPlugin(ScrollTrigger);
      const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line");
      gsap.set(lines, { opacity: 0.12 });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.6,
        animation: gsap.timeline().to(lines, {
          opacity: 1,
          stagger: 0.5,
          ease: "none",
        }),
      });
    },
    [],
  );

  return (
    <section
      ref={root}
      id="mission"
      className="flex min-h-screen items-center bg-base px-6 md:px-16"
      aria-label="Mission"
    >
      <div className="mx-auto max-w-content">
        <p className="mb-10 font-mono text-sm uppercase tracking-[0.25em] text-lime">
          The Manifesto
        </p>
        <div className="flex flex-col gap-2">
          {manifestoLines.map((line, i) => (
            <p
              key={i}
              className="manifesto-line font-display text-4xl leading-tight text-fg max-md:text-2xl"
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted">
          {manifestoBody}
        </p>
      </div>
    </section>
  );
}
