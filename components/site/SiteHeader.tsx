"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the user navigates.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Next-meet banner — the club's #1 priority */}
      <Link
        href={nextMeet.href}
        className="group flex items-center justify-center gap-2 bg-lime px-4 py-2 text-center font-mono text-xs tracking-wider text-ink"
        aria-label={`Next meet — ${nextMeet.title}: ${meetText()}`}
      >
        <span className="rounded-sm bg-ink px-2 py-0.5 font-semibold uppercase tracking-[0.3em] text-[0.6rem] text-lime">
          Next Meet
        </span>
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
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-base/85 backdrop-blur-md"
            : "bg-gradient-to-b from-black/45 to-transparent"
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto grid max-w-content grid-cols-[auto_1fr_auto] items-center gap-8 px-6 py-3 md:px-16">
          {/* Brand — wordmark logo (icon at app/icon.jpg drives the favicon) */}
          <Link href="/" className="flex items-center" aria-label={site.name}>
            <img
              src={site.logo.wordmark}
              alt={site.name}
              width={150}
              height={36}
              className="h-9 w-auto mix-blend-screen drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center justify-center gap-8 md:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative inline-block py-1 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:text-lime ${
                      active ? "text-fg" : "text-muted"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-lime"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Status pill — decorative; signals an active club + open roster */}
            <span
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-muted md:inline-flex"
              aria-hidden
            >
              <span className="status-dot" />
              Live · Open Roster
            </span>

            {/* Join CTA */}
            <Link
              href="/join"
              className="rounded-full bg-lime px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 ease-exit hover:scale-105"
            >
              Join
            </Link>

            {/* Mobile menu toggle */}
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
        </div>

        {/* Mobile drawer */}
        {open && (
          <ul
            id="mobile-menu"
            className="flex flex-col gap-1 border-t border-line bg-base px-6 py-4 md:hidden"
          >
            {navLinks.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block py-3 font-mono text-sm uppercase tracking-[0.2em] ${
                      active ? "text-lime" : "text-fg"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-line pt-3">
              <Link
                href="/join"
                className="block py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-lime"
              >
                Join the Club →
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
