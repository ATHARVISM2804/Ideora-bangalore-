# Navbar Dropdowns + Multi-Page Routing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat four-anchor nav with a five-item menu (Platforms, Solutions, Industries, About, Insights) whose first three open dropdowns, and turn every dropdown item into a real routed page with drafted copy.

**Architecture:** Add `react-router-dom`. Split `App.jsx` into a persistent `Layout` (backdrop, nav, footer) and a `Home` page that owns the GSAP timeline, so the homepage-specific ScrollTriggers mount and revert with the route. The eleven dropdown pages are data in `src/data/pages.js` rendered through one `PageShell`; About and Insights are bespoke.

**Tech Stack:** React 19, Vite 8, GSAP 3 (ScrollTrigger), react-router-dom 7, oxlint.

**Spec:** `docs/superpowers/specs/2026-09-05-navbar-dropdowns-routing-design.md`

## Global Constraints

- **Desktop only.** Root container keeps `min-width:1440px`. `index.html` keeps `<meta name="viewport" content="width=1440">`. Do not add responsive breakpoints or a mobile nav.
- **Styling convention.** All inline styles are CSS declaration strings passed through `s()` from `src/lib/style.js`. No CSS modules, no styled-components, no Tailwind.
- **Hover convention.** Hover states use the `Hover` component from `src/components/Hover.jsx`, except the dropdown triggers, which manage their own state (see Task 3).
- **Copy lives in data.** Page copy goes in `src/data/pages.js`, never inline in JSX. Follows the existing `src/data/content.js` convention.
- **Brand tokens, exact values:** ink `#1A1D23`, page `#F1F3F6`, muted `#5A616D`, hairline `#DFE3EA`, accent `#F4601E`, accent-hover `#FF7A3D`, accent-dark-text `#B8400A`.
- **Type:** headings `Archivo, sans-serif` with `font-stretch:125%`; body `Geist, sans-serif`; mono `'JetBrains Mono', monospace`.
- **Layout grid:** `max-width:1400px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px`.
- **Only one new dependency** is permitted: `react-router-dom`. Do not add any other package.
- **Dark regions** must carry `data-nav-dark` so `useOverDark` swaps the nav glass.
- **No test infrastructure.** The repo has none and adding it is out of scope. Every task gates on `npm run build`, `npm run lint`, and explicit browser checks instead of unit tests. Where a step says "verify in browser", actually load the page and confirm — do not assume.

---

## File Structure

**Created:**
- `src/routes.jsx` — route table, the single place routes are declared
- `src/data/nav.js` — nav menu structure; the source of truth for nav, footer, and route generation
- `src/layout/Layout.jsx` — persistent chrome: backdrop, progress bar, Nav, Outlet, Footer
- `src/hooks/useScrollProgress.js` — drives the progress bar on any page
- `src/hooks/useDocumentTitle.js` — sets per-route `<title>` and meta description
- `src/components/NavMenu.jsx` — one dropdown trigger + panel, with keyboard/ARIA
- `src/pages/Home.jsx` — the thirteen existing sections + GSAP refs + timeline
- `src/pages/PageShell.jsx` — renders one `pages.js` entry
- `src/pages/blocks.jsx` — the block components PageShell composes
- `src/pages/About.jsx`, `src/pages/Insights.jsx`, `src/pages/NotFound.jsx`
- `src/data/pages.js` — copy for all eleven shell-rendered pages

**Modified:**
- `src/App.jsx` — becomes the router root only
- `src/sections/Nav.jsx` — dropdowns + two CTAs
- `src/sections/Footer.jsx` — links driven by `nav.js`
- `src/hooks/useGsapTimeline.js` — drop `barRef` (moves to `useScrollProgress`)
- `index.html` — title/description become defaults overridden per route

---

## Task 0: Version control baseline

**Not in the spec — added because the plan calls for per-task commits and `ideora-web` is not a git repository.** If the project is tracked elsewhere, skip this task entirely and drop the commit step from every later task.

**Files:** Create `.git/` (via init)

- [ ] **Step 1: Confirm there is no repository**

Run: `git rev-parse --is-inside-work-tree`
Expected: `fatal: not a git repository`. If it succeeds instead, **skip this whole task.**

- [ ] **Step 2: Verify the working tree builds before changing anything**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean. If it does not, stop and report — do not start work on a broken baseline.

- [ ] **Step 3: Initialise and commit the baseline**

```bash
git init
git add -A
git commit -m "chore: baseline before nav dropdowns and routing"
```

`.gitignore` already exists and covers `node_modules` and `dist`. Confirm neither is staged: `git ls-files | grep -E '^(node_modules|dist)/' | head` should print nothing.

---

## Task 1: Route the app and split App.jsx

The riskiest task. It moves the GSAP timeline without changing it, so any homepage animation regression originates here.

**Files:**
- Modify: `src/App.jsx` (full rewrite, currently 62 lines)
- Create: `src/pages/Home.jsx`, `src/layout/Layout.jsx`, `src/routes.jsx`, `src/hooks/useScrollProgress.js`
- Modify: `src/hooks/useGsapTimeline.js` (remove `barRef`)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `Layout` — default-exported? No: **named export** `export function Layout()`, matching every other component in this repo. Renders `<Outlet/>`.
  - `Home` — `export function Home()`, no props.
  - `useScrollProgress(barRef)` — `(barRef: React.RefObject<HTMLElement>) => void`.
  - `useGsapTimeline(refs)` — refs object **without** `barRef`: `{ rootRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef }`.
  - `router` — default export from `src/routes.jsx`, a `createBrowserRouter` instance.

