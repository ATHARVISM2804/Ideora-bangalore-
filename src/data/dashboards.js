// UI FIXTURE DATA. The workspaces, users, KPIs, traces and queues below are
// sample data for the homepage console. They are illustrative of how the
// console reads, not measured results from any deployment, and they must not
// be cited as proof on a page: `pages.js` entries take their metrics from
// RESULT_STATS, FACTS and CASES in content.js. Console detail may be described
// in prose only where it is attributed to the console rather than asserted.
//
// One console state per industry. `status` is deliberate: only the three
// verticals the rest of the site can evidence are marked live. Finance and
// Legal are shown as build/pilot so the hero never claims more than the case
// studies and testimonials below it can support.

export const DASHBOARDS = [
  {
    id: 'automotive',
    workspace: 'Northline Motors',
    user: ["RM", "Rahul M.", "Service lead"],
    search: 'Search vehicles, jobs, customers',
    action: 'New booking',
    filters: ["Open", "This week"],
    sla: 98,
    name: 'Automotive',
    status: 'live',
    agent: 'service_centre_agent',
    run: '4471',
    clock: 'Thu 09:14',
    online: ['12', '12'],
    rail: [
      { icon: 'queue', label: 'Queue', count: '34', active: true },
      { icon: 'agents', label: 'Agents', count: '12' },
      { icon: 'records', label: 'Bookings', count: '128' },
      { icon: 'alert', label: 'Exceptions', count: '2' },
      { icon: 'reports', label: 'Reports', count: '' },
    
    ],
    kpis: [
      { label: 'jobs in flight', value: 34, unit: 'open', delta: '+6', trend: 'up', spark: [30, 34, 28, 38, 41, 36, 44, 40, 47, 52, 48, 54] },
      { label: 'auto-completed today', value: 128, unit: 'tasks', delta: '+18%', trend: 'up', spark: [52, 48, 60, 57, 66, 71, 68, 79, 84, 80, 92, 100] },
      { label: 'avg handling time', value: 41, unit: 'sec', delta: '-12%', trend: 'down', spark: [78, 74, 80, 69, 66, 71, 58, 62, 54, 49, 45, 41] },
      { label: 'exceptions', value: 2, unit: 'queued', accent: true, delta: '-1', trend: 'down', spark: [22, 30, 18, 26, 14, 20, 12, 18, 10, 14, 8, 12] },
    
    ],
    trace: [
      ['09:14:02', 'inbound', 'WhatsApp · service booking', 'ok'],
      ['09:14:02', 'match', 'vehicle found · reg MH12 ····', 'ok'],
      ['09:14:03', 'check', 'bay availability · 3 slots', 'ok'],
      ['09:14:03', 'hold', 'Thu 11:30 · bay 2', 'ok'],
      ['09:14:04', 'send', 'confirmation + inspection link', 'ok'],
      ['09:14:41', 'receive', 'customer approved estimate', 'wait'],
      ['09:14:41', 'update', 'job status · parts ordered', 'ok'],
      ['09:14:42', 'notify', 'service advisor · queue cleared', 'wait'],
    
    ],
    done: ['09:14:42', 'done', '4 handoffs removed'],
    loadLabel: 'agent load · one week',
    peak: 'peak Thu 09:00',
    bars: [34, 48, 41, 62, 55, 70, 64, 82, 100, 76, 58, 44],
    queueLabel: 'queue by site',
    queue: [
      { name: 'Whitefield', n: '18 open', pct: '72%' },
      { name: 'Peenya', n: '11 open', pct: '44%' },
      { name: 'Hosur Road', n: '5 open', pct: '20%' },
    ],
    footer: ['elapsed 40.4s', 'human touches 0', 'exceptions 0'],
    report: 'Thu 18:00 · operations digest',
  },

  {
    id: 'realestate',
    workspace: 'Meridian Realty',
    user: ["PS", "Priya S.", "Sales director"],
    search: 'Search enquiries, units, agents',
    action: 'New enquiry',
    filters: ["Unqualified", "This week"],
    sla: 96,
    name: 'Real estate',
    status: 'live',
    agent: 'enquiry_qualifier_agent',
    run: '2884',
    clock: 'Fri 11:02',
    online: ['9', '9'],
    rail: [
      { icon: 'queue', label: 'Queue', count: '41', active: true },
      { icon: 'agents', label: 'Agents', count: '9' },
      { icon: 'calendar', label: 'Viewings', count: '96' },
      { icon: 'alert', label: 'Exceptions', count: '3' },
      { icon: 'reports', label: 'Reports', count: '' },
    
    ],
    kpis: [
      { label: 'enquiries in flight', value: 41, unit: 'open', delta: '+11', trend: 'up', spark: [26, 33, 29, 41, 38, 46, 44, 52, 49, 58, 55, 64] },
      { label: 'qualified today', value: 96, unit: 'leads', delta: '+24%', trend: 'up', spark: [44, 52, 49, 61, 58, 70, 74, 81, 78, 88, 94, 100] },
      { label: 'avg qualification', value: 33, unit: 'sec', delta: '-9%', trend: 'down', spark: [66, 70, 62, 58, 63, 54, 50, 46, 42, 38, 35, 33] },
      { label: 'exceptions', value: 3, unit: 'queued', accent: true, delta: '+1', trend: 'up', spark: [14, 20, 16, 24, 18, 28, 22, 30, 26, 34, 28, 36] },
    
    ],
    trace: [
      ['11:02:17', 'inbound', 'portal feed · 2BHK enquiry', 'ok'],
      ['11:02:17', 'score', 'budget · area · readiness', 'ok'],
      ['11:02:18', 'check', 'agent calendar · 4 windows', 'ok'],
      ['11:02:18', 'offer', 'Sat 15:00 · Powai unit 1204', 'ok'],
      ['11:02:19', 'send', 'viewing link + floor plan', 'ok'],
      ['11:02:52', 'receive', 'viewing confirmed', 'wait'],
      ['11:02:52', 'update', 'CRM stage · viewing booked', 'ok'],
      ['11:02:53', 'chase', 'KYC documents · reminder 1', 'wait'],
    
    ],
    done: ['11:02:53', 'done', 'no call-back needed'],
    loadLabel: 'enquiry load · one week',
    peak: 'peak Sat 11:00',
    bars: [42, 38, 51, 47, 63, 88, 100, 72, 55, 49, 61, 40],
    queueLabel: 'queue by source',
    queue: [
      { name: 'Portal feed', n: '22 open', pct: '64%' },
      { name: 'Website', n: '12 open', pct: '35%' },
      { name: 'Referral', n: '7 open', pct: '20%' },
    ],
    footer: ['elapsed 36.1s', 'human touches 0', 'exceptions 0'],
    report: 'Fri 09:00 · pipeline digest',
  },

  {
    id: 'healthcare',
    workspace: 'Sahyadri Clinics',
    user: ["AK", "Anita K.", "Practice manager"],
    search: 'Search patients, MRNs, appointments',
    action: 'New intake',
    filters: ["Awaiting intake", "Today"],
    sla: 99,
    name: 'Healthcare',
    status: 'live',
    agent: 'clinic_intake_agent',
    run: '1963',
    clock: 'Mon 08:41',
    online: ['8', '8'],
    rail: [
      { icon: 'queue', label: 'Queue', count: '22', active: true },
      { icon: 'agents', label: 'Agents', count: '8' },
      { icon: 'calendar', label: 'Appointments', count: '74' },
      { icon: 'alert', label: 'Exceptions', count: '1' },
      { icon: 'reports', label: 'Reports', count: '' },
    
    ],
    kpis: [
      { label: 'intakes in flight', value: 22, unit: 'open', delta: '+4', trend: 'up', spark: [18, 22, 17, 25, 21, 28, 24, 31, 27, 34, 30, 36] },
      { label: 'completed today', value: 74, unit: 'patients', delta: '+9%', trend: 'up', spark: [40, 47, 44, 55, 51, 63, 60, 71, 68, 79, 86, 94] },
      { label: 'avg verification', value: 52, unit: 'sec', delta: '-15%', trend: 'down', spark: [82, 76, 79, 70, 66, 61, 58, 54, 58, 52, 49, 52] },
      { label: 'exceptions', value: 1, unit: 'queued', accent: true, delta: '0', trend: 'flat', spark: [10, 8, 12, 6, 10, 4, 8, 6, 10, 4, 8, 6] },
    
    ],
    trace: [
      ['08:41:05', 'inbound', 'SMS · new patient intake', 'ok'],
      ['08:41:05', 'match', 'record found · MRN 88··', 'ok'],
      ['08:41:06', 'verify', 'payer eligibility · active', 'ok'],
      ['08:41:06', 'check', 'Dr Rao · Tue 10:20 open', 'ok'],
      ['08:41:07', 'send', 'intake form + directions', 'ok'],
      ['08:41:44', 'receive', 'form complete · consent signed', 'wait'],
      ['08:41:44', 'update', 'EMR · chart prepared', 'ok'],
      ['08:41:45', 'flag', 'recall due · 6-month review', 'wait'],
    
    ],
    done: ['08:41:45', 'done', 'front desk queue cleared'],
    loadLabel: 'intake load · one week',
    peak: 'peak Mon 09:00',
    bars: [100, 74, 66, 58, 62, 47, 35, 81, 69, 54, 60, 44],
    queueLabel: 'queue by clinic',
    queue: [
      { name: 'Indiranagar', n: '11 open', pct: '58%' },
      { name: 'Jayanagar', n: '7 open', pct: '34%' },
      { name: 'HSR Layout', n: '4 open', pct: '19%' },
    ],
    footer: ['elapsed 39.8s', 'human touches 0', 'exceptions 1'],
    report: 'Mon 08:00 · clinic digest',
  },

  {
    id: 'finance',
    workspace: 'Arclight Capital',
    user: ["DV", "Dev V.", "Compliance lead"],
    search: 'Search cases, entities, directors',
    action: 'New case',
    filters: ["Pending review", "This week"],
    sla: 91,
    name: 'Finance',
    status: 'in build',
    agent: 'onboarding_kyc_agent',
    run: '0412',
    clock: 'Wed 14:20',
    online: ['5', '6'],
    rail: [
      { icon: 'queue', label: 'Queue', count: '18', active: true },
      { icon: 'agents', label: 'Agents', count: '5' },
      { icon: 'records', label: 'Onboardings', count: '46' },
      { icon: 'alert', label: 'Exceptions', count: '4' },
      { icon: 'reports', label: 'Reports', count: '' },
    
    ],
    kpis: [
      { label: 'cases in flight', value: 18, unit: 'open', delta: '+3', trend: 'up', spark: [12, 16, 14, 20, 18, 23, 21, 26, 24, 29, 27, 32] },
      { label: 'cleared today', value: 46, unit: 'files', delta: '+12%', trend: 'up', spark: [28, 33, 31, 40, 37, 46, 44, 52, 50, 58, 55, 62] },
      { label: 'avg review time', value: 68, unit: 'sec', delta: '+6%', trend: 'up', spark: [48, 52, 50, 58, 56, 63, 61, 68, 66, 72, 70, 76] },
      { label: 'exceptions', value: 4, unit: 'queued', accent: true, delta: '+2', trend: 'up', spark: [16, 20, 18, 24, 22, 28, 26, 32, 30, 36, 34, 40] },
    
    ],
    trace: [
      ['14:20:11', 'inbound', 'application · business account', 'ok'],
      ['14:20:11', 'fetch', 'registry record · CIN match', 'ok'],
      ['14:20:12', 'verify', 'director IDs · 3 of 3', 'ok'],
      ['14:20:12', 'screen', 'sanctions + PEP · no hit', 'ok'],
      ['14:20:13', 'request', 'proof of address · missing', 'ok'],
      ['14:21:02', 'receive', 'document uploaded', 'wait'],
      ['14:21:02', 'assess', 'risk band · standard', 'ok'],
      ['14:21:03', 'route', 'approver queue · tier 1', 'wait'],
    
    ],
    done: ['14:21:03', 'done', 'file ready for sign-off'],
    loadLabel: 'case load · one week',
    peak: 'peak Wed 14:00',
    bars: [38, 52, 61, 74, 100, 83, 57, 45, 49, 66, 40, 33],
    queueLabel: 'queue by product',
    queue: [
      { name: 'Business accounts', n: '9 open', pct: '50%' },
      { name: 'Lending', n: '6 open', pct: '33%' },
      { name: 'Cards', n: '3 open', pct: '17%' },
    ],
    footer: ['elapsed 52.6s', 'human touches 1', 'exceptions 0'],
    report: 'Thu 17:30 · compliance digest',
  },

  {
    id: 'legal',
    workspace: 'Fairhaven Partners',
    user: ["NS", "Neha S.", "Managing partner"],
    search: 'Search matters, parties, refs',
    action: 'New matter',
    filters: ["Awaiting ID", "This week"],
    sla: 94,
    name: 'Legal',
    status: 'pilot',
    agent: 'matter_intake_agent',
    run: '0176',
    clock: 'Tue 16:05',
    online: ['4', '4'],
    rail: [
      { icon: 'queue', label: 'Queue', count: '12', active: true },
      { icon: 'agents', label: 'Agents', count: '4' },
      { icon: 'records', label: 'Matters', count: '29' },
      { icon: 'alert', label: 'Exceptions', count: '1' },
      { icon: 'reports', label: 'Reports', count: '' },
    
    ],
    kpis: [
      { label: 'matters in flight', value: 12, unit: 'open', delta: '+2', trend: 'up', spark: [8, 11, 9, 14, 12, 16, 14, 19, 17, 22, 20, 24] },
      { label: 'opened today', value: 29, unit: 'files', delta: '+7%', trend: 'up', spark: [20, 24, 22, 29, 27, 34, 32, 39, 37, 44, 42, 48] },
      { label: 'avg intake time', value: 74, unit: 'sec', delta: '-4%', trend: 'down', spark: [70, 66, 72, 64, 68, 60, 63, 57, 60, 54, 57, 51] },
      { label: 'exceptions', value: 1, unit: 'queued', accent: true, delta: '0', trend: 'flat', spark: [8, 12, 10, 14, 12, 16, 14, 18, 16, 20, 18, 22] },
    
    ],
    trace: [
      ['16:05:33', 'inbound', 'email · new matter enquiry', 'ok'],
      ['16:05:33', 'extract', 'parties + jurisdiction', 'ok'],
      ['16:05:34', 'check', 'conflicts register · clear', 'ok'],
      ['16:05:34', 'open', 'matter file · ref M-2291', 'ok'],
      ['16:05:35', 'send', 'engagement letter', 'ok'],
      ['16:06:29', 'receive', 'letter signed · e-sign', 'wait'],
      ['16:06:29', 'update', 'practice system · time open', 'ok'],
      ['16:06:30', 'chase', 'ID verification · reminder 1', 'wait'],
    
    ],
    done: ['16:06:30', 'done', 'matter ready for partner'],
    loadLabel: 'matter load · one week',
    peak: 'peak Tue 16:00',
    bars: [44, 58, 100, 71, 63, 52, 47, 55, 68, 41, 36, 30],
    queueLabel: 'queue by practice',
    queue: [
      { name: 'Commercial', n: '6 open', pct: '50%' },
      { name: 'Property', n: '4 open', pct: '33%' },
      { name: 'Employment', n: '2 open', pct: '17%' },
    ],
    footer: ['elapsed 57.2s', 'human touches 1', 'exceptions 0'],
    report: 'Fri 16:00 · matter digest',
  },
];

export const CYCLE_MS = 6500;
