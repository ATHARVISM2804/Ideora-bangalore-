import { useEffect, useState } from 'react';

// Subscribes to a media query. Inline styles cannot carry media queries, so
// layouts that genuinely restructure (grid to stack, hover menu to tap menu,
// pinned scroller to swipe rail) branch on this instead. Purely fluid changes
// belong in the style strings as clamp()/minmax() and never reach this hook.
//
// The initial read happens during the first render rather than in an effect,
// so a phone never paints the desktop layout first and then snaps.
export function useMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const read = () => setMatches(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, [query]);

  return matches;
}

// The two structural breakpoints the page uses. Phone covers every iPhone in
// portrait (SE 375 through Pro Max 430); below-desktop also catches tablets
// and small laptops, where the 12-column grid still has to give way.
export const PHONE = '(max-width: 640px)';
export const BELOW_DESKTOP = '(max-width: 1024px)';

export const useIsPhone = () => useMedia(PHONE);
export const useBelowDesktop = () => useMedia(BELOW_DESKTOP);

// True for devices with no real hover. The card spotlight and magnetic CTA
// listen for mousemove, which iOS Safari synthesises on tap and then leaves
// stuck in the hovered state until the next tap elsewhere.
export const useIsTouch = () => useMedia('(hover: none)');
