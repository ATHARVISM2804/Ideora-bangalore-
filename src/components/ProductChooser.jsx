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
  lede = 'Four systems we have already built and run. Pick the one that matches your operation, or ask us for a custom build where none of them do.',
  label = 'Products',
  id = 'products',
}) {
  return (
    <Section id={id} edge="bottom">
      <Container>
        <SectionHead label={label} title={heading} lede={lede} />

        <ul className="pchoose" style={{ marginTop: 'var(--s-7)' }}>
          {PRODUCTS.map((p) => (
            <li key={p.path}>
              <Link
                to={p.path}
                className="pchoose__card"
                data-track="product_view"
                data-track-product={p.name}
                data-track-industry={p.industry}
                data-track-cta_location="chooser"
              >
                <span className="pchoose__top">
                  <span className="pchoose__name">{p.name}</span>
                  {/* Text, not colour alone -- the status has to survive a
                      greyscale print and a colour-blind reader. */}
                  <span className={`pchoose__status pchoose__status--${p.status}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </span>

                <span className="pchoose__aud">{p.audience}</span>
                <span className="pchoose__promise">{p.promise}</span>
                <span className="pchoose__outcome">{p.outcome}</span>
                <span className="pchoose__cta" aria-hidden="true">{p.cta} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
