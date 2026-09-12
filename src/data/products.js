// The four named products.
//
// This is the list the audit asked for: a buyer who lands cold should be able
// to point at the one that matches their business without reading a services
// page first. It drives the homepage chooser, the products index and the
// Product structured data, so a product exists in exactly one place.
//
// `status` is honest and shown as text, never colour alone. "Live" means it is
// running in production for a client today.
//
// The specification's wording for these CTAs is "Watch the health workflow".
// That promises a recorded video, and there is not one yet -- walkthroughs are
// run live against demonstration data. When the four product demos are
// recorded (P1, WEB-101), "See" becomes "Watch" here and the Demo block's
// fallback copy comes out.

export const PRODUCTS = [
  {
    name: 'Ideora Health',
    path: '/products/ideora-health',
    industry: 'healthcare',
    audience: 'Clinics, specialty hospitals and diagnostics',
    promise: 'Appointments, intake, reminders and patient follow-up',
    outcome: 'Enquiries answered in seconds, at any hour, and booked straight into the calendar your front desk already works in.',
    cta: 'See the health workflow',
    status: 'live',
  },
  {
    name: 'Ideora Auto',
    path: '/products/ideora-auto',
    industry: 'automotive',
    audience: 'Dealer groups and multi-site service centres',
    promise: 'Booking, approvals, live status and payment follow-up',
    outcome: 'Service slots booked against real bay capacity, estimates approved in writing, and customers updated without an advisor stopping work.',
    cta: 'See the service workflow',
    status: 'live',
  },
  {
    name: 'Ideora Property',
    path: '/products/ideora-property',
    industry: 'real estate',
    audience: 'Developers, brokerages and project sales teams',
    promise: 'Lead qualification, viewing booking and sales follow-up',
    outcome: 'Every lead answered before interest cools, qualified on budget and timeline, and a site visit booked from the agent calendar.',
    cta: 'See the sales workflow',
    status: 'live',
  },
  {
    name: 'Operations Console',
    path: '/products/operations-console',
    industry: 'cross-industry',
    audience: 'Management teams across multiple sites and queues',
    promise: 'Queues, exceptions, ageing and management reporting',
    outcome: 'One view of work done, work waiting and the exceptions that need a person, built from the same records the work happened in.',
    cta: 'View the management console',
    status: 'included',
  },
];

export const STATUS_LABEL = {
  live: 'Live with clients',
  pilot: 'In pilot',
  build: 'In build',
  included: 'Included with every system',
};
