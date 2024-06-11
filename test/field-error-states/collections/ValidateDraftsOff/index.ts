import type { CollectionConfig } from 'payload/types'

import { slugs } from '../../shared.js'
import { ValidateDraftsOn } from '../ValidateDraftsOn/index.js'

export const ValidateDraftsOff: CollectionConfig = {
  ...ValidateDraftsOn,
  slug: slugs.validateDraftsOff,
  versions: {
    drafts: true,
  },
}
