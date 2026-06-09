import { getMembers } from "@/lib/members";
import BayGridGallery from "@/components/home/BayGridGallery";

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
 *     cedar accent and renders the `pull` quote prominently.
 *   - Empty bays + the "See the full roster" tile auto-render at the end.
 *
 * The chips + grid live in BayGridGallery, a client island that filters
 * the bays by category.
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
            "radial-gradient(ellipse at 30% 0%, rgba(201,111,67,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-content">
        {/* Header */}
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-moss">
              <span aria-hidden className="inline-block h-px w-7 bg-moss" />
              Section 03 / The Fleet
            </p>
            <h2 className="mt-3 font-display text-5xl font-normal leading-[0.92] tracking-[-0.03em] text-fg md:text-6xl lg:text-7xl">
              The <span className="italic text-moss">Bays</span>.
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

        <BayGridGallery members={sorted} open={open} occupied={occupied} />

        {/* Footer strip — small reassurance with the live cedar dot. */}
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
