/**
 * Packages that should be published to NPM
 *
 * Note that this does not include all packages in the monorepo
 */
export const packagePublishList = [
  'payload',
  'translations',
  'ui',
  'next',
  'graphql',
  'db-mongodb',
  'db-postgres',
  'live-preview',
  'live-preview-react',
  'richtext-slate',
  'richtext-lexical',

  'create-payload-app',

  // Adapters
  'email-nodemailer',
  'email-resend',

  // Storage
  'storage-s3',
  'storage-azure',
  'storage-gcs',
  'storage-vercel-blob',
  'storage-uploadthing',

  // Plugins
  'plugin-cloud',
  'plugin-cloud-storage',
  'plugin-form-builder',
  'plugin-nested-docs',
  'plugin-redirects',
  'plugin-search',
  'plugin-seo',
  'plugin-stripe',
  'plugin-relationship-object-ids',

  // Unpublished
  // 'plugin-sentry'
  // 'storage-uploadthing',
  // 'eslint-config-payload',
  // 'eslint-plugin-payload',
  // 'live-preview-vue',
]
