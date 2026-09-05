# Navbar dropdowns + multi-page routing — design

Date: 2026-09-05
Status: approved design, not yet implemented

## Goal

Replace the current flat four-anchor nav with the five-item menu shown in the
reference screenshot — Platforms, Solutions, Industries, About, Insights — where
the first three open dropdown panels, and every dropdown item is a real routed
page with its own URL and drafted copy. Add the two right-hand CTAs, `Talk to
Us` (outlined) and `Request a Demo` (orange fill).

The site is currently a single scrolling page. This introduces routing, so it is
a structural change, not a nav-only one.

## Current state

- Vite + React 19 SPA. Dependencies: `react`, `react-dom`, `gsap`. No router.
- `App.jsx` owns everything: the fixed scroll-progress bar, the fixed grid
  backdrop, `Nav`, thirteen homepage sections, `Footer`, and all eight GSAP refs.
- `Nav.jsx` renders a sticky glass bar with four anchor links and one CTA. Its
  `GLASS` object holds a light and a dark treatment, swapped by `useOverDark`.
- `useGsapTimeline` is homepage-specific. It dereferences `barRef.current`,
  `consoleRef.current` and `ruleRef.current` without null guards, and pins the
  Work section. It must not run on a subpage.
- `useOverDark` queries `document.querySelectorAll('[data-nav-dark]')`, so it is
  page-agnostic already and needs no change.
- Conventions to follow: CSS declaration strings passed through `s()` from
  `lib/style.js`; hover states via the `Hover` component; page copy lives in
  `src/data/content.js`; layout is desktop-only at `min-width:1440px`.

## Information architecture

Thirteen routes.

| Route | Menu | Label |
|---|---|---|
| `/` | — | Home (existing one-pager) |
| `/platforms/ops-console` | Platforms | Ops Console |
| `/platforms/agent-runtime` | Platforms | Agent Runtime |
| `/platforms/integrations` | Platforms | Integrations Layer |
| `/solutions/agentic-ai` | Solutions | Agentic AI & Automation |
| `/solutions/real-estate` | Solutions | Real Estate Automation |
| `/solutions/healthcare` | Solutions | Healthcare & Clinic Automation |
| `/solutions/service-centre` | Solutions | Service Centre Automation |
| `/solutions/productised-systems` | Solutions | Productised Systems |
| `/industries/automotive` | Industries | Automotive |
| `/industries/real-estate` | Industries | Real Estate |
| `/industries/healthcare` | Industries | Healthcare |
| `/about` | About | About (no dropdown) |
| `/insights` | Insights | Insights (no dropdown) |

Solutions and Industries derive from existing `content.js` entries verbatim.
**Platforms is inferred** from `OpsConsole.jsx` and `data/dashboards.js`; its
three items are the least grounded part of this design and the most likely thing
to be revised once the real platform naming is known.

Note the deliberate overlap: Real Estate and Healthcare appear under both
Solutions and Industries. Solutions pages describe *what is built*; Industries
pages describe *who it is for* and lead with proof. They are distinct pages, not
duplicates, and each links to its counterpart.

## Architecture

### Route structure

Add `react-router-dom` — the single new dependency. Rejected alternatives:

- **Hand-rolled history router.** Avoids the dependency but means reimplementing
  link interception, scroll restoration and active-route matching. No gain at
  thirteen routes.
- **Vite multi-page build.** Real separate documents, so every navigation is a
  full page load and the persistent glass nav is lost. Wrong for this design.

### Splitting `App.jsx`

`App.jsx` becomes the router. Its contents split three ways:

- **`Layout`** — the fixed grid backdrop, the scroll-progress bar, `Nav`,
  `<Outlet/>`, `Footer`, and the root `<div>` carrying the base typography and
  `min-width:1440px`. Rendered once as a parent route, so the nav is never
  remounted during navigation.
- **`Home`** (`src/pages/Home.jsx`) — the thirteen existing section components,
  all eight GSAP refs, and the `useGsapTimeline` call. Nothing about the timeline
  changes; it simply moves. Because `gsap.context()` already reverts on unmount,
  navigating away from `/` tears down the Work-section pin and every
  ScrollTrigger correctly, and returning rebuilds them. This cleanup is the main
  reason the timeline must live in `Home` rather than in `Layout`.
