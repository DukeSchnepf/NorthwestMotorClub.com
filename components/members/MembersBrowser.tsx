"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type MemberMeta } from "@/lib/members.shared";
import Reveal from "@/components/motion/Reveal";

const CHIPS = ["All", ...CATEGORIES] as const;

export default function MembersBrowser({
  members,
}: {
  members: MemberMeta[];
}) {
  const [active, setActive] = useState<(typeof CHIPS)[number]>("All");
  const shown = members.filter((m) =>
    active === "All" ? true : m.category === active,
  );

  return (
    <>
      <div
        className="mb-12 flex flex-wrap gap-3"
        role="tablist"
        aria-label="Filter rides by category"
      >
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
              active === c
                ? "border-lime bg-lime text-ink"
                : "border-line text-muted hover:border-fog hover:text-fg"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="font-mono text-sm text-muted">No rides in this class yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 0.07} as="article">
              <Link
                href={`/members/${m.slug}`}
                className="group block overflow-hidden border border-line bg-raised"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={m.cover}
                    alt={`${m.ymm} — ${m.handle}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-exit group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-base/80 px-4 py-3 font-mono text-xs uppercase tracking-wider text-lime opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    View build
                    <span aria-hidden>→</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {m.ymm}
                  </p>
                  <h3 className="font-display text-xl text-fg">{m.title}</h3>
                  <p className="font-mono text-xs text-dim">{m.handle}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
