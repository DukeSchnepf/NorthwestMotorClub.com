# NorthwestMotorClub.com — "The Garage" Redesign Design Spec

**Date:** 2026-05-26
**Status:** Design complete — shipped in commits A–D on `main`.
**Brand stewards:** Duke Schnepf

---

## Context

The current site (Next.js 16 + Tailwind v4 + MDX, deployed on Vercel) has a coherent dark editorial design system already in place. The owner wants a redesign that:

- Feels **grand / wow** — "$100k website tips" caliber, not tacky
- **Uses existing assets** — the hero video loop, fleet photo, member ride photos, brand logos
- **Easy to update** — content lives in MDX / JSON so future edits are file-level, no code changes
- **Tells the club's story** — 2018 origins → 2026 restart, same passion, new chapter
- **Photo-driven, not 3D-driven** — every "garage" element uses real photographs as the foundation

The unifying metaphor is **The Garage**: every section is a corner of one editorial space. The fleet photo is the establishing shot, each member is a bay, each drive is a briefing, the story is a road you drive down.

This spec describes the new home page (sections 01–06) plus the site shell (header + footer) that wrap every page. Subpage redesigns (/members/[slug], /events/[slug], /history, /about, /join, /contact) are out of scope for this spec and will be addressed in a follow-up.

---

## Unifying Vision

| Pillar | What it means |
|---|---|
| **The Garage** | Every section sits inside one cohesive editorial space. Photos, bay numbers, dispatch typography, and the lime+rust accents create a consistent vocabulary. |
| **Photo-first** | No 3D models. No drawn cars. The real photos do the heavy lifting; CSS framing makes them feel cinematic. |
| **Editorial, not corporate** | Reads like a print rally book or a club zine, not a configurator. Restrained motion, generous typography, single confident accent for action. |
| **Live and current** | A pulsing rust "LIVE" dot, a next-meet marquee, a countdown to next drive — the site feels active, not archival. |
| **PNW DNA** | Wet asphalt color palette (`#0a0e0c` base, evergreen undertones), Bellevue coordinates, "Cars. Roads. Rain." running through the design. |

---

## Design system updates

### Tokens (`app/globals.css`)

Keep all existing tokens. Add:

```css
--color-warm: #1a1815;       /* warm dark surface (one tier off green-near-black) */
--color-logo-red: #c5132a;   /* matches the brand logo red, used sparingly for glow accents */
```

