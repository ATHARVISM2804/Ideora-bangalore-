import { useEffect } from 'react';

// index.html carries one static title and description; with thirteen routes
// each page sets its own. Restores nothing on unmount — the next route always
// sets both immediately.
export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);
}
