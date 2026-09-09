import { s } from '../lib/style';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHero, ProofStrip, ProseSections } from './blocks';
import { Hover } from '../components/Hover';
import { FACTS } from '../data/content';

const MONO = "font-family:'JetBrains Mono', monospace";
const WRAP = 'max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px';

const SECTIONS = [
  { title: 'Who we are', body: 'A team that builds agentic AI and operational automation for large operators. We work in automotive, real estate and healthcare today, wiring agents into the systems these operations already run rather than replacing them.' },
  { title: 'How we work', body: 'Every build starts with an operations audit and ends with us running the system, not handing it off. The scope and the price are fixed before a line is written, and the workflow is approved by your team before it is built.' },
  { title: 'What we will not do', body: 'We do not ask an operator to rip out a CRM, a DMS or an EMR to get an agent live. We build against the stack you already have, under your permissions, and we say plainly when a process is better handled by a person.' },
];

export function About() {
  useDocumentTitle('About — Ideora Labs', 'Who builds Ideora Labs and how the fixed-scope build and managed operation actually works.');

  return (
    <div>
      <PageHero
        eyebrow="About"
        heading="Agentic AI, built by people who answer for it"
        lede="We design and run the agents that take over the operational work large teams do by hand, then stay on to operate what we built."
      />
      <ProofStrip items={FACTS} />
      <ProseSections sections={SECTIONS} />

      <section id="contact" style={s('padding:0 0 clamp(64px, 10vw, 160px)')}>
        <div className="om-g12" style={s(WRAP)}>
          <div data-nav-dark style={s('grid-column:1 / span 12; border-radius:24px; background:#1A1D23; color:#F1F3F6; padding:64px 56px; display:flex; align-items:center; justify-content:space-between; gap:40px')}>
            <div>
              <h2 style={s('margin:0; font-family:var(--display); font-weight:500; font-size:clamp(25px, 4.4vw, 36px); line-height:1.05; letter-spacing:-0.014em')}>Talk to us about your operation</h2>
              <p style={s('margin:16px 0 0; max-width:52ch; color:#C6CCD6')}>Tell us the process that stalls most and we will walk it with you before anything is scoped.</p>
            </div>
            <div style={s('flex:none; display:flex; flex-direction:column; align-items:flex-end; gap:10px')}>
              <Hover as="a" href="mailto:work@ideoralabs.com" style={`${MONO}; font-size:16px; color:#F1F3F6; text-decoration:none; transition:color .25s`} hoverStyle="color:#F4601E">work@ideoralabs.com</Hover>
              <span style={s('color:#C6CCD6; font-size:14px')}>Pune · Dubai</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
