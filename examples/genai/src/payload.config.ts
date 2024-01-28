import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { Prompt } from './collections/Prompt'
import { Transformer } from './collections/Transformer'
import { Embedding } from './collections/Embedding'
import { Media } from './collections/Media'
import { CypherQuery } from './collections/CypherQuery'
import { KnowledgeGraph } from './collections/KnowledgeGraph'
import { Resource } from './collections/Resource'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      // TODO: How do I support 'fs' module?
      return config
    },
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Prompt,
    Media,
    Resource,
    CypherQuery,
    Transformer,
    Embedding,
    KnowledgeGraph,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
