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
