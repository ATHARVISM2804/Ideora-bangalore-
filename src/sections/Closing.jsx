import { FACTS } from '../data/content';
import { WA_BRIEFING, WA_LINK } from '../lib/whatsapp';
import { Section, Container, Button } from '../components/ui';

// The page's last screen, as the redesign handoff's "reserved transition / CTA
// state": the source render left this area mostly empty, and the handoff asks
// for it to be a deliberate signature moment rather than whitespace by accident.
//
// Same composition as the hero, closing the loop: an editorial statement and
// one primary ask on the left, the scene the call happens in on the right with
// a single UI card proving what the reader leaves with. The facts become a
// metadata rail under it, the way the hero's proof sits under the hero.
//
// The copy is the source's, unchanged.

export function Closing() {
  return (
    <Section id="book" className="closing-x">
      <Container wide>
        <div className="closing-x__grid">
          <div data-anim="head">
            <p className="kicker">Next step</p>
            <h2 className="closing-x__title">Bring us the process nobody wants to own.</h2>
            <p className="closing-x__body">
              Thirty minutes with you and your operations lead. We map the handoffs on the call
              and tell you which a system can take first. You keep the map either way.
            </p>
            <div className="closing-x__actions">
              <Button
                href={WA_BRIEFING}
                {...WA_LINK}
                data-track="discovery_start"
                data-track-product="general"
                data-track-product_interest="general"
                data-track-cta_location="closing"
              >
                Book a 30-minute discovery call
              </Button>
              <Button
                to="/products"
                variant="secondary"
                data-track="product_view"
                data-track-product="general"
                data-track-product_interest="general"
                data-track-cta_location="closing"
              >
                See product demos
              </Button>
            </div>
          </div>

          {/* Illustrative: the copy beside it carries every claim. The field
              holds the discovery-session photograph's place until it exists. */}
          <div className="closing-x__media" aria-hidden="true">
            <span className="closing-x__field" />
            <div className="cc-ov cc-ov--checklist closing-x__card">
              <p className="cc-ov__title">Discovery call · 30 min</p>
              <ul className="cc-ov__list">
                {['Handoffs mapped', 'First workflow named', 'The map is yours'].map((l) => (
                  <li key={l}>
                    <span className="cc-ov__check">
                      <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
                        <circle cx="8" cy="8" r="8" fill="currentColor" />
                        <path d="M4.6 8.2l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <dl className="closing-x__rail">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
