import { s } from '../lib/style';
import { useIsPhone } from '../hooks/useMedia';

// The hub beside the hero statement. The reference this follows put a
// technology stack around the centre — APIs, databases, RPA. That answers what
// the thing is built from. These are the six places work actually stalls in an
// operation, which is what the reader is buying us to fix, and they are the
// same six the hero sentence names.
const AREAS = [
  { title: 'Enquiries', note: 'Calls, WhatsApp, web forms' },
  { title: 'Bookings',  note: 'Slots held and confirmed' },
  { title: 'Approvals', note: 'Estimates and sign-off' },
  { title: 'Follow-up', note: 'Chasing, reminders, recalls' },
  { title: 'Intake',    note: 'Forms, documents, cover' },
  { title: 'Reporting', note: 'Daily, weekly, month end' },
];

// Drawn in a fixed viewBox so the connector geometry is exact rather than
// measured at runtime: three cards a side, hub in the middle.
const VB = { w: 640, h: 540 };
const HUB = { x: 320, y: 270, r: 82 };
const CARD = { w: 196, h: 74 };
const COL_X = { left: 8, right: VB.w - 8 - CARD.w };
const ROW_Y = [26, 233, 440];

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

export function AutomationMap() {
  const phone = useIsPhone();

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
        {NODES.map((n) => (
          <path key={n.title} d={connector(n)} fill="none" stroke="var(--rule-strong)" strokeWidth="1.25" />
        ))}
        {NODES.map((n) => {
          const dx = HUB.x - (n.side === 'left' ? n.x + CARD.w : n.x);
          const dy = HUB.y - n.cy;
          const len = Math.hypot(dx, dy);
          return <circle key={n.title} cx={HUB.x - (dx / len) * HUB.r} cy={HUB.y - (dy / len) * HUB.r} r="3.5" fill="var(--accent)" />;
        })}
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
          <div style={s('font-family:var(--display); font-weight:600; font-size:clamp(15px, 1.35vw, 19px); line-height:1.15; color:var(--ink)')}>{n.title}</div>
          <div style={s('margin-top:3px; font-size:clamp(11.5px, 0.95vw, 13.5px); line-height:1.35; color:var(--ink-muted)')}>{n.note}</div>
        </div>
      ))}
    </div>
  );
}
