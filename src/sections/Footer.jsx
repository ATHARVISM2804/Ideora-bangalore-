import { s } from '../lib/style';
import { Hover } from '../components/Hover';

const NAV_LINK = 'color:#5A616D; font-size:14px; transition:color .25s';
const NAV_LINK_HOVER = 'color:#1A1D23';

const PRODUCT = [
  ['#services', 'Services'],
  ['#industries', 'Industries'],
  ['#work', 'Work'],
  ['#about', 'About'],
];

const VERTICALS = ['Automotive', 'Real estate', 'Healthcare'];

export function Footer() {
  return (
    <footer style={s('border-top:1px solid #DFE3EA; background:rgba(255,255,255,0.62); backdrop-filter:blur(16px); padding:clamp(44px, 6vw, 80px) 0 36px; color:#5A616D')}>
      <div className="om-gfoot" style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px')}>
        <div className="om-foot-brand" style={s('grid-column:1 / span 4')}>
          <img src="/assets/ideora-lockup.png" alt="Ideora Labs" style={s('height:34px; width:auto; display:block')} />
          <p style={s('margin:20px 0 0; font-size:14px; max-width:26ch')}>Agentic AI and operational automation for large operators.</p>
        </div>
        <div style={s('grid-column:6 / span 2; display:flex; flex-direction:column; gap:12px')}>
          {PRODUCT.map(([href, label]) => (
            <Hover key={label} as="a" href={href} style={NAV_LINK} hoverStyle={NAV_LINK_HOVER}>{label}</Hover>
          ))}
        </div>
        <div style={s('grid-column:8 / span 2; display:flex; flex-direction:column; gap:12px')}>
          {VERTICALS.map((label) => (
            <Hover key={label} as="a" href="#industries" style={NAV_LINK} hoverStyle={NAV_LINK_HOVER}>{label}</Hover>
          ))}
        </div>
        <div style={s('grid-column:11 / span 2; display:flex; flex-direction:column; gap:12px; font-size:14px')}>
          <Hover as="a" href="mailto:work@ideoralabs.com" style="color:#1A1D23; transition:color .25s" hoverStyle="color:#F4601E">work@ideoralabs.com</Hover>
          <span>Pune · Dubai</span>
        </div>
      </div>
      <div style={s('max-width:1400px; margin:clamp(32px, 5vw, 52px) auto 0; padding:24px clamp(20px, 5vw, 40px) 0; gap:12px; flex-wrap:wrap; border-top:1px solid #DFE3EA; display:flex; justify-content:space-between; font-size:13px')}>
        <span>2026 Ideora Labs</span>
        <span style={s("display:flex; align-items:center; gap:8px; font-family:'JetBrains Mono', monospace; font-size:12px")}>
          <span style={s('width:6px; height:6px; border-radius:50%; background:#F4601E; animation:om-blink 2.4s infinite')} />all systems nominal
        </span>
      </div>
    </footer>
  );
}
