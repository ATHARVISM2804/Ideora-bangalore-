import { s } from '../lib/style';

// Miniature system views for the Industries cards, replacing the empty photo
// slots. Each one echoes the ops console rather than illustrating the industry
// literally, so the card shows what Ideora actually puts in front of that team.
// Motion reuses existing opacity/transform keyframes only — nothing here needs
// a colour-specific animation.

const MONO = "font-family:'JetBrains Mono', monospace";
const DIM = 'var(--dark-raised)';
const WARM = 'rgba(244,96,30,0.22)';

function Frame({ label, meta, children, footer }) {
  return (
    <div style={s('position:absolute; inset:0; padding:15px 16px; display:flex; flex-direction:column; background:var(--dark)')}>
      <div style={s(`display:flex; justify-content:space-between; ${MONO}; font-size:10px; color:#8A8177`)}>
        <span>{label}</span><span>{meta}</span>
      </div>
      <div style={s('flex:1; display:flex; align-items:center; padding:12px 0')}>{children}</div>
      <div style={s(`display:flex; align-items:center; gap:7px; ${MONO}; font-size:10px; color:#FF8A50`)}>
        <span style={s('width:4px; height:4px; border-radius:50%; background:#F4601E; animation:om-blink 1.8s infinite')} />
        {footer}
      </div>
    </div>
  );
}

// Bay board: 24 service slots, a handful provisionally held, one confirmed.
const BAYS = [0,0,1,0,0,0,1,0, 0,1,0,0,2,0,0,1, 0,0,0,1,0,0,0,0];

export function AutomotivePanel() {
  return (
    <Frame label="bay board · Thu" meta="3 free" footer="bay 2 · 11:30 confirmed">
      <div style={s('width:100%; display:grid; grid-template-columns:repeat(8,1fr); gap:5px')}>
        {BAYS.map((v, i) => (
          <div key={i} style={s(
            `height:16px; border-radius:4px; background:${v === 2 ? '#F4601E' : v ? WARM : DIM};`
            + (v ? ` animation:om-tick ${2.4 + (i % 5) * 0.3}s ease-in-out ${(i % 7) * 0.18}s infinite` : '')
          )} />
        ))}
      </div>
    </Frame>
  );
}

// Viewing calendar: one week, with the offered slot picked out.
const WEEK = [[0,1,0],[1,0,0],[0,0,1],[0,1,0],[1,0,1],[0,2,0],[0,0,0]];
const DAYS = ['M','T','W','T','F','S','S'];

export function RealEstatePanel() {
  return (
    <Frame label="viewings · this week" meta="11 open" footer="Sat 15:00 · Powai 1204">
      <div style={s('width:100%; display:grid; grid-template-columns:repeat(7,1fr); gap:6px')}>
        {WEEK.map((day, i) => (
          <div key={i} style={s('display:flex; flex-direction:column; gap:4px; align-items:stretch')}>
            {day.map((v, j) => (
              <div key={j} style={s(
                `height:13px; border-radius:3px; background:${v === 2 ? '#F4601E' : v ? WARM : DIM};`
                + (v === 2 ? ' animation:om-tick 2.2s ease-in-out infinite' : '')
              )} />
            ))}
            <div style={s(`text-align:center; ${MONO}; font-size:9px; color:${i === 5 ? '#FF8A50' : 'var(--ink-muted)'}`)}>{DAYS[i]}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Intake queue: patients cleared before they reach the desk.
const INTAKE = [
  { w: '72%', done: true },
  { w: '58%', done: true },
  { w: '80%', done: true },
  { w: '46%', done: false },
];

export function HealthcarePanel() {
  return (
    <Frame label="intake queue · today" meta="22 open" footer="3 verified · 1 waiting">
      <div style={s('width:100%; display:flex; flex-direction:column; gap:9px')}>
        {INTAKE.map((r, i) => (
          <div key={i} style={s('display:flex; align-items:center; gap:9px')}>
            <span style={s(`width:7px; height:7px; flex:none; border-radius:50%; background:${r.done ? '#F4601E' : DIM}; border:1px solid ${r.done ? '#F4601E' : 'var(--dark-rule)'}`)} />
            <span style={s(`height:6px; width:${r.w}; border-radius:99px; background:${DIM}`)} />
            {r.done ? (
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#FF8A50" strokeWidth="1.8"
                   strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flex: 'none',
                   animation: `om-tick ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }} aria-hidden="true">
                <path d="M2 6.4l2.6 2.6L10 3.6" />
              </svg>
            ) : (
              <span style={s(`margin-left:auto; ${MONO}; font-size:9px; color:var(--ink-muted)`)}>…</span>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

