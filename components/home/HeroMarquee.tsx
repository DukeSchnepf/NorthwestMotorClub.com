import { site, nextMeet, contactAreas } from "@/lib/site";

/**
 * Hero top marquee — endless horizontal crawl that sits just below the top
 * letterbox bar. Pulls live data from lib/site.ts so future edits stay
 * file-level (next-meet location, coordinates, areas, IG handle, year).
 *
 * The crawl animation itself comes from the `.marquee-track` utility added
 * in globals.css — pure CSS, no JS, paused automatically when the user has
 * prefers-reduced-motion enabled (handled globally in globals.css).
 */
export default function HeroMarquee() {
  return (
    <div className="absolute inset-x-0 top-[38px] z-[9] overflow-hidden whitespace-nowrap bg-gradient-to-b from-base/85 to-transparent py-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-fg backdrop-blur-sm">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}

function meetText() {
  if (nextMeet.status === "scheduled" && nextMeet.date) {
    const d = new Date(nextMeet.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `Next Meet → ${d.toUpperCase()} · ${nextMeet.location}`;
  }
  return `Next Meet → ${nextMeet.location} · TBA`;
}

function Row() {
  return (
    <span className="inline-flex gap-6 px-6">
      <Live />
      <Dot />
      <span>{meetText()}</span>
      <Dot />
      <span>
        {site.coordinates.latLabel} · {site.coordinates.lonLabel}
      </span>
      <Dot />
      <span>
        Pacific Northwest · Est. {site.establishedYear}
      </span>
      <Dot />
      <span>Follow {site.instagramHandle}</span>
      <Dot />
      <span>{contactAreas.join(" · ")}</span>
      <Dot />
    </span>
  );
}

function Live() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="status-dot" aria-hidden />
      <span>Live</span>
    </span>
  );
}

function Dot() {
  return (
    <span className="text-lime" aria-hidden>
      ·
    </span>
  );
}
