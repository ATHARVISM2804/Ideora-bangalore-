import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHero, ProofStrip, ProseSections, Deliverables, CaseStudy, Faq, Related, PageCta } from './blocks';

export function PageShell({ page }) {
  useDocumentTitle(`${page.title} | Ideora Labs`, page.description);

  return (
    <div>
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
