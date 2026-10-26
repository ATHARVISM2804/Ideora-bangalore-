import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { Container } from '../components/ui';
import { Photo } from '../components/Photo';
import { EstateScene } from '../components/EstateScene';
import { useMedia } from '../hooks/useMedia';
import { waHref, WA_LINK } from '../lib/whatsapp';

// The real-estate industry page: Ideora Property. Its own design system in
// realestate.css (scoped .re): warm ivory and stone, ink type, one bronze
// accent, serif headlines -- the register of a developer's sales gallery
// rather than a software dashboard.
//
// Sections: the live 3D township hero, the challenge, the six services, the
// animated end-to-end workflow, the stage-by-stage walkthrough, what buyers see
// on a 3D website, one enquiry's first minutes, before and after, who it is
// for, the rollout, integrations and controls, questions, closing.
//
// Photography is the Aurelle Residence renders (photos-src/re-*). Figures in
// the mock-ups are illustrative; the proof band and closing figures are the
// page's proof from data/pages.js.

const PRODUCT = 'Ideora Property';
const DEMO_HREF = waHref('Hi Ideora, I would like a demo of Ideora Property for our real-estate sales team.');

// --- Icons ------------------------------------------------------------------
const ICONS = {
  cube: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></>,
  magnet: <><path d="M5 4h4v8a3 3 0 0 0 6 0V4h4v8a7 7 0 0 1-14 0z" /><path d="M5 8h4M15 8h4" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" /></>,
  repeat: <><path d="M17 3l3 3-3 3" /><path d="M4 12V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3" /><path d="M20 12v3a3 3 0 0 1-3 3H4" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" /></>,
  kanban: <><rect x="3.5" y="4" width="17" height="16" rx="2.5" /><path d="M9.5 4v16M15 4v16M5.8 8h2M11.5 8h2M17 8h1.5M5.8 11h2M11.5 11h2" /></>,
  building: <><rect x="4" y="3" width="11" height="18" rx="1.5" /><path d="M15 9h4.5v12H15M8 7h3M8 11h3M8 15h3" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  user: <><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  play: <path d="M8 5l11 7-11 7z" />,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  pin: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  bellOff: <><path d="M6 16V11a6 6 0 0 1 9.5-4.9M18 11v5l1.5 2H8" /><path d="M10 20.5a2 2 0 0 0 4 0M4 4l16 16" /></>,
  userX: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 9l4 4M21 9l-4 4" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  view: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  whatsapp: <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a5 5 0 0 1-2.4-2.4l1-1-1-2z" />,
};

