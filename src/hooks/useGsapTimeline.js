import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The design's _initGsap(), ported as-is. The original polled window.gsap for
// up to 6 seconds because the CDN script loaded asynchronously; importing the
// package is synchronous, so the polling loop is gone. gsap.context() scopes
// every tween to the root node and reverts them all on unmount, matching the
// original componentWillUnmount.
export function useGsapTimeline(refs) {
  const { rootRef, barRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef } = refs;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (sel) => Array.from(root.querySelectorAll(sel));

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      gsap.to(barRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });

      const intro = gsap.timeline();
      intro.from('[data-anim="hero-1"]', { y: 18, opacity: 0, duration: 0.7, ease });
      intro.from('[data-anim="hero-word"]', { yPercent: 108, opacity: 0, duration: 1.05, stagger: 0.075, ease: 'expo.out' }, 0.1);
      intro.from('[data-anim="hero-2"]', { y: 26, opacity: 0, duration: 0.8, ease }, 0.5);
      intro.from('[data-anim="console"]', { y: 70, opacity: 0, scale: 0.985, duration: 1.1, ease }, 0.6);

      // The console re-animates on every industry switch, so it drives its own
      // counters, bars and trace rows. This pass covers the rest of the page.
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

      gsap.to(consoleRef.current, {
        y: -46, ease: 'none',
        scrollTrigger: { trigger: consoleRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });

      q('[data-anim="head"]').forEach((el) => {
        gsap.from(el, {
          y: 44, opacity: 0, duration: 1, ease,
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
          y: 56, opacity: 0, duration: 0.95, stagger: 0.11, ease,
          scrollTrigger: { trigger: parent, start: 'top 86%', toggleActions: 'play none none none' },
        });
      });

      if (spineRef.current) {
        const spine = spineRef.current;
        gsap.to(spine, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: spine.parentElement, start: 'top 72%', end: 'bottom 72%', scrub: 0.4 },
        });
      }

      q('[data-anim="proc-card"]').forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(el, {
          x: fromLeft ? -70 : 70, y: 40, opacity: 0, rotate: fromLeft ? -1.6 : 1.6,
          duration: 1.05, ease,
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none none' },
        });
      });

      q('[data-anim="proc-pill"]').forEach((el) => {
        gsap.from(el, {
          scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(2)',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        });
      });

      gsap.to(ruleRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: ruleRef.current, start: 'top 80%', end: 'top 30%', scrub: 0.4 },
      });

      const track = trackRef.current;
      const pin = pinRef.current;
      if (track && pin) {
        const distance = () => Math.max(0, track.scrollWidth - pin.getBoundingClientRect().width + 80);
        gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: pin, start: 'top top', end: () => '+=' + distance(),
            pin: true, scrub: 0.5, invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (railRef.current) {
                gsap.set(railRef.current, { scaleX: 0.1 + self.progress * 0.9 });
              }
            },
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [rootRef, barRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef]);
}
