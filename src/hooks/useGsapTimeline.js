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
  const { rootRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef } = refs;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (sel) => Array.from(root.querySelectorAll(sel));

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      // The opening sequence is the page's one orchestrated moment, so it is
      // paced rather than hurried: the rules draw, the headline rises word by
      // word out of its mask with the blur clearing as it settles, then the
      // supporting copy and the product follow.
      //
      // Gated on prefers-reduced-motion. A blurred rise is precisely the kind
      // of motion that setting exists to suppress, and skipping the timeline
      // leaves the content in its natural state rather than hidden.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });

        intro.from('[data-anim="hero-1"]', { opacity: 0, duration: 0.9, ease: 'power2.out' });
        intro.from('[data-anim="hero-1"] span[style*="height:1px"]', {
          scaleX: 0, transformOrigin: '50% 50%', duration: 1.2, ease: 'power3.inOut',
        }, 0.05);

        intro.from('[data-anim="hero-word"]', {
          yPercent: 118,
          filter: 'blur(10px)',
          duration: 1.45,
          stagger: 0.085,
        }, 0.25);

        intro.from('[data-anim="hero-2"]', { y: 22, opacity: 0, duration: 1.1, ease: 'power3.out' }, 0.95);
        intro.from('[data-anim="console"]', { y: 60, opacity: 0, duration: 1.25, ease: 'power3.out' }, 1.15);
      });

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

      // Entrances are fade-only. Sliding every heading and card up the screen
      // is the generic default and it moved content under the reader; the
      // page's deliberate motion lives in the hero sequence, the console, the
      // scroll-drawn spine and rule, and the pinned Work scroller.
      q('[data-anim="head"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, duration: 0.5, ease,
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
          opacity: 0, duration: 0.5, stagger: 0.04, ease,
          scrollTrigger: { trigger: parent, start: 'top 86%', toggleActions: 'play none none none' },
        });
      });

      if (spineRef?.current) {
        const spine = spineRef.current;
        gsap.to(spine, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: spine.parentElement, start: 'top 72%', end: 'bottom 72%', scrub: 0.4 },
        });
      }

      q('[data-anim="proc-card"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, duration: 0.5, ease,
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none none' },
        });
      });

      q('[data-anim="proc-pill"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, duration: 0.5, ease,
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        });
      });

      if (ruleRef?.current) gsap.to(ruleRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: ruleRef.current, start: 'top 80%', end: 'top 30%', scrub: 0.4 },
      });

      // The Work pin is desktop-only. Below 1024px the section renders as a
      // native snap rail that the reader swipes, so pinning it would fight
      // that scroller and, on iOS Safari, the address bar and the swipe-back
      // edge gesture as well. gsap.matchMedia sets the tween up and tears it
      // down on its own as the viewport crosses the breakpoint, which also
      // covers a phone being rotated into landscape.
      mm.add('(min-width: 1025px)', () => {
        const track = trackRef?.current;
        const pin = pinRef?.current;
        if (!track || !pin) return;
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
      });
    }, root);

    return () => { mm.revert(); ctx.revert(); };
  }, [rootRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef]);
}
