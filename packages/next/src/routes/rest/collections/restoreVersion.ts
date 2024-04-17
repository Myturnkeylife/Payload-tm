import httpStatus from 'http-status'
import { restoreVersionOperation } from 'payload/operations'
import { corsHeaders, isNumber } from 'payload/utilities'

import type { CollectionRouteHandlerWithID } from '../types.js'

import { sanitizeCollectionID } from '../utilities/sanitizeCollectionID.js'

export const restoreVersion: CollectionRouteHandlerWithID = async ({
  id: incomingID,
  collection,
  req,
}) => {
  const { searchParams } = req
  const depth = searchParams.get('depth')

  const id = sanitizeCollectionID({
    id: incomingID,
    collectionSlug: collection.config.slug,
    payload: req.payload,
  })

  const result = await restoreVersionOperation({
    id,
    collection,
    depth: isNumber(depth) ? Number(depth) : undefined,
    req,
  })

  return Response.json(
    {
      ...result,
      message: req.t('version:restoredSuccessfully'),
    },
    {
      headers: corsHeaders(req),
      status: httpStatus.OK,
    },
  )
}
