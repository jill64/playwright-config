<!----- BEGIN GHOST DOCS HEADER ----->

# playwright-config

[![npm-version](https://img.shields.io/npm/v/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![npm-license](https://img.shields.io/npm/l/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/playwright-config)](https://npmjs.com/package/@jill64/playwright-config)

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
