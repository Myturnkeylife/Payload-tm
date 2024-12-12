import type { DeleteVersions, PayloadRequest } from 'payload'

import type { MongooseAdapter } from './index.js'

import { getSession } from './getSession.js'

export const deleteVersions: DeleteVersions = async function deleteVersions(
  this: MongooseAdapter,
  { collection, locale, req = {} as PayloadRequest, where },
) {
  const VersionsModel = this.versions[collection]

  const session = await getSession(this, req)

  const query = await VersionsModel.buildQuery({
    locale,
    payload: this.payload,
    session,
    where,
  })

  await VersionsModel.collection.deleteMany(query, {
    session,
  })
}
