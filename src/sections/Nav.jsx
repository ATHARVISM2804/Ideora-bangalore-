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

// Two glass treatments. Both keep the same blur and saturation so the bar reads
// as one material; only the tint, edge light, and text colour swap.
const GLASS = {
  light: {
    bar: 'border:1px solid rgba(255,255,255,0.55); background:linear-gradient(180deg, rgba(255,255,255,0.74), rgba(255,255,255,0.44)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(26,29,35,0.05), 0 20px 46px -26px rgba(26,29,35,0.45), 0 2px 10px -6px rgba(26,29,35,0.16)',
    link: '#5A616D',
    linkHover: 'color:#1A1D23; background:rgba(26,29,35,0.06)',
    logo: '/assets/ideora-lockup.png',
    panel: 'border:1px solid rgba(255,255,255,0.6); background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.72)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.95), 0 26px 60px -30px rgba(26,29,35,0.5)',
    panelItemHover: 'background:rgba(26,29,35,0.06)',
  },
  dark: {
    bar: 'border:1px solid rgba(255,255,255,0.14); background:linear-gradient(180deg, rgba(46,51,60,0.62), rgba(26,29,35,0.44)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.28), 0 22px 50px -28px rgba(0,0,0,0.85), 0 2px 10px -6px rgba(0,0,0,0.4)',
    link: '#C6CCD6',
    linkHover: 'color:#FFFFFF; background:rgba(255,255,255,0.1)',
    logo: '/assets/ideora-lockup-light.png',
    panel: 'border:1px solid rgba(255,255,255,0.16); background:linear-gradient(180deg, rgba(46,51,60,0.9), rgba(26,29,35,0.8)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.16), 0 26px 60px -30px rgba(0,0,0,0.9)',
    panelItemHover: 'background:rgba(255,255,255,0.1)',
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
    <header style={s('position:sticky; top:0; z-index:70; padding:calc(var(--safe-t) + 14px) 0 14px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <div
          ref={barRef}
          style={s(`position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; padding:10px 12px 10px 20px; border-radius:18px; backdrop-filter:blur(30px) saturate(190%); -webkit-backdrop-filter:blur(30px) saturate(190%); transition:background .45s ease, border-color .45s ease, box-shadow .45s ease; ${g.bar}`)}
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
                    style={`color:${isActive(menu) ? '#F4601E' : g.link}; font-size:14px; font-weight:500; padding:8px 14px; border-radius:12px; text-decoration:none; transition:color .3s, background .3s`}
                    hoverStyle={g.linkHover}
                  >{menu.label}</Hover>
                )
            ))}

            <Hover
              as={Link}
              to="/about#contact"
              style={`margin-left:10px; padding:9px 17px; border-radius:13px; border:1px solid ${g.link}; color:${g.link}; font-size:14px; font-weight:500; text-decoration:none; transition:color .25s, background .25s, border-color .25s`}
              hoverStyle={g.linkHover}
            >Talk to Us</Hover>

            <Hover
              as={Link}
              to="/#book"
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
              style="margin-left:8px; padding:10px 18px; border-radius:13px; background:#F4601E; color:#1A1D23; font-size:14px; font-weight:500; text-decoration:none; box-shadow:0 10px 26px -14px rgba(244,96,30,0.95); transition:transform .18s ease-out, background .25s"
              hoverStyle="background:#FF7A3D"
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
