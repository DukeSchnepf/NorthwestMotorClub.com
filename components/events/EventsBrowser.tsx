"use client";

import { useState } from "react";
import type { EventMeta } from "@/lib/events";
import EventCard from "@/components/home/EventCard";
import Reveal from "@/components/motion/Reveal";

type Filter = "all" | "upcoming" | "past";
const FILTERS: Filter[] = ["all", "upcoming", "past"];

export default function EventsBrowser({ events }: { events: EventMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = events.filter((e) =>
    filter === "all" ? true : e.status === filter,
  );

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-3" role="tablist" aria-label="Filter events">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
              filter === f
                ? "border-moss bg-moss text-ink"
                : "border-line text-muted hover:border-fog hover:text-fg"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="font-mono text-sm text-muted">
          Nothing here yet — follow the club for the drop.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((event, i) => (
            <Reveal key={event.slug} delay={(i % 3) * 0.07} as="article">
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
