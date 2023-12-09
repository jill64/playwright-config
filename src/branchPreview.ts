import { Config } from '@playwright/test'
import { vitePreview } from './vitePreview.js'

const providers = ['cloudflare', 'vercel', 'netlify'] as const
type Provider = (typeof providers)[number]

const { GITHUB_REF_NAME, GITHUB_REPOSITORY } = process.env

export const branchPreview = (
  provider: Provider,
  options?: {
    project?: string
    fallback?: Config
  }
): Config => {
  const { project, fallback = vitePreview } = options ?? {}

  if (!providers.includes(provider)) {
    return fallback
  }

  if (!GITHUB_REF_NAME) {
    return fallback
  }

  const project_name = project ?? GITHUB_REPOSITORY?.split('/')?.[1]

  if (!project_name) {
    return fallback
  }

  if (GITHUB_REF_NAME === 'main') {
    return {
      use: {
        baseURL:
          provider === 'cloudflare'
            ? `https://${project_name}.pages.dev`
            : provider === 'vercel'
              ? `https://${project_name}.vercel.app`
              : `https://${project_name}.netlify.app`
      }
    }
  }

  const sub =
    provider === 'vercel'
      ? GITHUB_REF_NAME.replace(/\//g, '-').replace('.', '')
      : GITHUB_REF_NAME.replace(/\//g, '-').replace('.', '-')

  if (sub.length > 28) {
    return fallback
  }

  return {
    use: {
      baseURL:
        provider === 'cloudflare'
          ? `https://${sub}.${project_name}.pages.dev`
          : provider === 'vercel'
            ? `https://${project_name}-git-${sub}-jill-64.vercel.app`
            : `https://${sub}--${project_name}.netlify.app`
    }
  }
}
