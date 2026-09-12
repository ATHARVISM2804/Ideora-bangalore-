import { useState, useRef } from 'react';
import { SERVICES } from '../data/content';
import { Section, Container, SectionHead } from '../components/ui';

const METHOD = ['read the request', 'check the record', 'act in your system', 'log the outcome'];

// Selector list beside a detail panel: the five practices are always all
// visible, and choosing one swaps the panel rather than pushing the page
// around, which an accordion did.
//
// This is a tab pattern, so it is now marked up as one. It previously used
// aria-pressed on five plain buttons, which tells a screen reader that each is
// a toggle and never says that they control the region alongside them.
export function Services() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const svc = SERVICES[active];

  const bullets = [
    ['Delivers', svc.delivers],
    ['Connects to', svc.connects],
    ['Time to live', svc.time],
  ];

  // Arrow keys move between tabs, which is what the pattern requires and what
  // roving tabIndex below makes reachable.
  function onKeyDown(e) {
    const last = SERVICES.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="services">
      <Container>
        <SectionHead
          label="Services"
          title="How a build actually runs"
          lede="Five steps from the first map to a system we keep running. The products above are these same five steps against a workflow we have built before, which is why they take less time."
        />

        <div className="services">
          <div
            className="services__tabs"
            role="tablist"
            aria-label="Delivery steps"
            aria-orientation="vertical"
            tabIndex={-1}
            onKeyDown={onKeyDown}
          >
            {SERVICES.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.code}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`svc-tab-${item.code}`}
                  aria-selected={on}
                  aria-controls="svc-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`services__tab${on ? ' is-active' : ''}`}
                >
                  <span className="services__tab-title">{item.title}</span>
                  <span className="services__tab-sub">{item.short}</span>
                </button>
              );
            })}
          </div>

          <div
            className="card services__panel"
            role="tabpanel"
            id="svc-panel"
            aria-labelledby={`svc-tab-${svc.code}`}
            tabIndex={0}
          >
            <div key={svc.code} className="fade-in">
              <h3>{svc.title}</h3>
              <p className="body-muted prose--narrow" style={{ marginTop: 'var(--s-4)' }}>{svc.body}</p>

              <ul className="services__facts">
                {bullets.map(([label, value]) => (
                  <li key={label}>
                    <span className="dot" aria-hidden="true" />
                    <span>
                      <span style={{ color: 'var(--ink-faint)' }}>{label}: </span>
                      <span>{value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* The method every practice runs on, stated once. */}
              <div className="services__method">
                <div className="label">One method</div>
                <ol className="services__steps">
                  {METHOD.map((step, i) => (
                    <li key={step}>
                      {i > 0 && <span aria-hidden="true" className="services__arrow">→</span>}
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
