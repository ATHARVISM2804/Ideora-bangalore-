// Generates public/sitemap.xml from the route table.
//
// The sitemap used to be hand-maintained, which is how it ended up listing
// fourteen URLs on a domain the site no longer uses. Deriving it from nav.js
// means a route cannot be added without appearing here, and a route that is
// redirected away cannot linger: only canonical 200 routes are listed, which
// is the spec's acceptance condition.

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// nav.js and the rest are plain ESM with no JSX, so they import directly.
const { ALL_PAGE_PATHS } = await import(resolve(root, 'src/data/nav.js'));
const { REDIRECTS } = await import(resolve(root, 'src/data/redirects.js'));
const { CASE_STUDIES } = await import(resolve(root, 'src/data/caseStudies.js'));

const ORIGIN = readFileSync(resolve(root, 'src/lib/site.js'), 'utf8')
  .match(/export const ORIGIN = '([^']+)'/)[1];

// Priority says what a crawler should reach for first, not how much we like a
// page. Home, then the four products, then everything else.
const priority = (p) =>
  p === '/' ? '1.0'
  : p === '/products' || p.startsWith('/products/') ? '0.9'
  : p.startsWith('/case-studies') || p.startsWith('/industries/') ? '0.8'
  : p === '/privacy' || p === '/terms' || p === '/responsible-ai' ? '0.3'
  : '0.7';

const paths = [
  '/',
  '/products',
  ...ALL_PAGE_PATHS,
  '/case-studies',
  ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
  '/about',
  '/insights',
  '/contact',
];

const redirected = new Set(REDIRECTS.map((r) => r.from));
const unique = [...new Set(paths)].filter((p) => !redirected.has(p)).sort();

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (p) => `  <url>
    <loc>${ORIGIN}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority(p)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`sitemap: ${unique.length} canonical URLs on ${ORIGIN}`);
