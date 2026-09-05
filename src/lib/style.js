// Parses a CSS declaration string into a React style object.
//
// The design source (Ideora Home v5.dc.html) uses CSS strings in every `style`
// attribute. Keeping them as strings means each section can be diffed against
// the original character-for-character, so this converts at runtime instead.
// Results are memoized by input string, and the same string is passed on almost
// every render, so parsing happens once per distinct declaration.

const cache = new Map();

export function s(css) {
  if (!css) return undefined;
  const hit = cache.get(css);
  if (hit) return hit;

  const out = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop || !value) continue;
    out[prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
  }

  cache.set(css, out);
  return out;
}
