import type { CreateGlobalVersion, Document, PayloadRequest } from 'payload'

import { deepCopyObjectSimple } from 'payload'

import type { MongooseAdapter } from './index.js'

import { withSession } from './withSession.js'

export const createGlobalVersion: CreateGlobalVersion = async function createGlobalVersion(
  this: MongooseAdapter,
  { autosave, createdAt, globalSlug, parent, req = {} as PayloadRequest, updatedAt, versionData },
) {
  const VersionModel = this.versions[globalSlug]
  const options = await withSession(this, req)

  const [doc] = await VersionModel.create(
    [
      {
        autosave,
        createdAt,
        latest: true,
        parent,
        updatedAt,
        version: versionData,
      },
    ],
    options,
    req,
  )

  await VersionModel.updateMany(
    {
      $and: [
        {
          _id: {
            $ne: doc._id,
          },
        },
        {
          parent: {
            $eq: parent,
          },
        },
        {
          latest: {
            $eq: true,
          },
        },
      ],
    },
    { $unset: { latest: 1 } },
    options,
  )

  const result: Document = deepCopyObjectSimple(doc)
  const verificationToken = doc._verificationToken

  // custom id type reset
  result.id = result._id
  if (verificationToken) {
    result._verificationToken = verificationToken
  }
  return result
}
