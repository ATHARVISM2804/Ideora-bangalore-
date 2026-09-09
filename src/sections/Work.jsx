import { Link } from 'react-router-dom';
import { CASES } from '../data/content';
import { CaseArt } from '../components/CaseArt';
import { Section, Container, SectionHead, Pill } from '../components/ui';

// The case studies. Sits directly after "what we build", because the question
// a reader has the moment they understand the offer is who you have done it
// for.

// Where a card goes when there is somewhere to go. Finance and Legal have no
// page yet, so those two stay plain -- better than a link into the 404.
const CASE_PATH = {
  'Automotive': '/industries/automotive',
  'Real estate': '/industries/real-estate',
  'Healthcare': '/industries/healthcare',
  'Cross-vertical': '/platforms/ops-console',
};

const SINCE_LABEL = { live: 'live since', pilot: 'pilot since' };

function CaseBody({ cs, linked }) {
  return (
    <>
      <div className="case-card__art">
        <CaseArt vertical={cs.vertical} />
      </div>

      <div className="case-card__body">
        <Pill accent={cs.status === 'live'} live={cs.status === 'live'}>
          {cs.vertical} · {cs.status}
        </Pill>

        <h3 style={{ marginTop: 'var(--s-4)' }}>{cs.title}</h3>
        <p className="small" style={{ marginTop: 'var(--s-3)' }}>{cs.body}</p>

        <div className="case-card__meta">
          <Pill>replaced {cs.replaced}</Pill>
          <Pill>{SINCE_LABEL[cs.status] || 'target'} {cs.since}</Pill>
        </div>

        {linked && <div className="case-card__more">Read the case study →</div>}
      </div>
    </>
  );
}

function CaseCard({ cs }) {
  const to = CASE_PATH[cs.vertical];

  // Hover and focus now come from CSS on .card--link, so a keyboard reader
  // gets the same lift a mouse does. The old Hover component listened for
  // mouseenter only, which made every affordance on the page mouse-only.
  if (!to) {
    return (
      <article data-anim="card" className="card card--flat case-card">
        <CaseBody cs={cs} />
      </article>
    );
  }

  return (
    <Link to={to} data-anim="card" className="card card--flat card--link case-card">
      <CaseBody cs={cs} linked />
    </Link>
  );
}

export function Work() {
  return (
    <Section id="work" tone="sunken">
      <Container>
        <SectionHead
          title="Four systems running. Two more in build."
          lede="Clients are under NDA, so each is described by what it does and what it replaced."
        />

        <div className="cards cards--3" style={{ marginTop: 'var(--s-7)' }}>
          {CASES.map((cs) => <CaseCard key={cs.code} cs={cs} />)}
        </div>
      </Container>
    </Section>
  );
}
