import { Link } from 'react-router-dom';
import { s } from '../lib/style';
import { CASES } from '../data/content';

const MONO = "font-family:'JetBrains Mono', monospace";
const WRAP = 'max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px';

export function PageHero({ eyebrow, heading, lede }) {
  return (
    <section style={s('padding:clamp(36px, 5vw, 64px) 0 clamp(48px, 7vw, 96px)')}>
      <div className="om-g12" style={s(WRAP)}>
        <div style={s('grid-column:1 / span 8')}>
          <div data-anim="hero-1" style={s(`display:inline-flex; align-items:center; gap:9px; padding:8px 15px; border-radius:99px; border:1px solid rgba(26,29,35,0.08); background:#FFFFFF; ${MONO}; font-size:12px; color:#5A616D`)}>{eyebrow}</div>
          <h1 data-anim="head" style={s('margin:28px 0 0; font-family:var(--display); font-weight:500; font-size:clamp(34px, 7.5vw, 64px); line-height:0.98; letter-spacing:-0.016em')}>{heading}</h1>
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
              <div style={s('margin-top:8px; font-family:var(--display); font-weight:500; font-size:clamp(18px, 2.6vw, 22px); letter-spacing:-0.009em')}>{it.value}</div>
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
            <h2 style={s('grid-column:1 / span 4; margin:0; font-family:var(--display); font-weight:500; font-size:clamp(22px, 3.8vw, 30px); line-height:1.05; letter-spacing:-0.014em')}>{sec.title}</h2>
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
              <Link key={it.path} to={it.path} style={s('padding:10px 16px; border-radius:99px; border:1px solid var(--rule); background:var(--raised); color:var(--ink); font-size:14px; text-decoration:none')}>{it.label}</Link>
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
        <div style={s('grid-column:1 / span 12; border-radius:24px; background:var(--raised); color:var(--ink); border:1px solid var(--rule); padding:64px 56px; display:flex; align-items:center; justify-content:space-between; gap:40px')}>
          <div>
            <h2 style={s('margin:0; font-family:var(--display); font-weight:500; font-size:clamp(25px, 4.4vw, 36px); line-height:1.05; letter-spacing:-0.014em')}>{heading}</h2>
            <p style={s('margin:16px 0 0; max-width:52ch; color:var(--ink-muted)')}>{body}</p>
          </div>
          <Link to="/#book" style={s('flex:none; padding:14px 24px; border-radius:13px; background:var(--accent); color:#FFFFFF; font-size:15px; font-weight:500; text-decoration:none; box-shadow:0 14px 32px -16px rgba(244,96,30,0.7)')}>Request a Demo</Link>
        </div>
      </div>
    </section>
  );
}

