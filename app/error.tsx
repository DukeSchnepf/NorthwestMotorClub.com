"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center gap-6 px-6 py-36 text-center md:px-16">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-moss">
        Engine trouble
      </p>
      <h1 className="font-display text-5xl text-fg max-md:text-3xl">
        Something stalled.
      </h1>
      <p className="max-w-md text-lg leading-relaxed text-muted">
        We hit an unexpected error rendering this page. Give it another crank
        &mdash; if it keeps happening, head back to the home page.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => unstable_retry()}
          className="border border-line px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-fg transition-colors hover:border-moss hover:text-moss"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-dim transition-colors hover:text-fg"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
