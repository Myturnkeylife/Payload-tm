import { docAccessOperationGlobal } from 'payload/operations'
import type { PayloadRequest, SanitizedGlobalConfig } from 'payload/types'
import type { CollectionPermission, GlobalPermission } from 'payload/auth'

import { isolateObjectProperty } from 'payload/utilities'
import { Context } from '../types'

export type Resolver = (
  _: unknown,
  context: {
    req: PayloadRequest
  },
) => Promise<CollectionPermission | GlobalPermission>

export function docAccessResolver(global: SanitizedGlobalConfig): Resolver {
  async function resolver(_, context: Context) {
    return docAccessOperationGlobal({
      globalConfig: global,
      req: isolateObjectProperty(context.req, 'transactionID'),
    })
  }

  return resolver
}
