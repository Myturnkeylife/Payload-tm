import type { CollectionConfig } from 'payload/types'

import { group2Collection1Slug } from '../slugs.js'

export const CollectionGroup2A: CollectionConfig = {
  slug: group2Collection1Slug,
  admin: {
    group: 'One',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
