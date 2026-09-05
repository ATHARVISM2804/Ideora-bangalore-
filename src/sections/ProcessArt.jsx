import { s } from '../lib/style';

const MONO = "font-family:'JetBrains Mono', monospace";

// The five illustrations that sit at the top of each process card. Selected by
// the step's `kind` in the source data.

function Radar() {
  return (
    <div style={s('position:absolute; inset:0; display:flex; align-items:center; justify-content:center')}>
      <div style={s('position:relative; width:190px; height:190px')}>
        <div style={s('position:absolute; inset:0; border-radius:50%; border:1px solid rgba(26,29,35,0.12)')} />
        <div style={s('position:absolute; inset:26px; border-radius:50%; border:1px solid rgba(26,29,35,0.1)')} />
        <div style={s('position:absolute; inset:52px; border-radius:50%; border:1px solid rgba(26,29,35,0.08)')} />
        <div style={s('position:absolute; inset:78px; border-radius:50%; border:1px solid rgba(26,29,35,0.07)')} />
        <div style={s('position:absolute; inset:0; border-radius:50%; overflow:hidden')}>
          <div style={s('position:absolute; inset:0; background:conic-gradient(from 0deg, rgba(244,96,30,0.32), rgba(244,96,30,0.06) 55deg, transparent 78deg); animation:om-sweep 3.6s linear infinite')} />
        </div>
        <div style={s('position:absolute; left:50%; top:50%; width:7px; height:7px; margin:-3.5px; border-radius:50%; background:#F4601E')} />
        <div style={s('position:absolute; left:70%; top:28%; width:6px; height:6px; border-radius:50%; background:#B8400A; animation:om-ping 2.2s ease-in-out infinite')} />
        <div style={s('position:absolute; left:26%; top:62%; width:5px; height:5px; border-radius:50%; background:#5A616D; animation:om-ping 2.8s ease-in-out .4s infinite')} />
        <div style={s('position:absolute; left:58%; top:76%; width:5px; height:5px; border-radius:50%; background:#5A616D; animation:om-ping 3.1s ease-in-out .9s infinite')} />
      </div>
    </div>
  );
}

