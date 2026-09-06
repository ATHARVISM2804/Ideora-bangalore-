import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { s } from '../lib/style';

const CLOSE_DELAY = 120;

export function NavMenu({ menu, glass, active, open, onOpenChange }) {
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
      style={s('position:relative')}
      onMouseEnter={() => { cancelClose(); onOpenChange(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onKeyDown={onTriggerKeyDown}
        onClick={() => (open ? close({ refocus: false }) : onOpenChange(true))}
        style={s(`display:flex; align-items:center; gap:6px; border:0; background:${open ? 'var(--rule)' : 'transparent'}; cursor:pointer; font-family:inherit; color:${active ? '#F4601E' : glass.link}; font-size:14px; font-weight:500; padding:8px 14px; border-radius:12px; transition:color .3s, background .3s`)}
      >
        {menu.label}
        <span
          aria-hidden="true"
          style={s(`display:inline-block; font-size:10px; line-height:1; transform:rotate(${open ? 180 : 0}deg); transition:transform .25s ease`)}
        >▾</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={menu.label}
          style={s(`position:absolute; top:calc(100% + 10px); left:0; min-width:280px; padding:8px; border-radius:16px; backdrop-filter:blur(30px) saturate(190%); -webkit-backdrop-filter:blur(30px) saturate(190%); z-index:80; ${glass.panel}`)}
        >
          {menu.items.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              ref={(el) => { itemRefs.current[i] = el; }}
              onKeyDown={(e) => onItemKeyDown(e, i)}
              onClick={() => close({ refocus: false })}
              style={s(`display:block; padding:10px 12px; border-radius:11px; text-decoration:none; transition:background .2s`)}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, s(glass.panelItemHover))}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={s(`display:block; color:${glass.link}; font-size:14px; font-weight:500; margin-bottom:2px`)}>{item.label}</span>
              <span style={s('display:block; color:var(--ink-muted); font-size:12px; line-height:1.4')}>{item.blurb}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
