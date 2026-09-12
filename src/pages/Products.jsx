import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useJsonLd } from '../hooks/useJsonLd';
import { ProductChooser } from '../components/ProductChooser';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero, Faq, PageCta } from './blocks';
import { PRODUCTS } from '../data/products';
import { ORIGIN } from '../lib/site';

// The products index: a commercial catalogue, not a capability list.
//
// It is a hand-written page rather than a PageShell entry because the chooser
// is the whole point of it, and a prose shell would bury four links under a
// lede and three argument rows.
export function Products() {
  const rootRef = useRef(null);

  useDocumentTitle(
    'Products | Ideora Labs',
    'Four AI systems for clinics, service centres, property sales and multi-site management, running inside the software you already own.',
  );
  useGsapTimeline({ rootRef });

  // An ItemList of the four products, so a search result can show the range
  // rather than one page's title.
  useJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ideora Labs products',
      itemListElement: PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        description: p.promise,
        url: ORIGIN + p.path,
      })),
    },
    'products',
  );

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={[]} current="Products" />
      <PageHero
        eyebrow="Products"
        heading="Four systems, already built"
        lede="Each one covers a workflow we have built and run before, so the build is shorter and the edge cases are already met. Where your workflow is genuinely yours, we build it as a custom service instead."
      />

      <ProductChooser label="Choose a product" heading="Pick the operation you want to fix first" lede={null} />

      <Faq
        head="Choosing between them"
        items={[
          { q: 'What if more than one applies to us?', a: 'Most groups start with the one that leaks the most money and add the second later. They share the same console and the same integrations, so the second is a shorter build than the first.' },
          { q: 'What if none of them match?', a: 'Then it is a custom build, and we will say so on the call rather than bending a product to fit. The five services describe how that works.' },
          { q: 'Is the Operations Console sold separately?', a: 'No. It comes with whichever system you run. It is listed as a product because management often cares about it more than the workflow underneath it.' },
          { q: 'How long until one of these is live?', a: 'Six to ten weeks to a first live workflow, with a working build to look at every week rather than a reveal at the end.' },
        ]}
      />

      <div style={{ textAlign: 'center', paddingBottom: 'var(--s-7)' }}>
        <Link to="/services" className="link-quiet">Or read how a custom build works →</Link>
      </div>

      <PageCta
        heading="Not sure which one fits?"
        body="Thirty minutes with you and your operations lead. We will tell you which product matches, or that none does."
      />
    </div>
  );
}
