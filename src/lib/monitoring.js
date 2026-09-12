// Error monitoring.
//
// The architecture page asks for it and there was none: a thrown render
// produced a white page that nobody found out about. This is the seam, not the
// vendor -- it reports into the same dataLayer as everything else and calls
// whatever handler is installed, so adding Sentry or similar later is a script
// tag and one assignment rather than a refactor.
//
// Nothing here can itself throw. A monitoring layer that breaks the page it is
// watching is worse than no monitoring at all.

function shape(error) {
  if (!error) return { message: 'unknown' };
  if (typeof error === 'string') return { message: error.slice(0, 300) };

  return {
    // Route errors carry a status; render errors carry a stack.
    message: String(error.statusText || error.message || error).slice(0, 300),
    status: error.status,
    // First few frames only. A full stack is noise in an event payload and can
    // carry query strings from the URLs in it.
    stack: typeof error.stack === 'string' ? error.stack.split('\n').slice(0, 4).join('\n') : undefined,
  };
}

export function reportError(error, context = {}) {
  const detail = { ...shape(error), ...context, page_path: window.location?.pathname };

  try {
    if (import.meta.env.DEV) console.error('[monitoring]', detail, error);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'app_error', ...detail });

    // Whatever vendor gets installed reads this.
    window.__onError?.(error, detail);
  } catch {
    /* monitoring must never take the page down with it */
  }
}

// Anything that escapes React entirely: a failed dynamic import, a listener
// that threw, a rejected promise nobody caught.
export function installErrorMonitoring() {
  const onError = (e) => reportError(e.error || e.message, { source: 'window_error' });
  const onRejection = (e) => reportError(e.reason, { source: 'unhandled_rejection' });

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
  };
}
