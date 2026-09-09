import { ALL_PAGE_PATHS } from './nav';

// Copy for every page rendered through PageShell. One entry per path in
// nav.js — PageShell's route generation asserts the two lists match.
//
// This is drafted copy written in the voice of content.js. Read it as a first
// draft for editing, not as final marketing text.

export const PAGES = [
  {
    path: '/platforms/ops-console',
    title: 'Your operations dashboard',
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
      { title: 'No more five open tabs', body: 'Bookings, approvals, intake and follow-ups land in the same queue regardless of which system they originated in. Nobody reconciles spreadsheets to find out what happened yesterday.' },
      { title: 'Exceptions are the interface', body: 'Agents complete the routine work silently. The console surfaces only what needs judgement, named and attributed, so a supervisor works a short list instead of auditing a long one.' },
      { title: 'Reporting that matches reality', body: 'The numbers on the dashboard are the same records the agents wrote. There is no separate reporting pipeline to fall out of sync with the operation it describes.' },
    ],
    deliverables: [
      { title: 'One queue', body: 'Every job lands in one list, whichever system it started in. Nobody reconciles inboxes to find out where something is.' },
      { title: 'Named exceptions', body: 'The handful that need a decision, attributed to a person, with the reason they stopped. Everything else completes without you.' },
      { title: 'Ageing you can see', body: 'How long work has been sitting, visible the day it happens and not at month end.' },
      { title: 'A report that matches', body: 'Built from the same records your team works. There is no second reporting pipeline to fall out of step with reality.' },
    ],
    faq: [
      { q: 'Does my team have to work inside another system?', a: 'No. They keep using the software they already use. The dashboard is for whoever needs the overview. Usually that is an owner, a general manager or an operations lead.' },
      { q: 'Who can see which sites and which figures?', a: 'Access follows the permissions you already have. We agree who sees what during the design step, before anything is built.' },
      { q: 'What if the dashboard disagrees with our own system?', a: 'It cannot. Every figure comes from the same actions your team and our systems take against your records. Nothing is recalculated in a separate place.' },
      { q: 'Is this another subscription to manage?', a: 'The engagement is a fixed-scope build, then a managed operation. The dashboard comes with the system. It is not sold separately.' },
    ],
    related: [
      { label: 'Always running', path: '/platforms/agent-runtime' },
      { label: 'Works with your software', path: '/platforms/integrations' },
    ],
    cta: {
      heading: 'See the console against your own queue',
      body: 'We will run a scope call, map your handoffs, and show the console populated with the work your team does today.',
    },
  },
  {
    path: '/platforms/agent-runtime',
    title: 'Always-on operations',
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
    deliverables: [
      { title: 'Cover outside office hours', body: 'An enquiry that arrives at nine in the evening gets answered at nine in the evening.' },
      { title: 'Retries that do not need chasing', body: 'When a system is briefly unavailable the work is retried. It does not sit in a failed state waiting for somebody to notice.' },
      { title: 'A named exception when it stops', body: 'If something genuinely cannot complete, it reaches a person with the reason attached. Nothing disappears quietly.' },
      { title: 'A full record of every action', body: 'What was done, when, and against which record. If a customer disputes something, you can show what happened.' },
    ],
    faq: [
      { q: 'What happens when it gets something wrong?', a: 'It stops and routes to a person as a named exception, with the reason. What it may act on alone and what it must route for approval is agreed with you in the design step and enforced in the build.' },
      { q: 'Do we need anyone on call?', a: 'No. We run it. Exceptions arrive in your queue during your hours; keeping the systems up is our side of the engagement.' },
      { q: 'What if our own software goes down?', a: 'Work waits and retries rather than failing. When your system comes back the queue clears without anyone re-entering anything.' },
      { q: 'Can we turn parts of it off?', a: 'Yes. Each step is scoped with you, and anything you would rather keep with a person stays with a person.' },
    ],
    related: [
      { label: 'Your dashboard', path: '/platforms/ops-console' },
      { label: 'Works with your software', path: '/platforms/integrations' },
    ],
    cta: {
      heading: 'Run one of your workflows through it',
      body: 'Pick a process that stalls today. We will map the handoffs, model it as a run, and show you where the exceptions would surface.',
    },
  },
  {
    path: '/platforms/integrations',
    title: 'Works with your software',
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
      { title: 'Into the systems you already pay for', body: 'A CRM, a DMS, a practice management system, portal feeds, calendars and an e-signature tool are not obstacles to automation. They are the record. Agents read and write them directly, so nobody has to keep a second copy alongside.' },
      { title: 'One version of the truth', body: 'The usual failure is not a missing system, it is three systems holding three answers and staff reconciling them by hand. The layer settles that: an action an agent takes lands in the system of record and is visible everywhere else that reads from it.' },
      { title: 'Your permissions, your escalation rules', body: 'Agents are given scoped access, the same way a coordinator would be. What they may action alone, what they must route for approval, and what they are not permitted to touch are agreed before the build and enforced in the connection itself.' },
      { title: 'Scoped before it is wired', body: 'Every integration is mapped in the design step and approved before a line is written, so the systems it touches, the fields it writes, and the volume it runs against are all settled before cutover, and never discovered during it.' },
    ],
    deliverables: [
      { title: 'No migration', body: 'Your data stays where it is. We read and write to the systems you already run. Nobody gets moved onto ours.' },
      { title: 'No second system to keep in sync', body: 'One record stays the record. Nothing is copied into a parallel database that drifts within a month.' },
      { title: 'Your permissions', body: 'Our systems act under access you grant and can withdraw, with the same limits your own staff work within.' },
      { title: 'Nobody retrained', body: 'Your team carries on in the software they know. The change is that less reaches them. Where they work stays exactly the same.' },
    ],
    faq: [
      { q: 'What if our software is old, or in-house?', a: 'That is common and usually workable. The scope call establishes what your systems can expose before anything is promised or priced.' },
      { q: 'Will this slow our systems down?', a: 'It works the way a member of staff does. It reads and writes records as work arrives, at the pace the work arrives.' },
      { q: 'What happens to the connection if we change software later?', a: 'The connection is rebuilt against the new system. The work it does, and the record of what it did, carries over.' },
      { q: 'Do you need access to everything?', a: 'No, and we would rather not have it. Access is scoped to the processes in the build and agreed in writing first.' },
    ],
    related: [
      { label: 'Your dashboard', path: '/platforms/ops-console' },
      { label: 'Always running', path: '/platforms/agent-runtime' },
    ],
    cta: {
      heading: 'Bring us your stack as it is',
      body: 'We will walk the systems you run today and show what an agent can action in each one before anything is committed.',
    },
  },
  {
    path: '/solutions/agentic-ai',
    title: 'Operations automation',
    description: 'Custom agents that complete multi-step operational tasks end to end, built against your APIs, your permissions, and your escalation rules.',
    eyebrow: 'Solutions',
    heading: 'Custom agents that complete the work end to end',
    lede: 'Agents that complete multi-step operational tasks end to end, with a full trace of every action. Built against your APIs, your permissions and your escalation rules. It works inside them, never around them.',
    proof: [
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0' },
      { label: 'Build window', value: '8 to 10 wks' },
      { label: 'Engagement', value: 'Build, then run' },
    ],
    sections: [
      { title: 'Built the way a coordinator works', body: 'Read the request, check the record, take the action, log the outcome. That is the loop a trained coordinator runs all day, and it is the loop the agent is built to run: against your systems, with the same information a person would have opened four tabs to find.' },
      { title: 'Most work is more than one step', body: 'Almost nothing is a single action. It is an enquiry that becomes a match, a check, a hold, a confirmation, and a follow-up thirty seconds later when the customer replies. The agent carries the whole sequence, including the waiting, so nothing stalls between steps because a person did not pick it back up.' },
      { title: 'A trace behind every action', body: 'Every step an agent takes is written down: what came in, what it matched, what it changed, and when. If a supervisor asks why a booking moved, the answer is already there. Nobody has to piece it back together.' },
      { title: 'Faster, but only where you said so', body: 'Median task completion drops to around 40 seconds on work that was taking four to six hours, and it does so only on the work you have decided an agent should hold. What must route to a person is fixed in the design step.' },
    ],
    deliverables: [
      { title: 'A mapped operation', body: 'Before anything is built you get the map: every handoff in the process, who touches it, and where it waits. Yours to keep either way.' },
      { title: 'A system that finishes work', body: 'Not a prompt box. It reads the request, checks the record, takes the action and logs the outcome, against your live systems.' },
      { title: 'Agreed limits', body: 'What it may do alone and what it must route to a person, decided by you in the design step and enforced in the build.' },
      { title: 'A run record', body: 'Every action it took, against which record, and when. You can answer a customer or an auditor without reconstructing anything.' },
    ],
    faq: [
      { q: 'How is this different from the automation we already have?', a: 'Rules stop at the first thing they did not expect. These systems complete multi-step work and, when they genuinely cannot, hand it to a person with the reason attached. Nothing fails silently.' },
      { q: 'What does it cost?', a: 'Scope and price are fixed before a line is written, at the design step. After launch it is a managed operation. There is no per-seat licence.' },
      { q: 'How long until something is running?', a: 'Six to ten weeks to a first system in production, depending on how many systems it has to reach.' },
      { q: 'What happens to the people doing this work now?', a: 'The routine part stops reaching them. What remains is the exceptions, which is the part that needed a person in the first place.' },
    ],
    related: [
      { label: 'Service centres', path: '/solutions/service-centre' },
      { label: 'Ready-made systems', path: '/solutions/productised-systems' },
    ],
    cta: {
      heading: 'Start with the process that stalls most',
      body: 'We run a scope call on one workflow, agree what success looks like, and fix the scope and the price before anything is designed.',
    },
  },
  {
    path: '/solutions/real-estate',
    title: 'Real estate automation',
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
      { title: 'Qualification before routing', body: 'Portal and website enquiries are scored against budget, area, and readiness as they arrive. The agent who picks one up is looking at a shortlist with the reasoning attached, instead of a list of names to ring back in an order nobody chose.' },
      { title: 'Viewings offered against a real calendar', body: 'A viewing is proposed from the windows an agent actually has free, then confirmed and written into the CRM. There is no call-back loop, and no double booking that surfaces on a Saturday morning.' },
      { title: 'Documents that chase themselves', body: 'Identity and KYC paperwork is requested, reminded, and re-reminded until it arrives, then filed against the deal. The checklist closes without anyone keeping it in their head.' },
      { title: 'What stays with the agent', body: 'Negotiation, judgement, and the relationship. The system removes the call-backs and the chasing around them; it does not sell the unit.' },
    ],
    deliverables: [
      { title: 'Enquiries answered on arrival', body: 'Portal, web and WhatsApp enquiries get a real answer as they land. No holding reply, no call-back queue.' },
      { title: 'Qualification before contact', body: 'Scored against budget, area and readiness, so what reaches an agent is already worth their hour.' },
      { title: 'A viewing already offered', body: 'Routed with a slot already proposed against the live calendar, so the agent is not starting from nothing.' },
      { title: 'Document chasing that continues', body: 'Paperwork is followed up without anyone remembering to. The checklist closes itself.' },
    ],
    faq: [
      { q: 'Will it talk to buyers in our name?', a: 'It answers in your brand and within the limits you set. Anything outside them is routed to an agent with the context attached.' },
      { q: 'Our agents have their own way of working. Does this change it?', a: 'No. They keep their CRM and their calendar. What changes is which enquiries reach them and how much is already done when they do.' },
      { q: 'What about portal feeds we do not control?', a: 'Portal and web enquiries are read as they arrive. We connect to the feeds you already receive. No portal has to change anything.' },
      { q: 'What if a lead is mishandled?', a: 'Scoring rules are agreed with you and visible. Anything the system is unsure of goes to a person. Nothing is decided quietly.' },
    ],
    related: [
      { label: 'Real Estate', path: '/industries/real-estate' },
      { label: 'Operations automation', path: '/solutions/agentic-ai' },
    ],
    cta: {
      heading: 'Put it against a week of your enquiries',
      body: 'We map how enquiries reach your agents today, then show what qualification and scheduling look like when they run before anyone picks up.',
    },
  },
  {
    path: '/solutions/healthcare',
    title: 'Healthcare and clinic automation',
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
      { title: 'Reminders and recalls that run themselves', body: 'Reminders go out on schedule and recall lists are worked continuously, so a six-month review is flagged the week it falls due, without waiting for someone to run the report.' },
      { title: 'Clinical judgement stays with clinicians', body: 'The system handles intake, coverage, scheduling, and follow-up. It does not triage, advise, or make a clinical call, and the exceptions it raises are administrative ones for the desk to work.' },
    ],
    deliverables: [
      { title: 'Intake completed before arrival', body: 'Patients complete intake by message. The first minute at the desk is not a form.' },
      { title: 'Cover verified with the payer', body: 'Eligibility checked on arrival of the booking, so the desk is not finding out on the morning.' },
      { title: 'A named list of exceptions', body: 'The desk works the handful of unresolved cases and nothing else.' },
      { title: 'Recalls that run themselves', body: 'Reviews are flagged the week they fall due, without waiting for somebody to find time for the list.' },
    ],
    faq: [
      { q: 'Does anything clinical get decided by a system?', a: 'No. Clinical judgement stays with clinicians. This covers intake, cover, scheduling, reminders and recall. All the administrative work around the appointment.' },
      { q: 'How is patient data handled?', a: 'It stays in your clinical records. Nothing is migrated into another database, and access is scoped to the processes in the build and agreed in writing.' },
      { q: 'What if a payer check fails?', a: 'It becomes a named exception with the reason, in time for the desk to act on it. No surprises on the morning.' },
      { q: 'Will our front desk staff need training?', a: 'No. They work in the same practice software. Less arrives at them and what does arrive has already been checked.' },
    ],
    related: [
      { label: 'Healthcare', path: '/industries/healthcare' },
      { label: 'Operations automation', path: '/solutions/agentic-ai' },
    ],
    cta: {
      heading: 'Take one clinic and one week',
      body: 'We sit with the front desk, map every handoff between enquiry and appointment, and show which of them an agent can hold.',
    },
  },
  {
    path: '/solutions/service-centre',
    title: 'Service centre automation',
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
      { title: 'Booking held while the message is still open', body: 'The enquiry arrives on WhatsApp, the vehicle is matched, bay availability is checked, and a slot is held with a confirmation and an inspection link sent back. By the time the advisor looks at it, it is a booked job.' },
      { title: 'Estimates that do not sit waiting', body: 'The approval goes out, the reply comes back, and the job status and parts order move on it. The common fault is not capacity, it is an estimate sitting unapproved because nobody called back, and that is the loop this closes.' },
      { title: 'A bay schedule that matches the shop floor', body: 'Because the agent writes to the same records the advisors and the DMS use, the schedule at 9am is the schedule that is actually being worked. Nobody reconciles three inboxes and a spreadsheet to find out.' },
      { title: 'Advisors on the jobs that need them', body: 'Routine confirmation, chasing, and status updates run without a person. What reaches an advisor is the exception: the vehicle that does not match, the approval that never came, the part that is not in the catalogue.' },
    ],
    deliverables: [
      { title: 'Bookings answered in seconds', body: 'The enquiry is taken, the vehicle found, a bay held and a confirmed slot returned before an advisor has read the message.' },
      { title: 'Estimates chased to a decision', body: 'Approvals are followed up until they are answered, so jobs are not sitting unapproved because nobody called back.' },
      { title: 'A bay schedule that is real', body: 'The schedule at nine is the schedule being worked, because it is written from the same records the advisors and your dealer system use.' },
      { title: 'Advisors on the jobs that need them', body: 'What reaches an advisor is the exception: the vehicle that does not match, the part that is not in the catalogue.' },
    ],
    faq: [
      { q: 'Will customers know they are not talking to a person?', a: 'You decide the tone and what it says. It answers within agreed limits and hands to an advisor the moment something falls outside them.' },
      { q: 'Does this replace our dealer management system?', a: 'No. It works the same records your advisors and your dealer system already use. Nothing is ripped out.' },
      { q: 'What about parts availability?', a: 'It checks against your catalogue. Where a part is not there, that becomes a named exception for an advisor rather than a booking that fails on the day.' },
      { q: 'We have several sites. Does it handle that?', a: 'Yes. Each site\'s queue is read separately and against the others, so a backlog forming at one is visible the day it forms.' },
    ],
    related: [
      { label: 'Automotive', path: '/industries/automotive' },
      { label: 'Operations automation', path: '/solutions/agentic-ai' },
    ],
    cta: {
      heading: 'Bring us one site and its backlog',
      body: 'We walk the process from enquiry to invoice, meet the advisors who run it today, and agree what an agent takes before anything is built.',
    },
  },
  {
    path: '/solutions/productised-systems',
    title: 'Ready-made systems',
    description: 'Systems we have already built and deployed, then configured to your data: a shorter build, the same operating model.',
    eyebrow: 'Solutions',
    heading: 'Already built. Configured to your data.',
    lede: 'Systems we have already built and deployed, then configured to your data. A shorter build, the same operating model: a running system, the standard dashboard, and a managed operation.',
    proof: [
      { label: 'Build window', value: '3 to 5 wks' },
      { label: 'Connects', value: 'Standard connector set' },
      { label: 'Built on', value: 'Your existing stack' },
      { label: 'Engagement', value: 'Build, then run' },
    ],
    sections: [
      { title: 'Configured, not commissioned', body: 'The workflow, the agent behaviour, and the dashboard already exist because they are running elsewhere. What we do for you is connect them to your systems and set them to your rules, which is why the window is three to five weeks instead of eight to ten.' },
      { title: 'The same operating model', body: 'A productised build is not a lighter product. It is the same runtime, the same console, and the same managed operation as a bespoke system, entered at a different point.' },
      { title: 'Where it fits, and where it does not', body: 'If your process looks like a process we have already automated, this is the shorter route. If it does not, a fixed-scope build is the honest answer and we will say so at the scope call, while it still saves you money.' },
      { title: 'Standard connectors first', body: 'The connector set covers the systems these verticals usually run on. Anything outside it is scoped as work, priced, and agreed before the build. It does not get absorbed quietly into the timeline.' },
    ],
    deliverables: [
      { title: 'A shorter build', body: 'Systems we have already built and run, configured to your data. Three to five weeks of work, where a bespoke build takes eight to ten.' },
      { title: 'The same operating model', body: 'Fixed scope, then we run it. A shorter build does not mean you are handed something to look after yourself.' },
      { title: 'Your data, your permissions', body: 'Configured against the systems you already run, under access you grant and can withdraw.' },
      { title: 'An honest answer at the scope call', body: 'If your process does not fit one of these, a fixed-scope build is the right answer and we will say so at the scope call. You will not hear it for the first time at the demo.' },
    ],
    faq: [
      { q: 'How is this cheaper than a custom build?', a: 'The design work is already done. What remains is configuration against your data and connecting to your systems, which is why the window is shorter.' },
      { q: 'What if we need something it does not do?', a: 'Then it is the wrong product for you and we will say so. A ready-made system stretched to fit an unusual process ends up costing more than building for it.' },
      { q: 'Do we get the same support?', a: 'Yes. It is the same managed operation. We run it and we report on it.' },
      { q: 'Can we move to a custom build later?', a: 'Yes. It runs on your systems and your records, so extending it is a scoping conversation and never a migration.' },
    ],
    related: [
      { label: 'Service centres', path: '/solutions/service-centre' },
      { label: 'Real estate', path: '/solutions/real-estate' },
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
    heading: 'Service bookings answered in seconds',
    lede: 'Live in automotive since February 2026. One agent takes the WhatsApp enquiry, finds the vehicle, holds a bay, and returns a confirmed slot with an inspection link before an advisor has read the message.',
    proof: [
      { label: 'Live since', value: 'Feb 2026' },
      { label: 'Replaced', value: '3 inboxes · 1 spreadsheet' },
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'What it replaced', body: 'Three inboxes and a spreadsheet. Bookings arrived on WhatsApp, on the phone, and through the booking tool, and an advisor held the reconciliation in their head. Since February 2026 those routes land in one queue, and the record of what was agreed is the same record the DMS reads.' },
      { title: 'One booking, forty seconds', body: 'Forty seconds from the message landing to a confirmed slot going back with an inspection link. When the customer approves the estimate the job status moves and parts are ordered on it. The handoffs that used to pass between people do not happen at all.' },
      { title: 'The backlog, by site', body: 'A group running several sites reads each queue separately and against the others, so a backlog forming at one site is visible the day it forms, weeks before any month-end report. In the console, an automotive workspace shows load peaking on a Thursday morning, which is a thing you can staff for once you can see it.' },
      { title: 'What still reaches an advisor', body: 'An advisor starts the shift on jobs that are already booked, instead of an inbox that has to be read before the day can begin. Exceptions are named and attributed, and they are the only thing an advisor is asked to work. The routine confirmations run without one.' },
    ],
    caseStudy: {
      vertical: 'Automotive',
      situation: 'Service enquiries arriving across WhatsApp, a shared inbox and the phone. Nothing was lost exactly, but anything that came in after the counter closed waited until an advisor opened the inbox the next morning.',
      changed: 'Median time to a confirmed answer is now forty seconds, and advisors open the day on jobs that are already booked, with no queue of messages to read first.',
    },
    deliverables: [
      { title: 'Enquiries answered out of hours', body: 'The evening and weekend messages that used to wait for the counter to open are answered as they arrive.' },
      { title: 'Approvals that do not stall', body: 'Estimates are chased to a decision, so jobs are not held up because nobody called the customer back.' },
      { title: 'One view across sites', body: 'A backlog building at one site is visible against the others the same day, weeks before a month-end report.' },
      { title: 'Advisors on real work', body: 'Routine confirmation and status chasing runs without a person. Advisors get the jobs that need judgement.' },
    ],
    faq: [
      { q: 'Does this work with our dealer management system?', a: 'Yes. It reads and writes the records your advisors already use. There is no migration and nothing is replaced.' },
      { q: 'We are a multi-site group. Where do you start?', a: 'One site and its backlog. It is a fair test, it is quick to scope, and what works there is repeated across the group.' },
      { q: 'What do our advisors have to learn?', a: 'Nothing. They work where they work now. The change is how much reaches them.' },
      { q: 'How long before it is live?', a: 'Six to ten weeks to a first system in production. The scope call is ninety minutes and you keep the map either way.' },
    ],
    related: [
      { label: 'Service centres', path: '/solutions/service-centre' },
      { label: 'Your dashboard', path: '/platforms/ops-console' },
    ],
    cta: {
      heading: 'Compare it against your own service queue',
      body: 'Bring us a week of your own bookings and approvals. We will show which of them would have closed without an advisor, and which would have arrived as a named exception.',
    },
  },
  {
    path: '/industries/real-estate',
    title: 'Real Estate',
    description: 'Brokerages and developers whose agents open the day on a shortlist of qualified enquiries instead of a list of calls to return. Live since April 2026.',
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
      { title: 'What a sales director reads on Friday', body: 'One pipeline digest, built from the same records the agents worked. Nobody assembles it afterwards from three different systems. Open enquiries, what was qualified this week, and the small number of exceptions still waiting on a person. Nothing in it has to be reconciled before it can be believed.' },
      { title: 'The call-back list is gone', body: 'An enquiry used to arrive, join a list, and wait for somebody to work down it, by which point the buyer had spoken to two other brokerages. Since April 2026 there is no list, because the qualification and the offer of a viewing have already happened by the time an agent opens it.' },
      { title: 'The reasoning arrives with the enquiry', body: 'The reasoning travels with the enquiry, so an agent picking one up can see why it is theirs and what has already been agreed with the buyer. Negotiation and the relationship stay where they were. The chasing around them does not.' },
      { title: 'Where the pipeline is coming from', body: 'The queue is broken out by source, so a brokerage can see which channel is carrying it and which is quiet. What a brokerage workspace shows in our own console is the portal feed holding most of the open enquiries, and the week landing hardest on a Saturday morning, when the fewest people are at a desk.' },
    ],
    caseStudy: {
      vertical: 'Real estate',
      situation: 'Portal and web enquiries arriving faster than the team could call back, so the first real response was often the next working day. By then the buyer had usually asked someone else.',
      changed: 'Enquiries are scored and routed as they arrive, with a viewing already offered against a live calendar. Agents spend their day with buyers who are ready. The call-back list is gone.',
    },
    deliverables: [
      { title: 'Every enquiry qualified', body: 'Scored on arrival against budget, area and readiness, so agents spend their day with buyers who are ready.' },
      { title: 'Viewings offered up front', body: 'Routed with a slot already proposed against the agent\'s live calendar.' },
      { title: 'Paperwork that closes itself', body: 'Documents are followed up continuously instead of depending on somebody remembering.' },
      { title: 'A pipeline a director can read', body: 'Where enquiries came from and what happened to them, visible without anyone compiling it.' },
    ],
    faq: [
      { q: 'Do we have to change CRM?', a: 'No. It works with the CRM, portal feeds and calendars you already use.' },
      { q: 'How does it handle enquiries that are not serious?', a: 'It scores them and routes accordingly, so agents are not spending the morning on enquiries that were never going to transact.' },
      { q: 'Who answers the buyer first?', a: 'The system does, within limits you agree, and hands to an agent with the context already gathered.' },
      { q: 'What happens to leads outside office hours?', a: 'They are answered when they arrive. That is usually where the difference shows first.' },
    ],
    related: [
      { label: 'Real estate', path: '/solutions/real-estate' },
      { label: 'Your dashboard', path: '/platforms/ops-console' },
    ],
    cta: {
      heading: 'Read your own pipeline this way',
      body: 'Give us the enquiries one office received last week and we will show what a Friday digest would have said about them.',
    },
  },
  {
    path: '/industries/healthcare',
    title: 'Healthcare',
    description: 'Clinics and multi-site providers whose front desk starts the day knowing exactly which appointments need attention. Live since May 2026.',
    eyebrow: 'Industries',
    heading: 'Intake and coverage settled before arrival',
    lede: 'Live in healthcare since May 2026. Patients complete intake by message, coverage is verified against the payer, and the desk gets a single list of exceptions to work through.',
    proof: [
      { label: 'Live since', value: 'May 2026' },
      { label: 'Replaced', value: 'Paper intake · phone checks' },
      { label: 'Median task completion', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'What the front desk stopped doing', body: 'Filling in a form at the counter while the room waited. Holding on a line to a payer to find out whether somebody was covered. Both were unpaid work done at the worst possible moment, and since May 2026 neither is done at the desk at all.' },
      { title: 'What arrives instead', body: 'A prepared chart, a coverage status that has already been checked, and a consent that has already been signed. The desk opens the day against a named list of exceptions. Nothing walks in unannounced.' },
      { title: 'Several clinics, one queue', body: 'A multi-site group reads every clinic from the same console, so a site with intake still open on the morning of an appointment is visible before the patient is. Monday morning is the peak in the clinic workspace our console ships with, which is when a front desk has least time to work that out for itself.' },
      { title: 'Recalls that do not wait for a report', body: 'The clinic knows on Monday which slots are going unfilled, and it knows in the same place which patients are overdue a review. Neither fact waits on a report being pulled at the end of the month, and neither one has to be held by the person who happens to remember it.' },
    ],
    caseStudy: {
      vertical: 'Healthcare',
      situation: 'Intake on paper and coverage checked by phone, so the desk found out about a problem on the morning of the appointment, with the patient already on their way.',
      changed: 'Intake and coverage are settled before arrival. The desk works a short, named list of exceptions, and the first minute at the counter is no longer a form.',
    },
    deliverables: [
      { title: 'Intake settled before arrival', body: 'Completed by message, so the desk is not handing out forms and re-keying them.' },
      { title: 'Cover checked in advance', body: 'Verified with the payer when the booking is made, days before the appointment.' },
      { title: 'Recalls that run continuously', body: 'Reviews flagged when due, so the clinic is not working an ageing list in whatever time is left.' },
      { title: 'One queue across clinics', body: 'A site running behind is visible next to the others, before the patient is.' },
    ],
    faq: [
      { q: 'Is any clinical decision automated?', a: 'No. Clinical judgement stays with clinicians. This is the administrative work around the appointment.' },
      { q: 'Where does patient data live?', a: 'In your clinical records, where it is now. Nothing is migrated, and access is scoped to the processes in the build.' },
      { q: 'What does the front desk actually do differently?', a: 'They work a short, named list of exceptions. The routine intake and cover checks have already happened.' },
      { q: 'We run several clinics. Does it handle multi-site?', a: 'Yes. Each clinic is read separately and against the others, so load is visible before it becomes a problem.' },
    ],
    related: [
      { label: 'Clinics and healthcare', path: '/solutions/healthcare' },
      { label: 'Your dashboard', path: '/platforms/ops-console' },
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
