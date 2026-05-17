import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Grain from "@/components/ui/Grain";
import { site } from "@/lib/site";

/** Recurring footer band — reused at the bottom of every page. */
export default function CtaBand() {
  return (
    <section
      id="join-band"
      className="relative overflow-hidden border-y border-line"
    >
      <Image
        src="/media/scene/fleet-garage.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-base/80" />
      <Grain opacity={0.09} />

      <Reveal className="relative z-20 mx-auto flex max-w-content flex-col items-center gap-8 px-6 py-28 text-center md:px-16">
        <h2 className="font-display text-5xl text-fg max-md:text-4xl max-sm:text-3xl">
          Roll with us.
        </h2>
        <p className="max-w-md text-lg text-muted">
          Stock daily or full build — every car has a place in the lot. Come
          find the next meet.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/join"
            className="rounded-full bg-lime px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
          >
            Join the Club
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-fog/60 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.15em] text-fg transition-colors duration-200 ease-exit hover:border-lime hover:text-lime"
          >
            Email Us
          </a>
        </div>
      </Reveal>
    </section>
  );
}
