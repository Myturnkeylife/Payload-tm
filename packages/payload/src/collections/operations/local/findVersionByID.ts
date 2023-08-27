import { Config as GeneratedTypes } from 'payload/generated-types';
import { Payload } from '../../../payload.js';
import { Document } from '../../../types/index.js';
import { PayloadRequest, RequestContext } from '../../../express/types.js';
import { TypeWithVersion } from '../../../versions/types.js';
import findVersionByID from '../findVersionByID.js';
import { getDataLoader } from '../../dataloader.js';
import { i18nInit } from '../../../translations/init.js';
import { APIError } from '../../../errors/index.js';
import { setRequestContext } from '../../../express/setRequestContext.js';

export type Options<T extends keyof GeneratedTypes['collections']> = {
  collection: T
  id: string
  depth?: number
  locale?: string
  fallbackLocale?: string
  user?: Document
  overrideAccess?: boolean
  showHiddenFields?: boolean
  disableErrors?: boolean
  req?: PayloadRequest
  draft?: boolean
  /**
   * context, which will then be passed to req.context, which can be read by hooks
   */
  context?: RequestContext,
}

export default async function findVersionByIDLocal<T extends keyof GeneratedTypes['collections']>(
  payload: Payload,
  options: Options<T>,
): Promise<TypeWithVersion<GeneratedTypes['collections'][T]>> {
  const {
    collection: collectionSlug,
    depth,
    id,
    locale = null,
    fallbackLocale = null,
    overrideAccess = true,
    disableErrors = false,
    showHiddenFields,
    req = {} as PayloadRequest,
    context,
  } = options;
  setRequestContext(options.req, context);

  const collection = payload.collections[collectionSlug];
  const defaultLocale = payload?.config?.localization ? payload?.config?.localization?.defaultLocale : null;

  if (!collection) {
    throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Find Version By ID Operation.`);
  }

  req.payloadAPI = req.payloadAPI || 'local';
  req.locale = locale ?? req?.locale ?? defaultLocale;
  req.fallbackLocale = fallbackLocale ?? req?.fallbackLocale ?? defaultLocale;
  req.i18n = i18nInit(payload.config.i18n as any);
  req.payload = payload;

  if (!req.t) req.t = req.i18n.t;
  if (!req.payloadDataLoader) req.payloadDataLoader = getDataLoader(req);

  return findVersionByID({
    depth,
    id,
    collection,
    overrideAccess,
    disableErrors,
    showHiddenFields,
    req,
  });
}
