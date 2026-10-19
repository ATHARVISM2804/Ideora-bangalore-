import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { Photo } from '../components/Photo';
import { Container } from '../components/ui';
import { waHref, WA_LINK } from '../lib/whatsapp';

// The healthcare industry page: the Careora landing page, built to match the
// client marketing team's 4K design section for section — hero dashboard, the
// challenge, the solution, features, clinics and hospitals, testimonials,
// closing band.
//
// The testimonials and the closing percentages are the marketing deck's copy.
// They must be confirmed as real, consented client results before this page
// is deployed.

const PRODUCT = 'Careora';
// The live Careora demo: the WhatsApp assistant plus the clinic dashboard (separate Vercel project).
const DEMO_URL = 'https://whatsapp-automation-atharv-golaits-projects.vercel.app';
const DEMO_HREF = waHref('Hi Ideora, I would like a demo of Careora for our clinic.');

// --- Icons ------------------------------------------------------------------
const ICONS = {
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  chart: <path d="M5 20v-6M10 20V9M15 20v-9M20 20V5" />,
  building: <><rect x="4" y="3" width="11" height="18" rx="1.5" /><path d="M15 9h4.5v12H15M8 7h3M8 11h3M8 15h3" /></>,
  hospital: <><rect x="3.5" y="6" width="17" height="15" rx="1.5" /><path d="M9 21v-4h6v4M12 9v5M9.5 11.5h5M8 3h8v3H8z" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4z" /><path d="M7 10h3M14 14h3M14 9h2" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  play: <path d="M8 5l11 7-11 7z" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  message: <path d="M4 5h16v11H9l-5 4z" />,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  whatsapp: <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a5 5 0 0 1-2.4-2.4l1-1-1-2z" />,
};

