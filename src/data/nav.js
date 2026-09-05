// Single source of truth for the nav, the footer link columns, and the route
// table. Adding a page means adding it here and adding its copy to pages.js;
// PageShell asserts the two stay in sync.
//
// Real Estate and Healthcare appear under both Solutions and Industries by
// design: Solutions describes what gets built, Industries describes who it is
// for. The pages cross-link rather than duplicate.

export const MENUS = [
  {
    label: 'Platforms',
    path: null,
    items: [
      { label: 'Ops Console', path: '/platforms/ops-console', blurb: 'One record of every job, queue, and exception.' },
      { label: 'Agent Runtime', path: '/platforms/agent-runtime', blurb: 'Where the agents run, retry, and hand off.' },
      { label: 'Integrations Layer', path: '/platforms/integrations', blurb: 'Into your stack. No rip and replace.' },
    ],
  },
  {
    label: 'Solutions',
    path: null,
    items: [
      { label: 'Agentic AI & Automation', path: '/solutions/agentic-ai', blurb: 'Agents that complete work end to end.' },
      { label: 'Real Estate Automation', path: '/solutions/real-estate', blurb: 'Every enquiry qualified before an agent sees it.' },
      { label: 'Healthcare & Clinic Automation', path: '/solutions/healthcare', blurb: 'Intake and coverage settled before arrival.' },
      { label: 'Service Centre Automation', path: '/solutions/service-centre', blurb: 'Bookings answered in seconds, not shifts.' },
      { label: 'Productised Systems', path: '/solutions/productised-systems', blurb: 'Fixed scope, fixed window, run for you.' },
    ],
  },
  {
    label: 'Industries',
    path: null,
    items: [
      { label: 'Automotive', path: '/industries/automotive', blurb: 'Service centres and dealer groups.' },
      { label: 'Real Estate', path: '/industries/real-estate', blurb: 'Brokerages and developers.' },
      { label: 'Healthcare', path: '/industries/healthcare', blurb: 'Clinics and multi-site providers.' },
    ],
  },
  { label: 'About', path: '/about', items: [] },
  { label: 'Insights', path: '/insights', items: [] },
];

export const ALL_PAGE_PATHS = MENUS.flatMap((m) => m.items.map((i) => i.path));
