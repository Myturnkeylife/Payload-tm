import jwt from 'jsonwebtoken'
import url from 'url'

import type { BeforeOperationHook, Collection } from '../../collections/config/types'
import type { PayloadRequest } from '../../types'
import type { Document } from '../../types'

import { buildAfterOperation } from '../../collections/operations/utils'
import { Forbidden } from '../../errors'
import { getFieldsToSign } from '../getFieldsToSign'
import { initTransaction } from '../../utilities/initTransaction'
import { commitTransaction } from '../../utilities/commitTransaction'
import { killTransaction } from '../../utilities/killTransaction'

export type Result = {
  exp: number
  refreshedToken: string
  user: Document
}

export type Arguments = {
  collection: Collection
  req: PayloadRequest
  token: string
}

export const refreshOperation = async (incomingArgs: Arguments): Promise<Result> => {
  let args = incomingArgs

  try {
    const shouldCommit = await initTransaction(args.req)

    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////

    await args.collection.config.hooks.beforeOperation.reduce(
      async (priorHook: BeforeOperationHook | Promise<void>, hook: BeforeOperationHook) => {
        await priorHook

        args =
          (await hook({
            args,
            collection: args.collection?.config,
            context: args.req.context,
            operation: 'refresh',
            req: args.req,
          })) || args
      },
      Promise.resolve(),
    )

    // /////////////////////////////////////
    // Refresh
    // /////////////////////////////////////

    const {
      collection: { config: collectionConfig },
      req,
      req: {
        payload: { config, secret },
      },
    } = args

    if (typeof args.token !== 'string' || !args.req.user) throw new Forbidden(args.req.t)

    const parsedURL = url.parse(args.req.url)
    const isGraphQL = parsedURL.pathname === config.routes.graphQL

    const user = await args.req.payload.findByID({
      id: args.req.user.id,
      collection: args.req.user.collection,
      depth: isGraphQL ? 0 : args.collection.config.auth.depth,
      req: args.req,
    })

    const fieldsToSign = getFieldsToSign({
      collectionConfig,
      email: user?.email as string,
      user: args?.req?.user,
    })

    const refreshedToken = jwt.sign(fieldsToSign, secret, {
      expiresIn: collectionConfig.auth.tokenExpiration,
    })

    const exp = (jwt.decode(refreshedToken) as Record<string, unknown>).exp as number

    let result: Result = {
      exp,
      refreshedToken,
      user,
    }

    // /////////////////////////////////////
    // After Refresh - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRefresh.reduce(async (priorHook, hook) => {
      await priorHook

      result =
        (await hook({
          collection: args.collection?.config,
          context: args.req.context,
          exp,
          req: args.req,
          token: refreshedToken,
        })) || result
    }, Promise.resolve())

    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////

    result = await buildAfterOperation({
      args,
      collection: args.collection?.config,
      operation: 'refresh',
      result,
    })

    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////

    if (shouldCommit) await commitTransaction(req)

    return result
  } catch (error: unknown) {
    await killTransaction(args.req)
    throw error
  }
}
