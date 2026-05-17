"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, nextMeet, navLinks } from "@/lib/site";

function meetText() {
  if (nextMeet.status === "scheduled" && nextMeet.date) {
    const d = new Date(nextMeet.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${d.toUpperCase()} · ${nextMeet.location}`;
  }
  return `TBA · ${nextMeet.location} · Follow ${site.instagramHandle}`;
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Next-meet banner — the club's #1 priority */}
      <Link
        href={nextMeet.href}
        className="group flex items-center justify-center gap-2 bg-lime px-4 py-2 text-center font-mono text-xs tracking-wider text-ink"
      >
        <span className="font-semibold uppercase">Next Meet</span>
        <span aria-hidden>·</span>
        <span className="uppercase">{meetText()}</span>
        <span
          aria-hidden
          className="transition-transform duration-200 ease-exit group-hover:translate-x-1"
        >
          →
        </span>
      </Link>

      {/* Nav */}
      <nav
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-base/95 backdrop-blur-md"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-16">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-fg"
          >
            Northwest <span className="text-lime">Motor</span> Club
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-lime"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/join"
                className="rounded-full bg-lime px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
              >
                Join
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-fg transition-transform duration-200 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-fg transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-fg transition-transform duration-200 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {open && (
          <ul
            id="mobile-menu"
            className="flex flex-col gap-1 border-t border-line bg-base px-6 py-4 md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.2em] text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
