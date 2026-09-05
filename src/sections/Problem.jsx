import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { PROBLEMS } from '../data/content';

export function Problem() {
  return (
    <section style={s('padding:184px 0')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <div style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 6; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.98; letter-spacing:-0.03em')}>Operations do not fail loudly. They stall.</h2>
          <p data-anim="head" style={s('grid-column:8 / span 4; margin:0; color:#5A616D')}>Three failures show up in every operation we audit. None of them are technology problems. All of them are handoff problems.</p>
        </div>
        <div style={s('margin-top:52px; display:grid; grid-template-columns:repeat(3, 1fr); gap:20px')}>
          {PROBLEMS.map((p) => (
            <Hover
              key={p.code}
              data-anim="card"
              onMouseMove={spot}
              style="position:relative; overflow:hidden; padding:28px 26px 32px; border-radius:18px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.82); backdrop-filter:blur(20px) saturate(140%); -webkit-backdrop-filter:blur(20px) saturate(140%); box-shadow:0 24px 54px -34px rgba(26,29,35,0.55); transition:transform .4s cubic-bezier(.16,.84,.24,1), border-color .4s, box-shadow .4s"
              hoverStyle="transform:translateY(-8px); border-color:rgba(244,96,30,0.3); box-shadow:0 36px 70px -32px rgba(26,29,35,0.5)"
            >
              <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(244,96,30,0.1), transparent 60%)')} />
              <div style={s('position:relative; display:flex; align-items:center; justify-content:space-between')}>
                <span style={s("font-family:'JetBrains Mono', monospace; font-size:12px; color:#B8400A")}>{p.code}</span>
                <span style={s('width:34px; height:34px; border-radius:10px; border:1px solid rgba(244,96,30,0.25); background:rgba(244,96,30,0.08)')} />
              </div>
              <h3 style={s('position:relative; margin:26px 0 0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:20px; line-height:1.1; letter-spacing:-0.02em')}>{p.title}</h3>
              <p style={s('position:relative; margin:16px 0 0; max-width:36ch; color:#5A616D')}>{p.body}</p>
            </Hover>
          ))}
        </div>
      </div>
    </section>
  );
}