function Blueprint() {
  return (
    <div style={s('position:absolute; inset:0; padding:26px')}>
      <svg viewBox="0 0 300 200" style={s('width:100%; height:100%; overflow:visible')}>
        <path d="M20 24 H210 a14 14 0 0 1 14 14 V70" fill="none" stroke="#F4601E" strokeWidth="2" strokeDasharray="520" style={s('animation:om-draw 4.5s ease-in-out infinite')} />
        <path d="M20 60 H120" fill="none" stroke="#F4601E" strokeWidth="2" strokeDasharray="520" style={s('animation:om-draw 4.5s ease-in-out .35s infinite')} />
        <path d="M20 110 H96 a12 12 0 0 1 12 12 V158 H240" fill="none" stroke="#1A1D23" strokeWidth="1.5" opacity="0.35" strokeDasharray="520" style={s('animation:om-draw 4.5s ease-in-out .7s infinite')} />
        <rect x="150" y="96" width="110" height="20" rx="6" fill="rgba(244,96,30,0.12)" />
        <rect x="150" y="128" width="82" height="8" rx="4" fill="rgba(26,29,35,0.16)" />
        <rect x="20" y="140" width="56" height="8" rx="4" fill="rgba(26,29,35,0.12)" />
        <line x1="12" y1="10" x2="12" y2="180" stroke="rgba(26,29,35,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function Code() {
  return (
    <div style={s('position:absolute; inset:22px; border-radius:12px; overflow:hidden; border:1px solid #2E333C; background:#1A1D23; box-shadow:0 18px 40px -24px rgba(26,29,35,0.8)')}>
      <div style={s('display:flex; align-items:center; gap:6px; padding:10px 12px; border-bottom:1px solid #2E333C; background:#16191F')}>
        <span style={s('width:9px; height:9px; border-radius:50%; background:#F4601E')} />
        <span style={s('width:9px; height:9px; border-radius:50%; background:#5A616D')} />
        <span style={s('width:9px; height:9px; border-radius:50%; background:#2E333C')} />
        <span style={s(`margin-left:10px; ${MONO}; font-size:10px; color:#8A929E`)}>agent.run.js</span>
      </div>
      <div style={s(`padding:14px; display:flex; flex-direction:column; gap:8px; ${MONO}; font-size:11px; color:#E4E8EE`)}>
        <div style={s('overflow:hidden; white-space:nowrap; animation:om-type 4s steps(28) infinite')}>
          <span style={s('color:#FF8A50')}>import</span>{' '}{'{ agent }'}{' '}<span style={s('color:#FF8A50')}>from</span>{' "@/core";'}
        </div>
        <div style={s('overflow:hidden; white-space:nowrap; animation:om-type 4s steps(28) .4s infinite')}>
          <span style={s('color:#FF8A50')}>export function</span>{' run(job) {'}
        </div>
        <div style={s('overflow:hidden; white-space:nowrap; animation:om-type 4s steps(28) .8s infinite; padding-left:14px')}>return agent.plan(job);</div>
        <div style={s('overflow:hidden; white-space:nowrap; animation:om-type 4s steps(28) 1.2s infinite')}>{'}'}</div>
        <div style={s('margin-top:6px; display:flex; align-items:center; gap:7px; font-size:10px; color:#8A929E')}>
          <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-blink 1.6s infinite')} />deployed to staging · 09:14
        </div>
      </div>
    </div>
  );
}

function Graph() {
  return (
    <div style={s('position:absolute; inset:0; padding:24px')}>
      <svg viewBox="0 0 300 200" style={s('width:100%; height:100%')}>
        <path d="M74 44 C130 44 130 100 168 100" fill="none" stroke="#F4601E" strokeWidth="1.6" strokeDasharray="6 6" style={s('animation:om-dash 1.6s linear infinite')} />
        <path d="M74 100 H168" fill="none" stroke="#F4601E" strokeWidth="1.6" strokeDasharray="6 6" style={s('animation:om-dash 1.6s linear infinite')} />
        <path d="M74 156 C130 156 130 100 168 100" fill="none" stroke="#F4601E" strokeWidth="1.6" strokeDasharray="6 6" style={s('animation:om-dash 1.6s linear infinite')} />
        <path d="M212 100 H262" fill="none" stroke="#1A1D23" strokeWidth="1.6" opacity=".4" strokeDasharray="6 6" style={s('animation:om-dash 1.6s linear infinite')} />
        <g fill="#FFFFFF" stroke="rgba(26,29,35,0.14)">
          <rect x="18" y="32" width="56" height="24" rx="7" />
          <rect x="18" y="88" width="56" height="24" rx="7" />
          <rect x="18" y="144" width="56" height="24" rx="7" />
          <rect x="256" y="88" width="26" height="24" rx="7" />
        </g>
        <g fill="rgba(26,29,35,0.3)">
          <rect x="30" y="42" width="32" height="4" rx="2" />
          <rect x="30" y="98" width="32" height="4" rx="2" />
          <rect x="30" y="154" width="32" height="4" rx="2" />
        </g>
        <rect x="168" y="76" width="44" height="48" rx="12" fill="rgba(244,96,30,0.12)" stroke="#F4601E" strokeWidth="1.6" />
        <g fill="#F4601E">
          <rect x="180" y="90" width="20" height="3.5" rx="1.75" />
          <rect x="180" y="98" width="20" height="3.5" rx="1.75" />
          <rect x="180" y="106" width="13" height="3.5" rx="1.75" />
        </g>
        <circle cx="22" cy="44" r="3" fill="#F4601E" style={s('animation:om-tick 2s infinite')} />
        <circle cx="22" cy="100" r="3" fill="#F4601E" style={s('animation:om-tick 2s .3s infinite')} />
        <circle cx="22" cy="156" r="3" fill="#F4601E" style={s('animation:om-tick 2s .6s infinite')} />
      </svg>
    </div>
  );
}

const DASH_BARS = [
  ['44%', 'rgba(26,29,35,0.14)', ''],
  ['62%', 'rgba(26,29,35,0.14)', ' .2s'],
  ['52%', 'rgba(26,29,35,0.14)', ' .4s'],
  ['78%', 'rgba(26,29,35,0.14)', ' .6s'],
  ['100%', '#F4601E', ' .8s'],
  ['70%', 'rgba(26,29,35,0.14)', ' 1s'],
  ['56%', 'rgba(26,29,35,0.14)', ' 1.2s'],
];

function Dash() {
  return (
    <div style={s('position:absolute; inset:22px; border-radius:14px; border:1px solid rgba(26,29,35,0.07); background:#FFFFFF; padding:18px; display:flex; flex-direction:column')}>
      <div style={s(`display:flex; justify-content:space-between; ${MONO}; font-size:10px; color:#5A616D`)}>
        <span>operations digest</span><span style={s('color:#B8400A')}>Thu 18:00</span>
      </div>
      <div style={s('margin-top:16px; display:flex; align-items:flex-end; gap:5px; height:80px')}>
        {DASH_BARS.map(([h, bg, delay], i) => (
          <div key={i} style={s(`flex:1; height:${h}; border-radius:3px; background:${bg}; transform-origin:50% 100%; animation:om-bar-pulse 3s ease-in-out${delay} infinite`)} />
        ))}
      </div>
      <div style={s(`margin-top:auto; padding-top:14px; border-top:1px solid rgba(26,29,35,0.07); display:flex; justify-content:space-between; ${MONO}; font-size:10px; color:#5A616D`)}>
        <span>exceptions 2</span><span>handled 128</span>
        <span style={s('display:flex; align-items:center; gap:6px')}>
          <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-blink 1.8s infinite')} />live
        </span>
      </div>
    </div>
  );
}

const ART = { radar: Radar, blueprint: Blueprint, code: Code, graph: Graph, dash: Dash };

export function ProcessArt({ kind }) {
  const Art = ART[kind];
  return Art ? <Art /> : null;
}
