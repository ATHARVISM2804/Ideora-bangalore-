import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { ProcessArt } from './ProcessArt';
import { PROC, RESULT_STATS } from '../data/content';

const MONO = "font-family:'JetBrains Mono', monospace";

// Alternating left/right layout, derived exactly as the design's renderVals() did.
const proc = PROC.map((p, i) => {
  const left = p.side === 'left';
  return {
    ...p,
    pillNum: String(i + 1).padStart(2, '0'),
    cardCol: left ? '1' : '2',
    pillCol: left ? '2' : '1',
    cardPad: left ? '0 60px 0 0' : '0 0 0 60px',
    pillPad: left ? '0 0 0 34px' : '0 34px 0 0',
    pillJustify: left ? 'flex-start' : 'flex-end',
    pillDir: left ? 'row' : 'row-reverse',
  };
});

export function Process({ spineRef }) {
  return (
    <section id="process" style={s('padding:0 0 64px; position:relative')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px; text-align:center')}>
        <span data-anim="head" style={s(`display:inline-flex; align-items:center; gap:9px; padding:8px 18px; border-radius:99px; background:#1A1D23; color:#FFFFFF; ${MONO}; font-size:12px; letter-spacing:0.04em`)}>PROCESS</span>
        <h2 data-anim="head" style={s('margin:28px auto 0; max-width:18ch; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.94; letter-spacing:-0.035em')}>Easy process, powerful results</h2>
        <p data-anim="head" style={s('margin:26px auto 0; max-width:44ch; font-size:16px; color:#5A616D')}>A structured engagement that puts a working system inside your operation fast — and shows you every step before it runs.</p>
      </div>

      <div style={s('position:relative; max-width:1400px; margin:72px auto 0; padding:0 40px')}>
        <div style={s('position:absolute; top:0; bottom:0; left:50%; width:1px; background:#D9DDE4')} />
        <div ref={spineRef} style={s('position:absolute; top:0; bottom:0; left:50%; width:2px; margin-left:-1px; background:#F4601E; transform:scaleY(0); transform-origin:50% 0')} />

        <div style={s('position:relative; display:flex; flex-direction:column; gap:52px')}>
          {proc.map((p) => (
            <div key={p.step} style={s('display:grid; grid-template-columns:1fr 1fr; align-items:center; column-gap:0')}>
              <div style={s(`grid-column:${p.cardCol}; grid-row:1; padding:${p.cardPad}`)}>
                <Hover
                  data-anim="proc-card"
                  onMouseMove={spot}
                  style="position:relative; overflow:hidden; border-radius:20px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.9); box-shadow:0 30px 66px -40px rgba(26,29,35,0.55); transition:transform .45s cubic-bezier(.16,.84,.24,1), border-color .45s, box-shadow .45s"
                  hoverStyle="transform:translateY(-8px); border-color:rgba(244,96,30,0.32); box-shadow:0 44px 84px -36px rgba(26,29,35,0.5)"
                >
                  <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(460px circle at var(--mx, 50%) var(--my, 0%), rgba(244,96,30,0.09), transparent 60%)')} />

                  <div style={s('position:relative; margin:22px; height:200px; border-radius:14px; border:1px solid rgba(26,29,35,0.06); background:#F7F8FA; overflow:hidden')}>
                    <div style={s('position:absolute; inset:0; background-image:linear-gradient(rgba(26,29,35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,29,35,0.05) 1px, transparent 1px); background-size:22px 22px')} />
                    <ProcessArt kind={p.kind} />
                  </div>

                  <div style={s('position:relative; padding:6px 30px 34px')}>
                    <h3 style={s('margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:18px; letter-spacing:0.01em')}>{p.title}</h3>
                    <p style={s('margin:14px 0 0; color:#5A616D')}>{p.body}</p>
                  </div>
                </Hover>
              </div>

              <div style={s(`grid-column:${p.pillCol}; grid-row:1; display:flex; justify-content:${p.pillJustify}; padding:${p.pillPad}`)}>
                <div data-anim="proc-pill" style={s(`display:flex; flex-direction:${p.pillDir}; align-items:center; gap:16px`)}>
                  <span style={s(`width:56px; height:56px; flex:none; border-radius:50%; background:#FFFFFF; border:1px solid rgba(26,29,35,0.08); box-shadow:0 12px 28px -16px rgba(26,29,35,0.5); display:flex; align-items:center; justify-content:center; ${MONO}; font-size:13px; color:#B8400A`)}>{p.pillNum}</span>
                  <span style={s('font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:20px; letter-spacing:-0.02em; color:#5A616D')}>{p.step}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s('max-width:1400px; margin:76px auto 0; padding:0 40px')}>
        <div style={s('border-radius:20px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.85); box-shadow:0 30px 66px -44px rgba(26,29,35,0.55); overflow:hidden; display:grid; grid-template-columns:repeat(4,1fr)')}>
          {RESULT_STATS.map((r) => (
            <div key={r.label} data-anim="card" style={s('padding:28px 26px; border-right:1px solid rgba(26,29,35,0.07)')}>
              <div style={s('display:flex; align-items:baseline; gap:2px')}>
                <span data-count={r.value} style={s('font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:40px; line-height:1; letter-spacing:-0.035em; color:#1A1D23')}>{r.value}</span>
                <span style={s('font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:20px; letter-spacing:-0.02em; color:#B8400A')}>{r.suffix}</span>
              </div>
              <div style={s('margin-top:16px; font-size:15px; font-weight:500')}>{r.label}</div>
              <div style={s(`margin-top:4px; ${MONO}; font-size:12px; color:#5A616D`)}>{r.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
