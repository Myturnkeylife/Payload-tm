import type { SanitizedConfig } from 'payload/types'

import { auth } from '@payloadcms/next/utilities/auth'
import { translations } from '@payloadcms/translations/client'
import { RootProvider, buildComponentMap } from '@payloadcms/ui'
import '@payloadcms/ui/scss/app.scss'
import { headers as getHeaders } from 'next/headers'
import { createClientConfig } from 'payload/config'
import { deepMerge } from 'payload/utilities'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { DefaultEditView } from '../../pages/Edit/Default'
import { DefaultListView } from '../../pages/List/Default'
import { DefaultCell } from '../../pages/List/Default/Cell'
import { getRequestLanguage } from '../../utilities/getRequestLanguage'

export const metadata = {
  description: 'Generated by Next.js',
  title: 'Next.js',
}

const rtlLanguages = ['ar', 'fa', 'ha', 'ku', 'ur', 'ps', 'dv', 'ks', 'khw', 'he', 'yi']

export const RootLayout = async ({
  children,
  config: configPromise,
}: {
  children: React.ReactNode
  config: Promise<SanitizedConfig>
}) => {
  const config = await configPromise
  const clientConfig = await createClientConfig(config)

  const headers = getHeaders()

  const { cookies, user } = await auth({
    config: configPromise,
    headers,
  })
  const lang =
    getRequestLanguage({
      cookies,
      headers,
    }) ?? clientConfig.i18n.fallbackLanguage

  const dir = rtlLanguages.includes(lang) ? 'RTL' : 'LTR'

  const mergedTranslations = deepMerge(translations, clientConfig.i18n.translations)

  const languageOptions = Object.entries(translations || {}).map(([language, translations]) => ({
    label: translations.general.thisLanguage,
    value: language,
  }))

  const componentMap = buildComponentMap({
    DefaultCell,
    DefaultEditView,
    DefaultListView,
    config,
  })

  return (
    <html dir={dir} lang={lang}>
      <body>
        <RootProvider
          componentMap={componentMap}
          config={clientConfig}
          fallbackLang={clientConfig.i18n.fallbackLanguage}
          lang={lang}
          languageOptions={languageOptions}
          translations={mergedTranslations[lang]}
        >
          {children}
        </RootProvider>
        <div id="portal" />
      </body>
    </html>
  )
}
