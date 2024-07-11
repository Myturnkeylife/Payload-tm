import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Pages } from './cms/collections/Pages'
import { Tenants } from './cms/collections/Tenants'
import Users from './cms/collections/Users'
import { TenantSelectorRSC } from './cms/components/TenantSelector/index'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      afterNavLinks: [TenantSelectorRSC],
    },
    user: 'users',
  },
  collections: [Pages, Users, Tenants],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI as string,
  }),
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
