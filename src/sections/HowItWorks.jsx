import { s } from '../lib/style';
import { useBelowDesktop } from '../hooks/useMedia';
import { PROC } from '../data/content';

// The reference's numbered timeline, on the light ground so it does not sit
// dark against the Work band that follows. These five genuinely are a
// sequence, so the numbering states something true.
export function HowItWorks() {
  const stacked = useBelowDesktop();

  return (
    <section id="how" style={s('padding:clamp(76px, 11vw, 150px) 0; border-top:1px solid var(--rule); background:var(--bg-sunken)')}>
      <div style={s('max-width:var(--measure); margin:0 auto; padding:0 var(--gut)')}>
        <div data-anim="head" style={s('display:flex; align-items:center; gap:14px')}>
          <span style={s('width:26px; height:1px; background:var(--accent)')} />
          <span className="om-label" style={s('color:var(--accent-deep)')}>How it works</span>
        </div>

        <h2 data-anim="head" style={s('margin:20px 0 0; max-width:17ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.036em')}>
          From first call to a system you own.
        </h2>
        <p data-anim="head" style={s('margin:22px 0 0; max-width:56ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
          Five stages, six to ten weeks. You approve the design before anything is built, and you keep the dashboard afterwards.
        </p>

        <ol style={s(`margin:clamp(40px, 5vw, 64px) 0 0; padding:0; list-style:none; display:flex; flex-direction:column; gap:${stacked ? '14px' : '18px'}`)}>
          {PROC.map((p, i) => {
            const last = i === PROC.length - 1;
            return (
              <li key={p.n} data-anim="step" style={s('position:relative; display:grid; grid-template-columns:auto 1fr; gap:clamp(16px, 2.4vw, 28px); align-items:start')}>
                {/* Marker and the line that joins it to the next step */}
                <div style={s('position:relative; display:flex; flex-direction:column; align-items:center; align-self:stretch')}>
                  <span style={s(`width:${stacked ? '44px' : '54px'}; height:${stacked ? '44px' : '54px'}; flex:none; display:flex; align-items:center; justify-content:center; border-radius:14px; border:1px solid var(--rule-strong); background:var(--raised); font-family:var(--mono); font-size:14px; color:var(--accent-deep)`)}>{p.n}</span>
                  {!last && <span style={s('flex:1; width:1px; margin:8px 0 0; background:linear-gradient(180deg, rgba(244,96,30,0.4), var(--rule))')} />}
                </div>

                <div style={s(`padding:clamp(20px, 2.4vw, 28px); margin-bottom:${last ? '0' : '4px'}; border-radius:18px; border:1px solid var(--rule); background:var(--raised)`)}>
                  <h3 style={s('margin:0; font-family:var(--display); font-weight:600; font-size:clamp(18px, 1.7vw, 22px); line-height:1.25; letter-spacing:-0.024em')}>{p.title}</h3>
                  <p style={s('margin:10px 0 0; max-width:62ch; font-size:16px; line-height:1.58; color:var(--ink-muted)')}>{p.body}</p>
                  <div style={s('margin-top:18px; display:flex; gap:8px; flex-wrap:wrap')}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={s('display:inline-flex; padding:6px 13px; border-radius:999px; border:1px solid var(--rule); background:var(--bg-sunken); font-size:13.5px; color:var(--ink-muted)')}>{tag}</span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
