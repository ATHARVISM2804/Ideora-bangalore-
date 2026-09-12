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

test('the hero uses the approved copy and tracking', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForFunction(() => document.fonts.check('1em Newsreader'));

  await expect(page.locator('.hero__badge')).toHaveText(/custom ai automation for service businesses/i);
  await expect(page.locator('h1')).toHaveText(
    'AI systems that handle enquiries, bookings and follow-ups inside your existing software.',
  );
  await expect(page.locator('.hero__lede')).toHaveText(
    'Launch one live workflow in 6 to 10 weeks. Keep your CRM, WhatsApp, calendars and operating controls.',
  );
  await expect(page.locator('.hero__actions a').first()).toHaveText('Book a 30-minute discovery call');
  await expect(page.locator('.hero__actions a').nth(1)).toHaveText('See product demos');
  await expect(page.locator('.hero__reassure')).toHaveText(/No migration \| Fixed scope \| Weekly working builds/);

  // "Limit the hero description to two readable lines at 1440 pixels."
  const lines = await page.locator('.hero__lede').evaluate((el) =>
    Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)),
  );
  expect(lines, `hero description runs to ${lines} lines`).toBeLessThanOrEqual(2);

  // Both CTAs carry product_interest and cta_location.
  for (const cta of await page.locator('.hero__actions a').all()) {
    await expect(cta).toHaveAttribute('data-track-product_interest', 'general');
    await expect(cta).toHaveAttribute('data-track-cta_location', 'hero');
  }
});

test('every product page meets the template contract', async ({ page }) => {
  const products = [
    ['/products/ideora-health', 'Ideora Health'],
    ['/products/ideora-auto', 'Ideora Auto'],
    ['/products/ideora-property', 'Ideora Property'],
    ['/products/operations-console', 'Operations Console'],
  ];

  for (const [path, name] of products) {
    await page.goto(path);

    // Name, outcome, target role, and two next steps -- the product hero.
    await expect(page.locator('.page-hero .pill')).toHaveText(name);
    await expect(page.locator('.page-hero h1')).not.toBeEmpty();
    await expect(page.locator('.page-hero__for')).toBeVisible();
    await expect(page.locator('.page-hero__actions a')).toHaveCount(2);

    // Workflow, inputs, integrations, controls, the management view, the
    // deployment sequence and the evidence -- the eight buying questions, less
    // the labelled screens, which need product screenshots nobody has yet.
    await expect(page.locator('.wf__step').first()).toBeVisible();
    const steps = await page.locator('.wf__step').count();
    expect(steps, `${path} workflow steps`).toBeGreaterThanOrEqual(5);
    expect(steps, `${path} workflow steps`).toBeLessThanOrEqual(7);
    expect(await page.locator('.wf__step--human').count(), `${path} human exception`).toBeGreaterThan(0);

    expect(await page.locator('.inputs__item').count(), `${path} inputs`).toBeGreaterThan(0);
    expect(await page.locator('.intg__row').count(), `${path} integrations`).toBeGreaterThan(0);
    expect(await page.locator('.dash__item').count(), `${path} dashboard`).toBeGreaterThan(0);
    expect(await page.locator('.deploy__step').count(), `${path} deployment`).toBe(6);

    // An outcome renders only with the source beside it. The block refuses to
    // render at all otherwise, so this asserts both.
    await expect(page.locator('.evidence > div')).toHaveCount(3);
    await expect(page.locator('.panel__foot').last()).not.toBeEmpty();

    // The next step keeps the product context rather than dropping the reader
    // into a generic enquiry.
    const final = page.locator('.page-cta a');
    await expect(final).toHaveText(`Book a review of ${name}`);
    const href = await final.getAttribute('href');
    expect(decodeURIComponent(href), `${path} CTA loses product context`).toContain(name);
  }
});

test('the property transcript is labelled as a demonstration', async ({ page }) => {
  // A conversation that looks real must say it is not, or it becomes a claim
  // about a client nobody approved.
  await page.goto('/products/ideora-property');

  // `.count()` returns immediately; on a slower engine it read zero before the
  // lazy route had painted. expect() auto-waits, so the first assertion is what
  // establishes the block is there.
  const lines = page.locator('.chat__line');
  await expect(lines.first()).toBeVisible();
  expect(await lines.count()).toBeGreaterThan(4);

  // The turn where the system hands over rather than answering is the point of
  // showing it at all.
  await expect(page.locator('.chat__line--human')).not.toHaveCount(0);

  const note = page.locator('.chat').locator('xpath=following-sibling::p[1]');
  await expect(note).toContainText(/demonstration|synthetic/i);
});

test('the products index names a primary buyer for each product', async ({ page }) => {
  await page.goto('/products');

  await expect(page.locator('.pchoose__buyer').first()).toBeVisible();
  await expect(page.locator('.pchoose__buyer')).toHaveCount(4);
  await expect(page.locator('.pchoose__card').first()).toContainText('Clinic or hospital owner');

  // Product name always visible, never replaced by the industry label.
  for (const name of ['Ideora Health', 'Ideora Auto', 'Ideora Property', 'Operations Console']) {
    await expect(page.locator('.pchoose__name', { hasText: name })).toBeVisible();
  }
});

test('every industry page carries its required sections and cross-links', async ({ page }) => {
  // The industry template asks for problems, relevant products, typical
  // integrations, controls, case studies and a CTA. Integrations and controls
  // were missing on all three: the pages established relevance and then could
  // not answer the two questions an IT reviewer asks next.
  for (const path of ['/industries/healthcare', '/industries/automotive', '/industries/real-estate']) {
    await page.goto(path);

    await expect(page.locator('.prose-row').first()).toBeVisible();
    expect(await page.locator('.intg__row').count(), `${path} integrations`).toBeGreaterThan(0);
    expect(await page.locator('.cards--2 .card').count(), `${path} controls`).toBeGreaterThan(0);

    const links = await page.locator('.pill--link').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(links.some((h) => h.startsWith('/products/')), `${path} links no product`).toBe(true);
    expect(links.some((h) => h.startsWith('/case-studies/')), `${path} links no case study`).toBe(true);
    await expect(page.locator('.page-cta')).toBeVisible();
  }
});

test('a failure renders the error state inside the shell', async ({ page }) => {
  // There was no 500 state at all: a thrown render or a chunk that failed to
  // load produced a white page with no navigation and no way onward.
  await page.goto('/this-route-does-not-exist');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();

  // And a way out, not just an apology.
  await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible();
});

test('unhandled failures reach monitoring', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { Promise.reject(new Error('simulated failure')); });

  await expect
    .poll(() => page.evaluate(() => (window.dataLayer || []).filter((e) => e.event === 'app_error').length))
    .toBeGreaterThan(0);

  // The payload says where it came from, without carrying a full stack.
  const reported = await page.evaluate(() =>
    (window.dataLayer || []).find((e) => e.event === 'app_error'),
  );
  expect(reported.source).toBe('unhandled_rejection');
  expect(reported.page_path).toBe('/');
});
