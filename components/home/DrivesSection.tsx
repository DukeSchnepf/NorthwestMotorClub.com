import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvents, type EventMeta } from "@/lib/events";

/**
 * Drives Section — Section 04 of the home page. Replaces UpcomingEvents.
 *
 * Layout: a featured "NEXT UP" card (the soonest upcoming event), followed
 * by up to two compact follow-on cards, followed by an archive teaser.
 *
 * Data source: content/events/*.mdx via getUpcomingEvents() (already
 * sorted ascending by date). Adding a drive = drop a new MDX file with
 * `status: "upcoming"`. Marking one as past = set `status: "past"`; it
 * auto-archives.
 *
 * Optional frontmatter fields (runNumber, startTime, distanceMi, capacity,
 * weather) just surface extra metadata if present and gracefully hide
 * otherwise — see lib/events.ts EventMeta.
 */
export default function DrivesSection() {
  const events = getUpcomingEvents(3);
  if (events.length === 0) {
    return <EmptyState />;
  }

  const [next, ...rest] = events;

  return (
    <section
      id="drives"
      aria-label="Upcoming drives"
      className="relative border-t border-line bg-base px-6 py-24 md:px-12 md:py-28 lg:px-16"
    >
      <div className="relative mx-auto max-w-content">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-lime">
              <span aria-hidden className="inline-block h-px w-7 bg-lime" />
              Section 04 / Drives
            </p>
            <h2 className="mt-3 font-display text-5xl font-normal leading-[0.92] tracking-[-0.03em] text-fg md:text-6xl lg:text-7xl">
              Upcoming <span className="italic text-lime">drives</span>.
            </h2>
          </div>
          <div className="text-right font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
            <div className="inline-flex items-center gap-2 text-rust">
              <span className="status-dot" aria-hidden />
              {events.length} scheduled · next in {daysUntil(next.date)} days
            </div>
            <div className="mt-1 text-dim">
              pulled live from{" "}
              <code className="rounded-sm bg-raised px-1.5 py-0.5 text-muted">
                content/events/*.mdx
              </code>
            </div>
          </div>
        </header>

        <FeaturedDrive e={next} />

        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {rest.map((e) => (
              <CompactDriveCard key={e.slug} e={e} />
            ))}
          </div>
        )}

        <PastDrivesTeaser />
      </div>
    </section>
  );
}

// -- Pieces --------------------------------------------------------------

function FeaturedDrive({ e }: { e: EventMeta }) {
  const date = new Date(e.date);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return (
    <article className="grid overflow-hidden rounded-md border border-line border-l-[3px] border-l-rust bg-raised md:grid-cols-[1.4fr_1fr]">
      <Link
        href={`/events/${e.slug}`}
        className="group relative aspect-[16/9] md:aspect-auto"
      >
        <Image
          src={e.cover}
          alt={e.title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 ease-exit group-hover:scale-105"
          style={{ filter: "saturate(0.95) contrast(1.05)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-raised"
        />

        <div className="absolute left-6 top-6 border border-rust bg-base px-4 py-2 text-center text-fg">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-rust">
            {month}
          </div>
          <div className="mt-1 font-display text-5xl font-normal leading-[0.9] tracking-[-0.04em]">
            {day}
          </div>
          <div className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.3em] text-muted">
            {year}
          </div>
        </div>

        <span className="absolute bottom-6 left-6 bg-rust px-2.5 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink">
          ◯ Next Up
        </span>
      </Link>

      <div className="flex flex-col justify-between gap-5 p-8 md:p-10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-rust">
            <span className="status-dot" aria-hidden />
            Run {(e.runNumber ?? 48).toString().padStart(3, "0")} · Season opener
          </div>
          <h3 className="mt-3 font-display text-3xl font-normal leading-[0.95] tracking-[-0.025em] text-fg md:text-4xl">
            {e.title}
          </h3>
          <div className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-lime">
            {e.location}
          </div>
          <p className="mt-4 max-w-[40ch] font-display text-base leading-relaxed text-fog">
            {e.blurb}
          </p>
        </div>

        <div>
          <dl className="grid grid-cols-3 gap-3 border-t border-line pt-4 text-fg">
            <Meta
              k="RSVP'd"
              v={`${e.attendees}`}
              sub={e.capacity ? `cars · cap ${e.capacity}` : "cars"}
              accent
            />
            <Meta k="Start" v={e.startTime ?? "—"} sub={fmtDayShort(e.date)} />
            <Meta
              k={e.distanceMi ? "Distance" : "Weather"}
              v={e.distanceMi ? `${e.distanceMi} mi` : e.weather ?? "—"}
              sub={e.weather ?? "forecast TBA"}
            />
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={`/events/${e.slug}`}
              className="rounded-full bg-lime px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
            >
              RSVP for the drive →
            </Link>
            <Link
              href={`/events/${e.slug}`}
              className="rounded-full border border-fog/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-fg transition-colors duration-200 ease-exit hover:border-lime hover:text-lime"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function CompactDriveCard({ e }: { e: EventMeta }) {
  const date = new Date(e.date);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate().toString().padStart(2, "0");

  return (
    <Link
      href={`/events/${e.slug}`}
      className="group grid overflow-hidden rounded-md border border-line bg-raised transition-all duration-300 hover:-translate-y-1 hover:border-lime md:grid-cols-[200px_1fr]"
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
        <Image
          src={e.cover}
          alt={e.title}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover transition-transform duration-700 ease-exit group-hover:scale-105"
          style={{ filter: "saturate(0.9)" }}
        />
        <div className="absolute bottom-2 left-2 border border-line bg-base/90 px-2 py-1 text-center text-fg">
          <div className="font-mono text-[0.5rem] uppercase tracking-[0.25em] text-lime">
            {month}
          </div>
          <div className="mt-0.5 font-display text-xl font-normal leading-[1] tracking-[-0.02em]">
            {day}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 p-6">
        <div>
          <h4 className="font-display text-2xl leading-tight tracking-[-0.015em] text-fg">
            {e.title}
          </h4>
          <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-lime">
            {e.location}
          </div>
          <p className="mt-3 font-display text-sm leading-relaxed text-fog">
            {e.blurb}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
          <span>
            {e.attendees} RSVP&apos;d
            {e.distanceMi ? ` · ${e.distanceMi} mi` : ""}
          </span>
          <span className="text-lime">RSVP →</span>
        </div>
      </div>
    </Link>
  );
}

function PastDrivesTeaser() {
  return (
    <Link
      href="/events?status=past"
      className="group mt-10 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-surface p-6 transition-colors duration-300 hover:border-lime md:p-8"
    >
      <div className="flex items-center gap-6">
        <div className="font-display text-5xl font-normal leading-none tracking-[-0.04em] text-lime md:text-6xl">
          047
        </div>
        <div className="font-mono text-xs uppercase leading-snug tracking-[0.2em] text-fg">
          <div className="text-[0.55rem] text-muted">— Drives logged</div>
          <div>Recaps, routes, gallery</div>
        </div>
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
        The archive
        <span
          aria-hidden
          className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <section className="border-t border-line bg-base px-6 py-24 text-center md:px-16">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted">
        Next dates TBA · Follow the club for the drop
      </p>
    </section>
  );
}

function Meta({
  k,
  v,
  sub,
  accent,
}: {
  k: string;
  v: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-dim">
        {k}
      </dt>
      <dd
        className={`mt-0.5 font-display text-xl font-normal leading-[1.05] tracking-[-0.01em] ${
          accent ? "text-lime" : "text-fg"
        }`}
      >
        {v}
      </dd>
      {sub && (
        <div className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">
          {sub}
        </div>
      )}
    </div>
  );
}

// -- helpers -------------------------------------------------------------

function daysUntil(iso: string): number {
  const ms = +new Date(iso) - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function fmtDayShort(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
}
