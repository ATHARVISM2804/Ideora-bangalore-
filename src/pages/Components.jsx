import { useEffect, useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Section, Container, Label, Button, Card, Pill, Stat } from '../components/ui';
import { Workflow, Integrations, Controls, Dashboard, Demo } from './blocks';
import { PRODUCTS, STATUS_LABEL } from '../data/products';

// The component gallery: "Storybook or equivalent".
//
// Storybook would add a second build, a second dependency tree and a second
// place for component markup to live. This is the equivalent the specification
// allows -- one route that renders every state the component table lists, using
// the same components the site uses, so a state cannot be documented here and
// broken in production.
//
// It is noindexed and excluded from the sitemap: it is a working surface for
// the people building the site, not a page for a buyer.

function Row({ name, note, children }) {
  return (
    <div className="gal__row">
      <div className="gal__meta">
        <h3 className="gal__name">{name}</h3>
        {note && <p className="fine">{note}</p>}
      </div>
      <div className="gal__demo">{children}</div>
    </div>
  );
}

const WF_STATES = [
  { actor: 'auto', title: 'Automated action', body: 'The system completes the step on its own and records what it did.' },
  { actor: 'system', title: 'Integration action', body: 'A write into a system you already own: CRM, calendar, DMS or HIS.' },
  { actor: 'human', title: 'Human exception', body: 'It stopped, named a reason and assigned an owner rather than guessing.' },
  { actor: 'done', title: 'Completed', body: 'The record is written and the management view reflects it.' },
];

