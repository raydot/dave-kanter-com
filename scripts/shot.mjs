// Take a screenshot of a page so it can be looked at.
//
//   node scripts/shot.mjs / --w phone
//   node scripts/shot.mjs / --w desktop --click Portfolio --click "Healthcare 5" --name portfolio-filtered
//   node scripts/shot.mjs file:///abs/path/mock.html --w phone --full
//
// Paths resolve against BASE_URL (default http://localhost:3000); a full
// http(s):// or file:// URL is used as-is. Clicks are real, trusted
// pointer events. Output goes to .playwright/shots/ (gitignored).
import { chromium, devices } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const target = args.find((a) => !a.startsWith('--') && !isFlagValue(a))
function isFlagValue(a) {
  const i = args.indexOf(a)
  return i > 0 && args[i - 1].startsWith('--') && !['--full'].includes(args[i - 1])
}
const flag = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined }
const flags = (name) => args.flatMap((a, i) => (a === `--${name}` ? [args[i + 1]] : []))

const PRESETS = {
  desktop: { viewport: { width: 1440, height: 900 } },
  tablet: { ...devices['iPad (gen 7)'] },
  phone: { ...devices['iPhone 14'] },
}
const preset = flag('w') ?? 'desktop'
if (!PRESETS[preset]) throw new Error(`--w must be one of ${Object.keys(PRESETS).join(', ')}`)
if (!target) throw new Error('usage: node scripts/shot.mjs <path-or-url> [--w desktop|tablet|phone] [--click text | --clickcss css | --select css=value | --press key | --focus css]... [--wait ms] [--full] [--name out]')

const base = process.env.BASE_URL ?? 'http://localhost:3000'
const url = /^(https?|file):/.test(target) ? target : new URL(target, base).toString()

const browser = await chromium.launch()
const context = await browser.newContext({ ...PRESETS[preset], reducedMotion: 'reduce' })
const page = await context.newPage()
const problems = []
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
page.on('console', (m) => { if (m.type() === 'error') problems.push(`console.error: ${m.text()}`) })

// A local .html fragment (no <html>) is wrapped the way the Artifact
// publisher wraps it, so charset and viewport match what viewers see.
if (url.startsWith('file:')) {
  const html = fs.readFileSync(new URL(url), 'utf8')
  if (!/<html/i.test(html)) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${html}</body></html>`, { waitUntil: 'networkidle' })
  } else {
    await page.goto(url, { waitUntil: 'networkidle' })
  }
} else {
  await page.goto(url, { waitUntil: 'networkidle' })
}
// Steps run in the order given: --click "Label" (a real click on a button,
// matched by accessible name then exact text) and --select "css=value"
// (choose an option in a <select>, e.g. --select "#portfolio-filter=healthcare"),
// --clickcss "css" (a real click by CSS selector, when a link/button's text
// isn't matchable by --click, e.g. it has a child element appended with no
// space), --press Key (e.g. Tab, Enter, Shift+Tab) and --focus "css". Browsers only draw :focus-visible rings after keyboard
// input, so to see a focus ring do: --press Shift --focus "css".
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--click') {
    const text = args[++i]
    const byRole = page.getByRole('button', { name: text, exact: true }).first()
    const el = (await byRole.count()) ? byRole : page.getByText(text, { exact: true }).first()
    await el.click()
    await page.waitForTimeout(1300)
  } else if (args[i] === '--select') {
    const [selector, value] = args[++i].split('=')
    await page.selectOption(selector, value)
    await page.waitForTimeout(600)
  } else if (args[i] === '--press') {
    await page.keyboard.press(args[++i])
    await page.waitForTimeout(300)
  } else if (args[i] === '--focus') {
    await page.locator(args[++i]).first().focus()
    await page.waitForTimeout(300)
  } else if (args[i] === '--clickcss') {
    await page.locator(args[++i]).first().click()
    await page.waitForTimeout(1300)
  }
}
if (flag('wait')) await page.waitForTimeout(Number(flag('wait')))

const dir = path.resolve('.playwright/shots')
fs.mkdirSync(dir, { recursive: true })
const name = flag('name') ?? `${(new URL(url).pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home')}-${preset}`
const file = path.join(dir, `${name}.png`)
await page.screenshot({ path: file, fullPage: args.includes('--full') })
await browser.close()

console.log(file)
if (problems.length) console.log('PAGE PROBLEMS:\n' + problems.join('\n'))
