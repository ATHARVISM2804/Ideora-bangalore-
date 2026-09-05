import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { PageShell } from './pages/PageShell';
import { NotFound } from './pages/NotFound';
import { PAGES } from './data/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...PAGES.map((page) => ({
        path: page.path.slice(1),
        element: <PageShell page={page} />,
      })),
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
