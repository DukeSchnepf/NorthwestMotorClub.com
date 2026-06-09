import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Story Close — bottom of Section 02 / Our Story.
 *
 * Closing pull quote, two CTAs (Join + read manifesto), and a 2×2 stats
 * grid. Stats values are derived where possible (years from
 * `site.establishedYear`) and placeholdered otherwise (bays / drives / etc.)
 * with cedar-dashed callouts inviting Duke to wire real counts.
 */
export default function StoryClose() {
  const currentYear = new Date().getFullYear();
  const yearsOnRoad = currentYear - site.establishedYear;

  return (
    <section
      aria-label="Story close"
      className="relative border-t border-line bg-base px-6 py-24 md:px-12 md:py-28 lg:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(201,111,67,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-content gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        {/* Left — close + CTAs */}
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-moss">
            <span aria-hidden className="inline-block h-px w-7 bg-moss" />
            Where we are now
          </p>
          <h3 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-[-0.025em] text-fg md:text-5xl lg:text-6xl">
            Still chasing the <span className="italic text-moss">long way</span>{" "}
            home.
          </h3>
          <blockquote className="mt-6 max-w-[48ch] border-l-2 border-cedar pl-5 font-display text-lg italic leading-relaxed text-fog md:text-xl">
            We started as kids in a parking lot. We&apos;re not kids anymore.
            The parking lot got bigger. The passion didn&apos;t change. Bring
            the car you have.
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join"
              className="rounded-full bg-moss px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
            >
              Join the Club →
            </Link>
            <Link
              href="#manifesto"
              className="rounded-full border border-fog/60 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.18em] text-fg transition-colors duration-200 ease-exit hover:border-moss hover:text-moss"
            >
              Read the manifesto
            </Link>
          </div>
        </div>

        {/* Right — stats grid */}
        <div className="grid grid-cols-2 gap-4 border border-line bg-raised p-6 md:p-8">
          <Stat
            n={yearsOnRoad.toString()}
            label="Years on the road"
            accent="moss"
          />
          <Stat n="12" label="Bays in the roster" accent="cedar" />
          <Stat n="047" label="Drives logged" accent="moss" placeholder />
          <Stat n="∞" label="Backroads left" accent="moss" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  n,
  label,
  accent,
  placeholder,
}: {
  n: string;
  label: string;
  accent: "moss" | "cedar";
  placeholder?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-display text-5xl font-normal leading-none tracking-[-0.04em] ${
          accent === "cedar" ? "text-cedar" : "text-moss"
        }`}
      >
        {n}
      </div>
      <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
        {label}
      </div>
      {placeholder && (
        <div className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-cedar/80">
          ◯ wire real count
        </div>
      )}
    </div>
  );
}
