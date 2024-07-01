import type { DeepPartial } from 'ts-essentials'

import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js'
import type {
  Document,
  PayloadRequestWithData,
  RequestContext,
  Where,
} from '../../../types/index.js'
import type { File } from '../../../uploads/types.js'
import type {
  BulkOperationResult,
  DataFromCollectionSlug,
  RequiredDataFromCollectionSlug,
} from '../../config/types.js'

import { APIError } from '../../../errors/index.js'
import { getFileByPath } from '../../../uploads/getFileByPath.js'
import { createLocalReq } from '../../../utilities/createLocalReq.js'
import { updateOperation } from '../update.js'
import { updateByIDOperation } from '../updateByID.js'

export type BaseOptions<TSlug extends CollectionSlug> = {
  autosave?: boolean
  collection: TSlug
  /**
   * context, which will then be passed to req.context, which can be read by hooks
   */
  context?: RequestContext
  data: DeepPartial<RequiredDataFromCollectionSlug<TSlug>>
  depth?: number
  draft?: boolean
  fallbackLocale?: TypedLocale
  file?: File
  filePath?: string
  locale?: TypedLocale
  overrideAccess?: boolean
  overwriteExistingFiles?: boolean
  req?: PayloadRequestWithData
  showHiddenFields?: boolean
  user?: Document
}

export type ByIDOptions<TSlug extends CollectionSlug> = BaseOptions<TSlug> & {
  id: number | string
  where?: never
}

export type ManyOptions<TSlug extends CollectionSlug> = BaseOptions<TSlug> & {
  id?: never
  where: Where
}

export type Options<TSlug extends CollectionSlug> = ByIDOptions<TSlug> | ManyOptions<TSlug>

async function updateLocal<TSlug extends CollectionSlug>(
  payload: Payload,
  options: ByIDOptions<TSlug>,
): Promise<DataFromCollectionSlug<TSlug>>
async function updateLocal<TSlug extends CollectionSlug>(
  payload: Payload,
  options: ManyOptions<TSlug>,
): Promise<BulkOperationResult<TSlug>>
async function updateLocal<TSlug extends CollectionSlug>(
  payload: Payload,
  options: Options<TSlug>,
): Promise<BulkOperationResult<TSlug> | DataFromCollectionSlug<TSlug>>
async function updateLocal<TSlug extends CollectionSlug>(
  payload: Payload,
  options: Options<TSlug>,
): Promise<BulkOperationResult<TSlug> | DataFromCollectionSlug<TSlug>> {
  const {
    id,
    autosave,
    collection: collectionSlug,
    data,
    depth,
    draft,
    file,
    filePath,
    overrideAccess = true,
    overwriteExistingFiles = false,
    showHiddenFields,
    where,
  } = options

  const collection = payload.collections[collectionSlug]

  if (!collection) {
    throw new APIError(
      `The collection with slug ${String(collectionSlug)} can't be found. Update Operation.`,
    )
  }

  const req = await createLocalReq(options, payload)
  req.file = file ?? (await getFileByPath(filePath))

  const args = {
    id,
    autosave,
    collection,
    data,
    depth,
    draft,
    overrideAccess,
    overwriteExistingFiles,
    payload,
    req,
    showHiddenFields,
    where,
  }

  if (options.id) {
    return updateByIDOperation<TSlug>(args)
  }
  return updateOperation<TSlug>(args)
}

export default updateLocal
