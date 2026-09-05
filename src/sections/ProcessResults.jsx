import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { SLOT_PICK, SLOT_LIT, DIGEST_BARS, DIGEST_ROWS, RESULT_FACTS } from '../data/content';

const MONO = "font-family:'JetBrains Mono', monospace";

const CARD = 'position:relative; overflow:hidden; border-radius:18px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.85); box-shadow:0 26px 58px -38px rgba(26,29,35,0.55); transition:transform .4s cubic-bezier(.16,.84,.24,1), border-color .4s';
const CARD_HOVER = 'transform:translateY(-8px); border-color:rgba(244,96,30,0.3)';
const GLOW = 'position:absolute; inset:0; pointer-events:none; background:radial-gradient(440px circle at var(--mx, 50%) var(--my, 0%), rgba(244,96,30,0.08), transparent 60%)';
const CAPTION_RULE = 'flex:1; height:1px; background:rgba(26,29,35,0.08)';

// Derived from the design's renderVals().
const slots = Array.from({ length: 24 }, (_, i) => ({
  anim: i === SLOT_PICK ? 'om-slotpick' : (SLOT_LIT.includes(i) ? 'om-slot' : 'none'),
  delay: `${(i % 6) * 0.09 + Math.floor(i / 6) * 0.14}s`,
}));
const digestBars = DIGEST_BARS.map((h, i) => ({
  h: `${h}%`,
  bg: h === 96 ? '#F4601E' : 'rgba(26,29,35,0.16)',
  delay: `${i * 0.08}s`,
}));
const facts = RESULT_FACTS.map((r) => ({ ...r, color: r.accent ? '#FF8A50' : '#F1F3F6' }));

function StepCaption({ step, title, body }) {
  return (
    <div style={s('position:relative; padding:24px 22px 26px')}>
      <div style={s('display:flex; align-items:center; gap:12px')}>
        <span style={s(`${MONO}; font-size:12px; color:#B8400A`)}>{step}</span>
        <span style={s(CAPTION_RULE)} />
      </div>
      <h3 style={s('margin:18px 0 0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:20px; line-height:1.1; letter-spacing:-0.025em')}>{title}</h3>
      <p style={s('margin:14px 0 0; font-size:15px; color:#5A616D')}>{body}</p>
    </div>
  );
}

