// Route remediation matrix.
//
// Every path below was linked from the site, and from the sitemap, before the
// products/services/industries split. They must keep resolving: a 404 on a URL
// a crawler already knows is worse than the old page.
//
// These are served as real 301s by the host (vercel.json mirrors this list, and
// scripts/check-redirects.mjs fails the build if the two drift). The client
// entries below only matter in `vite dev`, where no host is in front of the app.

export const REDIRECTS = [
  { from: '/platforms/ops-console', to: '/products/operations-console' },
  { from: '/platforms/agent-runtime', to: '/how-it-works' },
  { from: '/platforms/integrations', to: '/integrations' },
  { from: '/solutions/agentic-ai', to: '/services/custom-ai-automation' },
  { from: '/solutions/real-estate', to: '/products/ideora-property' },
  { from: '/solutions/healthcare', to: '/products/ideora-health' },
  { from: '/solutions/service-centre', to: '/products/ideora-auto' },
  { from: '/solutions/productised-systems', to: '/services/productised-systems' },
];
