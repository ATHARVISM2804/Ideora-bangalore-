import { Link } from 'react-router-dom';
import { s } from '../lib/style';
import { Hover } from '../components/Hover';
import { MENUS } from '../data/nav';

const NAV_LINK = 'color:var(--ink-muted); font-size:15px; line-height:1.4; transition:color .25s; text-decoration:none';
const NAV_LINK_HOVER = 'color:var(--ink)';

// Wide-tracked caps, the quietest thing on the page. These label the columns
// rather than competing with them, so they sit two steps down in weight and
// colour from the links beneath.
const COL_HEAD = 'margin:0 0 18px; font-family:var(--sans); font-size:11px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-faint)';

const menu = (label) => MENUS.find((m) => m.label === label)?.items ?? [];

// Columns come from the same MENUS the navbar renders, so the footer cannot
// drift from it. Only the four menus that hold items are listed: About and
// Insights are single pages and live in the Company column instead.
const COLUMNS = [
  { head: 'Platforms', items: menu('Platforms') },
  { head: 'Solutions', items: menu('Solutions') },
  { head: 'Industries', items: menu('Industries') },
];

function FooterColumn({ head, items, children }) {
  return (
    <div style={s('display:flex; flex-direction:column; align-items:flex-start')}>
      <h2 style={s(COL_HEAD)}>{head}</h2>
      <div style={s('display:flex; flex-direction:column; align-items:flex-start; gap:12px')}>
        {items.map((item) => (
          <Hover key={item.path} as={Link} to={item.path} style={NAV_LINK} hoverStyle={NAV_LINK_HOVER}>{item.label}</Hover>
        ))}
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={s('position:relative; overflow:hidden; border-top:1px solid var(--rule); background:rgba(255,255,255,0.62); backdrop-filter:blur(16px); padding:clamp(52px, 7vw, 88px) 0 0; color:var(--ink-muted)')}>
      {/* Brand block takes half again the width of a link column; the four link
          columns are equal so they read as an even rhythm across the page. The
          breakpoints in global.css override this template on the way down. */}
      <div className="om-gfoot" style={s('position:relative; z-index:1; max-width:var(--wide); margin:0 auto; padding:0 var(--gut); display:grid; grid-template-columns:1.5fr repeat(4, 1fr); gap:clamp(28px, 3vw, 44px) clamp(20px, 2.4vw, 36px)')}>
        <div className="om-foot-brand">
          <img src="/assets/ideora-lockup.png" alt="Ideora Labs" style={s('height:34px; width:auto; display:block')} />
          <p style={s('margin:20px 0 0; font-size:15px; line-height:1.5; max-width:26ch')}>Agentic AI and operational automation for large operators.</p>
        </div>

        {COLUMNS.map((col) => (
          <FooterColumn key={col.head} head={col.head} items={col.items} />
        ))}

        <FooterColumn head="Company" items={[{ path: '/about', label: 'About' }, { path: '/insights', label: 'Insights' }]}>
          <Hover as={Link} to="/about#contact" style={NAV_LINK} hoverStyle={NAV_LINK_HOVER}>Contact</Hover>
          <Hover as="a" href="mailto:work@ideoralabs.com" style="color:var(--ink); font-size:15px; transition:color .25s; text-decoration:none" hoverStyle="color:var(--accent)">work@ideoralabs.com</Hover>
          <span style={s('font-size:15px; color:var(--ink-faint)')}>Pune · Dubai</span>
        </FooterColumn>
      </div>

      <div style={s('position:relative; z-index:1; max-width:var(--wide); margin:clamp(40px, 5vw, 64px) auto 0; padding:24px var(--gut) 0; gap:12px; flex-wrap:wrap; border-top:1px solid var(--rule); display:flex; justify-content:space-between; font-size:13px')}>
        <span>© 2026 Ideora Labs. Agentic systems for live operations.</span>
        <span style={s('display:flex; align-items:center; gap:8px; font-family:var(--mono); font-size:12px')}>
          <span style={s('width:6px; height:6px; border-radius:50%; background:var(--accent); animation:om-blink 2.4s infinite')} />all systems nominal
        </span>
      </div>

      {/* Oversized wordmark, clipped by the footer's own edge. Decorative only:
          the band is shorter than the letterforms, so their feet are cut off. */}
      <div aria-hidden="true" style={s('overflow:hidden; font-size:clamp(140px, 30vw, 470px); height:0.95em; margin-top:clamp(18px, 3vw, 34px); pointer-events:none; user-select:none')}>
        <span style={s('display:block; text-align:center; white-space:nowrap; font-family:var(--display); font-weight:600; font-size:1em; line-height:0.92; letter-spacing:-0.05em; color:rgba(28,25,23,0.05)')}>Ideora</span>
      </div>
    </footer>
  );
}
