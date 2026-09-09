import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { PageHero, ProofStrip, ProseSections } from './blocks';
import { FACTS } from '../data/content';
import { Section, Container, Label } from '../components/ui';

const SECTIONS = [
  { title: 'Who we are', body: 'A team that builds agentic AI and operational automation for large operators. We work in automotive, real estate and healthcare today, wiring agents into the systems these operations already run instead of replacing them.' },
  { title: 'How we work', body: 'Every build starts with an operations audit and ends with us running the system. We do not hand it over and walk away. The scope and the price are fixed before a line is written, and the workflow is approved by your team before it is built.' },
  { title: 'What we will not do', body: 'We do not ask an operator to rip out a CRM, a DMS or an EMR to get an agent live. We build against the stack you already have, under your permissions, and we say plainly when a process is better handled by a person.' },
];

export function About() {
  const rootRef = useRef(null);

  useDocumentTitle('About | Ideora Labs', 'Who builds Ideora Labs and how the fixed-scope build and managed operation actually works.');
  useGsapTimeline({ rootRef });

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="About"
        heading="Agentic AI, built by people who answer for it"
        lede="We design and run the agents that take over the operational work large teams do by hand, then stay on to operate what we built."
      />
      <ProofStrip items={FACTS} />
      <ProseSections sections={SECTIONS} />

      <Section id="contact" edge="bottom">
        <Container>
          <div className="panel">
            <div className="panel__body page-cta">
              <div>
                <h2>Talk to us about your operation</h2>
                <p className="body-muted prose--narrow" style={{ marginTop: 'var(--s-4)' }}>
                  Tell us the process that stalls most and we will walk it with you before anything is scoped.
                </p>
              </div>
              <div>
                <Label>Direct</Label>
                <a
                  href="mailto:info@ideoralabs.com"
                  style={{ display: 'block', marginTop: 'var(--s-3)', color: 'var(--ink)', overflowWrap: 'anywhere' }}
                >
                  info@ideoralabs.com
                </a>
                <span className="fine" style={{ display: 'block', marginTop: 'var(--s-1)' }}>Bengaluru</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
