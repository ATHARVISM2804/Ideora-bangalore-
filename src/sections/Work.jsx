import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { CASES } from '../data/content';

const MONO = "font-family:'JetBrains Mono', monospace";

// Pinned horizontal scroller: pinRef pins the section, trackRef is translated
// on scroll, railRef is the progress indicator. Wired up in useGsapTimeline.
export function Work({ pinRef, trackRef, railRef }) {
  return (
    <section id="work" ref={pinRef} data-nav-dark style={s('position:relative; overflow:hidden; background:#1A1D23; color:#F1F3F6; padding:144px 0')}>
      <div style={s('position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size:28px 28px; mask-image:linear-gradient(180deg,#000,transparent 80%); -webkit-mask-image:linear-gradient(180deg,#000,transparent 80%)')} />
      <div style={s('position:relative; max-width:1400px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
        <h2 style={s('grid-column:1 / span 6; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.98; letter-spacing:-0.03em')}>Systems in production</h2>
        <p style={s('grid-column:8 / span 4; margin:0; color:#A7AEBA')}>Four builds currently running inside client operations. Named clients are under NDA, so each is described by what it does and what it replaced.</p>
      </div>

      <div style={s('position:relative; margin-top:52px; padding-left:40px')}>
        <div ref={trackRef} style={s('display:flex; gap:20px; width:max-content')}>
          {CASES.map((cs) => (
            <Hover
              key={cs.code}
              onMouseMove={spot}
              style="position:relative; overflow:hidden; flex:0 0 480px; border-radius:18px; border:1px solid #2E333C; background:#22262E; box-shadow:0 30px 70px -44px rgba(0,0,0,0.9); transition:border-color .4s"
              hoverStyle="border-color:rgba(244,96,30,0.4)"
            >
              <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(460px circle at var(--mx, 50%) var(--my, 0%), rgba(244,96,30,0.14), transparent 62%)')} />
              <div style={s(`position:relative; padding:18px 22px; border-bottom:1px solid #2E333C; display:flex; justify-content:space-between; align-items:center; ${MONO}; font-size:12px; color:#8A929E`)}>
                <span style={s('padding:5px 12px; border-radius:99px; border:1px solid #2E333C; background:#1A1D23; color:#C6CCD6')}>{cs.vertical}</span>
                <span>{cs.code}</span>
              </div>
              <div style={s('position:relative; padding:26px 22px 28px')}>
                <h3 style={s('margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:24px; line-height:1.04; letter-spacing:-0.03em')}>{cs.title}</h3>
                <p style={s('margin:20px 0 0; font-size:15px; color:#A7AEBA')}>{cs.body}</p>
                <div style={s(`margin-top:30px; padding-top:20px; border-top:1px solid #2E333C; display:flex; flex-direction:column; gap:11px; ${MONO}; font-size:12px`)}>
                  <div style={s('display:flex; justify-content:space-between')}><span style={s('color:#8A929E')}>replaced</span><span>{cs.replaced}</span></div>
                  <div style={s('display:flex; justify-content:space-between')}><span style={s('color:#8A929E')}>live since</span><span style={s('color:#FF8A50')}>{cs.since}</span></div>
                </div>
              </div>
            </Hover>
          ))}
        </div>
      </div>

      <div style={s('position:relative; max-width:1400px; margin:44px auto 0; padding:0 40px; display:flex; align-items:center; gap:14px')}>
        <span style={s(`${MONO}; font-size:11px; color:#8A929E`)}>scroll to advance</span>
        <div style={s('flex:1; height:2px; border-radius:99px; background:#2E333C; overflow:hidden')}>
          <div ref={railRef} style={s('height:100%; width:100%; border-radius:99px; background:#F4601E; transform:scaleX(0.1); transform-origin:0 50%')} />
        </div>
      </div>
    </section>
  );
}
