// Core Web Vitals reporting.
//
// The specification sets mobile p75 targets -- LCP under 2.5s, INP under
// 200ms, CLS under 0.1 -- and p75 is a field measurement. No lab run produces
// it: it needs real visitors on real devices and networks over a rolling
// window. This is what turns those targets from an aspiration into something
// management can actually read at the end of a month.
//
// It reports into the same dataLayer as every other event, so whichever tag
// gets installed picks these up with no further wiring, and it no-ops cleanly
// until one is.

import { track } from './analytics';

// Google's own thresholds, so "good" here means the same thing it means in
// Search Console and CrUX rather than a number we picked.
const THRESHOLDS = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

const rate = (name, value) => {
  const t = THRESHOLDS[name];
  if (!t) return 'unknown';
  return value <= t[0] ? 'good' : value <= t[1] ? 'needs-improvement' : 'poor';
};

function report(metric) {
  const { name, value, id, navigationType } = metric;

  // CLS is unitless and small; everything else is milliseconds. Rounding
  // milliseconds to integers keeps the analytics cardinality sane.
  const v = name === 'CLS' ? +value.toFixed(4) : Math.round(value);

  track('web_vitals', {
    metric_name: name,
    metric_value: v,
    metric_rating: rate(name, value),
    // The unique id lets the vendor deduplicate the several reports a single
    // page view sends as a metric settles, rather than counting each one.
    metric_id: id,
    navigation_type: navigationType,
    page_path: window.location.pathname,
  });
}

// Started immediately rather than on requestIdleCallback.
//
// Each of these observers is registered with `buffered: true`, so it is handed
// entries the browser recorded before it existed -- but only while the browser
// still retains them. Waiting for idle bets on that window staying open on a
// slow device under load, for no meaningful saving: the import is dynamic, so
// none of it is in the entry bundle and none of it blocks paint. It simply
// starts queuing at once.
//
// Worth knowing when testing this: LCP is not reported at load. web-vitals
// finalises it on the first real click or keydown, or when the page is hidden,
// because until then a larger element may still paint. A synthetic
// PointerEvent will not do it. That is correct behaviour, not a missing
// metric.
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  import('web-vitals')
    .then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      onLCP(report);
      onINP(report);
      onCLS(report);
      onFCP(report);
      onTTFB(report);
    })
    .catch(() => {
      /* measurement is never load-bearing */
    });
}
