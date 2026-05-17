import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import instagram from "@/content/instagram.json";

export default function InstagramWall() {
  return (
    <section className="bg-raised px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-content">
        <div className="mb-12 flex items-end justify-between gap-6">
          <SectionHeading supertitle="From the feed" title="On the Gram" />
          <a
            href={instagram.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-lime transition-colors duration-200 hover:text-fg sm:inline"
          >
            @nwmotorclub →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {instagram.tiles.map((tile, i) => (
            <Reveal key={tile.src} delay={(i % 4) * 0.06}>
              <a
                href={instagram.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden border border-line"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-exit group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-base/0 transition-colors duration-300 group-hover:bg-base/30" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
