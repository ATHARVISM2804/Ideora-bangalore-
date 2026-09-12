import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { MENUS } from '../data/nav';
import { NavMenu } from '../components/NavMenu';
import { WA_TALK, WA_BRIEFING, WA_LINK } from '../lib/whatsapp';
import { MobileNavTrigger, MobileNavSheet } from '../components/MobileNav';
import { useBelowDesktop } from '../hooks/useMedia';
import { useNavHeight } from '../hooks/useNavHeight';
import { Button } from '../components/ui';

// A floating glass pill.
//
// It used to carry a second, darker treatment for passing over an inverted
// band, with its own logo asset and a scroll listener to swap between them.
// Nothing on the site has been dark since the page went light throughout, so
// no element carried the marker that listener looked for and the whole branch
// was unreachable. It is gone, along with the 250KB light lockup.
export function Nav() {
  const { pathname } = useLocation();
  const [openLabel, setOpenLabel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useNavHeight(headerRef);

  // A menu is active when the current route is one of its items, or is the
  // menu's own path. Matched by exact path, not prefix: /solutions/real-estate
  // and /industries/real-estate must not both light up.
  const isActive = (menu) =>
    menu.path === pathname || menu.items.some((i) => i.path === pathname);

  // Five menus, two buttons and the lockup need roughly 1000px of bar. Below
  // that the whole set moves into the tap-driven sheet rather than squeezing.
  const compact = useBelowDesktop();

  return (
    <header ref={headerRef} className="nav">
      <div className="nav__wrap">
        <div className="nav__bar">
          <Link to="/" className="nav__logo">
            <img src="/assets/ideora-lockup.png" alt="Ideora Labs, home" width="92" height="24" />
          </Link>

          {compact ? (
            <div style={{ marginLeft: 'auto', display: 'flex' }}>
              <MobileNavTrigger open={menuOpen} setOpen={setMenuOpen} />
            </div>
          ) : (
            <>
              <nav className="nav__links" aria-label="Main">
                {MENUS.map((menu) => (
                  menu.items.length > 0 ? (
                    <NavMenu
                      key={menu.label}
                      menu={menu}
                      active={isActive(menu)}
                      open={openLabel === menu.label}
                      pathname={pathname}
                      onOpenChange={(next) =>
                        setOpenLabel((prev) => (next ? menu.label : prev === menu.label ? null : prev))
                      }
                    />
                  ) : (
                    <Link
                      key={menu.label}
                      to={menu.path}
                      aria-current={menu.path === pathname ? 'page' : undefined}
                      className={`nav__link${isActive(menu) ? ' is-active' : ''}`}
                    >
                      {menu.label}
                    </Link>
                  )
                ))}
              </nav>

              <div className="nav__cta">
                <a href={WA_TALK} {...WA_LINK} className="nav__link">Talk to us</a>
                {/* One primary ask across the whole site. The nav used to
                    offer a demo while the hero offered a briefing and the
                    closing offered a third thing, so a visitor met three
                    different first steps. */}
                <Button
                  href={WA_BRIEFING}
                  {...WA_LINK}
                  variant="dark"
                  size="sm"
                  className="nav__demo"
                  data-track="discovery_start"
                  data-track-product="general"
                  data-track-cta_location="nav"
                  onMouseMove={magnetMove}
                  onMouseLeave={magnetLeave}
                >
                  Book a call
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {compact && (
        <MobileNavSheet menus={MENUS} isActive={isActive} open={menuOpen} setOpen={setMenuOpen} />
      )}
    </header>
  );
}
