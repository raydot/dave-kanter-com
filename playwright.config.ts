import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'

// Phase 0 of docs/playwright-testing.md: Chromium only, no cross-browser
// matrix. reuseExistingServer means a `next dev` you already have running
// on :3000 is used as-is instead of starting a second one.
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: BASE_URL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: true,
  },
})
