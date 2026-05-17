import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

// PLACEHOLDER feature — uses a real club photo (the '31) but specs/owner are
// unknown. Brief calls for Duke's hero build (Charger Daytona / Ranger) with
// 3+ photos, a spec sheet and a quote. Surfaced in the asset-gap list.
const build = {
  spec: "1931 · HOT ROD · SEDAN",
  owner: "@nwmotorclub",
  quote: "Channeled, chopped, and still daily-able. That’s the whole point.",
  image: "/media/featured/hotrod-31.jpg",
  alt: "Channeled black 1931 hot-rod sedan at a golden-hour Pacific Northwest car show",
  href: "/#featured",
};

export default function FeaturedBuild() {
  return (
    <section
      id="featured"
      className="scroll-mt-28 border-y border-line bg-raised"
    >
      <div className="mx-auto grid max-w-content items-stretch md:grid-cols-2">
        <Reveal className="relative min-h-[60vh] md:min-h-[80vh]">
          <Image
            src={build.image}
            alt={build.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex flex-col justify-center gap-6 px-6 py-16 md:px-16"
        >
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-lime">
            Featured Build
          </p>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            {build.spec}
          </p>
          <blockquote className="font-display text-2xl italic leading-snug text-fg md:text-3xl">
            “{build.quote}”
          </blockquote>
          <p className="font-mono text-sm text-muted">{build.owner}</p>
          <Link
            href={build.href}
            className="mt-2 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-lime transition-colors duration-200 hover:text-fg"
          >
            Read the build
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
