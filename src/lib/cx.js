// Joins class names, dropping anything falsy, so a component can write
// `cx('btn', variant && `btn--${variant}`)` without guarding each part.
export const cx = (...parts) => parts.filter(Boolean).join(' ');
