import { getTranslation } from '@payloadcms/translations'
import httpStatus from 'http-status'
import { createOperation } from 'payload/operations'
import { corsHeaders, isNumber } from 'payload/utilities'

import type { CollectionRouteHandler } from '../types.js'

export const create: CollectionRouteHandler = async ({ collection, req }) => {
  const { searchParams } = req
  const autosave = searchParams.get('autosave') === 'true'
  const draft = searchParams.get('draft') === 'true'
  const depth = searchParams.get('depth')

  const doc = await createOperation({
    autosave,
    collection,
    data: req.data,
    depth: isNumber(depth) ? depth : undefined,
    draft,
    req,
  })

  return Response.json(
    {
      doc,
      message: req.t('general:successfullyCreated', {
        label: getTranslation(collection.config.labels.singular, req.i18n),
      }),
    },
    {
      headers: corsHeaders(req),
      status: httpStatus.CREATED,
    },
  )
}
