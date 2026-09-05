import { s } from '../lib/style';

const MONO = "font-family:'JetBrains Mono', monospace";

// ── Credibility ────────────────────────────────────────────────────────────
// Illustrates the claim the facts beside it make: "Your existing stack. No rip
// and replace." Existing systems stay where they are; the agent layer sits
// between them and a single operational record.

const STACK = ['Your CRM', 'Your DMS', 'Calendars', 'WhatsApp'];

export function CredibilityDiagram() {
  return (
    <div style={s('position:absolute; inset:0; padding:26px 24px; display:flex; flex-direction:column; background:#F7F8FA; background-image:linear-gradient(rgba(26,29,35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,29,35,0.05) 1px, transparent 1px); background-size:22px 22px')}>
      <div style={s(`${MONO}; font-size:10.5px; color:#5A616D`)}>your existing stack</div>

      <div className="om-g2" style={s('margin-top:12px; display:grid; grid-template-columns:1fr 1fr; gap:8px')}>
        {STACK.map((n) => (
          <div key={n} style={s('padding:9px 11px; border-radius:9px; border:1px solid rgba(26,29,35,0.1); background:#FFFFFF; font-size:12px; color:#1A1D23; box-shadow:0 4px 10px -8px rgba(26,29,35,0.5)')}>{n}</div>
        ))}
      </div>

      {/* Four feeds converging on one agent layer */}
      <svg viewBox="0 0 200 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 38 }} aria-hidden="true">
        {[18, 72, 128, 182].map((x, i) => (
          <path key={x} d={`M${x} 0 C${x} 20 100 18 100 38`} fill="none" stroke="#F4601E" strokeWidth="1.2"
                strokeDasharray="5 5" vectorEffect="non-scaling-stroke"
                style={{ animation: `om-dash 1.8s linear ${i * 0.2}s infinite`, opacity: 0.65 }} />
        ))}
      </svg>

      <div style={s('padding:12px 14px; border-radius:11px; border:1px solid rgba(244,96,30,0.4); background:rgba(244,96,30,0.1); display:flex; align-items:center; gap:9px')}>
        <span style={s('width:6px; height:6px; border-radius:50%; background:#F4601E; animation:om-blink 1.8s infinite')} />
        <span style={s('font-size:13px; font-weight:500; color:#B8400A')}>Ideora agent layer</span>
        <span style={s(`margin-left:auto; ${MONO}; font-size:10px; color:#B8400A`)}>read · act · log</span>
      </div>

      <svg viewBox="0 0 200 22" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 22 }} aria-hidden="true">
        <path d="M100 0V22" fill="none" stroke="#F4601E" strokeWidth="1.2" strokeDasharray="5 5"
              vectorEffect="non-scaling-stroke" style={{ animation: 'om-dash 1.8s linear infinite', opacity: 0.65 }} />
      </svg>

      <div style={s('margin-top:auto; padding:13px 14px; border-radius:11px; background:#1A1D23; color:#F1F3F6; display:flex; align-items:center; gap:9px')}>
        <span style={s('font-size:13px; font-weight:500')}>One operational record</span>
        <span style={s(`margin-left:auto; ${MONO}; font-size:10px; color:#8A929E`)}>everyone reads from</span>
      </div>
    </div>
  );
}

// ── Services ───────────────────────────────────────────────────────────────
// The method described in the copy beside it, drawn as four steps of a single
// agent run.

const RUN = [
  ['read', 'the request'],
  ['check', 'the record'],
  ['act', 'in your system'],
  ['log', 'the outcome'],
];

