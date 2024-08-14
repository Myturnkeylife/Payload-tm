import type { DocumentTabConfig } from 'payload'
import type React from 'react'

import { VersionsPill } from './VersionsPill/index.js'

export const documentViewKeys = [
  'api',
  'default',
  'livePreview',
  'references',
  'relationships',
  'version',
  'versions',
]

export type DocumentViewKey = (typeof documentViewKeys)[number]

export const tabs: Record<
  DocumentViewKey,
  {
    Pill_Component?: React.FC
    order?: number // TODO: expose this to the globalConfig config
  } & DocumentTabConfig
> = {
  api: {
    condition: ({ collectionConfig, globalConfig }) =>
      (collectionConfig && !collectionConfig?.admin?.hideAPIURL) ||
      (globalConfig && !globalConfig?.admin?.hideAPIURL),
    href: '/api',
    label: 'API',
    order: 1000,
  },
  default: {
    href: '',
    // isActive: ({ href, location }) =>
    // location.pathname === href || location.pathname === `${href}/create`,
    label: ({ t }) => t('general:edit'),
    order: 0,
  },
  livePreview: {
    condition: ({ collectionConfig, config, globalConfig }) => {
      if (collectionConfig) {
        return Boolean(
          config?.admin?.livePreview?.collections?.includes(collectionConfig.slug) ||
            collectionConfig?.admin?.livePreview,
        )
      }

      if (globalConfig) {
        return Boolean(
          config?.admin?.livePreview?.globals?.includes(globalConfig.slug) ||
            globalConfig?.admin?.livePreview,
        )
      }

      return false
    },
    href: '/preview',
    label: ({ t }) => t('general:livePreview'),
    order: 100,
  },
  references: {
    condition: () => false,
  },
  relationships: {
    condition: () => false,
  },
  version: {
    condition: () => false,
  },
  versions: {
    Pill_Component: VersionsPill,
    condition: ({ collectionConfig, globalConfig, permissions }) =>
      Boolean(
        (collectionConfig?.versions &&
          permissions?.collections?.[collectionConfig?.slug]?.readVersions?.permission) ||
          (globalConfig?.versions &&
            permissions?.globals?.[globalConfig?.slug]?.readVersions?.permission),
      ),
    href: '/versions',
    label: ({ t }) => t('version:versions'),
    order: 200,
  },
}
