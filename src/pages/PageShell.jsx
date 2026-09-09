import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { PageHero, ProofStrip, ProseSections, Deliverables, CaseStudy, Faq, Related, PageCta } from './blocks';

// One entry from data/pages.js, rendered. The shell calls the timeline hook
// so the sub-pages actually animate: they have carried data-anim attributes
// since they were written, but nothing ever ran against them, so the home
// page faded its headings in and every other page did not.
export function PageShell({ page }) {
  const rootRef = useRef(null);

  useDocumentTitle(`${page.title} | Ideora Labs`, page.description);
  useGsapTimeline({ rootRef });

  return (
    <div ref={rootRef}>
      <PageHero eyebrow={page.eyebrow} heading={page.heading} lede={page.lede} />
      <ProofStrip items={page.proof} />
      <ProseSections sections={page.sections} />
      <Deliverables items={page.deliverables} />
      {page.caseStudy && <CaseStudy {...page.caseStudy} />}
      <Faq items={page.faq} />
      <Related items={page.related} />
      <PageCta heading={page.cta.heading} body={page.cta.body} />
    </div>
  );
}
