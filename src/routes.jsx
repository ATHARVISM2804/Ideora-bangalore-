import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { ALL_PAGE_PATHS } from './data/nav';
import { REDIRECTS } from './data/redirects';
import { RouteFallback } from './components/RouteFallback';
import { ErrorState } from './pages/ErrorState';

// Home is bundled with the shell because it is the entry point for almost
// every visit. Everything else is split out behind a lazy route.
//
// The win is data/pages.js: the copy for every prose page, which the home page
// used to parse without rendering a word of it. The paths come from nav.js --
// already the single source of truth for the nav and the footer, and small --
// so the route table can be built without loading the copy.

const subPage = (path) => async () => {
  const [{ PageShell }, { PAGES }] = await Promise.all([
    import('./pages/PageShell'),
    import('./data/pages'),
  ]);
  return { element: <PageShell page={PAGES.find((p) => p.path === path)} /> };
};

const lazyPage = (load, name) => async () => ({ Component: (await load())[name] });

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    HydrateFallback: RouteFallback,
    // Catches anything a child route throws -- a render error, a chunk that
    // failed to load -- and renders it inside the shell, so a reader keeps the
    // navigation and the footer instead of getting a white page.
    errorElement: <ErrorState />,
    children: [
      { index: true, element: <Home /> },

      ...ALL_PAGE_PATHS.map((path) => ({
        path: path.slice(1),
        lazy: subPage(path),
      })),

      { path: 'products', lazy: lazyPage(() => import('./pages/Products'), 'Products') },
      { path: 'industries', lazy: lazyPage(() => import('./pages/Industries'), 'Industries') },

      // Internal. Not in the navigation, not in the sitemap, noindexed.
      { path: 'components', lazy: lazyPage(() => import('./pages/Components'), 'Components') },
      { path: 'case-studies', lazy: lazyPage(() => import('./pages/CaseStudies'), 'CaseStudies') },
      { path: 'case-studies/:slug', lazy: lazyPage(() => import('./pages/CaseStudy'), 'CaseStudy') },
      { path: 'contact', lazy: lazyPage(() => import('./pages/Contact'), 'Contact') },
      { path: 'about', lazy: lazyPage(() => import('./pages/About'), 'About') },
      { path: 'insights', lazy: lazyPage(() => import('./pages/Insights'), 'Insights') },

      // The host serves these as real 301s (vercel.json). These exist so the
      // same URLs behave identically in `vite dev`, where nothing sits in
      // front of the app to redirect them.
      ...REDIRECTS.map(({ from, to }) => ({
        path: from.slice(1),
        element: <Navigate to={to} replace />,
      })),

      { path: '*', lazy: lazyPage(() => import('./pages/NotFound'), 'NotFound') },
    ],
  },
]);

export default router;
