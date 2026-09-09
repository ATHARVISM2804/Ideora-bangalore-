import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, SHARE_IMAGE, ORIGIN, canonical } from '../lib/site';

// Upserts a tag rather than assuming index.html shipped one, so a route can
// introduce a property the static head never had.
function meta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.rel ? 'link' : 'meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// index.html carries one static title and description; with fourteen routes
// each page sets its own — and a page that only sets <title> still shares badly,
// so this also drives the canonical URL and the Open Graph and Twitter cards a
// link preview reads. Restores nothing on unmount: the next route sets them all
// immediately.
export function useDocumentTitle(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = canonical(pathname);
    document.title = title;

    meta('meta[name="description"]', { name: 'description', content: description || '' });
    meta('link[rel="canonical"]', { rel: 'canonical', href: url });

    meta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    meta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    meta('meta[property="og:title"]', { property: 'og:title', content: title });
    meta('meta[property="og:description"]', { property: 'og:description', content: description || '' });
    meta('meta[property="og:url"]', { property: 'og:url', content: url });
    meta('meta[property="og:image"]', { property: 'og:image', content: ORIGIN + SHARE_IMAGE });

    meta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    meta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    meta('meta[name="twitter:description"]', { name: 'twitter:description', content: description || '' });
    meta('meta[name="twitter:image"]', { name: 'twitter:image', content: ORIGIN + SHARE_IMAGE });
  }, [title, description, pathname]);
}
