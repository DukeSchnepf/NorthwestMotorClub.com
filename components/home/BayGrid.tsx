import Image from "next/image";
import Link from "next/link";
import { getMembers } from "@/lib/members";
import { CATEGORIES, type MemberMeta } from "@/lib/members.shared";

const ROSTER_CAP = 12;

/**
 * Bay Grid — Section 03 of the home page. Replaces the legacy
 * FeaturedBuild component with a grid of every member as a numbered "bay"
 * in The Garage.
 *
 * Data source: content/members/*.mdx loaded server-side via getMembers().
 * Sort order: featured first → by bayNumber ascending → by name.
 *
 * Content workflow:
 *   - Add a member: drop an MDX into content/members/ with frontmatter
 *     including `bayNumber`. They appear automatically.
 *   - Feature someone: set `featured: true` in their MDX (exactly one
 *     should be true at a time). The featured bay spans 2×2 with the
 *     rust accent and renders the `pull` quote prominently.
 *   - Empty bays + the "See the full roster" tile auto-render at the end.
 *
 * Filter chips are static for now (visual rhythm). A future client-island
 * version can wire them to filter by category — see TODO in FilterChips.
 */
export default function BayGrid() {
  const members = getMembers();

  const sorted = [...members].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    const an = a.bayNumber ?? 999;
    const bn = b.bayNumber ?? 999;
    if (an !== bn) return an - bn;
    return a.name.localeCompare(b.name);
  });

  const occupied = sorted.length;
  const open = Math.max(0, ROSTER_CAP - occupied);

  return (
    <section
      id="bays"
      aria-label="The fleet"
      className="relative border-t border-line bg-base px-6 py-24 md:px-12 md:py-28 lg:px-16"
    >
      {/* Subtle warm tint to break up green-near-black between sections. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(255,122,26,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-content">
        {/* Header */}
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-lime">
              <span aria-hidden className="inline-block h-px w-7 bg-lime" />
              Section 03 / The Fleet
            </p>
            <h2 className="mt-3 font-display text-5xl font-normal leading-[0.92] tracking-[-0.03em] text-fg md:text-6xl lg:text-7xl">
              The <span className="italic text-lime">Bays</span>.
            </h2>
          </div>
          <div className="text-right font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
            <div className="font-display text-4xl font-normal leading-none tracking-[-0.02em] text-fg">
              {occupied.toString().padStart(2, "0")}
              <span className="text-xl text-dim"> / {ROSTER_CAP}</span>
            </div>
            <div className="mt-2">
              bays occupied · {open} open
            </div>
          </div>
        </header>

        <FilterChips />

        {/* Bay grid — 1col mobile, 2col md, 4col lg. Featured bay spans 2×2 on lg+. */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {sorted.map((m) =>
            m.featured ? (
              <FeaturedBay key={m.slug} m={m} />
            ) : (
              <RegularBay key={m.slug} m={m} />
            ),
          )}
          {open > 0 && <EmptyBay number={occupied + 1} />}
          <SeeAllCard />
        </div>

        {/* Footer strip — small reassurance with the live red dot. */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
          <div className="inline-flex items-center gap-2">
            <span className="status-dot" aria-hidden />
            Featured bay rotates weekly
          </div>
          <div>Still room on the rooftop</div>
        </footer>
      </div>
    </section>
  );
}

// -- Pieces --------------------------------------------------------------

function FilterChips() {
  // TODO Phase E: convert to a client island that filters the grid by
  // category. Static for now — categories pulled from members.shared.ts.
  return (
    <div className="flex flex-wrap gap-2">
      <Chip active>All</Chip>
      {CATEGORIES.map((c) => (
        <Chip key={c}>{c}</Chip>
      ))}
    </div>
  );
}

function Chip({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
        active
          ? "border-lime bg-lime text-ink"
          : "border-line text-muted hover:border-muted hover:text-fg"
      }`}
    >
      {children}
    </span>
  );
}

function FeaturedBay({ m }: { m: MemberMeta }) {
  return (
    <Link
      href={`/members/${m.slug}`}
      className="group relative col-span-1 row-span-1 overflow-hidden rounded-md border border-line bg-raised transition-all duration-300 hover:-translate-y-1 hover:border-lime md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
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
          <span className="bg-rust px-2 py-1">
            Bay {(m.bayNumber ?? "—").toString().padStart(2, "0")} ★ Featured
          </span>
        </span>

        <span className="absolute right-4 top-4 inline-flex rounded-sm bg-base/70 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-lime">
          {m.category}
        </span>

        {m.pull && (
          <blockquote className="absolute left-6 right-6 bottom-24 max-w-[36ch] font-display text-2xl italic leading-snug text-fg drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-3xl">
            <span className="text-lime">&ldquo;</span>
            {m.pull}
            <span className="text-lime">&rdquo;</span>
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
      className="group relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-raised transition-all duration-300 hover:-translate-y-1 hover:border-lime"
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

      <span className="absolute right-3 top-3 inline-flex rounded-sm bg-base/70 px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.25em] text-lime">
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
      className="group relative flex aspect-[4/3] flex-col items-center justify-center rounded-md border border-dashed border-line bg-raised text-center transition-colors duration-300 hover:border-lime hover:bg-lime/[0.04]"
    >
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-dim">
        Bay {number.toString().padStart(2, "0")}
      </span>
      <span className="mt-3 font-display text-2xl tracking-[-0.01em] text-muted group-hover:text-fg">
        Open
      </span>
      <span className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-lime">
        Join the club →
      </span>
    </Link>
  );
}

function SeeAllCard() {
  return (
    <Link
      href="/members"
      className="group relative flex aspect-[4/3] items-center justify-center rounded-md border border-line bg-surface text-center transition-colors duration-300 hover:border-lime"
    >
      <div>
        <div className="font-display text-xl leading-tight tracking-[-0.01em] text-fg md:text-2xl">
          See the full roster →
        </div>
        <div className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-lime">
          /members
        </div>
        <div className="mt-2 font-mono text-[0.5rem] uppercase tracking-[0.25em] text-dim">
          {ROSTER_CAP} bays · all members
        </div>
      </div>
    </Link>
  );
}
