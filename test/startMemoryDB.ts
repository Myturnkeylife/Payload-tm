import getPort from 'get-port'
import { MongoMemoryReplSet } from 'mongodb-memory-server'

import type { SanitizedConfig } from '../packages/payload/src/config/types.js'

import { mongooseAdapter } from '../packages/db-mongodb/src/index.js'

export const startMemoryDB = async (
  configPromise: Promise<SanitizedConfig>,
): Promise<SanitizedConfig> => {
  const config = await configPromise

  process.env.NODE_OPTIONS = '--no-deprecation'

  console.log('---- CONNECTING TO MEMORY DB ----')

  switch (process.env.PAYLOAD_DATABASE) {
    case 'postgres':
    case 'supabase':
    case 'postgres-uuid': {
      return config
    }

    default: {
      const port = await getPort()
      const db = await MongoMemoryReplSet.create({
        instance: {
          dbName: `payloadmemory`,
          port,
        },
        replSet: {
          count: 3,
        },
      })

      config.db = mongooseAdapter({ url: db.getUri() })

      return config
    }
  }
}
