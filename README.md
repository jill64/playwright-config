<!----- BEGIN GHOST DOCS HEADER ----->

# playwright-config

[![npm-version](https://img.shields.io/npm/v/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![npm-license](https://img.shields.io/npm/l/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![duplex-playwright.yml](https://github.com/jill64/playwright-config/actions/workflows/duplex-playwright.yml/badge.svg)](https://github.com/jill64/playwright-config/actions/workflows/duplex-playwright.yml) [![run-playwright.yml](https://github.com/jill64/playwright-config/actions/workflows/run-playwright.yml/badge.svg)](https://github.com/jill64/playwright-config/actions/workflows/run-playwright.yml)

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

export default extendsConfig(branchPreview(
  provider: 'cloudflare',
  fallback: vitePreview
))
```

## GitHub Workflow

```yml
name: CI

on: push

jobs:
  test:
    uses: jill64/playwright-config/.github/workflows/run-playwright.yml@v2
    with:
      pre-test: npm run build
      test-command: npx playwright test
```
