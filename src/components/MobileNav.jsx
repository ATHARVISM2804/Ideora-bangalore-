import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WA_TALK, WA_DEMO, WA_LINK } from '../lib/whatsapp';
import { Button } from './ui';

// The phone counterpart to NavMenu. The desktop menus open on hover, which a
// touch screen has no way to express: iOS fires a synthetic hover on first tap
// and the link fires on the second, so the dropdowns were both undiscoverable
// and easy to trigger by accident. Here each menu is an accordion the reader
// opens deliberately, and every row is a real tap target.

export function MobileNavTrigger({ open, setOpen }) {
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      className="navsheet__trigger"
    >
      <span className="navsheet__bar" />
      <span className="navsheet__bar" />
      <span className="navsheet__bar" />
    </button>
  );
}

export function MobileNavSheet({ menus, isActive, open, setOpen }) {
  const [section, setSection] = useState(null);
  const { pathname, hash } = useLocation();
  const sheetRef = useRef(null);
  const restoreRef = useRef(null);

  // Navigating from inside the sheet has to close it; the route changes
  // underneath but the overlay would otherwise stay up over the new page.
  useEffect(() => { setOpen(false); }, [pathname, hash, setOpen]);

  // The sheet scrolls on its own, so the page behind it must not. Without
  // this, iOS scrolls the document under the overlay and the reader returns
  // to a page that has moved.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Focus management. The sheet previously had none: Tab walked straight out
  // of it into the page behind, and closing it dropped focus at the top of the
  // document rather than back on the button that opened it.
  useEffect(() => {
    if (!open) {
      restoreRef.current?.focus?.();
      restoreRef.current = null;
      return;
    }

    restoreRef.current = document.activeElement;
    const node = sheetRef.current;
    const focusables = () => Array.from(
      node?.querySelectorAll('a[href], button:not([disabled])') ?? [],
    );
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <>
      {/* The scrim is a sibling of the sheet, not its parent, so dismissing by
          tapping outside does not mean putting a click handler on an element
          that wraps the dialog. It is presentational: Escape and the trigger
          are the keyboard routes out. */}
      <div className="navsheet__scrim" aria-hidden="true" onClick={() => setOpen(false)} />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="navsheet"
      >
        {menus.map((menu) => {
          const expanded = section === menu.label;
          const active = isActive(menu);

          if (menu.items.length === 0) {
            return (
              <div key={menu.label} className="navsheet__group">
                <Link to={menu.path} className={`navsheet__row${active ? ' is-active' : ''}`}>
                  {menu.label}
                </Link>
              </div>
            );
          }

          return (
            <div key={menu.label} className="navsheet__group">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setSection(expanded ? null : menu.label)}
                className={`navsheet__row${active ? ' is-active' : ''}`}
              >
                {menu.label}
                <span aria-hidden="true" className="navsheet__caret">▾</span>
              </button>

              {expanded && (
                <div className="navsheet__sub">
                  {menu.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`navsheet__sublink${pathname === item.path ? ' is-active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="navsheet__actions">
          <Button href={WA_DEMO} {...WA_LINK} block onClick={() => setOpen(false)}>
            Request a demo
          </Button>
          <Button href={WA_TALK} {...WA_LINK} variant="secondary" block onClick={() => setOpen(false)}>
            Talk to us
          </Button>
        </div>
      </div>
    </>
  );
}
