import { Link } from 'react-router-dom';
import { CASES } from '../data/content';
import { WA_BRIEFING, WA_DEMO, WA_LINK } from '../lib/whatsapp';
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
  // Legal and trust pages carry no figures. Without this they rendered an
  // empty ruled band where the numbers should have been.
  if (!items?.length) return null;
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
  if (!sections?.length) return null;
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
            {/* The site's one primary ask. This block closes every prose and
                product page, and it was still offering a demo while the hero,
                the nav and the closing all offered a thirty-minute call --
                a fourth variant of the first step, on twenty pages. */}
            <Button
              href={WA_BRIEFING}
              {...WA_LINK}
              data-track="discovery_start"
              data-track-cta_location="page_cta"
            >
              Book a 30-minute discovery call
            </Button>
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
        <Label as="h2" className="label--head">{head}</Label>
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
        <Label as="h2" className="label--head">{head}</Label>
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

// ---------------------------------------------------------------------------
// Product template blocks.
//
// The audit's finding was that a buyer could read the whole site and still not
// know what they would receive. These are the blocks that answer that: the
// workflow end to end, what it plugs into, what the buyer still controls, and
// what management sees. Each is optional, so a services or industry page can
// skip the ones that do not apply to it.
// ---------------------------------------------------------------------------

// Who acts at each step. A buyer's first question about an AI workflow is
// "where does a person still decide?", so the actor is a labelled state on the
// step rather than a footnote under the diagram.
const ACTOR = {
  auto: { label: 'Automated', cls: 'wf__step--auto' },
  system: { label: 'Integration', cls: 'wf__step--system' },
  human: { label: 'Your team', cls: 'wf__step--human' },
};

export function Workflow({ steps, head = 'The workflow, end to end' }) {
  if (!steps?.length) return null;
  return (
    <Section edge="bottom">
      <Container>
        <Label as="h2" className="label--head">{head}</Label>
        <ol className="wf" style={{ marginTop: 'var(--s-5)' }}>
          {steps.map((st, i) => {
            const actor = ACTOR[st.actor] || ACTOR.auto;
            return (
              <li key={st.title} data-anim="card" className={`wf__step ${actor.cls}`}>
                <span className="wf__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  {/* Text as well as colour: the state has to survive a
                      greyscale print and a colour-blind reader. */}
                  <span className="wf__actor">{actor.label}</span>
                  <h3 className="wf__title">{st.title}</h3>
                  <p className="small">{st.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

// Named systems, how they connect and what the client needs to have ready.
// "Works with your CRM" is not checkable; this is.
export function Integrations({ items, note, head = 'What it connects to' }) {
  if (!items?.length) return null;
  return (
    <Section edge="bottom" tight>
      <Container>
        <Label as="h2" className="label--head">{head}</Label>
        <div className="rule-top" style={{ marginTop: 'var(--s-5)' }}>
          {items.map((it) => (
            <div key={it.name} className="intg__row">
              <div className="intg__name">{it.name}</div>
              <div className="small intg__how">{it.how}</div>
              <div className="small intg__need">{it.needs}</div>
            </div>
          ))}
        </div>
        {note && <p className="fine" style={{ marginTop: 'var(--s-4)' }}>{note}</p>}
      </Container>
    </Section>
  );
}

// Permissions, approval points, audit trail and escalation. Procurement asks
// for exactly these four, and an operations lead will not sponsor a system
// internally without them.
export function Controls({ items, head = 'What you keep control of' }) {
  if (!items?.length) return null;
  return (
    <Section edge="bottom" tight>
      <Container>
        <Label as="h2" className="label--head">{head}</Label>
        <div className="cards cards--2" style={{ marginTop: 'var(--s-5)' }}>
          {items.map((it) => (
            <Card key={it.title} data-anim="card">
              <h3 style={{ fontSize: 'var(--t-d4)', lineHeight: 1.25 }}>{it.title}</h3>
              <p className="small" style={{ marginTop: 'var(--s-2)' }}>{it.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// The management view, named field by field, so a buyer can tell before a
// call whether the report they already run by hand is in here.
export function Dashboard({ items, head = 'What management sees' }) {
  if (!items?.length) return null;
  return (
    <Section edge="bottom" tight>
      <Container>
        <Label as="h2" className="label--head">{head}</Label>
        <ul className="dash" style={{ marginTop: 'var(--s-5)' }}>
          {items.map((it) => <li key={it} className="dash__item">{it}</li>)}
        </ul>
      </Container>
    </Section>
  );
}

// The demo slot. Recorded walkthroughs are a client deliverable we do not have
// yet, and a page that claims one and then shows nothing is worse than a page
// that says so. This renders the honest fallback until `demo.video` exists.
export function Demo({ demo, head = 'See it working' }) {
  if (!demo) return null;
  return (
    <Section edge="bottom">
      <Container>
        <div className="panel">
          <div className="panel__body">
            <Label>{head}</Label>
            <h2 style={{ marginTop: 'var(--s-4)', maxWidth: '31rem' }}>{demo.heading}</h2>
            <p className="body-muted prose--narrow" style={{ marginTop: 'var(--s-4)' }}>{demo.body}</p>

            <ol className="demo__steps" style={{ marginTop: 'var(--s-5)' }}>
              {demo.steps.map((st) => <li key={st} className="small demo__step">{st}</li>)}
            </ol>

            <Button
              href={WA_DEMO}
              {...WA_LINK}
              data-track="demo_start"
              style={{ marginTop: 'var(--s-6)' }}
            >
              {demo.cta || 'Ask for this walkthrough'}
            </Button>
          </div>
          <div className="panel__foot">
            Walkthroughs are run live against demonstration data, not recorded. Nothing in a
            demonstration is taken from a client system.
          </div>
        </div>
      </Container>
    </Section>
  );
}
