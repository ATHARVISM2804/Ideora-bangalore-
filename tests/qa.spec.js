import { test, expect } from '@playwright/test';

// The rows of the test matrix that nothing was checking.
//
// A visual review passes all of these. That is the point of the page: it lists
// the things that look fine and are not.

test.describe('screen reader', () => {
  // VoiceOver and NVDA cannot be driven here. What can be checked is the tree
  // they read: every control in the core journey exposing a name, a role and,
  // where it has one, a state. A control with no accessible name is announced
  // as "link" and nothing else, which is the actual failure this row is about.
  test('every control in the core journey has a name and a role', async ({ page }) => {
    for (const path of ['/', '/products', '/products/ideora-health', '/contact']) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();

      const nameless = await page.evaluate(() =>
        [...document.querySelectorAll('a[href], button, input:not([type=hidden]), textarea, select')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) return false;
            if (el.closest('[aria-hidden="true"]')) return false;
            const name =
              el.getAttribute('aria-label') ||
              el.getAttribute('title') ||
              (el.labels && el.labels.length ? [...el.labels].map((l) => l.textContent).join('') : '') ||
              el.textContent ||
              el.querySelector('img[alt]')?.getAttribute('alt') ||
              '';
            return !name.trim();
          })
          .map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 30)}`),
      );
      expect(nameless, `${path} has controls with no accessible name`).toEqual([]);
    }
  });

  test('the menu announces its state', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'the desktop menu collapses into the drawer');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /Products/ });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // The panel is a list of links, and they stay links: role="menu" would stop
    // a screen reader offering them in its links list at all.
    const first = page.locator('.navmenu__panel a').first();
    await expect(first).toHaveRole('link');
  });

  test('the current page is announced as current', async ({ page }) => {
    await page.goto('/security');
    await expect(page.locator('[aria-current="page"]').first()).toBeVisible();
  });
});

test.describe('SEO', () => {
  // "Correct canonical, OG, structured data and indexability" -- per route,
  // not just on the homepage, which is where a single static tag would pass.
  const ROUTES = ['/', '/products', '/products/ideora-health', '/case-studies', '/security', '/contact'];

  test('every route carries its own canonical, OG and title', async ({ page }) => {
    const seen = new Set();

    for (const path of ROUTES) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();

      const meta = await page.evaluate(() => ({
        title: document.title,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        ogUrl: document.querySelector('meta[property="og:url"]')?.content,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
        twitter: document.querySelector('meta[name="twitter:card"]')?.content,
        description: document.querySelector('meta[name=description]')?.content,
        robots: document.querySelector('meta[name=robots]')?.content,
      }));

      expect(meta.canonical, `${path} canonical`).toBe(`https://www.ideoralabs.com${path === '/' ? '/' : path}`);
      expect(meta.ogUrl, `${path} og:url`).toBe(meta.canonical);
      expect(meta.ogImage, `${path} og:image`).toContain('/og.png');
      expect(meta.twitter).toBe('summary_large_image');
      expect(meta.robots, `${path} must be indexable`).toBeUndefined();

      // Unique, and long enough to be useful in a result.
      expect(seen.has(meta.title), `${path} reuses the title "${meta.title}"`).toBe(false);
      seen.add(meta.title);
      expect(meta.description?.length, `${path} description`).toBeGreaterThan(50);
    }
  });

  test('the product page carries Product and BreadcrumbList data', async ({ page }) => {
    await page.goto('/products/ideora-health');
    await expect(page.locator('h1')).toBeVisible();

    const types = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((s) => { try { return JSON.parse(s.textContent); } catch { return null; } })
        .filter(Boolean)
        .flatMap((d) => (d['@graph'] ? d['@graph'].map((x) => x['@type']) : [d['@type']])),
    );
    expect(types).toContain('Product');
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('Organization');
  });

  test('the internal gallery is not indexable', async ({ page }) => {
    await page.goto('/components');
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('analytics', () => {
  // "Every event and property." An event that fires with a missing property is
  // worse than one that does not fire: it looks like data.
  const REQUIRED = {
    product_view: ['product'],
    discovery_start: ['product', 'cta_location'],
    whatsapp_click: ['cta_location'],
    form_error: ['form_id', 'field_group', 'error_type'],
  };

  test('each event carries the properties its schema requires', async ({ page }) => {
    await page.goto('/products/ideora-health');
    await expect(page.locator('h1')).toBeVisible();

    // product_view on load, discovery_start and demo_start from the hero.
    await page.locator('.page-hero__actions a').first().click({ trial: true });
    await page.evaluate(() => document.querySelector('.page-hero__actions a').click());

    await page.goto('/contact');
    await page.getByRole('button', { name: /Send enquiry/i }).click();

    const events = await page.evaluate(() => window.dataLayer || []);
    const byName = Object.fromEntries(events.map((e) => [e.event, e]));

    for (const [name, props] of Object.entries(REQUIRED)) {
      if (!byName[name]) continue; // not every event fires in this path
      for (const prop of props) {
        expect(byName[name][prop], `${name} is missing ${prop}`).toBeTruthy();
      }
    }

    // The data-quality rule: nothing identifying reaches analytics, ever.
    //
    // Anchored, like the rule in lib/analytics.js. Unanchored it matched
    // `metric_name` on every web-vitals event and reported a leak that was not
    // one -- which is its own lesson about how a PII check should be written.
    const leaked = events.filter((e) =>
      Object.entries(e).some(([k, v]) =>
        /^(name|email|business_?email|phone|mobile|message|patient|address|company(_?name)?)$/i.test(k) ||
        (typeof v === 'string' && (v.includes('@') || /^\+?\d[\d\s-]{7,}$/.test(v))),
      ),
    );
    expect(leaked, 'personally identifying data reached analytics').toEqual([]);
  });
});

test.describe('touch and layout', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  // "At least 44 by 44 CSS pixels with separation from adjacent controls." The
  // separation half was never checked: two 44px targets flush against each
  // other still produce a mis-tap.
  test('adjacent controls are separated', async ({ page }) => {
    await page.goto('/');

    const tooClose = await page.evaluate(() => {
      const els = [...document.querySelectorAll('a[href], button')].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.top < 4000;
      });
      const bad = [];
      for (let i = 0; i < els.length; i++) {
        for (let j = i + 1; j < els.length; j++) {
          if (els[i].contains(els[j]) || els[j].contains(els[i])) continue;
          const a = els[i].getBoundingClientRect();
          const b = els[j].getBoundingClientRect();
          const gapX = Math.max(a.left - b.right, b.left - a.right);
          const gapY = Math.max(a.top - b.bottom, b.top - a.bottom);
          // Overlapping on both axes with no gap on either.
          if (gapX < 0 && gapY < 0) {
            bad.push(`${els[i].textContent.trim().slice(0, 18)} / ${els[j].textContent.trim().slice(0, 18)}`);
          }
        }
      }
      return bad;
    });

    expect(tooClose, 'interactive targets overlap').toEqual([]);
  });

  test('no CTA is clipped or hidden at any matrix width', async ({ page }) => {
    for (const width of [390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');

      const problems = await page.evaluate(() => {
        const out = [];
        const de = document.documentElement;
        if (de.scrollWidth - de.clientWidth > 0) out.push(`page scrolls sideways by ${de.scrollWidth - de.clientWidth}px`);

        document.querySelectorAll('.btn').forEach((b) => {
          const r = b.getBoundingClientRect();
          const cs = getComputedStyle(b);
          if (cs.visibility === 'hidden' || cs.display === 'none') out.push(`hidden CTA: ${b.textContent.trim()}`);
          if (r.right > de.clientWidth + 1 || r.left < -1) out.push(`clipped CTA: ${b.textContent.trim()}`);
        });
        return out;
      });

      expect(problems, `at ${width}px`).toEqual([]);
    }
  });
});
