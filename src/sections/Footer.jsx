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
  { head: 'Platforms', span: '4 / span 2', items: menu('Platforms') },
  { head: 'Solutions', span: '6 / span 3', items: menu('Solutions') },
  { head: 'Industries', span: '9 / span 2', items: menu('Industries') },
];

function FooterColumn({ head, span, items, children }) {
  return (
    <div style={s(`grid-column:${span}; display:flex; flex-direction:column; align-items:flex-start`)}>
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
      <div className="om-gfoot" style={s('position:relative; z-index:1; max-width:var(--wide); margin:0 auto; padding:0 var(--gut); display:grid; grid-template-columns:repeat(12, 1fr); gap:clamp(28px, 3vw, 44px) 20px')}>
        <div className="om-foot-brand" style={s('grid-column:1 / span 3')}>
          <img src="/assets/ideora-lockup.png" alt="Ideora Labs" style={s('height:34px; width:auto; display:block')} />
          <p style={s('margin:20px 0 0; font-size:15px; line-height:1.5; max-width:26ch')}>Agentic AI and operational automation for large operators.</p>
        </div>

        {COLUMNS.map((col) => (
          <FooterColumn key={col.head} head={col.head} span={col.span} items={col.items} />
        ))}

        <FooterColumn head="Company" span="11 / span 2" items={[{ path: '/about', label: 'About' }, { path: '/insights', label: 'Insights' }]}>
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
      <div aria-hidden="true" style={s('overflow:hidden; height:clamp(64px, 12vw, 172px); margin-top:clamp(20px, 4vw, 40px); pointer-events:none; user-select:none')}>
        <span style={s('display:block; text-align:center; white-space:nowrap; font-family:var(--display); font-weight:600; font-size:clamp(128px, 25vw, 400px); line-height:0.78; letter-spacing:-0.045em; color:rgba(28,25,23,0.05)')}>Ideora</span>
      </div>
    </footer>
  );
}
