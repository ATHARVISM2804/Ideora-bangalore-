import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { s } from '../lib/style';
import { spot } from '../lib/handlers';
import { useBelowDesktop, useIsPhone } from '../hooks/useMedia';
import { Icon, Spark, Ring, StatusPill } from '../components/ConsoleUI';
import { DASHBOARDS, CYCLE_MS } from '../data/dashboards';

const MONO = "font-family:'JetBrains Mono', monospace";
const LINE = '1px solid #EBE6DE';
const PANEL = '#FFFFFF';

const STATUS = {
  live:       { dot: '#F4601E', text: 'var(--accent-deep)', border: 'rgba(244,96,30,0.4)',    bg: 'rgba(244,96,30,0.12)' },
  'in build': { dot: 'var(--ink-faint)', text: 'var(--ink-muted)', border: 'rgba(110,104,98,0.28)', bg: 'rgba(110,104,98,0.08)' },
  pilot:      { dot: 'var(--ink-faint)', text: 'var(--ink-muted)', border: 'rgba(110,104,98,0.28)', bg: 'rgba(110,104,98,0.08)' },
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

  const rail = (
    <div
      role="tablist"
      aria-label="Industry"
      className={compact ? 'om-rail' : undefined}
      style={s(`position:relative; z-index:2; margin:0 auto ${compact ? '14px' : '20px'}; display:flex; align-items:center; gap:2px; width:max-content; max-width:100%; padding:5px; border-radius:999px; border:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.72); backdrop-filter:blur(18px) saturate(150%); -webkit-backdrop-filter:blur(18px) saturate(150%); box-shadow:0 10px 30px -14px rgba(28,25,23,0.24)`)}
    >
      {DASHBOARDS.map((item, i) => {
        const on = i === active;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => { setActive(i); setAutoplay(false); }}
            style={s(`flex:none; padding:9px 17px; border:0; border-radius:999px; cursor:pointer; font-family:inherit; font-size:14px; font-weight:${on ? 500 : 450}; background:${on ? '#FFFFFF' : 'transparent'}; color:${on ? 'var(--ink)' : 'var(--ink-muted)'}; box-shadow:${on ? '0 2px 8px -3px rgba(28,25,23,0.22)' : 'none'}; transition:background .3s, color .3s, box-shadow .3s`)}
          >{item.name}</button>
        );
      })}
    </div>
  );

  return (
    <div style={s('display:flex; flex-direction:column; align-items:center')}>
      {rail}
    <div ref={consoleRef} onMouseMove={spot} style={s('position:relative; max-width:var(--wide); margin:0 auto; overflow:hidden; border-radius:20px; border:1px solid #EBE6DE; background:#FCFBF9; color:var(--ink); box-shadow:0 28px 70px -34px rgba(28,25,23,0.18), 0 2px 6px -2px rgba(28,25,23,0.06)')} data-anim="console">
      <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(700px circle at var(--mx, 60%) var(--my, 10%), rgba(244,96,30,0.13), transparent 62%)')} />

      {/* Title bar */}
      <div style={s(`position:relative; display:flex; align-items:center; justify-content:space-between; gap:${compact ? '10px' : '24px'}; ${compact ? 'flex-wrap:wrap' : ''}; padding:13px clamp(14px, 3vw, 20px); border-bottom:${LINE}; background:#F5F2ED`)}>
        <div style={s('display:flex; align-items:center; gap:13px; flex:none')}>
          <span style={s('font-family:var(--serif); font-weight:600; font-size:13px; letter-spacing:0.02em')}>IDEORA OPS CONSOLE</span>
          <span style={s(`display:flex; align-items:center; gap:7px; padding:4px 10px; border-radius:99px; border:1px solid ${status.border}; background:${status.bg}; ${MONO}; font-size:11px; color:${status.text}; transition:all .3s`)}>
            <span style={s(`width:5px; height:5px; border-radius:50%; background:${status.dot}; animation:om-blink 1.8s infinite`)} />{d.status}
          </span>
        </div>


        <div style={s(`display:${compact ? 'none' : 'flex'}; gap:18px; ${MONO}; font-size:11px; color:var(--ink-faint); flex:none`)}>
          <span>ap-south-1</span><span>uptime 99.98%</span><span>{d.clock}</span>
        </div>
      </div>

      <div ref={bodyRef} style={s(`position:relative; display:grid; grid-template-columns:${compact ? '1fr' : '214px 1fr 306px'}; ${compact ? '' : 'min-height:600px'}`)}>

        {/* ── Sidebar ────────────────────────────────────────────── */}
        <div style={s(`border-right:${LINE}; display:${compact ? 'none' : 'flex'}; flex-direction:column; background:#FAF8F5`)}>
          <div style={s(`display:flex; align-items:center; gap:10px; padding:16px 16px; border-bottom:${LINE}`)}>
            <span style={s('width:28px; height:28px; flex:none; border-radius:9px; background:linear-gradient(140deg,#F4601E,var(--accent-deep)); display:flex; align-items:center; justify-content:center; font-family:var(--serif); font-weight:600; font-size:12px; color:#FFFFFF')}>{d.name[0]}</span>
            <span style={s('min-width:0')}>
              <span style={s('display:block; font-size:12.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{d.workspace}</span>
              <span style={s(`display:block; ${MONO}; font-size:10px; color:var(--ink-faint)`)}>{d.name.toLowerCase()}</span>
            </span>
            <span style={s('margin-left:auto; color:var(--ink-faint)')}><Icon name="chevron" size={14} /></span>
          </div>

          <div style={s('padding:12px 12px; display:flex; flex-direction:column; gap:3px')}>
            {d.rail.map((r) => (
              <div key={r.label} style={s(`display:flex; align-items:center; gap:10px; padding:9px 11px; border-radius:9px; background:${r.active ? 'rgba(28,25,23,0.04)' : 'transparent'}; color:${r.active ? 'var(--ink)' : 'var(--ink-muted)'}; font-size:13px; font-weight:500`)}>
                <Icon name={r.icon} size={15} />
                <span>{r.label}</span>
                {r.count && (
                  <span style={s(`margin-left:auto; padding:1px 7px; border-radius:99px; background:${r.active ? 'rgba(28,25,23,0.06)' : 'rgba(110,104,98,0.08)'}; ${MONO}; font-size:10px; color:${r.active ? 'var(--ink)' : 'var(--ink-faint)'}`)}>{r.count}</span>
                )}
              </div>
            ))}
          </div>

          <div style={s('margin-top:auto; padding:12px')}>
            <div style={s(`padding:12px 13px; border-radius:12px; border:${LINE}; background:${PANEL}`)}>
              <div style={s(`${MONO}; font-size:10px; color:var(--ink-faint)`)}>agents online</div>
              <div style={s('margin-top:6px; display:flex; align-items:baseline; gap:5px')}>
                <Count value={Number(d.online[0])} style={s('font-family:var(--serif); font-weight:500; font-size:19px; letter-spacing:-0.02em')} />
                <span style={s(`${MONO}; font-size:10px; color:var(--ink-faint)`)}>/ {d.online[1]}</span>
              </div>
            </div>
            <div style={s('margin-top:10px; display:flex; align-items:center; gap:10px; padding:8px 4px')}>
              <span style={s(`width:28px; height:28px; flex:none; border-radius:50%; border:${LINE}; background:${PANEL}; display:flex; align-items:center; justify-content:center; ${MONO}; font-size:10px; color:var(--ink-muted)`)}>{initials}</span>
              <span style={s('min-width:0')}>
                <span style={s('display:block; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{name}</span>
                <span style={s('display:block; font-size:10.5px; color:var(--ink-faint)')}>{role}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Main ───────────────────────────────────────────────── */}
        <div style={s('display:flex; flex-direction:column; min-width:0; background:#FFFFFF')}>
          {/* Toolbar */}
          <div style={s(`display:flex; align-items:center; gap:10px; padding:12px clamp(14px, 3vw, 18px); border-bottom:${LINE}`)}>
            <div style={s(`display:flex; align-items:center; gap:9px; flex:1; min-width:0; padding:8px 12px; border-radius:10px; border:${LINE}; background:#F5F2ED; color:var(--ink-faint)`)}>
              <Icon name="search" size={14} />
              <span style={s('font-size:12.5px; color:var(--ink-faint); white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{d.search}</span>
            </div>
            {!compact && d.filters.map((f) => (
              <span key={f} style={s(`display:inline-flex; align-items:center; gap:7px; flex:none; padding:7px 12px; border-radius:10px; border:${LINE}; background:#FFFFFF; font-size:12px; color:var(--ink-muted)`)}>
                {f}<span style={s('color:var(--ink-faint)')}><Icon name="chevron" size={12} /></span>
              </span>
            ))}
            <span style={s('display:inline-flex; align-items:center; gap:7px; flex:none; padding:8px clamp(10px, 2.5vw, 14px); border-radius:10px; background:#F4601E; color:#FFFFFF; font-size:12px; font-weight:500')}>
              <Icon name="plus" size={13} />{d.action}
            </span>
          </div>

          {/* KPI cards */}
          <div className="om-gkpi" style={s('display:grid; grid-template-columns:repeat(4,1fr); gap:10px; padding:14px clamp(14px, 3vw, 18px)')}>
            {d.kpis.map((k) => {
              const accent = k.accent ? 'var(--accent-deep)' : 'var(--ink)';
              const trendUp = k.trend === 'up';
              return (
                <div key={k.label} data-anim="kpi" style={s(`padding:13px 14px 10px; border-radius:13px; border:${LINE}; background:${PANEL}`)}>
                  <div style={s(`${MONO}; font-size:10px; color:var(--ink-faint); white-space:nowrap; overflow:hidden; text-overflow:ellipsis`)}>{k.label}</div>
                  <div style={s('margin-top:8px; display:flex; align-items:baseline; gap:5px')}>
                    <Count value={k.value} style={s(`font-family:var(--serif); font-weight:500; font-size:clamp(20px, 3.2vw, 26px); line-height:1; letter-spacing:-0.03em; color:${accent}`)} />
                    <span style={s(`${MONO}; font-size:10px; color:var(--ink-faint)`)}>{k.unit}</span>
                    <span style={s(`margin-left:auto; ${MONO}; font-size:10px; color:${k.trend === 'flat' ? 'var(--ink-faint)' : trendUp ? 'var(--accent-deep)' : 'var(--ink-faint)'}`)}>
                      {k.trend === 'flat' ? '–' : trendUp ? '↑' : '↓'} {k.delta}
                    </span>
                  </div>
                  <div style={s('margin-top:9px')}>
                    <Spark values={k.spark} color={k.accent ? '#F4601E' : '#B4ABA0'} h={26} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trace table */}
          <div style={s('padding:2px clamp(14px, 3vw, 18px) 0; display:flex; align-items:center; justify-content:space-between')}>
            <span style={s(`${MONO}; font-size:11px; color:var(--ink-faint)`)}>agent trace · {d.agent} · run {d.run}</span>
            <span style={s(`display:inline-flex; align-items:center; gap:6px; ${MONO}; font-size:11px; color:var(--ink-faint)`)}>
              <span style={s('width:5px; height:5px; border-radius:50%; background:#F4601E; animation:om-blink 1.8s infinite')} />streaming
            </span>
          </div>
          <div style={s('margin:10px clamp(14px, 3vw, 18px) 0; flex:1; display:flex; flex-direction:column; border-radius:13px; border:' + LINE + '; background:' + PANEL + '; overflow:hidden')}>
            <div style={s(`display:grid; grid-template-columns:${phone ? '66px 1fr 58px' : '84px 92px 1fr 84px'}; gap:12px; padding:9px clamp(10px, 2.5vw, 14px); border-bottom:${LINE}; background:#FFFFFF; ${MONO}; font-size:10px; letter-spacing:0.06em; color:var(--ink-faint)`)}>
              <span>TIME</span>{!phone && <span>ACTION</span>}<span>DETAIL</span><span style={s('text-align:right')}>STATUS</span>
            </div>
            {d.trace.map(([time, op, msg, st], i) => (
              <div key={i} data-anim="trace-row" style={s(`display:grid; grid-template-columns:${phone ? '66px 1fr 58px' : '84px 92px 1fr 84px'}; gap:12px; align-items:center; padding:8px clamp(10px, 2.5vw, 14px); ${i % 2 ? 'background:rgba(28,25,23,0.018)' : ''}; ${MONO}; font-size:${phone ? '11.5px' : '12.5px'}; color:var(--ink)`)}>
                <span style={s('color:var(--ink-faint)')}>{time}</span>
                {!phone && <span style={s('color:var(--ink-muted)')}>{op}</span>}
                <span style={s('white-space:nowrap; overflow:hidden; text-overflow:ellipsis')}>{msg}</span>
                <span style={s('display:flex; justify-content:flex-end')}><StatusPill kind={st} /></span>
              </div>
            ))}
            <div data-anim="trace-row" style={s(`display:grid; grid-template-columns:${phone ? '66px 1fr 58px' : '84px 92px 1fr 84px'}; gap:12px; align-items:center; padding:8px clamp(10px, 2.5vw, 14px); border-top:${LINE}; background:rgba(244,96,30,0.06); ${MONO}; font-size:${phone ? '11.5px' : '12.5px'}; color:var(--accent-deep)`)}>
              <span style={s('color:var(--ink-faint)')}>{d.done[0]}</span>
              {!phone && <span>{d.done[1]}</span>}
              <span>{d.done[2]}<span style={s('animation:om-caret 1.1s steps(1) infinite')}> ▍</span></span>
              <span style={s('display:flex; justify-content:flex-end')}><StatusPill kind="done" /></span>
            </div>
          </div>

          <div style={s(`margin-top:auto; padding:13px clamp(14px, 3vw, 18px); display:flex; justify-content:space-between; ${MONO}; font-size:11px; color:var(--ink-faint)`)}>
            {d.footer.map((f) => <span key={f}>{f}</span>)}
          </div>
        </div>

        {/* ── Right column ───────────────────────────────────────── */}
        <div style={s(`border-${compact ? 'top' : 'left'}:${LINE}; display:flex; flex-direction:column; background:#FAF8F5`)}>
          <div style={s(`padding:18px clamp(14px, 3vw, 18px); border-bottom:${LINE}; display:flex; align-items:center; gap:16px`)}>
            <Ring value={d.sla} />
            <div style={s('min-width:0')}>
              <div style={s('font-size:13px; font-weight:500')}>Within SLA</div>
              <div style={s(`margin-top:5px; ${MONO}; font-size:10.5px; line-height:1.5; color:var(--ink-faint)`)}>rolling 7 days<br />target 90%</div>
            </div>
          </div>

          <div style={s(`padding:16px 18px; border-bottom:${LINE}`)}>
            <div style={s(`${MONO}; font-size:10.5px; color:var(--ink-faint)`)}>{d.loadLabel}</div>
            <div style={s('margin-top:16px; display:flex; align-items:flex-end; gap:5px; height:88px')}>
              {d.bars.map((h, i) => (
                <div key={i} data-bar={h} style={s(`flex:1; height:${h}%; border-radius:3px 3px 1px 1px; background:${h === 100 ? '#F4601E' : '#EBE6DE'}`)} />
              ))}
            </div>
            <div style={s(`margin-top:10px; display:flex; justify-content:space-between; ${MONO}; font-size:10px; color:var(--ink-faint)`)}>
              <span>Mon</span><span style={s('color:var(--accent-deep)')}>{d.peak}</span><span>Sun</span>
            </div>
          </div>

          <div style={s('padding:16px 18px; display:flex; flex-direction:column; gap:13px')}>
            <div style={s(`${MONO}; font-size:10.5px; color:var(--ink-faint)`)}>{d.queueLabel}</div>
            {d.queue.map((q, i) => (
              <div key={q.name}>
                <div style={s('display:flex; justify-content:space-between; align-items:baseline; font-size:12.5px')}>
                  <span>{q.name}</span>
                  <span style={s(`${MONO}; font-size:11px; color:var(--ink-faint)`)}>{q.n}</span>
                </div>
                <div style={s('margin-top:7px; height:4px; border-radius:99px; background:#EBE6DE; overflow:hidden')}>
                  <div data-fill={q.pct} style={s(`height:100%; width:${q.pct}; border-radius:99px; background:${i === 0 ? '#F4601E' : 'var(--ink-faint)'}`)} />
                </div>
              </div>
            ))}
          </div>

          <div style={s(`margin-top:auto; border-top:${LINE}; padding:16px 18px`)}>
            <div style={s(`${MONO}; font-size:10.5px; color:var(--ink-faint)`)}>next scheduled report</div>
            <div style={s('margin-top:6px; font-size:13.5px')}>{d.report}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
