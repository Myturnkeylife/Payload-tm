import type { Collection } from 'payload'

import { generatePayloadCookie, isolateObjectProperty, refreshOperation } from 'payload'

import type { Context } from '../types.js'

function refreshResolver(collection: Collection): any {
  async function resolver(_, __, context: Context) {
    const options = {
      collection,
      depth: 0,
      req: isolateObjectProperty(context.req, 'transactionID'),
    }

    const result = await refreshOperation(options)
    const cookie = generatePayloadCookie({
      collectionConfig: collection.config,
      payload: context.req.payload,
      token: result.refreshedToken,
    })
    context.headers['Set-Cookie'] = cookie

    if (collection.config.auth.removeTokenFromResponses) {
      delete result.refreshedToken
    }

    return result
  }

  return resolver
}

export default refreshResolver
