import { s } from '../lib/style';
import { useBelowDesktop } from '../hooks/useMedia';
import { STACK } from '../data/content';

// The reference's orbital, carrying our claim rather than a platform list:
// the systems a client already runs, orbiting the agent layer that reads and
// writes to them. "No rip and replace" was previously a line of text.
export function Stack() {
  const stacked = useBelowDesktop();
  const size = stacked ? 300 : 460;
  const centre = size / 2;
  const radius = stacked ? 118 : 182;

  return (
    <section id="stack" style={s('padding:clamp(76px, 11vw, 150px) 0; overflow:hidden')}>
      <div style={s('max-width:var(--measure); margin:0 auto; padding:0 var(--gut); text-align:center')}>
        <div className="om-label" data-anim="head">Runs inside your stack</div>
        <h2 data-anim="head" style={s('margin:18px auto 0; max-width:18ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.036em')}>
          Nothing gets ripped out.
        </h2>
        <p data-anim="head" style={s('margin:22px auto 0; max-width:54ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
          The agent layer reads and writes to the software your team already uses. No migration, no second system to keep in sync.
        </p>

        <div style={s(`position:relative; width:${size}px; height:${size}px; margin:clamp(40px, 5vw, 64px) auto 0`)}>
          {/* Orbit guides */}
          {[radius, radius * 0.66, radius * 0.34].map((r) => (
            <span
              key={r}
              aria-hidden="true"
              style={s(`position:absolute; left:50%; top:50%; width:${r * 2}px; height:${r * 2}px; margin:${-r}px 0 0 ${-r}px; border-radius:50%; border:1px dashed var(--rule-strong); opacity:0.7`)}
            />
          ))}

          {/* The agent layer */}
          <span style={s(`position:absolute; left:50%; top:50%; width:${stacked ? 74 : 92}px; height:${stacked ? 74 : 92}px; margin:${stacked ? -37 : -46}px 0 0 ${stacked ? -37 : -46}px; display:flex; align-items:center; justify-content:center; border-radius:${stacked ? 22 : 26}px; background:var(--dark); color:#F2EDE7; box-shadow:0 18px 40px -18px rgba(28,25,23,0.5); font-size:${stacked ? 11 : 12.5}px; line-height:1.25; font-weight:500`)}>
            Agent<br />layer
          </span>

          {STACK.map((item, i) => {
            const angle = (i / STACK.length) * Math.PI * 2 - Math.PI / 2;
            const x = centre + Math.cos(angle) * radius;
            const y = centre + Math.sin(angle) * radius;
            const tile = stacked ? 46 : 58;
            return (
              <span
                key={item.short}
                title={item.label}
                style={s(`position:absolute; left:${x}px; top:${y}px; width:${tile}px; height:${tile}px; margin:${-tile / 2}px 0 0 ${-tile / 2}px; display:flex; align-items:center; justify-content:center; border-radius:${stacked ? 14 : 17}px; border:1px solid var(--rule); background:var(--raised); box-shadow:0 8px 22px -12px rgba(28,25,23,0.3); font-size:${stacked ? 12 : 13.5}px; font-weight:500; color:var(--ink); animation:om-float ${7 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`)}
              >{item.short}</span>
            );
          })}
        </div>

        <div style={s('margin-top:clamp(28px, 3.6vw, 44px); display:flex; justify-content:center; gap:10px; flex-wrap:wrap')}>
          {STACK.map((item) => (
            <span key={item.label} style={s('display:inline-flex; padding:7px 14px; border-radius:999px; border:1px solid var(--rule); background:var(--raised); font-size:14px; color:var(--ink-muted)')}>{item.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
