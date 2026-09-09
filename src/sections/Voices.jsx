import { useEffect, useState, useRef } from 'react';
import { QuoteGlyph } from '../components/QuoteGlyph';
import { QUOTES } from '../data/content';
import { Section, Container } from '../components/ui';

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
//
// The rail is a tab list. It previously had no ARIA at all: five plain buttons
// swapping a quote that rotated every seven seconds, with nothing telling a
// screen reader that the buttons controlled the quote or that it had changed.
export function Voices() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const tabRefs = useRef([]);
  const q = QUOTES[active];

  useEffect(() => {
    if (!autoplay || prefersReducedMotion()) return;
    const t = setInterval(() => setActive((i) => (i + 1) % QUOTES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [autoplay]);

  function pick(i) {
    setActive(i);
    // Any deliberate choice stops the carousel: continuing to rotate under
    // someone who has just chosen what to read is the reason carousels are
    // disliked.
    setAutoplay(false);
  }

  function onKeyDown(e) {
    const last = QUOTES.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section>
      <Container>
        <div className="voices__head">
          <h2 data-anim="head">In their words</h2>
          <p data-anim="head" className="body-muted">
            Attributed by role and scale only. Named references are available to serious enquiries under NDA.
          </p>
        </div>

        <div className="voices">
          <div
            className="voices__tabs"
            role="tablist"
            aria-label="Choose an industry"
            aria-orientation="vertical"
            tabIndex={-1}
            onKeyDown={onKeyDown}
          >
            {QUOTES.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.slotId}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`voice-tab-${item.slotId}`}
                  aria-selected={on}
                  aria-controls="voice-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  className="voices__tab"
                >
                  <span className="voices__marker" aria-hidden="true" />
                  {VERTICAL[item.glyph]}
                </button>
              );
            })}
          </div>

          {/* aria-live so the rotation is announced rather than swapping
              silently under an assistive-tech reader. */}
          <div
            role="tabpanel"
            id="voice-panel"
            aria-labelledby={`voice-tab-${q.slotId}`}
            aria-live="polite"
            tabIndex={0}
          >
            <blockquote key={q.slotId} className="fade-in" style={{ margin: 0 }}>
              <p className="voices__quote">
                <span className="voices__mark" aria-hidden="true">“</span>{q.text}
              </p>
              <footer className="voices__by">
                <QuoteGlyph kind={q.glyph} />
                <span>
                  <span style={{ display: 'block', fontSize: 'var(--t-sm)', fontWeight: 'var(--w-medium)' }}>{q.role}</span>
                  <span className="small" style={{ display: 'block' }}>{q.scale}</span>
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </Section>
  );
}
