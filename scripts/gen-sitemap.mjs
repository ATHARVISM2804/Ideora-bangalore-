// Generates public/sitemap.xml and public/robots.txt from the same MENUS the
// navbar and the route table are built from, so the sitemap cannot drift from
// the site. Wired to prebuild — it runs on every build, including Vercel's.
import { writeFileSync } from 'node:fs';
import { ORIGIN } from '../src/lib/site.js';
import { ALL_PAGE_PATHS, MENUS } from '../src/data/nav.js';

const flat = MENUS.filter((m) => m.path).map((m) => m.path);
const paths = ['/', ...ALL_PAGE_PATHS, ...flat];

const today = new Date().toISOString().slice(0, 10);
const url = (p) =>
  `  <url>\n    <loc>${ORIGIN}${p === '/' ? '/' : p}</loc>\n    <lastmod>${today}</lastmod>\n` +
  `    <priority>${p === '/' ? '1.0' : '0.7'}</priority>\n  </url>`;

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(url).join('\n')}\n</urlset>\n`,
);

writeFileSync(
  'public/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
);

console.log(`sitemap: ${paths.length} routes`);
