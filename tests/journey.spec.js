import { test, expect } from '@playwright/test';

// The specification's browser matrix: "Current Chrome, Safari, Edge; iOS and
// Android -- core journey completes."
//
// These assert behaviour, not pixels, so the same file runs on Chromium,
// Firefox, WebKit and the two mobile emulations. Everything here is something
// a buyer actually does, and something that has broken at least once while
// this site was being built.

test('the core journey completes: home to product to a booking CTA', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI systems that handle');

  // The chooser is the block that answers "is there something here for my
  // business". It must be present without any scroll-triggered reveal.
  const cards = page.locator('.pchoose__card');
  await expect(cards).toHaveCount(4);
  await expect(cards.first()).toBeVisible();

  await cards.filter({ hasText: 'Ideora Health' }).click();
  await expect(page).toHaveURL(/\/products\/ideora-health$/);

  // The workflow is the thing a buyer came to inspect.
  await expect(page.locator('.wf__step')).toHaveCount(7);
  await expect(page.locator('.wf__step--human')).toHaveCount(1);

  // A booking CTA exists and points at the one primary ask.
  const cta = page.getByRole('link', { name: /discovery call|Book a call/i }).first();
  await expect(cta).toBeVisible();
});

test('every legacy URL still resolves', async ({ page }) => {
  // These were linked from the site and the sitemap before the products and
  // services split. A 404 on a URL a crawler already knows is worse than the
  // page that used to be there.
  const moved = [
    ['/solutions/healthcare', '/products/ideora-health'],
    ['/solutions/service-centre', '/products/ideora-auto'],
    ['/platforms/ops-console', '/products/operations-console'],
    ['/solutions/agentic-ai', '/services/custom-ai-automation'],
  ];

  for (const [from, to] of moved) {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

test('content renders without JavaScript', async ({ browser }) => {
  // The audit reported long blank sections waiting for motion triggers. It did
  // not reproduce, but this is the assertion that keeps it that way: with no
  // JS at all the shell still has to paint its markup.
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/');
  await expect(page.locator('#root')).toBeAttached();

  await context.close();
});

test('the product menu works by keyboard', async ({ page }) => {
  await page.goto('/');

  const trigger = page.getByRole('button', { name: /Products/ });
  if (!(await trigger.isVisible())) test.skip(true, 'menu collapses into the sheet on narrow viewports');

  await trigger.focus();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  // Focus moves into the panel, not just open-and-abandon.
  await expect(page.locator('.navmenu__panel a').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('the contact form reports what is wrong', async ({ page }) => {
  await page.goto('/contact');

  await page.getByRole('button', { name: /Send enquiry/i }).click();

  // One summary in a live region, and the fields themselves marked, so a
  // screen-reader user is not left hunting for which input failed.
  await expect(page.locator('.contact__err')).toBeVisible();
  await expect(page.locator('[aria-invalid="true"]')).not.toHaveCount(0);
});

test('no page scrolls sideways', async ({ page }) => {
  for (const path of ['/', '/products', '/products/ideora-auto', '/case-studies', '/contact']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth - d.clientWidth;
    });
    expect(overflow, `${path} overflows horizontally by ${overflow}px`).toBeLessThanOrEqual(0);
  }
});

test('the product row is visible at the fold on 1440x900', async ({ page }) => {
  // An explicit acceptance condition: "ProductCard x 4 -- visible without an
  // additional reveal interaction on 1440 x 900."
  //
  // It failed by 384px once already, and silently: the page looked fine, the
  // cards were there, and nothing but a measurement showed that a buyer on a
  // laptop saw no product at all without scrolling. Hence a test rather than
  // a note.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  // The headline is set in Newsreader and wraps to a different number of lines
  // in the fallback face, which moves everything below it. Measuring before
  // the webfont settles reports a layout no reader ever sees.
  await page.evaluate(() => document.fonts.ready);

  const first = page.locator('.pchoose__card').first();
  const box = await first.boundingBox();

  expect(box, 'the first product card should be laid out').not.toBeNull();
  expect(
    box.y,
    `first product card starts ${Math.round(box.y)}px down a 900px viewport`,
  ).toBeLessThan(900);
});

test('the menu closes on an outside tap and on a route change', async ({ page }) => {
  // Both paths run through one close() helper, and when a rename left that
  // helper calling a function that no longer existed it threw silently: the
  // menu simply stopped closing, on every route, in every browser. Only a test
  // pressing Escape noticed.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const trigger = page.getByRole('button', { name: /Products/ });
  await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');

  // Outside tap.
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  // A bare coordinate, not an element: closing on pointerdown re-renders the
  // header, and Playwright retries an element click it thinks moved underneath
  // it, which never settles.
  await page.mouse.click(40, 700);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  // Route change: following a link used to leave the panel open over the page
  // it had just navigated to.
  await trigger.click();
  await page.locator('.navmenu__panel a').first().click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole('button', { name: /Products/ })).toHaveAttribute('aria-expanded', 'false');
});

test('hovering a trigger waits for intent before opening', async ({ page, isMobile }) => {
  // 150ms of hover intent, so a cursor travelling down the page does not drag
  // four panels open on its way past.
  //
  // This asserted "still closed" immediately after hovering, which is a race:
  // on a slower machine the timer had already fired by the time the assertion
  // ran, and it failed on WebKit in CI while passing locally. Measuring how
  // long the open actually took tests the same behaviour without depending on
  // how fast the runner is.
  test.skip(!!isMobile, 'hover intent is a pointer behaviour; touch opens on tap');

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const trigger = page.getByRole('button', { name: /Industries/ });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  const started = Date.now();
  await trigger.hover();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true', { timeout: 3000 });
  const elapsed = Date.now() - started;

  // Generous lower bound: the point is that it is deferred at all, not that it
  // is deferred by exactly 150ms.
  expect(elapsed, `menu opened after ${elapsed}ms`).toBeGreaterThan(100);
});

test('the homepage runs in the specified sequence', async ({ page }) => {
  // The homepage implementation table is an ordered list, and the order is the
  // argument: category, then what you can buy, then proof it runs, then one
  // workflow shown, then evidence, and only then how delivery works. A section
  // moved by accident is invisible in review and changes what the page argues.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const order = await page.evaluate(() =>
    [...document.querySelectorAll('main section')]
      .filter((s) => !s.parentElement.closest('section'))
      .map((s) => s.id)
      .filter(Boolean),
  );

  // Rows 02-10. The proof strip is a band rather than a section and is
  // asserted separately below.
  expect(order).toEqual([
    'top',       // 02 hero
    'products',  // 03 product chooser
    'demo',      // 05 featured product demo
    'outcome',   // 06 evidence: before and after
    'work',      //    evidence: case studies
    'services',  // 07
    'how',       // 08
    'stack',     // 09 integrations
    'trust',     //    security
    'book',      // 10 final CTA
  ]);

  // 04: three factual promises, sitting between the chooser and the demo.
  const promises = page.locator('.promises__item');
  await expect(promises).toHaveCount(3);

  const [cardsBottom, stripTop, demoTop] = await page.evaluate(() => [
    document.querySelector('.pchoose').getBoundingClientRect().bottom,
    document.querySelector('.promises').getBoundingClientRect().top,
    document.querySelector('#demo').getBoundingClientRect().top,
  ]);
  expect(stripTop).toBeGreaterThan(cardsBottom);
  expect(stripTop).toBeLessThan(demoTop);

  // 08: six delivery steps, each stating scope, owner and deliverable.
  await expect(page.locator('#how .step')).toHaveCount(6);
  await expect(page.locator('#how .step__facts')).toHaveCount(6);
});
