import { s } from '../lib/style';
import { STEPS } from '../data/content';

export function Engagement({ ruleRef }) {
  return (
    <section style={s('padding:0 0 clamp(72px, 11vw, 184px)')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <div className="om-g12" style={s('display:grid; grid-template-columns:repeat(12, 1fr); gap:20px')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 5; margin:0; font-family:var(--serif); font-weight:500; font-size:clamp(28px, 5.2vw, 44px); line-height:0.98; letter-spacing:-0.03em')}>How an engagement runs</h2>
          <p style={s('grid-column:7 / span 5; margin:0; align-self:end; color:var(--ink-muted)')}>Four stages, roughly ten weeks. You approve the design before anything is built, and you keep the dashboard afterwards.</p>
        </div>
        <div style={s('margin-top:72px; position:relative')}>
          <div style={s('position:absolute; top:0; left:0; right:0; height:1px; background:var(--rule-strong)')} />
          <div ref={ruleRef} style={s('position:absolute; top:0; left:0; right:0; height:2px; background:#F4601E; transform:scaleX(0); transform-origin:0 50%')} />
          <div className="om-g4" style={s('display:grid; grid-template-columns:repeat(4, 1fr); gap:20px')}>
            {STEPS.map((st) => (
              <div key={st.n} data-anim="step" style={s('padding-right:28px')}>
                <div style={s('width:12px; height:12px; border-radius:50%; background:#F4601E; margin-top:-6px; box-shadow:0 0 0 5px rgba(244,96,30,0.14)')} />
                <div style={s('margin-top:32px; display:flex; align-items:center; gap:12px')}>
                  <span style={s('width:28px; height:28px; border-radius:9px; border:1px solid var(--rule); background:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:500; color:var(--ink-muted)')}>{st.n}</span>
                  <h3 style={s('margin:0; font-family:var(--serif); font-weight:600; font-size:18px; line-height:1.15; letter-spacing:-0.02em')}>{st.title}</h3>
                </div>
                <p style={s('margin:14px 0 0; font-size:15px; color:var(--ink-muted)')}>{st.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
