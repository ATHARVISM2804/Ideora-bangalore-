import { s } from '../lib/style';
import { Hover } from '../components/Hover';
import { AutomotivePanel, RealEstatePanel, HealthcarePanel } from '../components/IndustryPanels';
import { INDUSTRIES } from '../data/content';

const PANELS = { automotive: AutomotivePanel, realestate: RealEstatePanel, healthcare: HealthcarePanel };
const MONO = 'font-family:var(--sans); letter-spacing:0.04em';

// Alternating editorial rows: the system view on one side, the argument on the
// other, separated by hairlines. No card chrome — the dark panel is the only
// filled surface, which makes it read as the subject rather than decoration.
export function Industries() {
  return (
    <section id="industries" style={s('padding:0 0 clamp(48px, 7vw, 96px)')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <h2 data-anim="head" style={s('max-width:20ch; margin:0; font-family:var(--display); font-weight:500; font-size:clamp(28px, 5.2vw, 44px); line-height:0.98; letter-spacing:-0.014em')}>Where the work already lives</h2>

        <div style={s('margin-top:48px; border-top:1px solid var(--rule-strong)')}>
          {INDUSTRIES.map((ind, i) => {
            const Panel = PANELS[ind.panel];
            const flip = i % 2 === 1;
            return (
              <div key={ind.panel} data-anim="step" className="om-g12" style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:center; padding:38px 0; border-bottom:1px solid var(--rule)')}>
                <div style={s(`grid-column:${flip ? '7 / span 6' : '1 / span 6'}; grid-row:1; position:relative; height:210px; overflow:hidden; border-radius:14px; background:var(--dark); box-shadow:0 26px 58px -40px rgba(28,25,23,0.7)`)}>
                  {Panel ? <Panel /> : null}
                </div>

                <div style={s(`grid-column:${flip ? '1 / span 5' : '8 / span 5'}; grid-row:1`)}>
                  <div style={s('display:flex; align-items:baseline; gap:14px')}>
                    <span style={s(`${MONO}; font-size:12px; color:var(--accent-deep)`)}>{ind.code}</span>
                    <h3 style={s('margin:0; font-family:var(--display); font-weight:500; font-size:clamp(24px, 4.2vw, 34px); line-height:1.0; letter-spacing:-0.014em')}>{ind.name}</h3>
                  </div>
                  <p style={s('margin:18px 0 0; max-width:46ch; color:var(--ink-muted)')}>{ind.body}</p>
                  <Hover
                    as="a"
                    href="#work"
                    style="display:inline-flex; margin-top:22px; padding:10px 17px; border-radius:99px; border:1px solid var(--rule-strong); background:transparent; color:var(--ink); font-size:13px; font-weight:500; transition:background .3s, border-color .3s"
                    hoverStyle="background:#F4601E; border-color:#F4601E"
                  >See the system</Hover>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
