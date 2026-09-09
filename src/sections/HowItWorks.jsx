import { PROC } from '../data/content';
import { Section, Container, SectionHead, Card, Pill } from '../components/ui';

// A numbered spine. These five genuinely are a sequence, which is the only
// thing that justifies numbering them -- the markers state something true
// about the content rather than decorating it.
export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <SectionHead
          title="From first call to a system you own."
          lede="Five stages, six to ten weeks. You approve the design before anything is built, and you keep the dashboard afterwards."
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
                <div className="step__tags">
                  {p.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