- [ ] **Step 1: Install the router**

```bash
npm install react-router-dom
```

Verify it is the only addition: `git diff package.json` should show exactly one new dependency line.

- [ ] **Step 2: Extract the progress bar into its own hook**

Create `src/hooks/useScrollProgress.js`:

```js
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Drives the fixed progress bar from whole-document scroll. Previously part of
// useGsapTimeline, which is homepage-only; the bar is layout chrome and has to
// work on every route, so it owns its own trigger against document.body.
export function useScrollProgress(barRef) {
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });
    });

    return () => ctx.revert();
  }, [barRef]);
}
```

Note `fromTo` rather than `to`: the bar must reset to `scaleX: 0` when a new route mounts a shorter page.

- [ ] **Step 3: Remove the progress bar from the homepage timeline**

In `src/hooks/useGsapTimeline.js`, delete `barRef` from the destructured `refs` object, delete the whole `gsap.to(barRef.current, {...})` block (the first tween in the context, driving `scaleX`), and remove `barRef` from the `useLayoutEffect` dependency array. Change nothing else in the file.

- [ ] **Step 4: Create the Home page from the current App body**

Create `src/pages/Home.jsx`. Move the thirteen section imports, the seven remaining refs, the `useGsapTimeline` call, and the section JSX out of `App.jsx` verbatim:

```jsx
import { useRef } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { Hero } from '../sections/Hero';
import { Problem } from '../sections/Problem';
import { Services } from '../sections/Services';
import { Industries } from '../sections/Industries';
import { Work } from '../sections/Work';
import { Voices } from '../sections/Voices';
import { Credibility } from '../sections/Credibility';
import { Engagement } from '../sections/Engagement';
import { Process } from '../sections/Process';
import { ProcessResults } from '../sections/ProcessResults';
import { Closing } from '../sections/Closing';

export function Home() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const ruleRef = useRef(null);
  const consoleRef = useRef(null);
  const spineRef = useRef(null);

  useDocumentTitle(
    'Ideora Labs — Systems that finish the job.',
    'Ideora Labs builds agentic AI that works inside your existing operations. It books, checks, approves, updates, and reports without anyone chasing it.',
  );
  useGsapTimeline({ rootRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef });

  return (
    <div ref={rootRef}>
      <Hero consoleRef={consoleRef} />
      <Problem />
      <Services />
      <Industries />
      <Work pinRef={pinRef} trackRef={trackRef} railRef={railRef} />
      <Voices />
      <Credibility />
      <Engagement ruleRef={ruleRef} />
      <Process spineRef={spineRef} />
      <ProcessResults />
      <Closing />
    </div>
  );
}
```

`rootRef` stays on a wrapper div because `useGsapTimeline` scopes every selector query to it (`root.querySelectorAll`) and passes it to `gsap.context(fn, root)`. Without the wrapper, its selectors find nothing. `Footer` is **not** here — it moves to `Layout`.

Task 11 creates `useDocumentTitle`. Until then this import fails, so create a temporary stub now — `export function useDocumentTitle() {}` in `src/hooks/useDocumentTitle.js` — and replace it in Task 11.

- [ ] **Step 5: Create the Layout**

Create `src/layout/Layout.jsx`:

```jsx
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { s } from '../lib/style';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Nav } from '../sections/Nav';
import { Footer } from '../sections/Footer';

export function Layout() {
  const barRef = useRef(null);
  useScrollProgress(barRef);

  return (
    <div style={s('background:#F1F3F6; color:#1A1D23; font-family:Geist, sans-serif; font-weight:400; font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased; min-width:1440px; overflow-x:clip; position:relative')}>

      {/* Scroll progress bar */}
      <div ref={barRef} style={s('position:fixed; top:0; left:0; right:0; height:3px; background:#F4601E; transform:scaleX(0); transform-origin:0 50%; z-index:90')} />

      {/* Fixed grid backdrop, faded out below the fold */}
      <div style={s('position:fixed; inset:0; z-index:0; pointer-events:none')}>
        <div style={s('position:absolute; inset:0; background-image:linear-gradient(rgba(26,29,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,29,35,0.04) 1px, transparent 1px); background-size:80px 80px; mask-image:linear-gradient(180deg,#000,transparent 55%); -webkit-mask-image:linear-gradient(180deg,#000,transparent 55%)')} />
      </div>

      <div style={s('position:relative; z-index:10')}>
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Add scroll restoration**

React Router does not reset scroll on navigation. Add to `src/layout/Layout.jsx`, above `Layout`:

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Router keeps scroll position across navigations; reset it, unless the target
// is a hash anchor. ScrollTrigger.refresh() is required because the Work
// section's pin measures against a document height that just changed.
function useRouteScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname, hash]);
}
```

Call `useRouteScrollReset()` as the first line of `Layout`.

- [ ] **Step 7: Create the route table**

Create `src/routes.jsx`. Only `/` exists at this stage; Task 5 adds the rest.

```jsx
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);

export default router;
```

- [ ] **Step 8: Reduce App.jsx to the router root**

Replace the entire contents of `src/App.jsx`:

