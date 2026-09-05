# Ideora Labs — homepage

React port of `Ideora Home v5.dc.html`, the Claude Design canvas file in the
parent directory. Desktop-only, fixed at `min-width: 1440px`, matching the
design; there are no breakpoints yet.

## Running it

```
npm install
npm run dev       # dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## How it is put together

| Path | What it holds |
|---|---|
| `src/App.jsx` | Owns the eight GSAP refs and composes the sections |
| `src/sections/` | One file per page section, in page order |
| `src/data/content.js` | Page copy and data, extracted from the design file |
| `src/data/dashboards.js` | One console dataset per industry, with a `status` of live / in build / pilot |
| `src/sections/OpsConsole.jsx` | The hero console: five-industry tab switcher, auto-cycling, owns its own counter and bar animation |
| `src/hooks/useGsapTimeline.js` | Page scroll animations: progress bar, counters, pinned Work scroller, process spine. Does **not** touch the console, which re-animates on every industry switch |
| `src/hooks/useOverDark.js` | Flips the navbar to dark glass while it overlaps a `[data-nav-dark]` region |
| `src/lib/style.js` | `s()` — converts a CSS string to a React style object |
| `src/components/ConsoleUI.jsx` | Console primitives: rail icons, sparklines, SLA ring, row status pills |
| `src/components/Hover.jsx` | Stands in for the design's `style-hover` attribute |
| `src/components/ImageSlot.jsx` | Image placeholder; pass `src` to drop in real photography |
| `src/styles/global.css` | Keyframes and resets, taken verbatim from the design |

Styles are inline CSS strings so each section stays diffable against the
original design file.

## Known issues

- **Two competing process sections.** `Process.jsx` and `ProcessResults.jsx`
  both render an "Easy process, powerful results" block. The design file
  contains both; one should probably go.
- **Finance and Legal exist only in the console.** They are labelled "in build"
  and "pilot" so nothing is overclaimed, but the case studies, testimonials and
  the "Verticals live" fact still cover only the three live verticals.
- **Colliding keyframes.** `om-sweep` and `om-tick` are each used for two
  different motions, and one caller wins. The bay-availability bar rotates
  instead of sweeping, and the digest checkmarks fade instead of popping in.
- **Small image slots clip their caption.** The 44px quote avatars render
  "Phot". Passing a real `src` removes the caption entirely.
