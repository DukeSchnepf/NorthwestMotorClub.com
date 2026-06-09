import Image from "next/image";
import type { MDXComponents } from "mdx/types";

/** Custom MDX building blocks for event recaps & member build features. */
export const mdxComponents: MDXComponents = {
  h1: (p) => <h1 className="font-display text-4xl text-fg max-md:text-3xl" {...p} />,
  h2: (p) => (
    <h2 className="mt-12 font-display text-2xl text-fg" {...p} />
  ),
  p: (p) => <p className="mt-5 leading-relaxed text-muted" {...p} />,
  ul: (p) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-muted" {...p} />
  ),
  a: (p) => <a className="text-moss underline-offset-4 hover:underline" {...p} />,
  hr: () => <hr className="my-12 border-line" />,

  Pull: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-12 border-l-2 border-moss pl-6 font-display text-2xl italic leading-snug text-fg md:text-3xl">
      {children}
    </blockquote>
  ),

  Spec: ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex justify-between gap-6 border-b border-line py-2.5 font-mono text-sm">
      <span className="uppercase tracking-wider text-dim">{label}</span>
      <span className="text-right text-fg">{children}</span>
    </div>
  ),

  Gallery: ({
    srcs,
    alt = "Northwest Motor Club photo",
  }: {
    srcs: string[];
    alt?: string;
  }) => (
    <div className="my-12 grid grid-cols-2 gap-2 md:grid-cols-3">
      {srcs.map((src) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden border border-line"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  ),
};
