import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import { routes } from './routes';
import { reportWebVitals } from './lib/vitals';
import { installErrorMonitoring } from './lib/monitoring';

const router = createBrowserRouter(routes);

// Every public URL ships as prerendered HTML (scripts/prerender.mjs), so the
// page is already readable when this runs. Mounting straight away would swap
// that finished page for the route's loading state while its lazy chunk
// arrives. Waiting until the router has loaded the route means the first
// client render is the same page, and the swap is invisible.
function whenReady(r) {
  if (r.state.initialized) return Promise.resolve();
  return new Promise((resolve) => {
    const stop = r.subscribe((state) => {
      if (state.initialized) {
        stop();
        resolve();
      }
    });
  });
}

const rootEl = document.getElementById('root');

// Marks a first load that arrived as finished HTML, so the hero intro does not
// hide a headline the reader is already looking at. Consumed by
// useGsapTimeline on first use; later navigations animate as before.
if (rootEl.hasChildNodes()) document.documentElement.dataset.prerendered = '';

whenReady(router).then(() => {
  createRoot(rootEl).render(
    <StrictMode>
      <App router={router} />
    </StrictMode>,
  );
  // Says the app has taken over the prerendered markup. React clears the
  // container on its first commit, so anything that reads the page -- a test,
  // a screenshot, a crawler running JS -- can wait for this rather than catch
  // the blank frame in between.
  requestAnimationFrame(() => { document.documentElement.dataset.app = 'ready'; });
});

// Started here rather than inside a component: these are page-lifetime
// measurements, and StrictMode double-mounts a component in development, which
// would register two sets of observers and report everything twice.
installErrorMonitoring();
reportWebVitals();
