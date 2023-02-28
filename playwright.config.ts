import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: 'test',
  testMatch: '*e2e.spec.ts',
  workers: 999,
  timeout: 600000,
  use: {
    video: 'retain-on-failure',
    trace: 'on',
    screenshot: 'only-on-failure',
  },
};
export default config;
