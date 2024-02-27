import { loginOperation } from 'payload/operations'
import type { Collection } from 'payload/types'

import { isolateObjectProperty } from 'payload/utilities'
import { generatePayloadCookie } from '../../../utilities/cookies'
import { Context } from '../types'

function loginResolver(collection: Collection) {
  async function resolver(_, args, context: Context) {
    const options = {
      collection,
      data: {
        email: args.email,
        password: args.password,
      },
      depth: 0,
      req: isolateObjectProperty(context.req, 'transactionID'),
    }

    const result = await loginOperation(options)
    const cookie = generatePayloadCookie({
      token: result.token,
      payload: context.req.payload,
      collectionConfig: collection.config,
    })

    context.headers['Set-Cookie'] = cookie

    return result
  }

  return resolver
}

export default loginResolver
