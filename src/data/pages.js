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
];

// Fails loudly in dev if nav.js and pages.js drift apart. A menu item with no
// copy would otherwise silently render the 404 page.
if (import.meta.env.DEV) {
  const written = new Set(PAGES.map((p) => p.path));
  const missing = ALL_PAGE_PATHS.filter((p) => !written.has(p));
  if (missing.length) console.warn('[pages] no copy yet for:', missing.join(', '));
}
