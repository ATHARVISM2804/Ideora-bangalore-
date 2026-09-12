import { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero, PageCta } from './blocks';
import { Section, Container, Label, Pill } from '../components/ui';
import { CASE_STUDIES, APPROVAL_NOTE } from '../data/caseStudies';
import { track } from '../lib/analytics';

// One case study, in the order a buyer evaluates it: who, what it was like
// before, what we built, what changed, and where the number came from.
//
// The evidence note is not small print at the bottom. A senior buyer discounts
// an unsourced number entirely, so saying where it came from -- including
// "still being confirmed" -- is worth more than the number alone.
export function CaseStudy() {
  const { slug } = useParams();
  const rootRef = useRef(null);
  const c = CASE_STUDIES.find((x) => x.slug === slug);

  useDocumentTitle(
    c ? `${c.title} | Ideora Labs` : 'Case study | Ideora Labs',
    c?.context || '',
  );
  useGsapTimeline({ rootRef });

  // Fires on the page itself, not only on the index card that led here. Most
  // case-study views arrive from search or a shared link and never touch the
  // index, so counting only the card undercounts the asset that did the work.
  useEffect(() => {
    if (c) track('case_study_view', { industry: c.industry, product: c.product, case_study: c.slug });
  }, [c]);

  // An unknown slug is a 404, not an empty page that looks like a failure.
  if (!c) return <Navigate to="/case-studies" replace />;

  const ROWS = [
    { head: 'The client', body: `${c.client}. ${c.clientNote}` },
    { head: 'The situation', body: c.context },
    { head: 'Before', body: c.baseline },
    { head: 'What we built', body: c.workflow },
    { head: 'What changed', body: c.outcome },
  ];

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={[{ label: 'Case studies', path: '/case-studies' }]} current={c.industry} />
      <PageHero eyebrow={`${c.industry} · live since ${c.since}`} heading={c.title} lede={c.context} />

      <Section edge="bottom" tight>
        <Container>
          <div className="rule-top">
            {ROWS.map((r) => (
              <div key={r.head} data-anim="card" className="prose-row">
                <h2>{r.head}</h2>
                <p className="body-muted">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 'var(--s-7)' }}>
            <div className="panel__body">
              <Label>Where the figure comes from</Label>
              <p className="small" style={{ marginTop: 'var(--s-3)' }}>{c.source}</p>
              <p className="small" style={{ marginTop: 'var(--s-3)' }}>Replaced {c.replaced}</p>
            </div>
            <div className="panel__foot">{APPROVAL_NOTE[c.approval]}</div>
          </div>

          <div style={{ marginTop: 'var(--s-6)', display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
            <Pill as={Link} to={c.productPath} className="pill--link">{c.product}</Pill>
            <Pill as={Link} to={c.industryPath} className="pill--link">More on {c.industry}</Pill>
            <Pill as={Link} to="/case-studies" className="pill--link">All case studies</Pill>
          </div>
        </Container>
      </Section>

      <PageCta
        heading="Would this work against your queue?"
        body="Thirty minutes with you and your operations lead. We map your handoffs and tell you which one a system can take first."
      />
    </div>
  );
}
