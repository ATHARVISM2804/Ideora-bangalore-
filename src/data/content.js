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
    body: "Natural voice agents that handle calls, enquiries and support." },
  { icon: "chat",      title: "WhatsApp Automation",
    body: "Engage, respond and resolve conversations at scale." },
  { icon: "workflow",  title: "Workflow Automation",
    body: "Automate end-to-end processes across systems." },
  { icon: "crm",       title: "Intelligent CRM",
    body: "360° customer view with intelligent engagement." },
  { icon: "analytics", title: "Predictive Analytics",
    body: "Turn data into predictions and proactive actions." },
  { icon: "dashboard", title: "Management Intelligence",
    body: "Real-time dashboards for smarter leadership decisions." },
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
  { code: "01", short: "Agents that run your operations", title: "Custom automation for your operations",
    body: "Custom agents that operate your systems the way a trained coordinator would: read the request, check the record, take the action, log the outcome. Built around your permissions and your escalation rules.",
    delivers: "Agents that complete multi-step operational tasks end to end, with a full trace of every action.",
    connects: "Your CRM, WhatsApp, email and calendars",
    time: "8 to 10 weeks" },
  { code: "02", short: "Enquiries qualified before contact", title: "Real estate automation",
    body: "Enquiry qualification, viewing scheduling, and document chasing handled continuously so agents spend their day with buyers who are ready.",
    delivers: "Qualified enquiries, confirmed viewings, and a document checklist that closes itself.",
    connects: "Your CRM, portal feeds, calendars and e-signature",
    time: "6 to 8 weeks" },
  { code: "03", short: "Intake settled before arrival", title: "Healthcare and clinic automation",
    body: "Intake, eligibility checks, reminders, and recall lists run before the patient reaches the desk. Clinical judgement stays with clinicians.",
    delivers: "Completed intake, verified coverage, and a filled schedule with named exceptions.",
    connects: "Your patient records, practice software, insurers and SMS",
    time: "8 weeks" },
  { code: "04", short: "Bookings answered in seconds", title: "Service centre automation",
    body: "One agent across booking, estimate approval, parts status, and customer updates, working the same records your advisors and DMS already use.",
    delivers: "Bookings held, estimates approved, and a bay schedule that reflects reality by 9am.",
    connects: "Your dealer system, booking tool, WhatsApp and parts catalogue",
    time: "6 to 8 weeks" },
  { code: "05", short: "Shipped in weeks, not quarters", title: "Productised systems",
    body: "Systems we have already built and deployed, configured to your data instead of designed from scratch. Shorter build, same operating model.",
    delivers: "A running system on your data, with the standard dashboard and managed operation.",
    connects: "Whatever you already run",
    time: "3 to 5 weeks" }
];

export const INDUSTRIES = [
  { code: "01", name: "Automotive", panel: "automotive", slotId: "v5-ind-auto", slotHint: "Drop a workshop or service bay photo",
    body: "Bookings, estimates, and approvals move through one agent instead of three inboxes. Advisors stop transcribing and start closing jobs the agent has already prepared." },
  { code: "02", name: "Real estate", panel: "realestate", slotId: "v5-ind-realestate", slotHint: "Drop a property or office photo",
    body: "Enquiries are qualified, viewings are scheduled against real calendars, and documents are chased until they arrive. Agents see a shortlist, not missed calls." },
  { code: "03", name: "Healthcare", panel: "healthcare", slotId: "v5-ind-health", slotHint: "Drop a clinic or front-desk photo",
    body: "Intake, insurance checks, and recalls run before the patient arrives. The desk handles exceptions, and the clinic knows on Monday which slots go unfilled." }
];

export const CASES = [
  { vertical: "Automotive", code: "sys_01", status: "live",
    title: "Service bookings answered in seconds, not shifts",
    body: "Takes the enquiry, finds the vehicle, holds a bay and returns a confirmed slot before an advisor has read the message.",
    replaced: "3 inboxes · 1 spreadsheet", since: "Feb 2026" },
  { vertical: "Real estate", code: "sys_02", status: "live",
    title: "Every enquiry qualified before an agent sees it",
    body: "Enquiries scored against budget, area and readiness, then routed with a viewing already offered against the agent's calendar.",
    replaced: "manual call-backs", since: "Apr 2026" },
  { vertical: "Healthcare", code: "sys_03", status: "live",
    title: "Intake and coverage settled before arrival",
    body: "Intake completed by message and coverage verified with the payer, so the desk works a list of exceptions, not unknowns.",
    replaced: "paper intake · phone checks", since: "May 2026" },
  { vertical: "Cross-vertical", code: "sys_04", status: "live",
    title: "A queue management can read on a Monday",
    body: "Every action writes to one record, so backlog, ageing and exceptions are visible the day they happen, not at month end.",
    replaced: "month-end reporting", since: "Jun 2026" },
  { vertical: "Finance", code: "sys_05", status: "in build",
    title: "Onboarding cleared before a reviewer opens it",
    body: "Registry lookups, director checks and sanctions screening run on arrival, so the file reaching a reviewer is complete and risk-banded.",
    replaced: "manual KYC checks", since: "Q4 2026" },
  { vertical: "Legal", code: "sys_06", status: "pilot",
    title: "Matters opened without partner time",
    body: "Conflict checks, engagement letters and ID chasing complete before a partner sees the file — ready to bill, not to set up.",
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
  { n: "01", title: "Scope call", tags: ["90 minutes", "You keep the map"],
    body: "We walk the process you want automated, meet the people who run it today, and agree what success looks like before anything is designed." },
  { n: "02", title: "Blueprint and design", tags: ["Fixed scope", "Fixed price"],
    body: "We map the architecture, the systems it touches, and what runs automatically versus what a person reviews — then fix the scope and the price." },
  { n: "03", title: "Build in the open", tags: ["Weekly builds", "Your staging data"],
    body: "You see working software every week, not a status update. Each build runs against your staging data the same day it ships." },
  { n: "04", title: "Integrate and connect", tags: ["Your permissions", "Real volume first"],
    body: "The agent is wired into your live systems with your permissions and escalation rules, then run against real volume before cutover." },
  { n: "05", title: "Run and report", tags: ["We operate it", "You keep the dashboard"],
    body: "We operate the system and you keep the dashboard. Backlog, ageing and exceptions are visible the day they happen." }
];

export const RESULT_STATS = [
  { value: 40, suffix: "s", label: "median task completion", note: "was 4 to 6 hours" },
  { value: 0, suffix: "", label: "human touches per booking", note: "exceptions only" },
  { value: 6, suffix: " wks", label: "to first system live", note: "fixed scope" },
  { value: 12, suffix: "/12", label: "agents online right now", note: "99.98% uptime" }
];

