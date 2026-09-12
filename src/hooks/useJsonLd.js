import { useEffect } from 'react';

// Mounts a JSON-LD block for the current route and removes it on the way out.
//
// index.html carries the Organization and WebSite graph, which is true of every
// page. This is for the per-route additions -- Product, BreadcrumbList -- which
// must not survive a client-side navigation into a page they do not describe.
//
// Keyed so two blocks on one page (a product and its breadcrumbs) do not
// overwrite each other.
export function useJsonLd(data, key) {
  const json = data ? JSON.stringify(data) : null;

  useEffect(() => {
    if (!json) return undefined;

    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.jsonld = key;
    el.textContent = json;
    document.head.appendChild(el);

    return () => el.remove();
  }, [json, key]);
}
