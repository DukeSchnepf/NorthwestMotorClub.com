# Claude Skills, MCPs & Repos for Updating NorthwestMotorClub.com

This is a Next.js 16 + App Router + Tailwind v4 + MDX site on Vercel with members/events content, Framer Motion / GSAP / Three.js animations, and Zod-validated forms. The list below is filtered to what's actually useful for *this* stack and content model — not every skill in the catalog.

Each entry says **what it does**, **when you'd reach for it on this site**, and **how to invoke it**.

---

## 1. Daily-driver skills (use these constantly)

| Skill | Use it when | Invoke |
|---|---|---|
| **`run`** | You want to see a change in the actual app (hero animation, member card, MDX page rendering). Starts dev server and opens the page. | `/run` |
| **`verify`** | You think a fix or feature is done and want to confirm it works end-to-end before pushing — runs the app and observes behavior. | `/verify` |
| **`code-review`** | Before you push a non-trivial change. Reviews the current diff for bugs at low/med/high effort. | `/code-review` |
| **`review`** | After a PR is open — full PR review. | `/review` |
| **`security-review`** | Before merging anything that touches forms, redirects, env vars, or auth-ish logic (join, contact). | `/security-review` |

These five cover ~80% of an update session: edit → run → verify → code-review → ship.

---

## 2. Content-import skills (for adding members, events, history)

The site has `content/` (MDX events + members), `instagram.json`, `timeline.json`, and a roster pattern. When new content comes from outside, these turn it into usable data:

| Skill | Use it when |
|---|---|
| **`anthropic-skills:xlsx`** | Member roster, event schedule, or contact list arrives as a spreadsheet. Extract → emit JSON or MDX frontmatter. |
| **`anthropic-skills:docx`** | Press release, club bylaws, or member bio comes as a Word doc. Pull text + structure into MDX. |
| **`anthropic-skills:pdf`** | Event flyer or scanned history doc. Extract text/images for the History or Events pages. |
| **`anthropic-skills:pptx`** | Sponsor deck or event recap deck. Pull slides into a page or extract images. |

You'd typically run one of these, then I'd write the resulting MDX file under `content/events/` or `content/members/`.

---

## 3. Browser & preview MCPs (already connected — visual editing)

These are connected MCPs that let me actually see and drive the site, which matters for an animation-heavy marketing site:

| MCP | What it does |
|---|---|
| **`Claude_Preview`** | Spins up a sandboxed preview of the site, takes screenshots, clicks/fills forms, reads console + network. Best for "show me what this change looks like." |
| **`Claude_in_Chrome`** | Drives your real Chrome browser — navigate live URLs (production, Vercel previews), inspect, screenshot, read console. Best for checking the deployed site. |

Use cases: "screenshot the home page hero on mobile width," "check that the join form posts correctly on the Vercel preview," "read console errors on /events/[slug]."

---

## 4. Workflow & repo-config skills

| Skill | Use it when |
|---|---|
| **`fewer-permission-prompts`** | Right now every `pnpm`, `git`, `next build` triggers a permission prompt. Run this once to allowlist read-only & common commands in `.claude/settings.json`. Recommended early. |
| **`update-config`** | Add hooks (e.g., auto-run lint after edits) or env vars to `.claude/settings.json`. |
| **`init`** | Your `CLAUDE.md` is currently just `@AGENTS.md`. Re-run this if you want a richer project-rules file. |
| **`loop`** | Recurring task — e.g., "every Monday refresh the Instagram JSON." |
| **`schedule`** | Run a remote Claude agent on cron — e.g., nightly link-check or sitemap rebuild. |
| **`keybindings-help`** | Personal CLI ergonomics; unrelated to the site itself. |

---

## 5. Specialized / situational skills

| Skill | When you'd need it |
|---|---|
| **`claude-api`** | Only if you add an AI feature to the site (e.g., a chatbot, an "ask about events" search). The current stack has no Anthropic SDK — skip until then. |
| **`anthropic-skills:skill-creator`** | If you want a custom skill for this repo — e.g., a "new-event" skill that scaffolds an MDX file + adds a media folder + updates sitemap. Worth it once you've done the same multi-step task 3+ times. |
| **`anthropic-skills:consolidate-memory`** | Housekeeping for *my* memory directory — not the site. |
| **`cowork-plugin-management:*`**, **`setup-cowork`** | Only if you bring a teammate into Cowork. |

---

## 6. Superpowers (obra) — the big community plugin ecosystem

