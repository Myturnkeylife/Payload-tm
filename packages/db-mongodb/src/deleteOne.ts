import type { DeleteOne, PayloadRequest } from 'payload'

import type { MongooseAdapter } from './index.js'

import { sanitizeDocument } from './utilities/sanitizeDocument.js'
import { withSession } from './withSession.js'

export const deleteOne: DeleteOne = async function deleteOne(
  this: MongooseAdapter,
  { collection, req = {} as PayloadRequest, where },
) {
  const Model = this.collections[collection]
  const options = await withSession(this, req)

  const query = await Model.buildQuery({
    payload: this.payload,
    where,
  })

  const doc = await Model.findOneAndDelete(query, options).lean()

  sanitizeDocument(doc)

  return doc
}
