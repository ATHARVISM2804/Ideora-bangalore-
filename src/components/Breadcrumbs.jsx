import { Link } from 'react-router-dom';
import { Container } from './ui';
import { ORIGIN } from '../lib/site';
import { useJsonLd } from '../hooks/useJsonLd';

// Native links plus BreadcrumbList structured data, per the spec's
// cross-linking rules. Two jobs: a buyer three levels deep can get back to the
// product index in one click, and search results show the hierarchy instead of
// a bare URL.
//
// Renders nothing without a trail, so the pages that sit at the top level do
// not get a one-item breadcrumb that says only "Home".
export function Breadcrumbs({ trail, current }) {
  const crumbs = [{ label: 'Home', path: '/' }, ...(trail || [])];

  useJsonLd(
    trail?.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [...crumbs, { label: current }].map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            ...(c.path ? { item: ORIGIN + c.path } : {}),
          })),
        }
      : null,
    'breadcrumbs',
  );

  if (!trail?.length) return null;

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol className="crumbs__list">
          {crumbs.map((c) => (
            <li key={c.path} className="crumbs__item">
              <Link to={c.path}>{c.label}</Link>
            </li>
          ))}
          <li className="crumbs__item" aria-current="page">{current}</li>
        </ol>
      </nav>
    </Container>
  );
}
