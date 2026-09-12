// Conversion measurement.
//
// The site had no analytics at all, so management could not tell which product
// or industry produced a meeting. This is the event layer the specification
// asks for. It is deliberately vendor-neutral: it writes to `dataLayer`, which
// GA4 via GTM, Meta and most CRMs can all read, and it no-ops cleanly when no
// tag is installed. Installing the tag is a one-line change in index.html; no
// component has to know which vendor won.
//
// Nothing here sets a cookie or identifies a person. It records which product
// and industry a visitor engaged with, never who they are.

// The full event vocabulary. Anything not on this list is a typo, and in dev
// it says so rather than silently reporting nothing for a quarter.
export const EVENTS = [
  'product_view',
  'demo_start',
  'demo_complete',
  'case_study_view',
  'discovery_start',
  'discovery_booked',
  'whatsapp_click',
  'form_error',
];

// Data-quality rule from the spec: no names, phone numbers, emails, patient
// details or message bodies reach analytics. The call sites are all ours and
// all pass enum-ish strings, but this is the kind of rule that holds for a year
// and then quietly breaks when someone adds `email` to a form payload, so it is
// enforced here rather than written in a comment.
const FORBIDDEN = /^(name|email|business_?email|phone|mobile|message|patient|address|company_?name)$/i;
const EMAILISH = /@|^\+?\d[\d\s-]{7,}$/;

function scrub(props) {
  const clean = {};
  for (const [k, v] of Object.entries(props)) {
    if (FORBIDDEN.test(k)) continue;
    if (typeof v === 'string' && EMAILISH.test(v)) continue;
    if (v !== undefined && v !== null && v !== '') clean[k] = v;
  }
  return clean;
}

export function track(event, props = {}) {
  if (import.meta.env.DEV && !EVENTS.includes(event)) {
    console.warn(`[analytics] unknown event "${event}" -- add it to EVENTS or fix the name.`);
  }

  const payload = { event, ...scrub(props) };

  // Never let a missing or broken tag take a page down with it.
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', event, scrub(props));
  } catch {
    /* analytics is never load-bearing */
  }

  if (import.meta.env.DEV) console.debug('[analytics]', payload);
}

// Delegated handler for `data-track` attributes, so a plain anchor or button
// can report an event without every component importing this module. Outbound
// links are tracked before navigation rather than after, because the unload
// races the beacon otherwise.
export function installClickTracking() {
  const onClick = (e) => {
    const el = e.target.closest?.('[data-track]');
    if (!el) return;
    const props = {};
    for (const { name, value } of el.attributes) {
      if (name.startsWith('data-track-')) props[name.slice(11).replace(/-/g, '_')] = value;
    }
    track(el.getAttribute('data-track'), props);
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
