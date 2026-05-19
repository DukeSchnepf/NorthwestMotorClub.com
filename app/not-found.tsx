import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center gap-6 px-6 py-36 text-center md:px-16">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-lime">
        404 · Off the map
      </p>
      <h1 className="font-display text-6xl text-fg max-md:text-4xl">
        Wrong turn.
      </h1>
      <p className="max-w-md text-lg leading-relaxed text-muted">
        That road doesn&rsquo;t go anywhere &mdash; the page you&rsquo;re after
        isn&rsquo;t here. Happens to the best of us. Let&rsquo;s get you back on
        route.
      </p>
      <Link
        href="/"
        className="mt-2 border border-line px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-fg transition-colors hover:border-lime hover:text-lime"
      >
        Back to {site.shortName}
      </Link>
    </section>
  );
}
