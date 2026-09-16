import { useState } from 'react';
import { CASES } from '../data/content';
import { CaseCard } from '../components/CaseCard';
import { Section, Container } from '../components/ui';

// The case studies, rebuilt as the redesign handoff's image-led editorial
// grid: "this is where the new visual style should land hardest."
//
// The headline stays the source's. "Four systems running. Two more in build."
// is a proof point, and the handoff is explicit that the redesign changes
// presentation, not the claims.

const FILTERS = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'live', label: 'Live', test: (c) => c.status === 'live' },
  { key: 'building', label: 'In build and pilot', test: (c) => c.status !== 'live' },
];

export function Work() {
  const [filter, setFilter] = useState('all');
  const active = FILTERS.find((f) => f.key === filter);
  const shown = CASES.filter(active.test);

  return (
    <Section id="work">
      <Container wide>
        <div className="cases-head">
          <div>
            <p className="kicker">Real-world use cases</p>
            <h2 className="cases-head__title">Four systems running. Two more in build.</h2>
            <p className="cases-head__lede">
              Clients are under NDA, so each is described by what it does and what it replaced.
            </p>
          </div>

          {/* Filters are buttons that work on tap, per the handoff: hover may
              enrich but never gates anything. aria-pressed carries the state,
              so a screen reader hears which view is on. */}
          <div className="cases-filter" role="group" aria-label="Filter use cases">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="cases-filter__btn"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Announced once when the set changes, not on every render. */}
        <p className="visually-hidden" aria-live="polite">
          Showing {shown.length} of {CASES.length} use cases
        </p>

        <div className="cases-grid">
          {shown.map((cs) => <CaseCard key={cs.code} cs={cs} />)}
        </div>
      </Container>
    </Section>
  );
}
