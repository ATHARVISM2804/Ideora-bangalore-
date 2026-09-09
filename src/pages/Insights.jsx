import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { PageHero } from './blocks';
import { Section, Container, Card } from '../components/ui';

const ARTICLES = [
  { category: 'Operations', title: 'The estimate that sits unapproved', standfirst: 'Why the biggest delay in a service bay is rarely a parts shortage, and almost always a follow-up nobody owns.', date: 'Jan 2026' },
  { category: 'Integrations', title: 'No rip and replace, and what that actually means', standfirst: 'Connecting agents to a CRM or DMS you already run, without asking anyone to migrate a system that already works.', date: 'Feb 2026' },
  { category: 'Automotive', title: 'What a service centre queue looks like from one console', standfirst: 'Reading booking, estimate and parts status as one record, so nobody reconciles separate tools by hand at the end of the day.', date: 'Mar 2026' },
  { category: 'Real estate', title: 'Qualifying an enquiry before a person sees it', standfirst: 'Scoring budget, area and readiness on arrival, so what reaches an agent already carries the qualification behind it.', date: 'Apr 2026' },
  { category: 'Healthcare', title: 'Coverage checked days before the appointment', standfirst: 'Verifying eligibility days ahead of a visit changes what the front desk does on the morning it happens.', date: 'May 2026' },
  { category: 'Method', title: 'Why we fix the scope before we design the system', standfirst: 'Agreeing what an agent may action, and what it must route to a person, before anything is built.', date: 'Jun 2026' },
];

export function Insights() {
  const rootRef = useRef(null);

  useDocumentTitle('Insights | Ideora Labs', 'Notes on operational automation, integrations and the agentic systems we build.');
  useGsapTimeline({ rootRef });

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="Insights"
        heading="Notes on operational automation"
        lede="Short pieces on the handoffs we automate, the systems we connect to, and the method behind a fixed-scope build."
      />
      <Section edge="bottom">
        <Container>
          <div className="cards cards--3">
            {ARTICLES.map((a) => (
              // Deliberately not a link and deliberately not lifting on hover:
              // there are no article routes yet, and a card that behaves like
              // it will navigate and then does not is worse than a static one.
              <Card key={a.title} data-anim="card" className="stack">
                <div className="stat__label" style={{ color: 'var(--accent-deep)' }}>{a.category}</div>
                <h2 style={{ fontSize: 'var(--t-d4)', lineHeight: 1.25 }}>{a.title}</h2>
                <p className="small">{a.standfirst}</p>
                <div className="stat__label">{a.date}</div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