```jsx
import { RouterProvider } from 'react-router-dom';
import router from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 9: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean. A `react/rules-of-hooks` error here usually means `useRouteScrollReset` was defined inside `Layout` rather than beside it.

- [ ] **Step 10: Verify the homepage is unchanged**

Run `npm run dev`, open `/`, and confirm each of these — this is the regression gate for the whole plan:

1. Hero words stagger up on load; the console panel rises and fades in.
2. The orange progress bar fills as you scroll and is empty at the top.
3. Counters count up when their section enters view.
4. Section headings and cards animate in on scroll.
5. The Work section pins and scrolls horizontally, and its rail indicator grows.
6. The nav glass turns dark over Work and returns to light after it.
7. The process spine draws in; process cards slide in alternating from left and right.
8. Console shows no errors or GSAP warnings.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "refactor: split App into Layout and Home, add router"
```

---

## Task 2: Nav data model

One structure drives the nav, the footer, and the route table, so they cannot drift apart.

**Files:** Create `src/data/nav.js`

**Interfaces:**
- Produces:
  - `MENUS` — `Array<{ label: string, path: string | null, items: Array<{ label: string, path: string, blurb: string }> }>`. `items` is `[]` for menus without a dropdown; `path` is `null` for menus that only open a dropdown and are not themselves a link.
  - `ALL_PAGE_PATHS` — `string[]`, every path under a dropdown. Used by Task 5 to assert `pages.js` is complete.

- [ ] **Step 1: Create the file**

```js
// Single source of truth for the nav, the footer link columns, and the route
// table. Adding a page means adding it here and adding its copy to pages.js;
// PageShell asserts the two stay in sync.
//
// Real Estate and Healthcare appear under both Solutions and Industries by
// design: Solutions describes what gets built, Industries describes who it is
// for. The pages cross-link rather than duplicate.

export const MENUS = [
  {
    label: 'Platforms',
    path: null,
    items: [
      { label: 'Ops Console', path: '/platforms/ops-console', blurb: 'One record of every job, queue, and exception.' },
      { label: 'Agent Runtime', path: '/platforms/agent-runtime', blurb: 'Where the agents run, retry, and hand off.' },
      { label: 'Integrations Layer', path: '/platforms/integrations', blurb: 'Into your stack. No rip and replace.' },
    ],
  },
  {
    label: 'Solutions',
    path: null,
    items: [
      { label: 'Agentic AI & Automation', path: '/solutions/agentic-ai', blurb: 'Agents that complete work end to end.' },
      { label: 'Real Estate Automation', path: '/solutions/real-estate', blurb: 'Every enquiry qualified before an agent sees it.' },
      { label: 'Healthcare & Clinic Automation', path: '/solutions/healthcare', blurb: 'Intake and coverage settled before arrival.' },
      { label: 'Service Centre Automation', path: '/solutions/service-centre', blurb: 'Bookings answered in seconds, not shifts.' },
      { label: 'Productised Systems', path: '/solutions/productised-systems', blurb: 'Fixed scope, fixed window, run for you.' },
    ],
  },
  {
    label: 'Industries',
    path: null,
    items: [
      { label: 'Automotive', path: '/industries/automotive', blurb: 'Service centres and dealer groups.' },
      { label: 'Real Estate', path: '/industries/real-estate', blurb: 'Brokerages and developers.' },
      { label: 'Healthcare', path: '/industries/healthcare', blurb: 'Clinics and multi-site providers.' },
    ],
  },
  { label: 'About', path: '/about', items: [] },
  { label: 'Insights', path: '/insights', items: [] },
];

export const ALL_PAGE_PATHS = MENUS.flatMap((m) => m.items.map((i) => i.path));
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/data/nav.js
git commit -m "feat: add nav data model"
```

---

## Task 3: NavMenu dropdown component

**Files:** Create `src/components/NavMenu.jsx`

**Interfaces:**
- Consumes: `MENUS` item shape from Task 2 (`{ label, path, items }`); the `GLASS` palette shape from `Nav.jsx` (Task 4 passes it in).
- Produces: `NavMenu({ menu, glass, active })` where `glass` is `{ link, linkHover, panel, panelItemHover }` (all strings) and `active: boolean` marks the menu containing the current route.

Requirements this component must meet:
- Opens on pointer enter, closes on pointer leave after a **120ms** delay so the diagonal from trigger to panel does not dismiss it. Re-entering within the delay cancels the close.
- Trigger is a `<button>` carrying `aria-expanded` and `aria-haspopup="true"`.
- Enter, Space, and ArrowDown open the panel and focus its first item.
- Escape closes the panel and returns focus to the trigger.
- ArrowUp/ArrowDown move between items while open; the list does not wrap.
- Tab out of the panel closes it.
- Caret rotates 180° when open.
- Only one menu may be open at a time — leaving one and entering another swaps immediately.

- [ ] **Step 1: Write the component**

```jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { s } from '../lib/style';

const CLOSE_DELAY = 120;

export function NavMenu({ menu, glass, active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);

  // A bare timeout would keep firing after unmount during a route change.
  useEffect(() => () => clearTimeout(timer.current), []);

  const cancelClose = () => clearTimeout(timer.current);
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const focusItem = (i) => {
    const clamped = Math.max(0, Math.min(i, menu.items.length - 1));
    itemRefs.current[clamped]?.focus();
  };

  const openAndFocusFirst = () => {
    setOpen(true);
    requestAnimationFrame(() => focusItem(0));
  };

  const close = ({ refocus }) => {
    cancelClose();
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      openAndFocusFirst();
    } else if (e.key === 'Escape') {
      close({ refocus: false });
    }
  };

  const onItemKeyDown = (e, i) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(i + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(i - 1); }
    else if (e.key === 'Escape') { e.preventDefault(); close({ refocus: true }); }
    else if (e.key === 'Tab') { close({ refocus: false }); }
  };

  return (
    <div
      style={s('position:relative')}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onKeyDown={onTriggerKeyDown}
        onClick={() => (open ? close({ refocus: false }) : setOpen(true))}
        style={s(`display:flex; align-items:center; gap:6px; border:0; background:${open ? 'rgba(26,29,35,0.06)' : 'transparent'}; cursor:pointer; font-family:inherit; color:${active ? '#F4601E' : glass.link}; font-size:14px; font-weight:500; padding:8px 14px; border-radius:12px; transition:color .3s, background .3s`)}
      >
        {menu.label}
        <span
          aria-hidden="true"
          style={s(`display:inline-block; font-size:10px; line-height:1; transform:rotate(${open ? 180 : 0}deg); transition:transform .25s ease`)}
        >▾</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={menu.label}
          style={s(`position:absolute; top:calc(100% + 10px); left:0; min-width:280px; padding:8px; border-radius:16px; backdrop-filter:blur(30px) saturate(190%); -webkit-backdrop-filter:blur(30px) saturate(190%); z-index:80; ${glass.panel}`)}
        >
          {menu.items.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              ref={(el) => { itemRefs.current[i] = el; }}
              onKeyDown={(e) => onItemKeyDown(e, i)}
              onClick={() => close({ refocus: false })}
              style={s(`display:block; padding:10px 12px; border-radius:11px; text-decoration:none; transition:background .2s`)}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, s(glass.panelItemHover))}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={s(`display:block; color:${glass.link}; font-size:14px; font-weight:500; margin-bottom:2px`)}>{item.label}</span>
              <span style={s('display:block; color:#5A616D; font-size:12px; line-height:1.4')}>{item.blurb}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

The panel is rendered inside the same hover container as the trigger with only a 10px visual gap and no gap in the hover region, so the pointer never crosses dead space.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: clean. Not yet rendered anywhere; Task 4 wires it in.

- [ ] **Step 3: Commit**

```bash
git add src/components/NavMenu.jsx
git commit -m "feat: add NavMenu dropdown with keyboard support"
```

---

## Task 4: Rewrite Nav with dropdowns and two CTAs

**Files:** Modify `src/sections/Nav.jsx`

**Interfaces:**
- Consumes: `MENUS` (Task 2), `NavMenu` (Task 3).
- Produces: the extended `GLASS` object gains `panel` and `panelItemHover` keys on both `light` and `dark`.

- [ ] **Step 1: Extend the GLASS palette**

Add to `GLASS.light`:

```js
    panel: 'border:1px solid rgba(255,255,255,0.6); background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.72)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.95), 0 26px 60px -30px rgba(26,29,35,0.5)',
    panelItemHover: 'background:rgba(26,29,35,0.06)',
```

Add to `GLASS.dark`:

```js
    panel: 'border:1px solid rgba(255,255,255,0.16); background:linear-gradient(180deg, rgba(46,51,60,0.9), rgba(26,29,35,0.8)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.16), 0 26px 60px -30px rgba(0,0,0,0.9)',
    panelItemHover: 'background:rgba(255,255,255,0.1)',
```

- [ ] **Step 2: Replace the LINKS constant with the nav data import**

Delete the `LINKS` array entirely. Add `import { MENUS } from '../data/nav';`, `import { NavMenu } from '../components/NavMenu';`, and `import { Link, useLocation } from 'react-router-dom';`.

Inside `Nav`, below the existing `const g = ...` line, add:

```jsx
  const { pathname } = useLocation();
  // A menu is active when the current route is one of its items, or is the
  // menu's own path. Matched by exact path, not prefix: /solutions/real-estate
  // and /industries/real-estate must not both light up.
  const isActive = (menu) =>
    menu.path === pathname || menu.items.some((i) => i.path === pathname);
```

- [ ] **Step 3: Replace the nav body**

Replace the `<nav>` element's children:

```jsx
          <nav style={s('display:flex; align-items:center; gap:4px')}>
            {MENUS.map((menu) => (
              menu.items.length > 0
                ? <NavMenu key={menu.label} menu={menu} glass={g} active={isActive(menu)} />
                : (
                  <Hover
                    key={menu.label}
                    as={Link}
                    to={menu.path}
                    style={`color:${isActive(menu) ? '#F4601E' : g.link}; font-size:14px; font-weight:500; padding:8px 14px; border-radius:12px; text-decoration:none; transition:color .3s, background .3s`}
                    hoverStyle={g.linkHover}
                  >{menu.label}</Hover>
                )
            ))}

            <Hover
              as={Link}
              to="/about#contact"
              style={`margin-left:10px; padding:9px 17px; border-radius:13px; border:1px solid ${g.link}; color:${g.link}; font-size:14px; font-weight:500; text-decoration:none; transition:color .25s, background .25s, border-color .25s`}
              hoverStyle={g.linkHover}
            >Talk to Us</Hover>

            <Hover
              as={Link}
              to="/#book"
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
              style="margin-left:8px; padding:10px 18px; border-radius:13px; background:#F4601E; color:#1A1D23; font-size:14px; font-weight:500; text-decoration:none; box-shadow:0 10px 26px -14px rgba(244,96,30,0.95); transition:transform .18s ease-out, background .25s"
              hoverStyle="background:#FF7A3D"
            >Request a Demo</Hover>
          </nav>
