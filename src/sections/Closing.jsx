import { spot, magnetMove, magnetLeave } from '../lib/handlers';
import { FACTS } from '../data/content';
import { WA_BRIEFING, WA_LINK } from '../lib/whatsapp';
import { Section, Container, Label, Button } from '../components/ui';

export function Closing() {
  return (
    <Section id="book" tone="sunken">
      <Container>
        <div className="facts">
          {FACTS.map((f) => (
            <div key={f.label} data-anim="step">
              <Label>{f.label}</Label>
              <div className="fact__value">{f.value}</div>
            </div>
          ))}
        </div>
      </Container>

      <Container wide style={{ marginTop: 'var(--band-tight)' }}>
        <div className="panel closing" onMouseMove={spot}>
          <div className="closing__spot" aria-hidden="true" />
          <div className="closing__dots" aria-hidden="true" />

          <h2 data-anim="head">Bring us the process nobody wants to own.</h2>

          <div data-anim="head">
            <p className="body-muted">
              Thirty minutes with you and your operations lead. We map the handoffs on the call
              and tell you which a system can take first. You keep the map either way.
            </p>
            <Button
              href={WA_BRIEFING}
              {...WA_LINK}
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
              style={{ marginTop: 'var(--s-6)' }}
            >
              Book a 30-minute discovery call
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
