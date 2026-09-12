// Loads GSAP off the critical path.
//
// GSAP was 26% of the entry bundle and every route paid for it before first
// paint, which the specification calls out directly: no large animation library
// for simple reveals. Nothing here is load-bearing -- the hooks' own contract is
// that content is visible by default and motion is the enhancement, and
// motion.css holds `[data-anim] { opacity: 1 }` as the floor -- so the library
// can arrive after the page has rendered without changing what a reader sees.
//
// One cached promise, so twelve components asking for it produce one request.

let pending = null;

export function loadGsap() {
  if (!pending) {
    pending = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      },
    );
  }
  return pending;
}

// For callers that only want to poke an already-loaded instance and should do
// nothing at all if it has not arrived yet -- the route-change refresh, which
// is meaningless before any trigger exists.
export function withGsap(fn) {
  if (pending) pending.then(fn);
}

// A reader who has asked for reduced motion gets no tweens, so there is no
// reason to send them the library at all. Checked before the import rather
// than inside the timeline, which is where it used to be.
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
