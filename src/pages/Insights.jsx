import { s } from '../lib/style';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHero } from './blocks';

const MONO = "font-family:'JetBrains Mono', monospace";
const WRAP = 'max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px';

const ARTICLES = [
  { category: 'Operations', title: 'The estimate that sits unapproved', standfirst: 'Why the biggest delay in a service bay is rarely a parts shortage, and almost always a follow-up nobody owns.', date: 'Jan 2026' },
  { category: 'Integrations', title: 'No rip and replace, and what that actually means', standfirst: 'Connecting agents to a CRM or DMS you already run, without asking anyone to migrate a system that already works.', date: 'Feb 2026' },
  { category: 'Automotive', title: 'What a service centre queue looks like from one console', standfirst: 'Reading booking, estimate and parts status as one record, so nobody reconciles separate tools by hand at the end of the day.', date: 'Mar 2026' },
  { category: 'Real estate', title: 'Qualifying an enquiry before a person sees it', standfirst: 'Scoring budget, area and readiness on arrival, so what reaches an agent already carries the qualification behind it.', date: 'Apr 2026' },
  { category: 'Healthcare', title: 'Coverage checked before the appointment, not at the desk', standfirst: 'Verifying eligibility days ahead of a visit changes what the front desk does on the morning it happens.', date: 'May 2026' },
  { category: 'Method', title: 'Why we fix the scope before we design the system', standfirst: 'Agreeing what an agent may action, and what it must route to a person, before anything is built.', date: 'Jun 2026' },
];

export function Insights() {
  useDocumentTitle('Insights — Ideora Labs', 'Notes on operational automation, integrations and the agentic systems we build.');

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        heading="Notes on operational automation"
        lede="Short pieces on the handoffs we automate, the systems we connect to, and the method behind a fixed-scope build."
      />
      <section style={s('padding:0 0 clamp(64px, 10vw, 160px)')}>
        <div className="om-g12" style={s(WRAP)}>
          {ARTICLES.map((a) => (
            <div
              key={a.title}
              style={s('grid-column:span 4; border-radius:16px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.8); backdrop-filter:blur(20px) saturate(140%); -webkit-backdrop-filter:blur(20px) saturate(140%); padding:28px; display:flex; flex-direction:column; gap:14px')}
            >
              <div style={s(`${MONO}; font-size:12px; color:#B8400A`)}>{a.category}</div>
              <h2 style={s('margin:0; font-family:var(--display); font-weight:600; font-size:20px; line-height:1.15; letter-spacing:-0.009em')}>{a.title}</h2>
              <p style={s('margin:0; flex:1; font-size:15px; color:#5A616D; line-height:1.5')}>{a.standfirst}</p>
              <div style={s(`${MONO}; font-size:12px; color:#5A616D`)}>{a.date}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
