import httpStatus from 'http-status'
import { restoreVersionOperationGlobal } from 'payload/operations'
import { isNumber } from 'payload/utilities'

import type { GlobalRouteHandlerWithID } from '../types'

export const restoreVersion: GlobalRouteHandlerWithID = async ({ id, globalConfig, req }) => {
  const { searchParams } = req
  const depth = searchParams.get('depth')

  const doc = await restoreVersionOperationGlobal({
    id,
    depth: isNumber(depth) ? Number(depth) : undefined,
    globalConfig,
    req,
  })

  return Response.json(
    {
      doc,
      message: req.t('version:restoredSuccessfully'),
    },
    {
      status: httpStatus.OK,
    },
  )
}
