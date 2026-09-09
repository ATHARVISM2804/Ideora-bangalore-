import { s } from '../lib/style';
import { STACK } from '../data/content';

// Was an orbital diagram: eight tiles rotating around the mark. Two problems.
// The tiles counter-rotate to stay upright and did not cancel cleanly, so half
// the labels sat at an angle — hard to read, and harder for the reader this
// page is written for. And a systems diagram answers an architect's question,
// where the one actually being asked here is "will you disturb my business?"
//
// So the section states the answer instead: here is what you keep.
export function Stack() {
  return (
    <section id="stack" style={s('position:relative; background:var(--bg-sunken); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:clamp(76px, 11vw, 150px) 0')}>
      <div style={s('max-width:var(--measure); margin:0 auto; padding:0 var(--gut); text-align:center')}>

        <div className="om-label" data-anim="head">Works with what you already have</div>
        <h2 data-anim="head" style={s('margin:18px auto 0; max-width:18ch; font-family:var(--display); font-weight:600; font-size:clamp(30px, 4.2vw, 56px); line-height:1.06; letter-spacing:-0.017em')}>
          Nothing gets ripped out.
        </h2>
        <p data-anim="head" style={s('margin:22px auto 0; max-width:54ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
          Our systems read and write to the software your team already uses. No migration, no second system to keep in sync.
        </p>

        <div
          data-anim="card"
          style={s('margin:clamp(36px, 4.5vw, 60px) auto 0; max-width:920px; border:1px solid var(--rule); border-radius:18px; background:var(--raised); box-shadow:0 30px 70px -55px rgba(28,25,23,0.45); overflow:hidden; text-align:left')}
        >
          <div style={s('padding:clamp(24px, 3vw, 36px); display:grid; grid-template-columns:repeat(auto-fit, minmax(min(210px, 100%), 1fr)); gap:clamp(14px, 1.8vw, 22px) clamp(20px, 3vw, 40px)')}>
            {STACK.map((item) => (
              <div key={item.label} style={s('display:flex; align-items:center; gap:12px')}>
                {/* A tick rather than a node: this is a list of what keeps
                    working, not a diagram of what connects to what. */}
                <span aria-hidden="true" style={s('flex:none; width:22px; height:22px; border-radius:50%; background:var(--accent-tint); color:var(--accent-deep); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600')}>✓</span>
                <span style={s('font-size:16.5px; line-height:1.35; color:var(--ink)')}>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={s('padding:18px clamp(24px, 3vw, 36px); border-top:1px solid var(--rule); background:var(--bg-sunken); font-size:15px; line-height:1.55; color:var(--ink-muted)')}>
            Your data stays where it is, and your team keeps working the way they already do. Nothing is replaced and nobody is retrained.
          </div>
        </div>

      </div>
    </section>
  );
}
