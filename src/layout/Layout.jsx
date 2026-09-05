import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { s } from '../lib/style';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Nav } from '../sections/Nav';
import { Footer } from '../sections/Footer';

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
    <div style={s('background:#F1F3F6; color:#1A1D23; font-family:Geist, sans-serif; font-weight:400; font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased; min-width:1440px; overflow-x:clip; position:relative')}>

      {/* Scroll progress bar */}
      <div ref={barRef} style={s('position:fixed; top:0; left:0; right:0; height:3px; background:#F4601E; transform:scaleX(0); transform-origin:0 50%; z-index:90')} />

      {/* Fixed grid backdrop, faded out below the fold */}
      <div style={s('position:fixed; inset:0; z-index:0; pointer-events:none')}>
        <div style={s('position:absolute; inset:0; background-image:linear-gradient(rgba(26,29,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,29,35,0.04) 1px, transparent 1px); background-size:80px 80px; mask-image:linear-gradient(180deg,#000,transparent 55%); -webkit-mask-image:linear-gradient(180deg,#000,transparent 55%)')} />
      </div>

      <div style={s('position:relative; z-index:10')}>
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
