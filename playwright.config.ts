import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  use: {
    baseURL: 'http://127.0.0.1:4187',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'npm.cmd run preview -- --port 4187',
    url: 'http://127.0.0.1:4187',
    reuseExistingServer: false,
    timeout: 30_000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
