import { s } from '../lib/style';
import { PROBLEMS } from '../data/content';

const MONO = "font-family:var(--sans)";

// A diagnostic ledger rather than a card grid: every fault is a full-width row
// on a hairline, and each carries a reading of what the stall actually costs.
function Meter({ kind }) {
  const track = 'height:5px; border-radius:99px; background:var(--rule)';

  if (kind === 'stall') {
    // Work moves, then stops dead partway and never resumes.
    return (
      <div style={s('display:flex; align-items:center; gap:8px')}>
        <span style={s(`flex:0 0 38%; ${track}; background:#F4601E`)} />
        <span style={s('width:9px; height:9px; flex:none; border-radius:50%; border:2px solid #F4601E; background:#FFFFFF; animation:om-tick 2.2s ease-in-out infinite')} />
        <span style={s(`flex:1; height:5px; border-radius:99px; background:repeating-linear-gradient(90deg, rgba(28,25,23,0.16) 0 5px, transparent 5px 11px)`)} />
      </div>
    );
  }
  if (kind === 'split') {
    // Three segments that never join up.
    return (
      <div style={s('display:flex; align-items:center; gap:10px')}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={s(`flex:1; ${track}; background:${i === 0 ? '#F4601E' : 'var(--rule-strong)'}; animation:om-tick ${2 + i * 0.4}s ease-in-out ${i * 0.25}s infinite`)} />
        ))}
      </div>
    );
  }
  // Nothing is visible until the very end of the month.
  return (
    <div style={s('display:flex; align-items:center; gap:8px')}>
      <span style={s(`flex:1; height:5px; border-radius:99px; background:repeating-linear-gradient(90deg, rgba(28,25,23,0.16) 0 5px, transparent 5px 11px)`)} />
      <span style={s(`flex:0 0 16%; ${track}; background:#F4601E; animation:om-tick 2.4s ease-in-out infinite`)} />
    </div>
  );
}

export function Problem() {
  return (
    <section style={s('padding:clamp(48px, 7vw, 96px) 0')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <div className="om-g12" style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 6; margin:0; font-family:var(--display); font-weight:500; font-size:clamp(28px, 5.2vw, 44px); line-height:0.98; letter-spacing:-0.014em')}>Operations do not fail loudly. They stall.</h2>
          <p data-anim="head" style={s('grid-column:8 / span 4; margin:0; color:var(--ink-muted)')}>Three failures show up in every operation we audit. None of them are technology problems. All of them are handoff problems.</p>
        </div>

        <div style={s('margin-top:56px; border-top:1px solid var(--rule-strong)')}>
          {PROBLEMS.map((p) => (
            <div key={p.code} data-anim="step" className="om-g12" style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:start; padding:30px 0; border-bottom:1px solid var(--rule)')}>
              <span style={s(`grid-column:1 / span 1; ${MONO}; font-size:12px; color:var(--accent-deep); padding-top:5px`)}>{p.code}</span>
              <h3 style={s('grid-column:2 / span 3; margin:0; font-family:var(--display); font-weight:600; font-size:clamp(19px, 3vw, 24px); line-height:1.12; letter-spacing:-0.009em')}>{p.title}</h3>
              <p style={s('grid-column:6 / span 4; margin:0; font-size:15px; color:var(--ink-muted)')}>{p.body}</p>
              <div style={s('grid-column:11 / span 2; padding-top:6px')}>
                <Meter kind={p.meter} />
                <div style={s(`margin-top:11px; ${MONO}; font-size:11px; color:var(--accent-deep)`)}>{p.read}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
