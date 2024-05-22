import type { DocumentPermissions } from 'payload/auth'
import type {
  Data,
  PayloadRequest,
  SanitizedCollectionConfig,
  SanitizedGlobalConfig,
} from 'payload/types'

import { hasSavePermission as getHasSavePermission } from '@payloadcms/ui/utilities/hasSavePermission'
import { isEditing as getIsEditing } from '@payloadcms/ui/utilities/isEditing'
import { docAccessOperation, docAccessOperationGlobal } from 'payload/operations'

export const getDocumentPermissions = async (args: {
  collectionConfig?: SanitizedCollectionConfig
  data: Data
  globalConfig?: SanitizedGlobalConfig
  id?: number | string
  req: PayloadRequest
}): Promise<{
  docPermissions: DocumentPermissions
  hasPublishPermission: boolean
  hasSavePermission: boolean
}> => {
  const { id, collectionConfig, data = {}, globalConfig, req } = args

  let docPermissions: DocumentPermissions
  let hasPublishPermission = false

  if (collectionConfig) {
    try {
      docPermissions = await docAccessOperation({
        id: id?.toString(),
        collection: {
          config: collectionConfig,
        },
        req: {
          ...req,
          data,
        },
      })

      if (collectionConfig.versions?.drafts) {
        hasPublishPermission = await docAccessOperation({
          id: id?.toString(),
          collection: {
            config: collectionConfig,
          },
          req: {
            ...req,
            data: {
              ...data,
              _status: 'published',
            },
          },
        }).then(({ update }) => update?.permission)
      }
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
  }

  if (globalConfig) {
    try {
      docPermissions = await docAccessOperationGlobal({
        globalConfig,
        req: {
          ...req,
          data,
        },
      })

      if (globalConfig.versions?.drafts) {
        hasPublishPermission = await docAccessOperationGlobal({
          globalConfig,
          req: {
            ...req,
            data: {
              ...data,
              _status: 'published',
            },
          },
        }).then(({ update }) => update?.permission)
      }
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
  }

  const hasSavePermission = getHasSavePermission({
    collectionSlug: collectionConfig?.slug,
    docPermissions,
    globalSlug: globalConfig?.slug,
    isEditing: getIsEditing({
      id,
      collectionSlug: collectionConfig?.slug,
      globalSlug: globalConfig?.slug,
    }),
  })

  return {
    docPermissions,
    hasPublishPermission,
    hasSavePermission,
  }
}
