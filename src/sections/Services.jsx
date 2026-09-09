import { useState } from 'react';
import { s } from '../lib/style';
import { useBelowDesktop } from '../hooks/useMedia';
import { SERVICES } from '../data/content';

// Selector list beside a detail panel: the five practices are always all
// visible, and choosing one swaps the panel rather than pushing the page
// around, which an accordion did.
export function Services() {
  const [active, setActive] = useState(0);
  const stacked = useBelowDesktop();
  const svc = SERVICES[active];

  const bullets = [
    ['Delivers', svc.delivers],
    ['Connects to', svc.connects],
    ['Time to live', svc.time],
  ];

  return (
    <section id="services" style={s('padding:clamp(76px, 11vw, 150px) 0')}>
      <div style={s('max-width:var(--measure); margin:0 auto; padding:0 var(--gut)')}>
        <div className="om-label" data-anim="head">What we build</div>
        <h2 data-anim="head" style={s('margin:18px 0 0; max-width:16ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.017em; color:var(--ink)')}>
          Five practices. One method.
        </h2>
        <p data-anim="head" style={s('margin:22px 0 0; max-width:56ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
          We map the handoffs your team does by hand, then build systems that do them in your live software, and report back on what they did.
        </p>

        <div style={s(`margin-top:clamp(40px, 5vw, 64px); display:grid; grid-template-columns:${stacked ? '1fr' : 'minmax(min(240px, 100%), 0.8fr) 1.6fr'}; gap:clamp(16px, 2.4vw, 32px); align-items:start`)}>

          {/* Selector */}
          <div style={s('display:flex; flex-direction:column; gap:6px')}>
            {SERVICES.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.code}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  style={s(`display:block; width:100%; text-align:left; padding:16px 18px; cursor:pointer; border-radius:14px; border:1px solid ${on ? 'rgba(244,96,30,0.38)' : 'transparent'}; background:${on ? 'var(--accent-tint)' : 'transparent'}; font-family:inherit; transition:background .3s, border-color .3s`)}
                >
                  <span style={s(`display:block; font-size:16.5px; font-weight:500; color:${on ? 'var(--accent-deep)' : 'var(--ink)'}; transition:color .3s`)}>{item.title}</span>
                  <span style={s('display:block; margin-top:5px; font-size:14.5px; line-height:1.45; color:var(--ink-muted)')}>{item.short}</span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div style={s('padding:clamp(24px, 3vw, 40px); border-radius:20px; border:1px solid var(--rule); background:#FFFFFF; box-shadow:0 24px 60px -34px rgba(28,25,23,0.16)')}>
            <div key={svc.code} style={s('animation:om-fade .4s both')}>
              <h3 style={s('margin:0; font-family:var(--display); font-weight:600; font-size:clamp(21px, 2.1vw, 28px); line-height:1.15; letter-spacing:-0.013em')}>{svc.title}</h3>
              <p style={s('margin:16px 0 0; max-width:52ch; font-size:16.5px; line-height:1.6; color:var(--ink-muted)')}>{svc.body}</p>

              <ul style={s('margin:26px 0 0; padding:0; list-style:none; display:flex; flex-direction:column; gap:14px')}>
                {bullets.map(([label, value]) => (
                  <li key={label} style={s('display:flex; gap:12px; align-items:baseline')}>
                    <span style={s('width:6px; height:6px; flex:none; border-radius:50%; background:var(--accent); transform:translateY(-2px)')} />
                    <span style={s('font-size:16px; line-height:1.5')}>
                      <span style={s('color:var(--ink-faint)')}>{label}: </span>
                      <span style={s('color:var(--ink)')}>{value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* The method every practice runs on, stated once. */}
              <div style={s('margin-top:28px; padding:16px 18px; border-radius:14px; border:1px solid var(--rule); background:var(--bg-sunken)')}>
                <div className="om-label" style={s('font-size:12.5px')}>One method</div>
                <div style={s('margin-top:12px; display:flex; align-items:center; gap:10px; flex-wrap:wrap')}>
                  {['read the request', 'check the record', 'act in your system', 'log the outcome'].map((step, i) => (
                    <span key={step} style={s('display:inline-flex; align-items:center; gap:10px; font-size:14.5px; color:var(--ink-muted)')}>
                      {i > 0 && <span style={s('color:var(--ink-faint)')}>→</span>}
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
