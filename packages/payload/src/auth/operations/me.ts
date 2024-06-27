import jwt from 'jsonwebtoken'

import type { Collection } from '../../collections/config/types.js'
import type { PayloadRequestWithData } from '../../types/index.js'
import type { ClientUser, User } from '../types.js'

export type MeOperationResult = {
  collection?: string
  exp?: number
  strategy?: string
  token?: string
  user?: ClientUser
}

export type Arguments = {
  collection: Collection
  currentToken?: string
  req: PayloadRequestWithData
}

export const meOperation = async (args: Arguments): Promise<MeOperationResult> => {
  const { collection, currentToken, req } = args

  let result: MeOperationResult = {
    user: null,
  }

  if (req.user) {
    const { pathname } = req
    const isGraphQL = pathname === `/api${req.payload.config.routes.graphQL}`

    const user = (await req.payload.findByID({
      id: req.user.id,
      collection: collection.config.slug,
      depth: isGraphQL ? 0 : collection.config.auth.depth,
      overrideAccess: false,
      req,
      showHiddenFields: false,
    })) as User

    if (req.user.collection !== collection.config.slug) {
      return {
        user: null,
      }
    }

    delete user.collection

    // /////////////////////////////////////
    // me hook - Collection
    // /////////////////////////////////////

    for (const meHook of collection.config.hooks.me) {
      const hookResult = await meHook({ args, user })

      if (hookResult) {
        result.user = hookResult.user
        result.exp = hookResult.exp

        break
      }
    }

    result.collection = req.user.collection
    result.strategy = req.user._strategy

    if (!result.user && currentToken) {
      result.user = user

      const decoded = jwt.decode(currentToken) as jwt.JwtPayload
      if (decoded) result.exp = decoded.exp
      result.token = currentToken
    }
  }

  // /////////////////////////////////////
  // After Me - Collection
  // /////////////////////////////////////

  await collection.config.hooks.afterMe.reduce(async (priorHook, hook) => {
    await priorHook

    result =
      (await hook({
        collection: collection?.config,
        context: req.context,
        req,
        response: result,
      })) || result
  }, Promise.resolve())

  return result
}
