import httpStatus from 'http-status'
import { findOneOperation } from 'payload/operations'
import { corsHeaders, isNumber } from 'payload/utilities'

import type { GlobalRouteHandler } from '../types.js'

export const findOne: GlobalRouteHandler = async ({ globalConfig, req }) => {
  const { searchParams } = req
  const depth = searchParams.get('depth')

  const result = await findOneOperation({
    slug: globalConfig.slug,
    depth: isNumber(depth) ? Number(depth) : undefined,
    draft: searchParams.get('draft') === 'true',
    globalConfig,
    req,
  })

  return Response.json(result, {
    headers: corsHeaders(req),
    status: httpStatus.OK,
  })
}
