<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/playwright-config

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://npmjs.com/package/@jill64/playwright-config"><img src="https://img.shields.io/npm/v/@jill64/playwright-config" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/playwright-config"><img src="https://img.shields.io/npm/l/@jill64/playwright-config" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/playwright-config"><img src="https://img.shields.io/npm/dm/@jill64/playwright-config" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/playwright-config"><img src="https://img.shields.io/bundlephobia/min/@jill64/playwright-config" alt="npm-min-size" /></a> <a href="https://github.com/jill64/playwright-config/actions/workflows/duplex-playwright.yml"><img src="https://github.com/jill64/playwright-config/actions/workflows/duplex-playwright.yml/badge.svg" alt="duplex-playwright.yml" /></a> <a href="https://github.com/jill64/playwright-config/actions/workflows/run-playwright.yml"><img src="https://github.com/jill64/playwright-config/actions/workflows/run-playwright.yml/badge.svg" alt="run-playwright.yml" /></a>

<!----- END GHOST DOCS BADGES ----->

🎭 Reusable My Playwright Config

<!----- END GHOST DOCS HEADER ----->

## Installation

```sh
npm i -D @jill64/playwright-config
```

## Usage

playwright.config.ts

```ts
import { extendsConfig } from '@jill64/playwright-config'

export default extendsConfig({
  webServer: {
    command: 'npm run preview',
    port: 4173
  }
})
```

## Use Vite Local Preview

```ts
import { extendsConfig, vitePreview } from '@jill64/playwright-config'

export default extendsConfig(vitePreview)
```

## Use Real Server

```ts
import { extendsConfig, vitePreview, branchPreview } from '@jill64/playwright-config'

export default extendsConfig(branchPreview({
  provider: 'cloudflare',
  fallback: vitePreview
})
```

## GitHub Workflow

```yml
name: CI

on: push

jobs:
  test:
    uses: jill64/playwright-config/.github/workflows/run-playwright.yml@v2.1.0
    with:
      pre-test: npm run build
      test-command: npx playwright test
      provider: cloudflare
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
