import { s } from '../lib/style';
import { CASES } from '../data/content';

// Dark band, taken from the reference's "how it works" treatment: light type
// on a near-black ground, cards with a hairline and pill tags.
//
// The pinned sideways scroller this replaces put six cards behind a horizontal
// gesture, which is awkward on a phone and hid four of them at any moment.
// These are a portfolio rather than a sequence, so they are laid out as a grid
// and carry their identifiers as labels, not as numbered steps.
const STATUS_TONE = {
  live:       { fg: 'var(--accent-deep)', bg: 'rgba(244,96,30,0.14)', bd: 'rgba(244,96,30,0.34)' },
  'in build': { fg: '#C4BCB2', bg: 'rgba(255,255,255,0.06)', bd: 'rgba(255,255,255,0.16)' },
  pilot:      { fg: '#C4BCB2', bg: 'rgba(255,255,255,0.06)', bd: 'rgba(255,255,255,0.16)' },
};

function Pill({ children, tone }) {
  const t = tone || { fg: '#A79E93', bg: 'rgba(255,255,255,0.05)', bd: 'rgba(255,255,255,0.13)' };
  return (
    <span style={s(`display:inline-flex; align-items:center; padding:6px 12px; border-radius:999px; border:1px solid ${t.bd}; background:${t.bg}; font-size:13.5px; color:${t.fg}`)}>
      {children}
    </span>
  );
}

export function Work({ pinRef }) {
  return (
    <section id="work" ref={pinRef} data-nav-dark style={s('position:relative; overflow:hidden; background:var(--dark); color:#F2EDE7; padding:clamp(76px, 11vw, 150px) 0')}>
      <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(60% 50% at 20% 0%, rgba(244,96,30,0.10), transparent 70%)')} />

      <div style={s('position:relative; max-width:var(--measure); margin:0 auto; padding:0 var(--gut)')}>
        <div data-anim="head" style={s('display:flex; align-items:center; gap:14px')}>
          <span style={s('width:26px; height:1px; background:var(--accent)')} />
          <span className="om-label" style={s('color:var(--accent)')}>Systems in production</span>
        </div>

        <h2 data-anim="head" style={s('margin:20px 0 0; max-width:18ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.017em; color:#FFFFFF')}>
          Four systems running. Two more in build.
        </h2>
        <p data-anim="head" style={s('margin:22px 0 0; max-width:56ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:#A79E93')}>
          Clients are under NDA, so each is described by what it does and what it replaced.
        </p>

        <div className="om-work" style={s('margin-top:clamp(36px, 5vw, 56px); display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:clamp(14px, 1.8vw, 20px)')}>
          {CASES.map((cs) => (
            <article
              key={cs.code}
              data-anim="card"
              style={s('padding:clamp(22px, 2.4vw, 30px); border-radius:18px; border:1px solid var(--dark-rule); background:rgba(255,255,255,0.028)')}
            >
              {/* The sys_NN code went with the revamp: engineering shorthand
                  beside a badge that already names the vertical and its status. */}
              <div style={s('display:flex; align-items:center; gap:10px; flex-wrap:wrap')}>
                <Pill tone={STATUS_TONE[cs.status]}>{cs.vertical} · {cs.status}</Pill>
              </div>

              <h3 style={s('margin:16px 0 0; font-family:var(--display); font-weight:600; font-size:clamp(19px, 1.7vw, 23px); line-height:1.2; letter-spacing:-0.012em; color:#FFFFFF')}>{cs.title}</h3>
              <p style={s('margin:12px 0 0; font-size:15.5px; line-height:1.58; color:#A79E93')}>{cs.body}</p>

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
