import { s } from '../lib/style';

// The strip under the console: what the agents run inside, then what that
// buys. It answers the question the console raises — "fine, but does it touch
// my systems?" — before the page moves on to the argument.
//
// The tag on each surface is its protocol, not a "coming soon" flag. A badge
// that repeats on every row carries no information; the protocol tells an
// operations reader whether their instance is reachable, which is the actual
// question behind the strip.
const SURFACES = [
  ['CRM',                        'REST'],
  ['Dealer management system',   'REST'],
  ['Practice management',        'HL7 · REST'],
  ['WhatsApp Business',          'webhook'],
  ['Inbound telephony',          'SIP'],
  ['Email and SMS',              'SMTP · API'],
  ['Booking calendars',          'CalDAV'],
  ['Portal and listing feeds',   'webhook'],
  ['Parts and inventory',        'SQL'],
  ['E-signature',                'webhook'],
];

// Hero-level figures. Deliberately not RESULT_STATS, which the process
// section already uses further down the page — repeating four numbers
// verbatim on one page makes both instances read as filler.
const FIGURES = [
  { value: '6 wks', label: 'To first system live',    note: 'fixed scope, fixed price' },
  { value: '0',     label: 'Systems replaced',        note: 'agents work your records' },
  { value: '40s',   label: 'Median task completion',  note: 'was four to six hours' },
  { value: '24/7',  label: 'Coverage',                note: 'no night shift, no queue' },
];

function Row({ hidden }) {
  return (
    <div style={s('display:flex; align-items:baseline; flex:none')} aria-hidden={hidden || undefined}>
      {SURFACES.map(([name, proto]) => (
        <span key={name} style={s('display:inline-flex; align-items:baseline; gap:10px; flex:none; padding:0 clamp(22px, 2.6vw, 40px)')}>
          <span style={s('width:5px; height:5px; flex:none; border-radius:50%; background:var(--rule-strong); transform:translateY(-4px)')} />
          <span style={s('font-family:var(--display); font-weight:500; font-size:clamp(19px, 1.9vw, 27px); letter-spacing:-0.009em; white-space:nowrap; color:var(--ink-muted)')}>{name}</span>
          <span style={s('font-family:var(--mono); font-size:11px; letter-spacing:0.04em; white-space:nowrap; color:var(--ink-faint)')}>{proto}</span>
        </span>
      ))}
    </div>
  );
}

export function Surfaces() {
  return (
    <section aria-labelledby="surfaces-label" style={s('margin-top:clamp(44px, 6vw, 76px)')}>
      <p id="surfaces-label" className="om-label" style={s('margin:0; text-align:center; padding:0 var(--gut)')}>
        Runs inside the systems you already own
      </p>

      {/* Full-bleed: the track has to leave the measure to read as continuous
          rather than as a list that happens to be clipped. */}
      <div className="om-marquee" style={s('margin-top:clamp(20px, 2.6vw, 30px)')}>
        <div className="om-marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>

      <div style={s('max-width:var(--wide); margin:clamp(34px, 4.5vw, 56px) auto 0; padding:0 var(--gut)')}>
        <div
          className="om-figs"
          style={s('display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--rule); border-block:1px solid var(--rule)')}
        >
          {FIGURES.map((f) => (
            <div key={f.label} style={s('background:var(--bg); padding:clamp(24px, 3vw, 38px) clamp(16px, 2vw, 28px)')}>
              <div style={s('font-family:var(--display); font-weight:600; font-size:clamp(30px, 3.4vw, 46px); line-height:1; letter-spacing:-0.018em; font-variant-numeric:tabular-nums; color:var(--ink)')}>{f.value}</div>
              <div style={s('margin-top:12px; font-size:15px; font-weight:500; color:var(--ink)')}>{f.label}</div>
              <div style={s('margin-top:4px; font-size:14px; color:var(--ink-faint)')}>{f.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
