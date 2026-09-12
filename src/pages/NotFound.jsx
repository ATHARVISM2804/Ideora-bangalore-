import { Link, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Section, Container, Label, Button } from '../components/ui';
import { PRODUCTS } from '../data/products';

// Spec: the not-found page is branded, helpful, and excluded from the sitemap.
//
// It was none of those things -- a heading, a sentence and a link home, which
// tells a buyer who followed a stale link that they have reached a dead end.
// Most arrivals here come from an old URL or a search result, so the page
// offers the four products and the trust pages rather than making them start
// again from the homepage.
export function NotFound() {
  const { pathname } = useLocation();

  useDocumentTitle('Page not found | Ideora Labs', 'That page does not exist. Here is where the rest of the site is.');

  return (
    <Section>
      <Container>
        <Label>404</Label>
        <h1 style={{ marginTop: 'var(--s-4)' }}>That page has moved, or never existed</h1>
        <p className="lede prose" style={{ marginTop: 'var(--s-5)' }}>
          Nothing is broken on your side. We reorganised the site around four named products,
          so an older link may no longer point anywhere. Everything below is one click away.
        </p>

        <p className="fine" style={{ marginTop: 'var(--s-4)' }}>
          You asked for <code>{pathname}</code>
        </p>

        <div style={{ marginTop: 'var(--s-7)' }}>
          <Label>Products</Label>
          <ul className="nf__list">
            {PRODUCTS.map((p) => (
              <li key={p.path}>
                <Link to={p.path} className="nf__link">
                  <span className="nf__name">{p.name}</span>
                  <span className="small">{p.promise}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 'var(--s-7)' }}>
          <Label>Or</Label>
          <div className="nf__row">
            <Link to="/case-studies" className="nf__quiet">Case studies</Link>
            <Link to="/services" className="nf__quiet">How a build runs</Link>
            <Link to="/security" className="nf__quiet">Security and data</Link>
            <Link to="/contact" className="nf__quiet">Contact</Link>
          </div>
        </div>

        <div style={{ marginTop: 'var(--s-7)' }}>
          <Button to="/">Back to home</Button>
        </div>
      </Container>
    </Section>
  );
}
