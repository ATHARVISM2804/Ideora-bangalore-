import { s } from '../lib/style';
import { CASES } from '../data/content';
import { useBelowDesktop } from '../hooks/useMedia';

const MONO = "font-family:'JetBrains Mono', monospace";

// A system that is not live yet does not get a "live since" date.
const SINCE_LABEL = { live: 'live since', pilot: 'pilot since', 'in build': 'target' };

// Pinned horizontal scroller: pinRef pins the section, trackRef is translated
// on scroll, railRef is the progress indicator. Wired up in useGsapTimeline.
export function Work({ pinRef, trackRef, railRef }) {
  // Below desktop the track becomes a swipeable snap rail instead. The pin is
  // what forces the change: pinning fixes the section to the viewport and
  // converts vertical scroll into horizontal travel, which on iOS Safari
  // fights the address bar collapsing and the browser's own swipe-back edge
  // gesture. Native overflow scrolling gets the same reading order with none
  // of that. useGsapTimeline skips the pin at the same breakpoint.
  const swipe = useBelowDesktop();

  return (
    <section id="work" ref={pinRef} data-nav-dark style={s('position:relative; overflow:hidden; background:var(--dark); color:var(--bg); padding:clamp(80px, 11vw, 150px) 0 clamp(56px, 7vw, 96px)')}>
      <div style={s('position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size:28px 28px; mask-image:linear-gradient(180deg,#000,transparent 80%); -webkit-mask-image:linear-gradient(180deg,#000,transparent 80%)')} />
      <div className="om-g12" style={s('position:relative; max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12,1fr); gap:20px; align-items:end')}>
        <h2 style={s('grid-column:1 / span 6; margin:0; font-family:var(--serif); font-weight:500; font-size:clamp(31px, 5.4vw, 52px); line-height:0.98; letter-spacing:-0.03em')}>Systems in production</h2>
        <p style={s('grid-column:8 / span 4; margin:0; color:#A79E93')}>Four systems running inside client operations, two more in build. Clients are under NDA, so each is described by what it does and what it replaced.</p>
      </div>

      <div
        className={swipe ? 'om-rail' : undefined}
        onScroll={swipe ? (e) => {
          const el = e.currentTarget;
          const max = el.scrollWidth - el.clientWidth;
          if (railRef.current) {
            railRef.current.style.transform = `scaleX(${0.1 + (max > 0 ? el.scrollLeft / max : 0) * 0.9})`;
          }
        } : undefined}
        style={s(`position:relative; margin-top:clamp(32px, 5vw, 52px); padding-left:clamp(20px, 5vw, 40px); ${swipe ? 'overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-left:clamp(20px, 5vw, 40px); padding-right:clamp(20px, 5vw, 40px)' : ''}`)}
      >
        <div ref={trackRef} style={s('display:flex; align-items:stretch; width:max-content')}>
          {CASES.map((cs, i) => (
            <div
              key={cs.code}
              style={s(`position:relative; flex:0 0 ${swipe ? 'min(82vw, 470px)' : '470px'}; padding:0 clamp(24px, 4vw, 44px) 0 ${i ? 'clamp(24px, 4vw, 44px)' : '0'}; ${i ? 'border-left:1px solid var(--dark-rule)' : ''}; ${swipe ? 'scroll-snap-align:start' : ''}`)}
            >
              {/* Ghost index sits behind the slide, giving the track a sense of
                  position without adding another boxed card. */}
              <span style={s('position:absolute; top:-14px; right:36px; font-family:var(--serif); font-weight:600; font-size:clamp(44px, 11vw, 112px); line-height:1; letter-spacing:-0.05em; color:rgba(255,255,255,0.035); pointer-events:none; user-select:none')}>{String(i + 1).padStart(2, '0')}</span>

              <div style={s(`position:relative; display:flex; align-items:center; gap:12px; ${MONO}; font-size:14px; color:#8A8177`)}>
                <span style={s(`color:${cs.status === 'live' ? '#FF8A50' : '#C4BCB2'}`)}>{cs.vertical}</span>
                {cs.status !== 'live' && (
                  <span style={s('padding:2px 8px; border-radius:99px; border:1px solid rgba(196,188,178,0.28); background:rgba(196,188,178,0.08); font-size:10px; color:#C4BCB2')}>{cs.status}</span>
                )}
                <span style={s('flex:1; height:1px; background:var(--dark-rule)')} />
                <span>{cs.code}</span>
              </div>

              <h3 style={s('position:relative; margin:26px 0 0; font-family:var(--serif); font-weight:500; font-size:clamp(21px, 3.5vw, 28px); line-height:1.06; letter-spacing:-0.03em')}>{cs.title}</h3>
              <p style={s('position:relative; margin:18px 0 0; max-width:40ch; font-size:15px; color:#A79E93')}>{cs.body}</p>

              <div style={s(`position:relative; margin-top:30px; padding-top:18px; border-top:1px solid var(--dark-rule); display:flex; flex-direction:column; gap:10px; ${MONO}; font-size:14px`)}>
                <div style={s('display:flex; justify-content:space-between')}><span style={s('color:#8A8177')}>replaced</span><span>{cs.replaced}</span></div>
                <div style={s('display:flex; justify-content:space-between')}>
                  <span style={s('color:#8A8177')}>{SINCE_LABEL[cs.status]}</span>
                  <span style={s(`color:${cs.status === 'live' ? '#FF8A50' : '#C4BCB2'}`)}>{cs.since}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s('position:relative; max-width:1400px; margin:44px auto 0; padding:0 clamp(20px, 5vw, 40px); display:flex; align-items:center; gap:14px')}>
        <span style={s(`${MONO}; font-size:11px; color:#8A8177`)}>{swipe ? 'swipe to advance' : 'scroll to advance'}</span>
        <div style={s('flex:1; height:2px; border-radius:99px; background:var(--dark-rule); overflow:hidden')}>
          <div ref={railRef} style={s('height:100%; width:100%; border-radius:99px; background:#F4601E; transform:scaleX(0.1); transform-origin:0 50%')} />
        </div>
      </div>
    </section>
  );
}
