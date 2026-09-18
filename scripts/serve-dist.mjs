// Serves dist/ the way the host does, for the test suite.
//
// `vite preview` answers every path with dist/index.html, which since the
// prerender is the homepage -- so tests against it never saw a product page's
// own HTML. Vercel serves the file, then the folder's index.html, then the
// SPA shell (vercel.json). This does the same, with no dependencies.
//
//   node scripts/serve-dist.mjs [port]

import http from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.argv[2] || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

const isFile = (p) => {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
};

http
  .createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    let file = join(dist, path);
    if (!file.startsWith(dist)) file = join(dist, 'spa.html');
    if (!isFile(file)) file = isFile(join(file, 'index.html')) ? join(file, 'index.html') : join(dist, 'spa.html');

    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  })
  .listen(port, () => console.log(`dist on http://localhost:${port}`));
