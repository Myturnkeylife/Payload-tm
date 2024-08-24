import type { GlobalSlug, Payload, RequestContext, TypedLocale } from '../../../index.js'
import type { Document, PayloadRequest } from '../../../types/index.js'
import type { DataFromGlobalSlug } from '../../config/types.js'

import { APIError } from '../../../errors/index.js'
import { createLocalReq } from '../../../utilities/createLocalReq.js'
import { findOneOperation } from '../findOne.js'

export type Options<TSlug extends GlobalSlug> = {
  cache?: boolean
  context?: RequestContext
  depth?: number
  draft?: boolean
  fallbackLocale?: TypedLocale
  locale?: 'all' | TypedLocale
  overrideAccess?: boolean
  req?: PayloadRequest
  showHiddenFields?: boolean
  slug: TSlug
  user?: Document
}

export default async function findOneLocal<TSlug extends GlobalSlug>(
  payload: Payload,
  options: Options<TSlug>,
): Promise<DataFromGlobalSlug<TSlug>> {
  const {
    slug: globalSlug,
    cache = false,
    depth,
    draft = false,
    overrideAccess = true,
    showHiddenFields,
  } = options

  const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug)

  if (!globalConfig) {
    throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`)
  }

  return findOneOperation({
    slug: globalSlug as string,
    cache,
    depth,
    draft,
    globalConfig,
    overrideAccess,
    req: await createLocalReq(options, payload),
    showHiddenFields,
  })
}
