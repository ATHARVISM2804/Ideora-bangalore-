// Single source of truth for the nav, the footer link columns, and the route
// table. Adding a page means adding it here and adding its copy to pages.js;
// PageShell asserts the two stay in sync.
//
// The shape follows the audit's content rule: products say what a buyer
// receives, services say how a custom build is delivered, industries say where
// it applies. The old menu mixed all three under "Solutions", so a buyer could
// not compare like with like. Every former path still resolves -- see the
// redirect matrix in redirects.js.
//
// A menu with a `path` gets an overview link at the top of its panel, so the
// index page is reachable and not just the leaves.

export const MENUS = [
  {
    label: 'Products',
    path: '/products',
    overview: 'All four products',
    items: [
      { label: 'Ideora Health', path: '/products/ideora-health', blurb: 'Appointments, intake, reminders and follow-up.' },
      { label: 'Ideora Auto', path: '/products/ideora-auto', blurb: 'Bookings, approvals, status and payment chase.' },
      { label: 'Ideora Property', path: '/products/ideora-property', blurb: 'Lead qualification, site visits and follow-up.' },
      { label: 'Operations Console', path: '/products/operations-console', blurb: 'Queues, exceptions, ageing and reporting.' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    overview: 'How we deliver',
    items: [
      { label: 'Custom AI automation', path: '/services/custom-ai-automation', blurb: 'For a workflow no product covers yet.' },
      { label: 'Ready-made systems', path: '/services/productised-systems', blurb: 'Fixed scope, fixed window, run for you.' },
      // The specification names workflow discovery, integration and managed
      // optimisation as required destinations, and its route tree gives them no
      // routes of their own. They are sections of the services index, linked by
      // anchor: real destinations rather than three more pages saying a
      // paragraph each, and no dead ends.
      { label: 'Workflow discovery', path: '/services#discovery', blurb: 'Find where the work actually waits.' },
      { label: 'Integration', path: '/services#integration', blurb: 'Connected to the systems you already run.' },
      { label: 'Managed optimisation', path: '/services#managed', blurb: 'We keep it running after launch.' },
    ],
  },
  {
    label: 'Industries',
    path: '/industries',
    overview: 'All three industries',
    items: [
      { label: 'Automotive', path: '/industries/automotive', blurb: 'Service centres and dealer groups.' },
      { label: 'Real Estate', path: '/industries/real-estate', blurb: 'Brokerages and developers.' },
      { label: 'Healthcare', path: '/industries/healthcare', blurb: 'Clinics and multi-site providers.' },
    ],
  },
  { label: 'Case studies', path: '/case-studies', items: [] },
  {
    label: 'How it works',
    path: '/how-it-works',
    overview: 'Discovery to managed operation',
    items: [
      { label: 'Works with your software', path: '/integrations', blurb: 'No migration. Nothing gets replaced.' },
    ],
  },
  // Top level, not tucked under "How it works". A procurement or IT reviewer
  // is sent to this site to answer one question, and the specification's
  // navigation table lists Security as a primary destination for that reason.
  { label: 'Security', path: '/security', items: [] },
];

// About, Insights and Contact are reachable from the footer and from "Talk to
// us" in the bar rather than from a seventh menu. The reference header carries
// six items, and a company menu is the one a buyer needs least while deciding
// whether there is a product here for them.
export const COMPANY_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

// These have hand-written components because they do something a prose page
// cannot: a product chooser, a case-study collection, a form. Everything else
// renders through PageShell from pages.js.
export const OWN_COMPONENT = new Set(['/about', '/insights', '/products', '/case-studies', '/contact', '/industries']);

// Reachable from the footer rather than the menu. A buyer's legal and IT
// reviewers look for these; they do not belong in a sales nav.
export const FOOTER_ONLY_PATHS = ['/privacy', '/terms', '/responsible-ai', '/subprocessors', '/cookies'];

export const ALL_PAGE_PATHS = [
  ...new Set([
    ...MENUS.flatMap((m) => [m.path, ...m.items.map((i) => i.path)])
      .filter((p) => p && !p.includes('#') && !OWN_COMPONENT.has(p)),
    ...COMPANY_LINKS.map((l) => l.path).filter((p) => !OWN_COMPONENT.has(p)),
    ...FOOTER_ONLY_PATHS,
  ]),
];
