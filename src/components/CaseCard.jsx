import { Link } from 'react-router-dom';
import { Photo } from './Photo';

// One case card, fed per industry.
//
// The redesign handoff's formula, in order: an image across the top 40% at a
// fixed crop height, one UI proof element over it, a status pill in the source
// terminology, the source headline in serif, one compact paragraph, one or two
// tags, and a text action rather than a button. Six cards share this skeleton
// exactly; only the evidence changes.
//
// The whole card is one link where a destination exists -- one tab stop, one
// tap target -- and a plain article where it does not, so a card in build never
// offers a link into nothing.

const SINCE = { live: 'live since', pilot: 'pilot since', 'in build': 'target' };

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M4.6 8.2l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The single proof element. Each kind is a system state a reader would see in
// the product, drawn small enough to sit over a photograph without hiding it.
function Overlay({ overlay }) {
  if (!overlay) return null;

  switch (overlay.kind) {
    case 'confirm':
      return (
        <div className="cc-ov cc-ov--confirm">
          <span className="cc-ov__badge" aria-hidden="true">✓</span>
          <div>
            <p className="cc-ov__title">{overlay.title}</p>
            {overlay.lines.map((l) => <p key={l} className="cc-ov__line">{l}</p>)}
          </div>
        </div>
      );

    case 'message':
      return (
        <div className="cc-ov cc-ov--message">
          <p className="cc-ov__title"><span className="cc-ov__dot" aria-hidden="true" />{overlay.title}</p>
          {overlay.lines.map((l) => <p key={l} className="cc-ov__line">{l}</p>)}
          {overlay.status && <p className="cc-ov__status">{overlay.status}…</p>}
        </div>
      );

    case 'queue':
      return (
        <div className="cc-ov cc-ov--queue">
          <p className="cc-ov__title">{overlay.title}</p>
          <dl className="cc-ov__stats">
            {overlay.stats.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      );

    case 'checklist':
    default:
      return (
        <div className="cc-ov cc-ov--checklist">
          {overlay.title && <p className="cc-ov__title">{overlay.title}</p>}
          <ul className="cc-ov__list">
            {overlay.lines.map((l) => (
              <li key={l}><span className="cc-ov__check"><Check /></span>{l}</li>
            ))}
          </ul>
        </div>
      );
  }
}

// The image, over the field that stands in for it until the photography exists.
// The stand-in is deliberately a tonal surface and not an illustration: the
// handoff rules out generic diagrams, and a placeholder should not look like it
// is trying to be a photograph.
function Media({ cs }) {
  const industry = cs.vertical.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <div className={`cc-media cc-media--${industry}`}>
      <span className="cc-media__field" aria-hidden="true" />
      {/* Empty alt: the card is one link named by its headline, and the photo
          sets the scene rather than adding to what the link says. */}
      {cs.image && (
        <Photo name={cs.image.name} className="cc-media__img" sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 33vw" position={cs.image.position} />
      )}
      <div className={`cc-media__overlay${cs.place === 'bottom' ? ' cc-media__overlay--bottom' : ''}`}>
        <Overlay overlay={cs.overlay} />
      </div>
    </div>
  );
}

function Body({ cs }) {
  const live = cs.status === 'live';

  return (
    <div className="cc-body">
      <span className={`cc-pill${live ? ' cc-pill--live' : ''}`}>
        <span className="cc-pill__dot" aria-hidden="true" />
        {cs.vertical} · {cs.status}
      </span>

      <h3 className="cc-title">{cs.title}</h3>
      <p className="cc-text">{cs.body}</p>

      <ul className="cc-tags">
        <li className="cc-tag">replaced {cs.replaced}</li>
        <li className="cc-tag">{SINCE[cs.status] || 'since'} {cs.since}</li>
      </ul>

      {cs.cta && <span className="cc-cta">{cs.cta} <span aria-hidden="true">→</span></span>}
    </div>
  );
}

export function CaseCard({ cs }) {
  if (!cs.to) {
    return (
      <article data-anim="card" className="cc">
        <Media cs={cs} />
        <Body cs={cs} />
      </article>
    );
  }

  return (
    <Link
      to={cs.to}
      data-anim="card"
      className="cc cc--link"
      data-track="case_study_view"
      data-track-industry={cs.vertical.toLowerCase()}
      data-track-cta_location="home_cases"
    >
      <Media cs={cs} />
      <Body cs={cs} />
    </Link>
  );
}
