import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero, PageCta } from './blocks';
import { Section, Container, Label } from '../components/ui';
import { PRODUCTS } from '../data/products';
import { CASE_STUDIES } from '../data/caseStudies';
import { MENUS } from '../data/nav';

const INDUSTRY_MENU = MENUS.find((m) => m.label === 'Industries')?.items ?? [];

// The industries index.
//
// The navigation configuration gives Industries an href of its own, and it had
// none: the menu opened onto three leaves with no page behind the label. Each
// row carries what the cross-linking rules ask an industry page to route into
// -- the product that fits and the case study that proves it -- so the index is
// a junction rather than a list of three links.
export function Industries() {
  const rootRef = useRef(null);

  useDocumentTitle(
    'Industries | Ideora Labs',
    'AI automation for clinics, automotive service centres and property sales teams, running inside the software each already owns.',
  );
  useGsapTimeline({ rootRef });

  const rows = INDUSTRY_MENU.map((i) => {
    const key = i.label.toLowerCase().replace(' ', '-');
    return {
      ...i,
      product: PRODUCTS.find((p) => p.industry.replace(' ', '-') === key),
      study: CASE_STUDIES.find((c) => c.industry.replace(' ', '-') === key),
    };
  });

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={[]} current="Industries" />
      <PageHero
        eyebrow="Industries"
        heading="Three operations we have already built for"
        lede="Each of these started as a custom build and became a product, which is why the second clinic costs less than the first. Pick the one that looks like your operation."
      />

      <Section edge="bottom">
        <Container>
          <ul className="indlist">
            {rows.map((r) => (
              <li key={r.path} data-anim="card" className="indlist__row">
                <div>
                  <h2 className="indlist__name">
                    <Link to={r.path}>{r.label}</Link>
                  </h2>
                  <p className="small">{r.blurb}</p>
                </div>

                <div className="indlist__links">
                  {r.product && (
                    <div>
                      <Label as="span">The product</Label>
                      <Link to={r.product.path} className="indlist__link">{r.product.name} →</Link>
                    </div>
                  )}
                  {r.study && (
                    <div>
                      <Label as="span">The evidence</Label>
                      <Link to={`/case-studies/${r.study.slug}`} className="indlist__link">
                        {r.study.title} →
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PageCta
        heading="Not one of these three?"
        body="The method is the same wherever work waits on a person. Thirty minutes will tell us whether it applies to yours."
      />
    </div>
  );
}
