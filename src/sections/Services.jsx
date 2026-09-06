import { useState } from 'react';
import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { MethodFlow } from '../components/SectionArt';
import { SERVICES } from '../data/content';

const MONO = "font-family:var(--sans)";

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" style={s('padding:0 0 clamp(72px, 11vw, 184px)')}>
      <div className="om-g12" style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px; align-items:start')}>
        <div style={s('grid-column:1 / span 4; position:sticky; top:130px')}>
          <h2 data-anim="head" style={s('margin:0; font-family:var(--serif); font-weight:500; font-size:clamp(28px, 5.2vw, 44px); line-height:0.98; letter-spacing:-0.03em')}>What we build</h2>
          <p style={s('margin:24px 0 0; max-width:40ch; color:var(--ink-muted)')}>Five practices, one method. We map the handoffs your team performs manually, then build agents that perform them against your live systems and report what they did.</p>
          <div style={s(`margin-top:32px; display:inline-flex; align-items:center; gap:9px; padding:8px 15px; border-radius:99px; border:1px solid var(--rule); background:#FFFFFF; ${MONO}; font-size:12px; color:var(--ink-muted)`)}>select a practice to expand</div>
          <div style={s('margin-top:28px; position:relative; border-radius:14px; overflow:hidden; border:1px solid var(--rule); height:200px')}>
            <MethodFlow />
          </div>
        </div>

        <div style={s('grid-column:6 / span 7; display:flex; flex-direction:column; gap:12px')}>
          {SERVICES.map((svc, i) => {
            const isOpen = open === i;
            const plusRotate = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
            const borderColor = isOpen ? 'var(--rule-strong)' : 'var(--rule)';
            const cardBg = isOpen ? 'var(--raised)' : 'transparent';
            const badgeBorder = isOpen ? 'rgba(244,96,30,0.35)' : 'var(--rule)';
            const badgeBg = isOpen ? 'rgba(244,96,30,0.12)' : '#FFFFFF';
            const badgeColor = isOpen ? 'var(--accent-deep)' : 'var(--ink-muted)';

            return (
              <div
                key={svc.code}
                data-anim="card"
                onMouseMove={spot}
                style={s(`position:relative; overflow:hidden; border-radius:16px; border:1px solid ${borderColor}; background:${cardBg}; backdrop-filter:blur(20px) saturate(140%); -webkit-backdrop-filter:blur(20px) saturate(140%); box-shadow:0 20px 46px -34px rgba(28,25,23,0.5); transition:border-color .35s, background .35s`)}
              >
                <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(244,96,30,0.08), transparent 60%)')} />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={s('position:relative; width:100%; background:none; border:0; padding:24px; display:flex; align-items:center; justify-content:space-between; gap:20px; cursor:pointer; text-align:left; font-family:inherit; color:var(--ink)')}
                >
                  <span style={s('display:flex; align-items:center; gap:20px')}>
                    <span style={s(`width:36px; height:36px; flex:none; border-radius:11px; border:1px solid ${badgeBorder}; background:${badgeBg}; display:flex; align-items:center; justify-content:center; ${MONO}; font-size:12px; color:${badgeColor}; transition:all .35s`)}>{svc.code}</span>
                    <span style={s('font-family:var(--serif); font-weight:600; font-size:20px; line-height:1.1; letter-spacing:-0.025em')}>{svc.title}</span>
                  </span>
                  <span style={s('position:relative; width:26px; height:26px; flex:none')}>
                    <span style={s(`position:absolute; top:12px; left:4px; width:18px; height:2px; border-radius:2px; background:${badgeColor}; transition:background .3s`)} />
                    <span style={s(`position:absolute; top:12px; left:4px; width:18px; height:2px; border-radius:2px; background:${badgeColor}; transform:${plusRotate}; transition:transform .4s cubic-bezier(.16,.84,.24,1), background .3s`)} />
                  </span>
                </button>

                {isOpen && (
                  <div style={s('position:relative; padding:0 24px 28px 72px; animation:om-fade .5s both')}>
                    <p style={s('margin:0 0 24px; max-width:58ch; color:var(--ink-muted)')}>{svc.body}</p>
                    <div className="om-g3" style={s('display:grid; grid-template-columns:repeat(3, 1fr); gap:12px')}>
                      <div style={s('padding:18px; border-radius:14px; border:1px solid var(--rule); background:rgba(255,255,255,0.9)')}>
                        <div style={s('font-size:12px; color:var(--ink-muted)')}>What it delivers</div>
                        <div style={s('margin-top:8px; font-size:14px; line-height:1.45')}>{svc.delivers}</div>
                      </div>
                      <div style={s('padding:18px; border-radius:14px; border:1px solid var(--rule); background:rgba(255,255,255,0.9)')}>
                        <div style={s('font-size:12px; color:var(--ink-muted)')}>What it connects to</div>
                        <div style={s(`margin-top:8px; ${MONO}; font-size:12px; line-height:1.6`)}>{svc.connects}</div>
                      </div>
                      <div style={s('padding:18px; border-radius:14px; border:1px solid rgba(244,96,30,0.26); background:rgba(244,96,30,0.08)')}>
                        <div style={s('font-size:12px; color:var(--ink-muted)')}>Time to live</div>
                        <div style={s(`margin-top:8px; ${MONO}; font-size:13px; color:var(--accent-deep)`)}>{svc.time}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
