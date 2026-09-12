// Content extracted from Ideora Home v5.dc.html (lines 735-893).
//
// The console's own datasets moved to dashboards.js when it became a
// five-industry switcher; what remains here is the rest of the page.
//
// One change from the source: it declared `const RESULTS` twice in the same
// scope with two different data shapes, so both consumers resolved to the
// second array and the stats block rendered blank numbers. The two arrays are
// named separately here and wired to their intended sections.

// The capability layer every system is assembled from. Copy follows the source
// brief; "inquiries" is spelled "enquiries" to match the rest of the site.
export const CAPABILITIES = [
  { icon: "voice",     title: "AI Voice",
    body: "Answers the phone, takes the details and books the job." },
  { icon: "chat",      title: "WhatsApp Automation",
    body: "Replies on WhatsApp and carries the conversation to a result." },
  { icon: "workflow",  title: "Workflow Automation",
    body: "Runs a process from the first message to the closed job." },
  { icon: "crm",       title: "Intelligent CRM",
    body: "One customer record your whole team can actually trust." },
  { icon: "analytics", title: "Predictive Analytics",
    body: "Spots what is about to go wrong while there is time to act." },
  { icon: "dashboard", title: "Management Intelligence",
    body: "Shows you the operation as it stands right now, not last month." },
];

// What the agent layer plugs into. Every one of these already appears in a
// practice's "connects to" line; the orbital states them in one place.
// The tiles carry words now rather than three-letter codes. DMS, CRM and EMR
// stay because a dealer principal and a practice manager use those words daily;
// "Prt", "Sig" and "WA" were abbreviated to fit a tile, not to be understood.
export const STACK = [
  { short: "DMS",       label: "Dealer management" },
  { short: "CRM",       label: "Your CRM" },
  { short: "Records",   label: "Clinical records" },
  { short: "Calendars", label: "Calendars" },
  { short: "WhatsApp",  label: "WhatsApp Business" },
  { short: "Insurers",  label: "Insurers and payers" },
  { short: "Portals",   label: "Portal feeds" },
  { short: "E-sign",    label: "E-signature" },
];

export const PROBLEMS = [
  { glyph: "waiting", meter: "stall", read: "waiting 4h 12m", code: "fault 01", title: "Work waits on people",
    body: "An estimate sits unapproved because nobody called back. The job is not blocked by capacity, it is blocked by a follow-up that never happened." },
  { glyph: "silo", meter: "split", read: "3 versions of the truth", code: "fault 02", title: "Systems do not talk",
    body: "The booking tool, the DMS, and WhatsApp each hold a different version of the truth. Staff reconcile them by hand, all day, from memory." },
  { glyph: "blind", meter: "late", read: "seen 28 days late", code: "fault 03", title: "Nobody can see the backlog",
    body: "Management finds out about the backlog at the end of the month, when the report arrives and the week it describes is already gone." }
];

export const SERVICES = [
  { code: "01", short: "Find where the work waits", title: "Automation discovery",
    body: "We map the process as it actually runs: every handoff, every wait, the exception rules nobody wrote down, and what success is measured in. You keep the map whether or not you continue with us.",
    delivers: "A written map of the process, the delay points, and which one a system should take first.",
    connects: "Your team, your current tools, and the reports you run today",
    time: "1 to 2 weeks" },
  { code: "02", short: "Decide what the system may do", title: "Solution and agent design",
    body: "The workflow, the channels it answers on, and the points where a person still approves. This is where the boundary between automated and human is agreed in writing rather than discovered in production.",
    delivers: "A workflow specification, the approval points, and the management report it will produce.",
    connects: "Your permissions, your escalation rules and your reporting lines",
    time: "1 to 2 weeks" },
  { code: "03", short: "Built into what you already run", title: "Build and integration",
    body: "Agents connected to the systems you already own, working your records the way a trained coordinator would: read the request, check the record, take the action, log the outcome. No migration and no second system for your team to learn.",
    delivers: "A working system on your data, with a record of every action it takes.",
    connects: "Your CRM, DMS or HIS, WhatsApp, email and calendars",
    time: "4 to 6 weeks" },
  { code: "04", short: "Live without a leap of faith", title: "Deployment and adoption",
    body: "Security review, testing, user acceptance and training, then a controlled launch. The system runs alongside the current process until it has earned the handover, rather than replacing it on a Friday.",
    delivers: "A launched system, a trained team, and a security review your IT lead has signed off.",
    connects: "Your IT reviewers, your system owners and the people who will work the exceptions",
    time: "1 to 2 weeks" },
  { code: "05", short: "We watch it, you get the report", title: "Managed operation",
    body: "Most automation fails quietly six weeks after launch, when a form changes or a queue grows and nobody is watching. We monitor the queues, exceptions, accuracy and cost, and keep improving the process while it runs.",
    delivers: "A monitored system, a named owner for exceptions, and a report that matches the operation.",
    connects: "The same records the system already writes",
    time: "Ongoing" }
];

