// Writes a static HTML file for every public URL, after `vite build`.
//
// The site is a client-rendered React app: without this, every URL served the
// same empty <div id="root"> and one generic title, so a crawler that does not
// run JavaScript saw no content at all, and every page shared the homepage's
// title, description and canonical. Now each URL ships its real content and
// its own head; the app takes over in the browser as before.
//
// How: the app is bundled for Node (src/prerender.jsx, `vite build --ssr`) and
// rendered inside jsdom, a simulated browser, one URL at a time. The routes
// come from the sitemap, which is itself derived from the route table.
//
// Every public URL therefore has a file, which is also what lets the host
// answer an unknown URL with a real 404 (dist/404.html) instead of a 200 and
// the homepage shell -- a soft 404, which search engines treat as a fault.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

const ORIGIN = readFileSync(resolve(root, 'src/lib/site.js'), 'utf8')
  .match(/export const ORIGIN = '([^']+)'/)[1];

const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const paths = [...readFileSync(resolve(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(([, loc]) => loc.replace(ORIGIN, '') || '/');

// Not in the sitemap, and needed as files all the same: the internal gallery,
// and the 404 the host serves for every unknown URL (as dist/404.html, which
// is the name Vercel looks for).
const EXTRA = [
  { path: '/components', out: 'components/index.html' },
  { path: '/this-page-does-not-exist', out: '404.html' },
];

// The browser APIs the app touches that jsdom does not provide. Reduced motion
// is reported as on: the static page should be the finished, unanimated one,
// with nothing left at a tween's starting opacity.
function install(dom) {
  const w = dom.window;
  w.matchMedia = (q) => ({
    matches: /prefers-reduced-motion:\s*reduce/.test(q),
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  class NoopObserver { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
  w.IntersectionObserver = NoopObserver;
  w.ResizeObserver = NoopObserver;
  w.scrollTo = () => {};

  // The build is not a visitor. Without this the analytics tag installs during
  // prerender and its <script> is serialised into every static page, which
  // would load it for everyone -- including the readers who asked not to be
  // tracked, whose opt-out is only checked at runtime.
  Object.defineProperty(w.navigator, 'doNotTrack', { value: '1', configurable: true });
  w.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  w.cancelAnimationFrame = (id) => clearTimeout(id);

  const names = [
    'window', 'document', 'navigator', 'location', 'history', 'localStorage', 'sessionStorage',
    'HTMLElement', 'HTMLAnchorElement', 'Element', 'Node', 'Text', 'DocumentFragment', 'SVGElement',
    'Event', 'CustomEvent', 'KeyboardEvent', 'MouseEvent', 'MutationObserver',
    'IntersectionObserver', 'ResizeObserver', 'getComputedStyle', 'matchMedia',
    'requestAnimationFrame', 'cancelAnimationFrame', 'scrollTo', 'addEventListener', 'removeEventListener',
  ];
  for (const name of names) {
    const value = name === 'window' ? w : w[name];
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  }
}

// Globals must exist before the bundle loads: some modules read window at
// import time.
install(new JSDOM(template, { url: ORIGIN + '/', pretendToBeVisual: true }));
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/prerender.js')).href);

let failed = 0;
for (const { path, out: outName } of [...paths.map((p) => ({ path: p })), ...EXTRA]) {
  const dom = new JSDOM(template, { url: ORIGIN + path, pretendToBeVisual: true });
  install(dom);

  try {
    const unmount = await render(path);
    const h1 = dom.window.document.querySelector('h1')?.textContent.trim();
    // Effects measure layout, and jsdom has none: the nav writes its height to
    // <html> as 0px. Leave the root unstyled so the browser uses the CSS default
    // until the app measures for real.
    dom.window.document.documentElement.removeAttribute('style');
    // Belt and braces with the opt-out above: no third-party tag is ever part
    // of the static HTML. It is installed at runtime or not at all.
    dom.window.document.querySelectorAll('script[src*="googletagmanager.com"]').forEach((el) => el.remove());
    const html ='<!doctype html>\n' + dom.window.document.documentElement.outerHTML;
    unmount();
    if (!h1) throw new Error('rendered without an h1');

    const out = outName
      ? resolve(dist, outName)
      : path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}`, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  } catch (err) {
    failed += 1;
    console.error(`prerender ${path}: ${err.message}`);
  }
  dom.window.close();
}

if (failed) {
  console.error(`Prerender failed on ${failed} of ${paths.length} URLs.`);
  process.exit(1);
}
console.log(`Prerendered ${paths.length} URLs, plus the gallery and the 404.`);
