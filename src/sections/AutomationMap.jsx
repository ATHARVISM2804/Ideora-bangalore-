import { useIsPhone, useMedia } from '../hooks/useMedia';
import { SERVICES } from '../data/content';

// The hub beside the hero statement: what we sell, around the mark.
//
// Was the six places work stalls in an operation. That described the problem
// twice, since the sentence beside it already names them -- a reader arriving
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
  // Not a build practice, so not in SERVICES -- but it is what the engagement
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

const pct = (n, of) => `${(n / of) * 100}%`;

// A straight line from the card's inner edge to the hub's rim. Calm rather than
// glowing: the reference's light-trails read as a product demo.
function edgePoint(n) {
  const from = { x: n.side === 'left' ? n.x + CARD.w : n.x, y: n.cy };
  const dx = HUB.x - from.x;
  const dy = HUB.y - from.y;
  const len = Math.hypot(dx, dy);
  const to = { x: HUB.x - (dx / len) * HUB.r, y: HUB.y - (dy / len) * HUB.r };
  return { from, to };
}

function connector(n) {
  const { from, to } = edgePoint(n);
  const mx = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
}

export function AutomationMap() {
  const phone = useIsPhone();
  const still = useMedia('(prefers-reduced-motion: reduce)');

  // A 640-wide diagram squeezed onto a phone makes six unreadable cards. The
  // same six areas read fine as a plain two-column list.
  if (phone) {
    return (
      <ul className="map-list">
        {AREAS.map((a) => (
          <li key={a.title} className="map-list__item">
            <span className="map-card__title">{a.title}</span>
            <span className="map-card__note">{a.note}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    // Positions are computed from the viewBox geometry, so they stay inline --
    // this is the case an inline style is actually for. Everything static about
    // these elements lives in the stylesheet.
    <div className="map" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="map__svg" aria-hidden="true">
        {/* The connector, its arrival point on the rim, and a pulse that runs
            card -> hub. The motion is the message: work arriving and being
            taken. Staggered so it reads as a steady flow rather than a
            six-lane heartbeat. */}
        {NODES.map((n, i) => {
          const id = `om-path-${i}`;
          const { to: rim } = edgePoint(n);
          return (
            <g key={n.title}>
              <path id={id} d={connector(n)} fill="none" stroke="var(--rule-strong)" strokeWidth="1.25" />
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
      <div
        className="map__hub"
        style={{
          left: pct(HUB.x - HUB.r, VB.w),
          top: pct(HUB.y - HUB.r, VB.h),
          width: pct(HUB.r * 2, VB.w),
        }}
      >
        <img src="/assets/ideora-mark.png" alt="" aria-hidden="true" className="map__mark" />
        <span className="map__hub-label">Ideora</span>
      </div>

      {NODES.map((n) => (
        <div
          key={n.title}
          className="map__card"
          style={{
            left: pct(n.x, VB.w),
            top: pct(n.y, VB.h),
            width: pct(CARD.w, VB.w),
            height: pct(CARD.h, VB.h),
          }}
        >
          <span className="map-card__title">{n.title}</span>
          <span className="map-card__note">{n.note}</span>
        </div>
      ))}
    </div>
  );
}
