import type { I18n } from '@payloadcms/translations'
import type { SanitizedConfig } from 'payload/types'

import { initI18n } from '@payloadcms/translations'
import { translations } from '@payloadcms/translations/client'
import { cookies, headers } from 'next/headers.js'

import { getRequestLanguage } from './getRequestLanguage.js'

export const getNextI18n = ({
  config,
  language,
}: {
  config: SanitizedConfig
  language?: string
}): I18n =>
  initI18n({
    config: config.i18n,
    context: 'client',
    language: language || getRequestLanguage({ config, cookies: cookies(), headers: headers() }),
    translations,
  })
