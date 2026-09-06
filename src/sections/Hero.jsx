import { s } from '../lib/style';
import { useBelowDesktop, useIsPhone } from '../hooks/useMedia';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { OpsConsole } from './OpsConsole';

const PRACTICES = [
  'Agentic AI development',
  'Real estate automation',
  'Healthcare and clinics',
  'Service centres',
  'Productised systems',
];


// Labels are kept to one line at the column's width; the long-form versions
// of these same facts appear in the Credibility and Results sections.
const PROOF = [
  { value: '6–10 wks', label: 'to your first system live' },
  { value: '0', label: 'systems replaced to make room' },
  { value: '24/7', label: 'operating, without a night shift' },
];


export function Hero({ consoleRef }) {
  const stacked = useBelowDesktop();
  const phone = useIsPhone();

  return (
    <section id="top" style={s('padding:clamp(36px, 5vw, 64px) 0 0')}>
      <div style={s('position:relative; max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px)')}>
        <div style={s('position:relative; z-index:1; display:flex; align-items:center; gap:12px; flex-wrap:wrap')} data-anim="hero-1">
          <span style={s('display:inline-flex; align-items:center; gap:8px; padding:6px 13px 6px 10px; border-radius:99px; border:1px solid var(--rule); background:var(--raised); font-size:14px; color:var(--ink-muted)')}>
            <span style={s('width:6px; height:6px; border-radius:50%; background:var(--accent)')} />
            Four systems running in production
          </span>
          <span style={s('font-size:14px; color:var(--ink-faint)')}>Serving automotive, real estate and healthcare groups</span>
        </div>

        <h1 style={s('position:relative; z-index:1; margin:26px 0 0; font-family:var(--serif); font-weight:600; font-size:clamp(38px, 7.2vw, 68px); line-height:1.04; letter-spacing:-0.022em; color:var(--ink)')}>
          <span style={s('display:block; overflow:hidden; padding-bottom:0.16em; margin-bottom:-0.16em')}>
            <span data-anim="hero-word" style={s('display:inline-block')}>Systems</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>that</span>
          </span>
          <span style={s('display:block; overflow:hidden; padding-bottom:0.16em; margin-bottom:-0.16em')}>
            <span data-anim="hero-word" style={s('display:inline-block; font-style:italic; color:var(--accent-deep)')}>finish</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>the</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>job.</span>
          </span>
        </h1>

        <div className="om-g12" style={s('margin-top:clamp(28px, 4vw, 36px); display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:start')} data-anim="hero-2">

          {/* Lead and CTAs stack in one left-anchored block, so the statement
              reads as a single unit instead of splitting across a gap. */}
          <div style={s('grid-column:1 / span 6')}>
            <p style={s('margin:0; max-width:48ch; font-size:18px; line-height:1.6; color:var(--ink-muted)')}>We build and run the systems that carry your operational work — booking, approvals, follow-up, reporting — inside the software your business already owns. No replacement programme. No new headcount.</p>
            <div style={s(`margin-top:clamp(28px, 4vw, 36px); display:flex; align-items:stretch; gap:${phone ? '12px' : '14px'}; ${phone ? 'flex-direction:column-reverse' : 'flex-wrap:wrap'}`)}>
              <Hover
                as="a"
                href="#services"
                style={`display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 26px; border-radius:8px; border:1px solid var(--rule-strong); background:var(--raised); color:var(--ink); font-size:16px; font-weight:500; transition:background .25s, border-color .25s${phone ? "; width:100%" : ""}`}
                hoverStyle="border-color:var(--ink-faint)"
              >See what we build</Hover>
              <Hover
                as="a"
                href="#book"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
                style={`display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 30px; border-radius:8px; background:var(--accent); color:#FFFFFF; font-size:16px; font-weight:500; transition:transform .18s ease-out, background .25s${phone ? "; width:100%" : ""}`}
                hoverStyle="background:#D9500F"
              >Request a briefing</Hover>
            </div>
          </div>

          {/* Commercial proof, deliberately chosen not to repeat the live
              operational numbers in the console directly below. */}
          <div style={s(`position:relative; grid-column:9 / span 4; margin-top:${stacked ? '8px' : '-62px'}; padding-left:${stacked ? '20px' : '28px'}`)}>
            <div style={s('position:absolute; left:0; top:0; bottom:0; width:1px; background:var(--rule)')} />
            {PROOF.map((f, i) => (
              <div
                key={f.label}
                style={s(`padding:${i === 0 ? '0' : '18px'} 0 ${i === PROOF.length - 1 ? '0' : '18px'}; ${i === PROOF.length - 1 ? '' : 'border-bottom:1px solid var(--rule)'}`)}
              >
                <div style={s('font-family:var(--serif); font-weight:600; font-size:clamp(22px, 3.6vw, 30px); line-height:1; letter-spacing:-0.02em; font-variant-numeric:tabular-nums; color:var(--ink)')}>{f.value}</div>
                <div style={s('margin-top:8px; font-size:14px; line-height:1.45; color:var(--ink-muted)')}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={s('margin-top:clamp(32px, 5vw, 52px); padding:0 clamp(20px, 5vw, 40px)')}>
        <OpsConsole consoleRef={consoleRef} />
      </div>

      <div style={s('margin-top:clamp(44px, 7vw, 76px); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); background:var(--bg-sunken)')}>
        <div style={s('max-width:1400px; margin:0 auto; padding:22px clamp(20px, 5vw, 40px); display:flex; align-items:baseline; gap:clamp(16px, 3vw, 40px); flex-wrap:wrap')}>
          <span style={s('font-size:14px; color:var(--ink-faint); flex:none')}>Practices</span>
          {PRACTICES.map((n) => (
            <span key={n} style={s('font-size:15px; color:var(--ink-muted)')}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
