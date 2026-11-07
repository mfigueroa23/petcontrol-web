import { defineConfig, devices } from '@playwright/test';

/**
 * System tests run against the `web` container (SDD 5.4).
 * Start it with `docker run --rm -p 8080:8080 petcontrol-web:local`
 * or point E2E_BASE_URL to another instance.
 */
const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: process.env['E2E_BASE_URL'] ?? 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Supported browsers (REQ-NF-006) and 360 px mobile width (REQ-NF-007).
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'msedge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-360', use: { ...devices['Galaxy S8'] } },
  ],
});