export const INDUSTRIES = [
  { code: "01", name: "Automotive", panel: "automotive", slotId: "v5-ind-auto", slotHint: "Drop a workshop or service bay photo",
    body: "Bookings, estimates, and approvals move through one system instead of three inboxes. Advisors stop transcribing and start closing jobs the system has already prepared." },
  { code: "02", name: "Real estate", panel: "realestate", slotId: "v5-ind-realestate", slotHint: "Drop a property or office photo",
    body: "Enquiries are qualified, viewings are scheduled against real calendars, and documents are chased until they arrive. Agents open the day with a shortlist." },
  { code: "03", name: "Healthcare", panel: "healthcare", slotId: "v5-ind-health", slotHint: "Drop a clinic or front-desk photo",
    body: "Intake, insurance checks, and recalls run before the patient arrives. The desk handles exceptions, and the clinic knows on Monday which slots go unfilled." }
];

export const CASES = [
  { vertical: "Automotive", code: "sys_01", status: "live",
    title: "Service bookings answered in seconds",
    body: "Takes the enquiry, finds the vehicle, holds a bay and returns a confirmed slot before an advisor has read the message.",
    replaced: "3 inboxes · 1 spreadsheet", since: "Feb 2026" },
  { vertical: "Real estate", code: "sys_02", status: "live",
    title: "Every enquiry qualified before an agent sees it",
    body: "Enquiries scored against budget, area and readiness, then routed with a viewing already offered against the agent's calendar.",
    replaced: "manual call-backs", since: "Apr 2026" },
  { vertical: "Healthcare", code: "sys_03", status: "live",
    title: "Intake and coverage settled before arrival",
    body: "Intake completed by message and coverage verified with the payer, so the desk works a short list of exceptions and nothing else.",
    replaced: "paper intake · phone checks", since: "May 2026" },
  { vertical: "Cross-vertical", code: "sys_04", status: "live",
    title: "A queue management can read on a Monday",
    body: "Every action writes to one record, so backlog, ageing and exceptions are visible the day they happen, weeks before month end.",
    replaced: "month-end reporting", since: "Jun 2026" },
  { vertical: "Finance", code: "sys_05", status: "in build",
    title: "Onboarding cleared before a reviewer opens it",
    body: "Registry lookups, director checks and sanctions screening run on arrival, so the file reaching a reviewer is complete and risk-banded.",
    replaced: "manual KYC checks", since: "Q4 2026" },
  { vertical: "Legal", code: "sys_06", status: "pilot",
    title: "Matters opened without partner time",
    body: "Conflict checks, engagement letters and ID chasing are done before a partner opens the file. It arrives ready to bill.",
    replaced: "manual intake · paper conflicts", since: "Aug 2026" }
];

