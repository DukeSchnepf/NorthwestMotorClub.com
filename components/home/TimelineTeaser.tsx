"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import timeline from "@/content/timeline.json";

export default function TimelineTeaser() {
  return (
    <section
      id="timeline"
      className="scroll-mt-28 overflow-hidden bg-base px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-12 flex items-end justify-between gap-6">
          <SectionHeading supertitle="Since the first lot" title="History" />
          <Link
            href="/#timeline"
            className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-lime transition-colors duration-200 hover:text-fg sm:inline"
          >
            Explore our history →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-content">
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:thin]">
          {timeline.milestones.map((m) => (
            <li
              key={m.year}
              className="group w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-line">
                <Image
                  src={m.image}
                  alt={`${m.year} — ${m.title}`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 26vw"
                  className="object-cover transition-transform duration-700 ease-exit group-hover:scale-105"
                />
              </div>
              <p className="mt-5 font-display text-4xl text-lime max-md:text-3xl">
                {m.year}
              </p>
              <p className="mt-1 font-display text-xl text-fg">{m.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {m.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
