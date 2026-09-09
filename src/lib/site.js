// One place for the things that have to agree across the document head, the
// sitemap and the share cards. Change ORIGIN here when the custom domain is
// live and the canonical URLs, sitemap and og:url all follow.
export const ORIGIN = 'https://ideoralabs.vercel.app';

export const SITE_NAME = 'Ideora Labs';
export const DEFAULT_TITLE = 'Ideora Labs | Systems that finish the job.';
export const DEFAULT_DESCRIPTION =
  'We build and run the systems that carry the work your team is waiting on: booking, approvals, follow-up and reporting, all inside the software your business already owns.';

// Share image. A real 1200x630 card would be better than the app icon, but
// inventing one is a design job rather than a wiring job; this at least stops
// a shared link rendering with no image at all.
export const SHARE_IMAGE = '/icon-512.png';

export const canonical = (pathname) =>
  ORIGIN + (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''));
