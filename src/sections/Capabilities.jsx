import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { CAPABILITIES } from '../data/content';

// Line icons drawn to match the thin-stroke language already used in the
// process illustrations, rather than a bundled icon set.
function CapIcon({ name }) {
  const common = {
    width: 30, height: 30, viewBox: '0 0 28 28', fill: 'none',
    stroke: '#F4601E', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { display: 'block' }, 'aria-hidden': true,
  };

  if (name === 'voice') {
    // Waveform: a spoken utterance, not a generic speaker.
    return (
      <svg {...common}>
        {[[4, 4], [7.5, 10], [11, 18], [14.5, 12], [18, 8], [21.5, 14], [25, 5]].map(([x, h], i) => (
          <path key={i} d={`M${x} ${14 - h / 2}v${h}`} strokeWidth="1.8" />
        ))}
      </svg>
    );
  }
  if (name === 'chat') {
    return (
      <svg {...common}>
        <path d="M14 3.6a10.4 10.4 0 00-9 15.6L3.6 24.4l5.6-1.4A10.4 10.4 0 1014 3.6z" />
        <path d="M10.9 11.1c0 3.3 2.7 6 6 6l1.2-1.8-2.3-1.3-1.1.9a4.8 4.8 0 01-1.9-1.9l.9-1.1-1.3-2.3z" />
      </svg>
    );
  }
  if (name === 'workflow') {
    return (
      <svg {...common}>
        <path d="M7.3 12.7l4.6-3.9M7.3 15.3l4.6 3.9M16.1 8.8l4.7 3.9M16.1 19.2l4.7-3.9" />
        <circle cx="5" cy="14" r="2.4" /><circle cx="14" cy="7.4" r="2.4" />
        <circle cx="14" cy="20.6" r="2.4" /><circle cx="23" cy="14" r="2.4" />
      </svg>
    );
  }
  if (name === 'crm') {
    return (
      <svg {...common}>
        <circle cx="14" cy="9.8" r="4.5" />
        <path d="M5.4 23.6a8.6 8.6 0 0117.2 0" />
      </svg>
    );
  }
  if (name === 'analytics') {
    return (
      <svg {...common}>
        <rect x="4.2" y="16" width="5.2" height="7.4" rx="1.6" />
        <rect x="11.4" y="10.6" width="5.2" height="12.8" rx="1.6" />
        <rect x="18.6" y="5.4" width="5.2" height="18" rx="1.6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="14" cy="14" r="9.6" />
      <path d="M14 4.4A9.6 9.6 0 0123.6 14H14z" />
    </svg>
  );
}

export function Capabilities() {
  return (
    <section style={s('padding:0 0 96px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <div style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 7; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.98; letter-spacing:-0.03em')}>Powerful capabilities. Real business impact.</h2>
          <p data-anim="head" style={s('grid-column:9 / span 4; margin:0; color:#5A616D')}>Every system we build is assembled from the same set of capabilities, wired into the tools your team already runs on.</p>
        </div>

        <div style={s('margin-top:52px; display:grid; grid-template-columns:repeat(6,1fr); gap:16px')}>
          {CAPABILITIES.map((c) => (
            <Hover
              key={c.title}
              data-anim="card"
              onMouseMove={spot}
              style="position:relative; overflow:hidden; padding:26px 20px 28px; border-radius:16px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.82); backdrop-filter:blur(20px) saturate(140%); -webkit-backdrop-filter:blur(20px) saturate(140%); box-shadow:0 20px 46px -34px rgba(26,29,35,0.5); transition:transform .4s cubic-bezier(.16,.84,.24,1), border-color .4s, box-shadow .4s"
              hoverStyle="transform:translateY(-8px); border-color:rgba(244,96,30,0.3); box-shadow:0 32px 62px -34px rgba(26,29,35,0.45)"
            >
              <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(200px circle at var(--mx, 50%) var(--my, -20%), rgba(244,96,30,0.075), transparent 62%)')} />
              <div style={s('position:relative')}>
                <CapIcon name={c.icon} />
                <h3 style={s('margin:20px 0 0; min-height:40px; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:17px; line-height:1.18; letter-spacing:-0.015em')}>{c.title}</h3>
                <p style={s('margin:12px 0 0; font-size:13.5px; line-height:1.5; color:#5A616D')}>{c.body}</p>
              </div>
            </Hover>
          ))}
        </div>
      </div>
    </section>
  );
}
