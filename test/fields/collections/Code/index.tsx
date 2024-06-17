import type { CollectionConfig } from 'payload'

import { codeFieldsSlug } from '../../slugs.js'

const Code: CollectionConfig = {
  slug: codeFieldsSlug,
  fields: [
    {
      name: 'javascript',
      type: 'code',
      admin: {
        language: 'javascript',
      },
    },
    {
      name: 'typescript',
      type: 'code',
      admin: {
        language: 'typescript',
      },
    },
    {
      name: 'json',
      type: 'code',
      admin: {
        language: 'json',
      },
    },
    {
      name: 'html',
      type: 'code',
      admin: {
        language: 'html',
      },
    },
    {
      name: 'css',
      type: 'code',
      admin: {
        language: 'css',
      },
    },
  ],
}

export default Code