export function ProcessResults() {
  return (
    <section style={s('padding:0 0 184px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <div style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 7; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.98; letter-spacing:-0.03em')}>Easy process.<br />Powerful results.</h2>
          <p data-anim="head" style={s('grid-column:9 / span 4; margin:0; color:#5A616D')}>Three steps on your side. Everything between them is the agent's job, and you can watch it happen.</p>
        </div>

        <div style={s('margin-top:52px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px')}>

          {/* Step 01 — inbound message thread */}
          <Hover data-anim="card" onMouseMove={spot} style={CARD} hoverStyle={CARD_HOVER}>
            <div style={s(GLOW)} />
            <div style={s('position:relative; height:195px; background:#F6F7F9; border-bottom:1px solid rgba(26,29,35,0.06); padding:22px; display:flex; flex-direction:column; gap:10px; justify-content:flex-end')}>
              <div style={s('align-self:flex-start; max-width:78%; padding:11px 15px; border-radius:14px 14px 14px 4px; background:#FFFFFF; border:1px solid rgba(26,29,35,0.08); font-size:13px; animation:om-bubble 7s ease-in-out infinite; animation-delay:0s')}>Need a service for MH12 this week</div>
              <div style={s('align-self:flex-start; display:flex; gap:4px; padding:11px 14px; border-radius:14px; background:#FFFFFF; border:1px solid rgba(26,29,35,0.08); animation:om-typing 7s ease-in-out infinite')}>
                <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-dot 1.1s ease-in-out infinite')} />
                <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-dot 1.1s .15s ease-in-out infinite')} />
                <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-dot 1.1s .3s ease-in-out infinite')} />
              </div>
              <div style={s('align-self:flex-end; max-width:80%; padding:11px 15px; border-radius:14px 14px 4px 14px; background:#F4601E; color:#1A1D23; font-size:13px; font-weight:500; animation:om-bubble 7s ease-in-out infinite; animation-delay:3.4s')}>Thursday 11:30, bay 2 — confirmed</div>
            </div>
            <StepCaption
              step="step 01"
              title="The request arrives anywhere"
              body="WhatsApp, web form, phone note, or portal feed. Nobody has to route it, tag it, or retype it into a second system."
            />
          </Hover>

          {/* Step 02 — bay availability grid */}
          <Hover data-anim="card" onMouseMove={spot} style={CARD} hoverStyle={CARD_HOVER}>
            <div style={s(GLOW)} />
            <div style={s('position:relative; height:195px; background:#F6F7F9; border-bottom:1px solid rgba(26,29,35,0.06); padding:22px; overflow:hidden')}>
              <div style={s(`display:flex; justify-content:space-between; ${MONO}; font-size:11px; color:#5A616D`)}>
                <span>bay availability</span><span>Thu</span>
              </div>
              <div style={s('margin-top:16px; display:grid; grid-template-columns:repeat(6,1fr); gap:7px')}>
                {slots.map((slot, i) => (
                  <div key={i} style={s(`height:24px; border-radius:6px; border:1px solid #DFE3EA; background:#E7EAEF; animation:${slot.anim} 7s ease-in-out infinite; animation-delay:${slot.delay}`)} />
                ))}
              </div>
              <div style={s('position:absolute; left:-40%; top:0; bottom:0; width:44%; pointer-events:none; background:linear-gradient(90deg, transparent, rgba(244,96,30,0.16), transparent); animation:om-sweep 7s cubic-bezier(.5,0,.5,1) infinite')} />
            </div>
            <StepCaption
              step="step 02"
              title="The agent does the whole job"
              body="It checks the record, holds the slot, sends the estimate, chases the approval, and updates every system that needs to know."
            />
          </Hover>

          {/* Step 03 — operations digest */}
          <Hover data-anim="card" onMouseMove={spot} style={CARD} hoverStyle={CARD_HOVER}>
            <div style={s(GLOW)} />
            <div style={s('position:relative; height:195px; background:#F6F7F9; border-bottom:1px solid rgba(26,29,35,0.06); padding:22px; display:flex; flex-direction:column')}>
              <div style={s(`display:flex; justify-content:space-between; ${MONO}; font-size:11px; color:#5A616D`)}>
                <span>operations digest</span><span>Thu 18:00</span>
              </div>
              <div style={s('margin-top:18px; display:flex; align-items:flex-end; gap:6px; height:62px')}>
                {digestBars.map((d, i) => (
                  <div key={i} style={s(`flex:1; height:${d.h}; border-radius:4px 4px 2px 2px; background:${d.bg}; transform-origin:50% 100%; animation:om-growbar 7s cubic-bezier(.16,.84,.24,1) infinite; animation-delay:${d.delay}`)} />
                ))}
              </div>
              <div style={s('margin-top:auto; display:flex; flex-direction:column; gap:9px')}>
                {DIGEST_ROWS.map((r) => (
                  <div key={r.label} style={s('display:flex; align-items:center; gap:10px; font-size:12px; color:#1A1D23')}>
                    <span style={s(`position:relative; width:16px; height:16px; flex:none; border-radius:5px; background:#F4601E; animation:om-tick 7s ease-in-out infinite; animation-delay:${r.delay}`)} />
                    <span>{r.label}</span>
                    <span style={s(`margin-left:auto; ${MONO}; font-size:11px; color:#5A616D`)}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <StepCaption
              step="step 03"
              title="You read what happened"
              body="One operational record, one digest. Backlog, ageing, and exceptions are visible the day they happen, not at month end."
            />
          </Hover>
        </div>

        <div data-anim="card" data-nav-dark style={s('margin-top:20px; border-radius:24px; background:#1A1D23; color:#F1F3F6; overflow:hidden; position:relative')}>
          <div style={s('position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size:26px 26px; mask-image:linear-gradient(90deg,#000,transparent 70%); -webkit-mask-image:linear-gradient(90deg,#000,transparent 70%)')} />
          <div style={s('position:relative; display:grid; grid-template-columns:repeat(4,1fr)')}>
            {facts.map((r) => (
              <div key={r.label} style={s('padding:34px 28px; border-right:1px solid #2E333C')}>
                <div style={s('display:flex; align-items:baseline; gap:6px')}>
                  <span data-count={r.n} style={s(`font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:40px; line-height:1; letter-spacing:-0.035em; color:${r.color}`)}>{r.n}</span>
                  <span style={s(`font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:20px; letter-spacing:-0.02em; color:${r.color}`)}>{r.suffix}</span>
                </div>
                <div style={s('margin-top:14px; font-size:14px; color:#A7AEBA; max-width:22ch')}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
