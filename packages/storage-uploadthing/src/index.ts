import type {
  Adapter,
  PluginOptions as CloudStoragePluginOptions,
  CollectionOptions,
  GeneratedAdapter,
} from '@payloadcms/plugin-cloud-storage/types'
import type { Config, Plugin } from 'payload/config'
import type { UTApiOptions } from 'uploadthing/types'

import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { UTApi } from 'uploadthing/server'

import { getHandleDelete } from './handleDelete.js'
import { getHandleUpload } from './handleUpload.js'
import { getHandler } from './staticHandler.js'

export type UploadthingStorageOptions = {
  /**
   * Collection options to apply the adapter to.
   */
  collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>

  /**
   * Whether or not to enable the plugin
   *
   * Default: true
   */
  enabled?: boolean

  /**
   * Uploadthing Options
   */
  options: UTApiOptions & {
    /**
     * @default 'public-read'
     */
    acl?: ACL
  }
}

type UploadthingPlugin = (uploadthingStorageOptions: UploadthingStorageOptions) => Plugin

/** NOTE: not synced with uploadthing's internal types. Need to modify if more options added */
export type ACL = 'private' | 'public-read'

export const uploadthingStorage: UploadthingPlugin =
  (uploadthingStorageOptions: UploadthingStorageOptions) =>
  (incomingConfig: Config): Config => {
    if (uploadthingStorageOptions.enabled === false) {
      return incomingConfig
    }

    // Default ACL to public-read
    if (!uploadthingStorageOptions.options.acl) {
      uploadthingStorageOptions.options.acl = 'public-read'
    }

    const adapter = uploadthingInternal(uploadthingStorageOptions)

    // Add adapter to each collection option object
    const collectionsWithAdapter: CloudStoragePluginOptions['collections'] = Object.entries(
      uploadthingStorageOptions.collections,
    ).reduce(
      (acc, [slug, collOptions]) => ({
        ...acc,
        [slug]: {
          ...(collOptions === true ? {} : collOptions),

          // Disable payload access control if the ACL is public-read or not set
          ...(uploadthingStorageOptions.options.acl === 'public-read'
            ? { disablePayloadAccessControl: true }
            : {}),

          adapter,
        },
      }),
      {} as Record<string, CollectionOptions>,
    )

    // Set disableLocalStorage: true for collections specified in the plugin options
    const config = {
      ...incomingConfig,
      collections: (incomingConfig.collections || []).map((collection) => {
        if (!collectionsWithAdapter[collection.slug]) {
          return collection
        }

        return {
          ...collection,
          upload: {
            ...(typeof collection.upload === 'object' ? collection.upload : {}),
            disableLocalStorage: true,
          },
        }
      }),
    }

    return cloudStoragePlugin({
      collections: collectionsWithAdapter,
    })(config)
  }

function uploadthingInternal(options: UploadthingStorageOptions): Adapter {
  return (): GeneratedAdapter => {
    const {
      options: { acl = 'public-read', ...utOptions },
    } = options

    const utApi = new UTApi(utOptions)

    return {
      name: 'uploadthing',
      // No generateURL func, public urls are handled by uploadthing
      handleDelete: getHandleDelete({ utApi }),
      handleUpload: getHandleUpload({ acl, utApi }),
      staticHandler: getHandler({ utApi }),
    }
  }
}
