// Serves dist/ the way the host does, for the test suite.
//
// Vercel applies the redirects in vercel.json, then serves the file, then the
// folder's index.html, then 404.html with a 404 status. `vite preview` does
// none of that -- it answers every path with dist/index.html, which since the
// prerender is the homepage, so tests against it never saw a product page's
// own HTML or a real 404.
//
//   node scripts/serve-dist.mjs [port]

import http from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const port = Number(process.argv[2] || 4173);

const { redirects = [] } = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'));

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

    const moved = redirects.find((r) => r.source === path);
    if (moved) {
      res.writeHead(moved.permanent ? 308 : 307, { location: moved.destination });
      res.end();
      return;
    }

    let file = join(dist, path);
    if (!file.startsWith(dist)) file = join(dist, '404.html');

    let status = 200;
    if (!isFile(file)) {
      if (isFile(join(file, 'index.html'))) file = join(file, 'index.html');
      else { file = join(dist, '404.html'); status = 404; }
    }

    res.writeHead(status, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  })
  .listen(port, () => console.log(`dist on http://localhost:${port}`));
