import { SanitizedConfig } from 'payload/types'
import React from 'react'
import { RenderCustomComponent, TableColumnsProvider } from '@payloadcms/ui/elements'
import { DefaultList } from '@payloadcms/ui/views'
import { initPage } from '../../utilities/initPage'

export const CollectionList = async ({
  collectionSlug,
  config: configPromise,
  searchParams,
}: {
  collectionSlug: string
  config: Promise<SanitizedConfig>
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { config, payload, permissions, user } = await initPage(configPromise)

  const {
    routes: { admin },
  } = config

  const collectionConfig = config.collections.find(
    (collection) => collection.slug === collectionSlug,
  )

  if (collectionConfig) {
    const {
      admin: { components: { views: { List: CustomList } = {} } = {} },
    } = collectionConfig

    let ListToRender = null

    if (CustomList && typeof CustomList === 'function') {
      ListToRender = CustomList
    } else if (typeof CustomList === 'object' && typeof CustomList.Component === 'function') {
      ListToRender = CustomList.Component
    }

    const limit = Number(searchParams?.limit) || collectionConfig.admin.pagination.defaultLimit

    const data = await payload.find({
      collection: collectionSlug,
      depth: 0,
      limit,
      user,
    })

    return (
      <TableColumnsProvider collectionSlug={collectionSlug}>
        <RenderCustomComponent
          CustomComponent={ListToRender}
          DefaultComponent={DefaultList}
          componentProps={{
            collection: collectionConfig,
            data,
            hasCreatePermission: permissions?.collections?.[collectionSlug]?.create?.permission,
            limit,
            newDocumentURL: `${admin}/collections/${collectionSlug}/create`,
            // resetParams,
            // titleField,
          }}
        />
      </TableColumnsProvider>
    )
  }

  return null
}
