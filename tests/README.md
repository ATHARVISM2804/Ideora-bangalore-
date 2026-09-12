# Tests

Two suites, with different jobs.

## `journey.spec.js` — behaviour, on every engine

Runs on Chromium, Firefox, WebKit and emulated iPhone and Pixel. Asserts what a
buyer does: the home-to-product-to-booking path, that every legacy URL still
resolves, that the menu works by keyboard, that the contact form says what is
wrong, and that nothing scrolls sideways.

Assertions only, no pixels, which is why it can run on engines where a
screenshot comparison would be meaningless.

```
npm run test:browsers
```

## `visual.spec.js` — pixels, on one engine

Catches the regression where a token change or a new rule quietly breaks a
layout three pages away. Seven layouts at 390, 768, 1280 and 1440.

The pages are the ones with a distinct arrangement, not all twenty-five: the
product template covers every product page, the prose template covers every
service, industry and legal page.

```
npm run test:visual
```

### Updating baselines

Baselines are platform-specific — fonts rasterise differently on macOS and
Linux — and CI compares the **Linux** ones. Regenerate them in the same
container CI uses, never on your own machine:

```
docker run --rm \
  -v "$PWD":/w -v /w/node_modules -w /w --network host \
  mcr.microsoft.com/playwright:v1.63.0-noble \
  bash -lc "npm ci --silent && npx playwright test --project=visual --update-snapshots"
```

The second `-v /w/node_modules` is load-bearing. It shadows your host
`node_modules` with an empty volume so the container installs its own Linux
binaries there. Without it, `npm ci` writes them over yours and your local
build stops working until you `npm install` again.

Only the `-linux` baselines are committed. A macOS run writes its own `-darwin`
set, which is useful for checking a change before you push but is gitignored:
nothing reads it, and committing both doubled the repo's image weight.

Review every changed snapshot before committing. A baseline updated without
being looked at is worse than no baseline: it silently blesses the regression
it was meant to catch.
