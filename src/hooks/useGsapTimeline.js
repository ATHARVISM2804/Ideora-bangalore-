import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Page motion. Two rules govern everything here:
//
// 1. Every tween lives inside the no-preference matchMedia block. GSAP tweens
//    are not CSS transitions, so the blanket `animation-duration:0.01ms` in
//    base.css does not touch them. Previously only the hero intro was gated,
//    which meant a reduced-motion reader still got 39 elements set to
//    opacity:0 and animated back in on scroll -- the exact effect the setting
//    exists to prevent.
//
// 2. Content is visible by default and animation is the enhancement. Nothing
//    is hidden in markup or CSS, so if this hook never runs -- a JS error, a
//    slow bundle, a bot -- the page still reads.
export function useGsapTimeline(refs) {
  const { rootRef, parallaxRef } = refs;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = (sel) => Array.from(root.querySelectorAll(sel));

        // The opening sequence is the page's one orchestrated moment, so it is
        // paced rather than hurried: the headline rises word by word out of
        // its mask with the blur clearing as it settles, then the supporting
        // copy and the product follow.
        //
        // Only the home page has a word-split headline. Building the timeline
        // unconditionally made GSAP warn about four missing targets on each of
        // the other thirteen routes.
        if (q('[data-anim="hero-word"]').length) {
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
          intro.from('[data-anim="hero-1"]', { opacity: 0, duration: 0.9, ease: 'power2.out' });
          intro.from('[data-anim="hero-word"]', {
            yPercent: 118,
            filter: 'blur(10px)',
            duration: 1.45,
            stagger: 0.085,
          }, 0.25);
          intro.from('[data-anim="hero-2"]', { y: 22, opacity: 0, duration: 1.1, ease: 'power3.out' }, 0.95);
          intro.from('[data-anim="console"]', { y: 60, opacity: 0, duration: 1.25, ease: 'power3.out' }, 1.15);
        } else {
          // Elsewhere the eyebrow just fades in on its own.
          gsap.from('[data-anim="hero-1"]', { opacity: 0, duration: 0.7, ease: 'power2.out' });
        }

        q('[data-count]').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-count'));
          if (!isFinite(target)) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.6, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v); },
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          });
        });

        if (parallaxRef?.current) {
          gsap.to(parallaxRef.current, {
            y: -46, ease: 'none',
            scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        }

        // Entrances are fade-only. Sliding every heading and card up the screen
        // is the generic default and it moved content under the reader; the
        // page's deliberate motion lives in the hero sequence and the map.
        q('[data-anim="head"]').forEach((el) => {
          gsap.from(el, {
            opacity: 0, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          });
        });

        const groups = new Map();
        q('[data-anim="card"], [data-anim="step"]').forEach((el) => {
          const parent = el.parentElement;
          if (!groups.has(parent)) groups.set(parent, []);
          groups.get(parent).push(el);
        });
        groups.forEach((els, parent) => {
          gsap.from(els, {
            opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out',
            scrollTrigger: { trigger: parent, start: 'top 86%', toggleActions: 'play none none none' },
          });
        });
      });
    }, root);

    return () => { mm.revert(); ctx.revert(); };
  }, [rootRef, parallaxRef]);
}
