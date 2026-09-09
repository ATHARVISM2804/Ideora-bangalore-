// Single source of truth for the nav, the footer link columns, and the route
// table. Adding a page means adding it here and adding its copy to pages.js;
// PageShell asserts the two stay in sync.
//
// Real Estate and Healthcare appear under both Solutions and Industries by
// design: Solutions describes what gets built, Industries describes who it is
// for. The pages cross-link rather than duplicate.

export const MENUS = [
  {
    label: 'How it works',
    path: null,
    items: [
      { label: 'Your dashboard', path: '/platforms/ops-console', blurb: 'Every job, every exception, in one place.' },
      { label: 'Always running', path: '/platforms/agent-runtime', blurb: 'Evenings, weekends and peak days covered.' },
      { label: 'Works with your software', path: '/platforms/integrations', blurb: 'No migration. Nothing gets replaced.' },
    ],
  },
  {
    label: 'Solutions',
    path: null,
    items: [
      { label: 'Operations automation', path: '/solutions/agentic-ai', blurb: 'Systems that finish the work end to end.' },
      { label: 'Real estate', path: '/solutions/real-estate', blurb: 'Every enquiry qualified before an agent sees it.' },
      { label: 'Clinics and healthcare', path: '/solutions/healthcare', blurb: 'Intake and cover settled before arrival.' },
      { label: 'Service centres', path: '/solutions/service-centre', blurb: 'Bookings answered in seconds, not shifts.' },
      { label: 'Ready-made systems', path: '/solutions/productised-systems', blurb: 'Fixed scope, fixed window, run for you.' },
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
