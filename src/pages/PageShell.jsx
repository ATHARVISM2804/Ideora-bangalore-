import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useTrackPageType } from '../hooks/useTrack';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductDashboard } from '../components/ProductDashboard';
import { Button } from '../components/ui';
import { waProduct, WA_LINK } from '../lib/whatsapp';
import { useJsonLd } from '../hooks/useJsonLd';
import { ORIGIN } from '../lib/site';
import {
  PageHero, ProofStrip, Workflow, Demo, ProseSections, Deliverables,
  Inputs, Integrations, Controls, Dashboard, Deployment, Evidence, Transcript,
  CaseStudy, Faq, Related, PageCta,
} from './blocks';

// One entry from data/pages.js, rendered.
//
// The order is the audit's: a buyer inspects the workflow, the demonstration
// and the proof before reading how delivery works. Every block after the hero
// is optional, so an industry page and a four-block legal page use the same
// shell without carrying empty sections.
export function PageShell({ page }) {
  const rootRef = useRef(null);

  useDocumentTitle(`${page.title} | Ideora Labs`, page.description);

  // A Product block for the four product pages, so a search result can show
  // what this is rather than treating it as an article. Deliberately carries
  // no price or rating: we have neither, and inventing them is how a rich
  // result gets a manual penalty.
  useJsonLd(
    page.product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: page.product,
          description: page.description,
          url: ORIGIN + page.path,
          category: page.industry,
          brand: { '@type': 'Brand', name: 'Ideora Labs' },
          audience: page.audience ? { '@type': 'Audience', audienceType: page.audience } : undefined,
        }
      : null,
    'product',
  );

  // The questions already on the page, marked up as the questions they are.
  // Only the ones a reader can see: FAQ structured data that does not match
  // visible content is exactly what the rich-result guidelines forbid.
  useJsonLd(
    page.faq?.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null,
    'faq',
  );

  // A service page describes something we do rather than something we sell as
  // a unit, so it is a Service and not a Product. No price: the scope call
  // sets it, and a made-up figure in markup is a penalty waiting to happen.
  useJsonLd(
    !page.product && page.path.startsWith('/services/')
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.title,
          description: page.description,
          url: ORIGIN + page.path,
          serviceType: page.title,
          provider: { '@id': `${ORIGIN}/#organization` },
          areaServed: { '@type': 'Country', name: 'India' },
        }
      : null,
    'service',
  );

  useTrackPageType(page);
  useGsapTimeline({ rootRef });

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={page.trail} current={page.title} />

      <PageHero
        /* On a product the eyebrow is the product's own name, not the content
           type: "Ideora Health" tells a buyer what they are looking at, where
           "Products" tells them only where they are. */
        eyebrow={page.product || page.eyebrow}
        heading={page.heading}
        lede={page.lede}
        audience={page.audience}
        actions={
          page.product && (
            <div className="page-hero__actions">
              <Button
                href={waProduct(page.product, 'demo')}
                {...WA_LINK}
                data-track="demo_start"
                data-track-product={page.product}
                data-track-demo_type="live_walkthrough"
                data-track-cta_location="product_hero"
              >
                Walk me through it
              </Button>
              <Button
                href={waProduct(page.product, 'review')}
                {...WA_LINK}
                variant="secondary"
                data-track="discovery_start"
                data-track-product={page.product}
                data-track-industry={page.industry}
                data-track-cta_location="product_hero"
              >
                Book a product review
              </Button>
            </div>
          )
        }
      />

      <ProofStrip items={page.proof} />
      <Workflow steps={page.workflow} id={page.product ? 'workflow' : undefined} />
      <Demo demo={page.demo} />
      <ProseSections sections={page.sections} />
      <Deliverables items={page.deliverables} />
      {/* Where a workflow fits, for pages that apply across industries rather
          than inside one. Same card grid, its own heading. */}
      <Deliverables items={page.domains} head="Where it fits" />
      <Inputs items={page.inputs} />
      <Integrations items={page.integrations} note={page.integrationsNote} />
      <Controls items={page.controls} />
      <Dashboard items={page.dashboard} />
      {/* The same metrics the list above names, drawn. Products only: a legal
          page has no management view. */}
      {page.product && <ProductDashboard product={page.product} />}
      <Transcript transcript={page.transcript} />
      <Evidence proof={page.evidence} />
      <Deployment items={page.deployment} />
      {page.caseStudy && <CaseStudy {...page.caseStudy} />}
      <Faq items={page.faq} />
      <Related items={page.related} />
      {page.cta && (
        <PageCta heading={page.cta.heading} body={page.cta.body} product={page.product} industry={page.industry} />
      )}
    </div>
  );
}
