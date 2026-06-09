import { manifestoLines, manifestoBody, founders, site } from "@/lib/site";

/**
 * Mission Open — top of Section 02 / Our Story.
 *
 * Opens the story chapter with the headline arc (strikethrough "group chat"
 * replaced by "parking lot"), the four manifesto lines stacked, and a
 * sidecar with the manifesto body + restart callout + founders list.
 *
 * Server component — all content comes from lib/site.ts; updating the
 * headline copy or the manifesto lines is a one-file edit there.
 */
export default function MissionOpen() {
  return (
    <section
      id="story"
      aria-label="Our story"
      className="relative border-t border-line bg-base px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Faint moss radial wash so this section feels distinct from the hero
          but stays on-brand. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(167,201,87,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-content gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* Left column — headline + manifesto */}
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-moss">
            <span aria-hidden className="inline-block h-px w-7 bg-moss" />
            Section 02 / Our Story
          </p>

          <h2 className="mt-5 font-display text-5xl font-normal leading-[0.95] tracking-[-0.035em] text-fg md:text-6xl lg:text-7xl">
            Started in a{" "}
            <span className="text-dim line-through decoration-2">
              group chat
            </span>{" "}
            <br className="hidden md:inline" />
            parking lot.
            <br />
            <span className="italic text-moss">Eight</span> years on.
            <br />
            <span className="italic text-cedar">Same</span> passion.
          </h2>

          <div className="mt-12 flex flex-col gap-2">
            {manifestoLines.map((line, i) => (
              <p
                key={i}
                className={`font-display text-2xl leading-snug md:text-3xl ${
                  i === manifestoLines.length - 1 ? "text-moss" : "text-fg"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right column — body + restart callout + founders */}
        <aside className="flex flex-col gap-6">
          <p className="max-w-[44ch] font-display text-base leading-relaxed text-fog md:text-lg">
            {manifestoBody}
          </p>

          <div className="border border-line border-l-[3px] border-l-cedar bg-raised p-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-cedar">
              — The Restart · 2026
            </p>
            <p className="mt-2 font-display text-2xl leading-tight tracking-tight text-fg">
              &ldquo;Same crew. Same backroads. New chapter.&rdquo;
            </p>
            <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              Re-opening the club after a quiet year
            </p>
          </div>

          <div className="border-t border-line pt-6 font-mono text-[0.65rem] uppercase leading-7 tracking-[0.2em] text-muted">
            <div className="text-[0.55rem] text-moss">— Founders</div>
            {founders.map((f) => (
              <div key={f.handle}>
                <span className="text-fg">{f.name}</span> · {f.vehicle}
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Anchor for "Manifesto" footer link */}
      <span id="manifesto" className="sr-only">
        Manifesto: {manifestoLines.join(" ")} {site.tagline}
      </span>
    </section>
  );
}
