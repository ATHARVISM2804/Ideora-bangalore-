import { s } from '../lib/style';
import { spot, magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { FACTS } from '../data/content';

export function Closing() {
  return (
    <section id="book" style={s('padding:0 0 clamp(80px, 12vw, 170px)')}>
      <div style={s('max-width:var(--measure); margin:0 auto; padding:0 var(--gut) clamp(56px, 8vw, 96px)')}>
        <div style={s('display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:clamp(24px, 3vw, 44px); border-top:1px solid var(--rule); padding-top:clamp(32px, 4vw, 48px)')}>
          {FACTS.map((f) => (
            <div key={f.label} data-anim="step">
              <div className="om-label">{f.label}</div>
              <div style={s('margin-top:12px; font-size:17px; line-height:1.5; color:var(--ink)')}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={s('max-width:var(--wide); margin:0 auto; padding:0 var(--gut)')}>
        <div onMouseMove={spot} style={s('position:relative; overflow:hidden; border-radius:16px; background:var(--dark); color:#F2EDE7; padding:clamp(48px, 6vw, 78px) clamp(28px, 5vw, 72px); box-shadow:0 40px 90px -50px rgba(31,27,24,0.5)')}>
          <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(760px circle at var(--mx, 30%) var(--my, 50%), rgba(244,96,30,0.16), transparent 62%)')} />
          <div style={s('position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px); background-size:26px 26px; mask-image:radial-gradient(circle at 78% 40%, #000, transparent 68%); -webkit-mask-image:radial-gradient(circle at 78% 40%, #000, transparent 68%)')} />
          <div className="om-g12" style={s('position:relative; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px; align-items:center')}>
            <h2 data-anim="head" style={s('grid-column:1 / span 6; margin:0; font-family:var(--serif); font-weight:600; font-size:clamp(31px, 5.2vw, 50px); line-height:1.1; letter-spacing:-0.035em')}>Bring us the process nobody wants to own.</h2>
            <div data-anim="head" style={s('grid-column:8 / span 5')}>
              <p style={s('margin:0; color:#A79E93')}>Ninety minutes with you and your operations lead. We map the handoffs on the call and tell you which a system can take first. You keep the map either way.</p>
              <Hover
                as="a"
                href="#book"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
                style="display:inline-flex; align-items:center; margin-top:34px; padding:14px 26px; border-radius:8px; background:var(--accent); color:#FFFFFF; font-size:15px; font-weight:500; box-shadow:0 20px 44px -20px rgba(28,25,23,0.7); transition:transform .18s ease-out, background .25s"
                hoverStyle="background:#D9500F"
              >Request a briefing</Hover>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
