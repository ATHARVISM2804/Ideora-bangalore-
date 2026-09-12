// Publishing controls, enforced.
//
// The content model asks for draft/review/published states and a rule that a
// product cannot publish without its CTA, metadata and at least one
// demonstrable workflow. That is a CMS feature, and there is no CMS: the
// content lives in typed data files, edited in the same commits as the code.
//
// So the rule lives here instead. It is the part of that page that actually
// protects anything -- what it prevents is a thin page looking finished and
// going live, which is exactly the failure the audit found on thirteen routes.
// A product that fails any of these fails the build rather than shipping.

import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { build } from 'esbuild';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// pages.js imports './nav' without an extension, which Vite resolves and Node
// does not. Bundling through esbuild -- already present for the build -- means
// this reads exactly what ships rather than a parallel copy of the data.
const tmp = mkdtempSync(join(tmpdir(), 'ideora-content-'));
const bundle = join(tmp, 'content.mjs');

await build({
  stdin: {
    contents: `
      export { PAGES } from '${resolve(root, 'src/data/pages.js')}';
      export { PRODUCTS } from '${resolve(root, 'src/data/products.js')}';
      export { CASE_STUDIES } from '${resolve(root, 'src/data/caseStudies.js')}';
    `,
    resolveDir: root,
    loader: 'js',
  },
  bundle: true,
  format: 'esm',
  outfile: bundle,
  logLevel: 'error',
  define: { 'import.meta.env.DEV': 'false' },
});

const { PAGES, PRODUCTS, CASE_STUDIES } = await import(pathToFileURL(bundle).href);
rmSync(tmp, { recursive: true, force: true });

const failures = [];
const fail = (what, why) => failures.push(`${what}: ${why}`);

// --- Every page carries its own metadata -----------------------------------
for (const p of PAGES) {
  if (!p.title) fail(p.path, 'no title');
  if (!p.description) fail(p.path, 'no description');
  else if (p.description.length < 50) fail(p.path, `description is ${p.description.length} characters; too thin to be useful in a result`);
  if (!p.heading) fail(p.path, 'no heading');
  if (!p.lede) fail(p.path, 'no lede');
}

// --- A product cannot publish thin -----------------------------------------
// "CTA, metadata, alt text and at least one demonstrable workflow."
for (const product of PRODUCTS) {
  const page = PAGES.find((p) => p.path === product.path);
  if (!page) { fail(product.name, `is listed in products.js but has no page at ${product.path}`); continue; }

  if (!page.product) fail(product.path, 'page does not declare `product`, so it renders without the product hero');
  if (!page.audience) fail(product.path, 'no audience -- "who is it for?" is unanswered');
  if (!page.cta) fail(product.path, 'no closing call to action');
  if (!product.buyer) fail(product.name, 'no primary buyer for the index card');

  const wf = page.workflow || [];
  if (wf.length < 5 || wf.length > 7) fail(product.path, `workflow has ${wf.length} steps; the template asks for five to seven`);
  if (!wf.some((s) => s.actor === 'human')) {
    fail(product.path, 'no human-exception step -- a workflow with no point where a person decides is not one we would sell');
  }

  for (const [field, label] of [['integrations', 'integrations'], ['controls', 'controls'], ['dashboard', 'the management view'], ['inputs', 'inputs'], ['deployment', 'deployment']]) {
    if (!page[field]?.length) fail(product.path, `no ${label}`);
  }

  // An outcome without a source is a claim.
  if (page.evidence) {
    const e = page.evidence;
    if (e.outcome && !e.source) fail(product.path, 'evidence states an outcome with no source');
    if (e.outcome && !e.baseline) fail(product.path, 'evidence states an outcome with no baseline to measure it against');
  }
}

// --- Claims carry an approval state ----------------------------------------
for (const c of CASE_STUDIES) {
  for (const f of ['client', 'context', 'baseline', 'workflow', 'outcome', 'source', 'approval']) {
    if (!c[f]) fail(`case-studies/${c.slug}`, `no ${f}`);
  }
  if (!['approved', 'pending'].includes(c.approval)) {
    fail(`case-studies/${c.slug}`, `approval is "${c.approval}"; must be approved or pending`);
  }
}

if (failures.length) {
  console.error(`\nContent check failed (${failures.length}):\n`);
  failures.forEach((f) => console.error('  ✗ ' + f));
  console.error('');
  process.exit(1);
}

console.log(`Content check passed: ${PAGES.length} pages, ${PRODUCTS.length} products, ${CASE_STUDIES.length} case studies.`);
