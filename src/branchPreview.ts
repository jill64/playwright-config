import { Config } from '@playwright/test'
import { vitePreview } from './vitePreview.js'

const providers = ['cloudflare'] as const
type Provider = (typeof providers)[number]

const { GITHUB_REF_NAME, GITHUB_REPOSITORY } = process.env

export const branchPreview = (options: {
  project?: string
  provider: Provider
  fallback?: Config
}): Config => {
  const { project, fallback = vitePreview } = options

  if (!GITHUB_REF_NAME) {
    return fallback
  }

  const project_name = project ?? GITHUB_REPOSITORY?.split('/')[1]

  if (!project_name) {
    return fallback
  }

  if (GITHUB_REF_NAME === 'main') {
    return {
      use: {
        baseURL: `https://${project_name}.pages.dev`
      }
    }
  }

  const sub = GITHUB_REF_NAME.replace(/\//g, '-').replace('.', '-')

  if (sub.length > 28) {
    return fallback
  }

  return {
    use: {
      baseURL: `https://${sub}.${project_name}.pages.dev`
    }
  }
}
