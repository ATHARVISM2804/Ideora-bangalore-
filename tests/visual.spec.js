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
  ['industries-index', '/industries'],
  ['case-studies', '/case-studies'],
  ['contact', '/contact'],
  ['not-found', '/this-route-does-not-exist'],
];

for (const [name, path] of PAGES) {
  for (const width of WIDTHS) {
    test(`${name} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      // Fonts decide layout, and document.fonts.ready resolves whether or not
      // a face actually arrived -- so a run where Google Fonts was slow or
      // blocked would quietly snapshot the fallback metrics and bake a layout
      // no reader sees into the baseline. That produced a 29px height
      // difference between two machines and a CI failure nobody could
      // reproduce locally.
      //
      // Waiting on the faces themselves makes that case a loud timeout instead
      // of a wrong baseline.
      await page.waitForFunction(
        () => document.fonts.check('1em Newsreader') && document.fonts.check('1em Geist'),
        null,
        { timeout: 15_000 },
      );
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
