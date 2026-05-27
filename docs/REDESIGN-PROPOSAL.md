# NorthwestMotorClub.com — Redesign Proposal

A grounded proposal based on the current codebase (Next.js 16 App Router, Tailwind v4, MDX, Framer Motion / GSAP / Three.js, Lenis smooth scroll), the existing design system, and the tools now available via Claude Code + Superpowers.

> **TL;DR** — The site is already well-built and editorial. Don't burn it down. The opportunity is **structural variety** (move home off a 7-deep linear stack), **content depth** (lean into the MDX setup with long-form features), and **two-color discipline** (use the `rust` token you already have so `lime` stops doing all the work).

---

## Current state — what's working

These are strengths to preserve:

- **Coherent design system** in `app/globals.css`: dark `base` (#0a0e0c) with a single confident accent (`lime` #e8ff3a), well-defined type scale (12 → 96), Fraunces display + Geist sans + Geist mono.
- **Editorial typography**: tight leading (1.05), negative tracking (-0.02em) on headings — feels print-grade.
- **Accessibility taken seriously**: skip link, `:focus-visible` lime ring, global `prefers-reduced-motion` reset, semantic landmarks (`<main id="main">`), labeled regions.
- **Motion ergonomics**: every animated component checks reduced-motion (Hero swaps video out, Manifesto bails on GSAP) — this is rare and worth keeping.
- **Hero pattern**: priority `Image` poster as LCP, video swapped in on mount — fast initial paint, motion as enhancement.
- **Next-meet banner** at the top of `SiteHeader` — anchors the value prop (clubs live on "when's the next meet?"). Keep this; sharpen it.
- **Right rendering choices**: server components by default, `"use client"` only where needed (Hero, Manifesto, Header, forms).

---

## Tensions & opportunities

1. **Home is a 7-deep linear stack.** `app/page.tsx` renders Hero → Manifesto → UpcomingEvents → FeaturedBuild → TimelineTeaser → InstagramWall → CtaBand. That's a lot of single-column scrolling. Risk: users bounce before reaching CtaBand, and the rhythm flattens.
2. **Lime is doing too much work.** It's the primary CTA, focus ring, selection color, scroll line, "Next Meet" banner, and brand name accent. The `rust` token (#ff7a1a) exists in `@theme` but is never used. Two accents with clear roles would calm the page down.
3. **Hero is centered and symmetrical.** Beautiful, but doesn't differentiate. PNW automotive editorial could lean off-grid — dateline/metadata strip on one side, headline on the other, asymmetric Fraunces takeover.
4. **InstagramWall undermines editorial control.** Social embeds are slow, brittle, and look the same on every site. The MDX setup is ready for *your own* curated field notes — much stronger.
5. **`FuelPumpScene` (Three.js) on `/history`** is a heavy dependency for one element. R3F + drei is great when 3D *is* the experience; for a single decorative scene it's hard to justify the bytes and the layout-shift risk.
6. **Member directory has no filtering** (based on `MembersBrowser.tsx` filename — not yet inspected). As the roster grows past ~6 members, filter by chassis / year / region becomes necessary.
7. **`/join` is a single form.** Clubs that vet members tend to have a more deliberate intake — 2–3 steps with a clear "we'll review and reach out" promise reads more curated.
8. **Surfaces are all green-near-black.** `base`/`raised`/`surface`/`line` all share the same hue. A single warm or fog-leaning surface for feature pages would give variety.
9. **No long-form template yet.** MDX is wired (`@next/mdx`, `next-mdx-remote`, remark plugins) but only used for short event/member entries. The DNA wants drives, road-trip recaps, weather essays.

---

## Recommended direction — "Magazine restructure + editorial deepening"

Two threads in one sweep:

### Thread A — Restructure home as a magazine front page

Replace the linear stack with an asymmetric grid that reads like an actual print masthead:

```
┌───────────────────────────────────┬─────────────────┐
│                                   │  NEXT MEET      │
│   HERO (full-bleed, off-center)   │  card           │
│   poster/video + headline left    │                 │
│                                   │  Recent field   │
│                                   │  note (latest)  │
├───────────────────────────────────┴─────────────────┤
│  FEATURED BUILD (full-bleed takeover, rust accent)   │
├──────────────┬──────────────┬───────────────────────┤
│  Upcoming    │  Manifesto   │  Member               │
│  Events      │  (short)     │  spotlight            │
│  (3 cards)   │              │                       │
├──────────────┴──────────────┴───────────────────────┤
│  TIMELINE TEASER (horizontal strip, scroll-snap)     │
├──────────────────────────────────────────────────────┤
│  FIELD NOTES (replaces InstagramWall — 4 MDX teases) │
├──────────────────────────────────────────────────────┤
│  CTA BAND (Join — lime, primary)                     │
└──────────────────────────────────────────────────────┘
```

Same components, mostly the same content — but **arranged**. The Manifesto compresses from a full-screen pinned section to a quote panel; the InstagramWall becomes Field Notes; a small Next-Meet card lives in the hero gutter and replaces the top banner once you scroll.

### Thread B — Editorial deepening

- **Field Notes template** — new content type at `content/notes/*.mdx`. Long-form: a drive, a wet-asphalt photo essay, a member's car teardown. Routed at `/notes/[slug]`. Pulls 4 latest into the home page Field Notes block.
- **Drives template** — `content/drives/*.mdx` with a route map (Leaflet or static SVG), waypoints, photos, conditions. `/drives/[slug]`.
- **Member directory filters** — `MembersBrowser` gets chassis / decade / region facets pulled from MDX frontmatter.
- **`/join` becomes a 3-step intake** — about you / about your car / availability — with a "we'll be in touch within a week" promise. Same Zod schema, multi-step UX (React Hook Form's `trigger()` per step).

### Specific design changes

| Change | Where | Why |
|---|---|---|
| Use `rust` for secondary CTA / "Featured Build" accent | `Hero.tsx`, `FeaturedBuild.tsx`, `CtaBand.tsx` | Two-color discipline — `lime` = action, `rust` = editorial highlight. |
| Add `warm` surface token (`#1a1815`-ish) | `app/globals.css` `@theme` | A single warm panel for feature/long-form pages; breaks the green monotony. |
| Off-center hero on desktop | `Hero.tsx` | Asymmetric grid; metadata strip down the right side (dateline-style). |
| Replace pinned Manifesto with quote panel | `Manifesto.tsx` | Reclaim the screen real estate; keep the GSAP scroll-fade on a long-form page instead. |
| Replace `InstagramWall` with `FieldNotes` | new `components/home/FieldNotes.tsx` | Editorial control + SEO. Source from `content/notes/*.mdx`. |
| Swap `FuelPumpScene` for SVG/photo parallax | `components/history/FuelPumpScene.tsx` → `HistoryHero.tsx` | -200KB JS, no R3F context, no layout shift. Keep R3F for one *real* 3D moment elsewhere if you want it. |
| Member directory facets | `components/members/MembersBrowser.tsx`, `content/members/*.mdx` frontmatter | Scales past 10–20 members. |
| Multi-step `/join` | `components/join/JoinForm.tsx`, `app/join/actions.ts` | Reads more curated; reduces low-quality applications. |

---

## Phased rollout

Three phases, each independently shippable. Don't merge them — visible progress + safer reviews.

### Phase 1 — Visual rhythm (1–2 sessions)
Goal: home page reads as a magazine, not a scroll.
1. Add `warm` surface token + `rust` accent usage to `Hero` and `CtaBand`.
2. Rebuild `app/page.tsx` to the asymmetric grid above (same components, new layout component wrapping them).
3. Compress `Manifesto` to a quote panel; archive the pinned version as the `/about` hero.
4. Add a Next-Meet *card* component for the hero gutter (the top banner stays for mobile).

**Tools:** `brainstorming` first (Superpowers — talk through the grid before code), `Claude_Preview` for screenshots at 1440 / 768 / 375, `code-review` before pushing, `verify` end-to-end.

### Phase 2 — Editorial templates (2–3 sessions)
Goal: long-form content lives on the site, not on Instagram.
1. Create `content/notes/` and a `/notes/[slug]` route using the existing MDX pipeline (`next-mdx-remote`, `gray-matter`, `MdxComponents`).
2. Build `FieldNotes` home block; remove `InstagramWall` from home but keep it as a `/social` page if you want the feed somewhere.
3. Create `content/drives/` and `/drives/[slug]` with a static route-map SVG (skip Leaflet for now — KISS).
4. Seed 2–3 notes + 1 drive so the templates aren't empty.

**Tools:** `anthropic-skills:docx` / `pdf` if you have drafts in those formats, `xlsx` if you have a drives spreadsheet, `Claude_Preview` for rendering, `security-review` because new routes are new attack surface.

### Phase 3 — Membership flow + directory (1–2 sessions)
Goal: `/join` feels curated; `/members` scales.
1. Convert `JoinForm` to 3 steps with `trigger()` per step. Keep one Zod schema.
2. Add chassis / decade / region facets to `MembersBrowser`. Update member MDX frontmatter to include these fields.
3. Swap `FuelPumpScene` for a parallax SVG/photo hero on `/history`. Drop R3F if no other page uses it (-`three`, -`@react-three/fiber`, -`@react-three/drei` from `package.json` = noticeable bundle win).

**Tools:** `systematic-debugging` (Superpowers) — multi-step forms with smooth scroll are notorious for focus-management bugs. `security-review` for the new form flow. `bundle-analyzer` via `next build --analyze` before/after.

---

## Tools matrix — which skill / MCP / repo for which phase

| Phase | Skill / MCP | Why |
|---|---|---|
| All — before coding | **Superpowers: `brainstorming`** | Refine the design before touching files. |
| All — during | `Claude_Preview` (`preview_screenshot`, `preview_resize`) | Visual checks at responsive breakpoints. |
| All — debugging | **Superpowers: `systematic-debugging`** | GSAP / Lenis interactions across components are layered. |
| Phase 1 | `verify`, `code-review` | Layout changes are visual *and* structural — both matter. |
| Phase 2 | `anthropic-skills:docx` / `pdf` / `xlsx` | If you have offline drafts to import. |
| Phase 2 | `security-review` | New routes = new attack surface. |
| Phase 3 | `security-review` | Multi-step form + server actions. |
| Phase 3 | `Claude_in_Chrome` | Drive the deployed Vercel preview to confirm flows on a real browser. |
| Ongoing | `schedule` | Optional: nightly link-checker, sitemap freshness. |
| Ongoing | `loop` | Optional: weekly refresh of `content/instagram.json` if you keep the social page. |

See `docs/CLAUDE-SKILLS.md` for the full skill catalog.

---

## Risks & non-goals

- **Don't replace the design system.** The tokens and type scale are good. Add `rust` and `warm`, don't reinvent.
- **Don't add a CMS yet.** MDX in-repo is the right speed for ~100 entries. Revisit if the roster crosses 50 actively maintained members.
- **Don't add auth yet.** Member-only sections sound great but are a multi-week detour. Phase 4 candidate.
- **Don't break SEO.** `app/sitemap.ts` and `app/robots.ts` are in place; any new route templates need to register there.
- **Don't lose the reduced-motion respect.** Every new animated section must check `prefers-reduced-motion`, like the existing code does.

---

## Verification per phase

Before each phase is "done":
1. `/run` and walk the changed pages at 375 / 768 / 1440.
2. `Claude_Preview` screenshot of each changed page; eyeball against the previous version.
3. `next build` clean (no new warnings).
4. Lighthouse on the changed page: LCP < 2.5s, CLS < 0.1, no a11y regressions.
5. `/code-review` on the diff at medium effort.
6. `/security-review` if any form, server action, or route added.

---

## Next step

If you want, the natural follow-up is: **invoke `brainstorming` (Superpowers, once installed) to talk through Phase 1's asymmetric grid before any code gets written.** I can also start with a smaller probe — e.g., just introduce `rust` accents on the existing layout — to validate the two-color direction before the bigger restructure.
