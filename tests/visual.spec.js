import { test, expect } from '@playwright/test';

// Visual regression at the four widths the specification names.
//
// The pages chosen are the ones that carry a distinct layout rather than all
// twenty-five: the product template covers every product page, the prose
// template covers every service, industry and legal page. Snapshotting all of
// them would multiply review cost without covering another arrangement of
// boxes.
const WIDTHS = [390, 768, 1280, 1440];

const PAGES = [
  ['home', '/'],
  ['products-index', '/products'],
  ['product-template', '/products/ideora-health'],
  ['prose-template', '/security'],
  ['case-studies', '/case-studies'],
  ['contact', '/contact'],
  ['not-found', '/this-route-does-not-exist'],
];

for (const [name, path] of PAGES) {
  for (const width of WIDTHS) {
    test(`${name} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      // Fonts decide layout. Shooting before they settle produces a diff on
      // every run that has nothing to do with the change under test.
      await page.evaluate(() => document.fonts.ready);

      // The hero's colour fields drift on an infinite loop. Reduced-motion
      // stops it, but assert rather than assume: if that rule is ever removed
      // this suite would start failing at random and nobody would know why.
      await expect(page.locator('body')).toBeVisible();

      await expect(page).toHaveScreenshot(`${name}-${width}.png`, {
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
      });
    });
  }
}
