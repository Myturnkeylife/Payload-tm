import type { I18n } from '@payloadcms/translations'
import type { Metadata } from 'next'

import { formatAdminURL } from '@payloadcms/ui/shared'
import {
  type AdminViewComponent,
  type ConfigImport,
  getConfig,
  type ImportMap,
  type PayloadServerReactComponent,
  type SanitizedConfig,
} from 'payload'
import React from 'react'

import { DefaultTemplate } from '../../templates/Default/index.js'
import { getNextRequestI18n } from '../../utilities/getNextRequestI18n.js'
import { initPage } from '../../utilities/initPage/index.js'
import { NotFoundClient } from './index.client.js'

export const generatePageMetadata = async ({
  config: configImport,
}: {
  config: ConfigImport
  params?: { [key: string]: string | string[] }
}): Promise<Metadata> => {
  const config = await getConfig(configImport)

  const i18n = await getNextRequestI18n({
    config,
  })

  return {
    title: i18n.t('general:notFound'),
  }
}

export type GenerateViewMetadata = (args: {
  config: SanitizedConfig
  i18n: I18n
  params?: { [key: string]: string | string[] }
}) => Promise<Metadata>

export const NotFoundPage = async ({
  config: configImport,
  importMap,
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  config: ConfigImport
  importMap: ImportMap
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}) => {
  const config = await getConfig(configImport)

  const { routes: { admin: adminRoute } = {} } = config

  const searchParams = await searchParamsPromise
  const initPageResult = await initPage({
    config,
    importMap,
    redirectUnauthenticatedUser: true,
    route: formatAdminURL({ adminRoute, path: '/not-found' }),
    searchParams,
  })

  const params = await paramsPromise

  if (!initPageResult.req.user || !initPageResult.permissions.canAccessAdmin) {
    return <NotFoundClient />
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user}
      visibleEntities={initPageResult.visibleEntities}
    >
      <NotFoundClient />
    </DefaultTemplate>
  )
}

export const NotFoundView: PayloadServerReactComponent<AdminViewComponent> = () => {
  return <NotFoundClient marginTop="large" />
}
