import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CLOSE_DELAY = 120;

// A disclosure holding a list of links.
//
// It previously declared role="menu" / role="menuitem". That pattern describes
// an application menu and suppresses link semantics, so a screen reader stopped
// announcing these as links and stopped offering them in a links list. Site
// navigation is a list of links inside a nav, which is what it is now. The
// keyboard model is unchanged -- it was already the best code in the repo.
export function NavMenu({ menu, active, open, onOpenChange }) {
  const timer = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);

  // A bare timeout would keep firing after unmount during a route change.
  useEffect(() => () => clearTimeout(timer.current), []);

  const cancelClose = () => clearTimeout(timer.current);
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => onOpenChange(false), CLOSE_DELAY);
  };

  const focusItem = (i) => {
    const clamped = Math.max(0, Math.min(i, menu.items.length - 1));
    itemRefs.current[clamped]?.focus();
  };

  const openAndFocusFirst = () => {
    onOpenChange(true);
    requestAnimationFrame(() => focusItem(0));
  };

  const close = ({ refocus }) => {
    cancelClose();
    onOpenChange(false);
    if (refocus) triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      openAndFocusFirst();
    } else if (e.key === 'Escape') {
      close({ refocus: false });
    }
  };

  const onItemKeyDown = (e, i) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(i + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(i - 1); }
    else if (e.key === 'Escape') { e.preventDefault(); close({ refocus: true }); }
    else if (e.key === 'Tab') {
      const lastIndex = menu.items.length - 1;
      if (!e.shiftKey && i === lastIndex) close({ refocus: false });
      else if (e.shiftKey && i === 0) close({ refocus: false });
    }
  };

  return (
    <div
      className="navmenu"
      onMouseEnter={() => { cancelClose(); onOpenChange(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        className={`nav__link navmenu__trigger${active ? ' is-active' : ''}${open ? ' is-open' : ''}`}
        onKeyDown={onTriggerKeyDown}
        onClick={() => (open ? close({ refocus: false }) : onOpenChange(true))}
      >
        {menu.label}
        <span aria-hidden="true" className="navmenu__caret">▾</span>
      </button>

      {open && (
        <ul className="navmenu__panel" aria-label={menu.label}>
          {menu.items.map((item, i) => (
            <li key={item.path}>
              <Link
                to={item.path}
                ref={(el) => { itemRefs.current[i] = el; }}
                onKeyDown={(e) => onItemKeyDown(e, i)}
                onClick={() => close({ refocus: false })}
                className="navmenu__item"
              >
                <span className="navmenu__item-label">{item.label}</span>
                <span className="navmenu__item-blurb">{item.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
