import { useEffect, useState } from 'react';
import { s } from '../lib/style';
import { QuoteGlyph } from '../components/SectionArt';
import { QUOTES } from '../data/content';

const MONO = "font-family:var(--sans)";
const CYCLE_MS = 7000;

const VERTICAL = {
  automotive: 'Automotive', realestate: 'Real estate', healthcare: 'Healthcare',
  finance: 'Finance', legal: 'Legal',
};

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// One statement at a time, at a size worth reading. Three quotes shrunk into a
// grid gave each of them less weight than any single one deserves.
export function Voices() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const q = QUOTES[active];

  useEffect(() => {
    if (!autoplay || prefersReducedMotion()) return;
    const t = setInterval(() => setActive((i) => (i + 1) % QUOTES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [autoplay]);

  return (
    <section style={s('padding:clamp(48px, 7vw, 96px) 0')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <div className="om-g12" style={s('display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
          <h2 data-anim="head" style={s('grid-column:1 / span 6; margin:0; font-family:var(--serif); font-weight:500; font-size:clamp(28px, 5.2vw, 44px); line-height:0.98; letter-spacing:-0.03em')}>What operations leads tell us</h2>
          <p data-anim="head" style={s('grid-column:8 / span 4; margin:0; color:var(--ink-muted)')}>Quotes are attributed by role and scale only. Named references are available on request under NDA.</p>
        </div>

        <div className="om-g12" style={s('margin-top:56px; display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:start')}>
          {/* Which vertical is speaking, and the control for it */}
          <div style={s('grid-column:1 / span 3; display:flex; flex-direction:column; border-top:1px solid var(--rule-strong)')}>
            {QUOTES.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.slotId}
                  type="button"
                  onClick={() => { setActive(i); setAutoplay(false); }}
                  style={s(`display:flex; align-items:center; gap:11px; padding:15px 4px; border:0; border-bottom:1px solid var(--rule); background:none; cursor:pointer; font-family:inherit; font-size:14px; text-align:left; color:${on ? 'var(--ink)' : '#8A8177'}; transition:color .3s`)}
                >
                  <span style={s(`width:7px; height:7px; flex:none; border-radius:50%; background:${on ? '#F4601E' : 'transparent'}; border:1.5px solid ${on ? '#F4601E' : 'rgba(28,25,23,0.22)'}; transition:all .3s`)} />
                  {VERTICAL[item.glyph]}
                </button>
              );
            })}
          </div>

          <div style={s('grid-column:5 / span 8')}>
            <blockquote key={q.slotId} style={s('margin:0; animation:om-fade .5s both')}>
              <p style={s('margin:0; max-width:22ch; font-family:var(--serif); font-weight:500; font-size:clamp(24px, 4.2vw, 34px); line-height:1.2; letter-spacing:-0.025em; color:var(--ink)')}>
                <span style={s('color:#F4601E')}>“</span>{q.text}
              </p>
              <footer style={s('margin-top:30px; display:flex; align-items:center; gap:14px')}>
                <QuoteGlyph kind={q.glyph} />
                <span>
                  <span style={s('display:block; font-size:14px; font-weight:500')}>{q.role}</span>
                  <span style={s(`display:block; ${MONO}; font-size:12px; color:var(--ink-muted)`)}>{q.scale}</span>
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
