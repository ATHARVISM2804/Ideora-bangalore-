// Illustration for each case-study card. Drawn rather than photographed: the
// clients are under NDA so there is nothing real to show, and generic stock of
// a smiling receptionist would say less than nothing while carrying a licence
// with it. These are on-palette, weigh nothing, and make no claim.
//
// Each one is the setting reduced to its geometry, with a single accent mark
// for the thing the system actually does — the slot that got held, the enquiry
// that got qualified, the row that cleared.
const VB = '0 0 320 200';

const LINE = { stroke: 'var(--rule-strong)', strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round' };
const FAINT = { stroke: 'var(--rule)', strokeWidth: 1.2, fill: 'none' };

function Frame({ children }) {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="presentation" style={{ display: 'block' }}>
      <rect x="0" y="0" width="320" height="200" fill="var(--bg-sunken)" />
      {children}
    </svg>
  );
}

// A workshop bay: roller door above, a vehicle on the floor, one slot held.
function Automotive() {
  return (
    <Frame>
      {[0, 1, 2, 3].map((i) => <line key={i} x1="72" y1={26 + i * 10} x2="248" y2={26 + i * 10} {...FAINT} />)}
      <line x1="60" y1="66" x2="260" y2="66" {...LINE} />
      <line x1="30" y1="150" x2="290" y2="150" {...LINE} />
      <path d="M104 150 v-16 l16-22 h42 l20 22 h26 v16" {...LINE} />
      <circle cx="128" cy="150" r="10" {...LINE} />
      <circle cx="192" cy="150" r="10" {...LINE} />
      {/* The bay is held: a marked-out slot under the vehicle. */}
      <path d="M96 168 v10 M224 168 v10 M96 173 h128" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

// Frontages with window grids; one enquiry qualified.
function RealEstate() {
  const win = (x, y, on) => (
    <rect key={`${x}-${y}`} x={x} y={y} width="12" height="12" rx="2"
      fill={on ? 'var(--accent-tint)' : 'none'} stroke={on ? 'var(--accent)' : 'var(--rule-strong)'} strokeWidth="1.2" />
  );
  return (
    <Frame>
      <line x1="18" y1="168" x2="302" y2="168" {...LINE} />
      <path d="M40 168 v-72 h64 v72" {...LINE} />
      <path d="M120 168 v-104 h72 v104" {...LINE} />
      <path d="M208 168 v-58 h60 v58" {...LINE} />
      {[0, 1].map((c) => [0, 1, 2].map((r) => win(52 + c * 22, 108 + r * 20, false)))}
      {[0, 1, 2].map((c) => [0, 1, 2, 3].map((r) => win(132 + c * 20, 78 + r * 20, c === 1 && r === 1)))}
      {[0, 1].map((c) => [0, 1].map((r) => win(220 + c * 22, 122 + r * 20, false)))}
    </Frame>
  );
}

// A front desk and the day's list, settled before arrival.
function Healthcare() {
  return (
    <Frame>
      <rect x="36" y="112" width="112" height="54" rx="6" {...LINE} />
      <rect x="58" y="76" width="68" height="34" rx="5" {...LINE} />
      <line x1="92" y1="110" x2="92" y2="112" {...LINE} />
      <path d="M92 96 v-12 M86 90 h12" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="176" y="44" width="110" height="122" rx="8" {...LINE} />
      <line x1="176" y1="70" x2="286" y2="70" {...LINE} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="194" cy={92 + i * 22} r="4.5"
            fill={i === 1 ? 'var(--accent)' : 'none'} stroke={i === 1 ? 'var(--accent)' : 'var(--rule-strong)'} strokeWidth="1.3" />
          <line x1="208" y1={92 + i * 22} x2={i === 1 ? 268 : 250} y2={92 + i * 22} {...FAINT} />
        </g>
      ))}
    </Frame>
  );
}

// One record everyone reads from; a row clears.
function Record() {
  return (
    <Frame>
      <rect x="44" y="34" width="232" height="132" rx="8" {...LINE} />
      <line x1="44" y1="60" x2="276" y2="60" {...LINE} />
      {[0, 1, 2, 3].map((i) => {
        const on = i === 2;
        return (
          <g key={i}>
            <rect x="60" y={76 + i * 22} width="10" height="10" rx="2"
              fill={on ? 'var(--accent)' : 'none'} stroke={on ? 'var(--accent)' : 'var(--rule-strong)'} strokeWidth="1.2" />
            <line x1="82" y1={81 + i * 22} x2={on ? 244 : 210} y2={81 + i * 22} {...FAINT} />
          </g>
        );
      })}
      <circle cx="258" cy="47" r="4" fill="var(--accent)" />
    </Frame>
  );
}

// A file arriving complete and risk-banded.
function Finance() {
  return (
    <Frame>
      <path d="M104 40 h84 l28 28 v92 h-112 z" {...LINE} />
      <path d="M188 40 v28 h28" {...LINE} />
      {[0, 1, 2, 3].map((i) => <line key={i} x1="122" y1={92 + i * 16} x2={i === 3 ? 172 : 198} y2={92 + i * 16} {...FAINT} />)}
      <circle cx="206" cy="146" r="15" fill="var(--accent-tint)" stroke="var(--accent)" strokeWidth="1.4" />
      <path d="M199 146 l5 5 l9 -11" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

// Matters opened without partner time.
function Legal() {
  return (
    <Frame>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${86 + i * 10} ${158 - i * 24} v-54 h${36 - i * 4} l9 11 h${62 - i * 8} v43 z`}
          fill={i === 2 ? 'var(--accent-tint)' : 'var(--bg-sunken)'}
          stroke={i === 2 ? 'var(--accent)' : 'var(--rule-strong)'} strokeWidth="1.3" />
      ))}
      {[0, 1].map((i) => <line key={i} x1="126" y1={98 + i * 14} x2="196" y2={98 + i * 14} {...FAINT} />)}
    </Frame>
  );
}

const ART = {
  'Automotive': Automotive,
  'Real estate': RealEstate,
  'Healthcare': Healthcare,
  'Cross-vertical': Record,
  'Finance': Finance,
  'Legal': Legal,
};

export function CaseArt({ vertical }) {
  const Art = ART[vertical] || Record;
  return <Art />;
}
