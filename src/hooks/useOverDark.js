import { useEffect, useState } from 'react';

// True while the sticky bar overlaps a region marked [data-nav-dark].
//
// A single translucent style cannot serve both backdrops: over the dark Work
// section the nav's white gradient composites to a mid grey where the links
// land at 1.4:1 contrast. Keeping the glass genuinely cloudy therefore means
// switching its tint, text, and lockup when it crosses a dark region.
export function useOverDark(barRef) {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const read = () => {
      const bar = barRef.current;
      if (!bar) return;
      const { top, bottom } = bar.getBoundingClientRect();
      const hit = [...document.querySelectorAll('[data-nav-dark]')].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < bottom - 4 && r.bottom > top + 4;
      });
      setOverDark(hit);
    };

    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [barRef]);

  return overDark;
}
