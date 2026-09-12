import { PROMISES } from '../data/content';
import { Container } from '../components/ui';

// Row 04 of the homepage sequence: three short factual operating promises,
// and no unsupported client claim.
//
// A strip rather than a section. It sits directly under the product chooser to
// answer the three things a buyer asks the moment they have picked a product --
// is anyone actually running this, how long until mine runs, and what does it
// need from my systems -- and then gets out of the way.
export function ProofStrip() {
  return (
    <Container>
      <ul className="promises">
        {PROMISES.map((p) => (
          <li key={p.label} className="promises__item">
            <span className="promises__label">{p.label}</span>
            <span className="promises__value">{p.value}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