`obra/superpowers` is a full agentic-skills framework + software-dev methodology for Claude Code. Installs as a plugin via its marketplace; once installed it auto-clones the community skills into `~/.config/superpowers/skills/` so you can fork and PR new ones.

**Highest-value skills for this site:**
- **`brainstorming`** — activates before code; refines rough ideas through questions, explores alternatives, presents design for validation. Useful for "I want to redo the hero" / "should we add a member directory filter?" before any code gets written.
- **`systematic-debugging`** — 4-phase root-cause process. Pays off on Framer Motion / GSAP / R3F bugs where the symptom is visual but the cause is layered (state → reconciliation → animation timing).
- **`subagent-driven-development`** — fast iteration with a two-stage review loop. Good for landing several small UI changes per session.
- **TDD / collaboration patterns** — less critical here (no test framework wired yet), but worth knowing about.

**The repos:**
| Repo | Purpose |
|---|---|
| `github.com/obra/superpowers` | Core plugin — install this first. |
| `github.com/obra/superpowers-marketplace` | The marketplace you add via `/plugin` to install Superpowers and friends. |
| `github.com/obra/superpowers-skills` | Community-editable skills auto-cloned by the core plugin. Browse to see what's available; fork to add your own. |
| `github.com/obra/superpowers-lab` | Experimental / bleeding-edge skills. Opt-in. |
| `github.com/obra/superpowers-chrome` | Chrome browser control via DevTools Protocol, zero deps. **Note:** overlaps with the `Claude_in_Chrome` MCP you already have — pick one to avoid confusion. |
| `github.com/Hacker0x01/claude-power-user` | Separate "claude-power-user" skills library (HackerOne); worth a skim but not the same project. |

**Install path (when you're ready):** `/plugin` → add marketplace `obra/superpowers-marketplace` → install `superpowers`. After that, `brainstorming` and `systematic-debugging` show up in the skill list alongside the built-ins.

---

## 7. External repos & resources

These aren't skills — they're places to pull patterns, components, or docs from.

### Anthropic / Claude Code
- **`github.com/anthropics/skills`** — Source of truth for the official skill library above. Browse here if you want to see what a skill actually does before invoking it.
- **`github.com/anthropics/claude-code`** — Claude Code itself; release notes & feature flags.
- **`github.com/anthropics/anthropic-cookbook`** — Recipes; mostly API-side, useful only if you add AI features.
- **`/plugin` marketplace** (inside Claude Code) — Browse community plugins. Worth a scan for Next.js / Tailwind / Vercel helpers.

### Next.js 16 (mandatory — see `AGENTS.md`)
- **`node_modules/next/dist/docs/`** — Your `AGENTS.md` explicitly requires reading these *before* writing Next code, because Next 16 has breaking changes vs. training data. I'll always check here first.
- **`nextjs.org/docs`** — Public docs (cross-reference, but local docs win on conflicts).

### Stack-specific (for what's already in `package.json`)
- **Tailwind v4 docs** (`tailwindcss.com/docs/v4-beta`) — v4 uses CSS-first config; no `tailwind.config.ts`.
- **Framer Motion docs** — for animation tweaks.
- **GSAP + Lenis docs** — scroll-driven sequences.
- **`@react-three/fiber` + `drei` docs** — 3D hero/scene work.
- **Zod + React Hook Form** — for `/join` and `/contact` form validation.
- **Vercel Analytics & deployment docs** — already wired via `vercel.json`.

### MCP discovery
- **`mcp-registry`** (already connected) — `search_mcp_registry` and `suggest_connectors` to find MCPs you don't have yet (e.g., Figma → Tailwind, image optimization services, CMS connectors).

---

## Recommended setup order

If you want to get the most value immediately:

1. **`/fewer-permission-prompts`** — stop the prompt flood first.
2. Install **Superpowers** (`/plugin` → `obra/superpowers-marketplace` → install `superpowers`) to unlock `brainstorming` and `systematic-debugging`.
3. **`/run`** once to confirm the dev server boots cleanly under Claude Code.
4. Keep **`/verify`**, **`/code-review`**, **`/security-review`** in muscle memory for any code change.
5. Reach for **`xlsx`/`docx`/`pdf`** the next time you import outside content.
6. Use **`Claude_Preview`** screenshots whenever a change is visual.

---

## Verification

- Open `/run`, `/verify`, `/code-review` from the slash menu — confirm they appear.
- Check `.claude/settings.json` after `/fewer-permission-prompts` runs to see what got allowlisted.
- For MCPs: invoke `mcp__Claude_Preview__preview_list` or `mcp__mcp-registry__list_connectors` to confirm they're live.
