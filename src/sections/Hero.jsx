import { s } from '../lib/style';
import { useIsPhone } from '../hooks/useMedia';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { OpsConsole } from './OpsConsole';
import { Surfaces } from './Surfaces';

// The hero gives each idea its own screen: the statement, then the numbers,
// then the product. Crowding all three into one view is what made it read as
// a template — a page that is confident about its argument does not need to
// show everything at once.
export function Hero({ consoleRef }) {
  const phone = useIsPhone();

  const btn = 'display:inline-flex; align-items:center; justify-content:center; min-height:54px; border-radius:6px; font-size:16px; font-weight:500; transition:background .25s, border-color .25s, transform .18s ease-out';

  return (
    <section id="top">
      {/* ── Statement ─────────────────────────────────────────────── */}
      {/* Pulled up under the sticky bar and padded back by the same amount.
          The bar floats over the sky; without this the frame starts below the
          header and the page's flat --bg shows above it as a seam. */}
      <div style={s('position:relative; overflow:hidden; margin-top:calc(-1 * var(--nav-h, 0px)); padding-top:var(--nav-h, 0px)')}>
        {/* Backdrop. When the video arrives it replaces .om-sky and nothing
            else changes: drop a <video autoPlay muted loop playsInline> here
            with the same absolute fill, keep .om-grain over it, and keep the
            mask so type stays legible against the bottom of the frame. */}
        <div className="om-sky" aria-hidden="true" />
        <div className="om-grain" aria-hidden="true" />
        <div style={s('position:relative; z-index:1; max-width:var(--measure); margin:0 auto; padding:clamp(64px, 11vh, 132px) var(--gut) clamp(30px, 3.6vw, 52px); text-align:center')}>
        <div data-anim="hero-1" style={s('display:flex; justify-content:center')}>
            <span style={s('display:inline-flex; align-items:center; gap:9px; padding:8px 17px; border-radius:999px; border:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.7); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); box-shadow:0 6px 18px -12px rgba(28,25,23,0.4); font-size:14px; color:var(--ink-muted)')}>
              <span style={s('width:6px; height:6px; border-radius:50%; background:var(--accent)')} />
              {phone ? 'Automotive · Real estate · Healthcare' : 'Built for automotive, real estate and healthcare groups'}
            </span>
          </div>

        <h1 style={s('margin:clamp(28px, 4vw, 44px) 0 0; font-family:var(--display); font-weight:600; font-size:clamp(34px, 4.7vw, 74px); line-height:1.06; letter-spacing:-0.038em; color:var(--ink)')}>
          <span style={s('display:block; overflow:hidden; padding-bottom:0.16em; margin-bottom:-0.16em')}>
            <span data-anim="hero-word" style={s('display:inline-block')}>Most</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>operations</span>
          </span>
          <span style={s('display:block; overflow:hidden; padding-bottom:0.16em; margin-bottom:-0.16em')}>
            <span data-anim="hero-word" style={s('display:inline-block')}>don’t</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>fail.</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>They</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>
              <span style={s('display:inline-block; color:var(--accent-deep)')}>wait</span>.
            </span>
          </span>
        </h1>

        <div data-anim="hero-2">
          <p style={s('margin:clamp(22px, 2.6vw, 30px) auto 0; max-width:52ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
            We build and run the systems that carry the work your team is waiting on — booking, approvals, follow-up, reporting — inside the software your business already owns.
          </p>

          <div style={s(`margin-top:clamp(34px, 4vw, 48px); display:flex; align-items:stretch; justify-content:center; gap:12px; ${phone ? 'flex-direction:column-reverse' : ''}`)}>
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
            <p style={s('margin:clamp(20px, 2.4vw, 26px) 0 0; font-size:14px; color:var(--ink-faint)')}>Ninety minutes · you keep the map · no obligation</p>
          </div>
        </div>
      </div>

      {/* ── The product, running ──────────────────────────────────── */}
      <div style={s('max-width:var(--wide); margin:0 auto; padding:clamp(8px, 1.5vw, 20px) var(--gut) 0')}>
        <OpsConsole consoleRef={consoleRef} />
      </div>

      <Surfaces />

    </section>
  );
}
