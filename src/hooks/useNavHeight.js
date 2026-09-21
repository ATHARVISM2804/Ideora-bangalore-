import { useLayoutEffect } from 'react';

// Publishes the sticky bar's height as --nav-h on the document root.
//
// The nav floats over the hero rather than sitting above it, so the hero's
// backdrop has to reach up behind the bar. That needs the bar's height as a
// number, and the number is not a constant: it moves with the safe-area inset
// on a notched iPhone, with the CTA's copy, and with the font once Geist has
// loaded and replaced the fallback metrics. Measuring is the only way to stay
// correct through all three; a hard-coded value drifts and the seam returns.
//
// tokens.css carries the height the CSS itself produces as the starting value,
// so a prerendered page paints in the right place and this only ever corrects
// it by a pixel or two. It used to start at 0px, which cost one 0.30 layout
// shift on a throttled phone the moment this ran.
export function useNavHeight(headerRef) {
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const write = () => {
      document.documentElement.style.setProperty(
        '--nav-h', `${header.getBoundingClientRect().height}px`,
      );
    };

    write();
    const ro = new ResizeObserver(write);
    ro.observe(header);
    // Web fonts land after the first measurement and change the bar's height.
    document.fonts?.ready.then(write).catch(() => {});

    return () => ro.disconnect();
  }, [headerRef]);
}
