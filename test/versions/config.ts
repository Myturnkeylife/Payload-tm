import { fileURLToPath } from 'node:url'
import path from 'path'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import AutosavePosts from './collections/Autosave.js'
import CustomIDs from './collections/CustomIDs.js'
import DisablePublish from './collections/DisablePublish.js'
import DraftPosts from './collections/Drafts.js'
import DraftWithMax from './collections/DraftsWithMax.js'
import Posts from './collections/Posts.js'
import VersionPosts from './collections/Versions.js'
import AutosaveGlobal from './globals/Autosave.js'
import DisablePublishGlobal from './globals/DisablePublish.js'
import DraftGlobal from './globals/Draft.js'
import DraftWithMaxGlobal from './globals/DraftWithMax.js'
import { seed } from './seed.js'

export default buildConfigWithDefaults({
  collections: [
    DisablePublish,
    Posts,
    AutosavePosts,
    DraftPosts,
    DraftWithMax,
    VersionPosts,
    CustomIDs,
  ],
  globals: [AutosaveGlobal, DraftGlobal, DraftWithMaxGlobal, DisablePublishGlobal],
  indexSortableFields: true,
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  onInit: async (payload) => {
    if (process.env.SEED_IN_CONFIG_ONINIT !== 'false') {
      await seed(payload)
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
