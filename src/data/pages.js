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
      { label: 'Agents online', value: '12 / 12' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Median task', value: '40s' },
      { label: 'Human touches', value: '0 per booking' },
    ],
    sections: [
      { title: 'A run is a record, not a black box', body: 'Each agent runs under a name and a run number. A service centre booking is handled by service_centre_agent under run 4471, and every step it took is timestamped in order: match the vehicle, check bay availability, hold the slot, send the confirmation. You can read what happened without asking anyone what happened.' },
      { title: 'Retry first, then name the failure', body: 'A step that fails is retried inside the run. If it still cannot complete, the runtime does not drop it and move on. It closes the run with an exception attributed to the agent, the run, and the step that stopped, and puts it in front of a person in the console.' },
      { title: 'Handoffs are explicit', body: 'Work moves between agents the way it moves between people, except the transfer is recorded. One agent holds the bay, another updates the job status when the estimate is approved, and a third notifies the advisor. Nothing waits in an inbox because nobody knew it was theirs.' },
      { title: 'Capacity you can see', body: 'The runtime reports its own health: agents online against agents expected, uptime, and the median time a task takes to complete. Twelve of twelve online at 99.98% uptime is a number the operation can check, not a claim it has to take on trust.' },
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
];

// Fails loudly in dev if nav.js and pages.js drift apart. A menu item with no
// copy would otherwise silently render the 404 page.
if (import.meta.env.DEV) {
  const written = new Set(PAGES.map((p) => p.path));
  const missing = ALL_PAGE_PATHS.filter((p) => !written.has(p));
  if (missing.length) console.warn('[pages] no copy yet for:', missing.join(', '));
}
