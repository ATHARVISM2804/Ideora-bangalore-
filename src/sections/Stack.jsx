import { STACK } from '../data/content';
import { Section, Container, SectionHead } from '../components/ui';

// Was an orbital diagram: eight tiles rotating around the mark. Two problems.
// The tiles counter-rotate to stay upright and did not cancel cleanly, so half
// the labels sat at an angle -- hard to read, and harder for the reader this
// page is written for. And a systems diagram answers an architect's question,
// where the one actually being asked here is "will you disturb my business?"
//
// So the section states the answer instead: here is what you keep.
export function Stack() {
  return (
    <Section id="stack" tone="sunken">
      <Container>
        <SectionHead
          title="Nothing gets ripped out."
          lede="Our systems read and write to the software your team already uses. No migration, no second system to keep in sync."
        />

        <div
          data-anim="card"
          className="panel"
          style={{ marginTop: 'var(--s-7)' }}
        >
          <ul className="keeps">
            {STACK.map((item) => (
              <li key={item.label} className="keep">
                {/* A tick rather than a node: this is a list of what keeps
                    working, not a diagram of what connects to what. */}
                <span aria-hidden="true" className="keep__tick">✓</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="panel__foot">
            Your data stays where it is, and your team keeps working the way they already do.
            Nothing is replaced and nobody is retrained.
          </div>
        </div>
      </Container>
    </Section>
  );
}
