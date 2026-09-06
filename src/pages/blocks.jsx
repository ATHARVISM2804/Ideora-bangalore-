import { Link } from 'react-router-dom';
import { s } from '../lib/style';

const MONO = "font-family:'JetBrains Mono', monospace";
const WRAP = 'max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px';

export function PageHero({ eyebrow, heading, lede }) {
  return (
    <section style={s('padding:clamp(36px, 5vw, 64px) 0 clamp(48px, 7vw, 96px)')}>
      <div className="om-g12" style={s(WRAP)}>
        <div style={s('grid-column:1 / span 8')}>
          <div data-anim="hero-1" style={s(`display:inline-flex; align-items:center; gap:9px; padding:8px 15px; border-radius:99px; border:1px solid rgba(26,29,35,0.08); background:#FFFFFF; ${MONO}; font-size:12px; color:#5A616D`)}>{eyebrow}</div>
          <h1 data-anim="head" style={s('margin:28px 0 0; font-family:var(--serif); font-weight:500; font-size:clamp(34px, 7.5vw, 64px); line-height:0.98; letter-spacing:-0.035em')}>{heading}</h1>
          <p style={s('margin:24px 0 0; max-width:52ch; font-size:18px; color:#5A616D')}>{lede}</p>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip({ items }) {
  return (
    <section style={s('padding:0 0 clamp(48px, 7vw, 96px)')}>
      <div className="om-g12" style={s(WRAP)}>
        <div className="om-gstats" style={s(`grid-column:1 / span 12; display:grid; grid-template-columns:repeat(${items.length}, 1fr); gap:20px; border-top:1px solid #DFE3EA; border-bottom:1px solid #DFE3EA; padding:28px 0`)}>
          {items.map((it) => (
            <div key={it.label}>
              <div style={s(`${MONO}; font-size:12px; color:#5A616D`)}>{it.label}</div>
              <div style={s('margin-top:8px; font-family:var(--serif); font-weight:500; font-size:clamp(18px, 2.6vw, 22px); letter-spacing:-0.02em')}>{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProseSections({ sections }) {
  return (
    <section style={s('padding:0 0 clamp(56px, 8vw, 120px)')}>
      <div className="om-g12" style={s(WRAP)}>
        {sections.map((sec) => (
          <div key={sec.title} data-anim="card" className="om-g12" style={s('grid-column:1 / span 12; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px; padding:40px 0; border-top:1px solid #DFE3EA')}>
            <h2 style={s('grid-column:1 / span 4; margin:0; font-family:var(--serif); font-weight:500; font-size:clamp(22px, 3.8vw, 30px); line-height:1.05; letter-spacing:-0.03em')}>{sec.title}</h2>
            <p style={s('grid-column:6 / span 7; margin:0; font-size:17px; color:#5A616D')}>{sec.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Related({ items }) {
  if (!items.length) return null;
  return (
    <section style={s('padding:0 0 clamp(56px, 8vw, 120px)')}>
      <div className="om-g12" style={s(WRAP)}>
        <div style={s('grid-column:1 / span 12')}>
          <div style={s(`${MONO}; font-size:12px; color:#5A616D; margin-bottom:16px`)}>related</div>
          <div style={s('display:flex; gap:12px; flex-wrap:wrap')}>
            {items.map((it) => (
              <Link key={it.path} to={it.path} style={s('padding:10px 16px; border-radius:99px; border:1px solid rgba(26,29,35,0.1); background:#FFFFFF; color:#1A1D23; font-size:14px; text-decoration:none')}>{it.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageCta({ heading, body }) {
  return (
    <section style={s('padding:0 0 clamp(64px, 10vw, 160px)')}>
      <div className="om-g12" style={s(WRAP)}>
        <div data-nav-dark style={s('grid-column:1 / span 12; border-radius:24px; background:#1A1D23; color:#F1F3F6; padding:64px 56px; display:flex; align-items:center; justify-content:space-between; gap:40px')}>
          <div>
            <h2 style={s('margin:0; font-family:var(--serif); font-weight:500; font-size:clamp(25px, 4.4vw, 36px); line-height:1.05; letter-spacing:-0.03em')}>{heading}</h2>
            <p style={s('margin:16px 0 0; max-width:52ch; color:#C6CCD6')}>{body}</p>
          </div>
          <Link to="/#book" style={s('flex:none; padding:14px 24px; border-radius:13px; background:#F4601E; color:#1A1D23; font-size:15px; font-weight:500; text-decoration:none; box-shadow:0 10px 26px -14px rgba(244,96,30,0.95)')}>Request a Demo</Link>
        </div>
      </div>
    </section>
  );
}
