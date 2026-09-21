// GA4, wired to the event layer that already exists.
//
// analytics.js is vendor-neutral: it pushes to dataLayer and calls gtag if a
// tag is installed. This installs that tag, under the rules the cookie page
// states -- no advertising or profiling signals, and nothing at all for a
// visitor who has asked not to be tracked. If those rules ever stop being
// true, that page has to change first.
//
// The measurement ID is the site's own, and public -- it ships in the page for
// anyone to read, and it identifies the property, not a person. It lives here
// so a deploy cannot silently lose analytics by missing an environment
// variable; VITE_GA_ID still overrides it, which is how a second property (a
// staging one, say) would be pointed at.

const SRC = 'https://www.googletagmanager.com/gtag/js?id=';

// "Your browser's block cookies or do not track setting is respected" -- the
// cookie page's words. Global Privacy Control is the same request in a newer
// form, so it counts too.
export function optedOut(nav = typeof navigator === 'undefined' ? null : navigator, win = typeof window === 'undefined' ? null : window) {
  if (!nav) return true;
  return (
    nav.doNotTrack === '1' ||
    nav.doNotTrack === 'yes' ||
    win?.doNotTrack === '1' ||
    nav.msDoNotTrack === '1' ||
    nav.globalPrivacyControl === true
  );
}

const DEFAULT_ID = 'G-6WR0P8L43K';

export function gaId() {
  const id = import.meta.env.VITE_GA_ID || DEFAULT_ID;
  return typeof id === 'string' && /^G-[A-Z0-9]+$/i.test(id.trim()) ? id.trim() : null;
}

let installed = false;

export function installGa4() {
  if (installed || typeof window === 'undefined') return false;

  const id = gaId();
  if (!id || optedOut()) return false;
  installed = true;

  window.dataLayer = window.dataLayer || [];
  // The real gtag: arguments, not an array literal, which is what Google's
  // snippet does and what the library reads back.
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());

  window.gtag('config', id, {
    // Page views are sent per route by trackPageView below: GA4's automatic
    // one fires on load only, and this is a single-page app, so every route
    // after the first would go uncounted.
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = SRC + encodeURIComponent(id);
  document.head.appendChild(s);

  return true;
}

// One page_view per route. The path and title only -- never a query string,
// which is where an email or a phone number would arrive from a mail campaign.
export function trackPageView(pathname, title) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: pathname,
    page_location: window.location.origin + pathname,
    page_title: title || document.title,
  });
}
