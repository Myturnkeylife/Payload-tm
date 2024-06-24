import type { CollectionConfig } from 'payload/types'

import { noApiViewCollectionSlug } from '../slugs.js'

export const CollectionNoApiView: CollectionConfig = {
  slug: noApiViewCollectionSlug,
  admin: {
    hideAPIURL: true,
  },
  fields: [],
}
