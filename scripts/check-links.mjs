// Fails the build when an internal link points at nothing.
//
// This is the check that would have caught the audit's headline finding before
// it reached a client: thirteen linked routes that returned 404. It is static,
// so it runs in CI without a browser or a deployment.
//
// Three things are verified:
//   1. Every internal href in the source resolves to a route or a redirect.
//   2. vercel.json's redirects match src/data/redirects.js exactly.
//   3. Every route in the table has copy behind it.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const { ALL_PAGE_PATHS, FOOTER_ONLY_PATHS, OWN_COMPONENT, COMPANY_LINKS } =
  await import(resolve(root, 'src/data/nav.js'));
const { REDIRECTS } = await import(resolve(root, 'src/data/redirects.js'));
const { CASE_STUDIES } = await import(resolve(root, 'src/data/caseStudies.js'));
const { PRODUCTS } = await import(resolve(root, 'src/data/products.js'));

const failures = [];

// --- 1. Known destinations -------------------------------------------------
// Derived, not listed. This set was hand-maintained and immediately drifted:
// adding /industries as a real page made the checker reject the nav that
// pointed at it.
const known = new Set([
  '/',
  // Internal, deliberately unlinked and unindexed.
  '/components',
  ...ALL_PAGE_PATHS,
  ...OWN_COMPONENT,
  ...FOOTER_ONLY_PATHS,
  ...COMPANY_LINKS.map((l) => l.path),
  ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
  ...REDIRECTS.map((r) => r.from),
]);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(resolve(root, 'src')).filter((f) => /\.(jsx?|css)$/.test(f));
const anchors = [];

// Any string literal that looks like a site-root path. Catching only `to=`
// and `href=` missed a lookup table in Work.jsx that pointed four case-study
// cards at a route that had moved -- exactly the class of stale link this
// script exists to find, so the net is cast wider and the known-safe prefixes
// are filtered below instead.
// Must begin with a letter, so "1/12" style fragments in copy are not read as
// routes.
// The fragment is captured separately so "/services#discovery" is checked as
// a link to /services rather than skipped entirely, which is what happened
// before: anchored links matched nothing and were silently unvalidated.
const LINK = /['"](\/[a-z][^'"?\s]*)['"]/gi;

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(LINK)) {
    const [pathPart, fragment] = m[1].split('#');
    const href = pathPart.replace(/\/$/, '') || '/';
    if (fragment) anchors.push({ file, href, fragment });
    if (href.startsWith('/api/') || href.startsWith('/assets/')) continue;
    if (href.startsWith('/src/') || href.startsWith('/node_modules/')) continue;
    if (href.startsWith('/fonts/')) continue;
    // A file, not a route. The bound was {2,4}, which let .woff2 through and
    // reported six self-hosted fonts as broken links.
    if (/\.[a-z0-9]{2,5}$/i.test(href)) continue;
    if (!known.has(href)) {
      failures.push(`${file.replace(root + '/', '')}: links to ${href}, which is not a route`);
    }
  }
}

// An anchored link must land on an id that exists somewhere in the source.
// Cheap and static, but it catches the common case: a section renamed and the
// three links into it left pointing at nothing.
const allSource = files.map((f) => readFileSync(f, 'utf8')).join('\n');
for (const { file, href, fragment } of anchors) {
  const declared =
    allSource.includes(`id: '${fragment}'`) ||
    allSource.includes(`id="${fragment}"`) ||
    allSource.includes(`id={'${fragment}'}`);
  if (!declared) {
    failures.push(`${file.replace(root + '/', '')}: links to ${href}#${fragment}, and no element declares that id`);
  }
}

// --- 2. Redirects agree with the host config -------------------------------
const vercel = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'));
const inConfig = new Map((vercel.redirects || []).map((r) => [r.source, r]));

for (const { from, to } of REDIRECTS) {
  const r = inConfig.get(from);
  if (!r) failures.push(`vercel.json is missing the 301 for ${from}`);
  else if (r.destination !== to) failures.push(`vercel.json sends ${from} to ${r.destination}, redirects.js says ${to}`);
  else if (r.permanent !== true) failures.push(`${from} is not a permanent redirect`);
  inConfig.delete(from);
}
for (const source of inConfig.keys()) {
  failures.push(`vercel.json redirects ${source}, which redirects.js does not list`);
}

// A redirect must land somewhere real, and must not chain.
for (const { from, to } of REDIRECTS) {
  const target = to.split('#')[0];
  if (!known.has(target)) failures.push(`${from} redirects to ${to}, which is not a route`);
  if (REDIRECTS.some((r) => r.from === target)) failures.push(`${from} redirects to ${to}, which redirects again`);
}

// --- 3. Every route has copy ------------------------------------------------
const pagesSrc = readFileSync(resolve(root, 'src/data/pages.js'), 'utf8');
for (const p of ALL_PAGE_PATHS) {
  if (!pagesSrc.includes(`path: '${p}'`)) failures.push(`${p} is routed but has no entry in pages.js`);
}

// Every product must be reachable and described.
for (const p of PRODUCTS) {
  if (!known.has(p.path)) failures.push(`product ${p.name} points at ${p.path}, which is not a route`);
}

if (failures.length) {
  console.error(`\nLink check failed (${failures.length}):\n`);
  failures.forEach((f) => console.error('  ✗ ' + f));
  console.error('');
  process.exit(1);
}

console.log(`Link check passed: ${known.size} destinations, ${REDIRECTS.length} redirects, ${files.length} files scanned.`);
