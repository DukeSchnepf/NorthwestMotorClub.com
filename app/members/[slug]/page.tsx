import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getMemberSlugs,
  getMemberSource,
  getMembers,
  type MemberMeta,
} from "@/lib/members";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import CtaBand from "@/components/home/CtaBand";

type Params = { slug: string };
type FM = Omit<MemberMeta, "slug">;

export function generateStaticParams(): Params[] {
  return getMemberSlugs().map((slug) => ({ slug }));
}

async function load(slug: string) {
  const source = getMemberSource(slug);
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
  if (!r) return { title: "Build Not Found" };
  return {
    title: `${r.frontmatter.title} — ${r.frontmatter.ymm}`,
    description: `${r.frontmatter.name}'s ${r.frontmatter.ymm}.`,
  };
}

export default async function BuildFeature({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const r = await load(slug);
  if (!r) notFound();
  const { content, frontmatter: fm } = r;
  const related = getMembers()
    .filter((m) => m.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative h-[62vh] min-h-[440px] w-full">
        <Image
          src={fm.cover}
          alt={`${fm.ymm} — ${fm.handle}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-base/30 to-base"
        />
      </section>

      <div className="mx-auto max-w-content px-6 pb-24 md:px-16">
        <div className="-mt-20 md:-mt-28">
          <Link
            href="/members"
            className="font-mono text-xs uppercase tracking-[0.2em] text-lime hover:text-fg"
          >
            ← All rides
          </Link>
        </div>

        <div className="mt-8 grid gap-12 md:grid-cols-[1fr_2fr]">
          <aside className="md:sticky md:top-32 md:self-start">
            <p className="font-mono text-xs uppercase tracking-wider text-lime">
              {fm.category}
            </p>
            <h1 className="mt-3 font-display text-4xl text-fg">{fm.title}</h1>
            <dl className="mt-6 font-mono text-sm">
              {[
                ["Vehicle", fm.ymm],
                ["Owner", fm.name],
                ["Handle", fm.handle],
                ["Location", fm.location],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-line py-2.5"
                >
                  <dt className="uppercase tracking-wider text-dim">{k}</dt>
                  <dd className="text-right text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={fm.ig}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.2em] text-lime hover:text-fg"
            >
              {fm.handle} on Instagram →
            </a>
          </aside>

          <article>{content}</article>
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-line pt-12">
            <p className="mb-8 font-mono text-sm uppercase tracking-[0.25em] text-lime">
              Related rides
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((m) => (
                <Link
                  key={m.slug}
                  href={`/members/${m.slug}`}
                  className="group block overflow-hidden border border-line bg-raised"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={m.cover}
                      alt={`${m.ymm} — ${m.handle}`}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-500 ease-exit group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">
                      {m.ymm}
                    </p>
                    <h3 className="font-display text-lg text-fg">{m.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <CtaBand />
    </>
  );
}
