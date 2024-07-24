'use client'

import type { FormField, UIField } from 'payload'

import {
  useAllFormFields,
  useDocumentInfo,
  useForm,
  useLocale,
  useTranslation,
} from '@payloadcms/ui'
import { get } from 'http'
import React, { useEffect, useState } from 'react'

import type { PluginSEOTranslationKeys, PluginSEOTranslations } from '../../translations/index.js'
import type { GenerateURL } from '../../types.js'

type PreviewProps = {
  descriptionPath?: string
  hasGenerateURLFn: boolean
  titlePath?: string
} & UIField

export const PreviewComponent: React.FC<PreviewProps> = ({
  descriptionPath: descriptionPathFromContext,
  hasGenerateURLFn,
  titlePath: titlePathFromContext,
}) => {
  const { t } = useTranslation<PluginSEOTranslations, PluginSEOTranslationKeys>()

  const locale = useLocale()
  const [fields] = useAllFormFields()
  const { getData } = useForm()
  const docInfo = useDocumentInfo()

  const descriptionPath = descriptionPathFromContext || 'meta.description'
  const titlePath = titlePathFromContext || 'meta.title'

  const {
    [descriptionPath]: { value: metaDescription } = {} as FormField,
    [titlePath]: { value: metaTitle } = {} as FormField,
  } = fields

  const [href, setHref] = useState<string>()

  useEffect(() => {
    const getHref = async () => {
      const genURLResponse = await fetch('/api/plugin-seo/generate-url', {
        body: JSON.stringify({
          ...docInfo,
          doc: { ...getData() },
          locale: typeof locale === 'object' ? locale?.code : locale,
        } satisfies Parameters<GenerateURL>[0]),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { result: newHref } = await genURLResponse.json()

      setHref(newHref)
    }

    if (hasGenerateURLFn && !href) {
      void getHref()
    }
  }, [fields, href, locale, docInfo, hasGenerateURLFn, getData])

  return (
    <div>
      <div>{t('plugin-seo:preview')}</div>
      <div
        style={{
          color: '#9A9A9A',
          marginBottom: '5px',
        }}
      >
        {t('plugin-seo:previewDescription')}
      </div>
      <div
        style={{
          background: 'var(--theme-elevation-50)',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          padding: '20px',
          pointerEvents: 'none',
          width: '100%',
        }}
      >
        <div>
          <a
            href={href}
            style={{
              textDecoration: 'none',
            }}
          >
            {href || 'https://...'}
          </a>
        </div>
        <h4
          style={{
            margin: 0,
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: 'none',
            }}
          >
            {metaTitle as string}
          </a>
        </h4>
        <p
          style={{
            margin: 0,
          }}
        >
          {metaDescription as string}
        </p>
      </div>
    </div>
  )
}
