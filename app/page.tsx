export default function Home() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-screen max-w-content flex-col justify-center gap-12 px-6 py-24 md:px-16"
    >
      <header className="flex flex-col gap-4">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-lime">
          Pacific NW · Phase 1 — Foundation
        </p>
        <h1 className="font-display text-5xl text-fg max-md:text-3xl">
          Northwest Motor&nbsp;Club
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Cars. Roads. Rain. The design system is wired — fonts, color tokens,
          motion easings, and accessibility primitives are in place. Section
          build begins next.
        </p>
      </header>

      <section
        aria-label="Design token preview"
        className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3"
      >
        {[
          { name: "base", className: "bg-base" },
          { name: "raised", className: "bg-raised" },
          { name: "surface", className: "bg-surface" },
        ].map((swatch) => (
          <div
            key={swatch.name}
            className={`${swatch.className} flex h-28 items-end p-4`}
          >
            <span className="font-mono text-xs text-muted">{swatch.name}</span>
          </div>
        ))}
      </section>

      <section aria-label="Accent + typography preview" className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-lime px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-base">
            accent.lime
          </span>
          <span className="rounded-full bg-rust px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-base">
            accent.rust
          </span>
          <span className="rounded-full border border-fog px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-fog">
            accent.fog
          </span>
        </div>
        <p className="font-display text-2xl italic text-fg">
          “Display serif — Fraunces, italic.”
        </p>
        <p className="text-base text-muted">
          Body — Geist Sans. The quick brown fox jumps over the lazy dog.
        </p>
        <p className="font-mono text-sm text-dim">
          MONO — Geist Mono · 1969 · DODGE · CHARGER DAYTONA
        </p>
      </section>
    </main>
  );
}
