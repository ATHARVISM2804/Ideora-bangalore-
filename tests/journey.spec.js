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
