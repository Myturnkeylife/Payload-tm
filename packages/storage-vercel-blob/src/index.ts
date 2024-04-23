import type {
  PluginOptions as CloudStoragePluginOptions,
  CollectionOptions,
} from '@payloadcms/plugin-cloud-storage/types'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import type { Config, Plugin } from 'payload/config'

import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

import { getGenerateUrl } from './generateURL.js'
import { getHandleDelete } from './handleDelete.js'
import { getHandleUpload } from './handleUpload.js'
import { getStaticHandler } from './staticHandler.js'

export type VercelBlobStorageOptions = {
  /**
   * Access control level
   *
   * @default 'public'
   */
  access?: 'public'

  /**
   * Add a random suffix to the uploaded file name
   *
   * @default false
   */
  addRandomSuffix?: boolean

  /**
   * Cache-Control max-age in seconds
   *
   * @default 31536000 (1 year)
   */
  cacheControlMaxAge?: number

  /**
   * Collections to apply the Vercel Blob adapter to
   */
  collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>

  /**
   * Whether or not to enable the plugin
   *
   * Default: true
   */
  enabled?: boolean

  /**
   * Vercel Blob storage read/write token
   *
   * Usually process.env.BLOB_READ_WRITE_TOKEN set by Vercel
   */
  token: string
}

const defaultUploadOptions: Partial<VercelBlobStorageOptions> = {
  access: 'public',
  addRandomSuffix: false,
  cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
  enabled: true,
}

type VercelBlobStoragePlugin = (vercelBlobStorageOpts: VercelBlobStorageOptions) => Plugin

export const vercelBlobStorage: VercelBlobStoragePlugin =
  (options: VercelBlobStorageOptions) =>
  (incomingConfig: Config): Config => {
    if (options.enabled === false) {
      return incomingConfig
    }

    if (!options.token) {
      throw new Error('The token argument is required for the Vercel Blob adapter.')
    }

    // Parse storeId from token
    const storeId = options.token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()

    if (!storeId) {
      throw new Error(
        'Invalid token format for Vercel Blob adapter. Should be vercel_blob_rw_<store_id>_<random_string>.',
      )
    }

    const optionsWithDefaults = {
      ...defaultUploadOptions,
      ...options,
    }

    const baseUrl = `https://${storeId}.${optionsWithDefaults.access}.blob.vercel-storage.com`

    const adapter = vercelBlobStorageInternal({ ...optionsWithDefaults, baseUrl })

    // Add adapter to each collection option object
    const collectionsWithAdapter: CloudStoragePluginOptions['collections'] = Object.entries(
      options.collections,
    ).reduce(
      (acc, [slug, collOptions]) => ({
        ...acc,
        [slug]: {
          ...(collOptions === true ? {} : collOptions),
          adapter,
        },
      }),
      {} as Record<string, CollectionOptions>,
    )

    return cloudStorage({
      collections: collectionsWithAdapter,
    })(incomingConfig)
  }

function vercelBlobStorageInternal(
  options: VercelBlobStorageOptions & { baseUrl: string },
): Adapter {
  return ({ collection, prefix }): GeneratedAdapter => {
    const { access, addRandomSuffix, baseUrl, cacheControlMaxAge, token } = options
    return {
      generateURL: getGenerateUrl({ baseUrl, prefix }),
      handleDelete: getHandleDelete({ baseUrl, prefix, token: options.token }),
      handleUpload: getHandleUpload({
        access,
        addRandomSuffix,
        baseUrl,
        cacheControlMaxAge,
        prefix,
        token,
      }),
      staticHandler: getStaticHandler({ baseUrl, token }, collection),
    }
  }
}
