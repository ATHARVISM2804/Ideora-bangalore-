import { defineConfig, devices } from '@playwright/test';

// Two suites with different jobs.
//
// `visual` catches CSS regressions -- the class of bug where a token change or
// a new rule quietly breaks a layout three pages away, which is exactly what
// happened repeatedly while this site was being built. It runs on one engine,
// because a screenshot diff across engines is noise: fonts rasterise
// differently and every shot would fail for reasons nobody can act on.
//
// `cross-browser` answers the specification's browser matrix. It asserts
// behaviour rather than pixels, so it can run on WebKit and Firefox where a
// pixel diff cannot.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4173',
    trace: 'retain-on-failure',
  },

  // Motion is the enemy of a stable screenshot. Forcing reduced-motion also
  // means the suite exercises the path a reader with that setting gets, which
  // is the one most likely to rot unnoticed.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },

  projects: [
    {
      name: 'visual',
      testMatch: /visual\.spec\.js/,
      use: { ...devices['Desktop Chrome'], colorScheme: 'light', reducedMotion: 'reduce' },
    },
    {
      name: 'chromium',
      testMatch: /journey\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /journey\.spec\.js/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: /journey\.spec\.js/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      testMatch: /mobile\.spec\.js/,
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'mobile-safari',
      testMatch: /journey\.spec\.js/,
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: /journey\.spec\.js/,
      use: { ...devices['Pixel 7'] },
    },
  ],

  // `vite preview` serves the real production build, not the dev server, so
  // what is tested is what ships.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run preview -- --port 4173',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
