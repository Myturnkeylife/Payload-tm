import type { Metadata } from 'next'

import { getTranslation } from '@payloadcms/translations'

import type { GenerateEditViewMetadata } from '../Document/getMetaBySegment.js'

import { meta } from '../../utilities/meta.js'

export const generateMetadata: GenerateEditViewMetadata = async ({
  collectionConfig,
  config,
  globalConfig,
  i18n,
  isEditing,
}): Promise<Metadata> => {
  const { t } = i18n

  const entityLabel = collectionConfig
    ? getTranslation(collectionConfig.labels.singular, i18n)
    : globalConfig
      ? getTranslation(globalConfig.label, i18n)
      : ''

  const metaTitle = `${isEditing ? t('general:editing') : t('general:creating')} - ${entityLabel}`
  const ogTitle = `${isEditing ? t('general:edit') : t('general:edit')} - ${entityLabel}`
  const description = `${isEditing ? t('general:editing') : t('general:creating')} - ${entityLabel}`
  const keywords = `${entityLabel}, Payload, CMS`

  return Promise.resolve(
    meta({
      config,
      description,
      keywords,
      openGraph: {
        description: entityLabel,
        title: ogTitle,
      },
      title: metaTitle,
    }),
  )
}
