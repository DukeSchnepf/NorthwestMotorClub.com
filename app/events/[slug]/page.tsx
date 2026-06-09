import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getEventSlugs, getEventSource, type EventMeta } from "@/lib/events";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import CtaBand from "@/components/home/CtaBand";

type Params = { slug: string };
type FM = Omit<EventMeta, "slug">;

export function generateStaticParams(): Params[] {
  return getEventSlugs().map((slug) => ({ slug }));
}

async function load(slug: string) {
  const source = getEventSource(slug);
  if (!source) return null;
  return compileMDX<FM>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = await load(slug);
  if (!r) return { title: "Event Not Found" };
  return { title: r.frontmatter.title, description: r.frontmatter.blurb };
}

export default async function EventRecap({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const r = await load(slug);
  if (!r) notFound();
  const { content, frontmatter: fm } = r;
  const date = new Date(fm.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src={fm.cover}
          alt={`${fm.title} — ${fm.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-base/40 to-base"
        />
      </section>

      <article className="mx-auto max-w-3xl px-6 pb-24 md:px-0">
        <div className="-mt-24 md:-mt-32">
          <Link
            href="/events"
            className="font-mono text-xs uppercase tracking-[0.2em] text-moss hover:text-fg"
          >
            ← All events
          </Link>
          <h1 className="mt-5 font-display text-5xl text-fg max-md:text-4xl">
            {fm.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 font-mono text-xs uppercase tracking-wider text-muted">
            <span>{date}</span>
            <span>{fm.location}</span>
            <span>~{fm.attendees} attended</span>
          </div>
        </div>
        <div className="mt-10">{content}</div>
      </article>

      <CtaBand />
    </>
  );
}
