// The hero illustration.
//
// The source was a 1.6MB PNG whose left third was empty cream; cropped and
// re-encoded it is 17KB as AVIF at the size it actually renders. Four widths
// in AVIF and WebP, with a JPEG for anything that takes neither.
//
// Two things keep it from costing what a hero image usually costs:
//
//   width and height are set, so the box is reserved before the bytes arrive
//   and the copy beside it never reflows. That is the whole of this page's
//   CLS budget.
//
//   fetchPriority="high" with a matching preload in index.html. The headline
//   is live HTML text and paints from the first response either way, so the
//   specification's "image never delays LCP text" holds: this competes with
//   nothing the reader is waiting to read.
const W = 1170;
const H = 889;
const SRC = '/assets/hero-system';
const WIDTHS = [480, 720, 960, 1240];

const set = (ext) => WIDTHS.map((w) => `${SRC}-${w}.${ext} ${w}w`).join(', ');

// It renders at roughly 40% of the viewport beside the copy, and full width
// in one column below it.
const SIZES = '(max-width: 1024px) calc(100vw - 2.75rem), 40vw';

export function HeroVisual() {
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={SIZES} />
      <source type="image/webp" srcSet={set('webp')} sizes={SIZES} />
      <img
        src={`${SRC}-960.jpg`}
        width={W}
        height={H}
        sizes={SIZES}
        fetchPriority="high"
        decoding="async"
        className="hero__img"
        // Describes what the picture argues rather than listing its parts:
        // a reader who cannot see it has already been told the same thing by
        // the headline, so repeating it would be noise.
        alt="Calls, messages, a database and a report all connected to one automation that sits between them."
      />
    </picture>
  );
}
