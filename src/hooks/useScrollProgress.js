import { useEffect } from 'react';
import { loadGsap, prefersReducedMotion } from '../lib/gsap';

// Drives the fixed progress bar from whole-document scroll. Previously part of
// useGsapTimeline, which is homepage-only; the bar is layout chrome and has to
// work on every route, so it owns its own trigger against document.body.
//
// The bar is decoration, so it waits for GSAP to arrive rather than holding up
// first paint, and a reader who has asked for reduced motion never fetches the
// library at all.
export function useScrollProgress(barRef) {
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    if (prefersReducedMotion()) return undefined;

    let ctx;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled || !barRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(bar, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        });
      });
    });

    return () => { cancelled = true; ctx?.revert(); };
  }, [barRef]);
}
