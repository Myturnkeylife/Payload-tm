import { loginOperation } from 'payload/operations'
import type { Collection } from 'payload/types'

import isolateObjectProperty from '../../utilities/isolateObjectProperty'
import { generatePayloadCookie } from '../../../utilities/cookies'

function loginResolver(collection: Collection) {
  async function resolver(_, args, context) {
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
      collectionConfig: context.req.collection.config,
    })
    context.headers.set('Set-Cookie', cookie)

    return result
  }

  return resolver
}

export default loginResolver
