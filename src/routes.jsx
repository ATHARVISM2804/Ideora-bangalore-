import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { ALL_PAGE_PATHS } from './data/nav';
import { RouteFallback } from './components/RouteFallback';

// Home is bundled with the shell because it is the entry point for almost
// every visit. Everything else is split out behind a lazy route.
//
// The win is data/pages.js: 43KB of copy for the eleven sub-pages, which the
// home page used to parse without rendering a word of it. The paths come from
// nav.js -- already the single source of truth for the nav and the footer, and
// small -- so the route table can be built without loading the copy.

const subPage = (path) => async () => {
  const [{ PageShell }, { PAGES }] = await Promise.all([
    import('./pages/PageShell'),
    import('./data/pages'),
  ]);
  return { element: <PageShell page={PAGES.find((p) => p.path === path)} /> };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    HydrateFallback: RouteFallback,
    children: [
      { index: true, element: <Home /> },

      ...ALL_PAGE_PATHS.map((path) => ({
        path: path.slice(1),
        lazy: subPage(path),
      })),

      {
        path: 'about',
        lazy: async () => ({ Component: (await import('./pages/About')).About }),
      },
      {
        path: 'insights',
        lazy: async () => ({ Component: (await import('./pages/Insights')).Insights }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('./pages/NotFound')).NotFound }),
      },
    ],
  },
]);

export default router;