// A case study, built from the CASES entry for a vertical rather than from new
// claims. The site states that clients are under NDA, so there is no company
// name, no logo and no revenue figure here — what it does, what it replaced,
// and when it went live is everything we can actually stand behind.
export function CaseStudy({ vertical, situation, built, changed }) {
  const cs = CASES.find((c) => c.vertical === vertical);
  if (!cs) return null;

  const COL = [
    { head: 'The situation', body: situation },
    { head: 'What we built', body: built || cs.body },
    { head: 'What changed',  body: changed },
  ].filter((c) => c.body);

  return (
    <section style={s('padding:0 0 clamp(56px, 8vw, 120px)')}>
      <div style={s(WRAP)}>
        <div style={s('grid-column:1 / span 12; border:1px solid var(--rule); border-radius:20px; background:var(--raised); overflow:hidden; box-shadow:0 30px 70px -55px rgba(28,25,23,0.45)')}>

          <div style={s('padding:clamp(28px, 3.4vw, 44px) clamp(24px, 3vw, 44px) 0; display:flex; align-items:center; gap:12px; flex-wrap:wrap')}>
            <span className="om-label">Case study</span>
            <span style={s('display:inline-flex; align-items:center; gap:7px; padding:5px 12px; border-radius:999px; border:1px solid rgba(244,96,30,0.34); background:var(--accent-tint); font-size:13px; color:var(--accent-deep)')}>
              <span style={s('width:6px; height:6px; border-radius:50%; background:var(--accent)')} />
              {cs.vertical} · {cs.status === 'live' ? `live since ${cs.since}` : `${cs.status} · ${cs.since}`}
            </span>
          </div>

          <h2 style={s('margin:16px 0 0; padding:0 clamp(24px, 3vw, 44px); max-width:22ch; font-family:var(--display); font-weight:600; font-size:clamp(25px, 3vw, 38px); line-height:1.1; letter-spacing:-0.013em; color:var(--ink)')}>
            {cs.title}
          </h2>

          <div style={s(`margin-top:clamp(26px, 3vw, 38px); padding:0 clamp(24px, 3vw, 44px) clamp(28px, 3.4vw, 40px); display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:clamp(20px, 2.6vw, 36px)`)}>
            {COL.map((c) => (
              <div key={c.head}>
                <div className="om-label" style={s('font-size:10.5px; letter-spacing:0.13em')}>{c.head}</div>
                <p style={s('margin:10px 0 0; font-size:16px; line-height:1.6; color:var(--ink-muted)')}>{c.body}</p>
              </div>
            ))}
          </div>

          <div style={s('padding:16px clamp(24px, 3vw, 44px); border-top:1px solid var(--rule); background:var(--bg-sunken); font-size:14.5px; color:var(--ink-muted)')}>
            Replaced {cs.replaced}. Client is under NDA, so the system is described by what it does rather than who runs it.
          </div>

        </div>
      </div>
    </section>
  );
}

// What the client actually receives. A services page that only describes an
// approach leaves the reader guessing what lands on their desk; this is the
// deliverables list, in nouns.
export function Deliverables({ items, head = 'What you get' }) {
  if (!items?.length) return null;
  return (
    <section style={s('padding:0 0 clamp(56px, 8vw, 110px)')}>
      <div style={s(WRAP)}>
        <div style={s('grid-column:1 / span 12')}>
          <div className="om-label">{head}</div>
          <div style={s('margin-top:clamp(22px, 2.6vw, 32px); display:grid; grid-template-columns:repeat(auto-fit, minmax(258px, 1fr)); gap:clamp(16px, 2vw, 24px)')}>
            {items.map((it) => (
              <div key={it.title} style={s('padding:clamp(20px, 2.2vw, 26px); border:1px solid var(--rule); border-radius:14px; background:var(--raised)')}>
                <div style={s('display:flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:var(--accent-tint); color:var(--accent-deep); font-size:13px; font-weight:600')}>✓</div>
                <div style={s('margin-top:14px; font-family:var(--display); font-weight:600; font-size:18.5px; line-height:1.25; color:var(--ink)')}>{it.title}</div>
                <p style={s('margin:8px 0 0; font-size:15.5px; line-height:1.55; color:var(--ink-muted)')}>{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// The objections. A senior operator reads a services page with four or five
// worries already formed — cost, disruption, their people, what happens when it
// gets something wrong. Answering them on the page is worth more than another
// paragraph of capability.
export function Faq({ items, head = 'Questions we get asked' }) {
  if (!items?.length) return null;
  return (
    <section style={s('padding:0 0 clamp(56px, 8vw, 110px)')}>
      <div style={s(WRAP)}>
        <div style={s('grid-column:1 / span 12')}>
          <div className="om-label">{head}</div>
          <dl style={s('margin:clamp(22px, 2.6vw, 32px) 0 0; border-top:1px solid var(--rule)')}>
            {items.map((it) => (
              <div key={it.q} style={s('padding:clamp(20px, 2.4vw, 28px) 0; border-bottom:1px solid var(--rule); display:grid; grid-template-columns:minmax(0, 1fr); gap:10px')}>
                <dt style={s('font-family:var(--display); font-weight:600; font-size:clamp(18px, 1.5vw, 21px); line-height:1.3; color:var(--ink)')}>{it.q}</dt>
                <dd style={s('margin:0; max-width:74ch; font-size:16px; line-height:1.62; color:var(--ink-muted)')}>{it.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