Activate the existing-but-unused `--color-rust` (#ff7a1a) for **secondary editorial accents** — featured-bay borders, "the restart" callouts, run-number badges. Lime remains the **primary action color**.

Optional add: `Caveat` (Google Fonts) for handwritten polaroid-style photo tags on the timeline. Loaded only on the home page.

### Fonts

| Family | Where used |
|---|---|
| Fraunces (display) | Headlines, year numbers, pull quotes, tagline italic — **already in use** |
| Geist Sans | Body / UI — already in use, keep |
| Geist Mono | All-caps labels, marquees, coordinates, badges — already in use, keep |
| Caveat (optional) | Polaroid photo tags on the Story timeline, optional `<Pull>` decoration |

### Logos (new assets, already saved)

| Path | Use |
|---|---|
| `/public/media/logo/nwmotorclub-icon.jpg` | Favicon, `apple-touch-icon`, social OG fallback, footer micro-mark |
| `/public/media/logo/nwmotorclub-wordmark.jpg` | Hero centerpiece, header brand, footer brand, social OG primary |

**Action item:** request transparent PNG (or SVG) versions of both logos for cleaner production rendering. Current JPGs with carbon-fiber backgrounds work via `mix-blend-mode: screen` but the blend interacts with the video; transparent versions are cleaner.

**Favicon swap:** Move `app/favicon.ico` to `app/favicon.ico.bak` and add `app/icon.png` (or `app/icon.jpg`) using the circular logo. Next.js 16 auto-generates the favicon link from this file.

---

## Section-by-section design

### 01 — Hero (`components/home/Hero.tsx`)

**Goal:** Grand cinematic opening. Wordmark is the focal point, real meet data is one glance away.

**Composition (desktop):**

| Layer | Content |
|---|---|
| Background | Existing `hero-loop.webm` + `.mp4` autoplay/muted/loop/playsinline. `hero-poster.jpg` as LCP fallback (already in place). |
| Effects | Vignette (top + bottom + radial), SVG film grain at 12% opacity overlay (replace inline noise with reusing `components/ui/Grain.tsx`), subtle CRT scanlines at 6% opacity. |
| Letterbox | 38px black bars top + bottom (cinema framing); animate retracted on scroll-out. |
| Top marquee | Crawl: `LIVE · NEXT MEET → {location} · {coords} · PACIFIC NORTHWEST · EST. 2018 · @nwmotorclub · BELLEVUE · ISSAQUAH · HIGHWAY 2`. CSS keyframe `marquee 40s linear infinite`. |
| Headlight cursor | A large radial `screen`-blend glow follows the cursor (~480px). Lime ring + dot replaces native cursor. RAF-driven lerp for smooth follow. **Disabled on touch + when `prefers-reduced-motion`.** |
| Left column | Mono eyebrow ("Pacific Northwest · Est. 2018"), the wordmark image as the headline, italic Fraunces tagline ("Cars. Roads. Rain."), two CTAs (Join the Club primary lime, Upcoming Drives ghost). Wordmark uses `mix-blend-mode: screen` until transparent versions are supplied. |
| Right column | **Dispatch card** — "NEXT BRIEFING" with pulsing rust dot, run number, drive title, location, 2×3 meta grid (Date, Start, Distance, Confirmed, Weather, Coords). Rust placeholder badge when `nextMeet.status === "tba"`. |
| Audio | Bottom-left muted toggle ("Engine + Rain · Muted"). Unmutes to a Howler.js looped engine-hum + rain ambient bed. Default muted, persists choice in `localStorage`. |
| Scroll affordance | Bottom-center "Scroll" label + lime-to-transparent line growing on mount. |

**Reduced motion:** poster image stays, video doesn't play, headlight cursor off, marquee paused, all entrance animations skipped. Pattern already established in the current `Hero.tsx`.

**Mobile:** dispatch card stacks below headline. Letterbox bars shrink to 24px. Marquee speeds up. Headlight cursor disabled.

**New components:**
- `home/HeroEffects.tsx` (vignette + grain + scanlines + letterbox)
- `home/HeroMarquee.tsx` (top crawl, data-driven)
- `home/HeadlightCursor.tsx` (RAF lerp follow + reduced-motion guard)
- `home/NextBriefing.tsx` (dispatch card, reads `lib/site.ts` `nextMeet`)
- `home/AudioToggle.tsx` (Howler.js wrapper, localStorage persistence)

### 02 — Our Story (`components/home/StoryTimeline.tsx` + opening/closing siblings)

**Goal:** Tell the 2018 → 2026 arc as a horizontal road you drive down. Functions as both mission statement and timeline.

**Three movements, top to bottom:**

**A. Mission opening** (`home/MissionOpen.tsx`)
- Left: SECTION 02 / OUR STORY eyebrow, big Fraunces headline that uses strikethrough + accent + rust to visually tell the arc (~"Started in a ~~group chat~~ parking lot. Eight years on. Same passion."), four manifesto lines stacked
- Right: manifesto body, rust-bordered "THE RESTART · 2026" callout with quote, founders list pulled from `lib/site.ts`

**B. Timeline road** (`home/StoryTimeline.tsx`)
- Horizontal filmstrip with **GSAP ScrollTrigger pin + horizontal translate** so vertical scroll = horizontal travel
- One dashed lime road line spans the full strip behind the cards
- 9 year panels: 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, **2026 (restart)**
- Each panel has: photo (or placeholder hatch), chapter label (`— CHAPTER 0X`), huge Fraunces year number, title, body, mile-marker dot on the road
- 2026 panel: rust border, pulsing rust marker, glowing "◯ NOW · WE'RE HERE" lime badge
- Placeholder years get diagonal hatch pattern + rust dashed "◯ Confirm copy" badge
- Optional Caveat-font polaroid tag on each photo (angled rotation)
- Data source: `content/timeline.json` (extend the 5 existing milestones to 9)

**C. Story close** (`home/StoryClose.tsx`)
- Left: "Still chasing the *long way* home." headline + pull quote + two CTAs (Join, Manifesto)
- Right: 2×2 stats grid (8 years / 12 bays / 047 drives / ∞ backroads)

**Reduced motion:** scroll-lock disabled, filmstrip becomes a normal vertical stack of cards.

**Mobile:** Same vertical-stack fallback as reduced-motion (no horizontal scroll-lock on touch).

### 03 — The Fleet (`components/home/BayGrid.tsx`, replaces `FeaturedBuild` + members teaser)

**Goal:** Every member is a bay. Featured bay rotates weekly and earns the largest cell.

**Composition:**
- Section header: SECTION 03 / THE FLEET, "The *Bays*", `07 / 12` occupancy count, "STILL ROOM ON THE ROOFTOP" footer text with live red dot
- **Filter chips** (All / JDM / Euro / Muscle / Classic / Daily / Truck) — driven by MDX `category` field
- **Bay grid** (4 columns desktop, 2 tablet, 1 mobile)
  - Featured bay (`featured: true` in MDX frontmatter) spans 2×2 with photo, rust badge, pull quote from `<Pull>`, larger title
  - Regular bays: photo + bay-number badge + category tag + title + ymm + owner handle
  - Empty bay: dashed border, "Open / Join the club →"
  - Final cell: "See the full roster → /MEMBERS / 12 BAYS · ALL MEMBERS"
- Hover: bay lifts (`translateY(-4px)`), photo scales `1.04`, border turns lime, saturation+contrast bump
- Subtle warm-tinted backdrop (`radial-gradient(ellipse at 30% 0%, rgba(255,122,26,0.04) 0%, transparent 50%)`) to break green-near-black monotony

**Data source:** `content/members/*.mdx`. Add frontmatter fields:
- `bayNumber: 1` (manual, drives ordering)
- `featured: true | false` (manual; only one should be true at a time; later automatable via cron)
- `pull: "Some cars you finish..."` (optional, mirrors existing `<Pull>` body — surfaces in featured bay)

**Photo/MDX mismatch:** existing MDX has multiple PLACEHOLDER comments — `charger-daytona.mdx` maps to `ride-01.jpg` which is actually a Silvia. Implementation must include a one-pass content correction before launch.

### 04 — Upcoming Drives (`components/home/DrivesSection.tsx`, replaces `UpcomingEvents`)

**Goal:** Featured next drive gets cinematic treatment; supporting drives stack below; past drives one click away.

**Composition:**
- Section header: SECTION 04 / DRIVES, "Upcoming *drives*.", live count + source attribution
- **Featured "NEXT UP" card** — large grid, photo left (with overlaid `MMM / DD / YYYY` date stamp in rust), copy right (chapter label with pulsing red dot, title, location in lime mono, blurb from MDX, 3-column meta row: RSVP'd / Start / Forecast, two CTAs)
- **Two compact cards** below — photo-left layout with mini `MMM / DD` date tag, title + where + blurb + footer with RSVP count and link
- **Past drives teaser** — "047 / DRIVES LOGGED" → THE ARCHIVE link

**Data source:** `content/events/*.mdx`. Frontmatter already complete; extend optionally with:
- `runNumber: 048` (auto-numbered globally, or manual)
- `weather: "58°F · Overcast"` (manual; eventually replaceable by Open-Meteo at build time)
- `startTime: "7:30 AM"` (optional)
- `capacity: 80` (optional, surfaces "60/80 RSVP'd")

Sort and slice: filter `status === "upcoming"`, sort by `date` ascending, take 3. First one is "NEXT UP", rest are compact cards.

### 05 — Site Header (`components/site/SiteHeader.tsx` rewrite + `site/NextMeetBanner.tsx`)

**Goal:** Wordmark-first brand identity. Next-meet banner stays as priority #1.

**Structure:**
- Top lime banner (`NextMeetBanner.tsx`) — full-width, ink text. Shows "NEXT MEET" pill + drive title + date · location + start time + arrow. Reads from `lib/site.ts` `nextMeet`. When `status === "tba"`, shows "TBA · {location} · Follow @nwmotorclub"
- Header row (sticky, backdrop-blur `rgba(10,14,12,0.78)` + 1px lime/line border bottom):
  - Brand left: wordmark image (`height: 36px`, `mix-blend-mode: screen`), screen-reader fallback text mark
  - Nav center: Home / About / Drives (`/events`) / Bays (`/members`) / Story (`/history`). Active state = lime 1px underline + lighter text. Hover = lime tint.
  - Actions right: "LIVE · OPEN ROSTER" status pill with pulsing rust dot + lime "Join the Club →" pill button
- Mobile: nav hidden behind hamburger (existing pattern in `SiteHeader.tsx` — keep + restyle)

**Nav rename:** `Events → Drives`, `Builds → Bays`, `History → Story` in `lib/site.ts` `navLinks`. Routes stay the same; only labels change. Update `app/(routes)` page metadata accordingly so breadcrumbs/titles read right.

### 06 — Final CTA + Footer

**A. CTA band** (`components/home/CtaBand.tsx` rewrite)
- Full-bleed `fleet-garage.jpg` at 22% opacity with dual gradient mask (radial + linear) so the photo reads as atmosphere
- Centered eyebrow with lime hairlines, massive Fraunces statement: "Bring the *car* you have." (lime italic on "car")
- Tagline pull from manifesto
- Two CTAs (Join the Club lime, RSVP next drive ghost)
- Bottom strip: pulsing red LIVE dot + next-meet quick info

**B. Footer** (`components/site/Footer.tsx` rewrite)
- Marquee crawl across top edge (coords + tagline + Instagram + EST. 2018 — visual rhyme with hero marquee)
- 5-column main grid (collapses to 1 column mobile):
  - **Brand** — wordmark + tagline + "WHERE WE MEET" areas list from `site.ts contactAreas`
  - **The Club** — About / Our Story / The Roster / Manifesto
  - **Drives** — Upcoming / The Archive / Rooftop Meets / Cascade Runs
  - **Connect** — Join / Contact / Instagram / email (mailto)
  - **The Drop** — newsletter signup ("Get the next-meet briefing in your inbox. One email per drive.") + email input + Subscribe button + Instagram follow link
- Baseline bar: © 2018 – 2026 + "BUILT IN THE PACIFIC NW · NEXT.JS 16 · VERCEL"

**Newsletter provider:** TBD. Implementation can start with a simple `/api/subscribe` route that pushes to a Postmark / Resend / Buttondown endpoint. Storage = a single text file or KV until volume justifies more.

---

## Content model (file-level updates for easy editing)

The owner explicitly requires that future content edits stay file-level. Every section above reads from these files:

| File | Drives | Editor experience |
|---|---|---|
| `lib/site.ts` | Header banner, footer areas, manifesto, founders, next meet | Edit object literals, save, redeploy |
| `content/timeline.json` | Story timeline year cards | Add/edit `milestones[]` entries (year, title, blurb, image) |
| `content/members/*.mdx` | Bay grid + member pages | Copy a file, edit frontmatter, drop photo into `/public/media/members/` |
| `content/events/*.mdx` | Drives section + events pages | Same pattern; set `status: "past"` when done — drive auto-archives |
| `/public/media/**/*` | All photography | Drop a JPG/PNG, reference its path from MDX frontmatter |
| `/public/media/logo/*` | Wordmark + icon site-wide | Replace files, redeploy |

A doc at `docs/EDITING-CONTENT.md` will be created as part of implementation with concrete examples ("how to add a new drive", "how to feature a different bay this week", "how to publish a story chapter").

---

## Technical decisions

### Libraries (current `package.json`)

| Library | Decision |
|---|---|
| `gsap` + `ScrollTrigger` | **Keep.** Used for Story timeline scroll-lock and Hero scroll affordance. |
| `framer-motion` | **Keep.** Micro-interactions, hover states, page-level reveal animations. |
| `lenis` (smooth scroll) | **Keep.** Already wired in `SmoothScroll.tsx`. |
| `three` + `@react-three/fiber` + `@react-three/drei` | **Evaluate.** Used only by `FuelPumpScene.tsx` on `/history`. If `/history` stays as-is in this redesign, keep. If `/history` is rebuilt in a follow-up spec, remove for a ~200KB JS bundle win. |
| `@next/mdx` + `next-mdx-remote` + remark plugins | **Keep.** Core to the content model. |
| `react-hook-form` + `zod` | **Keep.** Used by Join + Contact forms. |
| `sharp` | **Keep.** Server-side image optimization. |
| `@vercel/analytics` | **Keep.** Wired in `layout.tsx`. |

### Libraries to add

| Library | Why | Approx cost |
|---|---|---|
| `howler` | Audio toggle (hero engine-hum + rain ambient) | ~20KB gzipped |

### Optional / Phase D

| Service | Use case |
|---|---|
| Open-Meteo (free, no key) | Live weather injection for dispatch card + drive forecasts |
| Postmark / Resend / Buttondown | "The Drop" newsletter delivery |
| Vercel KV or simple flat file | Newsletter subscriber storage |

### Performance budget

- **LCP < 2.5s** — `hero-poster.jpg` is the LCP candidate (already `priority` in current Hero). Video swaps in after first paint.
- **CLS < 0.1** — all photo containers use `aspect-ratio` or fixed dimensions.
- **Total JS < 250KB gzipped** — achievable if Three.js is removed in a future spec.
- **Mobile**: video does not autoplay below `768px`; poster image only. Marquee runs at 60fps via CSS keyframes (no JS).

### SEO

- All visual content has real HTML behind it — video and effects are progressive enhancement.
- Every bay photo gets MDX-driven alt text (`alt="{ymm}"`).
- Events emit `Event` structured data (JSON-LD via Next.js metadata API or inline `<script type="application/ld+json">`).
- `app/sitemap.ts` and `app/robots.ts` already exist — extend to include new MDX entries.
- OG images: continue using existing `app/opengraph-image.tsx` pattern; new variant per content type.

### Accessibility

- `prefers-reduced-motion: reduce`: video paused, marquee stopped, headlight cursor off, all entrance animations skipped (pattern already in `globals.css` and per-component).
- `prefers-color-scheme`: site is dark-only by design — declared via `colorScheme: "dark"` in `viewport`.
- All interactive elements get `:focus-visible` lime outline (already in `globals.css`).
- Skip-to-content link already in `layout.tsx`.
- ARIA landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>` (mostly already correct).
- Audio is opt-in (muted by default, persists choice).
- Custom cursor — keep the system cursor visible on focus for keyboard users (CSS `:focus-within { cursor: auto; }` on the hero section).

---

## Phasing (implementation order)

### Phase A — Identity & shell (1 session)
1. Save logo files (✅ already done: `/public/media/logo/`)
2. Replace favicon (`app/icon.png` or `.jpg`)
3. Update `app/globals.css` tokens (add `--color-warm`, activate `--color-rust` usage)
4. Update `lib/site.ts` nav labels (Events→Drives, Builds→Bays, History→Story)
5. Rewrite `SiteHeader.tsx` with wordmark + new nav + status pill
6. Rewrite `Footer.tsx` with new 5-column structure + marquee + newsletter signup placeholder

### Phase B — Hero (1 session)
7. Rewrite `Hero.tsx` with wordmark, marquee, dispatch card, layered effects
8. New components: `HeroEffects`, `HeroMarquee`, `HeadlightCursor`, `NextBriefing`, `AudioToggle`
9. Add `howler` dependency
10. Honor `prefers-reduced-motion` throughout

### Phase C — Story + Fleet (1–2 sessions)
11. Extend `content/timeline.json` to 9 entries (2018–2026, placeholders for 2019/2021/2023/2025)
12. Build `MissionOpen`, `StoryTimeline`, `StoryClose` components
13. Wire GSAP ScrollTrigger horizontal scroll-lock on the filmstrip
14. Extend `content/members/*.mdx` frontmatter with `bayNumber`, `featured`, optional `pull`
15. Build `BayGrid.tsx`, replace `FeaturedBuild.tsx` (delete file), refactor `MembersBrowser.tsx` to share components
16. Fix member ↔ photo pairings (the PLACEHOLDER mismatches)

### Phase D — Drives + CTA + composition (1 session)
17. Build `DrivesSection.tsx`, retire `UpcomingEvents.tsx`
18. Rewrite `CtaBand.tsx` with full-bleed photo + tagline composition
19. Wire all sections into `app/page.tsx` in new order
20. Delete `InstagramWall.tsx` from imports (file can stay in repo until verified unused)
21. Performance pass: image optimization, video lazy strategy, Lighthouse audit

### Phase E — Polish (1 session)
22. Audio loop file (engine hum + PNW rain — license-cleared source TBD)
23. Optional: Open-Meteo weather integration for dispatch card
24. Optional: real-meet wiring for `lib/site.ts nextMeet`
25. Cross-browser test (Safari, Firefox, mobile Chrome, iOS)
26. Write `docs/EDITING-CONTENT.md` walkthrough
27. Final review + ship

---

## Open questions / placeholders for Duke

Items requiring owner input before launch:

1. **Confirm "Est. 2018" or "Est. 2019"** — `lib/site.ts` says 2018, legacy site copy says "almost 10 years" implying earlier. Pick one canonical date.
2. **Wire real `nextMeet`** — currently `status: "tba"`. Confirm Spring Rooftop Meet on 2026-06-14 at Lincoln Square Garage, or supply real next meet.
3. **Fill placeholder timeline years** — 2019, 2021, 2023, 2025 in `content/timeline.json`. Even one sentence each + a photo works.
4. **Confirm photo-to-owner pairings** — existing PLACEHOLDER comments in `content/members/*.mdx` (e.g. `charger-daytona.mdx` mapped to a Silvia photo). Either swap covers or rewrite member identities.
5. **Transparent logo versions** — request PNG/SVG export of both logos without the carbon-fiber backdrop. Production-cleaner than the `mix-blend-mode` hack.
6. **Audio approval** — go/no-go on the muted engine hum + rain ambient. If yes, source a license-cleared loop.
7. **Newsletter provider** — pick one (Buttondown / Resend / Postmark / "just an email collection for now")
8. **`/history` page scope** — is it being rebuilt in this redesign or left as-is for a follow-up? Currently uses `FuelPumpScene.tsx` (Three.js) which we can drop entirely if `/history` is also rebuilt.
9. **Run number convention** — start counter at 048 (auto-numbered going forward) or backfill from real club history?
10. **Real RSVP / capacity numbers** — currently mocked. Manual frontmatter for now, or wire to a real system later?

These don't block implementation — placeholders + rust "◯ Confirm" badges are baked into the design so the site can launch with gaps clearly marked.

---

## Verification approach

Per phase:

- `pnpm dev` → walk every page at 1440 / 768 / 375 widths
- Manual screenshots at each breakpoint for the home page after each phase
- `pnpm build` clean (no new warnings)
- Lighthouse audit on the home page: LCP < 2.5s, CLS < 0.1, no a11y regressions
- Code review on each phase's diff before merging
- Security review on Phase E (newsletter form, any new API routes)
- Manual `prefers-reduced-motion` test (DevTools rendering emulation) — confirm video pauses, marquee stops, animations skip, cursor returns to system
- Manual keyboard navigation pass: tab through hero CTAs → header nav → bay grid → drives → footer; confirm focus rings visible throughout
- Test in Safari (the often-overlooked browser for this aesthetic — backdrop-blur and mix-blend-mode can vary)

---

## Out of scope (follow-up specs)

These will get their own specs once the home page is shipped:

- `/members/[slug]` — individual bay drill-down with full build photos, spec table, prior featured weeks
- `/events/[slug]` — drive detail page with route map (Leaflet or static SVG), waypoints, photo essay, RSVP form
- `/history` — full Story timeline as a dedicated page (vs. the home page teaser)
- `/about` — extended manifesto, founder bios, "how to join" walkthrough
- `/join` — multi-step intake form (build out from existing single-form)
- `/contact` — minor refresh to match new shell
- Member-only / gated sections (passwords, accounts) — explicitly deferred
- A CMS migration (Sanity, Contentful, etc.) — explicitly NOT happening; MDX-in-repo is the right speed for this site

---

## Risks

1. **Logo blend hack** — `mix-blend-mode: screen` over a moving video can produce subtle color pulsing. Mitigation: get transparent versions before launch. Acceptable for preview/internal review.
2. **Horizontal scroll-lock on the timeline** — historically the source of "feels janky on Safari" bugs. Mitigation: use the same GSAP ScrollTrigger pattern already proven in the codebase, fall back to vertical stack on `prefers-reduced-motion` and touch devices.
3. **Photo/owner mismatches in MDX** — must be fixed before launch or the site says false things about real members. Mitigation: explicit data-audit step in Phase C.
4. **Custom cursor accessibility** — a hidden native cursor breaks expectations for some users. Mitigation: restore native cursor on `:focus-within` and on touch devices.
5. **Audio autoplay policies** — modern browsers block autoplay-with-sound. Mitigation: audio is opt-in only, no autoplay; toggle persists user choice in localStorage.

