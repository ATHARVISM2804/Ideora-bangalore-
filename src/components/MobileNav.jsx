import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { s } from '../lib/style';

// The phone counterpart to NavMenu. The desktop menus open on hover, which a
// touch screen has no way to express: iOS fires a synthetic hover on first tap
// and the link fires on the second, so the dropdowns were both undiscoverable
// and easy to trigger by accident. Here each menu is an accordion the reader
// opens deliberately, and every row is a real tap target.
export function MobileNavTrigger({ glass, open, setOpen }) {
  const bar = glass.link;
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      style={s('display:flex; flex-direction:column; justify-content:center; align-items:center; gap:5px; width:44px; height:44px; padding:0; border:0; border-radius:12px; background:transparent; cursor:pointer')}
    >
      <span style={s(`display:block; width:20px; height:1.5px; border-radius:2px; background:${bar}; transition:transform .3s ease; transform:${open ? 'translateY(6.5px) rotate(45deg)' : 'none'}`)} />
      <span style={s(`display:block; width:20px; height:1.5px; border-radius:2px; background:${bar}; transition:opacity .2s ease; opacity:${open ? 0 : 1}`)} />
      <span style={s(`display:block; width:20px; height:1.5px; border-radius:2px; background:${bar}; transition:transform .3s ease; transform:${open ? 'translateY(-6.5px) rotate(-45deg)' : 'none'}`)} />
    </button>
  );
}

export function MobileNavSheet({ menus, isActive, open, setOpen }) {
  const [section, setSection] = useState(null);
  const { pathname, hash } = useLocation();

  // Navigating from inside the sheet has to close it; the route changes
  // underneath but the overlay would otherwise stay up over the new page.
  useEffect(() => { setOpen(false); }, [pathname, hash]);

  // The sheet scrolls on its own, so the page behind it must not. Without
  // this, iOS scrolls the document under the overlay and the reader returns
  // to a page that has moved.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div
          style={s('position:fixed; left:0; right:0; top:0; bottom:0; z-index:1; background:rgba(26,29,35,0.34); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px); animation:om-fade .2s both')}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={s('position:absolute; left:0; right:0; top:0; max-height:100dvh; overflow-y:auto; -webkit-overflow-scrolling:touch; background:#F1F3F6; border-bottom:1px solid #DFE3EA; box-shadow:0 30px 70px -40px rgba(26,29,35,0.7); padding:calc(var(--safe-t) + 76px) clamp(20px, 5vw, 40px) calc(var(--safe-b) + 28px)')}
          >
            {menus.map((menu) => {
              const expanded = section === menu.label;
              const active = isActive(menu);

              if (menu.items.length === 0) {
                return (
                  <Link
                    key={menu.label}
                    to={menu.path}
                    style={s(`display:flex; align-items:center; min-height:52px; border-bottom:1px solid #DFE3EA; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:19px; letter-spacing:-0.01em; text-decoration:none; color:${active ? '#F4601E' : '#1A1D23'}`)}
                  >{menu.label}</Link>
                );
              }

              return (
                <div key={menu.label} style={s('border-bottom:1px solid #DFE3EA')}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setSection(expanded ? null : menu.label)}
                    style={s(`display:flex; align-items:center; justify-content:space-between; width:100%; min-height:52px; padding:0; border:0; background:none; cursor:pointer; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:19px; letter-spacing:-0.01em; text-align:left; color:${active ? '#F4601E' : '#1A1D23'}`)}
                  >
                    {menu.label}
                    <span style={s(`display:block; width:9px; height:9px; margin-right:4px; border-right:1.5px solid #5A616D; border-bottom:1.5px solid #5A616D; transform:rotate(${expanded ? '-135deg' : '45deg'}) translateY(${expanded ? '-2px' : '-2px'}); transition:transform .3s ease`)} />
                  </button>

                  {expanded && (
                    <div style={s('padding:2px 0 14px; animation:om-fade .25s both')}>
                      {menu.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          style={s(`display:block; padding:11px 0 11px 14px; border-left:2px solid ${pathname === item.path ? '#F4601E' : '#DFE3EA'}; text-decoration:none`)}
                        >
                          <span style={s(`display:block; font-size:15px; font-weight:500; color:${pathname === item.path ? '#F4601E' : '#1A1D23'}`)}>{item.label}</span>
                          <span style={s('display:block; margin-top:2px; font-size:13px; line-height:1.45; color:#5A616D')}>{item.blurb}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={s('display:flex; flex-direction:column; gap:10px; margin-top:24px')}>
              <Link to="/about#contact" style={s('display:flex; align-items:center; justify-content:center; min-height:48px; border-radius:14px; border:1px solid rgba(26,29,35,0.18); color:#1A1D23; font-size:15px; font-weight:500; text-decoration:none')}>Talk to Us</Link>
              <Link to="/#book" style={s('display:flex; align-items:center; justify-content:center; min-height:48px; border-radius:14px; background:#F4601E; color:#1A1D23; font-size:15px; font-weight:500; text-decoration:none; box-shadow:0 14px 30px -16px rgba(244,96,30,0.95)')}>Request a Demo</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
