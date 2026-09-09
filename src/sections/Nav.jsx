import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { s } from '../lib/style';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { useOverDark } from '../hooks/useOverDark';
import { MENUS } from '../data/nav';
import { NavMenu } from '../components/NavMenu';
import { WA_TALK, WA_DEMO, WA_LINK } from '../lib/whatsapp';
import { MobileNavTrigger, MobileNavSheet } from '../components/MobileNav';
import { useBelowDesktop } from '../hooks/useMedia';
import { useNavHeight } from '../hooks/useNavHeight';

// Two treatments for the two grounds the bar crosses. The bar floats as a pill
// again, so both are translucent surfaces with an edge highlight rather than a
// flat plane with a hairline.
const GLASS = {
  light: {
    bar: 'border:1px solid rgba(255,255,255,0.7); background:rgba(255,255,255,0.62); box-shadow:inset 0 1px 0 rgba(255,255,255,0.85), 0 12px 34px -18px rgba(28,25,23,0.3)',
    link: 'var(--ink-muted)',
    linkHover: 'color:var(--ink); background:rgba(28,25,23,0.05)',
    logo: '/assets/ideora-lockup.png',
    panel: 'border:1px solid var(--rule); background:var(--raised); box-shadow:0 24px 50px -28px rgba(28,25,23,0.28)',
    panelItemHover: 'background:var(--bg-sunken)',
  },
  dark: {
    bar: 'border:1px solid rgba(255,255,255,0.14); background:rgba(31,27,24,0.66); box-shadow:inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 34px -18px rgba(0,0,0,0.6)',
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

  const headerRef = useRef(null);
  useNavHeight(headerRef);

  return (
    <header ref={headerRef} style={s('position:sticky; top:0; z-index:70; padding:calc(var(--safe-t) + 14px) 0 8px; pointer-events:none')}>
      <div style={s('max-width:1320px; margin:0 auto; padding:0 var(--gut)')}>
        <div
          ref={barRef}
          style={s(`position:relative; z-index:2; pointer-events:auto; display:flex; align-items:center; gap:clamp(10px, 1.6vw, 24px); padding:5px 5px 5px 17px; border-radius:999px; backdrop-filter:blur(20px) saturate(160%); -webkit-backdrop-filter:blur(20px) saturate(160%); transition:background .45s ease, border-color .45s ease, box-shadow .45s ease; ${g.bar}`)}
        >
          <Link to="/" style={s('display:flex; align-items:center')}>
            <img src={g.logo} alt="Ideora Labs" style={s('height:24px; width:auto; display:block')} />
          </Link>
          {compact ? (
            <div style={s('margin-left:auto; display:flex')}>
              <MobileNavTrigger glass={g} open={menuOpen} setOpen={setMenuOpen} />
            </div>
          ) : (
          <nav style={s('display:flex; align-items:center; gap:2px; margin:0 auto')}>
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
                    style={`color:${isActive(menu) ? 'var(--accent-deep)' : g.link}; font-size:14.5px; font-weight:450; padding:8px 13px; border-radius:999px; text-decoration:none; transition:color .3s, background .3s`}
                    hoverStyle={g.linkHover}
                  >{menu.label}</Hover>
                )
            ))}

          </nav>
          )}

          {!compact && (
            <div style={s('display:flex; align-items:center; gap:2px; flex:none')}>
              <Hover
              as="a"
              href={WA_TALK}
              {...WA_LINK}
              style={`margin-left:2px; padding:8px 13px; border-radius:999px; color:${g.link}; font-size:14.5px; font-weight:450; text-decoration:none; transition:color .25s, background .25s`}
              hoverStyle={g.linkHover}
              >Talk to Us</Hover>

              <Hover
              as="a"
              href={WA_DEMO}
              {...WA_LINK}
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
              style="margin-left:4px; padding:8px 18px; border-radius:999px; background:var(--ink); color:#FAF9F7; font-size:14.5px; font-weight:500; text-decoration:none; transition:transform .18s ease-out, background .25s"
              hoverStyle="background:#000000"
              >Request a Demo</Hover>
            </div>
          )}

        </div>
      </div>

      {compact && (
        <MobileNavSheet menus={MENUS} isActive={isActive} open={menuOpen} setOpen={setMenuOpen} />
      )}
    </header>
  );
}
