import { useEffect } from 'react';

// Sets the page's robots directive, and puts it back on the way out.
//
// index.html ships one robots tag (the crawl-preview directives every page
// wants). A page that must not be indexed updates that tag rather than adding
// a second one: a prerendered page already carries it, so appending left three
// robots tags on one page, which is how a directive ends up ambiguous.
export function useRobots(content) {
  useEffect(() => {
    if (!content) return undefined;

    let el = document.head.querySelector('meta[name="robots"]');
    let created = false;
    if (!el) {
      el = document.createElement('meta');
      el.name = 'robots';
      document.head.appendChild(el);
      created = true;
    }

    const previous = el.getAttribute('content');
    el.setAttribute('content', content);

    return () => {
      if (created) el.remove();
      else el.setAttribute('content', previous ?? '');
    };
  }, [content]);
}
