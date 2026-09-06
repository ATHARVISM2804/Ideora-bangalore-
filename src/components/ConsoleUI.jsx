import { s } from '../lib/style';

// Small UI parts that give the console the chrome of a real workspace:
// icons in the rail, sparklines on the KPI cards, a completion ring, and the
// status pills on each trace row.

const PATHS = {
  queue:    'M3 5h11M3 9.5h11M3 14h7',
  agents:   'M6 8.5a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2M1.6 15c0-2.5 2-4.2 4.4-4.2s4.4 1.7 4.4 4.2M12 6.2h4M14 4.2v4',
  records:  'M2.2 5.2h5l1.3 1.8h5.3v7.4a1 1 0 01-1 1H3.2a1 1 0 01-1-1z',
  calendar: 'M2.4 4.6h11.2v9.4a1 1 0 01-1 1H3.4a1 1 0 01-1-1zM2.4 7.6h11.2M5.4 2.6v3M10.6 2.6v3',
  alert:    'M8 2.6l6 10.8H2zM8 6.9v3.1M8 11.9v.05',
  reports:  'M3 13.4V8.6M6.4 13.4V4.9M9.8 13.4V9.8M13.2 13.4V6.6',
  search:   'M7.3 12.2a4.9 4.9 0 100-9.8 4.9 4.9 0 000 9.8M11 11l3 3',
  chevron:  'M4.5 6.5L8 10l3.5-3.5',
  plus:     'M8 3.4v9.2M3.4 8h9.2',
};

export function Icon({ name, size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
         style={{ flex: 'none', display: 'block', ...(style || {}) }}>
      <path d={PATHS[name] || PATHS.records} />
    </svg>
  );
}

// Area sparkline. Values are normalised against their own series so each card
// shows its shape rather than its absolute scale. The viewBox is a fixed
// coordinate space stretched to the card's width; non-scaling-stroke keeps the
// line an even weight despite the non-uniform scale.
export function Spark({ values, color = '#B4ABA0', h = 26 }) {
  const W = 100;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pt = (v, i) => [
    (i / (values.length - 1)) * W,
    h - 1.5 - ((v - min) / span) * (h - 3),
  ];
  const line = values.map((v, i) => pt(v, i).map((n) => n.toFixed(2)).join(',')).join(' ');
  const area = `${line} ${W},${h} 0,${h}`;
  const id = `sp${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none"
         style={{ display: 'block', width: '100%', height: h, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.34" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Ring({ value, size = 74 }) {
  const r = (size - 9) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ display: 'block', transform: 'rotate(-90deg)' }} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EBE6DE" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F4601E" strokeWidth="5"
                strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--display)', fontWeight: 600,
        fontSize: 17, letterSpacing: '-0.02em', color: 'var(--ink)',
      }}>{value}%</div>
    </div>
  );
}

const PILL = {
  ok:   { label: 'ok',      color: 'var(--ink-faint)', bg: 'rgba(110,104,98,0.09)', dot: 'var(--ink-faint)' },
  wait: { label: 'waited',  color: 'var(--ink-muted)', bg: 'rgba(110,104,98,0.12)', dot: 'var(--ink-faint)' },
  done: { label: 'done',    color: 'var(--accent-deep)', bg: 'rgba(244,96,30,0.13)',   dot: '#F4601E' },
};

export function StatusPill({ kind }) {
  const p = PILL[kind] || PILL.ok;
  return (
    <span style={s(`display:inline-flex; align-items:center; gap:6px; padding:2px 9px; border-radius:99px; background:${p.bg}; font-family:'JetBrains Mono', monospace; font-size:10px; color:${p.color}`)}>
      <span style={s(`width:4px; height:4px; border-radius:50%; background:${p.dot}`)} />{p.label}
    </span>
  );
}
