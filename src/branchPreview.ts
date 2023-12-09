import { Config } from '@playwright/test'
import { vitePreview } from './vitePreview.js'

const providers = ['cloudflare', 'vercel', 'netlify'] as const
type Provider = (typeof providers)[number]

const { GITHUB_REF_NAME, GITHUB_REPOSITORY, HOSTING_PROVIDER } = process.env

export const branchPreview = (options?: {
  provider?: Provider
  project?: string
  fallback?: Config
}): Config => {
  const {
    provider = HOSTING_PROVIDER ?? '',
    project,
    fallback = vitePreview
  } = options ?? {}

  if (!provider) {
    console.debug('HOSTING_PROVIDER is not defined. Using fallback config.')

    return fallback
  }

  if (!(providers as Readonly<string[]>).includes(provider)) {
    console.warn(
      `Unknown hosting provider "${provider}".\n` +
        `Supported providers are: ${providers.join(', ')}`
    )

    return fallback
  }

  if (!GITHUB_REF_NAME) {
    console.warn('GITHUB_REF_NAME is not defined.')

    return fallback
  }

  const project_name = project ?? GITHUB_REPOSITORY?.split('/')?.[1]

  if (!project_name) {
    console.warn('GITHUB_REPOSITORY is not defined.')

    return fallback
  }

  if (GITHUB_REF_NAME === 'main') {
    const baseURL =
      provider === 'cloudflare'
        ? `https://${project_name}.pages.dev`
        : provider === 'vercel'
          ? `https://${project_name}.vercel.app`
          : `https://${project_name}.netlify.app`

    console.info(`Using ${baseURL} for preview.`)

    return {
      use: {
        baseURL
      }
    }
  }

  const subBase = GITHUB_REF_NAME.replace(/\//g, '-')

  const sub =
    provider === 'vercel' ? subBase.replace('.', '') : subBase.replace('.', '-')

  if (sub.length > 28) {
    console.warn(
      `Subdomain "${sub}" is too long for ${provider}. Max length is 28 characters.`
    )

    return fallback
  }

  const baseURL =
    provider === 'cloudflare'
      ? `https://${sub}.${project_name}.pages.dev`
      : provider === 'vercel'
        ? `https://${project_name}-git-${sub}-jill-64.vercel.app`
        : `https://${sub}--${project_name}.netlify.app`

  console.info(`Using ${baseURL} for preview.`)

  return {
    use: {
      baseURL
    }
  }
}
