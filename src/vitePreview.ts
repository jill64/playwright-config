import { Config } from '@playwright/test'

export const vitePreview: Config = {
  webServer: {
    command: 'npm run preview',
    port: 4173
  }
}
