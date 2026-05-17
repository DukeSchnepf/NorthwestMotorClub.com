import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-base">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-16">
        <div className="flex flex-col gap-1">
          <p className="font-display text-lg text-fg">
            Northwest <span className="text-lime">Motor</span> Club
          </p>
          <p className="font-mono text-xs text-dim">
            {site.region} · Est. {site.establishedYear} · Everyone welcome
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-lime"
          >
            {site.instagramHandle}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors duration-200 hover:text-lime"
          >
            Email
          </a>
          <Link
            href="/#join"
            className="transition-colors duration-200 hover:text-lime"
          >
            Join
          </Link>
        </nav>
      </div>
      <p className="px-6 pb-8 font-mono text-xs text-dim md:px-16">
        © {new Date().getFullYear()} {site.name} · Seattle, WA
      </p>
    </footer>
  );
}