export function MethodFlow() {
  return (
    <div style={s('position:absolute; inset:0; padding:20px 22px; display:flex; flex-direction:column; justify-content:center; gap:0; background:#F7F8FA; background-image:linear-gradient(rgba(26,29,35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,29,35,0.05) 1px, transparent 1px); background-size:22px 22px')}>
      {RUN.map(([verb, rest], i) => {
        const last = i === RUN.length - 1;
        return (
          <div key={verb} style={s('display:flex; align-items:flex-start; gap:12px')}>
            <div style={s('display:flex; flex-direction:column; align-items:center; flex:none')}>
              <span style={s(`width:9px; height:9px; border-radius:50%; background:${last ? '#F4601E' : '#FFFFFF'}; border:1.5px solid ${last ? '#F4601E' : 'rgba(26,29,35,0.22)'}; animation:om-tick ${2.2 + i * 0.25}s ease-in-out ${i * 0.25}s infinite`)} />
              {!last && <span style={s('width:1.5px; height:28px; background:linear-gradient(180deg, rgba(244,96,30,0.5), rgba(26,29,35,0.12))')} />}
            </div>
            <div style={s('padding-bottom:' + (last ? '0' : '10px'))}>
              <span style={s(`${MONO}; font-size:12px; color:#B8400A`)}>{verb}</span>
              <span style={s('font-size:13px; color:#5A616D')}> {rest}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Voices ─────────────────────────────────────────────────────────────────
// The quotes are attributed by role and scale only, so a photograph was never
// going to appear here. A vertical glyph says which industry it came from.

const GLYPHS = {
  automotive: 'M3.2 12.4h13.6M4.4 12.4l1.5-4.2a1.6 1.6 0 011.5-1h5.2a1.6 1.6 0 011.5 1l1.5 4.2M4.4 12.4v2.4M15.6 12.4v2.4M6.4 12.4v.05M13.6 12.4v.05',
  realestate: 'M3.4 16.6V8.2L10 3.4l6.6 4.8v8.4M7.6 16.6v-4.4h4.8v4.4',
  healthcare: 'M10 4.2v11.6M4.2 10h11.6',
  legal: 'M10 3.6v12.8M5 7.4h10M6.4 7.4l-2.2 5h4.4zM13.6 7.4l-2.2 5h4.4z',
  finance: 'M2.6 8L10 3.6 17.4 8M4.6 8v6.2M8 8v6.2M12 8v6.2M15.4 8v6.2M3 16.6h14',
};

export function QuoteGlyph({ kind }) {
  return (
    <span style={s('width:44px; height:44px; flex:none; border-radius:50%; border:1px solid rgba(244,96,30,0.28); background:rgba(244,96,30,0.09); display:flex; align-items:center; justify-content:center')}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#B8400A" strokeWidth="1.5"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={GLYPHS[kind] || GLYPHS.realestate} />
      </svg>
    </span>
  );
}

// ── Problem ────────────────────────────────────────────────────────────────
// Replaces an empty square that carried no meaning: each fault gets a glyph
// that states what is actually broken.

const FAULTS = {
  waiting: 'M9 2.6a6.4 6.4 0 100 12.8A6.4 6.4 0 009 2.6M9 5.6V9l2.2 1.6',
  silo:    'M4.6 5.2a2.3 2.3 0 100 4.6 2.3 2.3 0 000-4.6M13.4 8.2a2.3 2.3 0 100 4.6 2.3 2.3 0 000-4.6M7.2 7.6l1.6.6M10.6 9.2l1.4.5',
  blind:   'M2.6 9s2.6-4.2 6.4-4.2c1 0 1.9.3 2.7.7M15.4 9s-2.6 4.2-6.4 4.2c-1 0-1.9-.3-2.7-.7M3 3l12 12',
};

export function FaultGlyph({ kind }) {
  return (
    <span style={s('width:34px; height:34px; flex:none; border-radius:10px; border:1px solid rgba(244,96,30,0.25); background:rgba(244,96,30,0.08); display:flex; align-items:center; justify-content:center')}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#B8400A" strokeWidth="1.5"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={FAULTS[kind] || FAULTS.waiting} />
      </svg>
    </span>
  );
}