- **`useScrollProgress`** — the progress bar is layout chrome but is currently
  driven by the homepage timeline via `barRef`. Extract it into a small hook the
  layout owns, so it works on every page and no ref crosses the layout/page
  boundary. Remove the corresponding `gsap.to(barRef...)` block and the `barRef`
  parameter from `useGsapTimeline`.

Scroll position resets to top on every route change except when following a hash
anchor.

### Pages as data

The eleven dropdown pages share one shape: hero, proof strip, body sections,
closing CTA. They are therefore **data, not components**.

- `src/data/pages.js` — one entry per route, holding the drafted copy. Follows
  the existing `content.js` convention so copy stays in one editable place.
- `src/pages/PageShell.jsx` — renders one entry. Composed of a small number of
  block components (hero, proof strip, prose section, CTA) selected per entry, so
  pages can vary in composition without varying in visual language.
- `About` and `Insights` do not fit that shape and get their own components.

If a page later outgrows the shell, it is promoted to its own component rather
than the shell growing options to accommodate it.

Every new page marks any dark-background region with `data-nav-dark` so the nav's
glass switches correctly, exactly as `Work.jsx` does today.

### The dropdown component

`Nav.jsx` gains a `NavMenu` for trigger-plus-panel. Behaviour:

- **Open on hover**, close on leave with a ~120ms delay so diagonal travel from
  the trigger to the panel does not dismiss it. Hover is safe here because the
  layout is desktop-only.
- The panel reuses the existing `GLASS` light/dark tokens verbatim, so bar and
  panel read as a single material under both backdrops.
- Compact single-column panels — one per menu, sized to its contents. Not a
  full-width mega-menu; that would not match the reference proportions.
- Caret rotates 180° on open.
- The active route's top-level menu item is visually marked.

**Keyboard and ARIA** (in scope, and an addition beyond the current codebase,
which has no keyboard affordances): trigger is a `<button>` with
`aria-expanded` and `aria-haspopup`; Enter/Space and focus open the panel;
Escape closes it and returns focus to the trigger; Up/Down move between items
within an open panel; Tab moves out and closes. `Hover` is mouse-only and is not
sufficient for the trigger, so `NavMenu` manages its own state rather than
wrapping `Hover`.

### CTAs

`Book a working session` is replaced by two buttons. `Talk to Us` is outlined and
routes to `/about#contact`; `Request a Demo` keeps the existing orange fill,
magnet hover (`magnetMove`/`magnetLeave`) and shadow, and routes to `/#book`.
Both use the light/dark glass variants.

## Testing

There is no test infrastructure in the repo, and this design does not add one —
that would be a separate decision. Verification is therefore manual and explicit:

1. `npm run build` succeeds and `npm run lint` is clean.
2. All thirteen routes load directly by URL and via nav click.
3. The homepage timeline still runs: hero intro, counters, card stagger, the
   pinned horizontal Work scroll, and the process spine.
4. Navigate `/` → `/solutions/healthcare` → back to `/`. The Work pin rebuilds
   and does not leave a stuck `position: fixed` element or duplicated
   ScrollTriggers behind. This is the highest-risk regression in the change.
5. The nav's dark glass engages over `Work` on `/` and over any `data-nav-dark`
   region on new pages.
6. Every dropdown opens on hover and on keyboard focus; Escape closes and
   restores focus; the trigger-to-panel diagonal does not dismiss.
7. No console errors from GSAP about null targets on any subpage.

## Out of scope

- Responsive/mobile nav. The site is `min-width:1440px` desktop-only; changing
  that is a separate project.
- Test infrastructure.
- A CMS or real Insights article content. `/insights` is an index of drafted
  entries, not a blog engine.
- Reworking existing homepage sections beyond what the `App.jsx` split requires.

## Risks

- **Platforms taxonomy is invented.** Three routes and three pages of copy rest
  on a guess. Cheapest to correct now, before the copy is written.
- **ScrollTrigger cleanup across navigation** is the main technical risk;
  covered by verification step 4.
- **Drafted copy for eleven pages** is a large volume of invented text. It is
  written in the existing voice from `content.js`, but should be read as a first
  draft for editing rather than final marketing copy.
