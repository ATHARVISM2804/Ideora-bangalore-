import { test, expect, devices } from '@playwright/test';

// The responsive specification's acceptance list, as assertions.
//
// Every one of these has been wrong at some point during this build, and none
// of them looked wrong: a headline at seven lines, a 23px link, a chat icon
// standing in for a discovery action. They are cheap to check and invisible to
// review, which is the definition of something that belongs in a test.

test.use({ ...devices['iPhone 13'] });

test('the hero H1 is 42-52px with no orphaned one-word line', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => document.fonts.check('1em Newsreader'));

  const h1 = page.locator('h1');
  const size = await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size, `H1 is ${size}px`).toBeGreaterThanOrEqual(42);
  expect(size, `H1 is ${size}px`).toBeLessThanOrEqual(52);

  // A one-word last line is the specific failure named. Measuring the last
  // line box rather than counting words catches it whatever the copy becomes.
  const lastLineFill = await h1.evaluate((el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    const rects = [...r.getClientRects()].filter((x) => x.width > 1);
    const bottom = Math.max(...rects.map((x) => Math.round(x.top)));
    const width = rects
      .filter((x) => Math.round(x.top) === bottom)
      .reduce((a, x) => a + x.width, 0);
    return width / el.getBoundingClientRect().width;
  });
  expect(lastLineFill, 'last line of the H1 is nearly empty').toBeGreaterThan(0.2);
});

test('both hero CTAs are separate 44px targets', async ({ page }) => {
  await page.goto('/');

  const ctas = page.locator('.hero__actions a');
  await expect(ctas).toHaveCount(2);

  const boxes = await ctas.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON()));
  for (const b of boxes) expect(b.height, 'CTA height').toBeGreaterThanOrEqual(44);

  // Separate, not stacked into one continuous slab a thumb can miss between.
  const gap = boxes[1].top - (boxes[0].top + boxes[0].height);
  expect(gap, 'CTAs are not visually separated').toBeGreaterThan(0);
});

test('every interactive target is at least 44px tall', async ({ page }) => {
  for (const path of ['/', '/contact', '/products/ideora-health']) {
    await page.goto(path);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a[href], button')]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.height < 44;
        })
        .map((e) => `${e.className || e.tagName}:${Math.round(e.getBoundingClientRect().height)}px`),
    );
    expect(small, `${path} has targets under 44px`).toEqual([]);
  }
});

test('the persistent discovery action is labelled and covers nothing', async ({ page }) => {
  await page.goto('/contact');

  // Scroll to the end and let the layout settle before measuring overlap --
  // reading rectangles mid-scroll made this flake under parallel load.
  await page.locator('.footer__legal').scrollIntoViewIfNeeded();
  await expect(page.locator('.footer__legal')).toBeInViewport();

  const fab = page.locator('.wa-fab');
  await expect(fab).toBeVisible();
  await expect(fab).toContainText(/discovery call/i);

  // Footer links, consent controls and form errors must stay reachable.
  const covered = await page.evaluate(() => {
    const r = document.querySelector('.wa-fab').getBoundingClientRect();
    return [...document.querySelectorAll('.footer a, .field--check, .contact__err')]
      .filter((t) => {
        const b = t.getBoundingClientRect();
        return !(b.right < r.left || b.left > r.right || b.bottom < r.top || b.top > r.bottom);
      })
      .map((t) => t.textContent.trim().slice(0, 30));
  });
  expect(covered, 'the persistent CTA is covering something').toEqual([]);
});

test('the drawer is full height and moves focus into itself', async ({ page }) => {
  await page.goto('/');
  await page.locator('[class*="navsheet__trigger"], .nav__bar button').first().click();

  const sheet = page.locator('.navsheet');
  await expect(sheet).toBeVisible();

  const ratio = await sheet.evaluate((el) => el.getBoundingClientRect().height / window.innerHeight);
  expect(ratio, 'drawer is not full height').toBeGreaterThan(0.85);

  const focusInside = await page.evaluate(() => !!document.activeElement?.closest('.navsheet'));
  expect(focusInside, 'focus did not move into the drawer').toBe(true);
});

test('the hero image reserves its space before it loads', async ({ page }) => {
  await page.goto('/');

  // Explicit dimensions are what keep the copy from reflowing when the bytes
  // land, and they are the whole of this page's CLS budget.
  const img = page.locator('.hero__img');
  await expect(img).toHaveAttribute('width', /\d+/);
  await expect(img).toHaveAttribute('height', /\d+/);

  // And it should be served as AVIF or WebP, not the 1.6MB source PNG.
  const served = await img.evaluate((el) => el.currentSrc);
  expect(served, `served ${served}`).toMatch(/\.(avif|webp)$/);
});
