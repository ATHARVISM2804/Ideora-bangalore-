import { useEffect } from 'react';
import { track } from '../lib/analytics';

// Reports `product_view` when a product page renders, with the product and
// industry attached. This is the event management actually needs: it answers
// "which product is pulling interest" without anyone reading a page-path
// report and guessing.
//
// Pages that are not products report nothing -- a view count for the terms
// page is noise, and the spec asks for a product-scoped funnel.
export function useTrackPageType(page) {
  const { product, industry, path } = page || {};

  useEffect(() => {
    if (!product) return;
    track('product_view', { product, industry, page_path: path });
  }, [product, industry, path]);
}
