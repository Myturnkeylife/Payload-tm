import { Where } from '../../types.js';
import { PayloadRequest } from '../../express/types.js';
import executeAccess from '../../auth/executeAccess.js';
import { Collection, TypeWithID } from '../config/types.js';
import type { PaginatedDocs } from '../../database/types.js';
import { AccessResult } from '../../config/types.js';
import { afterRead } from '../../fields/hooks/afterRead.js';
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js';
import { appendVersionToQueryKey } from '../../versions/drafts/appendVersionToQueryKey.js';
import { buildVersionCollectionFields } from '../../versions/buildCollectionFields.js';
import { combineQueries } from '../../database/combineQueries.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { buildAfterOperation } from './utils.js';

export type Arguments = {
  collection: Collection
  where?: Where
  page?: number
  limit?: number
  sort?: string
  depth?: number
  currentDepth?: number
  req?: PayloadRequest
  overrideAccess?: boolean
  disableErrors?: boolean
  pagination?: boolean
  showHiddenFields?: boolean
  draft?: boolean
}

async function find<T extends TypeWithID & Record<string, unknown>>(
  incomingArgs: Arguments,
): Promise<PaginatedDocs<T>> {
  let args = incomingArgs;

  // /////////////////////////////////////
  // beforeOperation - Collection
  // /////////////////////////////////////

  await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
    await priorHook;

    args = (await hook({
      args,
      operation: 'read',
      context: args.req.context,
    })) || args;
  }, Promise.resolve());

  const {
    where,
    page,
    limit,
    depth,
    currentDepth,
    draft: draftsEnabled,
    collection,
    collection: {
      config: collectionConfig,
    },
    sort,
    req,
    req: {
      locale,
      payload,
    },
    overrideAccess,
    disableErrors,
    showHiddenFields,
    pagination = true,
  } = args;

  try {
    const shouldCommit = await initTransaction(req);

    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////

    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
      await priorHook;

      args = (await hook({
        args,
        operation: 'read',
        context: req.context,
      })) || args;
    }, Promise.resolve());

    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////

    let accessResult: AccessResult;

    if (!overrideAccess) {
      accessResult = await executeAccess({ req, disableErrors }, collectionConfig.access.read);

      // If errors are disabled, and access returns false, return empty results
      if (accessResult === false) {
        return {
          docs: [],
          totalDocs: 0,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
          limit,
        };
      }
    }

    // /////////////////////////////////////
    // Find
    // /////////////////////////////////////

    const usePagination = pagination && limit !== 0;
    const sanitizedLimit = limit ?? (usePagination ? 10 : 0);
    const sanitizedPage = page || 1;

    let result: PaginatedDocs<T>;

    let fullWhere = combineQueries(where, accessResult);

    if (collectionConfig.versions?.drafts && draftsEnabled) {
      fullWhere = appendVersionToQueryKey(fullWhere);

      await validateQueryPaths({
        collectionConfig: collection.config,
        where: fullWhere,
        req,
        overrideAccess,
        versionFields: buildVersionCollectionFields(collection.config),
      });

      result = await payload.db.queryDrafts<T>({
        collection: collectionConfig.slug,
        where: fullWhere,
        page: sanitizedPage,
        limit: sanitizedLimit,
        sort,
        pagination: usePagination,
        locale,
        req,
      });
    } else {
      await validateQueryPaths({
        collectionConfig,
        where,
        req,
        overrideAccess,
      });

      result = await payload.db.find<T>({
        collection: collectionConfig.slug,
        where: fullWhere,
        page: sanitizedPage,
        limit: sanitizedLimit,
        sort,
        locale,
        pagination,
        req,
      });
    }

    // /////////////////////////////////////
    // beforeRead - Collection
    // /////////////////////////////////////

    result = {
      ...result,
      docs: await Promise.all(result.docs.map(async (doc) => {
        let docRef = doc;

        await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
          await priorHook;

          docRef = await hook({
            req,
            query: fullWhere,
            doc: docRef,
            context: req.context,
          }) || docRef;
        }, Promise.resolve());

        return docRef;
      })),
    };

    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////

    result = {
      ...result,
      docs: await Promise.all(result.docs.map(async (doc) => afterRead<T>({
        depth,
        currentDepth,
        doc,
        entityConfig: collectionConfig,
        overrideAccess,
        req,
        showHiddenFields,
        findMany: true,
        context: req.context,
      }))),
    };

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    result = {
      ...result,
      docs: await Promise.all(result.docs.map(async (doc) => {
        let docRef = doc;

        await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
          await priorHook;

          docRef = await hook({
            req,
            query: fullWhere,
            doc: docRef,
            findMany: true,
            context: req.context,
          }) || doc;
        }, Promise.resolve());

        return docRef;
      })),
    };

    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////

    result = await buildAfterOperation<T>({
      operation: 'find',
      args,
      result,
    });

    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////

    if (shouldCommit) await payload.db.commitTransaction(req.transactionID);

    return result;
  } catch (error: unknown) {
    await killTransaction(req);
    throw error;
  }
}

export default find;
