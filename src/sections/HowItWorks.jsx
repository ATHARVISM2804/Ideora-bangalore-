import { PROC } from '../data/content';
import { Section, Container, SectionHead, Card } from '../components/ui';

// A numbered spine. These six genuinely are a sequence, which is the only
// thing that justifies numbering them -- the markers state something true
// about the content rather than decorating it.
export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <SectionHead
          title="From first call to a system you own."
          lede="Six stages, six to ten weeks. You approve the design before anything is built, and you keep the dashboard afterwards."
        />

        <ol className="steps">
          {PROC.map((p, i) => (
            <li key={p.n} data-anim="step" className="step">
              <div className="step__marker">
                <span className="step__n" aria-hidden="true">{p.n}</span>
                {i < PROC.length - 1 && <span className="step__line" aria-hidden="true" />}
              </div>

              <Card>
                <h3>{p.title}</h3>
                <p className="body-muted" style={{ marginTop: 'var(--s-3)', maxWidth: 'var(--prose)' }}>{p.body}</p>
                {/* Scope, owner and deliverable, as the homepage row asks:
                    a step that does not say who owns it and what lands is a
                    description of activity rather than of delivery. */}
                <dl className="step__facts">
                  {[['Scope', p.scope], ['Owner', p.owner], ['You get', p.deliverable]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
