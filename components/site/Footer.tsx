import Link from "next/link";
import { site, contactAreas } from "@/lib/site";

/**
 * Site footer.
 *
 * Structure: a thin marquee crawl across the top (visual rhyme with the hero
 * marquee), then a 5-column main grid (brand / club / drives / connect / the
 * drop), then a baseline credit row.
 *
 * Newsletter form is intentionally static for now — Phase E wires the actual
 * submission handler. The visual + a11y structure is in place so wiring is a
 * one-component swap later.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-base">
      {/* Top marquee strip — visual rhyme with the hero marquee */}
      <div className="overflow-hidden border-b border-line py-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
        <div className="marquee-track whitespace-nowrap">
          <FooterMarqueeRow />
          <FooterMarqueeRow />
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 py-14 md:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1.2fr]">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label={site.name}>
              <img
                src={site.logo.wordmark}
                alt={site.name}
                width={220}
                height={56}
                className="h-14 w-auto mix-blend-screen drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
            </Link>
            <p className="mt-5 max-w-[30ch] font-display text-base italic leading-relaxed text-fog">
              A Pacific Northwest car community — not a brand, not a feed.
            </p>

            <div className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
              <div className="mb-2 text-[0.55rem] text-lime">— Where we meet</div>
              {contactAreas.map((a) => (
                <div key={a} className="leading-7">
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* The Club */}
          <FooterCol heading="The Club">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/history">Our Story</FooterLink>
            <FooterLink href="/members">The Roster</FooterLink>
            <FooterLink href="/#manifesto">Manifesto</FooterLink>
          </FooterCol>

          {/* Drives */}
          <FooterCol heading="Drives">
            <FooterLink href="/events">Upcoming</FooterLink>
            <FooterLink href="/events?status=past">The Archive</FooterLink>
            <FooterLink href="/events?type=rooftop">Rooftop Meets</FooterLink>
            <FooterLink href="/events?type=run">Cascade Runs</FooterLink>
          </FooterCol>

          {/* Connect */}
          <FooterCol heading="Connect">
            <FooterLink href="/join">Join the Club</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink
              href={site.instagram}
              external
            >
              {site.instagramHandle}
            </FooterLink>
            <li>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-dim">
                {site.email}
              </span>
            </li>
          </FooterCol>

          {/* The Drop (newsletter signup) */}
          <div>
            <h5 className="mb-3 border-b border-line pb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-lime">
              The Drop
            </h5>
            <p className="mb-4 font-display text-sm italic leading-relaxed text-fog">
              Get the next-meet briefing in your inbox. One email per drive.
              Nothing else.
            </p>
            {/* Static for now — Phase E will swap this for a real client form
                with server-action submit. Structure + a11y already correct. */}
            <form
              className="flex gap-2"
              aria-label="Subscribe to The Drop"
              action="/api/subscribe"
              method="post"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="flex-1 rounded-sm border border-line bg-surface px-3 py-2.5 font-mono text-xs tracking-[0.1em] text-fg outline-none placeholder:text-dim focus:border-lime"
              />
              <button
                type="submit"
                className="rounded-sm bg-lime px-4 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink transition-transform duration-150 hover:scale-[1.03]"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              <span className="status-dot" aria-hidden />
              Or follow on Instagram →{" "}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime hover:underline"
              >
                {site.instagramHandle}
              </a>
            </p>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-dim">
          <div className="text-muted">
            © {site.establishedYear} – {year} · {site.name.toUpperCase()} ·{" "}
            <span className="text-lime">All rights reserved</span>
          </div>
          <div>
            Built in the <span className="text-lime">Pacific NW</span> ·{" "}
            Next.js 16 · Vercel
          </div>
        </div>
      </div>
    </footer>
  );
}

// -- internal pieces -------------------------------------------------------

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h5 className="mb-3 border-b border-line pb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-lime">
        {heading}
      </h5>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const baseClass =
    "font-mono text-[0.7rem] uppercase tracking-[0.15em] text-fg transition-colors duration-200 hover:text-lime";
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    </li>
  );
}

function FooterMarqueeRow() {
  return (
    <span className="inline-flex gap-6 px-6">
      <span>Northwest Motor Club</span>
      <Dot />
      <span>Est. {site.establishedYear}</span>
      <Dot />
      <span>
        {site.coordinates.latLabel} · {site.coordinates.lonLabel}
      </span>
      <Dot />
      <span>Pacific Northwest</span>
      <Dot />
      <span>Cars · Roads · Rain</span>
      <Dot />
      <span>Follow {site.instagramHandle}</span>
      <Dot />
    </span>
  );
}

function Dot() {
  return <span className="text-lime">·</span>;
}
