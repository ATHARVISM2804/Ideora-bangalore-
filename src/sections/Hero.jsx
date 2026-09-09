import { s } from '../lib/style';
import { useIsPhone, useBelowDesktop } from '../hooks/useMedia';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { Outcome } from './Outcome';
import { AutomationMap } from './AutomationMap';

// Statement on the left, what we sell on the right. The centred
// arrangement this replaces gave the fold a single sentence and no anchor; a
// split hero says what we do and where it applies in one screen.
export function Hero({ consoleRef }) {
  const phone = useIsPhone();
  const narrow = useBelowDesktop();

  const btn = 'display:inline-flex; align-items:center; justify-content:center; min-height:54px; border-radius:6px; font-size:16px; font-weight:500; transition:background .25s, border-color .25s, transform .18s ease-out';

  return (
    <section id="top">
      {/* Pulled up under the sticky bar and padded back by the same amount, so
          the frame starts at the top of the viewport rather than below the bar. */}
      <div style={s('position:relative; overflow:hidden; margin-top:calc(-1 * var(--nav-h, 0px)); padding-top:var(--nav-h, 0px)')}>
        {/* Backdrop. Layered colour fields rather than footage: the video read
            as tech-product atmosphere, and this page is being read by senior
            operators who want the argument, not the mood. */}
        <div className="om-sky" aria-hidden="true" />
        <div className="om-grain" aria-hidden="true" />

        <div style={s(`position:relative; z-index:1; max-width:var(--wide); margin:0 auto; padding:clamp(48px, 8vh, 100px) var(--gut) clamp(30px, 3.6vw, 52px); display:grid; gap:clamp(36px, 5vw, 72px); align-items:center; ${narrow ? '' : 'grid-template-columns:1.02fr 1fr'}`)}>

          <div>
            <div data-anim="hero-1" style={s('display:flex')}>
              <span style={s('display:inline-flex; align-items:center; gap:9px; padding:8px 17px; border-radius:999px; border:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.7); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); box-shadow:0 6px 18px -12px rgba(28,25,23,0.4); font-size:14px; color:var(--ink-muted)')}>
                <span style={s('width:6px; height:6px; border-radius:50%; background:var(--accent)')} />
                {phone ? 'Automotive · Real estate · Healthcare' : 'Built for automotive, real estate and healthcare groups'}
              </span>
            </div>

            {/* Was "Most operations don't fail. They wait." — a good line, but a
                diagnosis: the largest type on the page told the reader what was
                wrong with their business and never said what they get. This
                names the same problem in their own words and resolves it. */}
            <h1 style={s('margin:clamp(24px, 3.2vw, 38px) 0 0; font-family:var(--display); font-weight:600; font-size:clamp(36px, 4.4vw, 68px); line-height:1.04; letter-spacing:-0.018em; color:var(--ink)')}>
              <span style={s('display:block; overflow:hidden; padding-bottom:0.16em; margin-bottom:-0.16em')}>
                <span data-anim="hero-word" style={s('display:inline-block')}>The</span>{' '}
                <span data-anim="hero-word" style={s('display:inline-block')}>work</span>{' '}
                <span data-anim="hero-word" style={s('display:inline-block')}>your</span>{' '}
                <span data-anim="hero-word" style={s('display:inline-block')}>team</span>
              </span>
              <span style={s('display:block; overflow:hidden; padding-bottom:0.16em; margin-bottom:-0.16em')}>
                <span data-anim="hero-word" style={s('display:inline-block')}>never</span>{' '}
                <span data-anim="hero-word" style={s('display:inline-block')}>gets</span>{' '}
                <span data-anim="hero-word" style={s('display:inline-block')}>to.</span>{' '}
                <span data-anim="hero-word" style={s('display:inline-block')}>
                  <span style={s('display:inline-block; color:var(--accent-deep)')}>Done</span>.
                </span>
              </span>
            </h1>

            <div data-anim="hero-2">
              <p style={s('margin:clamp(20px, 2.4vw, 28px) 0 0; max-width:50ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
                Bookings, approvals, follow-up: answered the moment they arrive, inside the software you already own.
              </p>

              <div style={s(`margin-top:clamp(30px, 3.4vw, 42px); display:flex; align-items:stretch; gap:12px; ${phone ? 'flex-direction:column-reverse' : ''}`)}>
                <Hover
                  as="a"
                  href="#services"
                  style={`${btn}; padding:0 28px; border:1px solid var(--rule-strong); background:transparent; color:var(--ink)${phone ? '; width:100%' : ''}`}
                  hoverStyle="border-color:var(--ink); background:var(--raised)"
                >See what we build</Hover>
                <Hover
                  as="a"
                  href="#book"
                  onMouseMove={magnetMove}
                  onMouseLeave={magnetLeave}
                  style={`${btn}; padding:0 32px; background:var(--accent); color:#FFFFFF${phone ? '; width:100%' : ''}`}
                  hoverStyle="background:#D9500F"
                >Request a briefing</Hover>
              </div>

              <p style={s('margin:clamp(18px, 2.2vw, 24px) 0 0; font-size:14px; color:var(--ink-faint)')}>Ninety minutes · you keep the map · no obligation</p>

            </div>
          </div>

          {/* What we sell, around the mark. The sentence beside it already
              names where work stalls; the fold should not say that twice. */}
          <div data-anim="console">
            <AutomationMap />
          </div>

        </div>
      </div>

      {/* ── What it changes ───────────────────────────────────────── */}
      <Outcome cardRef={consoleRef} />

    </section>
  );
}