export const QUOTES = [
  { text: "The first week of the audit told us more about our own process than two years of reporting had.",
    glyph: "automotive", role: "Group service director", scale: "14-site dealer network", slotId: "v5-q1" },
  { text: "Nothing was ripped out. It plugged into the systems we already pay for and started clearing the queue.",
    glyph: "realestate", role: "Chief growth officer", scale: "Residential brokerage, 200 agents", slotId: "v5-q2" },
  { text: "My front desk stopped chasing insurers. That alone paid for the build inside a quarter.",
    glyph: "healthcare", role: "Operations director", scale: "Multi-clinic group", slotId: "v5-q3" },
  { text: "We thought the delay was compliance. The audit showed it was three teams waiting on each other to confirm the same document.",
    glyph: "finance", role: "Head of onboarding", scale: "Commercial bank · in build", slotId: "v5-q4" },
  { text: "In the pilot, the conflicts check stopped being a Monday morning job. It happens when the enquiry lands.",
    glyph: "legal", role: "Managing partner", scale: "Commercial firm · pilot", slotId: "v5-q5" }
];

export const FACTS = [
  { label: "Verticals live", value: "Automotive · Real estate · Healthcare" },
  { label: "Deployment window", value: "6 to 10 weeks to first system in production" },
  { label: "Engagement model", value: "Fixed scope build, then managed operation" },
  { label: "Built on", value: "Your existing systems. No rip and replace." }
];

export const STEPS = [
  { n: "1", title: "Operations audit", body: "We sit with the team for a week and map every handoff." },
  { n: "2", title: "System design", body: "You approve the workflow before a line is written." },
  { n: "3", title: "Build and integrate", body: "Delivered into your stack, tested against live volume." },
  { n: "4", title: "Run and report", body: "We operate it, you get the dashboard." }
];

export const PROC = [
  { n: "01", title: "Scope call", scope: "The process you want automated", owner: "You and your operations lead", deliverable: "A written map of the handoffs and the delays",
    body: "We walk the process you want automated, meet the people who run it today, and agree what success looks like before anything is designed." },
  { n: "02", title: "Blueprint and design", scope: "Workflow, channels and approval points", owner: "Ideora, approved by you", deliverable: "A fixed scope and a fixed price",
    body: "We map the architecture, the systems it touches, and what runs automatically versus what a person reviews. Then we fix the scope and the price." },
  { n: "03", title: "Build in the open", scope: "The agreed workflow, built weekly", owner: "Ideora", deliverable: "Working software every week, on your staging data",
    body: "You see working software every week. Nobody sends you a status update instead. Each build runs against your staging data the same day it ships." },
  { n: "04", title: "Integrate and connect", scope: "Your CRM, calendars, DMS or HIS", owner: "Ideora with your system owner", deliverable: "A connected system running against real volume",
    body: "The system is wired into the software you already run, with your permissions and escalation rules, then run against real volume before cutover." },
  { n: "05", title: "Acceptance and launch", scope: "Testing, training and security review", owner: "Your team signs it off", deliverable: "A signed-off system and a trained team",
    body: "Your team works the system against real cases until it behaves the way the blueprint said it would. Your IT reviewer signs off the integration scope. Then it goes live alongside the current process, not instead of it." },
  { n: "06", title: "Run and report", scope: "Queues, exceptions, accuracy and cost", owner: "Ideora, reporting to you", deliverable: "A monitored system and a report that matches it",
    body: "We operate the system and you keep the dashboard. Backlog, ageing and exceptions are visible the day they happen." }
];

export const RESULT_STATS = [
  { value: 40, suffix: "s", label: "median task completion", note: "was 4 to 6 hours" },
  { value: 0, suffix: "", label: "human touches per booking", note: "exceptions only" },
  { value: 6, suffix: " wks", label: "to first system live", note: "fixed scope" },
  { value: 12, suffix: "/12", label: "systems running right now", note: "99.98% uptime" }
];



// The proof strip under the product chooser. Three short factual operating
// promises and no client claim: the homepage row asks for a live system count,
// the time to a first workflow and the integration promise, and that is all
// this is allowed to say.
export const PROMISES = [
  { label: 'Running in production', value: 'Four systems live, two in build' },
  { label: 'Time to first workflow', value: '6 to 10 weeks' },
  { label: 'What it runs on', value: 'Your existing software. No migration.' },
];
