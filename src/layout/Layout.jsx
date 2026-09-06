import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { s } from '../lib/style';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Nav } from '../sections/Nav';
import { Footer } from '../sections/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

// Router keeps scroll position across navigations; reset it, unless the target
// is a hash anchor. ScrollTrigger.refresh() is required because the Work
// section's pin measures against a document height that just changed.
function useRouteScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname, hash]);
}

export function Layout() {
  useRouteScrollReset();

  const barRef = useRef(null);
  useScrollProgress(barRef);

  return (
    <div style={s('background:var(--bg); color:var(--ink); font-family:var(--sans); font-weight:400; font-size:18px; line-height:1.7; -webkit-font-smoothing:antialiased; overflow-x:clip; position:relative')}>

      {/* Scroll progress bar */}
      <div ref={barRef} style={s('position:fixed; top:0; left:0; right:0; height:3px; background:var(--accent); transform:scaleX(0); transform-origin:0 50%; z-index:90')} />

      {/* The graph-paper backdrop went with the revamp: a visible technical
          grid behind every section is a strong "engineering demo" signal and
          worked against the brief for something that reads corporate. */}

      <div style={s('position:relative; z-index:10')}>
        <Nav />
        <Outlet />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
