import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useTrackPageType } from '../hooks/useTrack';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useJsonLd } from '../hooks/useJsonLd';
import { ORIGIN } from '../lib/site';
import {
  PageHero, ProofStrip, Workflow, Demo, ProseSections, Deliverables,
  Integrations, Controls, Dashboard, CaseStudy, Faq, Related, PageCta,
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
  useTrackPageType(page);
  useGsapTimeline({ rootRef });

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={page.trail} current={page.title} />
      <PageHero eyebrow={page.eyebrow} heading={page.heading} lede={page.lede} />
      <ProofStrip items={page.proof} />
      <Workflow steps={page.workflow} />
      <Demo demo={page.demo} />
      <ProseSections sections={page.sections} />
      <Deliverables items={page.deliverables} />
      <Integrations items={page.integrations} note={page.integrationsNote} />
      <Controls items={page.controls} />
      <Dashboard items={page.dashboard} />
      {page.caseStudy && <CaseStudy {...page.caseStudy} />}
      <Faq items={page.faq} />
      <Related items={page.related} />
      {page.cta && <PageCta heading={page.cta.heading} body={page.cta.body} />}
    </div>
  );
}
