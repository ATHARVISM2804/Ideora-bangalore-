import { Link } from 'react-router-dom';
import { cx } from '../lib/cx';

// Thin wrappers over the classes in layout.css and components.css. They exist
// so a section states what a thing IS -- a band, a card, a primary action --
// instead of restating how it looks. None of them own styling of their own.

// --- Band -------------------------------------------------------------------
// `tone="sunken"` gives the alternating ground plus its top and bottom rules.
export function Section({ tone, tight, edge, className, children, ...rest }) {
  return (
    <section
      className={cx(
        'section',
        tone === 'sunken' && 'section--sunken',
        tight && 'section--tight',
        edge === 'top' && 'section--top',
        edge === 'bottom' && 'section--bottom',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

// --- Container --------------------------------------------------------------
// Default is the editorial column. `wide` is for artefacts that earn the extra
// room: the hero map, the footer.
export function Container({ wide, className, children, ...rest }) {
  return (
    <div className={cx('container', wide && 'container--wide', className)} {...rest}>
      {children}
    </div>
  );
}

export function Grid({ className, children, ...rest }) {
  return <div className={cx('grid', className)} {...rest}>{children}</div>;
}

// --- Label ------------------------------------------------------------------
// The tracked eyebrow. One tracking, and used only where it names a region the
// heading does not already name.
export function Label({ as: As = 'div', className, children, ...rest }) {
  return <As className={cx('label', className)} {...rest}>{children}</As>;
}

// --- Section head -----------------------------------------------------------
// The label / heading / standfirst opening, which six sections were each
// spelling out in full.
//
// `label` is deliberately optional and deliberately rare. A tracked eyebrow
// above every heading is template chrome, and most of the ones on this site
// restated the heading underneath them -- "What we build" over "Five
// practices. One method." tells the reader nothing twice. It survives only
// where it says something the heading does not, such as how to read the table
// beneath it.
export function SectionHead({ label, title, lede, center, className }) {
  return (
    <div className={cx(center && 'section-head--center', className)}>
      {label && <Label data-anim="head">{label}</Label>}
      <h2 data-anim="head" className="section-head__title">{title}</h2>
      {lede && <p data-anim="head" className="lede section-head__lede">{lede}</p>}
    </div>
  );
}

// --- Button -----------------------------------------------------------------
// Absorbs the five divergent CTA recipes the sections used to carry. Renders
// as a router Link when given `to`, an anchor when given `href`, otherwise a
// real button -- so keyboard and screen-reader semantics follow the role
// rather than the styling.
export function Button({
  variant = 'primary',
  size,
  block,
  to,
  href,
  className,
  children,
  ...rest
}) {
  const cls = cx(
    'btn',
    `btn--${variant}`,
    size === 'sm' && 'btn--sm',
    block && 'btn--block',
    className,
  );

  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

// --- Card -------------------------------------------------------------------
export function Card({ as: As = 'div', variant, className, children, ...rest }) {
  return (
    <As className={cx('card', variant && `card--${variant}`, className)} {...rest}>
      {children}
    </As>
  );
}

// --- Pill -------------------------------------------------------------------
export function Pill({ as: As = 'span', accent, live, className, children, ...rest }) {
  return (
    <As className={cx('pill', accent && 'pill--accent', className)} {...rest}>
      {live && <span className="dot" aria-hidden="true" />}
      {children}
    </As>
  );
}

// --- Stat -------------------------------------------------------------------
// A label over a figure. Used by the proof strips and the facts row.
export function Stat({ label, value, className }) {
  return (
    <div className={className}>
      <div className="stat__label">{label}</div>
      <div className="stat__value">{value}</div>
    </div>
  );
}
