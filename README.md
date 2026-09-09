# Ideora Labs — website

Vite + React marketing site. Fourteen routes: the home page, eleven
data-driven service pages, About and Insights.

## Running it

```
npm install
npm run dev       # dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint, including jsx-a11y
```

## Styling

Styling is plain CSS with a token layer. Sections use classes; an inline style
appears only where a value is genuinely computed at runtime, such as the hero
map's node positions.

| File | Holds |
|---|---|
| `src/styles/tokens.css` | every colour, type step, space, radius, shadow and width |
| `src/styles/base.css` | reset, element typography, focus, skip link, reduced motion |
| `src/styles/layout.css` | `.section`, `.container`, `.grid`, card rows, breakpoints |
| `src/styles/components.css` | buttons, cards, pills, labels, and the page blocks |
| `src/styles/nav.css` | sticky bar, dropdowns, mobile sheet, WhatsApp button |
| `src/styles/footer.css` | footer |
| `src/styles/motion.css` | the two surviving keyframes and the hero atmosphere |

Rules of the system:

- **Never type a value at a call site.** If a section needs a colour, size or
  space that is not in `tokens.css`, the token set is missing something —
  add it there rather than inlining it.
- **Sizes are `rem`, measures are `rem`, not `ch`.** `ch` resolves against
  whichever font is painted, so with `display:swap` a `ch` measure re-wraps
  when Geist loads.
- **`--accent` (`#F4601E`) is a surface, never text.** White on it is 3.2:1.
  Text and button fills use `--accent-deep`; the bright orange is for status
  dots, the progress bar and hover states.
- **`--ink-ghost` is never text.** It is 2.8:1 — decorative rules and glyphs
  only.

## Structure

| Path | What it holds |
|---|---|
| `src/routes.jsx` | route table; everything but Home is lazy |
| `src/layout/Layout.jsx` | skip link, progress bar, nav, `<main>`, footer |
| `src/components/ui.jsx` | Section, Container, Grid, SectionHead, Button, Card, Pill, Label, Stat |
| `src/sections/` | one file per home-page section, in page order |
| `src/pages/blocks.jsx` | the eight blocks every service page is built from |
| `src/data/nav.js` | single source of truth for nav, footer and route paths |
| `src/data/content.js` | home-page copy |
| `src/data/pages.js` | copy for the eleven service pages |
| `src/hooks/useGsapTimeline.js` | scroll and intro motion |

## Motion

All GSAP tweens live inside a `prefers-reduced-motion: no-preference` block.
GSAP tweens are not CSS transitions, so the blanket rule in `base.css` does not
reach them — gating them at the source is what makes the setting work.

This also means **content is visible by default and animation is the
enhancement**. Nothing is hidden in markup or CSS, so if the timeline never
runs the page still reads.

## Verification

There is no test suite. Before shipping a visual change:

1. `npm run build` and `npm run lint` are clean.
2. Check the page at 1440, 900 and 390.
3. Tab through it. Every hover affordance must have a visible focus state.
4. Check text contrast against both `--bg` and `--bg-sunken`; labels sit on
   either, so they have to clear 4.5:1 on both.
