import { s } from '../lib/style';
import { CASES } from '../data/content';

// Was a near-black band. The site is light throughout now, so this separates
// itself with a sunken ground and raised cards instead of an inverted one.
//
// The pinned sideways scroller this replaces put six cards behind a horizontal
// gesture, which is awkward on a phone and hid four of them at any moment.
// These are a portfolio rather than a sequence, so they are laid out as a grid
// and carry their identifiers as labels, not as numbered steps.
const STATUS_TONE = {
  live:       { fg: 'var(--accent-deep)', bg: 'var(--accent-tint)',  bd: 'rgba(244,96,30,0.34)' },
  'in build': { fg: 'var(--ink-muted)',   bg: 'var(--bg-sunken)',    bd: 'var(--rule)' },
  pilot:      { fg: 'var(--ink-muted)',   bg: 'var(--bg-sunken)',    bd: 'var(--rule)' },
};

function Pill({ children, tone }) {
  const t = tone || { fg: 'var(--ink-muted)', bg: 'var(--bg)', bd: 'var(--rule)' };
  return (
    <span style={s(`display:inline-flex; align-items:center; padding:6px 12px; border-radius:999px; border:1px solid ${t.bd}; background:${t.bg}; font-size:13.5px; color:${t.fg}`)}>
      {children}
    </span>
  );
}

export function Work({ pinRef }) {
  return (
    <section id="work" ref={pinRef} style={s('position:relative; overflow:hidden; background:var(--bg-sunken); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:clamp(76px, 11vw, 150px) 0')}>
      <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(60% 50% at 20% 0%, rgba(244,96,30,0.05), transparent 70%)')} />

      <div style={s('position:relative; max-width:var(--measure); margin:0 auto; padding:0 var(--gut)')}>
        <div data-anim="head" style={s('display:flex; align-items:center; gap:14px')}>
          <span style={s('width:26px; height:1px; background:var(--accent)')} />
          <span className="om-label" style={s('color:var(--accent)')}>Systems in production</span>
        </div>

        <h2 data-anim="head" style={s('margin:20px 0 0; max-width:18ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.017em; color:var(--ink)')}>
          Four systems running. Two more in build.
        </h2>
        <p data-anim="head" style={s('margin:22px 0 0; max-width:56ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
          Clients are under NDA, so each is described by what it does and what it replaced.
        </p>

        <div className="om-work" style={s('margin-top:clamp(36px, 5vw, 56px); display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:clamp(14px, 1.8vw, 20px)')}>
          {CASES.map((cs) => (
            <article
              key={cs.code}
              data-anim="card"
              style={s('padding:clamp(22px, 2.4vw, 30px); border-radius:18px; border:1px solid var(--rule); background:var(--raised); box-shadow:0 18px 44px -38px rgba(28,25,23,0.4)')}
            >
              {/* The sys_NN code went with the revamp: engineering shorthand
                  beside a badge that already names the vertical and its status. */}
              <div style={s('display:flex; align-items:center; gap:10px; flex-wrap:wrap')}>
                <Pill tone={STATUS_TONE[cs.status]}>{cs.vertical} · {cs.status}</Pill>
              </div>

              <h3 style={s('margin:16px 0 0; font-family:var(--display); font-weight:600; font-size:clamp(19px, 1.7vw, 23px); line-height:1.2; letter-spacing:-0.012em; color:var(--ink)')}>{cs.title}</h3>
              <p style={s('margin:12px 0 0; font-size:15.5px; line-height:1.58; color:var(--ink-muted)')}>{cs.body}</p>

              <div style={s('margin-top:20px; display:flex; align-items:center; gap:8px; flex-wrap:wrap')}>
                <Pill>replaced {cs.replaced}</Pill>
                <Pill>{cs.status === 'live' ? 'live since' : cs.status === 'pilot' ? 'pilot since' : 'target'} {cs.since}</Pill>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
