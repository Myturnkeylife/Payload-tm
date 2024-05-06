import { slateEditor } from '@payloadcms/richtext-slate'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'

export default buildConfigWithDefaults({
  collections: [
    {
      slug: 'posts',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'owner',
          type: 'relationship',
          hooks: {
            beforeChange: [({ req: { user } }) => user?.id],
          },
          relationTo: 'users',
        },
      ],
    },
    {
      slug: 'relation-a',
      fields: [
        {
          name: 'relationship',
          type: 'relationship',
          relationTo: 'relation-b',
        },
        {
          name: 'richText',
          type: 'richText',
          editor: slateEditor({}),
        },
        {
          name: 'textA',
          type: 'text',
        },
      ],
      labels: {
        plural: 'Relation As',
        singular: 'Relation A',
      },
    },
    {
      slug: 'relation-b',
      fields: [
        {
          name: 'relationship',
          type: 'relationship',
          relationTo: 'relation-a',
          maxDepth: 4,
        },
        {
          name: 'richText',
          type: 'richText',
          editor: slateEditor({}),
        },
        {
          name: 'textB',
          type: 'text',
        },
      ],
      labels: {
        plural: 'Relation Bs',
        singular: 'Relation B',
      },
    },
  ],
  onInit: async (payload) => {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    await payload.create({
      collection: 'posts',
      data: postDoc,
      user,
    })
  },
})

export const postDoc = {
  title: 'test post',
}