export function Components() {
  const rootRef = useRef(null);
  useDocumentTitle('Component states | Ideora Labs', 'Internal gallery of every documented component state.');

  // Belt and braces with the X-Robots-Tag in vercel.json. The header is the
  // one that counts, but a crawler that reaches this through a client-side
  // navigation only ever sees the DOM.
  useEffect(() => {
    const el = document.createElement('meta');
    el.name = 'robots';
    el.content = 'noindex, nofollow';
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div ref={rootRef}>
      <Section>
        <Container>
          <Label>Internal</Label>
          <h1 style={{ marginTop: 'var(--s-4)' }}>Component states</h1>
          <p className="lede prose" style={{ marginTop: 'var(--s-5)' }}>
            Every state the component table requires, rendered from the same components the site
            uses. If something here looks wrong it is wrong on the site too. Not linked from the
            navigation, excluded from the sitemap, and marked noindex.
          </p>
        </Container>
      </Section>

      <Section edge="bottom" tight>
        <Container>
          <Label as="h2" className="label--head">Button</Label>
          <div className="rule-top" style={{ marginTop: 'var(--s-5)' }}>
            <Row name="Primary" note="Default, hover, focus. White on --accent-deep at 5.2:1.">
              <Button>Book a discovery call</Button>
            </Row>
            <Row name="Secondary">
              <Button variant="secondary">See product demos</Button>
            </Row>
            <Row name="Text" note="No fill, no padding: for a link that has to sit in prose.">
              <Button variant="text">Read how a build runs</Button>
            </Row>
            <Row name="Dark" note="The header call to action, against glass.">
              <Button variant="dark" size="sm">Book a 30-min call</Button>
            </Row>
            <Row name="Disabled" note="Pointer events off, so it cannot be submitted twice.">
              <Button disabled>Send enquiry</Button>
            </Row>
            <Row name="Loading" note="aria-busy carries the state; the spinner is decoration and stops under reduced motion.">
              <Button aria-busy="true">Sending</Button>
            </Row>
            <Row name="Block" note="Full width, used in the mobile drawer.">
              <Button block>Book a discovery call</Button>
            </Row>
          </div>
        </Container>
      </Section>

      <Section edge="bottom" tight>
        <Container>
          <Label as="h2" className="label--head">ProductCard</Label>
          <div className="rule-top" style={{ marginTop: 'var(--s-5)' }}>
            <Row name="Status" note="Text plus colour, never colour alone, so it survives greyscale and colour blindness.">
              <div style={{ display: 'flex', gap: 'var(--s-5)', flexWrap: 'wrap' }}>
                {['live', 'pilot', 'soon', 'included'].map((k) => (
                  <span key={k} className={`pchoose__status pchoose__status--${k}`}>{STATUS_LABEL[k]}</span>
                ))}
              </div>
            </Row>
            <Row name="Default and featured" note="Featured carries the accent border for a launch or a campaign.">
              <ul className="pchoose" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                {PRODUCTS.slice(0, 2).map((p, i) => (
                  <li key={p.path}>
                    <span className={`pchoose__card${i === 1 ? ' pchoose__card--featured' : ''}`}>
                      <span className="pchoose__top">
                        <span className="pchoose__num" aria-hidden="true">0{i + 1}</span>
                        <span className="pchoose__name">{p.name}</span>
                      </span>
                      <span className="pchoose__promise">{p.promise}</span>
                      <span className="pchoose__foot">
                        <span className="pchoose__industry">{p.industry}</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Row>
          </div>
        </Container>
      </Section>

      <Workflow head="WorkflowStep — all four states" steps={WF_STATES} />

      <Section edge="bottom" tight>
        <Container>
          <Label as="h2" className="label--head">Metric</Label>
          <div className="proof" style={{ marginTop: 'var(--s-5)' }}>
            <Stat label="Baseline" value="Next morning" />
            <Stat label="Result" value="~40s" />
            <Stat label="Period" value="Since Feb 2026" />
            <Stat label="Source" value="System records" />
          </div>
          <p className="fine" style={{ marginTop: 'var(--s-4)' }}>
            A result without a baseline and a source is a claim. All four render together or none do.
          </p>
        </Container>
      </Section>

      <Integrations
        head="Integration — named system, method, prerequisite"
        items={[{ name: 'WhatsApp Business', how: 'Official Business API through a provider account', needs: 'A verified business number' }]}
        note="Named systems only. &quot;Works with your CRM&quot; is not checkable."
      />

      <Controls
        head="Controls"
        items={[{ title: 'Approval points you set', body: 'Which actions complete alone and which wait for a person, agreed in writing.' }]}
      />

      <Dashboard head="Management view" items={['Live queues', 'Backlog ageing', 'Exception reasons, ranked']} />

      <Demo
        head="DemoPanel — unavailable fallback"
        demo={{
          heading: 'The state shown when there is no recorded video',
          body: 'Rather than an empty player, the panel says what a walkthrough covers and offers to run one.',
          steps: ['Send a test enquiry.', 'Watch it written into the calendar.', 'Open the exception queue.'],
          cta: 'Ask for this walkthrough',
        }}
      />

      <Section edge="bottom" tight>
        <Container>
          <Label as="h2" className="label--head">LeadForm</Label>
          <div className="rule-top" style={{ marginTop: 'var(--s-5)' }}>
            <Row name="Validation" note="One summary in a live region, plus aria-invalid on each field.">
              <p className="contact__err" role="status">Please check your name, a valid work email.</p>
            </Row>
            <Row name="Failure" note="A failed request is not the visitor's mistake, and says so.">
              <p className="contact__err" role="status">
                We could not send that just now. Please try again, or reach us on WhatsApp.
              </p>
            </Row>
            <Row name="Success">
              <p className="contact__ok" role="status">
                Thank you. We have it, and you will hear from us within one business day.
              </p>
            </Row>
            <Row name="Field, invalid">
              <p className="field">
                <label htmlFor="gal-email">Work email</label>
                <input id="gal-email" type="email" aria-invalid="true" defaultValue="not-an-email" />
              </p>
            </Row>
          </div>
        </Container>
      </Section>

      <Section edge="bottom" tight>
        <Container>
          <Label as="h2" className="label--head">Pill, Card, Label</Label>
          <div className="rule-top" style={{ marginTop: 'var(--s-5)' }}>
            <Row name="Pill">
              <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
                <Pill>Default</Pill>
                <Pill accent live>Live since Feb 2026</Pill>
              </div>
            </Row>
            <Row name="Card">
              <Card style={{ maxWidth: '20rem' }}>
                <h3 style={{ fontSize: 'var(--t-d4)' }}>A card</h3>
                <p className="small" style={{ marginTop: 'var(--s-2)' }}>16px radius, hairline rule, white surface.</p>
              </Card>
            </Row>
          </div>
        </Container>
      </Section>
    </div>
  );
}
