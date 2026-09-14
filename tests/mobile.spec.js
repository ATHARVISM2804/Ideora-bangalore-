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

test('the drawer is actually usable, not just visible', async ({ page }) => {
  // The existing drawer test opened it and checked its height and focus, and
  // passed while every control inside it was untappable: .nav disables pointer
  // events so the page scrolls through the header gutters, .nav__bar turns them
  // back on for itself, and the drawer -- a sibling of the bar -- never did.
  // Presses went straight through to the hero behind it.
  //
  // Playwright's click hit-tests, so tapping a real control is what catches it.
  await page.goto('/');
  await page.locator('.navsheet__trigger').click();

  const sheet = page.locator('.navsheet');
  await expect(sheet).toBeVisible();

  // A group expands.
  const products = page.locator('button.navsheet__row').filter({ hasText: 'Products' });
  await expect(products).toHaveAttribute('aria-expanded', 'false');
  await products.click();
  await expect(products).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.navsheet__sublink')).not.toHaveCount(0);

  // A destination navigates, closes the drawer and gives scrolling back.
  await page.locator('.navsheet__sublink').filter({ hasText: 'Ideora Health' }).click();
  await expect(page).toHaveURL(/\/products\/ideora-health$/);
  await expect(page.locator('.navsheet')).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .not.toBe('hidden');
});

test('tapping outside the drawer closes it', async ({ page }) => {
  await page.goto('/');
  await page.locator('.navsheet__trigger').click();
  await expect(page.locator('.navsheet')).toBeVisible();

  // A corner the drawer does not cover. The scrim carries the close handler,
  // and with pointer events off it could never receive the tap.
  await page.mouse.click(6, 300);

  await expect(page.locator('.navsheet')).toHaveCount(0);
  await expect(page).toHaveURL(/\/$/);
});

test('the drawer keeps its call to action in view when a group is open', async ({ page }) => {
  // margin-top:auto inside the scrolling column pushed the actions below the
  // fold the moment any group expanded, cutting the primary CTA in half at the
  // screen edge.
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/');
  await page.locator('.navsheet__trigger').click();
  await page.locator('button.navsheet__row').filter({ hasText: 'Products' }).click();
  await expect(page.locator('.navsheet__sublink')).not.toHaveCount(0);

  const fits = await page.evaluate(() => {
    const s = document.querySelector('.navsheet');
    const a = s.querySelector('.navsheet__actions');
    const sr = s.getBoundingClientRect();
    const ar = a.getBoundingClientRect();
    return { overflows: s.scrollHeight > s.clientHeight, inside: ar.bottom <= sr.bottom + 1 && ar.top >= sr.top };
  });

  expect(fits.overflows, 'the drawer should be overflowing for this to mean anything').toBe(true);
  expect(fits.inside, 'the call to action is outside the drawer').toBe(true);
});
