import type { HandleDelete } from '@payloadcms/plugin-cloud-storage/types'
import type { v2 as cloudinary } from 'cloudinary'

import path from 'path'

import { videoExtensions } from './index.js'

interface HandleDeleteArgs {
  folderSrc: string
  getStorageClient: () => typeof cloudinary
}

export const getHandleDelete = ({
  folderSrc,
  getStorageClient,
}: HandleDeleteArgs): HandleDelete => {
  return async ({ doc: { prefix = '' }, filename }) => {
    const publicId = path.posix.join(folderSrc, prefix, filename)
    const extension = filename.toLowerCase().split('.').pop() as string
    const isVideo = videoExtensions.includes(extension)

    await getStorageClient().uploader.destroy(publicId, {
      resource_type: isVideo ? 'video' : 'image',
    })
  }
}
