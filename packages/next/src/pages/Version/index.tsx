import React from 'react'

import { DefaultVersionView } from './Default'
import { Document, Field } from 'payload/types'
import type { ServerSideEditViewProps } from '@payloadcms/ui'
import { CollectionPermission, GlobalPermission } from 'payload/auth'
import { notFound } from 'next/navigation'

export const VersionView: React.FC<ServerSideEditViewProps> = async (props) => {
  const { config, permissions, payload, user, params, i18n } = props

  const versionID = params.segments[2]

  const collectionConfig = 'collectionConfig' in props && props?.collectionConfig
  const globalConfig = 'globalConfig' in props && props?.globalConfig
  const id = 'id' in props ? props.id : undefined

  const collectionSlug = collectionConfig?.slug
  const globalSlug = globalConfig?.slug

  const { localization } = config

  let docPermissions: CollectionPermission | GlobalPermission
  let fields: Field[]
  let slug: string

  let doc: Document
  let publishedDoc: Document
  let mostRecentDoc: Document
  let compareDoc: Document

  if (collectionSlug) {
    slug = collectionSlug
    fields = collectionConfig.fields
    docPermissions = permissions.collections[collectionSlug]

    try {
      doc = await payload.findVersionByID({
        collection: slug,
        id: versionID,
        depth: 1,
        locale: '*',
      })

      publishedDoc = await payload.findByID({
        collection: slug,
        id,
        depth: 1,
        draft: false,
        locale: '*',
      })

      mostRecentDoc = await payload.findByID({
        collection: slug,
        id,
        depth: 1,
        draft: true,
        locale: '*',
      })

      // TODO: this `id` will be dynamic based on the user's selection
      // Use URL params to achieve this
      compareDoc = await payload.findByID({
        collection: slug,
        id,
        depth: 1,
        draft: true,
        locale: '*',
      })
    } catch (error) {
      return notFound()
    }
  }

  if (globalSlug) {
    slug = globalSlug
    fields = globalConfig.fields
    docPermissions = permissions.globals[globalSlug]

    try {
      doc = payload.findGlobalVersionByID({
        slug,
        id: versionID,
        depth: 1,
        locale: '*',
      })

      publishedDoc = payload.findGlobal({
        slug,
        depth: 1,
        draft: false,
        locale: '*',
      })

      mostRecentDoc = payload.findGlobal({
        slug,
        depth: 1,
        draft: true,
        locale: '*',
      })

      // TODO: this `slug` will be dynamic based on the user's selection
      // Use URL params to achieve this
      compareDoc = payload.findGlobal({
        slug,
        depth: 1,
        draft: true,
        locale: '*',
      })
    } catch (error) {
      return notFound()
    }
  }

  // const compareFetchURL =
  //   compareValue?.value === 'mostRecent' || compareValue?.value === 'published'
  //     ? originalDocFetchURL
  //     : `${compareBaseURL}/${compareValue.value}`

  const locales =
    localization &&
    localization?.locales &&
    localization.locales.map(({ code, label }) => ({
      label: typeof label === 'string' ? label : '',
      value: code,
    }))

  if (!doc) {
    return notFound()
  }

  return (
    <DefaultVersionView
      collectionConfig={collectionConfig}
      compareDoc={compareDoc}
      config={config}
      doc={doc}
      fields={fields}
      globalConfig={globalConfig}
      locales={locales}
      mostRecentDoc={mostRecentDoc}
      id={id}
      permissions={permissions}
      publishedDoc={publishedDoc}
      user={user}
      versionID={versionID}
      docPermissions={docPermissions}
      locale="" // TODO
      i18n={i18n}
    />
  )
}
