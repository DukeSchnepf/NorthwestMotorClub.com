import Image from "next/image";
import Link from "next/link";
import { nextMeet } from "@/lib/site";

/**
 * CTA Band — Section 06A. The final "join us" push above the footer.
 *
 * Composition: full-bleed fleet-garage.jpg at low opacity with a dual
 * gradient mask so the photo reads as atmosphere, a centered eyebrow with
 * moss hairlines, a massive Fraunces statement, two CTAs (Join + RSVP
 * next), and a meet info strip at the bottom.
 *
 * Used once at the bottom of the home page. Subpages get a lighter
 * variant if they need one (see follow-up specs).
 */
export default function CtaBand() {
  const isTBA = nextMeet.status === "tba" || !nextMeet.date;
  const meetWhen = isTBA
    ? "TBA"
    : new Date(nextMeet.date!)
        .toLocaleDateString("en-US", { month: "short", day: "numeric" })
        .toUpperCase();

  return (
    <section
      id="join-band"
      aria-label="Final call to action"
      className="relative overflow-hidden border-y border-line"
    >
      {/* Atmospheric backdrop */}
      <Image
        src="/media/scene/fleet-garage.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
        style={{ filter: "saturate(0.6) contrast(1.05)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-base/[0.78]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(10,14,12,0.9) 85%), linear-gradient(180deg, rgba(10,14,12,1) 0%, transparent 25%, transparent 75%, rgba(10,14,12,1) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-content px-6 py-28 text-center md:px-16">
        <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-moss">
          <span aria-hidden className="inline-block h-px w-6 bg-moss" />
          Section 06 / Final call
          <span aria-hidden className="inline-block h-px w-6 bg-moss" />
        </p>

        <h2 className="mt-6 font-display text-5xl font-normal leading-[0.92] tracking-[-0.04em] text-fg md:text-7xl lg:text-[7rem]">
          Bring the <span className="italic text-moss">car</span>
          <br />
          you have.
        </h2>

        <p className="mx-auto mt-8 max-w-[48ch] font-display text-lg italic leading-relaxed text-fog md:text-xl">
          Stock daily or full build, first car or fifth — every car has a place
          in the lot. The roster is open. The next drive is on the calendar.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/join"
            className="rounded-full bg-moss px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
          >
            Join the Club →
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-fog/60 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.18em] text-fg transition-colors duration-200 ease-exit hover:border-moss hover:text-moss"
          >
            RSVP next drive
          </Link>
        </div>

        {/* Meet info strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
          <span className="inline-flex items-center gap-2 text-cedar">
            <span className="status-dot" aria-hidden />
            Live
          </span>
          <Dot />
          <span>
            Next → {nextMeet.title === "Next Meet" ? "TBA" : nextMeet.title}
          </span>
          <Dot />
          <span>
            {meetWhen} · {nextMeet.location}
          </span>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span className="text-moss" aria-hidden>
      ·
    </span>
  );
}
