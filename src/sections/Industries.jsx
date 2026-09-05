import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { ImageSlot } from '../components/ImageSlot';
import { INDUSTRIES } from '../data/content';

export function Industries() {
  return (
    <section id="industries" style={s('padding:0 0 184px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <h2 data-anim="head" style={s('max-width:20ch; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.98; letter-spacing:-0.03em')}>Where the work already lives</h2>
        <div style={s('margin-top:44px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px')}>
          {INDUSTRIES.map((ind) => (
            <Hover
              key={ind.slotId}
              data-anim="card"
              onMouseMove={spot}
              style="position:relative; overflow:hidden; border-radius:18px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.85); box-shadow:0 26px 58px -38px rgba(26,29,35,0.55); transition:transform .4s cubic-bezier(.16,.84,.24,1), border-color .4s"
              hoverStyle="transform:translateY(-8px); border-color:rgba(244,96,30,0.3)"
            >
              <div style={s('height:180px; position:relative; background:#1A1D23')}>
                <ImageSlot shape="rect" placeholder={ind.slotHint} />
              </div>
              <div style={s('position:relative; padding:26px 24px 28px')}>
                <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(420px circle at var(--mx, 50%) var(--my, 100%), rgba(244,96,30,0.08), transparent 60%)')} />
                <div style={s('position:relative; display:flex; align-items:baseline; gap:14px')}>
                  <span style={s("font-family:'JetBrains Mono', monospace; font-size:12px; color:#B8400A")}>{ind.code}</span>
                  <h3 style={s('margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:28px; line-height:1.0; letter-spacing:-0.03em')}>{ind.name}</h3>
                </div>
                <p style={s('position:relative; margin:18px 0 0; color:#5A616D')}>{ind.body}</p>
                <Hover
                  as="a"
                  href="#work"
                  style="position:relative; display:inline-flex; margin-top:24px; padding:11px 18px; border-radius:99px; border:1px solid rgba(26,29,35,0.12); background:#FFFFFF; color:#1A1D23; font-size:13px; font-weight:500; transition:background .3s, border-color .3s, color .3s"
                  hoverStyle="background:#F4601E; border-color:#F4601E; color:#1A1D23"
                >Read more</Hover>
              </div>
            </Hover>
          ))}
        </div>
      </div>
    </section>
  );
}
