import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useJsonLd } from '../hooks/useJsonLd';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Photo } from '../components/Photo';
import { Container } from '../components/ui';
import { PAGES } from '../data/pages';
import { waHref, WA_LINK } from '../lib/whatsapp';

// The healthcare industry page, built as the landing page for Careora, the
// healthcare product. The copy follows the client's reference deck section by
// section; the look follows the Careora mark: charcoal ink, one orange, warm
// paper, photography doing the emotional work.
//
// The evidence rule still holds. The deck's named doctor testimonials and its
// percentage claims are not ours to publish, so the proof uses only what the
// site already states from system records. Dashboard figures are product UI
// and are labelled illustrative.

const PAGE = PAGES.find((p) => p.path === '/industries/healthcare');
const PRODUCT = 'Careora';
const DEMO_HREF = waHref('Hi Ideora, I would like a demo of Careora for our clinic.');

// --- Icons ------------------------------------------------------------------
const ICONS = {
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  chart: <path d="M5 20v-6M10 20V9M15 20v-9M20 20V5" />,
  building: <><rect x="4" y="3" width="11" height="18" rx="1.5" /><path d="M15 9h4.5v12H15M8 7h3M8 11h3M8 15h3" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

function Icon({ name, className = 'cr-ico' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

// --- Copy -------------------------------------------------------------------

const PAINS = [
  { title: 'Missed appointments', body: 'Manual scheduling, cancellations and no-shows.' },
  { title: 'Overloaded front desk', body: 'Endless calls, messages and repetitive queries.' },
  { title: 'Poor patient retention', body: 'No structured follow-ups and re-engagement.' },
  { title: 'Disconnected systems', body: 'Patient records, billing and operations across different tools.' },
  { title: 'Limited visibility', body: 'No real-time insights on revenue and performance.' },
  { title: 'Multi-center complexity', body: 'Difficult to manage multiple locations, staff and resources.' },
];

const MODULES = [
  { icon: 'calendar', label: 'Appointments' },
  { icon: 'users', label: 'Patient CRM' },
  { icon: 'file', label: 'Billing' },
  { icon: 'bell', label: 'Follow-ups' },
  { icon: 'building', label: 'Staff & centers' },
  { icon: 'chart', label: 'Analytics' },
];

const PILLARS = [
  { verb: 'Automate', body: 'Bookings, reminders and routine replies run on their own.' },
  { verb: 'Analyze', body: 'Every visit, invoice and enquiry feeds one live picture.' },
  { verb: 'Optimize', body: 'Spot no-show risk and idle slots before they cost you.' },
  { verb: 'Engage', body: 'Follow-ups and care plans that bring patients back.' },
];

const FEATURES = [
  { mock: 'calendar', title: 'Smart appointment management', body: 'Online bookings, rescheduling, doctor availability, reminders and waiting lists.' },
  { mock: 'chat', title: 'AI receptionist & automation', body: 'WhatsApp and voice assistants for bookings, reminders and routine communication.' },
  { mock: 'crm', title: 'Patient CRM & journey', body: 'Complete patient profiles, visit history, care plans and engagement tracking.' },
  { mock: 'invoice', title: 'Billing & revenue management', body: 'Invoicing, payment tracking, packages and revenue reporting.' },
  { mock: 'centers', title: 'Staff & multi-center management', body: 'Provider schedules, center-wise performance and role-based access.' },
  { mock: 'bi', title: 'AI business intelligence', body: 'Real-time KPIs, patient trends, no-show risk and actionable insights.' },
];

const SOLUTIONS = [
  {
    key: 'clinics',
    title: 'For clinics',
    sub: 'Run your clinic. Grow your practice.',
    photo: 'hc-clinic',
    points: ['Appointment and patient management', 'Treatment plans and packages', 'Patient retention and follow-ups', 'Revenue and performance tracking'],
    cta: 'Explore for clinics',
  },
  {
    key: 'hospitals',
    title: 'For hospitals',
    sub: 'Connect departments. Simplify patient journeys.',
    photo: 'hc-hospital',
    points: ['Multi-department coordination', 'Centralized patient communication', 'Billing and operational workflows', 'Management reporting and analytics'],
    cta: 'Explore for hospitals',
  },
];

// Figures the site already states from system records. Nothing here is a
// projection or a client quote.
const PROOF = [
  { value: '40s', label: 'Median time from enquiry to a confirmed slot' },
  { value: '24/7', label: 'Enquiries answered on WhatsApp, nights and Sundays included' },
  { value: '0', label: 'Clinical questions answered by AI. Every one goes to your staff' },
];

// --- Mock-ups ---------------------------------------------------------------

function Avatar({ name }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return <span className="cr-av">{initials}</span>;
}

function Dashboard() {
  return (
    <div className="cr-dash" aria-hidden="true">
      <div className="cr-dash__top">
        <span className="cr-dash__dots"><i /><i /><i /></span>
        <span className="cr-dash__url">app.careora.in / dashboard</span>
      </div>
      <div className="cr-dash__body">
        <aside className="cr-dash__nav">
          <img className="cr-dash__logo" src="/img/careora-logo.png" alt="" width="640" height="158" />
          {['Dashboard', 'Appointments', 'Patients', 'Billing', 'Messages', 'Reports', 'Staff'].map((l, i) => (
            <span key={l} className={i === 0 ? 'is-on' : undefined}>{l}</span>
          ))}
        </aside>
        <div className="cr-dash__main">
          <div className="cr-dash__hello">
            <div><strong>Good morning, Dr. Sarah</strong><small>Here&rsquo;s what&rsquo;s happening at your clinic today.</small></div>
            <span className="cr-dash__chip">Today</span>
          </div>
          <div className="cr-kpis">
            <div><span>Appointments</span><strong>24</strong><em>+12% vs yesterday</em></div>
            <div><span>Total patients</span><strong>1,284</strong><em>+8% this month</em></div>
            <div><span>Revenue</span><strong>₹18.6L</strong><em>+15% this month</em></div>
            <div><span>No-show rate</span><strong>7.2%</strong><em>−2% vs last month</em></div>
          </div>
          <div className="cr-dash__row">
            <div className="cr-pane">
              <span className="cr-pane__t">Appointments overview</span>
              <svg className="cr-line" viewBox="0 0 300 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="crLineFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#F07A2A" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#F07A2A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 70 C30 40 50 35 75 50 S120 70 150 45 S200 20 225 48 S270 30 300 22 V90 H0Z" fill="url(#crLineFill)" />
                <path d="M0 70 C30 40 50 35 75 50 S120 70 150 45 S200 20 225 48 S270 30 300 22" fill="none" stroke="#F07A2A" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="cr-axis"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
            </div>
            <div className="cr-pane">
              <span className="cr-pane__t">Upcoming</span>
              {[['10:00', 'Rahul Mehta', 'Physiotherapy'], ['11:30', 'Priya Sharma', 'Consultation'], ['12:15', 'Arjun Patel', 'Follow-up']].map(([t, n, d]) => (
                <div key={t} className="cr-appt">
                  <span className="cr-appt__t">{t}</span>
                  <span className="cr-appt__n"><b>{n}</b><small>{d}</small></span>
                  <span className="cr-ok">Confirmed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureMock({ kind }) {
  if (kind === 'calendar') {
    const cells = ['a', '', 'b', '', 'a', '', 'b', 'a', '', '', 'a', 'b', '', 'a', '', 'b', '', 'a', '', ''];
    return (
      <div className="cr-mock">
        <div className="cr-cal">{cells.map((c, i) => <i key={i} className={c ? `c-${c}` : undefined} />)}</div>
        <div className="cr-pop">
          <b>New appointment</b>
          <small>Arjun Patel · Physiotherapy</small>
          <small>10:00 – 11:00 AM</small>
          <span className="cr-ok"><Icon name="check" className="cr-ico cr-ico--xs" />Confirmed</span>
        </div>
      </div>
    );
  }
  if (kind === 'chat') {
    return (
      <div className="cr-mock cr-mock--chat">
        <span className="cr-bubble cr-bubble--in">Hi, I&rsquo;d like to book a physiotherapy session.</span>
        <span className="cr-bubble cr-bubble--out">Sure. Tuesday 10:30 AM with Dr. Mehta is free. Shall I confirm it?</span>
        <span className="cr-bubble cr-bubble--in">Yes please</span>
      </div>
    );
  }
  if (kind === 'crm') {
    return (
      <div className="cr-mock">
        <div className="cr-sheet">
          <span className="cr-sheet__h"><Avatar name="Priya Sharma" /><span><b>Priya Sharma</b><small>PT-00345 · 6 visits</small></span></span>
          <span className="cr-tabs"><b>Overview</b><span>Visits</span><span>Notes</span><span>Files</span></span>
          <span className="cr-sheet__row"><small>Next follow-up</small><small>15 Aug · Therapy</small></span>
        </div>
      </div>
    );
  }
  if (kind === 'invoice') {
    return (
      <div className="cr-mock">
        <div className="cr-sheet">
          <span className="cr-sheet__row"><b>Invoice INV-00428</b><span className="cr-ok">Paid</span></span>
          <span className="cr-sheet__row"><small>Consultation</small><small>₹1,500</small></span>
          <span className="cr-sheet__row"><small>Therapy session</small><small>₹2,000</small></span>
          <span className="cr-sheet__row cr-sheet__row--total"><b>Total</b><b>₹3,500</b></span>
        </div>
      </div>
    );
  }
  if (kind === 'centers') {
    return (
      <div className="cr-mock">
        <div className="cr-sheet">
          {[['Main Clinic', '28 staff · 860 patients'], ['Wellness Center', '12 staff · 420 patients']].map(([n, m]) => (
            <span key={n} className="cr-center">
              <Avatar name={n} />
              <span><b>{n}</b><small>{m}</small></span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="cr-mock">
      <div className="cr-sheet">
        <span className="cr-sheet__row"><b>Clinic performance</b><small>6 months</small></span>
        <div className="cr-bars">{[30, 42, 38, 58, 64, 82].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      </div>
    </div>
  );
}

// --- Page -------------------------------------------------------------------

export function Healthcare() {
  const rootRef = useRef(null);

  useDocumentTitle(
    'Careora for clinics and hospitals | Ideora Labs',
    'Careora is the AI-powered healthcare operations platform from Ideora Labs: appointments, patient CRM, billing, follow-ups and analytics for clinics and hospitals.',
  );
  useJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PAGE.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    'faq',
  );
  useGsapTimeline({ rootRef });

  const demo = (location) => ({
    href: DEMO_HREF,
    ...WA_LINK,
    'data-track': 'demo_start',
    'data-track-product': PRODUCT,
    'data-track-cta_location': location,
  });

  return (
    <div ref={rootRef} className="cr">
      <Breadcrumbs trail={PAGE.trail} current={PAGE.title} />

      {/* Hero ------------------------------------------------------------- */}
      <section className="cr-hero">
        <Container className="cr-hero__grid">
          <div className="cr-hero__copy">
            <img className="cr-brand" src="/img/careora-logo.png" alt="Careora by Ideora Labs" width="640" height="158" data-anim="hero-1" />
            <h1 className="cr-hero__title" data-anim="head">
              <span>Smarter clinics.</span> <span>Better care.</span> <em>Stronger growth.</em>
            </h1>
            <p className="cr-hero__lede">
              From appointments to billing, patient engagement to business insights, Careora helps
              clinics and hospitals run smoothly and grow with confidence.
            </p>
            <div className="cr-actions">
              <a className="cr-btn cr-btn--primary" {...demo('careora_hero')}>Book a demo <Icon name="arrow" className="cr-ico cr-ico--sm" /></a>
              <a className="cr-btn cr-btn--ghost" href="#cr-product">See how it works</a>
            </div>
            <ul className="cr-assure">
              <li><Icon name="check" className="cr-ico cr-ico--sm" />Built for clinics &amp; hospitals</li>
              <li><Icon name="check" className="cr-ico cr-ico--sm" />AI receptionist on WhatsApp</li>
              <li><Icon name="check" className="cr-ico cr-ico--sm" />Clinicians stay in control</li>
            </ul>
          </div>
          <div className="cr-hero__visual" data-anim="console">
            <div className="cr-hero__photo">
              <Photo name="hc-reception" alt="A receptionist at a bright clinic front desk helping a patient check in" sizes="(min-width: 900px) 50vw, 100vw" priority position="100% 50%" />
            </div>
            <div className="cr-float cr-float--msg" aria-hidden="true">
              <span className="cr-float__k">WhatsApp · just now</span>
              <b>Booked: Tue, 10:30 AM</b>
              <small>Physiotherapy with Dr. Mehta</small>
            </div>
            <div className="cr-float cr-float--day" aria-hidden="true">
              <span className="cr-float__k">Today</span>
              <b>24 appointments</b>
              <span className="cr-float__bar"><i style={{ width: '78%' }} /></span>
              <small>19 confirmed by message</small>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof bar ------------------------------------------------------- */}
      <section className="cr-proof" aria-label="From system records">
        <Container className="cr-proof__grid">
          <p className="cr-proof__lead">Live since May 2026 at a multi-location clinic group.</p>
          {PROOF.map((p) => (
            <div key={p.value} className="cr-proof__item">
              <strong>{p.value}</strong>
              <span>{p.label}</span>
            </div>
          ))}
        </Container>
      </section>

      {/* The challenge ------------------------------------------------------ */}
      <section className="cr-sec cr-sec--sand">
        <Container className="cr-challenge">
          <div className="cr-challenge__aside">
            <span className="cr-eyebrow">The challenge</span>
            <h2 className="cr-h2" data-anim="head">Your clinic is growing. Are your operations keeping up?</h2>
            <p className="cr-sub">Healthcare providers face increasing operational complexity, leading to missed opportunities, higher costs and reduced patient satisfaction.</p>
            <div className="cr-challenge__photo">
              <Photo name="hc-challenge" alt="A doctor at her desk overwhelmed by calls and paperwork" sizes="(min-width: 900px) 40vw, 100vw" position="72% 40%" />
            </div>
          </div>
          <ol className="cr-pains">
            {PAINS.map((p, i) => (
              <li key={p.title} className="cr-pain" data-anim="card">
                <span className="cr-pain__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* The solution ------------------------------------------------------- */}
      <section id="cr-product" className="cr-sec">
        <Container>
          <div className="cr-center-head">
            <span className="cr-eyebrow">The solution</span>
            <h2 className="cr-h2" data-anim="head">Meet Careora, your healthcare growth engine.</h2>
            <p className="cr-sub">One unified platform to manage your entire clinic or hospital operations with the power of AI and intelligent automation.</p>
            <ul className="cr-modules">
              {MODULES.map((m) => (
                <li key={m.label}><Icon name={m.icon} className="cr-ico cr-ico--sm" />{m.label}</li>
              ))}
            </ul>
          </div>
          <div className="cr-showcase" data-anim="card">
            <Dashboard />
            <p className="cr-note">Illustrative data</p>
          </div>
          <div className="cr-pillars">
            <p className="cr-pillars__lead"><b>The AI intelligence layer</b> runs underneath every module.</p>
            {PILLARS.map((p) => (
              <div key={p.verb} className="cr-pillar" data-anim="card">
                <h3>{p.verb}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features ------------------------------------------------------------ */}
      <section className="cr-sec cr-sec--sand">
        <Container>
          <div className="cr-head-row">
            <div>
              <span className="cr-eyebrow">Powerful features</span>
              <h2 className="cr-h2" data-anim="head">Everything you need. All in one platform.</h2>
            </div>
            <p className="cr-sub">Designed for modern healthcare businesses, with features that simplify operations and drive growth.</p>
          </div>
          <div className="cr-features">
            {FEATURES.map((f) => (
              <article key={f.title} className="cr-feature" data-anim="card">
                <div className="cr-feature__frame" aria-hidden="true"><FeatureMock kind={f.mock} /></div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
          <Link to="/products/ideora-health" className="cr-link">View all features <Icon name="arrow" className="cr-ico cr-ico--sm" /></Link>
        </Container>
      </section>

      {/* Clinics and hospitals ---------------------------------------------- */}
      <section className="cr-sec">
        <Container>
          <div className="cr-head-row">
            <div>
              <span className="cr-eyebrow">Built for your world</span>
              <h2 className="cr-h2" data-anim="head">Solutions for clinics &amp; hospitals.</h2>
            </div>
            <p className="cr-sub">Whether you run a single clinic or a multi-specialty hospital, Careora adapts to your needs.</p>
          </div>
          <div className="cr-solutions">
            {SOLUTIONS.map((s) => (
              <article key={s.key} className="cr-sol" data-anim="card">
                <div className="cr-sol__photo"><Photo name={s.photo} alt="" sizes="(min-width: 900px) 45vw, 100vw" /></div>
                <div className="cr-sol__body">
                  <h3>{s.title}</h3>
                  <p className="cr-sol__sub">{s.sub}</p>
                  <ul className="cr-ticks">
                    {s.points.map((pt) => <li key={pt}><Icon name="check" className="cr-ico cr-ico--sm" />{pt}</li>)}
                  </ul>
                  <a className="cr-link" {...demo(`careora_${s.key}`)}>{s.cta} <Icon name="arrow" className="cr-ico cr-ico--sm" /></a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Real results -------------------------------------------------------- */}
      <section className="cr-sec cr-sec--tight">
        <Container>
          <div className="cr-case" data-anim="card">
            <div className="cr-case__copy">
              <span className="cr-eyebrow">Trusted by healthcare providers</span>
              <blockquote>
                Intake is finished by message before the patient arrives, so the front desk works a short list of
                exceptions instead of paperwork in front of a queue.
              </blockquote>
              <p className="cr-case__who">Multi-location clinic group &middot; live since May 2026 &middot; client under NDA</p>
              <Link to="/case-studies/clinic-intake-and-coverage" className="cr-link">Read the case study <Icon name="arrow" className="cr-ico cr-ico--sm" /></Link>
            </div>
            <dl className="cr-case__facts">
              <div><dt>Enquiry to confirmed slot</dt><dd>40s</dd></div>
              <div><dt>Answering hours</dt><dd>24/7</dd></div>
              <div><dt>Clinical replies automated</dt><dd>0</dd></div>
            </dl>
          </div>
        </Container>
      </section>

      {/* Safety and FAQ ------------------------------------------------------ */}
      <section className="cr-sec cr-sec--sand">
        <Container className="cr-safe">
          <div>
            <span className="cr-eyebrow">Safe by design</span>
            <h2 className="cr-h2" data-anim="head">Your clinicians stay in charge.</h2>
            <div className="cr-controls">
              {PAGE.controls.map((c) => (
                <div key={c.title} className="cr-control" data-anim="card">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="cr-eyebrow">FAQ</span>
            <h2 className="cr-h2" data-anim="head">Questions clinics ask.</h2>
            <div className="cr-faq">
              {PAGE.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<Icon name="plus" className="cr-ico cr-ico--sm" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <p className="cr-fine">{PAGE.integrationsNote}</p>
          </div>
        </Container>
      </section>

      {/* Closing ---------------------------------------------------------------- */}
      <section className="cr-sec">
        <Container>
          <div className="cr-close">
            <div className="cr-close__copy">
              <h2>Let&rsquo;s build a smarter, healthier tomorrow.</h2>
              <p>Discover how Careora can transform your clinic or hospital operations. Book a personalised demo today.</p>
              <div className="cr-actions">
                <a className="cr-btn cr-btn--primary" {...demo('careora_close')}>Schedule your demo <Icon name="arrow" className="cr-ico cr-ico--sm" /></a>
              </div>
              <small>Opens a WhatsApp chat with our team.</small>
            </div>
            <div className="cr-close__photo">
              <Photo name="hc-doctor" alt="" sizes="(min-width: 900px) 40vw, 100vw" position="80% 30%" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
