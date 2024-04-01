import httpStatus from 'http-status'
import { findOneOperation } from 'payload/operations'
import { isNumber } from 'payload/utilities'

import type { GlobalRouteHandler } from '../types.js'

import { routeError } from '../routeError.js'

export const preview: GlobalRouteHandler = async ({ globalConfig, req }) => {
  const { searchParams } = req
  const depth = searchParams.get('depth')

  const result = await findOneOperation({
    slug: globalConfig.slug,
    depth: isNumber(depth) ? Number(depth) : undefined,
    draft: searchParams.get('draft') === 'true',
    globalConfig,
    req,
  })

  let previewURL: string

  const generatePreviewURL = req.payload.config.globals.find(
    (config) => config.slug === globalConfig.slug,
  )?.admin?.preview

  if (typeof generatePreviewURL === 'function') {
    try {
      previewURL = await generatePreviewURL(result, {
        locale: req.locale,
        token: req.user?.token,
      })
    } catch (err) {
      routeError({
        err,
        req,
      })
    }
  }

  return Response.json(previewURL, {
    status: httpStatus.OK,
  })
}
