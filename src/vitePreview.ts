import { Config } from '@playwright/test'

export const vitePreview: Config = {
  webServer: {
    command: 'bun run preview',
    port: 4173
  }
}
