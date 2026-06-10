import Link from "next/link";
import { nextMeet, site } from "@/lib/site";

/**
 * Hero dispatch card — the "Next Briefing" panel that sits on the right of
 * the hero on desktop and stacks below the headline on mobile.
 *
 * Reads `nextMeet` and `site` from lib/site.ts. When `nextMeet.status` is
 * "tba", surfaces a cedar dashed placeholder badge so Duke knows exactly
 * where to wire real values.
 *
 * Optional frontmatter fields (start time, distance, confirmed count,
 * weather) are placeholders for now — Phase E will wire either a structured
 * nextMeet shape or pull from a `content/events/*.mdx` lookup.
 */
export default function NextBriefing() {
  const isTBA = nextMeet.status === "tba" || !nextMeet.date;

  const dateLabel = isTBA
    ? "TBA"
    : new Date(nextMeet.date!).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

  return (
    <aside className="relative w-full max-w-md border border-line border-l-[3px] border-l-moss bg-base/75 px-6 py-5 backdrop-blur-md md:max-w-none">
      <header className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.3em] text-moss">
        <span className="inline-flex items-center gap-1.5">
          <span className="status-dot" aria-hidden />
          Next Briefing
        </span>
        <span className="text-dim">Run 047</span>
      </header>

      <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-fg">
        {nextMeet.title}
      </h3>
      <div className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-fog">
        {nextMeet.location}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
        <Field k="Date" v={dateLabel} accent={isTBA} />
        <Field k="Start" v="— : —" />
        <Field k="Distance" v="— mi" />
        <Field k="Confirmed" v="— cars" />
        <Field k="Weather" v="—" />
        <Field k="Coords" v={site.coordinates.latLabel} />
      </dl>

      {isTBA && (
        <div className="mt-4 border border-dashed border-cedar bg-cedar/10 px-2 py-1.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cedar">
          ◯ Wire real meet · lib/site.ts
        </div>
      )}

      <Link
        href={nextMeet.href}
        className="mt-4 inline-block w-full text-right font-mono text-[0.6rem] uppercase tracking-[0.2em] text-moss hover:underline"
      >
        Full briefing →
      </Link>
    </aside>
  );
}

function Field({
  k,
  v,
  accent,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-dim">
        {k}
      </dt>
      <dd
        className={`mt-0.5 font-mono text-sm ${accent ? "text-moss" : "text-fg"}`}
      >
        {v}
      </dd>
    </div>
  );
}