function Icon({ name, className = 'cr-ico' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

// The client's Careora logo: charcoal text for light grounds, white text for
// the navy panels. The mark alone stands in for the AI assistant's avatar.
function Logo({ light = false, className = 'cr-logo' }) {
  return (
    <img
      className={className}
      src={light ? '/img/careora-logo-light.png' : '/img/careora-logo.png'}
      alt="Careora by Ideora Labs"
      width="640"
      height="157"
    />
  );
}

// --- Copy -------------------------------------------------------------------

const PAINS = [
  { icon: 'calendar', tone: 'rose', title: 'Missed Appointments', body: 'Manual scheduling, cancellations and no-shows.' },
  { icon: 'phone', tone: 'orange', title: 'Overloaded Front Desk', body: 'Endless calls, messages and repetitive queries.' },
  { icon: 'users', tone: 'amber', title: 'Poor Patient Retention', body: 'No structured follow-ups and re-engagement.' },
  { icon: 'link', tone: 'blue', title: 'Disconnected Systems', body: 'Patient records, billing and operations across different tools.' },
  { icon: 'chart', tone: 'violet', title: 'Limited Visibility', body: 'No real-time insights on revenue and performance.' },
  { icon: 'building', tone: 'green', title: 'Multi-Center Complexity', body: 'Difficult to manage multiple locations, staff and resources.' },
];

const MODULES = [
  { icon: 'calendar', tone: 'blue', label: 'Appointments' },
  { icon: 'users', tone: 'rose', label: 'Patient CRM' },
  { icon: 'file', tone: 'green', label: 'Billing' },
  { icon: 'bell', tone: 'amber', label: 'Follow-ups' },
  { icon: 'users', tone: 'violet', label: 'Staff & Centers' },
  { icon: 'chart', tone: 'blue', label: 'Analytics' },
];

const FEATURES = [
  { mock: 'calendar', title: 'Smart Appointment Management', body: 'Online bookings, rescheduling, doctor availability, reminders and waiting lists.' },
  { mock: 'crm', title: 'Patient CRM & Journey', body: 'Complete patient profiles, visit history, care plans and engagement tracking.' },
  { mock: 'chat', title: 'AI Receptionist & Automation', body: 'WhatsApp and voice assistants for bookings, reminders and routine communication.' },
  { mock: 'invoice', title: 'Billing & Revenue Management', body: 'Invoicing, payment tracking, packages and revenue reporting.' },
  { mock: 'centers', title: 'Staff & Multi-Center Management', body: 'Provider schedules, center-wise performance and role-based access.' },
  { mock: 'bi', title: 'AI Business Intelligence', body: 'Real-time KPIs, patient trends, no-show risk and actionable insights.' },
];

const SOLUTIONS = [
  {
    key: 'clinics',
    icon: 'building',
    tone: 'green',
    title: 'For Clinics',
    sub: 'Run your clinic. Grow your practice.',
    photo: 'hc-clinic',
    points: ['Appointment and patient management', 'Treatment plans and packages', 'Patient retention and follow-ups', 'Revenue and performance tracking'],
    cta: 'Explore for Clinics',
  },
  {
    key: 'hospitals',
    icon: 'hospital',
    tone: 'blue',
    title: 'For Hospitals',
    sub: 'Connect departments. Simplify patient journeys.',
    photo: 'hc-hospital',
    points: ['Multi-department coordination', 'Centralized patient communication', 'Billing and operational workflows', 'Management reporting and analytics'],
    cta: 'Explore for Hospitals',
  },
];

// From the marketing deck. Confirm each is a real, consented client quote
// before deploying.
const TESTIMONIALS = [
  { name: 'Dr. Aisha Patel', where: 'Physiotherapy Clinic, Mumbai', quote: `${PRODUCT} has transformed how we manage our clinic. Our no-shows reduced by 60% and patient satisfaction has significantly improved.` },
  { name: 'Dr. Rohan Mehta', where: 'Dental Clinic, Bangalore', quote: 'The AI receptionist handles most of our booking queries now. Our front desk team can focus on providing better patient care.' },
  { name: 'Dr. Vivek Sharma', where: 'Multi-Specialty Hospital, Delhi', quote: 'Finally, a platform that gives us complete visibility across departments and locations. It’s a game-changer for our operations.' },
];

// From the marketing deck. Confirm against client data before deploying.
const OUTCOMES = [
  { icon: 'chart', tone: 'green', value: '+40%', label: 'Patient Retention' },
  { icon: 'calendar', tone: 'violet', value: '-60%', label: 'No-Show Rate' },
  { icon: 'trend', tone: 'orange', value: '+35%', label: 'Revenue Growth' },
];

// --- Mock-ups ---------------------------------------------------------------

function Avatar({ name, tone = 'violet' }) {
  const initials = name.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).join('').slice(0, 2);
  return <span className={`cr-av cr-av--${tone}`}>{initials}</span>;
}

function Donut({ parts, children }) {
  const stops = parts.map(([v, c], i) => {
    const from = parts.slice(0, i).reduce((sum, [p]) => sum + p, 0);
    return `${c} ${from}% ${from + v}%`;
  });
  return (
    <div className="cr-donut" style={{ background: `conic-gradient(${stops.join(',')})` }}>
      <span>{children}</span>
    </div>
  );
}

function Console() {
  const nav = [['grid', 'Dashboard'], ['calendar', 'Appointments'], ['users', 'Patients'], ['file', 'Billing'], ['message', 'Messages'], ['chart', 'Reports'], ['users', 'Staff'], ['gear', 'Settings']];
  return (
    <div className="cr-console" aria-hidden="true">
      <aside className="cr-console__nav">
        <Logo light className="cr-logo cr-logo--nav" />
        {nav.map(([icon, label], i) => (
          <span key={label} className={i === 0 ? 'is-on' : undefined}><Icon name={icon} className="cr-ico cr-ico--xs" />{label}</span>
        ))}
      </aside>
      <div className="cr-console__main">
        <div className="cr-console__bar">
          <span className="cr-search"><Icon name="search" className="cr-ico cr-ico--xs" />Search patients…</span>
          <span className="cr-user"><Avatar name="Sarah Khan" tone="orange" /><span><b>Dr. Sarah Khan</b><small>Administrator</small></span></span>
        </div>
        <div className="cr-console__hello">
          <strong>Good Morning, Dr. Sarah! 👋</strong>
          <small>Here&rsquo;s what&rsquo;s happening at your clinic today.</small>
        </div>
        <div className="cr-kpis">
          <div><span>Today&rsquo;s Appointments</span><strong>24</strong><em>▲ 12% from yesterday</em></div>
          <div><span>Total Patients</span><strong>1,284</strong><em>▲ 8% this month</em></div>
          <div><span>Revenue</span><strong>₹18.6L</strong><em>▲ 15% this month</em></div>
          <div><span>No-Show Rate</span><strong>7.2%</strong><em className="is-down">▼ 2% from last month</em></div>
        </div>
        <div className="cr-console__row">
          <div className="cr-pane cr-pane--chart">
            <span className="cr-pane__t">Appointments Overview <small>This Month ▾</small></span>
            <svg className="cr-line" viewBox="0 0 300 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="crLineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#6366F1" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 70 C30 40 50 35 75 50 S120 70 150 45 S200 20 225 48 S270 30 300 22 V90 H0Z" fill="url(#crLineFill)" />
              <path d="M0 70 C30 40 50 35 75 50 S120 70 150 45 S200 20 225 48 S270 30 300 22" fill="none" stroke="#6366F1" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="cr-tip">486<small>Appointments</small></span>
            <div className="cr-axis"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
          </div>
          <div className="cr-pane">
            <span className="cr-pane__t">Patient Satisfaction</span>
            <div className="cr-pane__donut">
              <Donut parts={[[62, '#14B8A6'], [26, '#6366F1'], [12, '#E5E7F5']]}>4.8/5</Donut>
              <span className="cr-mini-stat"><b>4.8</b><small>Based on 320 reviews</small></span>
            </div>
          </div>
        </div>
        <div className="cr-console__row">
          <div className="cr-pane">
            <span className="cr-pane__t">Upcoming Appointments</span>
            {[['10:00 AM', 'Rahul Mehta', 'Physiotherapy'], ['11:30 AM', 'Priya Sharma', 'Consultation']].map(([t, n, d]) => (
              <div key={t} className="cr-appt">
                <span className="cr-appt__t">{t}</span>
                <Avatar name={n} tone="blue" />
                <span className="cr-appt__n"><b>{n}</b><small>{d}</small></span>
                <span className="cr-pill-ok">Confirmed</span>
              </div>
            ))}
          </div>
          <div className="cr-pane">
            <span className="cr-pane__t">Revenue Breakdown</span>
            <div className="cr-pane__donut">
              <Donut parts={[[45, '#6366F1'], [30, '#14B8A6'], [15, '#F59E0B'], [10, '#A78BFA']]} />
              <ul className="cr-legend">
                <li><i className="cr-dot cr-dot--indigo" />Consultations <b>45%</b></li>
                <li><i className="cr-dot cr-dot--teal" />Therapy Sessions <b>30%</b></li>
                <li><i className="cr-dot cr-dot--amber" />Packages <b>15%</b></li>
                <li><i className="cr-dot cr-dot--lilac" />Other <b>10%</b></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureMock({ kind }) {
  if (kind === 'calendar') {
    const cells = ['p', 'b', 'p', 'o', 'g', '', 'b', '', 'b', 'b', 'p', 'b', '', '', '', '', '', 'g', '', ''];
    return (
      <div className="cr-mock cr-mock--cal">
        <div className="cr-cal__rail">{[0, 1, 2, 3, 4, 5, 6].map((i) => <i key={i} />)}</div>
        <div className="cr-cal__body">
          <div className="cr-cal__bar"><span /><span className="cr-cal__btn">+ New</span></div>
          <div className="cr-cal">{cells.map((c, i) => <i key={i} className={c ? `c-${c}` : undefined} />)}</div>
        </div>
        <div className="cr-pop">
          <span className="cr-pop__h"><Avatar name="Arjun Patel" tone="orange" /><span><b>New Appointment</b><small>Arjun Patel</small></span></span>
          <small>Physiotherapy</small>
          <small>10:00 AM – 11:00 AM</small>
          <span className="cr-ok-text"><Icon name="check" className="cr-ico cr-ico--xs" />Confirmed</span>
        </div>
      </div>
    );
  }
  if (kind === 'crm') {
    return (
      <div className="cr-mock cr-mock--stack">
        <div className="cr-sheet">
          <span className="cr-sheet__h"><Avatar name="Priya Sharma" tone="rose" /><span><b>Priya Sharma</b><small>ID: PT-00345</small></span></span>
          <span className="cr-tabs"><b>Overview</b><span>Visits</span><span>Notes</span><span>Files</span></span>
        </div>
        <div className="cr-sheet">
          <b>Upcoming Follow-up</b>
          <small>15 Aug · Therapy Session</small>
          <span className="cr-btn-mini">Send Reminder</span>
        </div>
      </div>
    );
  }
  if (kind === 'chat') {
    return (
      <div className="cr-mock cr-mock--chat">
        <div className="cr-chat__h">
          <img className="cr-chat__bot" src="/img/careora-mark.png" alt="" width="160" height="165" />
          <span><b>{PRODUCT} AI</b><small>Online</small></span>
          <span className="cr-chat__wa"><Icon name="whatsapp" className="cr-ico cr-ico--sm" /></span>
        </div>
        <span className="cr-bubble cr-bubble--in">Hi! I&rsquo;d like to book an appointment for physiotherapy.</span>
        <span className="cr-bubble cr-bubble--out">Sure! I can help you with that. What date and time works for you?</span>
      </div>
    );
  }
  if (kind === 'invoice') {
    return (
      <div className="cr-mock cr-mock--stack">
        <div className="cr-sheet">
          <span className="cr-sheet__row"><b>Invoice #INV-00428</b><span className="cr-pill-paid">Paid</span></span>
          <span className="cr-sheet__row"><small>Consultation</small><small>₹1,500</small></span>
          <span className="cr-sheet__row"><small>Therapy Session</small><small>₹2,000</small></span>
          <span className="cr-sheet__row cr-sheet__row--total"><b>Total</b><b>₹3,500</b></span>
          <span className="cr-btn-mini cr-btn-mini--wide">Send Invoice</span>
        </div>
      </div>
    );
  }
  if (kind === 'centers') {
    return (
      <div className="cr-mock cr-mock--stack">
        <div className="cr-sheet">
          <b>Our Centers</b>
          {[['Main Clinic', '28 Staff | 860 Patients', 'teal'], ['Wellness Center', '12 Staff | 420 Patients', 'amber']].map(([n, m, t]) => (
            <span key={n} className="cr-center">
              <Avatar name={n} tone={t} />
              <span><b>{n}</b><small>{m}</small></span>
              <span className="cr-btn-ghost">View</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="cr-mock cr-mock--stack">
      <div className="cr-sheet">
        <span className="cr-sheet__row"><b>Clinic Performance</b><small className="cr-select">Last 6 Months ▾</small></span>
        <div className="cr-bi">
          <span><b>1,284</b><small>Appointments</small></span>
          <span><b>842</b><small>Active Patients</small></span>
          <span><b>₹18.6L</b><small>Revenue</small></span>
        </div>
        <div className="cr-bars">{[22, 34, 46, 62, 58, 80].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        <div className="cr-axis"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
      </div>
    </div>
  );
}

// --- Page -------------------------------------------------------------------

export function Healthcare() {
  const rootRef = useRef(null);

  useDocumentTitle(
    `${PRODUCT}: Smarter Clinics. Better Care. Stronger Growth. | Ideora Labs`,
    `${PRODUCT} is the AI-powered healthcare operations platform from Ideora Labs: appointments, patient CRM, billing, follow-ups and analytics for clinics and hospitals.`,
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
      {/* Hero ------------------------------------------------------------- */}
      <section className="cr-hero">
        <span className="cr-blob cr-blob--a" aria-hidden="true" />
        <span className="cr-blob cr-blob--b" aria-hidden="true" />
        <Container wide className="cr-hero__grid">
          <div className="cr-hero__copy">
            <Logo className="cr-logo cr-logo--hero" />
            <span className="cr-eyebrow cr-eyebrow--blue" data-anim="hero-1">AI-Powered Healthcare Operations Platform</span>
            <h1 className="cr-hero__title">
              Smarter Clinics.<br />Better Care.<br /><span className="cr-grad">Stronger Growth.</span>
            </h1>
            <p className="cr-hero__lede">
              From appointments to billing, patient engagement to business insights &mdash; {PRODUCT} helps
              clinics and hospitals run smoothly and grow with confidence.
            </p>
            <div className="cr-actions">
              <a className="cr-btn cr-btn--orange" {...demo('careora_hero')}>Book a Demo <Icon name="arrow" className="cr-ico cr-ico--sm" /></a>
              <a className="cr-btn cr-btn--white" href={DEMO_URL} target="_blank" rel="noopener noreferrer" data-track="careora_demo_open">Explore Product <span className="cr-play"><Icon name="play" className="cr-ico cr-ico--xs" /></span></a>
            </div>
            <ul className="cr-trust">
              <li><span className="cr-tile cr-tile--violet cr-tile--sm"><Icon name="hospital" className="cr-ico cr-ico--sm" /></span>Trusted by growing <br />clinics &amp; hospitals</li>
              <li><span className="cr-tile cr-tile--violet cr-tile--sm"><Icon name="brain" className="cr-ico cr-ico--sm" /></span>AI-powered <br />automation</li>
              <li><span className="cr-tile cr-tile--violet cr-tile--sm"><Icon name="shield" className="cr-ico cr-ico--sm" /></span>Secure &amp; <br />compliant</li>
            </ul>
          </div>
          <div className="cr-hero__visual" data-anim="console">
            <Console />
          </div>
        </Container>
      </section>

      {/* The challenge ------------------------------------------------------ */}
      <section className="cr-challenge">
        <Container wide>
          <div className="cr-challenge__top">
            <div className="cr-challenge__head">
              <span className="cr-eyebrow cr-eyebrow--orange">The Challenge</span>
              <h2 className="cr-h2">Your clinic is growing.<br />But are your operations keeping up?</h2>
              <p className="cr-sub">Healthcare providers face increasing operational complexity, leading to missed opportunities, higher costs, and reduced patient satisfaction.</p>
            </div>
            <div className="cr-challenge__photo">
              <Photo name="hc-challenge" alt="A doctor at her desk overwhelmed by calls and paperwork" sizes="(min-width: 900px) 45vw, 100vw" position="72% 30%" />
              <span className="cr-float cr-float--1" aria-hidden="true">Too many calls</span>
              <span className="cr-float cr-float--2" aria-hidden="true">Missed follow-ups</span>
              <span className="cr-float cr-float--3" aria-hidden="true">No clear reports</span>
              <span className="cr-float cr-float--4" aria-hidden="true">Scattered data</span>
            </div>
          </div>
          <ul className="cr-pains">
            {PAINS.map((p) => (
              <li key={p.title} className="cr-card cr-pain" data-anim="card">
                <span className={`cr-tile cr-tile--${p.tone} cr-tile--round`}><Icon name={p.icon} /></span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The solution ------------------------------------------------------- */}
      <section className="cr-sec cr-sec--tight">
        <Container wide>
          <div className="cr-solution">
            <div>
              <span className="cr-eyebrow cr-eyebrow--blue">The Solution</span>
              <h2 className="cr-h2">Meet {PRODUCT} &ndash;<br />Your Healthcare Growth Engine.</h2>
              <p className="cr-sub">One unified platform to manage your entire clinic or hospital operations with the power of AI and intelligent automation.</p>
              <ul className="cr-modules">
                {MODULES.map((m) => (
                  <li key={m.label} className="cr-card" data-anim="card">
                    <span className={`cr-tile cr-tile--${m.tone} cr-tile--round`}><Icon name={m.icon} /></span>
                    {m.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cr-orbit" aria-hidden="true">
              <div className="cr-orbit__ring" />
              <div className="cr-orbit__core">
                <Logo light className="cr-logo cr-logo--core" />
                <small>AI Intelligence Layer</small>
              </div>
              <span className="cr-orbit__node cr-orbit__node--n"><i className="cr-tile cr-tile--blue cr-tile--round cr-tile--lg"><Icon name="gear" /></i>Automate</span>
              <span className="cr-orbit__node cr-orbit__node--e"><i className="cr-tile cr-tile--blue cr-tile--round cr-tile--lg"><Icon name="chart" /></i>Analyze</span>
              <span className="cr-orbit__node cr-orbit__node--s"><i className="cr-tile cr-tile--orange cr-tile--round cr-tile--lg"><Icon name="bolt" /></i>Optimize</span>
              <span className="cr-orbit__node cr-orbit__node--w"><i className="cr-tile cr-tile--green cr-tile--round cr-tile--lg"><Icon name="target" /></i>Engage</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Features ------------------------------------------------------------ */}
      <section id="cr-features" className="cr-sec">
        <Container wide>
          <div className="cr-head-row">
            <div>
              <span className="cr-eyebrow cr-eyebrow--violet">Powerful Features</span>
              <h2 className="cr-h2">Everything You Need. All in One Platform.</h2>
              <p className="cr-sub">Designed for modern healthcare businesses with powerful features that simplify operations and drive growth.</p>
            </div>
            <Link to="/products/ideora-health" className="cr-link">View All Features <Icon name="arrow" className="cr-ico cr-ico--sm" /></Link>
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
        </Container>
      </section>

      {/* Clinics and hospitals ---------------------------------------------- */}
      <section className="cr-sec cr-sec--peach">
        <Container wide>
          <span className="cr-eyebrow cr-eyebrow--violet">Built for Your World</span>
          <h2 className="cr-h2">Solutions for Clinics &amp; Hospitals</h2>
          <p className="cr-sub">Whether you run a single clinic or a multi-specialty hospital, {PRODUCT} adapts to your needs.</p>
          <div className="cr-solutions">
            {SOLUTIONS.map((s) => (
              <article key={s.key} className={`cr-sol cr-sol--${s.key}`} data-anim="card">
                <div className="cr-sol__photo" aria-hidden="true"><Photo name={s.photo} alt="" sizes="(min-width: 900px) 25vw, 100vw" /></div>
                <div className="cr-sol__body">
                  <div className="cr-sol__head">
                    <span className={`cr-tile cr-tile--${s.tone} cr-tile--lg`}><Icon name={s.icon} /></span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.sub}</p>
                    </div>
                  </div>
                  <ul className={`cr-ticks cr-ticks--${s.tone}`}>
                    {s.points.map((pt) => <li key={pt}><Icon name="check" className="cr-ico cr-ico--sm" />{pt}</li>)}
                  </ul>
                  <a className="cr-btn cr-btn--orange" {...demo(`careora_${s.key}`)}>{s.cta} <Icon name="arrow" className="cr-ico cr-ico--sm" /></a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials -------------------------------------------------------- */}
      <section className="cr-sec">
        <Container wide>
          <div className="cr-head-row">
            <div>
              <span className="cr-eyebrow cr-eyebrow--blue">Real Results</span>
              <h2 className="cr-h2">Trusted by Healthcare Providers</h2>
              <p className="cr-sub">Join growing clinics and hospitals that are improving care and driving business growth with {PRODUCT}.</p>
            </div>
            <div className="cr-arrows" aria-hidden="true">
              <span><Icon name="arrowLeft" className="cr-ico cr-ico--sm" /></span>
              <span><Icon name="arrow" className="cr-ico cr-ico--sm" /></span>
            </div>
          </div>
          <div className="cr-results">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="cr-card cr-quote" data-anim="card">
                <figcaption className="cr-quote__head">
                  <Avatar name={t.name} tone="blue" />
                  <span><b>{t.name}</b><small>{t.where}</small><span className="cr-stars" aria-label="5 out of 5">★★★★★</span></span>
                </figcaption>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing ---------------------------------------------------------------- */}
      <section className="cr-close">
        <div className="cr-close__photo" aria-hidden="true">
          <Photo name="hc-close" alt="" sizes="(min-width: 900px) 60vw, 100vw" position="85% 30%" />
        </div>
        <Container wide className="cr-close__grid">
          <div className="cr-close__copy">
            <h2>Let&rsquo;s Build a Smarter,<br />Healthier Tomorrow.</h2>
            <p>Discover how {PRODUCT} can transform your clinic or hospital operations. Book a personalized demo today.</p>
            <a className="cr-btn cr-btn--orange" {...demo('careora_close')}>Schedule Your Demo <Icon name="arrow" className="cr-ico cr-ico--sm" /></a>
          </div>
          <div className="cr-close__chips" aria-hidden="true">
            {OUTCOMES.map((o) => (
              <span key={o.label}><i className={`cr-tile cr-tile--${o.tone} cr-tile--lg`}><Icon name={o.icon} /></i><b>{o.value}</b><small>{o.label}</small></span>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
