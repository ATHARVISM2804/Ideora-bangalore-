import { Fragment } from 'react';
import { s } from '../lib/style';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { OpsConsole } from './OpsConsole';

const MARQUEE = [
  'AGENTIC AI DEVELOPMENT',
  'REAL ESTATE AUTOMATION',
  'HEALTHCARE AND CLINIC AUTOMATION',
  'SERVICE CENTRE AUTOMATION',
  'PRODUCTISED SYSTEMS',
  'MANAGED OPERATION',
];

const MONO = "font-family:'JetBrains Mono', monospace";

// Labels are kept to one line at the column's width; the long-form versions
// of these same facts appear in the Credibility and Results sections.
const PROOF = [
  { value: '6–10 wks', label: 'to first system in production' },
  { value: '0', label: 'systems ripped out' },
  { value: '24/7', label: 'operating, no night shift' },
];


function MarqueeRow() {
  return (
    <div style={s('display:flex; align-items:center; gap:48px; padding-right:48px; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:15px; letter-spacing:0.01em; color:#1A1D23; white-space:nowrap')}>
      {MARQUEE.map((label) => (
        <Fragment key={label}>
          <span>{label}</span>
          <span style={s('color:#F4601E')}>◆</span>
        </Fragment>
      ))}
    </div>
  );
}

export function Hero({ consoleRef }) {
  return (
    <section id="top" style={s('padding:64px 0 0')}>
      <div style={s('position:relative; max-width:1400px; margin:0 auto; padding:0 40px')}>
        {/* Warm bloom behind the headline mass — the one place the hero
            spends any decoration. */}
        <div style={s('position:absolute; left:-4%; top:2%; width:64%; height:74%; pointer-events:none; z-index:0; background:radial-gradient(46% 50% at 38% 52%, rgba(244,96,30,0.18), transparent 72%)')} />
        <div style={s('position:relative; z-index:1; display:flex; align-items:center; gap:14px')} data-anim="hero-1">
          <div style={s('display:inline-flex; align-items:center; gap:10px; padding:7px 15px 7px 11px; border-radius:99px; border:1px solid rgba(26,29,35,0.08); background:#FFFFFF; box-shadow:0 6px 18px -14px rgba(26,29,35,0.5)')}>
            <span style={s('position:relative; width:7px; height:7px; display:block')}>
              <span style={s('position:absolute; inset:0; border-radius:50%; background:#F4601E')} />
              <span style={s('position:absolute; inset:0; border-radius:50%; background:#F4601E; animation:om-ring 2.4s ease-out infinite')} />
            </span>
            <span style={s(`${MONO}; font-size:12px; background:linear-gradient(90deg,#5A616D 20%,#1A1D23 50%,#5A616D 80%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation:om-sheen 5.5s linear infinite`)}>4 systems running in production</span>
          </div>
          <span style={s(`${MONO}; font-size:12px; color:#5A616D`)}>Automotive · Real estate · Healthcare</span>
        </div>

        <h1 style={s('position:relative; z-index:1; margin:28px 0 0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:72px; line-height:0.9; letter-spacing:-0.035em; color:#1A1D23')}>
          <span style={s('display:block; overflow:hidden; padding-bottom:0.12em; margin-bottom:-0.12em')}>
            <span data-anim="hero-word" style={s('display:inline-block')}>Systems</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>that</span>
          </span>
          <span style={s('display:block; overflow:hidden; padding-bottom:0.12em; margin-bottom:-0.12em')}>
            <span data-anim="hero-word" style={s('display:inline-block; color:#F4601E')}>finish</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>the</span>{' '}
            <span data-anim="hero-word" style={s('display:inline-block')}>job.</span>
          </span>
        </h1>

        <div style={s('margin-top:36px; display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:start')} data-anim="hero-2">

          {/* Lead and CTAs stack in one left-anchored block, so the statement
              reads as a single unit instead of splitting across a gap. */}
          <div style={s('grid-column:1 / span 6')}>
            <p style={s('margin:0; max-width:46ch; font-size:17px; color:#5A616D')}>Ideora Labs builds agentic AI that works inside your existing operations. It books, checks, approves, updates, and reports without anyone chasing it.</p>
            <div style={s('margin-top:30px; display:flex; align-items:center; gap:14px')}>
              <Hover
                as="a"
                href="#services"
                style="display:inline-flex; align-items:center; padding:14px 24px; border-radius:14px; border:1px solid rgba(26,29,35,0.1); background:rgba(255,255,255,0.85); backdrop-filter:blur(14px); color:#1A1D23; font-size:15px; font-weight:500; transition:background .25s, border-color .25s"
                hoverStyle="background:#FFFFFF; border-color:rgba(26,29,35,0.24)"
              >See what we build</Hover>
              <Hover
                as="a"
                href="#book"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
                style="display:inline-flex; align-items:center; padding:15px 28px; border-radius:14px; background:#F4601E; color:#1A1D23; font-size:15px; font-weight:500; box-shadow:0 18px 40px -18px rgba(244,96,30,0.95); transition:transform .18s ease-out, background .25s"
                hoverStyle="background:#FF7A3D"
              >Book a working session</Hover>
            </div>
          </div>

          {/* Commercial proof, deliberately chosen not to repeat the live
              operational numbers in the console directly below. */}
          <div style={s('position:relative; grid-column:9 / span 4; margin-top:-62px; padding-left:28px')}>
            {/* Gradient rule rather than a flat hairline, so the block is tied
                to the headline's warm bloom instead of floating beside it. */}
            <div style={s('position:absolute; left:0; top:2px; bottom:2px; width:2px; border-radius:2px; background:linear-gradient(180deg, #F4601E, rgba(244,96,30,0.32) 46%, rgba(26,29,35,0.08))')} />
            {PROOF.map((f, i) => (
              <div
                key={f.label}
                style={s(`padding:${i === 0 ? '0' : '18px'} 0 ${i === PROOF.length - 1 ? '0' : '18px'}; ${i === PROOF.length - 1 ? '' : 'border-bottom:1px solid rgba(26,29,35,0.08)'}`)}
              >
                <div style={s('font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:32px; line-height:1; letter-spacing:-0.035em; font-variant-numeric:tabular-nums; color:#1A1D23')}>{f.value}</div>
                <div style={s('margin-top:7px; font-size:14px; line-height:1.4; color:#5A616D')}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={s('margin-top:52px; padding:0 40px')}>
        <OpsConsole consoleRef={consoleRef} />
      </div>

      <div style={s('margin-top:76px; border-top:1px solid rgba(244,96,30,0.22); border-bottom:1px solid rgba(244,96,30,0.22); background:rgba(244,96,30,0.05); overflow:hidden; padding:18px 0')}>
        <div style={s('display:flex; width:max-content; animation:om-marquee 38s linear infinite')}>
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>
    </section>
  );
}
