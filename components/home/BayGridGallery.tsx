"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type MemberMeta } from "@/lib/members.shared";

const CHIPS = ["All", ...CATEGORIES] as const;
type Chip = (typeof CHIPS)[number];

/**
 * Client island for the Bay Grid — filter chips + the grid itself.
 * Receives the sorted member list from the BayGrid server component;
 * chips filter by category entirely client-side (same pattern as
 * MembersBrowser on /members).
 */
export default function BayGridGallery({
  members,
  open,
  occupied,
}: {
  members: MemberMeta[];
  open: number;
  occupied: number;
}) {
  const [active, setActive] = useState<Chip>("All");
  const shown = members.filter((m) =>
    active === "All" ? true : m.category === active,
  );

  return (
    <>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter bays by category"
      >
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={`inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
              active === c
                ? "border-moss bg-moss text-ink"
                : "border-line text-muted hover:border-muted hover:text-fg"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Bay grid — 1col mobile, 2col md, 4col lg. Featured bay spans 2×2 on lg+. */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {shown.map((m) =>
          m.featured ? (
            <FeaturedBay key={m.slug} m={m} />
          ) : (
            <RegularBay key={m.slug} m={m} />
          ),
        )}
        {shown.length === 0 && (
          <p className="col-span-full py-6 font-mono text-sm text-muted">
            No builds in this class yet — the bay&apos;s open.
          </p>
        )}
        {open > 0 && active === "All" && <EmptyBay number={occupied + 1} />}
        <SeeAllCard />
      </div>
    </>
  );
}

// -- Pieces --------------------------------------------------------------

function FeaturedBay({ m }: { m: MemberMeta }) {
  return (
    <Link
      href={`/members/${m.slug}`}
      className="group relative col-span-1 row-span-1 overflow-hidden rounded-md border border-line bg-raised transition-all duration-300 hover:-translate-y-1 hover:border-moss md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
        <Image
          src={m.cover}
          alt={`${m.title} — ${m.ymm}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-exit group-hover:scale-105"
          style={{ filter: "saturate(0.95) contrast(1.05)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/35 to-transparent"
        />

        <span className="absolute left-4 top-4 inline-flex font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink">
          <span className="bg-cedar px-2 py-1">
            Bay {(m.bayNumber ?? "—").toString().padStart(2, "0")} ★ Featured
          </span>
        </span>

        <span className="absolute right-4 top-4 inline-flex rounded-sm bg-base/70 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-moss">
          {m.category}
        </span>

        {m.pull && (
          <blockquote className="absolute left-6 right-6 bottom-24 max-w-[36ch] font-display text-2xl italic leading-snug text-fg drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-3xl">
            <span className="text-moss">&ldquo;</span>
            {m.pull}
            <span className="text-moss">&rdquo;</span>
          </blockquote>
        )}

        <div className="absolute left-6 right-6 bottom-5 text-fg">
          <div className="font-display text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
            {m.title}
          </div>
          <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fog">
            {m.ymm}
          </div>
          <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
            {m.handle} · {m.location}
          </div>
        </div>
      </div>
    </Link>
  );
}

function RegularBay({ m }: { m: MemberMeta }) {
  return (
    <Link
      href={`/members/${m.slug}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-raised transition-all duration-300 hover:-translate-y-1 hover:border-moss"
    >
      <Image
        src={m.cover}
        alt={`${m.title} — ${m.ymm}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-exit group-hover:scale-105"
        style={{ filter: "saturate(0.95) contrast(1.05)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/25 to-transparent"
      />

      <span className="absolute left-3 top-3 inline-flex bg-base/85 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-fog">
        Bay {(m.bayNumber ?? "—").toString().padStart(2, "0")}
      </span>

      <span className="absolute right-3 top-3 inline-flex rounded-sm bg-base/70 px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.25em] text-moss">
        {m.category}
      </span>

      <div className="absolute left-3 right-3 bottom-3 text-fg">
        <div className="font-display text-lg leading-tight tracking-[-0.01em]">
          {m.title}
        </div>
        <div className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-fog">
          {m.ymm}
        </div>
        <div className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">
          {m.handle} · {m.location}
        </div>
      </div>
    </Link>
  );
}

function EmptyBay({ number }: { number: number }) {
  return (
    <Link
      href="/join"
      className="group relative flex aspect-[4/3] flex-col items-center justify-center rounded-md border border-dashed border-line bg-raised text-center transition-colors duration-300 hover:border-moss hover:bg-moss/[0.04]"
    >
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-dim">
        Bay {number.toString().padStart(2, "0")}
      </span>
      <span className="mt-3 font-display text-2xl tracking-[-0.01em] text-muted group-hover:text-fg">
        Open
      </span>
      <span className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-moss">
        Join the club →
      </span>
    </Link>
  );
}

function SeeAllCard() {
  return (
    <Link
      href="/members"
      className="group relative flex aspect-[4/3] items-center justify-center rounded-md border border-line bg-surface text-center transition-colors duration-300 hover:border-moss"
    >
      <div>
        <div className="font-display text-xl leading-tight tracking-[-0.01em] text-fg md:text-2xl">
          See the full roster →
        </div>
        <div className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-moss">
          /members
        </div>
        <div className="mt-2 font-mono text-[0.5rem] uppercase tracking-[0.25em] text-dim">
          All bays · all members
        </div>
      </div>
    </Link>
  );
}
