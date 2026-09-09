import { s } from '../lib/style';
import { useIsPhone, useMedia } from '../hooks/useMedia';
import { SERVICES } from '../data/content';

// The hub beside the hero statement: what we sell, around the mark.
//
// Was the six places work stalls in an operation. That described the problem
// twice, since the sentence beside it already names them — a reader arriving
// on the fold should see the offer, not the diagnosis restated.
//
// Derived from SERVICES so the practices here cannot drift from the ones the
// "what we build" section lists. Card titles are short display names because
// "Healthcare and clinic automation" does not fit a card; the note under each
// is that service's own one-line outcome.
const NAME = {
  '01': 'Operations automation',
  '02': 'Real estate',
  '03': 'Healthcare',
  '04': 'Service centres',
  '05': 'Productised systems',
};

const AREAS = [
  ...SERVICES.map((sv) => ({ title: NAME[sv.code] || sv.title, note: sv.short })),
  // Not a build practice, so not in SERVICES — but it is what the engagement
  // actually is, and the sixth card would otherwise be empty.
  { title: 'Managed operation', note: 'We run it, you get the report' },
];

// Drawn in a fixed viewBox so the connector geometry is exact rather than
// measured at runtime: three cards a side, hub in the middle.
const VB = { w: 640, h: 540 };
const HUB = { x: 320, y: 270, r: 82 };
const CARD = { w: 200, h: 92 };
const COL_X = { left: 8, right: VB.w - 8 - CARD.w };
const ROW_Y = [14, 224, 434];

const NODES = AREAS.map((a, i) => {
  const side = i < 3 ? 'left' : 'right';
  const x = COL_X[side];
  const y = ROW_Y[i % 3];
  return { ...a, side, x, y, cx: x + CARD.w / 2, cy: y + CARD.h / 2 };
});

// A straight line from the card's inner edge to the hub's rim. Calm rather than
// glowing: the reference's light-trails read as a product demo.
function connector(n) {
  const from = { x: n.side === 'left' ? n.x + CARD.w : n.x, y: n.cy };
  const dx = HUB.x - from.x;
  const dy = HUB.y - from.y;
  const len = Math.hypot(dx, dy);
  const to = { x: HUB.x - (dx / len) * HUB.r, y: HUB.y - (dy / len) * HUB.r };
  const mx = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
}

// Where a connector meets the hub: same maths the path ends on, so the dot and
// the line always agree.
function rimPoint(n) {
  const from = { x: n.side === 'left' ? n.x + CARD.w : n.x, y: n.cy };
  const dx = HUB.x - from.x;
  const dy = HUB.y - from.y;
  const len = Math.hypot(dx, dy);
  return { x: HUB.x - (dx / len) * HUB.r, y: HUB.y - (dy / len) * HUB.r };
}

export function AutomationMap() {
  const phone = useIsPhone();
  const still = useMedia('(prefers-reduced-motion: reduce)');

  // A 640-wide diagram squeezed onto a phone makes six unreadable cards. The
  // same six areas read fine as a plain two-column list.
  if (phone) {
    return (
      <div style={s('display:grid; grid-template-columns:1fr 1fr; gap:10px')}>
        {AREAS.map((a) => (
          <div key={a.title} style={s('padding:14px 14px; border:1px solid var(--rule); border-radius:12px; background:var(--raised)')}>
            <div style={s('font-family:var(--display); font-weight:600; font-size:16px; color:var(--ink)')}>{a.title}</div>
            <div style={s('margin-top:3px; font-size:12.5px; line-height:1.4; color:var(--ink-muted)')}>{a.note}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={s(`position:relative; width:100%; max-width:640px; margin:0 auto; aspect-ratio:${VB.w} / ${VB.h}`)}>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} style={s('position:absolute; inset:0; width:100%; height:100%; overflow:visible')} aria-hidden="true">
        {/* The connector, its arrival point on the rim, and a pulse that runs
            card -> hub. The motion is the message: work arriving and being
            taken. Staggered so it reads as a steady flow rather than a
            six-lane heartbeat. */}
        {NODES.map((n, i) => {
          const d = connector(n);
          const id = `om-path-${i}`;
          const rim = rimPoint(n);
          return (
            <g key={n.title}>
              <path id={id} d={d} fill="none" stroke="var(--rule-strong)" strokeWidth="1.25" />
              <circle cx={rim.x} cy={rim.y} r="3.5" fill="var(--accent)" />
              {!still && (
                <circle r="4.5" fill="var(--accent)">
                  <animateMotion dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite">
                    <mpath href={`#${id}`} />
                  </animateMotion>
                  {/* Fades in as it leaves the card and out as it lands, so the
                      dot does not pop in and out at the endpoints. */}
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.8;1"
                           dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* A slow ring off the hub: something is running, without a spinner. */}
        {!still && (
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="none" stroke="var(--accent)" strokeWidth="1.5">
            <animate attributeName="r" values={`${HUB.r};${HUB.r + 26}`} dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.34;0" dur="3.4s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* Hub. The mark rather than a label: "orchestration layer" is the kind
          of phrase this page is being rewritten to remove. */}
      <div style={s(`position:absolute; left:${((HUB.x - HUB.r) / VB.w) * 100}%; top:${((HUB.y - HUB.r) / VB.h) * 100}%; width:${((HUB.r * 2) / VB.w) * 100}%; aspect-ratio:1; border-radius:50%; border:1px solid var(--rule); background:var(--raised); box-shadow:0 24px 60px -34px rgba(28,25,23,0.5); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; text-align:center`)}>
        <img src="/assets/ideora-mark.png" alt="" aria-hidden="true" style={s('width:38%; height:auto; display:block')} />
        <span style={s('font-family:var(--display); font-weight:600; font-size:clamp(13px, 1.15vw, 16px); line-height:1.15; color:var(--ink)')}>Ideora</span>
      </div>

      {NODES.map((n) => (
        <div
          key={n.title}
          style={s(`position:absolute; left:${(n.x / VB.w) * 100}%; top:${(n.y / VB.h) * 100}%; width:${(CARD.w / VB.w) * 100}%; height:${(CARD.h / VB.h) * 100}%; display:flex; flex-direction:column; justify-content:center; padding:0 clamp(12px, 1.4vw, 18px); border:1px solid var(--rule); border-radius:14px; background:var(--raised); box-shadow:0 16px 40px -34px rgba(28,25,23,0.5)`)}
        >
          <div style={s('font-family:var(--display); font-weight:600; font-size:clamp(14px, 1.2vw, 17.5px); line-height:1.2; color:var(--ink)')}>{n.title}</div>
          <div style={s('margin-top:3px; font-size:clamp(11px, 0.9vw, 13px); line-height:1.4; color:var(--ink-muted)')}>{n.note}</div>
        </div>
      ))}
    </div>
  );
}
