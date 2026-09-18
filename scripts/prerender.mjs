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
// dist/index.html is kept as dist/spa.html first: that empty shell is what
// the host serves for any URL without a file of its own (vercel.json), so an
// unknown path renders the 404 page instead of flashing the homepage.

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

const ORIGIN = readFileSync(resolve(root, 'src/lib/site.js'), 'utf8')
  .match(/export const ORIGIN = '([^']+)'/)[1];

const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
copyFileSync(resolve(dist, 'index.html'), resolve(dist, 'spa.html'));

const paths = [...readFileSync(resolve(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(([, loc]) => loc.replace(ORIGIN, '') || '/');

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
for (const path of paths) {
  const dom = new JSDOM(template, { url: ORIGIN + path, pretendToBeVisual: true });
  install(dom);

  try {
    const unmount = await render(path);
    const h1 = dom.window.document.querySelector('h1')?.textContent.trim();
    // Effects measure layout, and jsdom has none: the nav writes its height to
    // <html> as 0px. Leave the root unstyled so the browser uses the CSS default
    // until the app measures for real.
    dom.window.document.documentElement.removeAttribute('style');
    const html ='<!doctype html>\n' + dom.window.document.documentElement.outerHTML;
    unmount();
    if (!h1) throw new Error('rendered without an h1');

    const out = path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}`, 'index.html');
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
console.log(`Prerendered ${paths.length} URLs.`);
