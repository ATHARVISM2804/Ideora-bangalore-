// The management view, drawn rather than listed.
//
// Every figure here is invented. It has to be: the real numbers belong to
// clients under NDA, and the evidence rule is that no outcome claim appears
// without a source. So this is a representative view -- the shape of the
// screen, the metrics that are actually on it, and plausible values -- and the
// panel says so in as many words.
//
// The metrics are not invented. Each product's `dashboard` list in pages.js is
// the contract for what management sees, and these charts show those same
// fields. If one changes there it should change here.

const health = {
  updated: 'Today, 09:14',
  kpis: [
    { label: 'Booked this week', value: '412', delta: '+8%', trend: 'up' },
    { label: 'No-shows', value: '3.1%', delta: '-1.4pts', trend: 'up' },
    { label: 'Follow-up due', value: '58', delta: '12 overdue', trend: 'flat' },
    { label: 'Answered in', value: '40s', delta: 'median', trend: 'flat' },
  ],
  // Composition. Sums to 100.
  donut: {
    title: 'Exceptions by reason',
    total: '46 this week',
    segments: [
      { label: 'Clinical wording', value: 34, tone: 'signal' },
      { label: 'No slot available', value: 28, tone: 'accent' },
      { label: 'Consent missing', value: 21, tone: 'muted' },
      { label: 'Payment issue', value: 17, tone: 'faint' },
    ],
  },
  bars: {
    title: 'Appointments by day',
    unit: 'booked',
    series: [
      { label: 'Mon', value: 74 }, { label: 'Tue', value: 88 }, { label: 'Wed', value: 61 },
      { label: 'Thu', value: 79 }, { label: 'Fri', value: 92 }, { label: 'Sat', value: 45 },
    ],
  },
  pipeline: [
    { label: 'Enquiries', value: '512', tone: 'muted' },
    { label: 'Matched', value: '478', tone: 'muted' },
    { label: 'Booked', value: '412', tone: 'accent' },
    { label: 'Exceptions', value: '46', tone: 'signal' },
    { label: 'Reported', value: '412', tone: 'muted' },
  ],
  queue: [
    { ref: 'EX-2214', reason: 'Urgent wording in message', owner: 'Front desk', age: '4m' },
    { ref: 'EX-2213', reason: 'No slot inside requested window', owner: 'Scheduling', age: '18m' },
    { ref: 'EX-2211', reason: 'Consent not captured', owner: 'Front desk', age: '1h 02m' },
  ],
};

const auto = {
  updated: 'Today, 09:14',
  kpis: [
    { label: 'Jobs booked', value: '186', delta: '+11%', trend: 'up' },
    { label: 'Bay utilisation', value: '82%', delta: '+6pts', trend: 'up' },
    { label: 'Estimates waiting', value: '14', delta: '3 over 24h', trend: 'down' },
    { label: 'Pending payment', value: '₹4.2L', delta: '9 jobs', trend: 'flat' },
  ],
  donut: {
    title: 'Jobs by status',
    total: '186 open',
    segments: [
      { label: 'In bay', value: 41, tone: 'accent' },
      { label: 'Awaiting approval', value: 24, tone: 'signal' },
      { label: 'Parts held', value: 19, tone: 'muted' },
      { label: 'Ready for pickup', value: 16, tone: 'faint' },
    ],
  },
  bars: {
    title: 'Technician load',
    unit: 'jobs assigned',
    series: [
      { label: 'Bay 1', value: 12 }, { label: 'Bay 2', value: 15 }, { label: 'Bay 3', value: 9 },
      { label: 'Bay 4', value: 14 }, { label: 'Bay 5', value: 7 }, { label: 'Bay 6', value: 11 },
    ],
  },
  pipeline: [
    { label: 'Requests', value: '241', tone: 'muted' },
    { label: 'Booked', value: '186', tone: 'accent' },
    { label: 'Estimates', value: '96', tone: 'muted' },
    { label: 'Approvals', value: '14', tone: 'signal' },
    { label: 'Invoiced', value: '163', tone: 'muted' },
  ],
  queue: [
    { ref: 'JOB-8841', reason: 'Safety finding on brake pads', owner: 'Advisor', age: '7m' },
    { ref: 'JOB-8837', reason: 'Estimate disputed by customer', owner: 'Service manager', age: '41m' },
    { ref: 'JOB-8829', reason: 'Part delayed, customer not told', owner: 'Parts desk', age: '2h 15m' },
  ],
};

