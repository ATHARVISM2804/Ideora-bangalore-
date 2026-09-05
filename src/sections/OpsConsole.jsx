import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { useBelowDesktop, useIsPhone } from '../hooks/useMedia';
import { Icon, Spark, Ring, StatusPill } from '../components/ConsoleUI';
import { DASHBOARDS, CYCLE_MS } from '../data/dashboards';

const MONO = "font-family:'JetBrains Mono', monospace";
const LINE = '1px solid #2E333C';
const PANEL = '#1E222A';

const STATUS = {
  live:       { dot: '#F4601E', text: '#FF8A50', border: 'rgba(244,96,30,0.4)',    bg: 'rgba(244,96,30,0.12)' },
  'in build': { dot: '#8A929E', text: '#C6CCD6', border: 'rgba(198,204,214,0.28)', bg: 'rgba(198,204,214,0.08)' },
  pilot:      { dot: '#8A929E', text: '#C6CCD6', border: 'rgba(198,204,214,0.28)', bg: 'rgba(198,204,214,0.08)' },
};

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function Count({ value, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.textContent = value; return; }
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: value, duration: 1.1, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(o.v); },
    });
    return () => tw.kill();
  }, [value]);
  return <span ref={ref} style={style}>{value}</span>;
}

export function OpsConsole({ consoleRef }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const bodyRef = useRef(null);
  const d = DASHBOARDS[active];
  const status = STATUS[d.status];
  const [initials, name, role] = d.user;

  useEffect(() => {
    if (!autoplay || prefersReducedMotion()) return;
    const t = setInterval(() => setActive((i) => (i + 1) % DASHBOARDS.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [autoplay]);

  useLayoutEffect(() => {
    const root = bodyRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(root, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      gsap.from('[data-anim="kpi"]', { y: 10, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
      gsap.from('[data-anim="trace-row"]', { x: -12, opacity: 0, duration: 0.42, stagger: 0.05, ease: 'power3.out' });
      gsap.from('[data-bar]', { scaleY: 0, transformOrigin: '50% 100%', duration: 0.7, stagger: 0.03, ease: 'power3.out' });
      gsap.from('[data-fill]', { scaleX: 0, transformOrigin: '0% 50%', duration: 0.9, stagger: 0.1, ease: 'power3.out' });
    }, root);
    return () => ctx.revert();
  }, [active]);

  // The console is a product surface, not a layout: 214px of navigation and a
  // 306px inspector either side of the work area. That reads at desktop width
  // and nowhere near a 390px phone. Below 1024px the three columns become one
  // stack, and the sidebar — pure chrome, every row of it duplicated by the
  // content beneath — drops out rather than being shrunk into illegibility.
  const compact = useBelowDesktop();
  const phone = useIsPhone();

  return (
    <div ref={consoleRef} onMouseMove={spot} style={s('position:relative; max-width:1400px; margin:0 auto; overflow:hidden; border-radius:20px; border:1px solid #2E333C; background:#16191F; color:#F1F3F6; box-shadow:0 60px 120px -60px rgba(26,29,35,0.9)')} data-anim="console">
      <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(700px circle at var(--mx, 60%) var(--my, 10%), rgba(244,96,30,0.14), transparent 62%)')} />

      {/* Title bar */}
      <div style={s(`position:relative; display:flex; align-items:center; justify-content:space-between; gap:${compact ? '10px' : '24px'}; ${compact ? 'flex-wrap:wrap' : ''}; padding:13px clamp(14px, 3vw, 20px); border-bottom:${LINE}; background:#12151A`)}>
        <div style={s('display:flex; align-items:center; gap:13px; flex:none')}>
          <span style={s('font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:13px; letter-spacing:0.02em')}>IDEORA OPS CONSOLE</span>
          <span style={s(`display:flex; align-items:center; gap:7px; padding:4px 10px; border-radius:99px; border:1px solid ${status.border}; background:${status.bg}; ${MONO}; font-size:11px; color:${status.text}; transition:all .3s`)}>
            <span style={s(`width:5px; height:5px; border-radius:50%; background:${status.dot}; animation:om-blink 1.8s infinite`)} />{d.status}
          </span>
        </div>

        <div role="tablist" aria-label="Industry" className={compact ? 'om-rail' : undefined} style={s(`display:flex; align-items:center; gap:2px; padding:3px; border-radius:12px; border:${LINE}; background:#1A1D23; ${compact ? 'overflow-x:auto; max-width:100%' : ''}`)}>
          {DASHBOARDS.map((item, i) => {
            const on = i === active;
            return (
              <button key={item.id} type="button" role="tab" aria-selected={on}
                onClick={() => { setActive(i); setAutoplay(false); }}
                style={s(`flex:none; padding:6px 13px; border:0; border-radius:9px; cursor:pointer; font-family:inherit; font-size:12px; font-weight:500; white-space:nowrap; background:${on ? 'rgba(244,96,30,0.16)' : 'transparent'}; color:${on ? '#FF8A50' : '#8A929E'}; transition:background .3s, color .3s`)}
              >{item.name}</button>
            );
          })}
        </div>

        <div style={s(`display:${compact ? 'none' : 'flex'}; gap:18px; ${MONO}; font-size:11px; color:#8A929E; flex:none`)}>
          <span>ap-south-1</span><span>uptime 99.98%</span><span>{d.clock}</span>
        </div>
      </div>

      <div ref={bodyRef} style={s(`position:relative; display:grid; grid-template-columns:${compact ? '1fr' : '214px 1fr 306px'}; ${compact ? '' : 'min-height:600px'}`)}>

        {/* ── Sidebar ────────────────────────────────────────────── */}
        <div style={s(`border-right:${LINE}; display:${compact ? 'none' : 'flex'}; flex-direction:column; background:#14171C`)}>
          <div style={s(`display:flex; align-items:center; gap:10px; padding:16px 16px; border-bottom:${LINE}`)}>
            <span style={s('width:28px; height:28px; flex:none; border-radius:9px; background:linear-gradient(140deg,#F4601E,#B8400A); display:flex; align-items:center; justify-content:center; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:600; font-size:12px; color:#1A1D23')}>{d.name[0]}</span>
            <span style={s('min-width:0')}>
              <span style={s('display:block; font-size:12.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{d.workspace}</span>
              <span style={s(`display:block; ${MONO}; font-size:10px; color:#8A929E`)}>{d.name.toLowerCase()}</span>
            </span>
            <span style={s('margin-left:auto; color:#5A616D')}><Icon name="chevron" size={14} /></span>
          </div>

          <div style={s('padding:12px 12px; display:flex; flex-direction:column; gap:3px')}>
            {d.rail.map((r) => (
              <div key={r.label} style={s(`display:flex; align-items:center; gap:10px; padding:9px 11px; border-radius:9px; background:${r.active ? 'rgba(244,96,30,0.13)' : 'transparent'}; color:${r.active ? '#FF8A50' : '#A7AEBA'}; font-size:13px; font-weight:500`)}>
                <Icon name={r.icon} size={15} />
                <span>{r.label}</span>
                {r.count && (
                  <span style={s(`margin-left:auto; padding:1px 7px; border-radius:99px; background:${r.active ? 'rgba(244,96,30,0.2)' : 'rgba(198,204,214,0.08)'}; ${MONO}; font-size:10px; color:${r.active ? '#FF8A50' : '#8A929E'}`)}>{r.count}</span>
                )}
              </div>
            ))}
          </div>

          <div style={s('margin-top:auto; padding:12px')}>
            <div style={s(`padding:12px 13px; border-radius:12px; border:${LINE}; background:${PANEL}`)}>
              <div style={s(`${MONO}; font-size:10px; color:#8A929E`)}>agents online</div>
              <div style={s('margin-top:6px; display:flex; align-items:baseline; gap:5px')}>
                <Count value={Number(d.online[0])} style={s('font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:19px; letter-spacing:-0.02em')} />
                <span style={s(`${MONO}; font-size:10px; color:#8A929E`)}>/ {d.online[1]}</span>
              </div>
            </div>
            <div style={s('margin-top:10px; display:flex; align-items:center; gap:10px; padding:8px 4px')}>
              <span style={s(`width:28px; height:28px; flex:none; border-radius:50%; border:${LINE}; background:${PANEL}; display:flex; align-items:center; justify-content:center; ${MONO}; font-size:10px; color:#C6CCD6`)}>{initials}</span>
              <span style={s('min-width:0')}>
                <span style={s('display:block; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{name}</span>
                <span style={s('display:block; font-size:10.5px; color:#8A929E')}>{role}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Main ───────────────────────────────────────────────── */}
        <div style={s('display:flex; flex-direction:column; min-width:0; background:#181B21')}>
          {/* Toolbar */}
          <div style={s(`display:flex; align-items:center; gap:10px; padding:12px clamp(14px, 3vw, 18px); border-bottom:${LINE}`)}>
            <div style={s(`display:flex; align-items:center; gap:9px; flex:1; min-width:0; padding:8px 12px; border-radius:10px; border:${LINE}; background:#12151A; color:#5A616D`)}>
              <Icon name="search" size={14} />
              <span style={s('font-size:12.5px; color:#5A616D; white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{d.search}</span>
            </div>
            {!compact && d.filters.map((f) => (
              <span key={f} style={s(`display:inline-flex; align-items:center; gap:7px; flex:none; padding:7px 12px; border-radius:10px; border:${LINE}; background:#1A1D23; font-size:12px; color:#A7AEBA`)}>
                {f}<span style={s('color:#5A616D')}><Icon name="chevron" size={12} /></span>
              </span>
            ))}
            <span style={s('display:inline-flex; align-items:center; gap:7px; flex:none; padding:8px clamp(10px, 2.5vw, 14px); border-radius:10px; background:#F4601E; color:#1A1D23; font-size:12px; font-weight:500')}>
              <Icon name="plus" size={13} />{d.action}
            </span>
          </div>

          {/* KPI cards */}
          <div className="om-gkpi" style={s('display:grid; grid-template-columns:repeat(4,1fr); gap:10px; padding:14px clamp(14px, 3vw, 18px)')}>
            {d.kpis.map((k) => {
              const accent = k.accent ? '#FF8A50' : '#F1F3F6';
              const trendUp = k.trend === 'up';
              return (
                <div key={k.label} data-anim="kpi" style={s(`padding:13px 14px 10px; border-radius:13px; border:${LINE}; background:${PANEL}`)}>
                  <div style={s(`${MONO}; font-size:10px; color:#8A929E; white-space:nowrap; overflow:hidden; text-overflow:ellipsis`)}>{k.label}</div>
                  <div style={s('margin-top:8px; display:flex; align-items:baseline; gap:5px')}>
                    <Count value={k.value} style={s(`font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:clamp(20px, 3.2vw, 26px); line-height:1; letter-spacing:-0.03em; color:${accent}`)} />
                    <span style={s(`${MONO}; font-size:10px; color:#8A929E`)}>{k.unit}</span>
                    <span style={s(`margin-left:auto; ${MONO}; font-size:10px; color:${k.trend === 'flat' ? '#5A616D' : trendUp ? '#FF8A50' : '#8A929E'}`)}>
                      {k.trend === 'flat' ? '–' : trendUp ? '↑' : '↓'} {k.delta}
                    </span>
                  </div>
                  <div style={s('margin-top:9px')}>
                    <Spark values={k.spark} color={k.accent ? '#F4601E' : '#5A616D'} h={26} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trace table */}
          <div style={s('padding:2px clamp(14px, 3vw, 18px) 0; display:flex; align-items:center; justify-content:space-between')}>
            <span style={s(`${MONO}; font-size:11px; color:#8A929E`)}>agent trace · {d.agent} · run {d.run}</span>
            <span style={s(`display:inline-flex; align-items:center; gap:6px; ${MONO}; font-size:11px; color:#8A929E`)}>
              <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-blink 1.8s infinite')} />streaming
            </span>
          </div>
          <div style={s('margin:10px clamp(14px, 3vw, 18px) 0; flex:1; display:flex; flex-direction:column; border-radius:13px; border:' + LINE + '; background:' + PANEL + '; overflow:hidden')}>
            <div style={s(`display:grid; grid-template-columns:${phone ? '66px 1fr 58px' : '84px 92px 1fr 84px'}; gap:12px; padding:9px clamp(10px, 2.5vw, 14px); border-bottom:${LINE}; background:#1A1D23; ${MONO}; font-size:10px; letter-spacing:0.06em; color:#8A929E`)}>
              <span>TIME</span>{!phone && <span>ACTION</span>}<span>DETAIL</span><span style={s('text-align:right')}>STATUS</span>
            </div>
            {d.trace.map(([time, op, msg, st], i) => (
              <div key={i} data-anim="trace-row" style={s(`display:grid; grid-template-columns:${phone ? '66px 1fr 58px' : '84px 92px 1fr 84px'}; gap:12px; align-items:center; padding:8px clamp(10px, 2.5vw, 14px); ${i % 2 ? 'background:rgba(255,255,255,0.014)' : ''}; ${MONO}; font-size:${phone ? '11.5px' : '12.5px'}; color:#E4E8EE`)}>
                <span style={s('color:#8A929E')}>{time}</span>
                {!phone && <span style={s('color:#A7AEBA')}>{op}</span>}
                <span style={s('white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{msg}</span>
                <span style={s('display:flex; justify-content:flex-end')}><StatusPill kind={st} /></span>
              </div>
            ))}
            <div data-anim="trace-row" style={s(`display:grid; grid-template-columns:${phone ? '66px 1fr 58px' : '84px 92px 1fr 84px'}; gap:12px; align-items:center; padding:8px clamp(10px, 2.5vw, 14px); border-top:${LINE}; background:rgba(244,96,30,0.05); ${MONO}; font-size:${phone ? '11.5px' : '12.5px'}; color:#FF8A50`)}>
              <span style={s('color:#8A929E')}>{d.done[0]}</span>
              {!phone && <span>{d.done[1]}</span>}
              <span>{d.done[2]}<span style={s('animation:om-caret 1.1s steps(1) infinite')}> ▍</span></span>
              <span style={s('display:flex; justify-content:flex-end')}><StatusPill kind="done" /></span>
            </div>
          </div>

          <div style={s(`margin-top:auto; padding:13px clamp(14px, 3vw, 18px); display:flex; justify-content:space-between; ${MONO}; font-size:11px; color:#8A929E`)}>
            {d.footer.map((f) => <span key={f}>{f}</span>)}
          </div>
        </div>

        {/* ── Right column ───────────────────────────────────────── */}
        <div style={s(`border-${compact ? 'top' : 'left'}:${LINE}; display:flex; flex-direction:column; background:#14171C`)}>
          <div style={s(`padding:18px clamp(14px, 3vw, 18px); border-bottom:${LINE}; display:flex; align-items:center; gap:16px`)}>
            <Ring value={d.sla} />
            <div style={s('min-width:0')}>
              <div style={s('font-size:13px; font-weight:500')}>Within SLA</div>
              <div style={s(`margin-top:5px; ${MONO}; font-size:10.5px; line-height:1.5; color:#8A929E`)}>rolling 7 days<br />target 90%</div>
            </div>
          </div>

          <div style={s(`padding:16px 18px; border-bottom:${LINE}`)}>
            <div style={s(`${MONO}; font-size:10.5px; color:#8A929E`)}>{d.loadLabel}</div>
            <div style={s('margin-top:16px; display:flex; align-items:flex-end; gap:5px; height:88px')}>
              {d.bars.map((h, i) => (
                <div key={i} data-bar={h} style={s(`flex:1; height:${h}%; border-radius:3px 3px 1px 1px; background:${h === 100 ? '#F4601E' : '#2E333C'}`)} />
              ))}
            </div>
            <div style={s(`margin-top:10px; display:flex; justify-content:space-between; ${MONO}; font-size:10px; color:#8A929E`)}>
              <span>Mon</span><span style={s('color:#FF8A50')}>{d.peak}</span><span>Sun</span>
            </div>
          </div>

          <div style={s('padding:16px 18px; display:flex; flex-direction:column; gap:13px')}>
            <div style={s(`${MONO}; font-size:10.5px; color:#8A929E`)}>{d.queueLabel}</div>
            {d.queue.map((q, i) => (
              <div key={q.name}>
                <div style={s('display:flex; justify-content:space-between; align-items:baseline; font-size:12.5px')}>
                  <span>{q.name}</span>
                  <span style={s(`${MONO}; font-size:11px; color:#8A929E`)}>{q.n}</span>
                </div>
                <div style={s('margin-top:7px; height:4px; border-radius:99px; background:#2E333C; overflow:hidden')}>
                  <div data-fill={q.pct} style={s(`height:100%; width:${q.pct}; border-radius:99px; background:${i === 0 ? '#F4601E' : '#5A616D'}`)} />
                </div>
              </div>
            ))}
          </div>

          <div style={s(`margin-top:auto; border-top:${LINE}; padding:16px 18px`)}>
            <div style={s(`${MONO}; font-size:10.5px; color:#8A929E`)}>next scheduled report</div>
            <div style={s('margin-top:6px; font-size:13.5px')}>{d.report}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
