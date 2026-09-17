import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { withGsap } from '../lib/gsap';
import { Nav } from '../sections/Nav';
import { Footer } from '../sections/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { installClickTracking } from '../lib/analytics';

// Router keeps scroll position across navigations; reset it, unless the target
// is a hash anchor. ScrollTrigger.refresh() is required because the entrance
// triggers measure against a document height that just changed.
//
// The reset has to be instant and before paint. `html` sets scroll-behavior:
// smooth for in-page anchors, which turned a plain scrollTo(0, 0) into a slow
// animated scroll from the footer -- one the new page's render interrupted, so
// a visitor who clicked a footer link landed at the bottom of the next page.
function useRouteScrollReset() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Only meaningful once triggers exist. Before the library has loaded there
    // is nothing to refresh, and asking for it would pull GSAP into the
    // critical path through the back door.
    withGsap(({ ScrollTrigger }) => ScrollTrigger.refresh());
  }, [pathname, hash]);
}

export function Layout() {
  useRouteScrollReset();

  // One delegated listener for every `data-track` element on the site, so a
  // CTA reports its event without each component importing the analytics
  // module. Installed once at the shell rather than per route.
  useEffect(() => installClickTracking(), []);

  const barRef = useRef(null);
  useScrollProgress(barRef);

  return (
    <>
      {/* With five menus and two CTAs in the bar, a keyboard reader tabbed
          through eight controls on every route before reaching content. */}
      <a className="skip-link" href="#main">Skip to content</a>

      <div
        ref={barRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '3px',
          background: 'var(--accent)', transform: 'scaleX(0)',
          transformOrigin: '0 50%', zIndex: 90,
        }}
      />

      <Nav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
