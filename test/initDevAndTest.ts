import fs from 'fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { type SanitizedConfig, generateImportMap } from 'payload'

import { getNextRootDir } from './helpers/getNextRootDir.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const runImmediately = process.argv[2]

const databaseAdapters = {
  mongodb: `
  import { mongooseAdapter } from '@payloadcms/db-mongodb'

  export const databaseAdapter = mongooseAdapter({
    url:
      process.env.MONGODB_MEMORY_SERVER_URI ||
      process.env.DATABASE_URI ||
      'mongodb://127.0.0.1/payloadtests',
    collation: {
      strength: 1,
    },
  })`,
  postgres: `
  import { postgresAdapter } from '@payloadcms/db-postgres'

  export const databaseAdapter = postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || 'postgres://127.0.0.1:5432/payloadtests',
    },
  })`,
  'postgres-custom-schema': `
  import { postgresAdapter } from '@payloadcms/db-postgres'

  export const databaseAdapter = postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || 'postgres://127.0.0.1:5432/payloadtests',
    },
    schemaName: 'custom',
  })`,
  'postgres-uuid': `
    import { postgresAdapter } from '@payloadcms/db-postgres'

  export const databaseAdapter = postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString: process.env.POSTGRES_URL || 'postgres://127.0.0.1:5432/payloadtests',
    },
  })`,
  sqlite: `
  import { sqliteAdapter } from '@payloadcms/db-sqlite'

  export const databaseAdapter = sqliteAdapter({
    client: {
      url: process.env.SQLITE_URL || 'file:./payloadtests.db',
    },
  })`,
  supabase: `
  import { postgresAdapter } from '@payloadcms/db-postgres'

  export const databaseAdapter = postgresAdapter({
    pool: {
      connectionString:
        process.env.POSTGRES_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
    },
  })`,
}

export async function initDevAndTest(
  testSuiteArg: string,
  writeDBAdapter: string,
  skipGenImportMap: string,
): Promise<void> {
  const appPath: string = getNextRootDir(testSuiteArg).rootDir

  try {
    fs.writeFileSync(appPath, 'export const importMap = {}')
  } catch (error) {
    console.log('Error writing importMap.js', error)
  }

  if (writeDBAdapter === 'true') {
    const dbAdapter: keyof typeof databaseAdapters =
      (process.env.PAYLOAD_DATABASE as keyof typeof databaseAdapters) || 'mongodb'

    // Generate databaseAdapter.ts
    const databaseAdapter = databaseAdapters[dbAdapter]

    // Write to databaseAdapter.ts
    fs.writeFileSync(
      path.resolve(dirname, 'databaseAdapter.ts'),
      `
  // DO NOT MODIFY. This file is automatically generated in initDevAndTest.ts

  ${databaseAdapter}
  `,
    )

    console.log('Wrote', dbAdapter, 'db adapter')
  }

  if (skipGenImportMap === 'true') {
    console.log('Done')
    return
  }

  // Generate importMap
  const testDir = path.resolve(dirname, testSuiteArg)

  const pathWithConfig = path.resolve(testDir, 'config.ts')
  console.log('Generating import map for config:', pathWithConfig)

  const config: SanitizedConfig = await (await import(pathWithConfig)).default

  process.env.ROOT_DIR = getNextRootDir(testSuiteArg).rootDir

  await generateImportMap(config, { log: true, force: true })

  console.log('Done')
}

if (runImmediately === 'true') {
  const testSuiteArg = process.argv[3]
  const writeDBAdapter = process.argv[4]
  const skipGenImportMap = process.argv[5]
  void initDevAndTest(testSuiteArg, writeDBAdapter, skipGenImportMap)
}
