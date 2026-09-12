import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero, PageCta } from './blocks';
import { Section, Container, Label, Pill } from '../components/ui';
import { CASE_STUDIES } from '../data/caseStudies';

// The case-study index. One card per launch industry, each carrying the
// baseline as well as the outcome -- the audit's rule is that a result without
// a baseline is a claim, so the card shows both or it shows neither.
export function CaseStudies() {
  const rootRef = useRef(null);

  useDocumentTitle(
    'Case studies | Ideora Labs',
    'What we built for clinics, service centres and property sales teams: the baseline, the system, and what changed.',
  );
  useGsapTimeline({ rootRef });

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={[]} current="Case studies" />
      <PageHero
        eyebrow="Case studies"
        heading="What we built, and what it replaced"
        lede="Our clients are under NDA, so these describe the system rather than the company running it. Each one states what the operation looked like before, so the result has something to be measured against."
      />

      <Section edge="bottom">
        <Container>
          <ul className="cslist">
            {CASE_STUDIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/case-studies/${c.slug}`}
                  className="cslist__card"
                  data-track="case_study_view"
                  data-track-industry={c.industry}
                  data-track-product={c.product}
                  data-track-case_study={c.slug}
                >
                  <span className="cslist__meta">
                    <Pill accent live>{c.industry} · live since {c.since}</Pill>
                  </span>
                  <h2 className="cslist__title">{c.title}</h2>

                  <span className="cslist__cols">
                    <span>
                      <Label as="span">Before</Label>
                      <span className="small cslist__body">{c.baseline}</span>
                    </span>
                    <span>
                      <Label as="span">After</Label>
                      <span className="small cslist__body">{c.outcome}</span>
                    </span>
                  </span>

                  <span className="cslist__cta" aria-hidden="true">Read the full study →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PageCta
        heading="Ask us about the one closest to your operation"
        body="We will walk through what it does, what it connects to and what it took to get live."
      />
    </div>
  );
}
