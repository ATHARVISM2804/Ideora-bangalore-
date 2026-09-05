import { Link } from 'react-router-dom';
import { s } from '../lib/style';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('Not found — Ideora Labs', 'That page does not exist.');

  return (
    <section style={s('padding:160px 0 200px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <h1 style={s('margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:64px; letter-spacing:-0.035em')}>Not found</h1>
        <p style={s('margin:20px 0 0; color:#5A616D')}>That page does not exist.</p>
        <Link to="/" style={s('display:inline-block; margin-top:28px; color:#F4601E; text-decoration:none')}>Back to home</Link>
      </div>
    </section>
  );
}
