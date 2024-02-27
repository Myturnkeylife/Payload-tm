import { refreshOperation } from 'payload/operations'
import { generatePayloadCookie, extractJWT } from 'payload/auth'
import type { Collection } from 'payload/types'

import { isolateObjectProperty } from 'payload/utilities'
import { Context } from '../types'

function refreshResolver(collection: Collection) {
  async function resolver(_, args, context: Context) {
    let token

    token = extractJWT(context.req)

    if (args.token) {
      token = args.token
    }

    const options = {
      collection,
      depth: 0,
      req: isolateObjectProperty(context.req, 'transactionID'),
      token,
    }

    const result = await refreshOperation(options)
    const cookie = generatePayloadCookie({
      token: result.refreshedToken,
      payload: context.req.payload,
      collectionConfig: collection.config,
    })
    context.headers['Set-Cookie'] = cookie
    return result
  }

  return resolver
}

export default refreshResolver
