import { Link } from 'react-router-dom';
import { MENUS } from '../data/nav';

const menu = (label) => MENUS.find((m) => m.label === label)?.items ?? [];

// Columns come from the same MENUS the navbar renders, so the footer cannot
// drift from it. Only the menus that hold items are listed: About and Insights
// are single pages and live in the Company column instead.
const COLUMNS = [
  { head: 'How it works', items: menu('How it works') },
  { head: 'Solutions', items: menu('Solutions') },
  { head: 'Industries', items: menu('Industries') },
];

// The column heads were <h2> elements, which put four headings in the footer at
// the same level as the section headings of the page above it. They label lists;
// they are not document structure.
function FooterColumn({ head, items, children }) {
  return (
    <div>
      <p className="label footer__head">{head}</p>
      <ul className="footer__list">
        {items.map((item) => (
          <li key={item.path}><Link to={item.path} className="footer__link">{item.label}</Link></li>
        ))}
        {children}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <div className="footer__brand">
          <img src="/assets/ideora-lockup.png" alt="Ideora Labs" width="130" height="34" className="footer__logo" />
          <p className="small footer__blurb">
            We build and run the systems that carry the work your operation waits on.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <FooterColumn key={col.head} head={col.head} items={col.items} />
        ))}

        <FooterColumn
          head="Company"
          items={[{ path: '/about', label: 'About' }, { path: '/insights', label: 'Insights' }]}
        >
          <li><Link to="/about#contact" className="footer__link">Contact</Link></li>
          <li><a href="mailto:info@ideoralabs.com" className="footer__link footer__link--strong">info@ideoralabs.com</a></li>
          <li><span className="footer__place">Bengaluru</span></li>
        </FooterColumn>
      </div>

      <div className="footer__legal">
        <span>© 2026 Ideora Labs. Systems that run live operations.</span>
        <span className="footer__credit">
          designed and developed by{' '}
          <a href="https://velyxlabs.in" target="_blank" rel="noopener noreferrer">velyxlabs</a>
        </span>
      </div>

      {/* Oversized wordmark, clipped by the footer's own edge. Decorative only:
          the band is shorter than the letterforms, so their feet are cut off. */}
      <div aria-hidden="true" className="footer__mark">
        <span className="foot-mark" />Ideora
      </div>
    </footer>
  );
}
