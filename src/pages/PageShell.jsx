import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHero, ProofStrip, ProseSections, CaseStudy, Related, PageCta } from './blocks';

export function PageShell({ page }) {
  useDocumentTitle(`${page.title} — Ideora Labs`, page.description);

  return (
    <div>
      <PageHero eyebrow={page.eyebrow} heading={page.heading} lede={page.lede} />
      <ProofStrip items={page.proof} />
      <ProseSections sections={page.sections} />
      {page.caseStudy && <CaseStudy {...page.caseStudy} />}
      <Related items={page.related} />
      <PageCta heading={page.cta.heading} body={page.cta.body} />
    </div>
  );
}
