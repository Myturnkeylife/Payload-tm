import { createTestHooks } from './testHooks.js'

let afterTest: () => Promise<void> | undefined
beforeAll(async () => {
  ;({ afterTest } = await createTestHooks())
})

process.env.PAYLOAD_DISABLE_ADMIN = 'true'
process.env.PAYLOAD_DROP_DATABASE = 'true'

process.env.PAYLOAD_PUBLIC_CLOUD_STORAGE_ADAPTER = 's3'

afterAll(async () => {
  await afterTest()
})