```

`Hover` passes unknown props straight through to `as`, so `to` reaches `Link` correctly.

- [ ] **Step 4: Point the logo at the home route**

Change `<a href="#top">` to `<Link to="/">` and close it with `</Link>`.

- [ ] **Step 5: Build and lint**

Run: `npm run build && npm run lint`
Expected: clean.

- [ ] **Step 6: Verify in browser**

Dropdown links 404 until Task 5 — that is expected here. Confirm:
1. All five labels render; Platforms, Solutions, Industries show carets.
2. Hovering a menu opens its panel; moving diagonally into the panel keeps it open.
3. Moving off closes it after a short delay.
4. Tab to a trigger, press Enter — panel opens, first item focused. Arrow keys move. Escape closes and focus returns to the trigger.
5. Scroll to Work: bar **and open panel** both switch to dark glass.
6. Both CTAs render; Request a Demo keeps its magnet pull.
7. Active marking cannot be checked yet (no subpages exist until Task 5); it is verified in Task 12, Step 5.

- [ ] **Step 7: Commit**

```bash
git add src/sections/Nav.jsx
git commit -m "feat: nav dropdowns and dual CTAs"
```

---

## Task 5: PageShell, blocks, and the remaining routes

**Files:** Create `src/pages/blocks.jsx`, `src/pages/PageShell.jsx`, `src/pages/NotFound.jsx`; modify `src/routes.jsx`

**Interfaces:**
- Consumes: `ALL_PAGE_PATHS` (Task 2), `PAGES` (Task 6 — create the file with a single entry now, fill it in Tasks 6-8).
- Produces:
  - `PAGES` entry shape, which Tasks 6, 7 and 8 must follow exactly:

```js
{
  path: '/solutions/healthcare',        // must match a path in nav.js
  title: 'Healthcare & Clinic Automation',  // document title (site name appended)
  description: '...',                    // meta description, 1 sentence
  eyebrow: 'Solutions',                  // mono label above the h1
  heading: '...',                        // h1, max ~9 words
  lede: '...',                           // 1-2 sentences under the h1
  proof: [{ label: '...', value: '...' }],       // 3-4 items, the mono strip
  sections: [{ title: '...', body: '...' }],     // 2-4 prose blocks
  related: [{ label: '...', path: '...' }],      // cross-links, may be []
  cta: { heading: '...', body: '...' },          // closing panel, dark
}
```

  - `PageShell({ page })`, `NotFound()`.

- [ ] **Step 1: Write the block components**

Create `src/pages/blocks.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { s } from '../lib/style';

const MONO = "font-family:'JetBrains Mono', monospace";
const WRAP = 'max-width:1400px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px';

