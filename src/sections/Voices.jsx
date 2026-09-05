import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { ImageSlot } from '../components/ImageSlot';
import { QUOTES } from '../data/content';

export function Voices() {
  return (
    <section style={s('padding:184px 0')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <div style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 6; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.98; letter-spacing:-0.03em')}>What operations leads tell us</h2>
          <p data-anim="head" style={s('grid-column:8 / span 4; margin:0; color:#5A616D')}>Quotes are attributed by role and scale only. Named references are available on request under NDA.</p>
        </div>
        <div style={s('margin-top:48px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px')}>
          {QUOTES.map((q) => (
            <Hover
              key={q.slotId}
              data-anim="card"
              onMouseMove={spot}
              style="position:relative; overflow:hidden; padding:28px 26px; border-radius:18px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.85); box-shadow:0 24px 54px -36px rgba(26,29,35,0.55); transition:transform .4s cubic-bezier(.16,.84,.24,1), border-color .4s"
              hoverStyle="transform:translateY(-6px); border-color:rgba(244,96,30,0.28)"
            >
              <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(244,96,30,0.08), transparent 60%)')} />
              <div style={s('position:relative; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:26px; line-height:1; color:#F4601E')}>“</div>
              <p style={s('position:relative; margin:14px 0 0; font-size:17px; line-height:1.45; letter-spacing:-0.01em')}>{q.text}</p>
              <div style={s('position:relative; margin-top:30px; padding-top:22px; border-top:1px solid rgba(26,29,35,0.08); display:flex; align-items:center; gap:14px')}>
                <div style={s('width:44px; height:44px; flex:none; border-radius:50%; overflow:hidden; background:#E7EAEF')}>
                  <ImageSlot shape="circle" placeholder="Photo" />
                </div>
                <div>
                  <div style={s('font-size:14px; font-weight:500')}>{q.role}</div>
                  <div style={s('font-size:13px; color:#5A616D')}>{q.scale}</div>
                </div>
              </div>
            </Hover>
          ))}
        </div>
      </div>
    </section>
  );
}
