import { Link } from 'react-router-dom';
import { CASES } from '../data/content';
import { WA_DEMO, WA_LINK } from '../lib/whatsapp';
import { Section, Container, Label, Button, Card, Pill, Stat } from '../components/ui';

// The eleven data-driven pages share one shape, so they share one set of
// blocks. Everything here reads from the token layer -- this file used to be
// the last holdout of the pre-revamp cool palette (#5A616D text, #DFE3EA
// rules), which is why every inner page rendered at a different colour
// temperature than the home page.

export function PageHero({ eyebrow, heading, lede }) {
  return (
    <section className="page-hero">
      <Container>
        <div data-anim="hero-1">
          <Pill>{eyebrow}</Pill>
        </div>
        <h1 data-anim="head" style={{ marginTop: 'var(--s-5)' }}>{heading}</h1>
        <p className="lede prose" style={{ marginTop: 'var(--s-5)' }}>{lede}</p>
      </Container>
    </section>
  );
}

// The proof figures and the argument rows below them are one continuous ruled
// table, not two blocks. Spacing them apart left an empty band bounded by two
// parallel hairlines, which read as a row that had failed to load.
export function ProofStrip({ items }) {
  return (
    <Container>
      <div className="proof">
        {items.map((it) => <Stat key={it.label} label={it.label} value={it.value} />)}
      </div>
    </Container>
  );
}

// An editorial row per argument: the claim on the left, the reasoning on the
// right. The body is capped at 68 characters rather than spanning seven of
// twelve columns, which at the old 1400px container ran past eighty.
export function ProseSections({ sections }) {
  return (
    <Section edge="bottom" tight>
      <Container>
        {sections.map((sec) => (
          <div key={sec.title} data-anim="card" className="prose-row">
            <h2>{sec.title}</h2>
            <p className="body-muted">{sec.body}</p>
          </div>
        ))}
      </Container>
    </Section>
  );
}

export function Related({ items }) {
  if (!items?.length) return null;
  return (
    <Section edge="bottom" tight>
      <Container>
        <Label>Related</Label>
        <div style={{ marginTop: 'var(--s-4)', display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
          {items.map((it) => (
            <Pill key={it.path} as={Link} to={it.path} className="pill--link">{it.label}</Pill>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function PageCta({ heading, body }) {
  return (
    <Section edge="bottom">
      <Container>
        <div className="panel">
          <div className="panel__body page-cta">
            <div>
              <h2>{heading}</h2>
              <p className="body-muted prose--narrow" style={{ marginTop: 'var(--s-4)' }}>{body}</p>
            </div>
            <Button href={WA_DEMO} {...WA_LINK}>Request a demo</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// A case study built from the CASES entry for a vertical rather than from new
// claims. The site states that clients are under NDA, so there is no company
// name, no logo and no revenue figure here -- what it does, what it replaced,
// and when it went live is everything we can actually stand behind.
export function CaseStudy({ vertical, situation, built, changed }) {
  const cs = CASES.find((c) => c.vertical === vertical);
  if (!cs) return null;

  const COLS = [
    { head: 'The situation', body: situation },
    { head: 'What we built', body: built || cs.body },
    { head: 'What changed', body: changed },
  ].filter((c) => c.body);

  return (
    <Section edge="bottom">
      <Container>
        <div className="panel">
          <div className="panel__body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
              <Label>Case study</Label>
              <Pill accent live>
                {cs.vertical} · {cs.status === 'live' ? `live since ${cs.since}` : `${cs.status} · ${cs.since}`}
              </Pill>
            </div>

            <h2 style={{ marginTop: 'var(--s-4)', maxWidth: '31rem' }}>{cs.title}</h2>

            <div className="case__cols" style={{ marginTop: 'var(--s-6)' }}>
              {COLS.map((c) => (
                <div key={c.head}>
                  <Label>{c.head}</Label>
                  <p className="small" style={{ marginTop: 'var(--s-3)' }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel__foot">
            Replaced {cs.replaced}. Client is under NDA, so the system is described by what it
            does rather than who runs it.
          </div>
        </div>
      </Container>
    </Section>
  );
}

// What the client actually receives. A services page that only describes an
// approach leaves the reader guessing what lands on their desk; this is the
// deliverables list, in nouns.
export function Deliverables({ items, head = 'What you get' }) {
  if (!items?.length) return null;
  return (
    <Section edge="bottom">
      <Container>
        <Label>{head}</Label>
        <div className="cards cards--4" style={{ marginTop: 'var(--s-5)' }}>
          {items.map((it) => (
            <Card key={it.title} data-anim="card">
              <span className="deliverable__tick" aria-hidden="true">✓</span>
              <h3 style={{ marginTop: 'var(--s-4)', fontSize: 'var(--t-d4)', lineHeight: 1.25 }}>{it.title}</h3>
              <p className="small" style={{ marginTop: 'var(--s-2)' }}>{it.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// The objections. A senior operator reads a services page with four or five
// worries already formed -- cost, disruption, their people, what happens when
// it gets something wrong. Answering them on the page is worth more than
// another paragraph of capability.
export function Faq({ items, head = 'Questions we get asked' }) {
  if (!items?.length) return null;
  return (
    <Section edge="bottom">
      <Container>
        <Label>{head}</Label>
        <dl className="rule-top" style={{ marginTop: 'var(--s-5)' }}>
          {items.map((it) => (
            <div key={it.q} className="faq__row">
              <dt className="faq__q">{it.q}</dt>
              <dd className="faq__a">{it.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
