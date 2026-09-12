import { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Section, Container, Label, Button } from '../components/ui';
import { reportError } from '../lib/monitoring';

// The 500 state.
//
// There was a custom 404 and nothing else: a thrown render, a chunk that failed
// to load on a flaky connection, or a route that threw during navigation all
// produced a blank white page. A buyer evaluating a supplier who builds
// operational software does not need to see that.
//
// It is deliberately quiet about the failure. What a reader needs is a way
// onward and a way to reach a person; the detail goes to monitoring, where
// somebody can act on it.
export function ErrorState() {
  const error = useRouteError();

  useEffect(() => {
    reportError(error, { source: 'route_boundary' });
  }, [error]);

  // A 404 reaching this boundary is still a 404, not a failure.
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Section>
      <Container>
        <Label>{notFound ? '404' : 'Something went wrong'}</Label>
        <h1 style={{ marginTop: 'var(--s-4)' }}>
          {notFound ? 'That page has moved, or never existed' : 'This page did not load'}
        </h1>
        <p className="lede prose" style={{ marginTop: 'var(--s-5)' }}>
          {notFound
            ? 'Nothing is broken on your side. Everything below is one click away.'
            : 'Something failed on our side and we have been told about it. Reloading usually clears it. If it does not, the rest of the site is fine and we would rather you reached us directly than kept trying.'}
        </p>

        <div className="nf__row" style={{ marginTop: 'var(--s-7)' }}>
          <Link to="/products" className="nf__quiet">Products</Link>
          <Link to="/case-studies" className="nf__quiet">Case studies</Link>
          <Link to="/security" className="nf__quiet">Security and data</Link>
          <Link to="/contact" className="nf__quiet">Contact</Link>
        </div>

        <div style={{ marginTop: 'var(--s-7)', display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
          <Button to="/">Back to home</Button>
          {!notFound && (
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Reload this page
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
