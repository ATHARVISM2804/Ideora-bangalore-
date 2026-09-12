import { ALL_PAGE_PATHS } from './nav';

// Copy for every page rendered through PageShell. One entry per path in
// nav.js — PageShell's route generation asserts the two lists match.
//
// This is drafted copy written in the voice of content.js. Read it as a first
// draft for editing, not as final marketing text.

export const PAGES = [
  {
    path: '/products/operations-console',
    product: 'Operations Console',
    industry: 'cross-industry',
    audience: 'Owners, general managers and operations leaders across multiple sites or queues.',
    trail: [
      {
        label: 'Products',
        path: '/products',
      },
    ],
    workflow: [
      {
        actor: 'system',
        title: 'Work comes in',
        body: 'Forms, WhatsApp, voice, email and integrations are normalised into one event stream, whatever they started as.',
      },
      {
        actor: 'auto',
        title: 'A system acts',
        body: 'The rule, agent or workflow step that acted is recorded against the job, not just the outcome.',
      },
      {
        actor: 'human',
        title: 'An exception is raised',
        body: 'What stopped, why, who owns it and how long it has been waiting. This is the only queue a supervisor has to work.',
      },
      {
        actor: 'system',
        title: 'The audit record is written',
        body: 'Timestamp, source, action, result and approval history, retained and searchable.',
      },
      {
        actor: 'auto',
        title: 'Management sees the operation',
        body: 'Volume, completed, waiting, exception ageing and outcome, from the same records the work was done in.',
      },
      {
        actor: 'auto',
        title: 'Forecast and alerts',
        body: 'Shown only where data quality and confidence clear a documented threshold. Off by default rather than confidently wrong.',
      },
    ],
    demo: {
      heading: 'The console against your own queue',
      body: 'We run this live against demonstration data, then talk through what your own queue would look like in it.',
      steps: [
        'See work arrive from four different channels into one queue.',
        'Watch an automated action complete and write its audit record.',
        'Work an exception: owner, reason, SLA and resolution.',
        'Open the management view and the weekly report it produces.',
      ],
      cta: 'Book a walkthrough',
    },
    integrations: [
      {
        name: 'Your operational systems',
        how: 'Whatever the workflow already writes to: CRM, DMS, HIS, calendars',
        needs: 'Existing connections from the product in use',
      },
      {
        name: 'Identity',
        how: 'SSO where you run it, strong authentication where you do not',
        needs: 'An identity provider, or we issue accounts',
      },
      {
        name: 'Reporting export',
        how: 'Scheduled export to a warehouse or a sheet',
        needs: 'A destination and an owner',
      },
    ],
    integrationsNote: 'The console reports only what the underlying workflows actually record. We do not add a metric the operation cannot support.',
    controls: [
      {
        title: 'Role-based access, enforced server-side',
        body: 'Permissions are checked on the server, not hidden in the interface. A filter cannot be edited in a URL to reveal another location.',
      },
      {
        title: 'Scoped to your organisation and sites',
        body: 'A user sees the locations they are authorised for. There is no view that crosses a customer boundary.',
      },
      {
        title: 'Exports are logged',
        body: 'Who exported what and when is recorded, and sensitive fields are excluded by default.',
      },
      {
        title: 'Every automated write is traceable',
        body: 'Source, action and result are retained for every write, so an automated change can always be explained.',
      },
    ],
    dashboard: [
      'Live queues and current volume',
      'Backlog and how long work has waited',
      'Service levels against the target you set',
      'Exception reasons, ranked',
      'Action logs and approval history',
      'Throughput per person, bay or room',
      'Revenue and payment status',
      'Demand forecast, where confidence allows',
    ],
    title: 'Operations Console',
    description: 'One operational record every team reads from: jobs, queues, agents, and the exceptions that need a person.',
    eyebrow: 'Products',
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
      { label: 'Always running', path: '/how-it-works' },
      { label: 'Works with your software', path: '/integrations' },
    ],
    cta: {
      heading: 'See the console against your own queue',
      body: 'We will run a scope call, map your handoffs, and show the console populated with the work your team does today.',
    },
  },
  {
    path: '/how-it-works',
    title: 'How it works',
    description: 'Where agents execute, retry, and hand work to one another, and where a failed step becomes a named exception instead of a silent drop.',
    eyebrow: 'How it works',
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
      { label: 'Your dashboard', path: '/products/operations-console' },
      { label: 'Works with your software', path: '/integrations' },
    ],
    cta: {
      heading: 'Run one of your workflows through it',
      body: 'Pick a process that stalls today. We will map the handoffs, model it as a run, and show you where the exceptions would surface.',
    },
  },
  {
    path: '/integrations',
    title: 'Works with your software',
    description: 'The connection into the systems you already run: your CRM, DMS, EMR, calendars and messaging, with no rip and replace.',
    eyebrow: 'How it works',
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
      { label: 'Your dashboard', path: '/products/operations-console' },
      { label: 'Always running', path: '/how-it-works' },
    ],
    cta: {
      heading: 'Bring us your stack as it is',
      body: 'We will walk the systems you run today and show what an agent can action in each one before anything is committed.',
    },
  },
  {
    path: '/services/custom-ai-automation',
    title: 'Custom AI automation',
    description: 'Custom agents that complete multi-step operational tasks end to end, built against your APIs, your permissions, and your escalation rules.',
    eyebrow: 'Services',
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
      { label: 'Service centres', path: '/products/ideora-auto' },
      { label: 'Ready-made systems', path: '/services/productised-systems' },
    ],
    cta: {
      heading: 'Discuss a custom workflow',
      body: 'We run a scope call on one workflow, agree what success looks like, and fix the scope and the price before anything is designed.',
    },
  },
  {
    path: '/products/ideora-property',
    product: 'Ideora Property',
    industry: 'real estate',
    audience: 'Sales directors, channel heads and marketing leads at developers and brokerages.',
    trail: [
      {
        label: 'Products',
        path: '/products',
      },
    ],
    workflow: [
      {
        actor: 'system',
        title: 'Lead arrives from any source',
        body: 'Portal, lead ad, website form or WhatsApp. All of them land in one place instead of four inboxes.',
      },
      {
        actor: 'auto',
        title: 'Answered before interest cools',
        body: 'A reply goes out in seconds, at any hour, including the weekend the campaign actually ran.',
      },
      {
        actor: 'auto',
        title: 'Requirement qualified',
        body: 'Budget, location, property type, timeline and funding readiness, asked in a normal conversation rather than a form.',
      },
      {
        actor: 'auto',
        title: 'Project and inventory matched',
        body: 'The requirement is matched against live inventory, so the customer is offered something that exists at a price they gave.',
      },
      {
        actor: 'system',
        title: 'Site visit booked',
        body: 'Offered from the agent calendar and written to the CRM with the qualification attached.',
      },
      {
        actor: 'human',
        title: 'Agent picks up a qualified lead',
        body: 'A legal, pricing or promise question, a poor match, an opt-out or a premium lead goes to a person rather than being answered.',
      },
      {
        actor: 'auto',
        title: 'Follow-up until it closes or dies',
        body: 'Chased on a schedule, with the ageing visible instead of living in an agent memory.',
      },
    ],
    demo: {
      heading: 'A lead, from campaign click to booked visit',
      body: 'We run this live against demonstration data on a call, using a lead you submit yourself.',
      steps: [
        'Submit a lead as a campaign source would.',
        'Watch the qualification happen and a suitable project get matched.',
        'Take a viewing slot from a live agent calendar.',
        'See the qualified record and next action written to the CRM.',
      ],
      cta: 'Book a walkthrough',
    },
    integrations: [
      {
        name: 'Lead ads and portals',
        how: 'Webhook or feed into one intake',
        needs: 'Page or portal admin access',
      },
      {
        name: 'Website forms',
        how: 'Posted server-side with source and consent attached',
        needs: 'A form we can point at an endpoint',
      },
      {
        name: 'WhatsApp Business',
        how: 'Official Business API through a provider account',
        needs: 'A verified business number and a provider account in your name',
      },
      {
        name: 'CRM',
        how: 'Create and update lead, qualification and next action',
        needs: 'API access and an agreed field map',
      },
      {
        name: 'Inventory feed',
        how: 'Read availability and pricing for matching',
        needs: 'A feed or export we can read on a schedule',
      },
      {
        name: 'Agent calendars',
        how: 'Read availability and write site visits',
        needs: 'Calendar access per agent',
      },
    ],
    integrationsNote: 'Transcripts shown in a demonstration are synthetic. Where we show a real lead journey, personally identifiable information is removed first and the client has approved it.',
    controls: [
      {
        title: 'Price and legal questions go to a person',
        body: 'The system qualifies and books. It does not negotiate, quote off-list or answer a legal question about a project.',
      },
      {
        title: 'Routing rules you own',
        body: 'Which agent gets which lead, and what counts as premium, is a rule you set and can change without a rebuild.',
      },
      {
        title: 'Consent and opt-out respected',
        body: 'Consent state is captured at source and an opt-out stops contact immediately, across every channel.',
      },
      {
        title: 'A full audit trail',
        body: 'Every message, qualification and CRM write is stored with a timestamp and a result, so a disputed lead can be reconstructed.',
      },
    ],
    dashboard: [
      'Response time, by source and hour',
      'Leads qualified and disqualified, with reasons',
      'Site visits booked, attended and missed',
      'Conversion by source, campaign and project',
      'Agent acceptance and follow-up ageing',
      'Inventory interest and unmatched demand',
    ],
    title: 'Ideora Property',
    description: 'Enquiry qualification, viewing scheduling, and document chasing run continuously, so agents spend the day with buyers who are ready.',
    eyebrow: 'Products',
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
      { label: 'Operations automation', path: '/services/custom-ai-automation' },
    ],
    cta: {
      heading: 'Put it against a week of your enquiries',
      body: 'We map how enquiries reach your agents today, then show what qualification and scheduling look like when they run before anyone picks up.',
    },
  },
  {
    path: '/products/ideora-health',
    product: 'Ideora Health',
    industry: 'healthcare',
    audience: 'Clinic and hospital owners, practice managers and front-desk leads.',
    trail: [
      {
        label: 'Products',
        path: '/products',
      },
    ],
    workflow: [
      {
        actor: 'auto',
        title: 'Enquiry arrives',
        body: 'A call, a WhatsApp message or a web form. It is answered in seconds, at any hour, in the language the patient wrote in.',
      },
      {
        actor: 'auto',
        title: 'Department and doctor matched',
        body: 'The request is read for what is actually being asked, then matched to the right department, doctor and location before a slot is offered.',
      },
      {
        actor: 'system',
        title: 'Slot confirmed and written',
        body: 'The appointment is written into the calendar or HIS your front desk already works in. There is no second diary to reconcile.',
      },
      {
        actor: 'auto',
        title: 'Registration and consent captured',
        body: 'Details, referral source and consent state are collected ahead of arrival, so the desk is not taking them while a queue forms.',
      },
      {
        actor: 'human',
        title: 'Exception raised to staff',
        body: 'Urgent clinical wording, an unclear request, no available slot, a payment problem or a missing consent stops the system and names a person.',
      },
      {
        actor: 'auto',
        title: 'Follow-up kept visible',
        body: 'Reminders before the appointment and the follow-up due after it, chased without anyone keeping a private list.',
      },
      {
        actor: 'system',
        title: 'Management record written',
        body: 'Every action lands in the same record the dashboard reads, so the report and the operation cannot disagree.',
      },
    ],
    demo: {
      heading: 'A booking, from message to calendar',
      body: 'We run this live against demonstration data on a call. You send the enquiry yourself and watch each step land.',
      steps: [
        'Send a test enquiry from WhatsApp or the page simulator.',
        'See the approved response and the slots actually available.',
        'Confirm a slot and watch it written into the operational calendar.',
        'Open the front-desk exception queue and the management record it produced.',
      ],
      cta: 'Book a walkthrough',
    },
    integrations: [
      {
        name: 'WhatsApp Business',
        how: 'Official Business API through a provider account',
        needs: 'A verified business number and a provider account in your name',
      },
      {
        name: 'Calendar or HIS',
        how: 'Direct connector where an API exists; a supervised worker where one does not',
        needs: 'Test credentials and a named system owner',
      },
      {
        name: 'CRM',
        how: 'Create and update contact, appointment and source records',
        needs: 'API access and an agreed field map',
      },
      {
        name: 'Payments',
        how: 'Payment link issued and status read back',
        needs: 'Your existing payment gateway account',
      },
      {
        name: 'Email and SMS',
        how: 'Confirmations and reminders on your existing sender',
        needs: 'Verified sender domain or SMS header',
      },
    ],
    integrationsNote: 'We state the controls we actually operate. Ideora does not claim HIPAA, DPDP or medical-device certification, and no part of this system performs diagnosis or clinical advice.',
    controls: [
      {
        title: 'Clinical wording never gets answered',
        body: 'Anything that reads as urgent or symptomatic is routed to a person immediately. The system books appointments; it does not discuss conditions, triage or treatment.',
      },
      {
        title: 'Approval points you set',
        body: 'Which actions complete on their own and which wait for a person is agreed during design and can be changed afterwards without a rebuild.',
      },
      {
        title: 'A full audit trail',
        body: 'Every message, action and write is stored with a timestamp, a source and a result. You can reconstruct any booking end to end.',
      },
      {
        title: 'Your data stays yours',
        body: 'Records are written into your systems. We do not resell, train on or move patient data out of the region you operate in.',
      },
    ],
    dashboard: [
      'Appointments booked, by doctor and location',
      'Cancellations and no-shows',
      'Payment and outstanding status',
      'Doctor and room utilisation',
      'Follow-up due and overdue',
      'Referral and enquiry source',
      'Exception queue and how long items have waited',
    ],
    title: 'Ideora Health',
    description: 'Intake, eligibility checks, reminders and recall lists run before the patient reaches the desk, with clinical judgement left to clinicians.',
    eyebrow: 'Products',
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
      { label: 'Operations automation', path: '/services/custom-ai-automation' },
    ],
    cta: {
      heading: 'Take one clinic and one week',
      body: 'We sit with the front desk, map every handoff between enquiry and appointment, and show which of them an agent can hold.',
    },
  },
  {
    path: '/products/ideora-auto',
    product: 'Ideora Auto',
    industry: 'automotive',
    audience: 'Dealer principals, service-centre heads and aftersales managers.',
    trail: [
      {
        label: 'Products',
        path: '/products',
      },
    ],
    workflow: [
      {
        actor: 'auto',
        title: 'Customer asks for a service',
        body: 'A call or a WhatsApp message, answered immediately instead of going to a voicemail nobody clears.',
      },
      {
        actor: 'auto',
        title: 'Vehicle and concern identified',
        body: 'Registration, model, service history and the actual complaint are captured before a slot is discussed.',
      },
      {
        actor: 'system',
        title: 'Bay and advisor availability checked',
        body: 'Real capacity from the workshop calendar, not an optimistic guess that the floor has to absorb on the day.',
      },
      {
        actor: 'auto',
        title: 'Booking confirmed and written',
        body: 'The slot is written into the DMS or workshop diary, with the customer told what to bring.',
      },
      {
        actor: 'human',
        title: 'Estimate sent for approval',
        body: 'The estimate goes out and the reply is captured against the job. A dispute, a safety finding or an unclear category stops and goes to an advisor.',
      },
      {
        actor: 'auto',
        title: 'Status kept moving',
        body: 'The customer is told what is happening without an advisor stopping work to make the call.',
      },
      {
        actor: 'system',
        title: 'Payment and NPS closed out',
        body: 'Payment status is chased and the follow-up survey goes out on the same record.',
      },
    ],
    demo: {
      heading: 'A service booking, from message to bay',
      body: 'We run this live against demonstration data on a call, including the estimate approval most demos skip.',
      steps: [
        'Book a service slot over WhatsApp as a customer would.',
        'Watch the booking written into the workshop capacity view.',
        'Send an estimate-approval request and capture the reply.',
        'See the customer status updates and the management report they produced.',
      ],
      cta: 'Book a walkthrough',
    },
    integrations: [
      {
        name: 'WhatsApp Business',
        how: 'Official Business API through a provider account',
        needs: 'A verified business number and a provider account in your name',
      },
      {
        name: 'Voice',
        how: 'Answers the service line and writes what was agreed into the job',
        needs: 'A number we can route, or a SIP trunk',
      },
      {
        name: 'Dealer CRM or DMS',
        how: 'Read capacity, create and update the job card',
        needs: 'API or database access and a named system owner',
      },
      {
        name: 'Workshop calendar',
        how: 'Bay and technician availability read and written',
        needs: 'Existing calendar or planning tool',
      },
      {
        name: 'Payments',
        how: 'Payment link issued and status read back',
        needs: 'Your existing payment gateway account',
      },
    ],
    integrationsNote: 'Capacity forecasting is offered as a management feature only where production data supports it. We would rather leave it switched off than show a number you cannot act on.',
    controls: [
      {
        title: 'Safety findings go to a person',
        body: 'Anything that reads as a safety concern is escalated to an advisor rather than answered. The system books and updates; it does not make a technical judgement.',
      },
      {
        title: 'Money needs a human yes',
        body: 'Estimate values, discounts and goodwill sit behind an approval point you define. Nothing commits your margin on its own.',
      },
      {
        title: 'A full audit trail',
        body: 'Every message, approval and write is stored with a timestamp, a source and a result, so a disputed job can be reconstructed.',
      },
      {
        title: 'Capacity you can override',
        body: 'The floor can block, move or release slots at any time. The system reads the same diary your team edits.',
      },
    ],
    dashboard: [
      'Bookings, cancellations and no-shows',
      'Bay and technician utilisation',
      'Estimates sent, approved and waiting',
      'Parts status and jobs held',
      'Revenue and pending payments',
      'Follow-up due and overdue',
      'NPS and response rate',
      'Capacity risk over the coming weeks',
    ],
    title: 'Ideora Auto',
    description: 'One agent across booking, estimate approval, parts status and customer updates, working the same records your advisors and DMS already use.',
    eyebrow: 'Products',
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
      { label: 'Operations automation', path: '/services/custom-ai-automation' },
    ],
    cta: {
      heading: 'Bring us one site and its backlog',
      body: 'We walk the process from enquiry to invoice, meet the advisors who run it today, and agree what an agent takes before anything is built.',
    },
  },
  {
    path: '/services/productised-systems',
    title: 'Ready-made systems',
    description: 'Systems we have already built and deployed, then configured to your data: a shorter build, the same operating model.',
    eyebrow: 'Services',
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
      { label: 'Service centres', path: '/products/ideora-auto' },
      { label: 'Real estate', path: '/products/ideora-property' },
    ],
    cta: {
      heading: 'Discuss a custom workflow',
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
      { label: 'Case study: service bookings', path: '/case-studies/service-centre-bookings' },
      { label: 'Service centres', path: '/products/ideora-auto' },
      { label: 'Your dashboard', path: '/products/operations-console' },
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
      { label: 'Case study: lead qualification', path: '/case-studies/property-lead-qualification' },
      { label: 'Real estate', path: '/products/ideora-property' },
      { label: 'Your dashboard', path: '/products/operations-console' },
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
      { label: 'Case study: intake and coverage', path: '/case-studies/clinic-intake-and-coverage' },
      { label: 'Clinics and healthcare', path: '/products/ideora-health' },
      { label: 'Your dashboard', path: '/products/operations-console' },
    ],
    cta: {
      heading: 'Start with your busiest Monday',
      body: 'We will take one week of intake across your clinics and show what the desk would have been holding on the morning the load peaked.',
    },
  },
  // -------------------------------------------------------------------------
  // Services index.
  // -------------------------------------------------------------------------
  {
    path: '/services',
    title: 'Services',
    description: 'How Ideora Labs designs, builds, integrates and then runs automation around the software your business already owns.',
    eyebrow: 'Services',
    heading: 'We do not hand over a system and leave',
    lede: 'A product covers a workflow we have already built many times. A service covers the one that is yours alone. Either way the same five steps run, and the same team stays accountable after launch.',
    proof: [
      { label: 'First live workflow', value: '6-10 weeks' },
      { label: 'Engagement', value: 'Fixed scope' },
      { label: 'Working build', value: 'Weekly' },
      { label: 'After launch', value: 'Managed' },
    ],
    sections: [
      { title: 'Start with a product where one fits', body: 'If your workflow is appointments, service bookings or property leads, we have built it before. You get a shorter build, a known integration path and a system that has already met the edge cases. Choose a service when the workflow is genuinely yours.' },
      { title: 'The work becomes reusable', body: 'What we build for one client becomes product capability for the next, which is why the second clinic costs less than the first. We say which parts of your build are bespoke and which are configuration, before you commit.' },
      { title: 'Accountability does not end at handover', body: 'Most automation fails quietly six weeks after launch, when a form changes or a queue grows and nobody is watching. Managed operation exists because that is the part that actually decides whether this worked.' },
    ],
    deliverables: [
      { id: 'discovery', title: 'Automation discovery', body: 'We map the current process, where it waits, the exception rules and what success is measured in. You keep the map whether or not you continue.' },
      { title: 'Solution and agent design', body: 'The workflow, the channels, the points a person still approves, and the reporting management will actually read.' },
      { id: 'integration', title: 'Build and integration', body: 'Agents connected to your CRM, WhatsApp, calendars and operational systems. No migration, no second system for your team to learn.' },
      { title: 'Deployment and adoption', body: 'Security review, testing, user acceptance, training and a controlled launch rather than a switch thrown on a Friday.' },
      { id: 'managed', title: 'Managed operation', body: 'We watch the queues, exceptions, accuracy and cost, and keep improving the process after it is live.' },
    ],
    faq: [
      { q: 'How do we know whether we need a product or a custom build?', a: 'The discovery call settles it in thirty minutes. If your workflow matches one of the four products, we say so and quote the shorter build. We do not sell a custom project to a business that needs a configuration.' },
      { q: 'What do we have to provide?', a: 'A named system owner, access to the systems being connected, and a decision-maker who can approve the process rules. The build stalls on access far more often than on engineering.' },
      { q: 'What does the commercial model look like?', a: 'A fixed-scope build fee for the first live workflow, then a monthly managed operation fee. Both are quoted after discovery, against a written scope, so there is no hourly meter running.' },
      { q: 'What happens if we want to stop?', a: 'The systems write into software you already own, so your data and your records stay with you. We hand over documentation and the integration map on exit.' },
    ],
    related: [
      { label: 'Custom AI automation', path: '/services/custom-ai-automation' },
      { label: 'Ready-made systems', path: '/services/productised-systems' },
      { label: 'How it works', path: '/how-it-works' },
    ],
    cta: {
      heading: 'Bring us the process nobody wants to own',
      body: 'Thirty minutes with you and your operations lead. We map the handoffs and tell you which one a system can take first.',
    },
  },

  // -------------------------------------------------------------------------
  // Trust pages. A corporate buyer's IT and legal reviewers look for exactly
  // these, and will not sponsor a supplier internally without them.
  //
  // Every statement here describes a control Ideora actually operates. There
  // are no compliance badges and no certification claims, because none have
  // been audited -- saying so plainly is worth more to a procurement reviewer
  // than a logo they will ask to see evidence for.
  // -------------------------------------------------------------------------
  {
    path: '/security',
    title: 'Security and data handling',
    description: 'How Ideora Labs hosts, accesses, retains and audits the data our systems touch, and what your team stays in control of.',
    eyebrow: 'How it works',
    trail: [{ label: 'How it works', path: '/how-it-works' }],
    heading: 'Your systems stay yours. Ours read and write to them.',
    lede: 'Our systems act inside the software you already own, which means the security question is not where we store your data. It is what we can reach, who approved it, and whether you can see what was done. This page answers those three.',
    proof: [
      { label: 'Data residency', value: 'India' },
      { label: 'Access', value: 'Least privilege' },
      { label: 'Audit trail', value: 'Every write' },
      { label: 'Transport', value: 'TLS 1.2+' },
    ],
    sections: [
      { title: 'Where data lives', body: 'Operational records stay in your systems. What we hold is the working state a workflow needs to run and its audit trail, hosted in India. We do not move client data outside the region you operate in, and we do not use it to train models.' },
      { title: 'What we can reach', body: 'Each integration is scoped to the smallest permission that makes the workflow run, granted by your system owner and revocable by them at any time. Credentials are held in managed secret storage and never reach a browser.' },
      { title: 'What you can see', body: 'Every automated action stores a timestamp, a source, the rule that acted and the result. There is no action our systems can take that you cannot reconstruct afterwards.' },
      { title: 'When something goes wrong', body: 'A failed step becomes a named exception with an owner rather than a silent drop. For anything affecting your data we contact your named owner directly; we do not wait for a status page to be read.' },
    ],
    deliverables: [
      { title: 'Transport and hosting', body: 'HTTPS with HSTS across the site, TLS in transit to every integration, and encryption at rest for the state we hold. Hosting is in India.' },
      { title: 'Access control', body: 'Role-based access enforced server-side, scoped to your organisation and locations. Production access is limited to named engineers and reviewed.' },
      { title: 'Retention and deletion', body: 'Retention periods are agreed per engagement and written into the contract. On exit we delete working state and hand over the integration map and documentation.' },
      { title: 'Exports and logging', body: 'Exports are logged with who, what and when. Sensitive fields are excluded by default rather than opted out of.' },
    ],
    faq: [
      { q: 'Are you HIPAA, DPDP or ISO certified?', a: 'No. We hold no third-party security certification today, and we will not claim one we have not been audited against. What we will do is answer a security questionnaire in writing, name our sub-processors and let your IT team review the integration scope before anything is connected.' },
      { q: 'Do you train AI models on our data?', a: 'No. Client data is used to run your workflows and nothing else. It is not used to train, fine-tune or evaluate models, ours or a provider\'s.' },
      { q: 'Which third parties are involved?', a: 'The model provider, the WhatsApp Business provider and the hosting platform, plus whatever systems you ask us to integrate with. We will give you the current list in writing before contract.' },
      { q: 'Who is accountable if the system does something wrong?', a: 'We are, for the system behaving as specified. That is why approval points exist: the actions that carry commercial or clinical risk wait for a person, and which ones those are is agreed in writing during design.' },
      { q: 'Can our IT team review this before we commit?', a: 'Yes, and we would rather they did. We will take a security review, a questionnaire or a call with your IT lead during evaluation, not after.' },
    ],
    related: [
      { label: 'Works with your software', path: '/integrations' },
      { label: 'Privacy', path: '/privacy' },
      { label: 'Responsible AI', path: '/responsible-ai' },
    ],
    cta: {
      heading: 'Send us your security questionnaire',
      body: 'We will complete it in writing during evaluation rather than after contract. If something is not in place yet, the answer will say so.',
    },
  },

  {
    path: '/privacy',
    title: 'Privacy',
    description: 'What personal data Ideora Labs collects through this website and through the systems we operate, why, and how to have it removed.',
    eyebrow: 'Legal',
    heading: 'Privacy',
    lede: 'This explains what we collect through this website and through the systems we run for clients, what we do with it, and how to have it removed. It is written to be read rather than to be defensible.',
    sections: [
      { title: 'What this website collects', body: 'If you contact us, we hold what you send: your name, your contact details and your message. If analytics is enabled, we record which pages and products were viewed and which buttons were pressed. We do not send names, phone numbers, email addresses or message contents to analytics, and we do not run advertising trackers.' },
      { title: 'Why we hold it', body: 'To reply to you, to run an evaluation with you, and to understand which parts of the site are useful. We do not sell contact details, and we do not add you to a list you did not ask for.' },
      { title: 'Data inside the systems we operate', body: 'Where we run automation for a client, that client is the controller of the personal data involved and we act on their instructions as a processor. If you are a patient, customer or lead of one of our clients, your rights are exercised through them, and we will support them in answering you.' },
      { title: 'How long we keep it', body: 'Enquiries are kept while there is an active conversation and for a reasonable period afterwards. Operational data inside a client system is kept for the period agreed in that client\'s contract.' },
      { title: 'Your rights', body: 'You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. Write to the address below and we will answer. If we hold the data on behalf of a client we will tell you who to approach.' },
      { title: 'Changes', body: 'If this page changes materially we will update the date at the foot of it. We do not make quiet changes to how data is used.' },
    ],
    faq: [
      { q: 'Do you use cookies?', a: 'The site itself does not set advertising or profiling cookies. If analytics is enabled it may set a first-party cookie to count a visit; nothing on this site tracks you across other websites.' },
      { q: 'How do I have my data removed?', a: 'Email info@ideoralabs.com with the request. If we hold it directly we will delete it and confirm. If we hold it for a client, we will tell you which client to contact and let them know you asked.' },
    ],
    related: [
      { label: 'Security and data', path: '/security' },
      { label: 'Terms', path: '/terms' },
      { label: 'Contact', path: '/contact' },
    ],
  },

  {
    path: '/terms',
    title: 'Terms of use',
    description: 'The terms that apply to using the Ideora Labs website. Client engagements are governed by a separate signed agreement.',
    eyebrow: 'Legal',
    heading: 'Terms of use',
    lede: 'These terms cover this website. They are not the terms of an engagement: if you become a client, a separate signed agreement governs scope, responsibilities, service levels, liability and exit, and it takes precedence over anything here.',
    sections: [
      { title: 'What this site is', body: 'A description of what Ideora Labs builds and operates. Figures, timelines and outcomes shown here describe work we have done or scopes we offer. They are not a guarantee of a result in your business, which depends on your process, your systems and your data.' },
      { title: 'Demonstrations', body: 'Anything shown in a walkthrough runs against synthetic demonstration data. No demonstration uses a client\'s records, and no figure in a demonstration should be read as a client\'s actual performance.' },
      { title: 'Your use of the site', body: 'Use it to evaluate us. Do not attempt to break it, scrape it at a volume that degrades it for others, or misrepresent it as your own work.' },
      { title: 'Intellectual property', body: 'The content, design and code of this site belong to Ideora Labs. What we build for a client under an engagement is governed by that engagement, not by this page.' },
      { title: 'Third-party links', body: 'Where we link out, we do not control what is on the other end and are not responsible for it.' },
      { title: 'Governing law', body: 'These terms are governed by the laws of India, with the courts at Bengaluru having jurisdiction.' },
    ],
    related: [
      { label: 'Privacy', path: '/privacy' },
      { label: 'Security and data', path: '/security' },
      { label: 'Contact', path: '/contact' },
    ],
  },

  {
    path: '/responsible-ai',
    title: 'Responsible AI',
    description: 'Where Ideora Labs lets an AI system act on its own, where a person must still decide, and what we will not automate.',
    eyebrow: 'Legal',
    heading: 'Where a person still decides',
    lede: 'The useful question about an AI system is not how capable it is. It is what it is allowed to do unsupervised, and what happens when it is unsure. This is our answer, and it is the same answer we give in a design session.',
    sections: [
      { title: 'Automation has a boundary, written down', body: 'For every workflow we build, we agree in writing which actions complete on their own and which wait for a person. That list is part of the scope, it is visible in the console, and changing it is a decision you make rather than a side effect of a model update.' },
      { title: 'Uncertainty stops, it does not guess', body: 'When intent is unclear, when a request falls outside the agreed scope, or when confidence is low, the system raises a named exception to a person instead of producing a plausible answer. A system that stops is recoverable. A system that improvises is not.' },
      { title: 'What we will not automate', body: 'Clinical advice, diagnosis or triage. Legal advice. Final pricing, discounting or contractual commitment. Anything where being confidently wrong causes harm we cannot undo. We will decline this scope rather than quote it.' },
      { title: 'People are told what they are talking to', body: 'Where a customer, patient or lead is in conversation with an automated system, we do not design it to pretend otherwise, and we will not build a system whose purpose is to conceal that.' },
      { title: 'Every action is attributable', body: 'The rule, agent or step that acted is stored with the result. When something goes wrong, we can show you exactly what happened rather than reasoning about what the model probably did.' },
      { title: 'We do not train on your data', body: 'Client data runs your workflows. It is not used to train, fine-tune or evaluate models, ours or a provider\'s.' },
    ],
    related: [
      { label: 'Security and data', path: '/security' },
      { label: 'Privacy', path: '/privacy' },
    ],
  },

];

// Fails loudly in dev if nav.js and pages.js drift apart. A menu item with no
// copy would otherwise silently render the 404 page.
if (import.meta.env.DEV) {
  const written = new Set(PAGES.map((p) => p.path));
  const missing = ALL_PAGE_PATHS.filter((p) => !written.has(p));
  if (missing.length) console.warn('[pages] no copy yet for:', missing.join(', '));
}
