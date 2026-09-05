import { ALL_PAGE_PATHS } from './nav';

// Copy for every page rendered through PageShell. One entry per path in
// nav.js — PageShell's route generation asserts the two lists match.
//
// This is drafted copy written in the voice of content.js. Read it as a first
// draft for editing, not as final marketing text.

export const PAGES = [
  {
    path: '/platforms/ops-console',
    title: 'Ops Console',
    description: 'One operational record every team reads from: jobs, queues, agents, and the exceptions that need a person.',
    eyebrow: 'Platforms',
    heading: 'A queue management can read on a Monday',
    lede: 'The console is the single place your operation is visible. Every job an agent completed, every record it touched, and every exception it could not resolve, in one view that does not need a weekly export to be trusted.',
    proof: [
      { label: 'Refresh', value: 'Live' },
      { label: 'Agents online', value: '12 / 12' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Exceptions today', value: '2' },
    ],
    sections: [
      { title: 'One record, not five tabs', body: 'Bookings, approvals, intake and follow-ups land in the same queue regardless of which system they originated in. Nobody reconciles spreadsheets to find out what happened yesterday.' },
      { title: 'Exceptions are the interface', body: 'Agents complete the routine work silently. The console surfaces only what needs judgement, named and attributed, so a supervisor works a short list instead of auditing a long one.' },
      { title: 'Reporting that matches reality', body: 'The numbers on the dashboard are the same records the agents wrote. There is no separate reporting pipeline to fall out of sync with the operation it describes.' },
    ],
    related: [
      { label: 'Agent Runtime', path: '/platforms/agent-runtime' },
      { label: 'Integrations Layer', path: '/platforms/integrations' },
    ],
    cta: {
      heading: 'See the console against your own queue',
      body: 'We will run a scope call, map your handoffs, and show the console populated with the work your team does today.',
    },
  },
  {
    path: '/platforms/agent-runtime',
    title: 'Agent Runtime',
    description: 'Where agents execute, retry, and hand work to one another, and where a failed step becomes a named exception instead of a silent drop.',
    eyebrow: 'Platforms',
    heading: 'Agents that finish, or say why they stopped',
    lede: 'The runtime is where every agent executes. It holds the run open, retries the step that failed, passes work between agents, and raises a named exception the moment it cannot proceed on its own.',
    proof: [
      { label: 'Median task completion', value: '40s' },
      { label: 'Was', value: '4 to 6 hours' },
      { label: 'Human touches', value: '0 per booking' },
      { label: 'Uptime', value: '99.98%' },
    ],
    sections: [
      { title: 'A run is a record, not a black box', body: 'Each agent runs under a name and a run number. A service centre booking is handled by service_centre_agent under its own run number, and every step it takes is timestamped in order: match the vehicle, check bay availability, hold the slot, send the confirmation. You can read what happened without asking anyone what happened.' },
      { title: 'Retry first, then name the failure', body: 'A step that fails is retried inside the run. If it still cannot complete, the runtime does not drop it and move on. It closes the run with an exception attributed to the agent, the run, and the step that stopped, and puts it in front of a person in the console.' },
      { title: 'Handoffs are explicit', body: 'Work moves between agents the way it moves between people, except the transfer is recorded. One agent holds the bay, another updates the job status when the estimate is approved, and a third notifies the advisor. Nothing waits in an inbox because nobody knew it was theirs.' },
      { title: 'Capacity you can see', body: 'The runtime reports its own health: agents online against agents expected, uptime, and the median time a task takes to complete. Twelve of twelve agents online at 99.98% uptime is what we run against, and it is on the console you keep rather than in a report we send.' },
    ],
    related: [
      { label: 'Ops Console', path: '/platforms/ops-console' },
      { label: 'Integrations Layer', path: '/platforms/integrations' },
    ],
    cta: {
      heading: 'Run one of your workflows through it',
      body: 'Pick a process that stalls today. We will map the handoffs, model it as a run, and show you where the exceptions would surface.',
    },
  },
  {
    path: '/platforms/integrations',
    title: 'Integrations Layer',
    description: 'The connection into the systems you already run: your CRM, DMS, EMR, calendars and messaging, with no rip and replace.',
    eyebrow: 'Platforms',
    heading: 'Your existing stack. No rip and replace.',
    lede: 'Agents work the same records your team works. The integrations layer connects them to the systems already in place, under your permissions, so the operation changes without the software underneath it changing.',
    proof: [
      { label: 'Built on', value: 'Your existing stack' },
      { label: 'Protocols', value: 'REST · webhooks · SQL' },
      { label: 'Channels', value: 'WhatsApp · email · SMS' },
      { label: 'First system live', value: '6 wks' },
    ],
    sections: [
      { title: 'Into the systems you already pay for', body: 'A CRM, a DMS, a practice management system, portal feeds, calendars and an e-signature tool are not obstacles to automation. They are the record. Agents read and write them directly rather than asking your team to maintain a second copy alongside them.' },
      { title: 'One version of the truth', body: 'The usual failure is not a missing system, it is three systems holding three answers and staff reconciling them by hand. The layer settles that: an action an agent takes lands in the system of record and is visible everywhere else that reads from it.' },
      { title: 'Your permissions, your escalation rules', body: 'Agents are given scoped access, the same way a coordinator would be. What they may action alone, what they must route for approval, and what they are not permitted to touch are agreed before the build and enforced in the connection itself.' },
      { title: 'Scoped before it is wired', body: 'Every integration is mapped in the design step and approved before a line is written, so the systems it touches, the fields it writes, and the volume it runs against are known ahead of cutover rather than discovered during it.' },
    ],
    related: [
      { label: 'Ops Console', path: '/platforms/ops-console' },
      { label: 'Agent Runtime', path: '/platforms/agent-runtime' },
    ],
    cta: {
      heading: 'Bring us your stack as it is',
      body: 'We will walk the systems you run today and show what an agent can action in each one before anything is committed.',
    },
  },
  {
    path: '/solutions/agentic-ai',
    title: 'Agentic AI & Automation',
    description: 'Custom agents that complete multi-step operational tasks end to end, built against your APIs, your permissions, and your escalation rules.',
    eyebrow: 'Solutions',
    heading: 'Custom agents that complete the work end to end',
    lede: 'Agents that complete multi-step operational tasks end to end, with a full trace of every action. Built against your APIs, your permissions, and your escalation rules rather than around them.',
    proof: [
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0' },
      { label: 'Build window', value: '8 to 10 wks' },
      { label: 'Engagement', value: 'Build, then run' },
    ],
    sections: [
      { title: 'Built the way a coordinator works', body: 'Read the request, check the record, take the action, log the outcome. That is the loop a trained coordinator runs all day, and it is the loop the agent is built to run: against your systems, with the same information a person would have opened four tabs to find.' },
      { title: 'Multi-step, not single-turn', body: 'Most work is not one action. It is an enquiry that becomes a match, a check, a hold, a confirmation, and a follow-up thirty seconds later when the customer replies. The agent carries the whole sequence, including the waiting, so nothing stalls between steps because a person did not pick it back up.' },
      { title: 'A trace behind every action', body: 'Every step an agent takes is written down: what came in, what it matched, what it changed, and when. If a supervisor asks why a booking moved, the answer is a record, not a reconstruction.' },
      { title: 'Faster, but only where you said so', body: 'Median task completion drops to around 40 seconds on work that was taking four to six hours, and it does so only on the work you have decided an agent should hold. What must route to a person is fixed in the design step.' },
    ],
    related: [
      { label: 'Service Centre Automation', path: '/solutions/service-centre' },
      { label: 'Productised Systems', path: '/solutions/productised-systems' },
    ],
    cta: {
      heading: 'Start with the process that stalls most',
      body: 'We run a scope call on one workflow, agree what success looks like, and fix the scope and the price before anything is designed.',
    },
  },
  {
    path: '/solutions/real-estate',
    title: 'Real Estate Automation',
    description: 'Enquiry qualification, viewing scheduling, and document chasing run continuously, so agents spend the day with buyers who are ready.',
    eyebrow: 'Solutions',
    heading: 'Enquiries qualified, viewings booked, documents chased',
    lede: 'Enquiry qualification, viewing scheduling and document chasing handled continuously so agents spend their day with buyers who are ready. What gets delivered is qualified enquiries, confirmed viewings, and a document checklist that closes itself.',
    proof: [
      { label: 'Build window', value: '6 to 8 wks' },
      { label: 'Connects', value: 'CRM · portals · calendars' },
      { label: 'Built on', value: 'Your existing stack' },
      { label: 'Human touches', value: '0' },
    ],
    sections: [
      { title: 'Qualification before routing', body: 'Portal and website enquiries are scored against budget, area, and readiness as they arrive. The agent who picks one up is looking at a shortlist with the reasoning attached, rather than a list of names to ring back in an order nobody chose.' },
      { title: 'Viewings offered against a real calendar', body: 'A viewing is proposed from the windows an agent actually has free, then confirmed and written into the CRM. There is no call-back loop, and no double booking that surfaces on a Saturday morning.' },
      { title: 'Documents that chase themselves', body: 'Identity and KYC paperwork is requested, reminded, and re-reminded until it arrives, then filed against the deal. The checklist closes without anyone keeping it in their head.' },
      { title: 'What stays with the agent', body: 'Negotiation, judgement, and the relationship. The system removes the call-backs and the chasing around them; it does not sell the unit.' },
    ],
    related: [
      { label: 'Real Estate', path: '/industries/real-estate' },
      { label: 'Agentic AI & Automation', path: '/solutions/agentic-ai' },
    ],
    cta: {
      heading: 'Put it against a week of your enquiries',
      body: 'We map how enquiries reach your agents today, then show what qualification and scheduling look like when they run before anyone picks up.',
    },
  },
  {
    path: '/solutions/healthcare',
    title: 'Healthcare & Clinic Automation',
    description: 'Intake, eligibility checks, reminders and recall lists run before the patient reaches the desk, with clinical judgement left to clinicians.',
    eyebrow: 'Solutions',
    heading: 'The desk work done before the patient arrives',
    lede: 'Intake, eligibility checks, reminders, and recall lists run before the patient reaches the desk. What gets delivered is completed intake, verified coverage, and a filled schedule with named exceptions.',
    proof: [
      { label: 'Build window', value: '8 wks' },
      { label: 'Connects', value: 'EMR · practice mgmt · payers' },
      { label: 'Built on', value: 'Your existing stack' },
      { label: 'Engagement', value: 'Build, then run' },
    ],
    sections: [
      { title: 'Intake completed by message', body: 'The patient fills in intake and signs consent on their phone, in their own time. The chart is prepared before they walk in, so the first minute at the desk is not a form.' },
      { title: 'Coverage verified, not assumed', body: 'Eligibility is checked against the payer while the appointment is still days away. Where cover is in doubt the system says so early, with a name and a reason, instead of the front desk finding out on the morning.' },
      { title: 'Reminders and recalls that run themselves', body: 'Reminders go out on schedule and recall lists are worked continuously, so a six-month review is flagged when it falls due rather than when someone has time to run the report.' },
      { title: 'Clinical judgement stays with clinicians', body: 'The system handles intake, coverage, scheduling, and follow-up. It does not triage, advise, or make a clinical call, and the exceptions it raises are administrative ones for the desk to work.' },
    ],
    related: [
      { label: 'Healthcare', path: '/industries/healthcare' },
      { label: 'Agentic AI & Automation', path: '/solutions/agentic-ai' },
    ],
    cta: {
      heading: 'Take one clinic and one week',
      body: 'We sit with the front desk, map every handoff between enquiry and appointment, and show which of them an agent can hold.',
    },
  },
  {
    path: '/solutions/service-centre',
    title: 'Service Centre Automation',
    description: 'One agent across booking, estimate approval, parts status and customer updates, working the same records your advisors and DMS already use.',
    eyebrow: 'Solutions',
    heading: 'One agent across booking, estimate and update',
    lede: 'One agent covering booking, estimate approval, parts status, and customer updates, working the same records your advisors and DMS already use. Bookings held, estimates approved, and a bay schedule that reflects reality by 9am.',
    proof: [
      { label: 'Build window', value: '6 to 8 wks' },
      { label: 'Connects', value: 'DMS · booking · WhatsApp' },
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'Booking held while the message is still open', body: 'The enquiry arrives on WhatsApp, the vehicle is matched, bay availability is checked, and a slot is held with a confirmation and an inspection link sent back. The advisor sees a booked job, not a message to answer.' },
      { title: 'Estimates that do not sit waiting', body: 'The approval goes out, the reply comes back, and the job status and parts order move on it. The common fault is not capacity, it is an estimate sitting unapproved because nobody called back, and that is the loop this closes.' },
      { title: 'A bay schedule that matches the shop floor', body: 'Because the agent writes to the same records the advisors and the DMS use, the schedule at 9am is the schedule that is actually being worked. Nobody reconciles three inboxes and a spreadsheet to find out.' },
      { title: 'Advisors on the jobs that need them', body: 'Routine confirmation, chasing, and status updates run without a person. What reaches an advisor is the exception: the vehicle that does not match, the approval that never came, the part that is not in the catalogue.' },
    ],
    related: [
      { label: 'Automotive', path: '/industries/automotive' },
      { label: 'Agentic AI & Automation', path: '/solutions/agentic-ai' },
    ],
    cta: {
      heading: 'Bring us one site and its backlog',
      body: 'We walk the process from enquiry to invoice, meet the advisors who run it today, and agree what an agent takes before anything is built.',
    },
  },
  {
    path: '/solutions/productised-systems',
    title: 'Productised Systems',
    description: 'Systems we have already built and deployed, configured to your data instead of designed from scratch: a shorter build, the same operating model.',
    eyebrow: 'Solutions',
    heading: 'Already built. Configured to your data.',
    lede: 'Systems we have already built and deployed, configured to your data instead of designed from scratch. A shorter build, the same operating model: a running system, the standard dashboard, and a managed operation.',
    proof: [
      { label: 'Build window', value: '3 to 5 wks' },
      { label: 'Connects', value: 'Standard connector set' },
      { label: 'Built on', value: 'Your existing stack' },
      { label: 'Engagement', value: 'Build, then run' },
    ],
    sections: [
      { title: 'Configured, not commissioned', body: 'The workflow, the agent behaviour, and the dashboard already exist because they are running elsewhere. What we do for you is connect them to your systems and set them to your rules, which is why the window is three to five weeks rather than eight to ten.' },
      { title: 'The same operating model', body: 'A productised build is not a lighter product. It is the same runtime, the same console, and the same managed operation as a bespoke system, entered at a different point.' },
      { title: 'Where it fits, and where it does not', body: 'If your process looks like a process we have already automated, this is the shorter route. If it does not, a fixed-scope build is the honest answer and we will say so at the scope call rather than at the demo.' },
      { title: 'Standard connectors first', body: 'The connector set covers the systems these verticals usually run on. Anything outside it is scoped as work, priced, and agreed before the build, not absorbed quietly into the timeline.' },
    ],
    related: [
      { label: 'Service Centre Automation', path: '/solutions/service-centre' },
      { label: 'Real Estate Automation', path: '/solutions/real-estate' },
    ],
    cta: {
      heading: 'Find out which route you are on',
      body: 'One scope call tells us whether a system we already run fits your operation or whether yours needs building. Either way you leave with a scope and a price.',
    },
  },
  {
    path: '/industries/automotive',
    title: 'Automotive',
    description: 'Service centres and dealer groups running bookings, estimates and approvals through one agent instead of three inboxes. Live since February 2026.',
    eyebrow: 'Industries',
    heading: 'Service bookings answered in seconds, not shifts',
    lede: 'Live in automotive since February 2026. One agent takes the WhatsApp enquiry, finds the vehicle, holds a bay, and returns a confirmed slot with an inspection link before an advisor has read the message.',
    proof: [
      { label: 'Live since', value: 'Feb 2026' },
      { label: 'Replaced', value: '3 inboxes · 1 spreadsheet' },
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'What it replaced', body: 'Three inboxes and a spreadsheet. Bookings arrived on WhatsApp, on the phone, and through the booking tool, and an advisor held the reconciliation in their head. Since February 2026 those routes land in one queue, and the record of what was agreed is the same record the DMS reads.' },
      { title: 'One booking, forty seconds', body: 'Enquiry in, vehicle matched, bay availability checked, slot held, confirmation and inspection link sent. When the customer approves the estimate the job status moves and parts are ordered on it. The handoffs that used to pass between people do not happen at all.' },
      { title: 'The backlog, by site', body: 'A group running several sites reads each queue separately and against the others, so a backlog forming at one site is visible the day it forms rather than in a month-end report. In the console, an automotive workspace shows load peaking on a Thursday morning, which is a thing you can staff for once you can see it.' },
      { title: 'What still reaches an advisor', body: 'A vehicle that does not match, an approval that never came back, a part that is not in the catalogue. Exceptions are named and attributed, and they are the only thing an advisor is asked to work. The routine confirmations run without one.' },
    ],
    related: [
      { label: 'Service Centre Automation', path: '/solutions/service-centre' },
      { label: 'Ops Console', path: '/platforms/ops-console' },
    ],
    cta: {
      heading: 'Compare it against your own service queue',
      body: 'We will walk one site from enquiry to invoice, map the handoffs, and show the console populated with the work your advisors did last week.',
    },
  },
  {
    path: '/industries/real-estate',
    title: 'Real Estate',
    description: 'Brokerages and developers whose agents open the day on a shortlist of qualified enquiries rather than a list of calls to return. Live since April 2026.',
    eyebrow: 'Industries',
    heading: 'Every enquiry qualified before an agent sees it',
    lede: 'Live in real estate since April 2026. Enquiries are qualified as they arrive and reach an agent with a viewing already offered, so the day starts on a shortlist instead of a call-back list.',
    proof: [
      { label: 'Live since', value: 'Apr 2026' },
      { label: 'Replaced', value: 'Manual call-backs' },
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'What a sales director reads on Friday', body: 'One pipeline digest, built from the same records the agents worked rather than assembled afterwards from three of them. Open enquiries, what was qualified this week, and the small number of exceptions still waiting on a person. Nothing in it has to be reconciled before it can be believed.' },
      { title: 'The call-back list is gone', body: 'An enquiry used to arrive, join a list, and wait for somebody to work down it, by which point the buyer had spoken to two other brokerages. Since April 2026 there is no list, because the qualification and the offer of a viewing have already happened by the time an agent opens it.' },
      { title: 'A shortlist, not missed calls', body: 'The reasoning travels with the enquiry, so an agent picking one up can see why it is theirs and what has already been agreed with the buyer. Negotiation and the relationship stay where they were. The chasing around them does not.' },
      { title: 'Where the pipeline is coming from', body: 'The queue is broken out by source, so a brokerage can see which channel is carrying it and which is quiet. In the console, a brokerage workspace shows the portal feed holding most of the open enquiries and the load peaking on a Saturday morning, when the fewest people are at a desk.' },
    ],
    related: [
      { label: 'Real Estate Automation', path: '/solutions/real-estate' },
      { label: 'Ops Console', path: '/platforms/ops-console' },
    ],
    cta: {
      heading: 'Read your own pipeline this way',
      body: 'Give us the enquiries one office received last week and we will show what a Friday digest would have said about them.',
    },
  },
  {
    path: '/industries/healthcare',
    title: 'Healthcare',
    description: 'Clinics and multi-site providers whose front desk works a named list of exceptions instead of a queue of unknowns. Live since May 2026.',
    eyebrow: 'Industries',
    heading: 'Intake and coverage settled before arrival',
    lede: 'Live in healthcare since May 2026. Patients complete intake by message, coverage is verified against the payer, and the desk gets a single list of exceptions to work rather than a queue of unknowns.',
    proof: [
      { label: 'Live since', value: 'May 2026' },
      { label: 'Replaced', value: 'Paper intake · phone checks' },
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'What the front desk stopped doing', body: 'Filling in a form at the counter while the room waited. Holding on a line to a payer to find out whether somebody was covered. Both were unpaid work done at the worst possible moment, and since May 2026 neither is done at the desk at all.' },
      { title: 'What arrives instead', body: 'A prepared chart, a coverage status that has already been checked, and a consent that has already been signed. The desk opens the day against a named list of exceptions, not a set of appointments it knows nothing about until each one walks in.' },
      { title: 'Several clinics, one queue', body: 'A multi-site group reads every clinic from the same console, so a site running behind is visible next to the ones that are not. In the console, a clinic workspace shows intake peaking on a Monday morning, which is when a front desk has least time to work that out for itself.' },
      { title: 'Recalls that do not wait for a report', body: 'A six-month review is flagged when it falls due rather than when somebody has time to run the list. The clinic knows on Monday which slots are going unfilled instead of learning it at the end of the month.' },
    ],
    related: [
      { label: 'Healthcare & Clinic Automation', path: '/solutions/healthcare' },
      { label: 'Ops Console', path: '/platforms/ops-console' },
    ],
    cta: {
      heading: 'Start with your busiest Monday',
      body: 'We will take one week of intake across your clinics and show what the desk would have been holding on the morning the load peaked.',
    },
  },
];

// Fails loudly in dev if nav.js and pages.js drift apart. A menu item with no
// copy would otherwise silently render the 404 page.
if (import.meta.env.DEV) {
  const written = new Set(PAGES.map((p) => p.path));
  const missing = ALL_PAGE_PATHS.filter((p) => !written.has(p));
  if (missing.length) console.warn('[pages] no copy yet for:', missing.join(', '));
}
