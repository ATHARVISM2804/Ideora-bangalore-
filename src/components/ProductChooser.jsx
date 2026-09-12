import { Link } from 'react-router-dom';
import { PRODUCTS, STATUS_LABEL } from '../data/products';
import { Section, Container, SectionHead } from './ui';

// The product chooser.
//
// The audit's central finding was that a buyer could not tell what was for
// sale. Four named products, each a single link, is the fix -- and the whole
// card is one anchor rather than a card with a link inside it, so a keyboard
// user gets one stop per product instead of three.
//
// Deliberately not a reveal: this is the block that answers "is there
// something here for my business", so it must be in the first HTML response
// and visible without scrolling into a trigger.
export function ProductChooser({
  heading = 'Start with the workflow you need to fix',
  lede = null,
  label = 'Choose a product',
  id = 'products',
  // The homepage matches a reference render that carries no status, but the
  // products index is a catalogue: the card requirements ask for live, pilot
  // and coming-soon there, as text plus colour rather than colour alone.
  showStatus = false,
}) {
  return (
    <Section id={id} edge="bottom">
      {/* The wide container, so the chooser's left edge lines up with the
          hero above it. In the measure container it sat 130px further in and
          read as a different page. */}
      <Container wide>
        <SectionHead label={label} title={heading} lede={lede} className="pchoose-head" />

        <ul className="pchoose" style={{ marginTop: 'var(--s-5)' }}>
          {PRODUCTS.map((p, i) => (
            <li key={p.path}>
              <Link
                to={p.path}
                className={`pchoose__card${p.featured ? ' pchoose__card--featured' : ''}`}
                data-track="product_view"
                data-track-product={p.name}
                data-track-industry={p.industry}
                data-track-cta_location="chooser"
              >
                <span className="pchoose__top">
                  {/* The index, as the specification's card renders it. Purely
                      ordinal, so it is hidden from assistive technology: the
                      list already conveys position and "01" read aloud before
                      every product name is noise. */}
                  <span className="pchoose__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pchoose__name">{p.name}</span>
                  {showStatus && (
                    <span className={`pchoose__status pchoose__status--${p.status}`}>
                      {STATUS_LABEL[p.status]}
                    </span>
                  )}
                </span>

                <span className="pchoose__promise">{p.promise}</span>

                <span className="pchoose__foot">
                  <span className="pchoose__industry">{p.industry}</span>
                </span>

                {/* The card's accessible name has to say what the link does.
                    Sighted readers get that from the whole card being one
                    target; a screen reader would otherwise hear four names and
                    four descriptions with no verb. */}
                <span className="visually-hidden">{p.cta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
