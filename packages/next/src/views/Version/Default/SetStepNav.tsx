import type { StepNavItem } from '@payloadcms/ui/elements/StepNav'
import type { FieldMap } from '@payloadcms/ui/utilities/buildComponentMap'
import type { ClientCollectionConfig, ClientGlobalConfig } from 'payload/types'
import type React from 'react'

import { getTranslation } from '@payloadcms/translations'
import { useStepNav } from '@payloadcms/ui/elements/StepNav'
import { useConfig } from '@payloadcms/ui/providers/Config'
import { useLocale } from '@payloadcms/ui/providers/Locale'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { formatDate } from '@payloadcms/ui/utilities/formatDate'
import { useEffect } from 'react'

export const SetStepNav: React.FC<{
  collectionConfig?: ClientCollectionConfig
  collectionSlug?: string
  doc: any
  fieldMap: FieldMap
  globalConfig?: ClientGlobalConfig
  globalSlug?: string
  id?: number | string
  mostRecentDoc: any
}> = ({
  id,
  collectionConfig,
  collectionSlug,
  doc,
  fieldMap,
  globalConfig,
  globalSlug,
  mostRecentDoc,
}) => {
  const config = useConfig()
  const { setStepNav } = useStepNav()
  const { i18n, t } = useTranslation()
  const locale = useLocale()

  useEffect(() => {
    let nav: StepNavItem[] = []

    const {
      admin: { dateFormat },
      routes: { admin: adminRoute },
    } = config

    if (collectionSlug) {
      let docLabel = ''

      const useAsTitle = collectionConfig?.admin?.useAsTitle || 'id'
      const pluralLabel = collectionConfig?.labels?.plural

      if (mostRecentDoc) {
        if (useAsTitle !== 'id') {
          const titleField = fieldMap.find((f) => {
            const { isFieldAffectingData } = f
            const fieldName = 'name' in f ? f.name : undefined
            return Boolean(isFieldAffectingData && fieldName === useAsTitle)
          })

          if (titleField && mostRecentDoc[useAsTitle]) {
            if (titleField.localized) {
              docLabel = mostRecentDoc[useAsTitle]?.[locale.code]
            } else {
              docLabel = mostRecentDoc[useAsTitle]
            }
          } else {
            docLabel = `[${t('general:untitled')}]`
          }
        } else {
          docLabel = mostRecentDoc.id
        }
      }

      nav = [
        {
          label: getTranslation(pluralLabel, i18n),
          url: `${adminRoute}/collections/${collectionSlug}`,
        },
        {
          label: docLabel,
          url: `${adminRoute}/collections/${collectionSlug}/${id}`,
        },
        {
          label: 'Versions',
          url: `${adminRoute}/collections/${collectionSlug}/${id}/versions`,
        },
        {
          label: doc?.createdAt ? formatDate(doc.createdAt, dateFormat, i18n?.language) : '',
        },
      ]
    }

    if (globalSlug) {
      nav = [
        {
          label: globalConfig.label,
          url: `${adminRoute}/globals/${globalConfig.slug}`,
        },
        {
          label: 'Versions',
          url: `${adminRoute}/globals/${globalConfig.slug}/versions`,
        },
        {
          label: doc?.createdAt ? formatDate(doc.createdAt, dateFormat, i18n?.language) : '',
        },
      ]
    }

    setStepNav(nav)
  }, [
    config,
    setStepNav,
    collectionSlug,
    globalSlug,
    doc,
    mostRecentDoc,
    id,
    locale,
    t,
    i18n,
    collectionConfig,
    fieldMap,
    globalConfig,
  ])

  return null
}
