import { Link } from 'react-router-dom';
import { s } from '../lib/style';
import { CASES } from '../data/content';
import { CaseArt } from '../components/CaseArt';
import { Hover } from '../components/Hover';

// The case studies. Sits directly after "what we build", because the question a
// reader has the moment they understand the offer is who you have done it for.
//
// Was a near-black band; the site is light throughout now, so it separates
// itself with a sunken ground and raised cards instead of an inverted one.
const STATUS_TONE = {
  live:       { fg: 'var(--accent-deep)', bg: 'var(--accent-tint)',  bd: 'rgba(244,96,30,0.34)' },
  'in build': { fg: 'var(--ink-muted)',   bg: 'var(--bg-sunken)',    bd: 'var(--rule)' },
  pilot:      { fg: 'var(--ink-muted)',   bg: 'var(--bg-sunken)',    bd: 'var(--rule)' },
};

// Where a card goes when there is somewhere to go. Finance and Legal have no
// page yet, so those two stay plain — better than a link into the 404.
const CASE_PATH = {
  'Automotive':     '/industries/automotive',
  'Real estate':    '/industries/real-estate',
  'Healthcare':     '/industries/healthcare',
  'Cross-vertical': '/platforms/ops-console',
};

function Pill({ children, tone }) {
  const t = tone || { fg: 'var(--ink-muted)', bg: 'var(--bg)', bd: 'var(--rule)' };
  return (
    <span style={s(`display:inline-flex; align-items:center; padding:6px 12px; border-radius:999px; border:1px solid ${t.bd}; background:${t.bg}; font-size:13.5px; color:${t.fg}`)}>
      {children}
    </span>
  );
}

const CARD = 'display:block; border-radius:18px; border:1px solid var(--rule); background:var(--raised); overflow:hidden; text-decoration:none; color:inherit; box-shadow:0 18px 44px -38px rgba(28,25,23,0.4); transition:transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease, border-color .25s ease';
const CARD_HOVER = 'transform:translateY(-3px); border-color:var(--rule-strong); box-shadow:0 30px 60px -38px rgba(28,25,23,0.5)';

function CaseBody({ cs, to }) {
  return (
    <>
      <div style={s('aspect-ratio:16 / 10; background:var(--bg-sunken); border-bottom:1px solid var(--rule)')}>
        <CaseArt vertical={cs.vertical} />
      </div>

      <div style={s('padding:clamp(20px, 2.2vw, 26px)')}>
        <Pill tone={STATUS_TONE[cs.status]}>{cs.vertical} · {cs.status}</Pill>

        <h3 style={s('margin:14px 0 0; font-family:var(--display); font-weight:600; font-size:clamp(19px, 1.7vw, 23px); line-height:1.2; letter-spacing:-0.012em; color:var(--ink)')}>{cs.title}</h3>
        <p style={s('margin:10px 0 0; font-size:15.5px; line-height:1.58; color:var(--ink-muted)')}>{cs.body}</p>

        <div style={s('margin-top:18px; display:flex; align-items:center; gap:8px; flex-wrap:wrap')}>
          <Pill>replaced {cs.replaced}</Pill>
          <Pill>{cs.status === 'live' ? 'live since' : cs.status === 'pilot' ? 'pilot since' : 'target'} {cs.since}</Pill>
        </div>

        {to && (
          <div style={s('margin-top:18px; font-size:15px; font-weight:500; color:var(--accent-deep)')}>
            Read the case study →
          </div>
        )}
      </div>
    </>
  );
}

function CaseCard({ cs }) {
  const to = CASE_PATH[cs.vertical];

  if (!to) {
    return (
      <article data-anim="card" style={s(CARD)}>
        <CaseBody cs={cs} />
      </article>
    );
  }

  return (
    <Hover as={Link} to={to} data-anim="card" style={CARD} hoverStyle={CARD_HOVER}>
      <CaseBody cs={cs} to={to} />
    </Hover>
  );
}

export function Work({ pinRef }) {
  return (
    <section id="work" ref={pinRef} style={s('position:relative; overflow:hidden; background:var(--bg-sunken); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:clamp(76px, 11vw, 150px) 0')}>
      <div style={s('position:relative; max-width:var(--measure); margin:0 auto; padding:0 var(--gut)')}>
        <div data-anim="head" style={s('display:flex; align-items:center; gap:14px')}>
          <span style={s('width:26px; height:1px; background:var(--accent)')} />
          <span className="om-label" style={s('color:var(--accent)')}>Case studies</span>
        </div>

        <h2 data-anim="head" style={s('margin:20px 0 0; max-width:18ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.017em; color:var(--ink)')}>
          Four systems running. Two more in build.
        </h2>
        <p data-anim="head" style={s('margin:22px 0 0; max-width:56ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
          Clients are under NDA, so each is described by what it does and what it replaced.
        </p>

        <div className="om-work" style={s('margin-top:clamp(36px, 5vw, 56px); display:grid; grid-template-columns:repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap:clamp(14px, 1.8vw, 20px)')}>
          {CASES.map((cs) => <CaseCard key={cs.code} cs={cs} />)}
        </div>
      </div>
    </section>
  );
}
