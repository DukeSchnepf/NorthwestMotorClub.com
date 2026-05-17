"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { EventMeta } from "@/lib/events";

function badge(iso: string) {
  const d = new Date(iso);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.toLocaleDateString("en-US", { day: "numeric" }),
  };
}

export default function EventCard({ event }: { event: EventMeta }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-14, 14]);
  const { month, day } = badge(event.date);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative block overflow-hidden border border-line bg-raised"
    >
      <span className="absolute left-0 top-0 z-20 h-full w-px origin-top scale-y-0 bg-lime transition-transform duration-300 ease-exit group-hover:scale-y-100" />

      <div ref={ref} className="relative aspect-[16/10] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-[-7%]">
          <Image
            src={event.cover}
            alt={`${event.title} — ${event.location}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-exit group-hover:scale-[1.04]"
          />
        </motion.div>
        <span className="absolute left-4 top-4 z-10 flex flex-col items-center bg-base/85 px-3 py-2 font-mono text-xs leading-tight text-lime backdrop-blur-sm">
          <span className="tracking-[0.2em]">{month}</span>
          <span className="text-base text-fg">{day}</span>
        </span>
      </div>

      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-display text-xl text-fg">{event.title}</h3>
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {event.location}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{event.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          ~{event.attendees} expected
          <span
            aria-hidden
            className="text-lime transition-transform duration-200 ease-exit group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
