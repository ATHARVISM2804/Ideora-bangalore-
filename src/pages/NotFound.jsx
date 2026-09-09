import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Section, Container, Button } from '../components/ui';

export function NotFound() {
  useDocumentTitle('Not found | Ideora Labs', 'That page does not exist.');

  return (
    <Section>
      <Container>
        <h1>Not found</h1>
        <p className="lede" style={{ marginTop: 'var(--s-5)' }}>
          That page does not exist. It may have moved, or the link may be wrong.
        </p>
        <div style={{ marginTop: 'var(--s-6)' }}>
          <Button to="/" variant="secondary">Back to home</Button>
        </div>
      </Container>
    </Section>
  );
}
