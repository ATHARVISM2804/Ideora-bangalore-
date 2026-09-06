import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { s } from '../lib/style';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { useOverDark } from '../hooks/useOverDark';
import { MENUS } from '../data/nav';
import { NavMenu } from '../components/NavMenu';
import { MobileNavTrigger, MobileNavSheet } from '../components/MobileNav';
import { useBelowDesktop } from '../hooks/useMedia';

// Two treatments for the two grounds the bar crosses. The glass gradients and
// edge highlights went with the revamp: a corporate bar reads as a plain
// surface with a hairline, not as a floating translucent slab.
const GLASS = {
  light: {
    bar: 'border-bottom:1px solid var(--rule); background:rgba(250,249,247,0.92)',
    link: 'var(--ink-muted)',
    linkHover: 'color:var(--ink); background:rgba(28,25,23,0.05)',
    logo: '/assets/ideora-lockup.png',
    panel: 'border:1px solid var(--rule); background:var(--raised); box-shadow:0 24px 50px -28px rgba(28,25,23,0.28)',
    panelItemHover: 'background:var(--bg-sunken)',
  },
  dark: {
    bar: 'border-bottom:1px solid var(--dark-rule); background:rgba(31,27,24,0.92)',
    link: '#C4BCB2',
    linkHover: 'color:#FFFFFF; background:rgba(255,255,255,0.08)',
    logo: '/assets/ideora-lockup-light.png',
    panel: 'border:1px solid var(--dark-rule); background:var(--dark-raised); box-shadow:0 24px 50px -28px rgba(0,0,0,0.7)',
    panelItemHover: 'background:rgba(255,255,255,0.07)',
  },
};
export function Nav() {
  const barRef = useRef(null);
  const g = GLASS[useOverDark(barRef) ? 'dark' : 'light'];
  const { pathname } = useLocation();
  const [openLabel, setOpenLabel] = useState(null);
  // A menu is active when the current route is one of its items, or is the
  // menu's own path. Matched by exact path, not prefix: /solutions/real-estate
  // and /industries/real-estate must not both light up.
  const isActive = (menu) =>
    menu.path === pathname || menu.items.some((i) => i.path === pathname);

  // Five menus, two buttons and the lockup need roughly 1000px of bar. Below
  // that the row wraps into the glass panel, so the whole set moves into the
  // tap-driven sheet rather than being squeezed.
  const compact = useBelowDesktop();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={s(`position:sticky; top:0; z-index:70; padding-top:var(--safe-t); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); transition:background .45s ease, border-color .45s ease; ${g.bar}`)}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <div
          ref={barRef}
          style={s('position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; gap:24px; padding:14px 0')}
        >
          <Link to="/" style={s('display:flex; align-items:center')}>
            <img src={g.logo} alt="Ideora Labs" style={s('height:32px; width:auto; display:block')} />
          </Link>
          {compact ? (
            <MobileNavTrigger glass={g} open={menuOpen} setOpen={setMenuOpen} />
          ) : (
          <nav style={s('display:flex; align-items:center; gap:4px')}>
            {MENUS.map((menu) => (
              menu.items.length > 0
                ? (
                  <NavMenu
                    key={menu.label}
                    menu={menu}
                    glass={g}
                    active={isActive(menu)}
                    open={openLabel === menu.label}
                    onOpenChange={(next) =>
                      setOpenLabel((prev) => (next ? menu.label : prev === menu.label ? null : prev))
                    }
                  />
                )
                : (
                  <Hover
                    key={menu.label}
                    as={Link}
                    to={menu.path}
                    style={`color:${isActive(menu) ? 'var(--accent-deep)' : g.link}; font-size:14px; font-weight:500; padding:8px 14px; border-radius:12px; text-decoration:none; transition:color .3s, background .3s`}
                    hoverStyle={g.linkHover}
                  >{menu.label}</Hover>
                )
            ))}

            <Hover
              as={Link}
              to="/about#contact"
              style={`margin-left:10px; padding:9px 16px; border-radius:7px; border:1px solid var(--rule-strong); color:${g.link}; font-size:14px; font-weight:500; text-decoration:none; transition:color .25s, background .25s, border-color .25s`}
              hoverStyle={g.linkHover}
            >Talk to Us</Hover>

            <Hover
              as={Link}
              to="/#book"
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
              style="margin-left:8px; padding:10px 18px; border-radius:7px; background:var(--accent); color:#FFFFFF; font-size:14px; font-weight:500; text-decoration:none; transition:transform .18s ease-out, background .25s"
              hoverStyle="background:#D9500F"
            >Request a Demo</Hover>
          </nav>
          )}
        </div>
      </div>

      {compact && (
        <MobileNavSheet menus={MENUS} isActive={isActive} open={menuOpen} setOpen={setMenuOpen} />
      )}
    </header>
  );
}
