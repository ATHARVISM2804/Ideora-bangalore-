// One place for the things that have to agree across the document head, the
// sitemap and the share cards. Change ORIGIN here when the custom domain is
// live and the canonical URLs, sitemap and og:url all follow.
export const ORIGIN = 'https://www.ideoralabs.com';

export const SITE_NAME = 'Ideora Labs';
export const DEFAULT_TITLE = 'Ideora Labs | Systems that finish the job.';
export const DEFAULT_DESCRIPTION =
  'We build and run the systems that carry the work your team is waiting on: booking, approvals, follow-up and reporting, all inside the software your business already owns.';

// Share image: a real 1200x630 card, so a shared link renders as a wide
// preview rather than a cropped app icon.
export const SHARE_IMAGE = '/og.png';

export const canonical = (pathname) =>
  ORIGIN + (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''));
