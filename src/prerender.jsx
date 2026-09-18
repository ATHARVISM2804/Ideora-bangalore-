import { createRoot } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { routes } from './routes';

// Build-time entry, run by scripts/prerender.mjs inside a simulated browser
// (jsdom). It renders one URL exactly as the client would -- effects included,
// so the per-route title, meta tags and JSON-LD land in <head> -- and resolves
// once the route's lazy chunk has loaded and the page has settled.
//
// Deliberately the client renderer, not renderToString: the head is written by
// effects, and running the real app means the static HTML cannot drift from
// what a visitor's browser builds.
export async function render(url) {
  const router = createMemoryRouter(routes, { initialEntries: [url] });

  await new Promise((resolve) => {
    if (router.state.initialized) return resolve();
    const stop = router.subscribe((s) => {
      if (s.initialized) {
        stop();
        resolve();
      }
    });
  });

  const root = createRoot(document.getElementById('root'));
  flushSync(() => root.render(<RouterProvider router={router} />));

  // Let effects run and anything they schedule settle.
  await new Promise((r) => setTimeout(r, 50));
  return () => root.unmount();
}