function Icon({ name, className = 're-ico' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function Wordmark({ light = false }) {
  return (
    <span className={`re-mark${light ? ' re-mark--light' : ''}`}>
      <span className="re-mark__glyph" aria-hidden="true"><Icon name="building" className="re-ico re-ico--sm" /></span>
      <span>Ideora <em>Property</em></span>
    </span>
  );
}

function Eyebrow({ children, light = false }) {
  return <span className={`re-eyebrow${light ? ' re-eyebrow--light' : ''}`}>{children}</span>;
}

function Avatar({ name }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return <span className="re-av">{initials}</span>;
}

// --- Copy -------------------------------------------------------------------

// The page's proof, from data/pages.js.
const PROOF = [
  { value: 'Apr 2026', label: 'Live in real estate since' },
  { value: '40s', label: 'Median task completion' },
  { value: '0', label: 'Human touches per booking' },
  { value: '24/7', label: 'Every enquiry answered' },
];

const PAINS = [
  { icon: 'clock', title: 'Slow first response', body: 'Buyers enquire with several projects at once. The first reply usually gets the visit.' },
  { icon: 'phone', title: 'Calls missed after hours', body: 'Most enquiries land in the evening and at weekends, when the desk is empty.' },
  { icon: 'bellOff', title: 'Follow-ups forgotten', body: 'Leads go cold in a spreadsheet after the second unanswered call.' },
  { icon: 'userX', title: 'Site-visit no-shows', body: 'Visits booked by phone, never confirmed, never reminded.' },
  { icon: 'view', title: 'Brochures that do not sell', body: 'PDFs and photos that never show the buyer the unit they want.' },
  { icon: 'layers', title: 'A scattered pipeline', body: 'Portals, ads, WhatsApp and sheets, with no single view of what is closing.' },
];

const SERVICES = [
  { icon: 'cube', title: '3D Websites & Virtual Tours', body: 'Your project as a live 3D environment buyers can walk, with unit availability built in.', replaces: 'Static brochures and PDF floor plans' },
  { icon: 'magnet', title: 'Lead Generation Agent', body: 'Runs and listens to ads, portals, your website and WhatsApp, and puts every lead in one queue.', replaces: 'Copy-pasting leads between portals and sheets' },
  { icon: 'mic', title: 'AI Voice Agent', body: 'Calls every new lead within a minute, day or night, and qualifies budget, location and timeline.', replaces: 'The next-morning call-back list' },
  { icon: 'repeat', title: 'Follow-up Agent', body: 'Brochures, floor plans and the 3D tour on WhatsApp, email and calls, timed to each buyer.', replaces: 'Reminders that depend on memory' },
  { icon: 'calendar', title: 'Site-Visit Booking', body: 'Books real slots on each agent’s calendar, confirms, reminds and reschedules in the chat.', replaces: 'Unconfirmed visits and no-shows' },
  { icon: 'kanban', title: 'AI Sales CRM', body: 'One pipeline from first click to booking amount, with scores, next actions and a weekly digest.', replaces: 'Month-end reports built by hand' },
];

const SYSTEM = [
  {
    key: 'attract',
    icon: 'cube',
    verb: 'Attract',
    title: '3D Websites & Virtual Tours',
    body: 'Your project as a live 3D environment: towers, floor plans, amenities and unit availability. Buyers explore it the way they would walk the site, and enquire from the exact unit they like.',
    does: ['Interactive 3D masterplan and walkthroughs', 'Live availability and pricing from your inventory', 'Every enquiry tagged with unit, source and campaign'],
    handoff: 'Nothing to hand off. It sells around the clock.',
  },
  {
    key: 'capture',
    icon: 'magnet',
    verb: 'Capture',
    title: 'Lead Generation Agent',
    body: 'Runs and listens to every channel: Meta and Google lead ads, property portals, your website and WhatsApp. Every enquiry lands in one queue within seconds, de-duplicated and enriched.',
    does: ['Pulls leads from ads, portals, web and WhatsApp', 'Merges duplicates and enriches the profile', 'Reports cost per lead and per visit, by source'],
    handoff: 'Your marketing team sets the budgets and the campaigns.',
  },
  {
    key: 'qualify',
    icon: 'mic',
    verb: 'Qualify',
    title: 'AI Voice Agent',
    body: 'Calls every new lead within a minute, day or night, in a natural voice. It asks about budget, location, configuration, timeline and financing, then scores the lead.',
    does: ['Calls back within 60 seconds, 24/7', 'Captures budget, BHK, area, timeline and loan status', 'Full transcript and score written to the CRM'],
    handoff: 'Price negotiation and legal questions go straight to a person.',
  },
  {
    key: 'nurture',
    icon: 'repeat',
    verb: 'Follow up',
    title: 'Follow-up Agent',
    body: 'Keeps every lead warm on WhatsApp, email and calls, with the brochure, floor plans, price sheet and 3D tour link, timed to how each buyer responds. Nobody has to remember.',
    does: ['Multi-step sequences on WhatsApp, email and voice', 'Re-engages cold and old leads automatically', 'Opt-out stops contact on every channel at once'],
    handoff: 'A buyer who asks for a person gets one, with full context.',
  },
  {
    key: 'book',
    icon: 'calendar',
    verb: 'Book',
    title: 'Appointment & Site-Visit Booking',
    body: 'Offers real slots from each agent’s live calendar, confirms the visit and shares the location pin. Reminders go out the day before and two hours before, and reschedules happen in the chat.',
    does: ['Books against live agent calendars', 'Confirmations and reminders cut no-shows', 'Reschedules and no-show follow-ups handled'],
    handoff: 'The agent walks into the visit already briefed.',
  },
  {
    key: 'close',
    icon: 'kanban',
    verb: 'Close',
    title: 'AI Sales CRM',
    body: 'One pipeline from first click to booking amount. Lead scores, next best actions, routing rules you own, and a Friday digest a sales director can read without anyone compiling it.',
    does: ['Pipeline, scoring and next best action per lead', 'Routing rules you set and change yourself', 'Source-to-sale reporting and a weekly digest'],
    handoff: 'Agents spend their day on buyers who are ready.',
  },
];

// Illustrative timings for one after-hours enquiry.
const JOURNEY = [
  { time: '9:41:02 PM', icon: 'magnet', title: 'Enquiry arrives from a property portal', body: '3BHK in Whitefield. Captured, de-duplicated and tagged by source.' },
  { time: '9:41:40 PM', icon: 'mic', title: 'The voice agent calls back', body: 'Budget, timeline, financing and preferred towers, in a two-minute call.' },
  { time: '9:44:10 PM', icon: 'target', title: 'Qualified and scored: Hot, 86/100', body: 'Transcript, answers and score written to the CRM.' },
  { time: '9:44:30 PM', icon: 'whatsapp', title: 'Brochure and 3D tour on WhatsApp', body: 'Floor plans for the units that match, and a link to walk Tower B in 3D.' },
  { time: '9:45:05 PM', icon: 'calendar', title: 'Site visit booked, Saturday 11:00 AM', body: 'Slot taken from Karan’s live calendar and the location pin shared.' },
  { time: 'Fri, 11:00 AM', icon: 'repeat', title: 'Reminder sent and confirmed', body: 'And again two hours before the visit, with directions.' },
  { time: 'Sat, 11:00 AM', icon: 'user', title: 'Karan meets a briefed, ready buyer', body: 'Nobody in the office touched it until the handshake.' },
];

const COMPARE = [
  { what: 'First response to a new enquiry', before: 'Next working day, if someone gets to it', after: 'A call within a minute, at any hour' },
  { what: 'Enquiries at night and on weekends', before: 'Wait for Monday morning', after: 'Answered and qualified as they arrive' },
  { what: 'Follow-ups', before: 'Depend on each agent remembering', after: 'Scheduled for every lead, on every channel' },
  { what: 'Site visits', before: 'Booked by phone, rarely confirmed', after: 'Booked on the calendar, confirmed, reminded twice' },
  { what: 'What the buyer sees online', before: 'A PDF brochure and a few photos', after: 'The project in 3D, unit by unit' },
  { what: 'Pipeline reporting', before: 'Compiled by hand at month end', after: 'Live, by source, with a Friday digest' },
];

const SOLUTIONS = [
  {
    key: 'developers',
    photo: 're-developer',
    title: 'For Developers',
    sub: 'Launch projects. Sell inventory faster.',
    points: ['3D project websites and virtual site tours', 'Launch campaigns with lead capture built in', 'Inventory-aware qualification and booking', 'Channel-partner and source reporting'],
    cta: 'Explore for Developers',
  },
  {
    key: 'brokerages',
    photo: 're-lobby',
    title: 'For Brokerages',
    sub: 'More visits per agent. Less chasing.',
    points: ['Every portal and ad lead answered in seconds', 'Leads routed to the right agent by rules you own', 'Follow-ups and reminders on autopilot', 'One pipeline across every office'],
    cta: 'Explore for Brokerages',
  },
];

// The site's own delivery model (data/content.js): six to ten weeks to a first
// system in production.
const ROLLOUT = [
  { n: '01', title: 'Scope call', body: 'We map how your enquiries arrive and where they stall today. Scope and price are fixed before anything is designed.' },
  { n: '02', title: 'Design you approve', body: 'Your 3D site, the voice agent’s script, the follow-up sequences and the routing rules, signed off by your team.' },
  { n: '03', title: 'Built in the open', body: 'Working software every week, connected to your portals, ad accounts, calendars and CRM.' },
  { n: '04', title: 'Live and managed', body: 'We go live on real leads, then monitor and keep improving it while it runs.' },
];

const INTEGRATIONS = ['Meta Lead Ads', 'Google Ads', 'Property portals', 'Website forms', 'WhatsApp Business', 'Google Calendar', 'Outlook', 'Your CRM', 'Inventory sheets'];

const CONTROLS = [
  { icon: 'user', title: 'Price and legal go to a person', body: 'The system qualifies and books. It never negotiates or answers a legal question about a project.' },
  { icon: 'bolt', title: 'Routing rules you own', body: 'Which agent gets which lead, and what counts as premium, is a rule you change without a rebuild.' },
  { icon: 'shield', title: 'Consent respected', body: 'Consent is captured at source and an opt-out stops contact immediately, everywhere.' },
  { icon: 'file', title: 'A full audit trail', body: 'Every call, message and CRM write is stored with a timestamp, so any lead can be reconstructed.' },
];

// From data/pages.js, plus the delivery window.
const FAQ = [
  { q: 'Do we have to change our CRM?', a: 'No. It works with the CRM, portal feeds and calendars you already use. Where you have no CRM, the AI Sales CRM becomes it.' },
  { q: 'Who answers the buyer first?', a: 'The system does, within limits you agree, and hands to an agent with the context already gathered. Price negotiation and legal questions always go to a person.' },
  { q: 'What happens to leads outside office hours?', a: 'They are answered when they arrive. That is usually where the difference shows first.' },
  { q: 'How does it handle enquiries that are not serious?', a: 'It scores them and routes accordingly, so agents are not spending the morning on enquiries that were never going to transact. They stay on a low-touch nurture in case that changes.' },
  { q: 'How long until it is running?', a: 'Six to ten weeks to a first system in production, depending on how many portals, ad accounts and calendars it has to reach.' },
];

// --- Mock-ups ---------------------------------------------------------------

function StageMock({ kind }) {
  if (kind === 'attract') {
    return (
      <div className="re-mock re-browser">
        <div className="re-browser__bar"><i /><i /><i /><span>aurelle-residence.in/explore</span></div>
        <div className="re-browser__body">
          <Photo name="re-plan" alt="" sizes="28rem" className="re-browser__plan" />
          <span className="re-hot re-hot--a" />
          <span className="re-hot re-hot--b" />
          <div className="re-unit">
            <b>Tower B · Unit 1204</b>
            <small>3 BHK · 1,640 sq ft · East facing</small>
            <span className="re-unit__row"><span className="re-dot re-dot--ok" />Available<b>₹1.42 Cr</b></span>
            <span className="re-mini re-mini--wide">Enquire for this unit</span>
          </div>
          <span className="re-browser__chips"><span>Masterplan</span><span className="is-on">Floor plans</span><span>Amenities</span><span>Walkthrough</span></span>
        </div>
      </div>
    );
  }
  if (kind === 'capture') {
    const rows = [['Property portals', 63], ['Meta lead ads', 42], ['WhatsApp', 31], ['Google ads', 27], ['Website', 18]];
    return (
      <div className="re-mock re-sources">
        <div className="re-sheet">
          <span className="re-sheet__row"><b>Today&rsquo;s enquiries</b><small className="re-live-tag"><span className="re-dot re-dot--live" />Live</small></span>
          {rows.map(([n, c], i) => (
            <span key={n} className="re-src">
              <small>{n}</small>
              <span className="re-src__bar"><i style={{ width: `${(c / 63) * 100}%`, animationDelay: `${i * 0.08}s` }} /></span>
              <b>{c}</b>
            </span>
          ))}
        </div>
        <div className="re-float-card">
          <span className="re-tile re-tile--sm"><Icon name="layers" className="re-ico re-ico--sm" /></span>
          <span><b>181 in one queue</b><small>12 duplicates merged · 0 waiting</small></span>
        </div>
      </div>
    );
  }
  if (kind === 'qualify') {
    return (
      <div className="re-mock re-call">
        <div className="re-call__h">
          <span className="re-call__ring"><Icon name="mic" className="re-ico re-ico--sm" /></span>
          <span><b>AI Voice Agent → Priya Nair</b><small>Outbound · 00:47</small></span>
          <span className="re-live">LIVE</span>
        </div>
        <div className="re-wave" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--h': `${18 + ((i * 53) % 70)}%`, '--d': `${(i % 7) * 0.09}s` }} />)}</div>
        <p className="re-line re-line--ai">What budget range are you looking at, and when would you like to move in?</p>
        <p className="re-line re-line--me">Around 1.2 to 1.5 crore. Ideally in six months.</p>
        <div className="re-chips">
          <span>₹1.2–1.5 Cr</span><span>3 BHK</span><span>Whitefield</span><span>6 months</span><span>Loan: yes</span>
          <span className="re-chip--hot">Hot · 86</span>
        </div>
      </div>
    );
  }
  if (kind === 'nurture') {
    return (
      <div className="re-mock re-wa">
        <div className="re-wa__h">
          <span className="re-mark__glyph" aria-hidden="true"><Icon name="building" className="re-ico re-ico--sm" /></span>
          <span><b>Aurelle Residence</b><small>Online</small></span>
          <span className="re-wa__icon"><Icon name="whatsapp" className="re-ico re-ico--sm" /></span>
        </div>
        <span className="re-bubble re-bubble--out">Hi Priya! Here are the 3BHK floor plans you asked about, and the 3D tour of Tower B.</span>
        <span className="re-doc re-doc--photo">
          <Photo name="re-tower" alt="" sizes="16rem" />
          <span><b>Walk Tower B in 3D</b><small>aurelle-residence.in/tour</small></span>
        </span>
        <span className="re-doc"><Icon name="file" className="re-ico re-ico--sm" /><span><b>Tower-B-floor-plans.pdf</b><small>2.4 MB · PDF</small></span></span>
        <span className="re-bubble re-bubble--in">This looks great! Can I see it this weekend?</span>
        <div className="re-seq"><span className="is-done">Day 0 ✓</span><span className="is-done">Day 2 ✓</span><span>Day 5</span><span>Day 9</span></div>
      </div>
    );
  }
  if (kind === 'book') {
    const days = ['Thu', 'Fri', 'Sat', 'Sun'];
    const slots = [['10:00', 'x', '', '', 'x'], ['11:00', '', 'x', 'pick', ''], ['12:30', 'x', '', '', ''], ['16:00', '', '', 'x', '']];
    return (
      <div className="re-mock re-book">
        <div className="re-sheet">
          <span className="re-sheet__row"><b>Site visits · Karan&rsquo;s calendar</b><Avatar name="Karan Rao" /></span>
          <div className="re-slots">
            <span />{days.map((d) => <small key={d}>{d}</small>)}
            {slots.map(([time, ...cells]) => [
              <small key={time}>{time}</small>,
              ...cells.map((c, i) => <i key={`${time}${i}`} className={c ? `is-${c}` : undefined}>{c === 'pick' ? 'Priya' : ''}</i>),
            ])}
          </div>
        </div>
        <div className="re-float-card re-float-card--right">
          <span className="re-tile re-tile--sm re-tile--ok"><Icon name="check" className="re-ico re-ico--sm" /></span>
          <span><b>Sat 11:00 AM confirmed</b><small>Reminders: Fri 11:00 ✓ · Sat 9:00</small></span>
          <span className="re-pin"><Icon name="pin" className="re-ico re-ico--xs" />Pin sent</span>
        </div>
      </div>
    );
  }
  const cols = [
    ['New', [['Arjun M.', 'Portal', 42]]],
    ['Qualified', [['Priya N.', 'Hot', 86], ['Sameer K.', 'Warm', 64]]],
    ['Visit booked', [['Neha S.', 'Sat 11', 81]]],
    ['Booking', [['Vikram R.', '₹10L paid', 95]]],
  ];
  return (
    <div className="re-mock re-crm">
      <div className="re-crm__bar"><b>Pipeline · Aurelle Residence</b><span className="re-crm__kpi">Visit → booking <b>28%</b></span></div>
      <div className="re-crm__cols">
        {cols.map(([name, cards]) => (
          <div key={name} className="re-crm__col">
            <small>{name} <span>{cards.length}</span></small>
            {cards.map(([n, tag, score]) => (
              <span key={n} className="re-crm__card">
                <b>{n}</b>
                <span className="re-crm__meta"><small>{tag}</small><span className={`re-score${score >= 80 ? ' is-hot' : ''}`}>{score}</span></span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="re-next"><Icon name="bolt" className="re-ico re-ico--xs" />Next best action: call Sameer, he reopened the price sheet twice today</div>
    </div>
  );
}

// --- The animated workflow ---------------------------------------------------

// Every lead source on the left, the agents in the middle, the three outcomes
// on the right and the CRM underneath. Packets travel the paths on SMIL
// motion, so the diagram costs nothing on the main thread; a reader who asked
// for reduced motion gets the diagram without them.
const WF_SOURCES = ['Property portals', 'Meta lead ads', 'Google ads', 'Website & 3D tour', 'WhatsApp & calls'];
const WF_SRC_Y = WF_SOURCES.map((_, i) => 96 + i * 76);
const WF_PATHS = {
  ...Object.fromEntries(WF_SRC_Y.map((y, i) => [`src${i}`, `M222 ${y} C 262 ${y}, 262 250, 302 250`])),
  capture: 'M502 250 L572 250',
  qualify: 'M772 250 L818 250',
  hot: 'M866 202 C 866 140, 900 112, 952 112',
  warm: 'M914 250 L952 250',
  cold: 'M866 298 C 866 360, 900 388, 952 388',
  loop: 'M1010 290 C 1010 350, 672 350, 672 298',
};

function WfNode({ x, y, w, h, title, sub, icon, tone = '' }) {
  return (
    <g className={`re-wf__node ${tone}`} transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="12" />
      {icon && (
        <g transform="translate(16 16)" className="re-wf__icon">
          <rect width="34" height="34" rx="8" />
          <svg x="7" y="7" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>
        </g>
      )}
      <text x={icon ? 62 : 18} y={icon ? 30 : h / 2 + 5} className="re-wf__title">{title}</text>
      {sub && <text x={icon ? 62 : 18} y={icon ? 50 : h / 2 + 24} className="re-wf__sub">{sub}</text>}
    </g>
  );
}

function Packet({ path, dur, begin, tone = '' }) {
  return (
    <circle r="5" className={`re-wf__packet ${tone}`}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.35 1" />
    </circle>
  );
}

function Workflow() {
  const motion = useMedia('(prefers-reduced-motion: no-preference)');

  return (
    <div className="re-wf">
      <svg className="re-wf__svg" viewBox="0 0 1200 560" role="img" aria-labelledby="re-wf-title">
        <title id="re-wf-title">
          The workflow: leads from portals, ads, the website and WhatsApp reach the lead generation agent, then the AI voice agent, and are scored hot, warm or not ready. Hot leads get a booked site visit, warm leads go to the follow-up agent and back to a call, and the rest go to a monthly nurture. Every step is written to the AI sales CRM.
        </title>
        {Object.entries(WF_PATHS).map(([k, d]) => (
          <path key={k} d={d} className={`re-wf__path${k === 'loop' ? ' re-wf__path--loop' : ''}`} />
        ))}
        {[[402, 298], [672, 352], [1062, 428]].map(([x, y]) => (
          <path key={x} d={`M${x} ${y} L${x} 474`} className="re-wf__path re-wf__path--crm" />
        ))}

        <text x="40" y="52" className="re-wf__col">Lead sources</text>
        <text x="302" y="182" className="re-wf__col">Capture</text>
        <text x="572" y="182" className="re-wf__col">Qualify</text>
        <text x="952" y="52" className="re-wf__col">Outcome</text>

        {WF_SOURCES.map((s, i) => <WfNode key={s} x={40} y={WF_SRC_Y[i] - 23} w={182} h={46} title={s} />)}
        <WfNode x={302} y={202} w={200} h={96} icon="magnet" title="Lead Gen Agent" sub="Captures every lead" />
        <WfNode x={572} y={202} w={200} h={96} icon="mic" title="AI Voice Agent" sub="Calls in 60 seconds" />
        <g className="re-wf__node re-wf__decide" transform="translate(866 250)">
          <path d="M0 -48 L48 0 L0 48 L-48 0z" />
          <text y="5" textAnchor="middle" className="re-wf__title">Score</text>
        </g>
        <WfNode x={952} y={72} w={220} h={80} icon="calendar" tone="is-hot" title="Hot · Visit booked" sub="On the agent’s calendar" />
        <WfNode x={952} y={210} w={220} h={80} icon="repeat" tone="is-warm" title="Warm · Follow-up" sub="WhatsApp, email, call" />
        <WfNode x={952} y={348} w={220} h={80} icon="clock" tone="is-cold" title="Not ready · Nurture" sub="Monthly updates, launches" />
        <text x="842" y="344" className="re-wf__note">calls again when they engage</text>

        <g className="re-wf__node re-wf__crm" transform="translate(40 474)">
          <rect width="1132" height="58" rx="12" />
          <g transform="translate(16 12)" className="re-wf__icon">
            <rect width="34" height="34" rx="8" />
            <svg x="7" y="7" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS.kanban}</svg>
          </g>
          <text x="64" y="35" className="re-wf__title">AI Sales CRM</text>
          <text x="196" y="35" className="re-wf__sub">Every call, message, score and visit written to one record, with routing rules you own and a Friday digest for the director</text>
        </g>

        {motion && (
          <g>
            {WF_SOURCES.map((_, i) => <Packet key={i} path={WF_PATHS[`src${i}`]} dur={1.6} begin={i * 0.7} />)}
            <Packet path={WF_PATHS.capture} dur={0.9} begin={0.4} />
            <Packet path={WF_PATHS.capture} dur={0.9} begin={1.6} />
            <Packet path={WF_PATHS.qualify} dur={0.7} begin={0.9} />
            <Packet path={WF_PATHS.qualify} dur={0.7} begin={2.1} />
            <Packet path={WF_PATHS.hot} dur={1.2} begin={1.4} tone="is-hot" />
            <Packet path={WF_PATHS.warm} dur={0.8} begin={2.4} tone="is-warm" />
            <Packet path={WF_PATHS.cold} dur={1.2} begin={3.2} tone="is-cold" />
            <Packet path={WF_PATHS.loop} dur={2.6} begin={3} tone="is-warm" />
            {[402, 672, 1062].map((x, i) => (
              <Packet key={x} path={`M${x} ${[298, 352, 428][i]} L${x} 474`} dur={1.1} begin={1 + i * 0.8} tone="is-crm" />
            ))}
          </g>
        )}
      </svg>

      {/* Phones: the same flow as a list, which reads better than a scaled-down diagram. */}
      <ol className="re-wf__list">
        {[
          ['magnet', 'Lead Gen Agent', 'Every portal, ad, website and WhatsApp lead, captured and de-duplicated.'],
          ['mic', 'AI Voice Agent', 'Calls within 60 seconds and qualifies the buyer.'],
          ['target', 'Score', 'Hot, warm or not ready, against rules you set.'],
          ['calendar', 'Hot: site visit booked', 'On the agent’s calendar, confirmed and reminded.'],
          ['repeat', 'Warm: follow-up agent', 'WhatsApp, email and calls, then a call back when they engage.'],
          ['kanban', 'AI Sales CRM', 'Every step written to one record.'],
        ].map(([icon, t, b]) => (
          <li key={t}><span className="re-tile"><Icon name={icon} /></span><span><b>{t}</b><small>{b}</small></span></li>
        ))}
      </ol>
    </div>
  );
}

// --- The stage-by-stage walkthrough ------------------------------------------

function SystemWalkthrough() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const tabsRef = useRef([]);

  // Steps through the six stages until the reader picks one.
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % SYSTEM.length), 6500);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };
  const onKey = (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + SYSTEM.length) % SYSTEM.length;
    pick(next);
    tabsRef.current[next]?.focus();
  };

  const s = SYSTEM[active];

  return (
    <div className="re-system">
      <div className="re-track" role="tablist" aria-label="The six stages of the sales system">
        <span className="re-track__line" aria-hidden="true"><i style={{ width: `${(active / (SYSTEM.length - 1)) * 100}%` }} /></span>
        {SYSTEM.map((st, i) => (
          <button
            key={st.key}
            ref={(el) => { tabsRef.current[i] = el; }}
            type="button"
            role="tab"
            id={`re-tab-${st.key}`}
            aria-selected={i === active}
            aria-controls="re-stage-panel"
            tabIndex={i === active ? 0 : -1}
            className={`re-track__step${i === active ? ' is-on' : ''}${i < active ? ' is-done' : ''}`}
            onClick={() => pick(i)}
            onKeyDown={onKey}
          >
            <span className="re-tile"><Icon name={st.icon} /></span>
            <small>0{i + 1} · {st.verb}</small>
            <b>{st.title}</b>
            {auto && i === active && <span className="re-track__timer" aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div id="re-stage-panel" role="tabpanel" aria-labelledby={`re-tab-${s.key}`} className="re-panel" key={s.key}>
        <div className="re-panel__copy">
          <span className="re-panel__step">Stage 0{active + 1} &middot; {s.verb}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          <ul className="re-panel__does">
            {s.does.map((d) => <li key={d}><Icon name="check" className="re-ico re-ico--sm" />{d}</li>)}
          </ul>
          <p className="re-panel__handoff"><Icon name="user" className="re-ico re-ico--sm" /><span><b>Your team&rsquo;s part:</b> {s.handoff}</span></p>
        </div>
        <div className="re-panel__stage" aria-hidden="true"><StageMock kind={s.key} /></div>
      </div>
    </div>
  );
}

// --- Page -------------------------------------------------------------------

export function RealEstate() {
  const rootRef = useRef(null);

  useDocumentTitle(
    `${PRODUCT}: Every Enquiry Answered. Every Visit Booked. | Ideora Labs`,
    `${PRODUCT} is the AI sales system for real estate from Ideora Labs: 3D project websites, lead generation, AI voice agents, follow-ups, site-visit booking and an AI sales CRM.`,
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
    <div ref={rootRef} className="re">
      {/* Hero ------------------------------------------------------------- */}
      <section className="re-hero">
        <Container wide className="re-hero__grid">
          <div className="re-hero__copy">
            <Wordmark />
            <Eyebrow>AI sales &amp; marketing system for real estate</Eyebrow>
            <h1 className="re-hero__title" data-anim="hero-1">
              Every enquiry answered.<br />Every visit booked.<br /><span>Every deal tracked.</span>
            </h1>
            <p className="re-hero__lede">
              3D project websites, lead generation, AI voice calls, follow-ups and site-visit booking, wired
              into one AI sales CRM. Your enquiries are worked in seconds, around the clock, and your agents
              meet buyers who are ready.
            </p>
            <div className="re-actions">
              <a className="re-btn re-btn--primary" {...demo('property_hero')}>Book a Demo <Icon name="arrow" className="re-ico re-ico--sm" /></a>
              <a className="re-btn re-btn--ghost" href="#re-workflow" data-track="property_system_open">See the Workflow <Icon name="play" className="re-ico re-ico--xs" /></a>
            </div>
          </div>
          <div className="re-hero__visual" data-anim="console">
            <EstateScene />
          </div>
        </Container>
        <Container wide>
          <dl className="re-proof">
            {PROOF.map((p) => (
              <div key={p.label}><dt>{p.label}</dt><dd>{p.value}</dd></div>
            ))}
          </dl>
        </Container>
      </section>

      {/* The challenge ------------------------------------------------------ */}
      <section className="re-sec re-sec--stone">
        <Container wide>
          <div className="re-challenge">
            <div className="re-challenge__head">
              <Eyebrow>The challenge</Eyebrow>
              <h2 className="re-h2">Your enquiries are growing. Are they turning into site visits?</h2>
              <p className="re-sub">Leads arrive from six places at all hours, and every one of them is talking to other projects too. The team that answers first, follows up longest and confirms the visit wins the booking.</p>
            </div>
            <div className="re-challenge__visual" aria-hidden="true">
              <div className="re-challenge__photo"><Photo name="re-tower" alt="" sizes="(min-width: 64em) 40vw, 100vw" /></div>
              <div className="re-phone">
                <div className="re-phone__screen">
                  <span className="re-phone__time">11:42 PM</span>
                  <span className="re-phone__date">Saturday</span>
                  {[
                    ['phone', 'Missed call', '+91 98450 ••••• · 3BHK enquiry'],
                    ['magnet', 'Portal lead · no reply', 'Waiting 6 hours'],
                    ['whatsapp', '4 unread WhatsApp chats', '“Is the 2BHK still available?”'],
                    ['userX', 'Site visit · no-show', 'Not confirmed or reminded'],
                    ['bellOff', 'Follow-up overdue', '23 leads · last touched 5 days ago'],
                  ].map(([icon, title, meta]) => (
                    <span key={title} className="re-note">
                      <span className="re-tile re-tile--sm"><Icon name={icon} className="re-ico re-ico--sm" /></span>
                      <span><b>{title}</b><small>{meta}</small></span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ol className="re-pains">
            {PAINS.map((p, i) => (
              <li key={p.title} className="re-pain" data-anim="card">
                <span className="re-pain__n">0{i + 1}</span>
                <Icon name={p.icon} className="re-ico re-pain__ico" />
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services ----------------------------------------------------------- */}
      <section className="re-sec">
        <Container wide>
          <div className="re-head">
            <div>
              <Eyebrow>The solution</Eyebrow>
              <h2 className="re-h2">Meet {PRODUCT}. Six AI services, working as one sales team.</h2>
            </div>
            <p className="re-sub">From the first look at your project to the booking amount, each service hands the next everything it learned. Your agents step in only where a person matters.</p>
          </div>
          <ul className="re-services">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="re-service" data-anim="card">
                <span className="re-service__top"><span className="re-tile"><Icon name={s.icon} /></span><span className="re-service__n">0{i + 1}</span></span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <small><b>Replaces</b> {s.replaces}</small>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The workflow ------------------------------------------------------- */}
      <section id="re-workflow" className="re-sec re-sec--ink">
        <Container wide>
          <div className="re-head">
            <div>
              <Eyebrow light>The workflow</Eyebrow>
              <h2 className="re-h2">How every lead moves, end to end.</h2>
            </div>
            <p className="re-sub">Every lead takes the same path, at any hour, with nothing retyped between steps. Hot buyers reach your agent’s calendar. Everyone else is followed up until they are ready.</p>
          </div>
          <Workflow />
        </Container>
      </section>

      {/* Stage by stage ------------------------------------------------------ */}
      <section className="re-sec">
        <Container wide>
          <div className="re-head">
            <div>
              <Eyebrow>Stage by stage</Eyebrow>
              <h2 className="re-h2">What each agent does, and where your team comes in.</h2>
            </div>
            <p className="re-sub">Pick a stage to see what the buyer gets, what the system does on its own, and the one point where a person takes over.</p>
          </div>
          <SystemWalkthrough />
        </Container>
      </section>

      {/* What buyers see ------------------------------------------------------ */}
      <section className="re-sec re-sec--stone">
        <Container wide>
          <div className="re-head">
            <div>
              <Eyebrow>3D websites</Eyebrow>
              <h2 className="re-h2">Show buyers the home, not a brochure.</h2>
            </div>
            <p className="re-sub">We build your project as a 3D website: the masterplan, every tower and floor plan, the amenities and the view, with live availability on each unit. Buyers enquire from the unit they fell for.</p>
          </div>
          <div className="re-bento">
            <figure className="re-bento__item re-bento__item--main" data-anim="card">
              <Photo name="re-podium" alt="An aerial view of a residential podium: pool, padel court and landscaped gardens" sizes="(min-width: 64em) 55vw, 100vw" />
              <span className="re-spot re-spot--1"><i />Pool deck</span>
              <span className="re-spot re-spot--2"><i />Padel court</span>
              <span className="re-spot re-spot--3"><i />Tower B · 42 units available</span>
              <figcaption><b>Interactive masterplan</b><small>Tap any tower, amenity or unit</small></figcaption>
            </figure>
            <figure className="re-bento__item re-bento__item--plan" data-anim="card">
              <Photo name="re-plan" alt="A 3D floor plan of a three-bedroom apartment" sizes="(min-width: 64em) 30vw, 100vw" />
              <figcaption><b>3D floor plans</b><small>Every configuration, furnished</small></figcaption>
            </figure>
            <figure className="re-bento__item" data-anim="card">
              <Photo name="re-living" alt="A furnished living room with floor-to-ceiling windows" sizes="(min-width: 64em) 25vw, 100vw" />
              <span className="re-badge">360° walkthrough</span>
              <figcaption><b>Virtual walkthroughs</b><small>Room by room, with the real view</small></figcaption>
            </figure>
            <figure className="re-bento__item" data-anim="card">
              <Photo name="re-pool" alt="A rooftop pool deck at sunset" sizes="(min-width: 64em) 25vw, 100vw" />
              <figcaption><b>Amenities tour</b><small>Clubhouse, pool, gardens</small></figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* One enquiry ------------------------------------------------------------ */}
      <section className="re-sec">
        <Container wide>
          <div className="re-journey">
            <div className="re-journey__head">
              <Eyebrow>Fully automated</Eyebrow>
              <h2 className="re-h2">9:41 PM, Saturday. Your office is closed. The system is not.</h2>
              <p className="re-sub">Follow one enquiry from a property portal to a site visit: four minutes of work that nobody in the office had to do.</p>
              <div className="re-journey__photo"><Photo name="re-family" alt="A family relaxing in the living room of their new apartment" sizes="(min-width: 64em) 35vw, 100vw" /></div>
              <a className="re-btn re-btn--primary" {...demo('property_journey')}>See It on Your Leads <Icon name="arrow" className="re-ico re-ico--sm" /></a>
            </div>
            <ol className="re-steps">
              {JOURNEY.map((j) => (
                <li key={j.time} className="re-steps__item" data-anim="step">
                  <span className="re-tile"><Icon name={j.icon} /></span>
                  <div className="re-steps__card">
                    <time>{j.time}</time>
                    <b>{j.title}</b>
                    <p>{j.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Before and after ------------------------------------------------------- */}
      <section className="re-sec re-sec--stone">
        <Container wide>
          <div className="re-head">
            <div>
              <Eyebrow>Before and after</Eyebrow>
              <h2 className="re-h2">What changes for your sales team.</h2>
            </div>
            <p className="re-sub">The same leads, the same agents and the same projects. The difference is what happens between the enquiry and the handshake.</p>
          </div>
          <div className="re-compare" role="table" aria-label="Your sales process today, and with Ideora Property">
            <div className="re-compare__row re-compare__row--head" role="row">
              <span role="columnheader"><span className="visually-hidden">What changes</span></span>
              <span role="columnheader">Today</span>
              <span role="columnheader">With {PRODUCT}</span>
            </div>
            {COMPARE.map((c) => (
              <div key={c.what} className="re-compare__row" role="row" data-anim="card">
                <b role="rowheader">{c.what}</b>
                <span role="cell" className="re-compare__before"><Icon name="x" className="re-ico re-ico--xs" />{c.before}</span>
                <span role="cell" className="re-compare__after"><Icon name="check" className="re-ico re-ico--xs" />{c.after}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Developers and brokerages -------------------------------------------- */}
      <section className="re-sec">
        <Container wide>
          <div className="re-head">
            <div>
              <Eyebrow>Built for your business</Eyebrow>
              <h2 className="re-h2">For developers and brokerages.</h2>
            </div>
            <p className="re-sub">Whether you are launching a tower or running fifty agents across three offices, {PRODUCT} fits the way you sell.</p>
          </div>
          <div className="re-audiences">
            {SOLUTIONS.map((s) => (
              <article key={s.key} className="re-audience" data-anim="card">
                <div className="re-audience__photo"><Photo name={s.photo} alt="" sizes="(min-width: 64em) 45vw, 100vw" /></div>
                <div className="re-audience__body">
                  <h3>{s.title}</h3>
                  <p>{s.sub}</p>
                  <ul className="re-ticks">
                    {s.points.map((pt) => <li key={pt}><Icon name="check" className="re-ico re-ico--sm" />{pt}</li>)}
                  </ul>
                  <a className="re-btn re-btn--ghost" {...demo(`property_${s.key}`)}>{s.cta} <Icon name="arrow" className="re-ico re-ico--sm" /></a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Rollout ---------------------------------------------------------------- */}
      <section className="re-sec re-sec--tight">
        <Container wide>
          <div className="re-rollout">
            <div className="re-rollout__head">
              <Eyebrow>Getting started</Eyebrow>
              <h2 className="re-h2">Live in six to ten weeks.</h2>
              <p className="re-sub">A fixed scope and price before anything is built, and working software every week after that.</p>
            </div>
            <ol className="re-rollout__steps">
              {ROLLOUT.map((r) => (
                <li key={r.n} data-anim="step">
                  <span className="re-rollout__n">{r.n}</span>
                  <b>{r.title}</b>
                  <p>{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Integrations and controls -------------------------------------------- */}
      <section className="re-sec re-sec--stone">
        <Container wide>
          <div className="re-connect">
            <div>
              <Eyebrow>Plugs into your stack</Eyebrow>
              <h2 className="re-h2">No new tools for your team to learn.</h2>
              <p className="re-sub">It works with the CRM, portals, ad accounts and calendars you already run. Nothing to migrate.</p>
              <ul className="re-logos">
                {INTEGRATIONS.map((n) => <li key={n}>{n}</li>)}
              </ul>
              <span className="re-links">
                <Link to="/products/ideora-property" className="re-link">View the product <Icon name="arrow" className="re-ico re-ico--sm" /></Link>
                <Link to="/case-studies/property-lead-qualification" className="re-link">Read the case study <Icon name="arrow" className="re-ico re-ico--sm" /></Link>
              </span>
            </div>
            <ul className="re-controls">
              {CONTROLS.map((c) => (
                <li key={c.title} data-anim="card">
                  <span className="re-tile"><Icon name={c.icon} /></span>
                  <b>{c.title}</b>
                  <p>{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Questions --------------------------------------------------------------- */}
      <section className="re-sec">
        <Container wide>
          <div className="re-faq">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="re-h2">What sales directors ask us first.</h2>
            </div>
            <div className="re-faq__list">
              {FAQ.map((f) => (
                <details key={f.q} className="re-faq__item">
                  <summary>{f.q}<span aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing ---------------------------------------------------------------- */}
      <section className="re-close">
        <div className="re-close__photo" aria-hidden="true"><Photo name="re-terrace" alt="" sizes="100vw" /></div>
        <Container wide className="re-close__grid">
          <div className="re-close__copy">
            <Wordmark light />
            <h2>Let&rsquo;s build your always-on sales team.</h2>
            <p>See {PRODUCT} on your own project and your own leads. Book a personalised demo, and bring a week of last month&rsquo;s enquiries.</p>
            <a className="re-btn re-btn--bronze" {...demo('property_close')}>Schedule Your Demo <Icon name="arrow" className="re-ico re-ico--sm" /></a>
          </div>
          <dl className="re-close__proof" aria-label="Proof">
            {PROOF.slice(0, 3).map((p) => (
              <div key={p.label}><dd>{p.value}</dd><dt>{p.label}</dt></div>
            ))}
          </dl>
        </Container>
      </section>
    </div>
  );
}
