import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/home/CtaBand";
import { site, founders, values, manifestoBody } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Northwest Motor Club is — a Pacific Northwest car community, not a brand.",
};

export default function AboutPage() {
  return (
    <>
      {/* Editorial split hero */}
      <section className="mx-auto grid max-w-content items-center gap-12 px-6 pb-20 pt-36 md:grid-cols-2 md:px-16 md:pb-28 md:pt-44">
        <Reveal className="flex flex-col gap-6">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-lime">
            {site.region} · Est. {site.establishedYear}
          </p>
          <h1 className="font-display text-5xl text-fg max-md:text-4xl">
            Who We Are
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted">
            {manifestoBody}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/media/scene/fleet-garage.jpg"
            alt="The Northwest Motor Club fleet parked in an arc on a wet Bellevue garage rooftop"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </Reveal>
      </section>

      {/* Founders / key members */}
      <section className="border-t border-line bg-raised px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading
            supertitle="The Core Crew"
            title="Who Runs It"
            className="mb-12"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((f, i) => (
              <Reveal key={f.handle} delay={i * 0.08} as="article">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden border border-line">
                  <Image
                    src={f.image}
                    alt={`${f.name} — ${f.vehicle}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
                  {f.role}
                </p>
                <h3 className="mt-2 font-display text-xl text-fg">{f.name}</h3>
                <p className="font-mono text-xs text-muted">{f.handle}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-dim">
                  {f.vehicle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {f.bio}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading
            supertitle="What We Stand For"
            title="The Code"
            className="mb-12"
          />
          <div className="grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <p className="font-mono text-sm text-dim">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl text-fg">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