const property = {
  updated: 'Today, 09:14',
  kpis: [
    { label: 'Leads this week', value: '308', delta: '+22%', trend: 'up' },
    { label: 'Median response', value: '38s', delta: 'was 6h', trend: 'up' },
    { label: 'Visits booked', value: '64', delta: '21% of qualified', trend: 'flat' },
    { label: 'Ageing over 48h', value: '11', delta: 'with agents', trend: 'down' },
  ],
  donut: {
    title: 'Leads by source',
    total: '308 this week',
    segments: [
      { label: 'Portals', value: 38, tone: 'accent' },
      { label: 'Lead ads', value: 31, tone: 'signal' },
      { label: 'Website forms', value: 19, tone: 'muted' },
      { label: 'Walk-in and referral', value: 12, tone: 'faint' },
    ],
  },
  bars: {
    title: 'Qualified leads by project',
    unit: 'qualified',
    series: [
      { label: 'Whitefield', value: 47 }, { label: 'Sarjapur', value: 38 }, { label: 'Hebbal', value: 22 },
      { label: 'Devanahalli', value: 17 }, { label: 'Kanakapura', value: 14 },
    ],
  },
  pipeline: [
    { label: 'Arrived', value: '308', tone: 'muted' },
    { label: 'Answered', value: '308', tone: 'accent' },
    { label: 'Qualified', value: '138', tone: 'muted' },
    { label: 'To an agent', value: '74', tone: 'signal' },
    { label: 'Visits booked', value: '64', tone: 'muted' },
  ],
  queue: [
    { ref: 'LEAD-5521', reason: 'Asked for a price negotiation', owner: 'Sales lead', age: '3m' },
    { ref: 'LEAD-5514', reason: 'Budget below every live project', owner: 'Channel desk', age: '52m' },
    { ref: 'LEAD-5509', reason: 'Premium lead, routed to director', owner: 'Director', age: '1h 30m' },
  ],
};

const console_ = {
  updated: 'Today, 09:14',
  kpis: [
    { label: 'Work completed', value: '1,284', delta: 'this week', trend: 'flat' },
    { label: 'Waiting', value: '96', delta: '+4 today', trend: 'down' },
    { label: 'Within service level', value: '97.2%', delta: '+0.8pts', trend: 'up' },
    { label: 'Exceptions open', value: '31', delta: '6 over SLA', trend: 'down' },
  ],
  donut: {
    title: 'Work by channel',
    total: '1,380 events',
    segments: [
      { label: 'WhatsApp', value: 44, tone: 'accent' },
      { label: 'Voice', value: 23, tone: 'signal' },
      { label: 'Web forms', value: 21, tone: 'muted' },
      { label: 'Email', value: 12, tone: 'faint' },
    ],
  },
  bars: {
    title: 'Backlog ageing',
    unit: 'items waiting',
    series: [
      { label: '<1h', value: 41 }, { label: '1-4h', value: 28 }, { label: '4-12h', value: 15 },
      { label: '12-24h', value: 8 }, { label: '>24h', value: 4 },
    ],
  },
  pipeline: [
    { label: 'Intake', value: '1,380', tone: 'muted' },
    { label: 'Automated', value: '1,284', tone: 'accent' },
    { label: 'Exceptions', value: '96', tone: 'signal' },
    { label: 'Resolved', value: '65', tone: 'muted' },
    { label: 'Audited', value: '1,380', tone: 'muted' },
  ],
  queue: [
    { ref: 'EXC-0431', reason: 'Integration rejected a write', owner: 'Ops engineer', age: '11m' },
    { ref: 'EXC-0428', reason: 'Confidence below threshold', owner: 'Supervisor', age: '35m' },
    { ref: 'EXC-0422', reason: 'Duplicate record suspected', owner: 'Supervisor', age: '3h 08m' },
  ],
};

export const DASHBOARDS = {
  'Ideora Health': health,
  'Ideora Auto': auto,
  'Ideora Property': property,
  'Operations Console': console_,
};
