import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Section, Container } from './ui';

// The homepage product chooser as an editorial index, per the redesign
// handoff: four rows read like a contents page, and the active one reveals a
// large image and a one-line "what it replaces" statement, with an orange
// indicator that follows the pointer or the keyboard.
//
// Every row is a real link. Hover and focus move the indicator and swap the
// preview; nothing a reader needs lives only in the preview -- the name, the
// promise and what it replaces are all in the row itself. On a touch screen
// there is no hover, a tap goes straight to the product, and the page loses
// nothing. That is the handoff's own rule: hover enriches, never gates.

export function ProductIndex() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <Section id="products" edge="bottom">
      <Container wide>
        <div className="pidx-head">
          <p className="kicker">Choose a product</p>
          <h2 className="pidx-head__title">Start with the workflow you need to fix</h2>
        </div>

        <div className="pidx">
          <ol className="pidx__list">
            {PRODUCTS.map((item, i) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`pidx__row${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-track="product_view"
                  data-track-product={item.name}
                  data-track-industry={item.industry}
                  data-track-cta_location="home_index"
                >
                  <span className="pidx__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pidx__main">
                    <span className="pidx__name">{item.name}</span>
                    <span className="pidx__promise">{item.promise}</span>
                  </span>
                  <span className="pidx__industry">{item.industry}</span>
                  <span className="pidx__arrow" aria-hidden="true">→</span>
                  {/* In the row as well as the preview, so it is never
                      hover-only. Hidden on wide screens where the preview
                      shows it; visible on a phone where there is no preview. */}
                  <span className="pidx__replaces-inline">Replaces {item.replaces.toLowerCase()}</span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Decorative enrichment of the rows beside it: every word here is
              already in the list, so a screen reader is not read it twice. */}
          <div className="pidx__preview" aria-hidden="true">
            <div className={`pidx__media pidx__media--${p.industry.replace(/[^a-z]+/g, '-')}`}>
              <span className="pidx__field" />
              <span className="pidx__tag">{p.name}</span>
            </div>
            <p className="pidx__replaces">
              <span className="pidx__replaceslabel">Replaces</span>
              {p.replaces}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