export function PageHero({ eyebrow, heading, lede }) {
  return (
    <section style={s('padding:64px 0 96px')}>
      <div style={s(WRAP)}>
        <div style={s('grid-column:1 / span 8')}>
          <div data-anim="hero-1" style={s(`display:inline-flex; align-items:center; gap:9px; padding:8px 15px; border-radius:99px; border:1px solid rgba(26,29,35,0.08); background:#FFFFFF; ${MONO}; font-size:12px; color:#5A616D`)}>{eyebrow}</div>
          <h1 data-anim="head" style={s('margin:28px 0 0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:64px; line-height:0.98; letter-spacing:-0.035em')}>{heading}</h1>
          <p style={s('margin:24px 0 0; max-width:52ch; font-size:18px; color:#5A616D')}>{lede}</p>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip({ items }) {
  return (
    <section style={s('padding:0 0 96px')}>
      <div style={s(WRAP)}>
        <div style={s(`grid-column:1 / span 12; display:grid; grid-template-columns:repeat(${items.length}, 1fr); gap:20px; border-top:1px solid #DFE3EA; border-bottom:1px solid #DFE3EA; padding:28px 0`)}>
          {items.map((it) => (
            <div key={it.label}>
              <div style={s(`${MONO}; font-size:12px; color:#5A616D`)}>{it.label}</div>
              <div style={s('margin-top:8px; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:22px; letter-spacing:-0.02em')}>{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProseSections({ sections }) {
  return (
    <section style={s('padding:0 0 120px')}>
      <div style={s(WRAP)}>
        {sections.map((sec) => (
          <div key={sec.title} data-anim="card" style={s('grid-column:1 / span 12; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px; padding:40px 0; border-top:1px solid #DFE3EA')}>
            <h2 style={s('grid-column:1 / span 4; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:30px; line-height:1.05; letter-spacing:-0.03em')}>{sec.title}</h2>
            <p style={s('grid-column:6 / span 7; margin:0; font-size:17px; color:#5A616D')}>{sec.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Related({ items }) {
  if (!items.length) return null;
  return (
    <section style={s('padding:0 0 120px')}>
      <div style={s(WRAP)}>
        <div style={s('grid-column:1 / span 12')}>
          <div style={s(`${MONO}; font-size:12px; color:#5A616D; margin-bottom:16px`)}>related</div>
          <div style={s('display:flex; gap:12px; flex-wrap:wrap')}>
            {items.map((it) => (
              <Link key={it.path} to={it.path} style={s('padding:10px 16px; border-radius:99px; border:1px solid rgba(26,29,35,0.1); background:#FFFFFF; color:#1A1D23; font-size:14px; text-decoration:none')}>{it.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageCta({ heading, body }) {
  return (
    <section style={s('padding:0 0 160px')}>
      <div style={s(WRAP)}>
        <div data-nav-dark style={s('grid-column:1 / span 12; border-radius:24px; background:#1A1D23; color:#F1F3F6; padding:64px 56px; display:flex; align-items:center; justify-content:space-between; gap:40px')}>
          <div>
            <h2 style={s('margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:36px; line-height:1.05; letter-spacing:-0.03em')}>{heading}</h2>
            <p style={s('margin:16px 0 0; max-width:52ch; color:#C6CCD6')}>{body}</p>
          </div>
          <Link to="/#book" style={s('flex:none; padding:14px 24px; border-radius:13px; background:#F4601E; color:#1A1D23; font-size:15px; font-weight:500; text-decoration:none; box-shadow:0 10px 26px -14px rgba(244,96,30,0.95)')}>Request a Demo</Link>
        </div>
      </div>
    </section>
  );
}
```

`PageCta` carries `data-nav-dark`, so the nav glass switches over it exactly as it does over `Work`.

- [ ] **Step 2: Write PageShell**

Create `src/pages/PageShell.jsx`:

```jsx
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHero, ProofStrip, ProseSections, Related, PageCta } from './blocks';

export function PageShell({ page }) {
  useDocumentTitle(`${page.title} — Ideora Labs`, page.description);

  return (
    <div>
      <PageHero eyebrow={page.eyebrow} heading={page.heading} lede={page.lede} />
      <ProofStrip items={page.proof} />
      <ProseSections sections={page.sections} />
      <Related items={page.related} />
      <PageCta heading={page.cta.heading} body={page.cta.body} />
    </div>
  );
}
```

- [ ] **Step 3: Write NotFound**

Create `src/pages/NotFound.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { s } from '../lib/style';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('Not found — Ideora Labs', 'That page does not exist.');

  return (
    <section style={s('padding:160px 0 200px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <h1 style={s('margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:64px; letter-spacing:-0.035em')}>Not found</h1>
        <p style={s('margin:20px 0 0; color:#5A616D')}>That page does not exist.</p>
        <Link to="/" style={s('display:inline-block; margin-top:28px; color:#F4601E; text-decoration:none')}>Back to home</Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create the pages data file with one real entry**

Create `src/data/pages.js` with **only** the `/platforms/ops-console` entry, fully written, as the reference other entries copy in shape. Tasks 6-8 add the other ten.

```js
// Copy for every page rendered through PageShell. One entry per path in
// nav.js — PageShell's route generation asserts the two lists match.
//
// This is drafted copy written in the voice of content.js. Read it as a first
// draft for editing, not as final marketing text.

export const PAGES = [
  {
    path: '/platforms/ops-console',
    title: 'Ops Console',
    description: 'One operational record every team reads from: jobs, queues, agents, and the exceptions that need a person.',
    eyebrow: 'Platforms',
    heading: 'A queue management can read on a Monday',
    lede: 'The console is the single place your operation is visible. Every job an agent completed, every record it touched, and every exception it could not resolve, in one view that does not need a weekly export to be trusted.',
    proof: [
      { label: 'Refresh', value: 'Live' },
      { label: 'Agents online', value: '12 / 12' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Exceptions today', value: '2' },
    ],
    sections: [
      { title: 'One record, not five tabs', body: 'Bookings, approvals, intake and follow-ups land in the same queue regardless of which system they originated in. Nobody reconciles spreadsheets to find out what happened yesterday.' },
      { title: 'Exceptions are the interface', body: 'Agents complete the routine work silently. The console surfaces only what needs judgement, named and attributed, so a supervisor works a short list instead of auditing a long one.' },
      { title: 'Reporting that matches reality', body: 'The numbers on the dashboard are the same records the agents wrote. There is no separate reporting pipeline to fall out of sync with the operation it describes.' },
    ],
    related: [
      { label: 'Agent Runtime', path: '/platforms/agent-runtime' },
      { label: 'Integrations Layer', path: '/platforms/integrations' },
    ],
    cta: {
      heading: 'See the console against your own queue',
      body: 'We will run a scope call, map your handoffs, and show the console populated with the work your team does today.',
    },
  },
];
```

- [ ] **Step 5: Generate the routes from the data**

Replace `src/routes.jsx`:

```jsx
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { PageShell } from './pages/PageShell';
import { NotFound } from './pages/NotFound';
import { PAGES } from './data/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...PAGES.map((page) => ({
        path: page.path.slice(1),
        element: <PageShell page={page} />,
      })),
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
```

- [ ] **Step 6: Add the completeness check**

Append to `src/data/pages.js`:

```js
import { ALL_PAGE_PATHS } from './nav';

// Fails loudly in dev if nav.js and pages.js drift apart. A menu item with no
// copy would otherwise silently render the 404 page.
if (import.meta.env.DEV) {
  const written = new Set(PAGES.map((p) => p.path));
  const missing = ALL_PAGE_PATHS.filter((p) => !written.has(p));
  if (missing.length) console.warn('[pages] no copy yet for:', missing.join(', '));
}
```

Move the `import` to the top of the file — ES module imports must precede other statements.

- [ ] **Step 7: Build, lint, verify**

Run: `npm run build && npm run lint`, then `npm run dev`.
Expected: `/platforms/ops-console` renders fully. The console warns about the ten missing pages. Those ten menu items land on the 404 page — correct for now. Navigating `/` → the new page → back to `/` rebuilds the Work pin cleanly with no stuck fixed element.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: PageShell, blocks, and data-driven routes"
```

---

## Task 6: Platforms copy

**Files:** Modify `src/data/pages.js`

**Interfaces:** Consumes the entry shape from Task 5. Produces two more entries.

- [ ] **Step 1: Write `/platforms/agent-runtime`**

Follow the Task 5 entry shape exactly — all ten keys. `eyebrow: 'Platforms'`. Subject: where agents execute, how they retry, how work hands off between them, and how a failed step becomes a named exception rather than a silent drop. Draw factual claims only from `src/data/content.js` (`STATS`, `FACTS`) and `src/data/dashboards.js` — specifically `agent: 'service_centre_agent'`, `online: ['12','12']`, and the 99.98% uptime figure. `related` links to Ops Console and Integrations Layer.

- [ ] **Step 2: Write `/platforms/integrations`**

Same shape. `eyebrow: 'Platforms'`. Subject: connecting to the systems already in place. The governing claim, from `FACTS` in `content.js`, is **"Your existing stack. No rip and replace."** and the `PROOF` figure **0 systems ripped out**. `related` links to Ops Console and Agent Runtime.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint && npm run dev`
Expected: all three Platforms pages render; the dev warning now lists eight missing pages. Check each page's `<title>` in the browser tab.

- [ ] **Step 4: Commit**

```bash
git add src/data/pages.js
git commit -m "content: platforms pages"
```

---

## Task 7: Solutions copy

**Files:** Modify `src/data/pages.js`

- [ ] **Step 1: Write all five Solutions entries**

Paths `/solutions/agentic-ai`, `/solutions/real-estate`, `/solutions/healthcare`, `/solutions/service-centre`, `/solutions/productised-systems`. `eyebrow: 'Solutions'` on each.

Each corresponds to one entry in the `SERVICES` array in `src/data/content.js` (codes 01-05, in that order). **Use the existing `title` and `delivers` text as the basis** — `delivers` is the strongest source for the `lede`. Do not contradict it.

Cross-linking, which is the point of having both Solutions and Industries:
- `/solutions/real-estate` → related includes `/industries/real-estate`
- `/solutions/healthcare` → related includes `/industries/healthcare`
- `/solutions/service-centre` → related includes `/industries/automotive`
- `/solutions/agentic-ai` and `/solutions/productised-systems` → related links to two sibling solutions

`proof` items must come from `STATS` or `PROOF` in `content.js` (40s median task completion, 0 human touches per booking, 6 weeks to first system live, 12/12 agents online). Do not invent new metrics.

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint && npm run dev`
Expected: all five render, dev warning lists three missing. Click every Solutions dropdown item and confirm it reaches the right page.

- [ ] **Step 3: Commit**

```bash
git add src/data/pages.js
git commit -m "content: solutions pages"
```

---

## Task 8: Industries copy

**Files:** Modify `src/data/pages.js`

- [ ] **Step 1: Write all three Industries entries**

Paths `/industries/automotive`, `/industries/real-estate`, `/industries/healthcare`. `eyebrow: 'Industries'` on each.

These lead with **proof**, not capability — that is what separates them from their Solutions counterparts. Source material:
- `INDUSTRIES` in `content.js` for names and framing.
- The `CASES` array in `content.js` for the outcome headline of each vertical: automotive "Service bookings answered in seconds, not shifts", real estate "Every enquiry qualified before an agent sees it", healthcare "Intake and coverage settled before arrival".
- `DASHBOARDS` in `src/data/dashboards.js` for per-vertical operational detail. Note its `status` field: **only these three verticals are marked `live`.** Do not claim live deployments in any other sector.

Each `related` array links to its Solutions counterpart (`/solutions/service-centre` for automotive, `/solutions/real-estate`, `/solutions/healthcare`).

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint && npm run dev`
Expected: all three render. **The dev console warning must now be gone** — that is the signal `pages.js` covers every nav item.

- [ ] **Step 3: Commit**

```bash
git add src/data/pages.js
git commit -m "content: industries pages"
```

---

## Task 9: About page

**Files:** Create `src/pages/About.jsx`; modify `src/routes.jsx`

About does not fit the shell — it needs a contact target for the `Talk to Us` CTA, which routes to `/about#contact`.

**Interfaces:** Produces `About()`. Requires an element with `id="contact"`.

- [ ] **Step 1: Build the page**

Compose it from the existing blocks plus a bespoke contact section. Use `PageHero` and `ProseSections` from `blocks.jsx`; do not duplicate their markup. Content sources: `FACTS` in `content.js` (verticals live, deployment window, engagement model, built on) for a proof strip, and the existing `Credibility.jsx` section for tone. The contact section must carry `id="contact"` and surface `work@ideoralabs.com` and `Pune · Dubai`, matching `Footer.jsx`.

Call `useDocumentTitle('About — Ideora Labs', <one-sentence description>)`.

- [ ] **Step 2: Register the route**

In `src/routes.jsx`, add `{ path: 'about', element: <About /> }` to the children array, **before** the `{ path: '*' }` entry.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint && npm run dev`
Expected: `/about` renders. Clicking `Talk to Us` from any page navigates to `/about` **and scrolls to the contact section** — this exercises the hash branch of `useRouteScrollReset` from Task 1, Step 6. If it navigates but does not scroll, that branch is broken.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: about page"
```

---

## Task 10: Insights page

**Files:** Create `src/pages/Insights.jsx`; modify `src/routes.jsx`

An index of drafted entries. **Not a blog engine** — no CMS, no routing to individual articles, no markdown pipeline. Out of scope per the spec.

- [ ] **Step 1: Build the page**

Use `PageHero` for the header. Below it, a 12-column grid of six cards, each with a mono category label, a title, a one-line standfirst, and a mono date. Card styling should match the `Services.jsx` card treatment: `border-radius:16px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.8); backdrop-filter:blur(20px) saturate(140%)`.

Card copy is drafted and lives in a `const ARTICLES = [...]` at the top of the file — this page is small enough that a local constant is clearer than an entry in `pages.js`, which is shaped for `PageShell`.

Cards are **not links** — there are no article pages. Do not render them as anchors that go nowhere.

Call `useDocumentTitle('Insights — Ideora Labs', <one-sentence description>)`.

- [ ] **Step 2: Register the route**

Add `{ path: 'insights', element: <Insights /> }` before the `{ path: '*' }` entry.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint && npm run dev`
Expected: `/insights` renders, six cards, nothing clickable that leads nowhere.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: insights page"
```

---

## Task 11: Document metadata and footer

**Files:** Modify `src/hooks/useDocumentTitle.js` (replacing the Task 1 stub), `src/sections/Footer.jsx`, `index.html`

- [ ] **Step 1: Implement useDocumentTitle**

Replace the stub:

```js
import { useEffect } from 'react';

// index.html carries one static title and description; with thirteen routes
// each page sets its own. Restores nothing on unmount — the next route always
// sets both immediately.
export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);
}
```

- [ ] **Step 2: Drive the footer from nav.js**

`Footer.jsx` currently hardcodes `PRODUCT` (four `#` anchors) and `VERTICALS` (three labels pointing at `#industries`). Those anchors are now wrong — three of the four sections they target are no longer at a stable URL from every page.

Replace both constants with `MENUS` from `src/data/nav.js`: render a column for Solutions and a column for Industries, using `react-router-dom`'s `Link` with `item.path`. Keep the existing `NAV_LINK` / `NAV_LINK_HOVER` styles, the `Hover` wrapper, the grid column placement, and the email/location column exactly as they are. Add `text-decoration:none` to `NAV_LINK`, since `Link` renders an underlined anchor by default.

- [ ] **Step 3: Leave index.html as the default**

No change needed — its title and description now serve as the pre-hydration default and the fallback for the 404 route.

- [ ] **Step 4: Verify**

Run: `npm run build && npm run lint && npm run dev`
Expected: browser tab title changes on every navigation. Footer links navigate by route, not by anchor, and are not underlined.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: per-route metadata and routed footer links"
```

---

## Task 12: Full verification pass

**Files:** none — this task only verifies. Any defect found is fixed in the task that owns the code, then re-verified here.

- [ ] **Step 1: Build and lint clean**

Run: `npm run build && npm run lint`
Expected: both succeed with no warnings.

- [ ] **Step 2: Every route loads directly by URL**

Run `npm run preview`, then load each of the fourteen URLs directly (not by clicking): `/`, the eleven dropdown paths, `/about`, `/insights`, plus `/does-not-exist` for the 404. Direct loads exercise Vite's SPA history fallback, which clicking does not.

Expected: all render correctly, no blank pages.

> **Deployment note, outside this plan:** direct URL loads work under `vite dev` and `vite preview` because both fall back to `index.html`. A static host will 404 on them unless configured to rewrite all paths to `index.html`. Flag this to whoever deploys.

- [ ] **Step 3: Homepage animation regression check**

Repeat all eight checks from Task 1, Step 10 on `/`. Every one must still pass.

- [ ] **Step 4: The ScrollTrigger teardown check**

The highest-risk regression in the whole change. Navigate `/` → `/solutions/healthcare` → back to `/`, three times in a row. After each return:
- The Work section still pins and scrolls horizontally.
- No element is stuck with `position: fixed` over the page.
- The progress bar resets and refills correctly.
- The console shows no GSAP warnings about missing or duplicated targets.

If the pin breaks only after navigating away and back, the cause is `ScrollTrigger.refresh()` timing in `useRouteScrollReset` — not the timeline itself.

- [ ] **Step 5: Nav behaviour across pages**

On a subpage (`/industries/automotive`), confirm: all dropdowns open and close correctly; the nav switches to dark glass over the `PageCta` panel and back; both CTAs work; the logo returns to `/`.

Then check active marking specifically: on `/industries/real-estate` the **Industries** trigger is accent-coloured and **Solutions** is not, even though both menus contain a "Real Estate" item. On `/about`, the About link is marked. On `/`, nothing is marked.

- [ ] **Step 6: Keyboard pass, no mouse**

From a fresh page load, using only the keyboard: Tab to each of the three dropdown triggers; open each with Enter; arrow through its items; press Escape and confirm focus returns to the trigger; Tab past a closed menu without it opening; activate a menu item with Enter and confirm it navigates.

- [ ] **Step 7: Copy review**

Read all thirteen pages as a visitor. Confirm no page claims a live deployment outside automotive, real estate and healthcare, and that no metric appears that is not in `content.js` or `dashboards.js`.

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: navbar dropdowns and multi-page routing"
```
