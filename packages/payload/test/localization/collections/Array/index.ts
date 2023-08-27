import type { CollectionConfig } from '../../../../src/collections/config/types.js';

export const arrayCollectionSlug = 'array-fields';

export const ArrayCollection: CollectionConfig = {
  slug: arrayCollectionSlug,
  fields: [
    {
      name: 'items',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
