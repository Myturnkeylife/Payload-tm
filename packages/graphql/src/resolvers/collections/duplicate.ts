import type { CollectionSlug } from 'payload'
import type { DataFromCollectionSlug, PayloadRequestWithData } from 'payload/types'
import type { Collection } from 'payload/types'

import { duplicateOperation } from 'payload/operations'
import { isolateObjectProperty } from 'payload/utilities'

import type { Context } from '../types.js'

export type Resolver<TData> = (
  _: unknown,
  args: {
    draft: boolean
    fallbackLocale?: string
    id: string
    locale?: string
  },
  context: {
    req: PayloadRequestWithData
  },
) => Promise<TData>

export default function duplicateResolver<TSlug extends CollectionSlug>(
  collection: Collection,
): Resolver<DataFromCollectionSlug<TSlug>> {
  return async function resolver(_, args, context: Context) {
    const { req } = context
    const locale = req.locale
    const fallbackLocale = req.fallbackLocale
    req.locale = args.locale || locale
    req.fallbackLocale = args.fallbackLocale || fallbackLocale
    context.req = req

    const options = {
      id: args.id,
      collection,
      depth: 0,
      draft: args.draft,
      req: isolateObjectProperty(req, 'transactionID'),
    }

    const result = await duplicateOperation(options)

    return result
  }
}
